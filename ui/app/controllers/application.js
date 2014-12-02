import Ember from "ember";

export default Ember.Controller.extend({
    value: "",
    last_updated_str: "",
    last_updated: function(){
        return this.get('last_updated_str');
    }.property("last_updated_str"),
    init: function() {
        this.tick();
        this._super();
    },
    load_time: function(){
        this.value = new Date().getTime();
        this.update();
    },
    update: function(){
        if (this.get('value') !== ""){
            this.set("last_updated_str", moment(this.get('value'), 'x').fromNow());
        }
        return "";
    },
    tick: function() {
        var nextTick = Ember.run.later(this, function() {
            this.update();
            this.notifyPropertyChange('last_updated');
            this.tick();
        }, 1000);
        this.set('nextTick', nextTick);
    },
    actions: {
        reload: function() {
            this.store.clear_cache();
            this.load_time();
            this.get('target.router').refresh();
        }
    }
});
