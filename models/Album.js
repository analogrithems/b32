var bookshelf = require('./../config/db').bookshelf;

var Album = bookshelf.Model.extend({
	tableName: 'albums',
  hasTimestamps: ['created', 'modified'],
	songs:function() {
    return this.hasMany(Song);
  }
});

module.exports = Album;
