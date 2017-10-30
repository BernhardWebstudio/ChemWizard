# ChemWizard
Word Plugin with the purpose to simplify the task of writing a chemistry report

This add-in is *the* one for the relevant tasks related to chemistry. When filling out a 
table for a report, this plugin will help you save time by fetching the data from the internet or resolving the 
hazardous and precautionary statements. Just select the table, which should be completed, and press the appropriate 
button in the ribbon bar to complete the table. Read on to learn more on the available functions.

## Available functions:
- complete table with PubChem data
- translate H & P numbers to their appropriate equivalent numbers

### Complete table with PubChem
Choose a table, which you want to complete and click the appropriate button.
The table has to be formated as follows: the first row should contain the name of the property you want to load, whereas
the first column should contain the name of your contain. Available properties can be seen up here: 
[PubChem API](https://pubchem.ncbi.nlm.nih.gov/pug_rest/PUG_REST.html)

### Complete H & P sentences table with text
Choose a table which contains identifiers for hazardous or precautionary statements, 
e.g. "H201", and press the appropriate button. The plugin will replace it with "H201 : Explosive; mass explosion hazard".

## TODO:
[ ] be more flexible about table layout
[ ] load H&P data & symbols for compounds
