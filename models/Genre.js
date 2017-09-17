var bookshelf = require('./../config/db').bookshelf;

var Genre = bookshelf.Model.extend({
	tableName: 'genres',
  hasTimestamps: ['created', 'modified'],
	songs:function() {
    return this.hasMany(Song);
  }
});

module.exports = Genre;
