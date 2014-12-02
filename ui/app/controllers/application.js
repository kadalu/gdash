import Ember from "ember";

export default Ember.Controller.extend({
    last_updated: "",
    load_time: function(){
        this.set("last_updated", new Date().getTime());
    },
    actions: {
        reload: function() {
            this.store.clear_cache();
            this.load_time();
            this.get('target.router').refresh();
        }
    }
});
