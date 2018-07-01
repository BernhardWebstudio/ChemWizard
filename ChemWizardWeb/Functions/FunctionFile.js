// Die Initialisierungsfunktion muss bei jedem Laden einer neuen Seite ausgeführt werden.
(function () {
    if (Office !== undefined) {
        Office.initialize = function (reason) {
            // Wenn eine Initialisierung erfolgen muss, kann dies hier geschehen.
            console.log("init");
        };
    } else {
        console.log("office undefined");
    }
})();


function completeTable(event) {
    console.log("ChemWizard starts loading data");
    Word.run(function (context) {
        // Reiht einen Befehl zum Abrufen der aktuellen Auswahl in die Warteschlange ein und
        // erstellt dann ein Proxybereichsobjekt mit den Ergebnissen.
        var table = context.document.getSelection().parentTable;

        // Reiht einen Befehl in die Warteschlange ein, um das Bereichsauswahlergebnis zu laden.
        table.load("values, rows/items/cells/items/body");

        //context.trackedObjects.add(table);

        // Synchronisiert den Zustand des Dokuments durch Ausführen der in die Warteschlange eingereihten Befehle
        // und gibt eine Zusage zum Angeben des Abschlusses der Aufgabe zurück.
        return context.sync()
            .then(function () {
                // loop over table
                for (var row = 0; row < table.values.length; row++) {
                    for (var column = 0; column < table.values[row].length; column++) {
                        // use closures to keep cell index variables for ajax
                        (function (row, column, table, context) {
                            if ((table.values[row][column].trim() === "" || !table.values[row][column]) && table.values[row][0] && table.values[0][column]) {
                                // TODO: load more than one datapoint at once. 
                                // e.g. comma separated. docs: https://pubchem.ncbi.nlm.nih.gov/pug_rest/PUG_REST.html#_Toc458584210
                                var compound = pascalize(table.values[row][0]);
                                var property = pascalize(table.values[0][column]);
                                console.log("loading " + property + " of " + compound);
                                var data = loadDataFromPubchem(compound, property);

                                // insert data
                                table.rows.items[row].cells.items[column].body.insertText(data, 'End');
                                console.log("data: " + data);
                                return context.sync().then(function () {
                                    console.log("synced");
                                }).catch(function (e) {
                                    console.log("0");
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
    }).then(function () {
        endEvent(event);
    })
        .catch(function (e) {
            console.log("3");
            errorHandler(e);
            endEvent(event);

        });
}

/**
 * Load propery of compound from PubChem
 *
 * @param {string} compound the search
 * @param {string} property the property of the search
 */
function loadDataFromPubchem(compound, property) {
    return getDataSync("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + compound + "/property/" + property + "/txt");
}

/**
 * Load Data from WikiData
 * 
 * @param {string} compound the search
 * @param {string} property the property of the search
 * */
var wikidataCache = [];
var endpoint = "https://www.wikidata.org/w/api.php?format=json&languages=en&type=item&errorformat=none";
function loadDataFromWikidata(compound, property) {
    if (compound in wikidataCache) {
        return wikidataCache[compound][property];
    }

    var url = endpoint + "&action=websearchentities&search=" + compound;
    var searchResults = JSON.parse(getDataSync(url));
    // TODO: handle not found & get more than just first item
    var item = searchResults["search"][0];
    var itemUrl = endpoint + "&action=wbgetentities&ids=" + item["id"];
    var itemInfo = JSON.parse(getDataSync(itemUrl));
    wikidataCache[compound] = itemInfo["entities"][item["id"]]; // @TODO: extract properties as the current result will not be usable
    // unnecessary recursion to prevent unnecessary repetition
    return loadDataFromWikidata(compound, property);
}

/**
 * GET data in a non-async way
 * 
 * @param {string} url
 */
function getDataSync(url) {
    $.ajax({
        url: url,
        async: false
    }).done(function (data) {
        return data;
    });
}

function endEvent(event) {
    if (event) {
        console.log("event completed");
        event.completed();
    } else {
        console.log("no event to end");
    }
}

/**
 * function to resolve H & P identifier in the selected table to their linguistic counterpart
 * 
 * @param {any} event
 */
function resolveHPSentences(event) {
    console.log("ChemWizard starts resolving H & P sentences");
    Word.run(function (context) {
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
    }).then(function () {
        endEvent(event);
    }).catch(errorHandler);
    if (event) {
        event.completed();
    }
}

function resolveHPSentence(identifier) {
    console.log("identifiying...");
    var mode = identifier.charAt(0);
    try {
        switch (mode) {
            case "P":
                return identifier + ": " + loadPSentence(identifier) + "\n";
            case "H":
            default:
                return identifier + ": " + loadHSentence(identifier) + "\n";
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
    s = s.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
    return s.replace(/\s/g, '');
}

function errorHandler(e) {
    console.log(e);
}