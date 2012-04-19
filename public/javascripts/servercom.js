//Filename: javascripts/servercom.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
  , 'SocketIO'
  , 'models/messages'
  , 'models/users'
], function($, _, Backbone, SocketIO, messageModel, userModel){
  
  var socket;
  
  
  start = function(listView, listUsersView) {
	socket = io.connect('http://192.168.1.4:3000');
	
	  socket.on('message', function(data) {
		//console.log('fick detta från servern: ' + data);
		console.log('Received message from the server...' + data);
		//console.log(listView);
		listView.messages.add(new messageModel({ message: data} ));
		listView.render();
		//listView.receivedMessage(data);
	  });
	  socket.on('users_connected', function(data) {
		// Loop all the users conntected
		for(var i = 0; i < data.list.length; i++) {
			if(data.list[i].hasOwnProperty('nickname')) {
				listUsersView.users.add(new  userModel({ nick: data.list[i].nickname }) );
			}
		}
		// Render the users online again
		listUsersView.render();
	  });
	  socket.on('user_connected', function(data) {
		// User connected
		listUsersView.users.add(new userModel({ nick: data.nickname}) );
		
		listUsersView.render();
	});

	  socket.on('user_disconnected', function(data) {
		// The server keeps track of usernames
		// This function does never return multiple usernames
		var model = listUsersView.users.where({nick: data.nickname });
		listUsersView.users.remove(model);
		
		listUsersView.render();
	  });
  }
  post = function(mess) {
	socket.send(mess);
  }
  
  set_nick = function(n) {
	socket.emit('setnick', {nick : n });
  }
  
  // Kanske en funktion här typ postMessage som helt enkelt en View får kalla på?
  // Börjar bli väldigt bökigt?
  return {
	start: start
	, post: post
	, set_nick: set_nick
  };
});