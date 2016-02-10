import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',
  message: '',

  // computed properties
  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isValidMessage: Ember.computed.gte('message.length', 5),
  isValidForm: Ember.computed.and('isValidEmail', 'isValidMessage'),
  isButtonDisabled: Ember.computed.not('isValidForm'),

  actions: {
    saveContactMessage() {
      alert(`${this.get('emailAddress')}: ${this.get('message')}`);
      this.set('commentReceived', true);
      this.set('emailAddress', '');
      this.set('message', '');
    }
  }
});
