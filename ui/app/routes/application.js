import Ember from "ember";

export default Ember.Route.extend({
    setupController: function(controller, model){
        controller.load_time();
        this._super(controller, model);
    }
});

