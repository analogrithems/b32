var bookshelf = require('./../config/db').bookshelf;

var Playlist = bookshelf.Model.extend({
	tableName: 'playlists',
  hasTimestamps: ['created', 'modified'],
});

module.exports = Playlist;
