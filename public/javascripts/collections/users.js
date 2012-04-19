//Filename: js/collections/users.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
  , 'models/users'
], function($, _, Backbone, userModel){

	var usersCollection = Backbone.Collection.extend({
		model: userModel
	});
  return new usersCollection;
  // What we return here will be used by other modules
});