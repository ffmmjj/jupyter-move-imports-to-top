define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, events) {
        function is_imports_only_cell(cell) {
            const cell_contents = cell.get_text();

            return cell_contents.split(/\r?\n/).every(function (line) {
                return line.startsWith('import') || line.startsWith('from');
            });
        }

        function create_empty_topmost_cell() {
            return Jupyter.notebook.insert_cell_at_index('code', 0)
        }

        // Run on start
        function load_ipython_extension() {
            Jupyter.keyboard_manager.command_shortcuts.add_shortcut('o', {
                help : 'move imports to topmost cell',
                help_index : 'zz',
                handler : function (event) {
                    const cells = Jupyter.notebook.get_cells();
                    let firstCell = cells[0];
                    if (!is_imports_only_cell(firstCell)) {
                        firstCell = create_empty_topmost_cell();
                    }

                    const importsFound = [];
                    cells.slice(1).forEach( function (cell) {
                        const cellContents = cell.get_text();
                        const newCellContents = [];

                        cellContents.split(/[\r\n]+/).forEach(function (line) {
                            const trimmedLine = line.trim();

                            if (trimmedLine.startsWith('import ') || trimmedLine.startsWith('from ')) {
                                importsFound.push(trimmedLine);
                            } else {
                                newCellContents.push(line);
                            }
                        });

                        cell.set_text(newCellContents.join('\n'));
                    });

                    const newImportsList = firstCell.get_text().split(/[\r\n]+/).concat(importsFound);
                    firstCell.set_text(newImportsList.join('\n'));

                    return false;
                }}
            );
        }
        return {
            load_ipython_extension: load_ipython_extension
        };
});
