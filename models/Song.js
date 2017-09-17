var bookshelf = require('./../config/db').bookshelf;
    Artist = require('./Artist'),
    Album = require('./Album'),
    Genre = require('./Genre');

var Song = bookshelf.Model.extend({
  hasTimestamps: ['created', 'modified'],
  initialize: function(){
    this.on('saving', this.on_saving, this);
  },
  on_saving: function(model, attrs, options){
    var self = this;
    //validate here if needed
  },
  
	tableName: 'songs',
	
  album: function() {
    return this.belongsTo(Album);
  },
  
  artist: function() {
    return this.belongsTo(Artist);
  },
  
  genre: function() {
    return this.belongsTo(Genre);
  }
});

module.exports = Song;
