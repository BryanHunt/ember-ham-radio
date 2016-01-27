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
    this.set('rtscts', true);
    this.set('xon', true);
    this.set('xoff', true);
    this.set('xany', true);
    this.set('flowControl', true);
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
    let props = ['baudRate', 'dataBits', 'stopBits', 'parity', 'rtscts', 'xon', 'xoff', 'xany', 'flowControl', 'bufferSize'];
    let options = {};

    props.forEach(prop => {
      let value = this.get(prop);

      if (value !== undefined && value !== null) {
        options[prop] = value;
      }
    });

    this.set('driver', new SerialPort(this.get('port'), options));
  }
});
