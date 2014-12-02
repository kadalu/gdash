import Ember from "ember";
import ajax from "ic-ajax";
import Brick from "ui/models/brick";
import Volume from "ui/models/volume";
import config from '../config/environment'; 

export default Ember.Object.extend({
    find: function(name, id){
        return ajax(config.apiUrl)
            .then(function(result){
                return result.map(function(c){
                    var bricks = c.bricks.map(function(brick){
                        return Brick.create(brick);
                    });
                    c.bricks = bricks;
                    return Volume.create(c);
                });
            });
    }
});
