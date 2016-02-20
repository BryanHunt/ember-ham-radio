import Ember from 'ember';
import SerialPort from '../utils/serial-port';

const { Service, computed } = Ember;
const { Promise } = Ember.RSVP;

export default Service.extend({
  serialPortFactory: window.require("serialport"),

  init() {
    this.set('ports', {});
  },

  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
  flowControl: false,
  rtscts: false,
  xon: false,
  xoff: false,
  xany: false,
  hupcl: true,
  rts: true,
  cts: false,
  dtr: true,
  dts: false,
  brk: false,
  bufferSize: 255,

  fetchPorts() {
    let serialPortFactory = this.get('serialPortFactory');

    return new Promise((resolve, reject) => {
      serialPortFactory.list((error, ports) => {
        if(error) {
          reject(error);
        } else {
          resolve(ports.mapBy('comName'));
        }
      });
    });
  },

  open(port, dataHandler, options = {}) {
    let defaults = this.getProperties([
      'baudRate',
      'dataBits',
      'stopBits',
      'parity',
      'rtscts',
      'xon',
      'xoff',
      'xany',
      'flowControl',
      'bufferSize'
    ]);

    options = Ember.merge(options, defaults);
    let ports = this.get('ports');

    if(ports[port]) {
      return null; // TODO throw error
    }

    let driver = SerialPort.create();
    ports[port] = driver;
    return driver.open(this, port, dataHandler, options);
  },

  close(port) {
    let ports = this.get('ports');
    delete ports[port];
  }
});
