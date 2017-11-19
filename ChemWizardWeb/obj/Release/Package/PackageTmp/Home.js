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
                $("#template-description").text("This plugin requires a newer version of Word.");
                return;
            }

            // Fügt einen Klickereignishandler für die Hervorhebungsschaltfläche hinzu.
            $('#pubchem-button').click(completeTable);
            $('#hp-button').click(resolveHPSentences);

            console.log("ChemWizard initialized");
        });
    };


    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        showNotification("Error:", error);
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
