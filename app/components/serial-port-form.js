import Ember from 'ember';
import SerialPort from '../utils/serial-port';

const { Component, computed } = Ember;

export default Component.extend({
  ports: computed.alias('serialPort.ports'),

  init() {
    this._super.apply(this, arguments);
    this.set('serialPort', SerialPort.create());
  }
});
