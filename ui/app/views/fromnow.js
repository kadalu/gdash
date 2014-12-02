import Ember from 'ember';

// https://github.com/jgwhite/ember-time
export default Ember.View.extend({
    tagName: 'time',
    template: Ember.Handlebars.compile('{{view.output}}'),
    output: function() {
        return moment(this.get('value'), 'x').fromNow();
    }.property('value'),
    didInsertElement: function() {
        this.tick();
    },
    tick: function() {
        var nextTick = Ember.run.later(this, function() {
            this.notifyPropertyChange('output');
            this.tick();
        }, 1000);
        this.set('nextTick', nextTick);
    },
    willDestroyElement: function() {
        var nextTick = this.get('nextTick');
        Ember.run.cancel(nextTick);
    }
});

//Ember.Handlebars.helper('fromNow', FromnowView);
