/// <reference path="/Scripts/FabricUI/MessageBanner.js" />


(function (hazard_statements, precautionary_statements) {
    "use strict";

    var messageBanner;

    // Die Initialisierungsfunktion muss bei jedem Laden einer neuen Seite ausgeführt werden.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            // Initialisiert den FabricUI-Benachrichtigungsmechanismus und blendet ihn aus.
            var element = document.querySelector('.ms-MessageBanner');
            messageBanner = new fabric.MessageBanner(element);
            messageBanner.hideBanner();

            // Wenn nicht Word 2016 verwendet wird, Fallbacklogik verwenden.
            if (!Office.context.requirements.isSetSupported('WordApi', '1.3')) {
                $("#template-description").text("Dieses Plugin benötigt eine neuere Version von Word.");
                return;
            }

            // Fügt einen Klickereignishandler für die Hervorhebungsschaltfläche hinzu.
            $('#pubchem-button').click(completeTable);
            $('#hp-button').click(resolveHPSentences);

            console.log("ChemWizard initialized");
        });
    };

    function completeTable() {
        Word.run(function (context) {
            console.log("ChemWizard starts loading data");
            // Reiht einen Befehl zum Abrufen der aktuellen Auswahl in die Warteschlange ein und
            // erstellt dann ein Proxybereichsobjekt mit den Ergebnissen.
            var table = context.document.getSelection().parentTable;

            // Reiht einen Befehl in die Warteschlange ein, um das Bereichsauswahlergebnis zu laden.
            table.load("values, rows/items/cells/items/body");

            context.trackedObjects.add(table);

            // Synchronisiert den Zustand des Dokuments durch Ausführen der in die Warteschlange eingereihten Befehle
            // und gibt eine Zusage zum Angeben des Abschlusses der Aufgabe zurück.
            return context.sync()
                .then(function () {
                    // loop over table
                    for (var row = 0; row < table.values.length; row++) {
                        for (var column = 0; column < table.values[row].length; column++) {
                            // use closures to keep cell index variables for ajax
                            (function (row, column, table, context) {
                                if ((table.values[row][column].trim() == "" || !table.values[row][column]) && table.values[row][0] && table.values[0][column]) {
                                    // TODO: load more than one datapoint at once. 
                                    // e.g. comma separated. docs: https://pubchem.ncbi.nlm.nih.gov/pug_rest/PUG_REST.html#_Toc458584210
                                    $.ajax({
                                        url: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + pascalize(table.values[row][0]) + "/property/" + table.values[0][column] + "/txt",
                                        async: false
                                    }).done(function (data) {
                                        // insert data
                                        table.rows.items[row].cells.items[column].body.insertText(data, 'End');
                                        console.log("data: " + data);
                                        return context.sync().then(function () {
                                            console.log("synced");
                                        }).catch(function (e) {
                                            console.log("0");
                                            errorHandler(e);
                                        });
                                    }).error(function (e) {
                                        console.log("1");
                                        errorHandler(e);
                                    });
                                } else {
                                    console.log(row + " " + column + " not beeing set, it is " + table.values[row][column]);
                                }
                            })(row, column, table, context);
                        }
                    }
                })
                .then(context.sync().then(
                    function () {
                        console.log("last sync?");
                        //context.trackedObjects.remove(table);
                    }
                ).catch(function (e) {
                    //context.trackedObjects.remove(table);
                    console.log("2");
                    errorHandler(e);
                }));
        })
            .catch(function (e) {
                console.log("3");
                errorHandler(e);
            });
    }

    // function to resolve H & P identifier in the selected table to their linguistic counterpart
    function resolveHPSentences() {
        Word.run(function (context) {
            console.log("ChemWizard starts resolving H & P sentences");
            // Reiht einen Befehl zum Abrufen der aktuellen Auswahl in die Warteschlange ein und
            // erstellt dann ein Proxybereichsobjekt mit den Ergebnissen.
            var table = context.document.getSelection().parentTable;

            // Reiht einen Befehl in die Warteschlange ein, um das Bereichsauswahlergebnis zu laden.
            table.load("values, rows/items/cells/items/body");

            // Synchronisiert den Zustand des Dokuments durch Ausführen der in die Warteschlange eingereihten Befehle
            // und gibt eine Zusage zum Angeben des Abschlusses der Aufgabe zurück.
            return context.sync()
                .then(function () {
                    // loop over table
                    for (var row = 0; row < table.values.length; row++) {
                        for (var column = 0; column < table.values[row].length; column++) {
                            var value = table.values[row][column].trim();
                            if (value) {
                                //console.log(value);
                                // find H\number & P\number
                                var matches = value.match(/\b((P|H)\d+\+?)+\b/gi);
                                //console.log(matches);
                                if (matches) {
                                    if (matches.length) {
                                        var resolvedText = "";
                                        for (var i = 0; i < matches.length; i++) {
                                            // resolve
                                            resolvedText += resolveHPSentence(matches[i]);
                                        }
                                        table.rows.items[row].cells.items[column].body.insertText(resolvedText, 'Replace');
                                    }
                                }
                            }
                        }
                    }

                    return context.sync().catch(errorHandler);
                }).catch(errorHandler);
        }).catch(errorHandler);
    }

    function resolveHPSentence(identifier) {
        console.log("identifiying...");
        var mode = identifier.charAt(0);
        try {
            switch (mode) {
                case "P":
                    return identifier + ": " + loadPSentence(identifier) + "\n";
                    break;
                case "H":
                default:
                    return identifier + ": " + loadHSentence(identifier) + "\n";
                    break;
            }
        } catch (e) {
            console.log("0");
            errorHandler(e);
        }
    }

    function loadPSentence(identifier) {
        console.log("identifying " + identifier);
        if (identifier in precautionary_statements) {
            return precautionary_statements[identifier];
        }
        return "";
    }

    function loadHSentence(identifier) {
        console.log("identifying " + identifier);
        if (identifier in hazard_statements) {
            return hazard_statements[identifier];
        }
        return "";
    }

    function displaySelectedText() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    showNotification('Der ausgewählte Text lautet:', '"' + result.value + '"');
                } else {
                    showNotification('Fehler:', result.error.message);
                }
            });
    }

    function pascalize(s) {
        return s.replace(/(\w)(\w*)/g,
            function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
    }

    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        showNotification("Fehler:", error);
        console.warn("Error: " + error);
        console.log(error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Eine Hilfsfunktion zum Anzeigen von Benachrichtigungen.
    function showNotification(header, content) {
        $("#notification-header").text(header);
        $("#notification-body").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})(hazard_statements, precautionary_statements);
