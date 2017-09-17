var Model = require('./../models/PlaylistSong');

/* Save a playlist_song */
var savePlaylistSong = function (req, res) {
	new Model.PlaylistSong({
		playlist_songname: req.body.playlist_songname,
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		location: req.body.location
	}).save()
		.then(function (playlist_song) {
			res.json(playlist_song);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all playlist_songs */
var getAllPlaylistSongs = function (req, res) {
	new Model.PlaylistSong().fetchAll()
		.then(function (playlist_songs) {
			res.json(playlist_songs);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a playlist_song */
var deletePlaylistSong = function (req, res) {
	var playlist_songId = req.params.id;
	new Model.PlaylistSong().where('id', playlist_songId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a playlist_song */
var getPlaylistSong = function (req, res) {
	var playlist_songId = req.params.id;
	new Model.PlaylistSong().where('id', playlist_songId)
		.fetch()
		.then(function (playlist_song) {
			res.json(playlist_song);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	savePlaylistSong: savePlaylistSong,
	getAllPlaylistSongs: getAllPlaylistSongs,
	deletePlaylistSong: deletePlaylistSong,
	getPlaylistSong: getPlaylistSong
};
