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
    
	  if(this.get('artist')){
  	  console.log("Looking for artist");
  	  _artist = this.get('artist')
      new Artist().where('title', _artist)
    		.fetch()
    		.then(function(model){
      		if(!model){
        		Artist.forge({title:_artist})
        		.save()
        		.then(function(m){
          		console.log("Setting artist.id:", m.id);
          		self.set('artist_id', m.id);
        		});
      		}else{
        		console.log("Setting  artist.id:", model.id);
        		self.set('artist_id', model.id);
      		}
    		})
    		.catch(function (error) {
    			console.log('An error occured, no artist currently exists, sop save it:',error);
  		  });

    }
	  if(this.get('album')){
  	  console.log("Looking for album");
  	  _album = this.get('album')
      new Album().where('title', _album)
    		.fetch()
    		.then(function(model){
      		if(!model){
        		new Album({title:_album})
        		.save()
        		.then(function(m){
          		console.log("Setting album.id:", m.id);
          		self.set('album_id', m.id);
        		});
      		}else{
        		console.log("Setting  album.id:", model.id);
        		self.set('album_id', model.id);
      		}
    		})
    		.catch(function (error) {
    			console.log('An error occured, no artist currently exists, sop save it:',error);
  		  });

    }
	  if(this.get('genre')){
  	  console.log("Looking for genre");
  	  _genre = this.get('genre')
      new Genre().where('title', _genre)
    		.fetch()
    		.then(function(model){
      		if(!model){
        		new Genre({title:_genre})
        		.save()
        		.then(function(m){
          		console.log("Setting genre.id:", m.id);
          		self.set('genre_id', m.id);
        		});
      		}else{
        		console.log("Setting  genre.id:", model.id);
        		self.set('genre_id', model.id);
      		}
    		})
    		.catch(function (error) {
    			console.log('An error occured, no artist currently exists, sop save it:',error);
  		  });

    }

		
    console.log('saving:',self);
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
