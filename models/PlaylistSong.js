var bookshelf = require('./../config/db').bookshelf;

var PlaylistSong = bookshelf.Model.extend({
	tableName: 'playlist_songs',
  hasTimestamps: ['created', 'modified']
});

module.exports = PlaylistSong;
