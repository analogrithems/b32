var Album = require('./../models/Album');

/* Save a album */
var saveAlbum = function (req, res) {
	new Album({
		albumname: req.body.albumname,
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		location: req.body.location
	}).save()
		.then(function (album) {
			res.json(album);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all albums */
var getAllAlbums = function (req, res) {
	new Album().fetchAll()
		.then(function (albums) {
			res.json(albums);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a album */
var deleteAlbum = function (req, res) {
	var albumId = req.params.id;
	new Album().where('id', albumId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a album */
var getAlbum = function (req, res) {
	var albumId = req.params.id;
	new Album().where('id', albumId)
		.fetch()
		.then(function (album) {
			res.json(album);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	saveAlbum: saveAlbum,
	getAllAlbums: getAllAlbums,
	deleteAlbum: deleteAlbum,
	getAlbum: getAlbum
};
