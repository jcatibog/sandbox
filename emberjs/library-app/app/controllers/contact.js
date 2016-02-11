import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  message: '',

  // computed properties
  isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
  isValidMessage: Ember.computed.gte('message.length', 5),
  isValidForm: Ember.computed.and('isValidEmail', 'isValidMessage'),
  isButtonDisabled: Ember.computed.not('isValidForm'),

  actions: {
    saveContactMessage() {
      alert(`${this.get('email')}: ${this.get('message')}`);
      this.set('commentReceived', true);
      this.set('email', '');
      this.set('message', '');
    }
  }
});
