import Ember from 'ember';
import SerialPort from '../utils/serial-port';
import radio from '../utils/radios/uv5r';

const { Component, computed } = Ember;

export default Component.extend({
  ports: computed.alias('serialPort.ports'),
  port: computed.alias('serialPort.port'),

  init() {
    this._super.apply(this, arguments);
    this.set('serialPort', SerialPort.create());
  },

  actions: {
    test() {
      window.console.log("test");
      radio(this.get('serialPort'));
    }
  }
});
