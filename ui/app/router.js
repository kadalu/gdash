import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.resource('volumes', function(){
        this.route('volume', {path: ':volume_id'});
    });
});

export default Router;
