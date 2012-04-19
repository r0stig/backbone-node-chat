//Filename: boilerplate.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
  , 'models/users'
  , 'collections/users'
  , 'text!templates/chat/users_online.html'
], function($, _, Backbone, userModel, userCollection, usersOnlineTemplate){

	var chat_user_view = Backbone.View.extend({
		
		initialize: function() {
			this.users = userCollection;
			
		}
		, render: function() {
			var data = { users: this.users.toJSON() };
			var compiled_template = _.template( usersOnlineTemplate, data);
			
			$(this.el).html( compiled_template );
			
		}
	});
  return new chat_user_view;
});