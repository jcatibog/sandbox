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
      const contactInfo = {
        email: this.get('email'),
        message: this.get('message')
      };
      const newContactMessage = this.store.createRecord('contact', contactInfo);
      newContactMessage.save().then((response)  => {
        this.set('commentReceived', true);
        this.set('email', '');
        this.set('message', '');
      });
    }
  }
});
