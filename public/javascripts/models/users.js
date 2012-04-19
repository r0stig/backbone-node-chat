//Filename: js/models/users.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
], function($, _, Backbone){
	var usersModel = Backbone.Model.extend({
		defaults: {
			nick: null
		}
	});
  return usersModel;
}); 