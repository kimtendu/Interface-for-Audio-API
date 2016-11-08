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
		var xhrEndpoint = new XMLHttpRequest();
		xhrEndpoint.open('GET', strEndpoint, false);
		xhrEndpoint.send();
		if (xhrEndpoint.status != 200) {
  			console.log( xhrEndpoint.status + ': ' + xhrEndpoint.statusText ); // пример вывода: 404: Not Found
		} else {
			 this.msglog = JSON.parse(xhrEndpoint.responseText);
			 this.msglog = this.msglog.data;
		}
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
			img = document.createElement('img');
		div.id = this._id;
		div.classList = 'col-md-3';
		titleSpan.innerHTML = this._name;
		img.src=this._image = this._image;
		img.classList = " img-responsive img-circle" ;

		div.appendChild(titleSpan);
		div.appendChild(img);
		objMainCont.appendChild(div);	

		div.addEventListener("click", function(){
			arrPLlist[div.id].showSong();
			}, false);
	} // this is a functions to print it to the view

	showSong(){
		var xhrEndpointPL = new XMLHttpRequest(),
			strEndpointPL = strEndpoint + this._id+'/songs';
		xhrEndpointPL.open('GET', strEndpointPL, false);
		xhrEndpointPL.send();
		if (xhrEndpointPL.status != 200) {
  			console.log( xhrEndpointPL.status + ': ' + xhrEndpointPL.statusText ); // пример вывода: 404: Not Found
		} else {
			 this.msglog = JSON.parse(xhrEndpointPL.responseText);
			 this.msglog = this.msglog.data.songs;
			 console.log(this.msglog)
		}
	}//show all posible songs by making songs class instance

	deletePL(){
		var xhrEndpointPL = new XMLHttpRequest(),
			strEndpointPL = strEndpoint + this._id;
		xhrEndpointPL.open('DELETE', strEndpointPL, false);
		xhrEndpointPL.send();
		if (xhrEndpointPL.status != 200) {
  			console.log( xhrEndpointPL.status + ': ' + xhrEndpointPL.statusText ); // пример вывода: 404: Not Found
		} else {
			console.log(xhrEndpointPL.responseText)
		}

	}//

	debug(){
		alert(this._id);
	}
}



var all = new AllPlaylists();
all.toView();


function ajaxRequest(endpont, method, data){

}



//view
/*
* PL
* Song

* forming:

*/

