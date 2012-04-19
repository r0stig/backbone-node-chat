 //Filename: js/models/messages.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
], function($, _, Backbone){
  
	var MessageModel = Backbone.Model.extend({
		defaults: {
			message: null,
			timestamp: null,
			nick: null
		}
	});
  return MessageModel;
});