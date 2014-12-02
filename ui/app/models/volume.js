import Ember from "ember";


export default Ember.Object.extend({
    volume_up: function(){
        return this.get("status").toLowerCase() === "started";
    }.property("status"),
    down_bricks: function(){
        return this.get("num_bricks") - this.get("up_bricks");
    }.property("up_bricks", "num_bricks"),
});
