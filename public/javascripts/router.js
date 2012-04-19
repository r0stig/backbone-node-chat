// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/chat/list'
  , 'views/chat/users_list'
  , 'servercom'

], function($, _, Backbone, chatListView, chatUserOnlineView, socket){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'chat': 'showChat',
      //'/users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    },
      // As above, call render on our loaded module
      // 'views/users/list'
    showChat: function(){
	
	  chatUserOnlineView.setElement( $("#users_online") );
	  chatListView.setElement( $("#main") );
      chatListView.render();
	  
	  chatUserOnlineView.render()
	  
	  socket.start(chatListView, chatUserOnlineView);
    },
    defaultAction: function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
