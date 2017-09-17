var Song = require('./../models/Song');

/* Save a song */
var saveSong = function (req, res) {
	new Song({
		songname: req.body.songname,
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		location: req.body.location
	}).save()
		.then(function (song) {
			res.json(song);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all songs */
var getAllSongs = function (req, res) {
	new Song().fetchAll()
		.then(function (songs) {
			res.json(songs);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a song */
var deleteSong = function (req, res) {
	var songId = req.params.id;
	new Song().where('id', songId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a song */
var getSong = function (req, res) {
	var songId = req.params.id;
	new Song().where('id', songId)
		.fetch()
		.then(function (song) {
			res.json(songplaylists.js);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	saveSong: saveSong,
	getAllSongs: getAllSongs,
	deleteSong: deleteSong,
	getSong: getSong
};
