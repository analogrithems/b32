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
        i++;
        if(i>10){
          break;
        }
      }
  });
}

function upsertMedia(song){
  var id3 = nodeID3.read(song);
  //console.log(id3)
  
  var song_name   = id3['title']   || path.basename(song,path.extname(song));
  var album_name  = id3['album']   || path.basename(path.dirname(song));
  var artist_name = id3['artist']  || path.basename(path.dirname(path.dirname(song)));
  var genre_name  = id3['genre']   || false;
  
  var artist_id,album_id,genre_id;
  
  //var song = getSong(song_name,artist_name,album_name);
  /*
  var s = new Song({
    title:  song_name,
    album:  album_name,
    artist: artist_name,
    genre:  genre_name
  })
  .save()
	.then(function (song) {
		console.log(song);
	}).catch(function (error) {
		console.log(error);
	});
  */
  getArtist(artist_name)
  .then(getAlbum(album_name))
  .then(getGenre(genre_name))
  .then(getSong( song_name,artist_id ));
  

}

function getSong(a,artist_id){
  console.log(a,artist_id);
}


function getArtist(artist){
  return new Artist().where('title', artist)
	.fetch()
	.then(function(a){
		if(!a){
  		console.log("No artist found, adding",artist);
  		return Artist.forge({title:artist}).save().then(function(a){
    		artist_id=a.id
  		});
		}else{
  		console.log("Found artist, set it to:",a.id);
  		artist_id=a.id
  		return;
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
