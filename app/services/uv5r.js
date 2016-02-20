import Ember from 'ember';
import { task } from 'ember-concurrency';

const magicNumber = [0x50, 0xBB, 0xFF, 0x20, 0x12, 0x07, 0x25];

export default Ember.Service.extend({
  serialPort: Ember.inject.service(),
  currentState: 0,

  dataHandler: task(function * (data) {
    switch(this.get('currentState'))
    {
      case 1:
        if(data.length !== 1 || data[0] !== 0x6) {
          window.console.log("unexpected response from radio to magic number");
        } else {
          this.set('currentState', 2);
          this.set('identifier', []);
          this.write([0x2]);
        }
        break;

      case 2:
        this.set('identifier', this.get('identifier').concat(data));

        if(this.get('identifier').length === 8) {
          this.set('currentState', 3);
          this.write([0x6]);
        }
        break;

      case 3:
        if(data.length !== 1 || data[0] !== 0x6) {
          window.console.log("unexpected response from radio to clone");
        } else {
          this.cancel();
        }
        break;
    }
  }),

  importFrom(portName) {
    let _this = this;
    this.get('serialPort').open(portName, this.get('dataHandler')).then((driver) => {
      _this.set('driver', driver);
      _this.set('currentState', 1);
      _this.write(magicNumber);
    });
  },

  cancel() {
    window.console.log("closing driver");
    this.set('currentState', 0);
    this.get('driver').close();
  },

  write(data) {
    this.get('driver').write(data); // TODO handle .then() error
  }
});
