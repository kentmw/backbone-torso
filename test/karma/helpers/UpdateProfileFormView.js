var TorsoFormView = require('../../../modules/FormView');
require('../../../modules/handlebarsUtils')(require('hbsfy/runtime'));
var _ = require('underscore');

module.exports = TorsoFormView.extend({
  template: require('./binding-test-template.hbs'),

  events: {
    'click .submit.primary': 'submitCallback'
  },

  feedback: [{
    when: {'@fullName': ['change']},
    then: function(evt) { return {text: this.model.preValidate('fullName')};},
    to: 'fullName-error'
  }, {
    when: {'@email': ['change']},
    then: function(evt) { return {text: this.model.preValidate('email')};},
    to: 'email-error'
  }, {
    when: {
      '@shortBio': ['change'],
    },
    then: function(evt) { return {text: this.model.preValidate('shortBio')};},
    to: 'shortBio-error'
  }, {
    when: {
      '@gender': ['change'],
    },
    then: function(evt) { return {text: this.model.preValidate('gender')};},
    to: 'gender-error'
  }, {
    when: {
      '@schedule': ['change'],
    },
    then: function(evt) { return {text: this.model.preValidate('schedule')};},
    to: 'schedule-error'
  }, {
    when: {
      '@dates[x].date': ['change'],
    },
    then: function(evt, indexMap) { return {text: this.model.preValidate('dates[' + indexMap.x + '].date')};},
    to: 'my-date-feedback[x]-error'
  }, {
    when: {
      '@dates[x].levels[y]': ['change'],
    },
    then: function(evt, indexMap) { return {text: this.model.preValidate('dates[' + indexMap.x + '].levels[' + indexMap.y + ']')};},
    to: 'my-date-levels[x][y]-error'
  }],

  prepare: function() {
    return _.extend({
      weekdays: this.weekdays
    }, TorsoFormView.prototype.prepare.call(this));
  },

  weekdays: ['M', 'T', 'W', 'R', 'F'],

  submitCallback: function(evt) {
    this.model.validate();
    return false;
  },
});