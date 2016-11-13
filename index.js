//Controllers
/*
Classes

All Playlist - class for all playlist
	construction - get all and print, and make listener 

Playlist(number of list)- class of specifict PL
	construction - get and print
	Songs lists - Create song - add new class song(id song )
	Create PL
	Update PL info
	Delete PL 

Song(id pl, id song) - get specific song --DONT NEED IT
	constructor - get and print
	Update - update song info

Functions ( old version ) :
	Created:
	* Get all playlists
	* Get specific playlist
	* Get song from pl

	New
	* Create new pl
	* update  pl info
	* up song info
	* Delete pl

*/
var arrPLlist = [], //array of all Playlists
	strEndpoint = 'http://playlist.jbfullstack.com/playlist/',
	objMainCont = document.getElementById('main-container');

class AllPlaylists{
	constructor(){
		this.msglog = ajaxRequest('', 'GET');
		this.msglog = this.msglog.data;		
	} // Ajax request to APi

	toView(){
		for(var key in this.msglog) { 
   			arrPLlist[this.msglog[key].id] = new Playlist(this.msglog[key].id, this.msglog[key].name,  this.msglog[key].image );
   			arrPLlist[this.msglog[key].id].view();				
   			//here need add funcions - to view and addEventlistener - get songs
		}
	} // to print all playlists by made pPlalist class and view it

	debug (){
		console.log('consolle '+ this.msglog);
		console.log(typeof this.msglog);
		//this.msglog = JSON.parse(xhr.responseText);
	}
}

class Playlist{
	constructor(id, name, image){
		this._id = id;
		this._name = name;
		this._image = image,
		this._arrSongs = [];
	}

	view(){
		var div = document.createElement('div'),
			titleSpan = document.createElement('div'),
			img = document.createElement('div'),
			songs = document.createElement('div'),
			audio = document.createElement('audio'),
			del = document.createElement('span'),
			edit = document.createElement('span'),
			play = document.createElement('span');
		div.id = this._id;
		div.classList = 'col-md-3 Playlist';
		titleSpan.classList='playlist-title';
		titleSpan.innerHTML = this._name;
		//img.src=this._image = this._image;
		img.classList = " playlist-img" ;
		img.style.background ='url('+this._image+')';
		songs.classList="playlist-songs";
		del.classList = " glyphicon glyphicon-remove playlist-button playlist-button-del " ;
		edit.classList = " glyphicon glyphicon-pencil playlist-button playlist-button-edit" ;
		play.classList = " glyphicon glyphicon-triangle-right playlist-button playlist-butto-play" ;

		img.appendChild(del);
		img.appendChild(edit);
		img.appendChild(play);
		audio.controls="controls";
		audio.autoplay="autoplay" ;
		songs.appendChild(audio);
		div.appendChild(titleSpan);
		div.appendChild(img);
		div.appendChild(songs);
		objMainCont.appendChild(div);	

		play.addEventListener("click", function(){
			arrPLlist[div.id].showSong(div, audio, songs);
			}, false);
		
		edit.addEventListener("click", function(){
			arrPLlist[div.id].editPL();
			}, false);
		
		del.addEventListener("click", function(){
			arrPLlist[div.id].deletePL();
			}, false);
	} // this is a functions to print it to the view

	showSong(div, audio, songs){
		this.msglog = ajaxRequest(this._id+'/songs', 'GET');		
		this.msglog = this.msglog.data.songs;
		console.log(this.msglog);
		this._arrSongs = this.msglog;
		div.classList='col-md-12 playlist-open';
		for( var i=0; i<this._arrSongs.length; i++){
			var tmp = document.createElement('div');
			tmp.innerHTML=this._arrSongs[i].name;
			tmp.setAttribute('data-id', i);
			songs.appendChild(tmp);	
			
			tmp.addEventListener("click", function(){
				arrPLlist[div.id].playSong(arrPLlist[div.id]._arrSongs[this.getAttribute("data-id")].url, audio);
			}, false);
			
		}
		//arrPLlist[div.id].playSong(arrPLlist[div.id]._arrSongs[this.getAttribute("data-id")].url, audio);
		audio.src=this.msglog[0].url;
	}//show all posible songs by making songs class instance

	playSong(song, audio){
		//console.log(song);
		audio.src=song;
	}//Play the chothen song
	deletePL(){
		//var delete = ajaxRequest(this._id, 'DELETE');
	}//delete playlist
	
	editPL(){
		console.log('edit Paylist');
	}//Edit playlists

	debug(){
		alert(this._id);
	}//debug
}

var all = new AllPlaylists();
all.toView();

function ajaxRequest(endpont, method){
	var xhrEndpointTPL = new XMLHttpRequest(),
		strEndpointTPl = strEndpoint + endpont;
	xhrEndpointTPL.open(method, strEndpointTPl, false);
	xhrEndpointTPL.send();
	if (xhrEndpointTPL.status != 200) {  			
		msg = xhrEndpointTPL.status + ': ' + xhrEndpointTPL.statusText; 
	} else {
		msg = JSON.parse(xhrEndpointTPL.responseText);
		//console.log(this.msglog)
	}
	return msg;	
}

