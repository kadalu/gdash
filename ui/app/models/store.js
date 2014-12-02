import Ember from "ember";

var cache = {};
var cacheEnabled = true;

export default Ember.Object.extend({
    clear_cache: function(){
        cache = {};
    },
    find: function(name, id) {
        
        if (cacheEnabled && cache[name] && cache[name][id]) {
            return cache[name][id];
        }
        
        var adapter = this.container.lookup('adapter:' + name);
        return adapter.find(name, id).then(function(record) {
            if (cacheEnabled){
                cache[name] = cache[name] || {};
                cache[name][id] = record;
            }
            return record;
        });
    }
});
