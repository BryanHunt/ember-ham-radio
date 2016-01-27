import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  startAddress: attr('number'),
  endAddress: attr('number'),
  segmentSize: attr('number'),
  segments: hasMany('radio/memory-segment', {embedded: true}),

  findSegment(address) {
    var segment = 'segments.' + ((address - this.get('startAddress')) / this.get('segmentSize'));
    return this.get(segment);
  }
});
