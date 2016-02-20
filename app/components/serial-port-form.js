import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  actions: {
    refreshPorts() {
      this.sendAction('refreshPorts');
    },

    testPort() {
      this.sendAction('testPort', this.get('port'));
    }
  }
});
