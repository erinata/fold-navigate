# Fold Navigate

Navigate to the beginning and end of blocks of code according to the fold(or indentation) levels.

## Usage

There is only one command foldNavMatch (default keymap is "ctrl-alt-m"). If the cursor is currently at the beginning of a block, the cursor will move to the end of the block. If the cursor is currently inside a block, the cursor will move to the beginning of the block.

If the cursor is not in and block of code, the cursor will move to the beginning of the document. And if the cursor is currently at the beginning of document, it will move to the end of the document. In other words, the whole document is treated as a huge (and root) block of code.

This behaviour mimics the behaviour of the package bracket-match. In many case, when the block is delimited by curly braces, foldNavMatch will act exactly like the bracket-match package. However, foldNavMatch also works in other situations where bracket-match won't. For example, in case of languages like python or ruby, where curly braces is not use for blocks, or in situation where you want to navigate to the beginning of the block instead of the nearest parenthesis.

## Issues and TODOs

- Somehow there a a glitch when the block ends at the end of the document.

- The package use both the fold and indentation to identify the fold range. For languages which doesn't indent according to the block (like markdown), this packakge won't work even after adding fold markers.

- For lanaguages where the end tag is not included in the fold range (like latex), this package will be confused when the foldNavMatch is activated at the end tag.

- I don't know how to identify the fold range (I thought there should be something in the API). Therefore now the package is using a very stupid method, which is to actually fold the code and move the cursor and see where the cursor goes. There got to be a cleaner method with better performance.

- There should be several sensible options
  - to select whole line instead of just moving to the beginning of the line
  - ignore comment blocks during navigation
