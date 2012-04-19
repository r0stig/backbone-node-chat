
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketio = require('socket.io')
  , nickname_helper = require('./helpers/nickname_helper');

var app = module.exports = express.createServer();
var sio = socketio.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/* Everything related to socket.io under */
	sio.sockets.on('connection', function (socket) {
	
		// Welcome message
		socket.send('Welcome to da serva, ch00se jår nick plzz!');
		
		
		// Send the list of users conntected
		socket.emit('users_connected', { list : nickname_helper.get_list_json()});

	  socket.on('setnick', function(data) {
		var nick = data.nick;
		// Checks if the username is alredy in use
		if( ! nickname_helper.exists(nick)) {
			try {
				nickname_helper.add(nick);
				socket.set('nick', nick);
				sio.sockets.emit('user_connected', {nickname : nick});
			} catch(err) {
				// Wrong format?
				socket.emit('error', { msg: 'Wrong format, try again please.' });
			}
		} else {
			socket.emit('error', { msg: 'Nick alredy in use' });
		}

	  });
	  socket.on('message', function(data, callback) {
		//console.log('Received message + ' + data);
		// Sends the message to everyone
		socket.get('nick', function(err, nick){
			// Does the user has a username yet?
			if(nick === null) {
				socket.emit('error', { msg : "You can't talk without a name!" });
			} else {
				sio.sockets.send(nick + ': ' + data);
			}
		});
		
	  });
	  
	  socket.on('disconnect', function() {
		socket.get('nick', function(err, nick){
			sio.sockets.emit('user_disconnected', {nickname :nick });
			// Remove the entry from the array
			nickname_helper.remove(nick);
			console.log('User disconnected, removed the entry from the array');
		});
	  });
	  
	  /*socket.emit('news', { hello: 'world' });
	  socket.on('my other event', function (data) {
		console.log(data);
	  });*/
	});