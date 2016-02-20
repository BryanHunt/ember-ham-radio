import Ember from 'ember';

export default Ember.Route.extend({
  serialPort: Ember.inject.service(),
  uv5r: Ember.inject.service(),

  model() {
    return this.get('serialPort').fetchPorts();
  },

  actions: {
    refreshPorts() {
      this.refresh();
    },

    testPort(portName) {
      this.get('uv5r').importFrom(portName);
    }
  }
});
