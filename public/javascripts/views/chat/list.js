 //Filename: js/views/chat/list.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
  , 'SocketIO'
  ,'text!templates/chat/list.html'
  ,'text!templates/chat/choose_nickname.html'
  ,'collections/messages'
  , 'models/messages'
  , 'servercom'
], function($, _, Backbone, SocketIO, chatListTemplate, chatNickTemplate,
				messagesCollection, messagesModel, server){
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accesible in the global scope
  
 // initialize = function(messagesCollection){
  
	var chatListView = Backbone.View.extend({
		
		
		initialize: function() {
			// The current state
			this.state = 0;
			this.messages = messagesCollection;
			// Some init-values
			this.render();
		}
		, events: {
			'click #write_button' : 'postMessage',
			'click #nickname_button' : 'chooseNick'
		}
		, render: function() {
			var data = {};
			var compiled_template;
			if(this.state == 0) {	// state == 0 is choose username
				data = { error: null };
				compiled_template = _.template( chatNickTemplate, data);
			} else {	// or else we got a username and are ready for chatting(!)
				data = {messages: this.messages.toJSON()};
				compiled_template = _.template( chatListTemplate, data);
			}
			$(this.el).html(compiled_template);
		}
		
		, postMessage: function() {
			console.log('postMessage');
			server.post( $("#write_input").val() );
		}
		, chooseNick: function() {
			console.log('chooseNick');
			server.set_nick( $("#nickname_input").val() );
			this.state = 1;
			this.render();
			// TO-DO: Add a check that the user bleh bleh
		}
		, receiveMessage: function(mess) {
			console.log('receiveMessage');
			this.messages.add(new messagesModel({ message: mess }) );
			this.render();
		}
		, messageAdd: function() {
			console.log('hehe ..');
			console.log(this);
		}
		
		
	
	});

//	return new chatListView
  //}

	
	return new chatListView;
  //return {
//	initialize : initialize
 // };
  // What we return here will be used by other modules
});