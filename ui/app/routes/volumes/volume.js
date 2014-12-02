import Ember from "ember";


export default Ember.Route.extend({
    model: function(params){
        return this.modelFor('volumes').findBy('id', params.volume_id);
    },
    afterModel: function(vols, transition){
        if (!vols){
            this.transitionTo('volumes');
        }
    }
});
