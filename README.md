Move imports to topmost cell
=========
This extension finds imports scattered throughout the notebook and moves them to the topmost cell (or creates a topmost cell containg only imports if it doesn't exist yet).

## Installation
First, make sure that you have the [jupyter_nbcontrib_extensions](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html) add-ons installed.

Then do
```
git clone https://github.com/ffmmjj/jupyter-move-imports-to-top.git
jupyter nbextension install jupyter_move_imports_to_top/
jupyter nbextension enable jupyter_move_imports_to_top/main
```

and you should be all set!

## Usage
Press `o` in command mode to move all imports to the topmost cell.

## Limitations
- It doesn't sort the imports according to [PEP8 guidelines](https://www.python.org/dev/peps/pep-0008/#imports). It's possible, though, to use the [autopep8 extension](https://github.com/kenkoooo/jupyter-autopep8) right after this one to achieve that.
