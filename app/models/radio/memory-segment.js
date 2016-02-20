import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  startAddress: attr('number'),
  segmentSize: attr('number'),
  contents: attr()
});
