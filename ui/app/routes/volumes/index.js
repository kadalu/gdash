import Ember from "ember";
import Summary from "ui/models/summary";


export default Ember.Route.extend({
    model: function(params){
        return Summary.create({
            "vols": this.modelFor('volumes')
        });
    },
});
