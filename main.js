define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, _) {
        function isImportsOnlyCell(cell) {
            const cell_contents = cell.get_text();

            return cell_contents.split(/\r?\n/).every(function (line) {
                return line.startsWith('import') || line.startsWith('from');
            });
        }

        function createEmptyTopmostCell() {
            return Jupyter.notebook.insert_cell_at_index('code', 0)
        }

        function allCellLinesEmpty(newCellContents) {
            return (newCellContents.length === 0) || newCellContents.every(function (line) {
                return line.trim() === '';
            });
        }

        // Run on start
        function loadIpythonExtension() {
            Jupyter.keyboard_manager.command_shortcuts.add_shortcut('o', {
                help : 'move imports to topmost cell',
                help_index : 'zz',
                handler : function (event) {
                    if (!isImportsOnlyCell(Jupyter.notebook.get_cell(0))) {
                        createEmptyTopmostCell();
                    }
                    const cells = Jupyter.notebook.get_cells();
                    const firstCell = cells[0];
                    const importsFound = [];
                    const cellsToDelete = [];

                    cells.slice(1).forEach( function (cell, cellIndex) {
                        const cellContents = cell.get_text();
                        const newCellContents = [];

                        cellContents.split(/[\r\n]+/).forEach(function (line) {
                            const trimmedLine = line.trim();

                            if (trimmedLine.startsWith('import ') || trimmedLine.startsWith('from ')) {
                                importsFound.push(trimmedLine);
                            } else if (trimmedLine !== '') {
                                newCellContents.push(line);
                            }
                        });

                        if (allCellLinesEmpty(newCellContents)) {
                            cellsToDelete.push(cellIndex+1);
                        } else {
                            cell.set_text(newCellContents.join('\n'));
                        }
                    });

                    let firstCellContentsLines = firstCell.get_text().split(/[\r\n]+/);
                    if (firstCellContentsLines[0] === '') {
                        // Remove first line if it is empty
                        firstCellContentsLines = firstCellContentsLines.slice(1)
                    }
                    const newImportsList = firstCellContentsLines.concat(importsFound);
                    firstCell.set_text(newImportsList.join('\n'));

                    Jupyter.notebook.delete_cells(cellsToDelete);

                    return false;
                }}
            );
        }
        return {
            load_ipython_extension: loadIpythonExtension
        };
});
