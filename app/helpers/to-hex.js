import Ember from 'ember';

export function toHex(params/*, hash*/) {
  if(params[0]) {
    return '0x' + params[0].toString(16);
  }

  return '';
}

export default Ember.Helper.helper(toHex);
