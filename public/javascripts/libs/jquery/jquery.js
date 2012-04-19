// Filename: libs/jquery/jquery.js

define([
// Load the original jQuery source file
  'order!libs/jquery/jquery-min'
], function(){
  // Tell Require.js that this module returns a reference to jQuery
  return $;
});
