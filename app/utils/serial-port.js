import Ember from 'ember';

const { Promise } = Ember.RSVP;

const serialPortFactory = window.require("serialport");

export default Ember.Object.extend({
  open(manager, port, dataHandler, options) {
    this.set('manager', manager);
    this.set('port', port);
    let _this = this;

    return new Promise((resolve, reject) => {
      let serialPortDriver = new serialPortFactory.SerialPort(port, options, true, (err) => {
        if(err) {
          reject(err);
        } else {
          serialPortDriver.on('error', (error) => window.console.log("Error" + error));
          serialPortDriver.on('open', (data) => window.console.log("Open: " + data));
          serialPortDriver.on('close', (data) => window.console.log("Open: " + data));
          serialPortDriver.on('data', (data) => dataHandler.perform(data));
          _this.set('driver', serialPortDriver);
          resolve(_this);
        }
      });
    });
  },

  close() {
    this.get('manager').close(this.get('port'));
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
    let _this = this;

    return new Promise((resolve, reject) => {
      let buffer = this.get('buffer');
      this.set('buffer', Ember.A());
      return buffer;

    });
    // TODO: handle async update and clearing of buffer
    // TODO: honor size param
  },

  write(data) {
    let driver = this.get('driver');

    return new Promise((resolve, reject) => {
      driver.write(data, (error) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
});
