var Genre = require('./../models/Genre');

/* Save a genre */
var saveGenre = function (req, res) {
	new Genre({
		genrename: req.body.genrename,
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		location: req.body.location
	}).save()
		.then(function (genre) {
			res.json(genre);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all genres */
var getAllGenres = function (req, res) {
	new Genre().fetchAll()
		.then(function (genres) {
			res.json(genres);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a genre */
var deleteGenre = function (req, res) {
	var genreId = req.params.id;
	new Genre().where('id', genreId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a genre */
var getGenre = function (req, res) {
	var genreId = req.params.id;
	new Genre().where('id', genreId)
		.fetch()
		.then(function (genre) {
			res.json(genre);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Exports all methods */
module.exports = {
	saveGenre: saveGenre,
	getAllGenres: getAllGenres,
	deleteGenre: deleteGenre,
	getGenre: getGenre
};
