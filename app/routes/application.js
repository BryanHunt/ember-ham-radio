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
    readData(port) {
      this.get('serialPort').open(port);
    }
  }
});
