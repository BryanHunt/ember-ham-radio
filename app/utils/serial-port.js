import Ember from 'ember';
import DS from 'ember-data';

const { computed, run } = Ember;
const { Promise } = Ember.RSVP;
const { PromiseArray } = DS;

const serialPortFactory = window.require("serialport");

export default Ember.Object.extend({

  close() {
    let driver = this.get('driver');

    return new Promise((resolve, reject) => {
      driver.close((error) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },

  read(size) {
    let driver = this.get('drive');
    let buffer;
    return new Ember.RSVP.Promise(function(resolve, reject){
      driver.on('data', function(){

      });
    });
  },

  readLine() {

  },

  write(data) {
    // single byte
    // multiple bytes
    // line

  }
});

SerialPort.openClass({
  initialize(port, options) {
    return new Promise((resolve, reject) => {
      let serialPortDriver = new serialPortFactory.SerialPort(port, options, true, (err) => {
        if(err) {
          reject(err);
        } else {
          let serialPort = SerialPort.create({driver: serialPortDriver});
          resolve(serialPort);
        }
      });
    });
  }
});

//
// let _this = this;
// return new Promise((resolve, reject) => {
//   _this.get('driver').write(data, (err) => {
//     if(err) {
//       reject(err);
//     } else {
//       resolve();
//     }
//   });
// });
