 //Filename: js/collections/messages.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
  , 'models/messages'
], function($, _, Backbone, messageModel){
	var messageCollection = Backbone.Collection.extend({
		model: messageModel
		
	});
  return new messageCollection;
});