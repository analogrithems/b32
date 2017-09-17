var Model = require('./../models/Playlist');

/* Save a playlist */
var savePlaylist = function (req, res) {
	new Model.Playlist({
		playlistname: req.body.playlistname,
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		location: req.body.location
	}).save()
		.then(function (playlist) {
			res.json(playlist);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all playlists */
var getAllPlaylists = function (req, res) {
	new Model.Playlist().fetchAll()
		.then(function (playlists) {
			res.json(playlists);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a playlist */
var deletePlaylist = function (req, res) {
	var playlistId = req.params.id;
	new Model.Playlist().where('id', playlistId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a playlist */
var getPlaylist = function (req, res) {
	var playlistId = req.params.id;
	new Model.Playlist().where('id', playlistId)
		.fetch()
		.then(function (playlist) {
			res.json(playlist);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	savePlaylist: savePlaylist,
	getAllPlaylists: getAllPlaylists,
	deletePlaylist: deletePlaylist,
	getPlaylist: getPlaylist
};
