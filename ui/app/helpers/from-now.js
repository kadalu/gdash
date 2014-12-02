import Ember from 'ember';

export function fromNow(input) {
  return input;
};

export default Ember.Handlebars.makeBoundHelper(fromNow);
