Move imports to topmost cell
=========
This extension finds imports scattered throughout the notebook and moves them to the topmost cell (or creates a topmost cell containg only imports if it doesn't exist yet).

## Usage
Press `o` in command mode move all imports to the topmost cell.

## Limitations
- It doesn't sort the imports according to [PEP8 guidelines](https://www.python.org/dev/peps/pep-0008/#imports).
