/*
	Helper to keep track of the nicknames that's connected to the server
*/

var nicknames = Array();
function init() {
	// Nothing to init?
}

function add(nickname) {
	if(nicknames.indexOf(nickname) !== -1) {
		throw new Error('Nickname alredy in use');
	} else if(nickname === "") {
		throw new Error("Nickname can't be ''");
	} else if(typeof nickname !== 'string') {
		throw new Error("Nickname has to be a string");
	} else {
		nicknames.push(nickname);
		return true;
	}
}

function remove(nickname) {
	if(exists(nickname)) {
		nicknames.splice(nicknames.indexOf(nickname), 1);
		return true;
	} else {
		return false;
	}
}

function exists(nickname) {
	return nicknames.indexOf(nickname) !== -1;
}

function get_list() {
	return nicknames;
}

function get_list_json() {
	var json_array = [];
	for(var i = 0; i < nicknames.length; i++ ) {
		json_array.push({nickname: nicknames[i]});
	}
	return json_array;
}

function clear() {
	nicknames.splice(0, nicknames.length);
}

exports.add = add;
exports.remove = remove;
exports.clear = clear;
exports.exists = exists;
exports.get_list = get_list;
exports.get_list_json = get_list_json;