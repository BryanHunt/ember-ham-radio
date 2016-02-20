import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default DS.Model.extend({
  contents: hasMany('radio/memory-block'),

  findSegment(address) {
    for(let block of this.get('contents')) {
      if(block.get('startAddress') <= address && block.get('endAddress') > address) {
        return block.findSegment(address);
      }
    }

    return null;
  }
});
