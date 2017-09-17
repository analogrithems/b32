var user = require('./routes/users');
var song = require('./routes/songs');
var artist = require('./routes/artists');
var genre = require('./routes/genres');
var album = require('./routes/albums');
var playlist = require('./routes/playlists');
var playlistsong = require('./routes/playlist_songs');

var index = require('./routes/index');

module.exports = function (app) {

	/* Index(main) route */
	app.get('/', index.index);

	/* User Routes */
	app.post('/users', user.saveUser);
	app.get('/users', user.getAllUsers);
	app.delete('/user/:id', user.deleteUser);
	app.get('/user/:id', user.getUser);
	
	/* song Routes */
	app.post('/songs', song.saveSong);
	app.get('/songs', song.getAllSongs);
	app.delete('/song/:id', song.deleteSong);
	app.get('/song/:id', song.getSong);

	/* artist Routes */
	app.post('/artists', artist.saveArtist);
	app.get('/artists', artist.getAllArtists);
	app.delete('/artist/:id', artist.deleteArtist);
	app.get('/artist/:id', artist.getArtist);
	
	/* genre Routes */
	app.post('/genres', genre.saveGenre);
	app.get('/genres', genre.getAllGenres);
	app.delete('/genre/:id', genre.deleteGenre);
	app.get('/genre/:id', genre.getGenre);
	
	/* album Routes */
	app.post('/albums', album.saveAlbum);
	app.get('/albums', album.getAllAlbums);
	app.delete('/album/:id', album.deleteAlbum);
	app.get('/album/:id', album.getAlbum);
	
	/* playlist Routes */
	app.post('/playlists', playlist.savePlaylist);
	app.get('/playlists', playlist.getAllPlaylists);
	app.delete('/playlist/:id', playlist.deletePlaylist);
	app.get('/playlist/:id', playlist.getPlaylist);

	/* playlistsong Routes */
	app.post('/playlistSongs', playlistsong.savePlaylistSong);
	app.get('/playlistSongs', playlistsong.getAllPlaylistSongs);
	app.delete('/playlistSong/:id', playlistsong.deletePlaylistSong);
	app.get('/playlistSong/:id', playlistsong.getPlaylistSong);

};

