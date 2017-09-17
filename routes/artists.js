var Artist = require('./../models/Artist');

/* Save a artist */
var saveArtist = function (req, res) {
	new Artist({
		artistname: req.body.artistname,
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		location: req.body.location
	}).save()
		.then(function (artist) {
			res.json(artist);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all artists */
var getAllArtists = function (req, res) {
	new Artist().fetchAll()
		.then(function (artists) {
			res.json(artists);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a artist */
var deleteArtist = function (req, res) {
	var artistId = req.params.id;
	new Artist().where('id', artistId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a artist */
var getArtist = function (req, res) {
	var artistId = req.params.id;
	new Artist().where('id', artistId)
		.fetch()
		.then(function (artist) {
			res.json(artist);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	saveArtist: saveArtist,
	getAllArtists: getAllArtists,
	deleteArtist: deleteArtist,
	getArtist: getArtist
};
