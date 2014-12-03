import Ember from "ember";

export default Ember.Object.extend({
    brick_status_class: function(){
        if (this.get("status").toLowerCase() === "up"){
            return "up";
        }
        else{
            return "down";
        }
    }.property("status"),
    brick_up: function(){
        return this.get("status").toLowerCase() === "up";
    }.property("status"),
    usedPercentage: function(){
        var p = (this.get("sizeTotal") - this.get("sizeFree"))*100/this.get("sizeTotal");
        return parseInt(p, 10);
    }.property('sizeFree', 'sizeTotal'),
    usedPercentageWidth: function(){
        var p = (this.get("sizeTotal") - this.get("sizeFree"))*100/this.get("sizeTotal");
        return 'width: %@%'.fmt(p);
    }.property('sizeFree', 'sizeTotal'),
    barColor: function(){
        var p = (this.get("sizeTotal") - this.get("sizeFree"))*100/this.get("sizeTotal");
        if (p > 90){
            return "red";
        }
        return "green";
    }.property('sizeFree', 'sizeTotal'),
});
