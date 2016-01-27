import { moduleForModel, test } from 'ember-qunit';

moduleForModel('radio/memory-block', 'Unit | Serializer | radio/memory block', {
  // Specify the other units that are required for this test.
  needs: ['serializer:radio/memory-block']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
