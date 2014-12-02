import Ember from "ember";

export default Ember.Object.extend({
    clusters: function(){
        var clusters = {};
        this.get("vols").forEach(function(val){
            var up = val.status.toLowerCase() === 'started' ? 1 : 0;
            if (clusters[val.cluster]){
                clusters[val.cluster].up_volumes += up;
                clusters[val.cluster].num_volumes += 1;
                clusters[val.cluster].down_volumes = clusters[val.cluster].num_volumes - clusters[val.cluster].up_volumes;
            }
            else{
                clusters[val.cluster] = {
                    up_volumes: up,
                    num_volumes: 1,
                    down_volumes: (1 - up),
                    name: val.cluster
                };
            }
        });
        var cluster_arr = [];
        for(var key in clusters){
            cluster_arr.push(clusters[key]);
        }
        return cluster_arr;
    }.property("vols"),
    num_volumes: function(){
        return this.get("vols").length;
    }.property("vols"),
    up_volumes: function(){
        var up_volumes = 0;
        this.get("vols").forEach(function(val){
            if (val.status.toLowerCase() === "started"){
                up_volumes += 1;
            }
        });
        return up_volumes;
    }.property("vols"),
    down_volumes: function(){
        return this.get("num_volumes") - this.get("up_volumes");
    }.property("num_volumes", "up_volumes"),
    num_clusters: function(){
        return this.get("clusters").length;
    }.property("vols")
});
