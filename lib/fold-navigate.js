'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  hello(s) {
    alert("hello")
  },
  
  
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fold-navigate:fold-navigate-test': () => this.hello()
    }));
    
  },

  deactivate() {
    this.subscriptions.dispose();
  }

};
