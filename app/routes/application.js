import Ember from 'ember';

export default Ember.Route.extend({
  serialPort: Ember.inject.service(),

  model() {
    return this.get('serialPort').fetchPorts();
  },

  actions: {
    refreshPorts() {
      this.refresh();
    },

    testPort(port) {
      this.get('serialPort').open(port).then((driver) => {
        driver.write(0x6);
        let data = driver.read();
        window.console.log("Data: " + data);
        driver.close();        
      });
    }
  }
});
