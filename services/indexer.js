#!/usr/bin/env node

var fs = require("fs"),
    path = require("path"),
    media = require('./../config/media'),
    nodeID3 = require('node-id3'),
    Song = require('./../models/Song'),
    Artist = require('./../models/Artist'),
    Album = require('./../models/Album'),
    Genre = require('./../models/Genre');

media.path.map(function(dir){
  scanDir(dir);
});


function scanDir(dir){
  fs.readdir(dir, function (err, files) {
      if (err) {
          throw err;
      }
      
      for(var i = 0;i < files.length; i++){
        file = files[i];
        full_path = path.join(dir, file);
        //console.log("%s (%s)", file,full_path);
        
        if(fs.statSync(full_path).isFile() && '.mp3' == path.extname(full_path).toLowerCase()){
          //Check if this is media
          //console.log("%s (%s)", file,full_path);
          upsertMedia(full_path);
        } else if (fs.statSync(full_path).isDirectory()) {
          // call recursive
          scanDir(full_path);
        }
      }
  });
}

function upsertMedia(song_path){
  var id3 = nodeID3.read(song_path);  
  var song_name   = id3['title']   || path.basename(song_path,path.extname(song_path));
  var album_name  = id3['album']   || path.basename(path.dirname(song_path));
  var artist_name = id3['artist']  || path.basename(path.dirname(path.dirname(song_path)));
  var genre_name  = id3['genre']   || false;
  

  Promise.all([ getArtist(artist_name), getAlbum(album_name), getGenre(genre_name) ]).then((results) => { 
    artist_id=results[0].id
    album_id=results[1].id
    genre_id=false;
    if(genre_name){
      grenre_id=results[2].id;
    }
    getSong(song_path,song_name,artist_id,album_id,genre_id);
  })

  

}

function getSong(song_path,song_name,artist_id,album_id,genre_id=false){
  console.log("Upsert song:", song_name, ' path:', song_path, ' artist:', artist_id, ' album:', album_id, ' genre:',genre_id);
  return new Song().where({'path': song_path})
	.fetch()
	.then(function(a){
		if(!a){
  		console.log("No song found, adding",song_name);
  		if(genre_id){
    		return Song.forge({'path':song_path, 'title': song_name, 'artist_id': artist_id, 'album_id': album_id, 'genre_id': genre_id}).save()  		
  		}else{
    		return Song.forge({'path':song_path, 'title': song_name, 'artist_id': artist_id, 'album_id': album_id, 'genre_id': genre_id}).save()	
  		}
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

  


function getArtist(artist){
  return new Artist().where('title', artist)
	.fetch()
	.then(function(a){
		if(!a){
  		console.log("No artist found, adding",artist);
  		return Artist.forge({title:artist}).save()
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

function getAlbum(album){
  return new Album().where('title', album)
	.fetch()
	.then(function(model){
		if(!model){
  		return Album.forge({title:album})
  		  .save()
  		  .then(function(model){
    		  return model;
  		  })
  		  .catch(function (error) {
    			console.log(error);
    		});
		}else{
  	  return model	
    }
	})
	.catch(function (error) {
		console.log(error);
	});
}

function getGenre(_Genre){
  if(!_Genre) return;
  return new Genre().where('title', _Genre)
	.fetch()
	.then(function(model){
		if(!model){
  		console.log("No album  found, adding",artist);
  		return Genre.forge({title:genre})
  		  .save()
  		  .then(function(model){
    		  return model;
  		  })
  		  .catch(function (error) {
    			console.log(error);
    		});
		}else{
  		return model;
		}
	})
	.catch(function (error) {
		console.log(error);
		});

}
