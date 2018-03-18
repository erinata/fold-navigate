'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  foldNavUp() {
    // alert("hello")
    // v = "";
    // c = "";
    editor = atom.workspace.getActiveTextEditor();
    tempBuffer = editor.getBuffer();
    lastRow = tempBuffer.getLastRow();
    // for (i = 0; i < lastRow; i++) { 
    //     v += String(editor.isFoldableAtBufferRow(i)) + '\n'; 
    //     c += String(editor.indentationForBufferRow(i)) + '\n'; 
    // 
    // }
    // alert(v);
    // alert(c);
    currentRow = editor.getCursorBufferPosition().row;
    currentIndentLevel = editor.indentationForBufferRow(currentRow)
    // alert(currentRow);
    
    // Ignore comment block?
    //  alert(atom.workspace.getActiveTextEditor().scopeDescriptorForBufferPosition());
    
    for (i = tempBuffer.previousNonBlankRow(currentRow)-1; i >= 0; i--) { 
      if (editor.isFoldableAtBufferRow(i) && editor.indentationForBufferRow(i)  <= currentIndentLevel ) {
        editor.setCursorBufferPosition([i,0])
        break;
      }
    }

  },
  
  foldNavDown() {
    
    // alert("down");
    editor = atom.workspace.getActiveTextEditor();
    tempBuffer = editor.getBuffer();
    lastRow = tempBuffer.getLastRow();
    currentRow = editor.getCursorBufferPosition().row;
    currentIndentLevel = editor.indentationForBufferRow(currentRow)
    // alert(currentRow);
    
    for (i = tempBuffer.nextNonBlankRow(currentRow)+1; i < lastRow; i++) { 
      if (editor.indentationForBufferRow(i) < currentIndentLevel ) {
        editor.setCursorBufferPosition([i,0])
        break;
      }
    }

  },
  
  foldNavMatch(){

    // - if foldable
    //   - if folded
    //     - do nothing
    //   - if not folded
    //     - fold it , go down one line, record the row, unfold, go to the recoreded row -1
    // - if no foldable
    //   - go up to the previous foldable line with same of less indentation level, record as temp row
    //   - fold it, go down one line, record the row
    //   - if the record row > current row, go to temp row
    //   - if not repeat the process with indentation level -1 , repeat until we get to the beginning of the document.
    
    editor = atom.workspace.getActiveTextEditor();
    currentRow = editor.getCursorBufferPosition().row;
    currentIndentLevel = editor.indentationForBufferRow(currentRow)
    currentFoldable = editor.isFoldableAtBufferRow(currentRow)
    tempBuffer = editor.getBuffer();
    lastRow = tempBuffer.getLastRow();
    
    if (currentFoldable) {
      if (editor.isFoldedAtBufferRow(currentRow)) {
        
      } else {
        editor.foldBufferRow(currentRow);
        editor.moveDown(1);
        editor.unfoldBufferRow(currentRow);
        if (editor.getCursorBufferPosition().row != lastRow) {
            editor.moveUp(1); 
        }
        // move to the beginning of the line or first not blank col for consistency
        
      } 
    } else {
      found = false;
      for (i = tempBuffer.previousNonBlankRow(currentRow); i >= 0; i--) { 
        if (editor.isFoldableAtBufferRow(i) && editor.indentationForBufferRow(i)  <= currentIndentLevel ) {
          editor.setCursorBufferPosition([i,0]);
          editor.foldBufferRow(i);
          editor.moveDown(1);
          editor.unfoldBufferRow(i);
          if (editor.getCursorBufferPosition().row != lastRow) {
              editor.moveUp(1); 
          }
          tempRow = editor.getCursorBufferPosition().row;
          // alert(tempRow+" " + currentRow);
          if (tempRow >= currentRow) {
            editor.setCursorBufferPosition([i,0]);
            found = true;
            break;
          } else {
            editor.setCursorBufferPosition([currentRow,0]);
            currentIndentLevel = currentIndentLevel - 1;
          }
        }
      }
      if (found) {
        
      } else {
        if (currentRow == 0) {
          editor.setCursorBufferPosition([lastRow,0]);
        } else {
          editor.setCursorBufferPosition([0,0]);
        }
      }
      
      editor.scrollToCursorPosition();
    }

  },
  
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fold-navigate:fold-navigate-match': () => this.foldNavMatch()
    }));  
  },

  deactivate() {
    this.subscriptions.dispose();
  }

};
