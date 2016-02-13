import Ember from 'ember';
import SerialPort from '../utils/serial-port';
import radio from '../utils/radios/uv5r';

const { Component, computed } = Ember;

export default Component.extend({

  actions: {
    refreshPorts() {
      this.sendAction('refreshPorts');
    },

    readData() {
      this.sendAction('readData', this.get('port'));
    }
  }
});
