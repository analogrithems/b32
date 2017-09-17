var bookshelf = require('./../config/db').bookshelf;

var Artist = bookshelf.Model.extend({
	tableName: 'artists',
  hasTimestamps: ['created', 'modified'],
	albums:function() {
    return this.hasMany(Album);
  }
});

module.exports = Artist;
