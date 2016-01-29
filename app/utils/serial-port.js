import Ember from 'ember';
import DS from 'ember-data';

const { on, observer, computed } = Ember;
const { Promise } = Ember.RSVP;
const { PromiseArray } = DS;

export default Ember.Object.extend({
  serialPortFactory: window.require("serialport"),

  init() {
    this.set('baudRate', 9600);
    this.set('dataBits', 8);
    this.set('stopBits', 1);
    this.set('parity', 'none');
    this.set('flowControl', false);
    this.set('rtscts', false);
    this.set('xon', false);
    this.set('xoff', false);
    this.set('xany', false);
    this.set('hupcl', true);
    this.set('rts', true);
    this.set('cts', false);
    this.set('dtr', true);
    this.set('dts', false);
    this.set('brk', false);
    this.set('bufferSize', 255);
  },

  ports: computed(function() {
    let serialPortFactory = this.get('serialPortFactory');

    return DS.PromiseArray.create({
      promise: new Promise(function(resolve, reject){
        serialPortFactory.list((error, ports) => {
          if(error) {
            reject(error);
          } else {
            let portNames = [];
            ports.forEach((port) => {
              portNames.addObject(port.comName);
            });

            resolve(portNames);
          }
        });
      })
    });
  }),

  open() {
    let _this = this;

    return new Promise((resolve, reject) => {
      let properties = ['baudRate', 'dataBits', 'stopBits', 'parity', 'rtscts', 'xon', 'xoff', 'xany', 'flowControl', 'bufferSize'];
      let options = {};

      properties.forEach((property) => {
        let value = _this.get(property);

        if (value !== undefined && value !== null) {
          options[property] = value;
        }
      });

      let serialPortFactory = _this.get('serialPortFactory');
      let serialPort = new serialPortFactory.SerialPort(_this.get('port'), options, true, (err) => {
        if(err) {
          reject(err);
        } else {
          _this.set('driver', serialPort);
          resolve();
        }
      });

      serialPort.on("data", (data) => {
        window.console.log("Data: " + data);
      });
    });
  },

  close() {
    let _this = this;

    return new Promise((resolve, reject) => {
      _this.get('driver').close((err) => {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  write(data) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.get('driver').write(data, (err) => {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
});
