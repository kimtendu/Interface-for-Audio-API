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

winamp - 
	constuctor
	playsong
	nextsong
	

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
	//title of documents

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
		this._div = document.createElement('div'),
		this._songs = document.createElement('div'),
		this._audio = document.createElement('audio');
	}

	view(){
		var //div = document.createElement('div'),
			titleSpan = document.createElement('div'),
			img = document.createElement('div'),
			//songs = document.createElement('div'),
			//audio = document.createElement('audio'),
			del = document.createElement('span'),
			edit = document.createElement('a'),
			play = document.createElement('span');

		var div = this._div,
			songs = this._songs,
			audio = this._audio;
			
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
		//edit.setAttribute('data-toggle', 'modal');
		//edit.setAttribute('data-target', '#myModal');
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
			arrPLlist[div.id].deletePL(div);
			}, false);
	} // this is a functions to print it to the view

	showSong(){
		var div = this._div,
			songs = this._songs,
			audio = this._audio;
		this.msglog = ajaxRequest(this._id+'/songs', 'GET');		
		this.msglog = this.msglog.data.songs;
		//console.log(this.msglog);
		//this._arrSongs = this.msglog;
		//here starts view of the song
		//div.classList='col-md-12 playlist-open'; //add that class to parent div - open it
		var self = this;
		self.openPanel(div);
		for( var i=0; i< this.msglog.length; i++){
			this._arrSongs[i] = new Song(i, this.msglog[i].name, this.msglog[i].url, songs, audio);			
			this._arrSongs[i].toView();
		}
		this._arrSongs[0].play();
		//arrPLlist[div.id].playSong(arrPLlist[div.id]._arrSongs[this.getAttribute("data-id")].url, audio);
		//audio.src=this.msglog[0].url;
	}//show all posible songs by making songs class instance

	openPanel(){
		for(var key in arrPLlist) {
		arrPLlist[key].closePanel();
		}
		var cont = document.getElementById('main-container');
		cont.insertBefore(this._div, cont.children[1]);

		this._div.classList='col-md-12 playlist-open';

	}

	closePanel(){
		this._div.classList='col-md-3';
		this._audio.src="";
	}

	playSong(song, audio){
		//console.log(song);
		audio.src=song;
	}//Play the chothen song
	deletePL(){
		//console.log('delete' + this._id);
		var serverAnsewer = ajaxRequest(this._id, 'DELETE');
		if (serverAnsewer!=FALSE){
			div.innerHTML=" ";
			arrPLlist(this._id, 1);
		}
		//var delete = ajaxRequest(this._id, 'DELETE');
	}//delete playlist
	
	editPL(){
		console.log('edit Paylist'  + this._id);
		var mElHead = document.getElementById('modal-title'),
			mElBbody = document.getElementById('modal-body'),
		 	mElfooter = document.getElementById('modal-footer'),
		 	mElPLName = document.createElement('input'),
		 	mElPLImage = document.createElement('input'),
		 	mElnext = document.createElement('button'),
		 	mElreset = document.createElement('button'),
		 	mElfinish = document.createElement('button'),
		 	mainPL=this;

		mElHead.innerHTML="Edit PlayList "+ this._name;

		mElPLName.classList="form-control";
		mElPLName.setAttribute('value', this._name);
		mElPLName.setAttribute('placeholder', this._name);
		mElPLImage.classList="form-control";
		mElPLImage.setAttribute('value', this._image);
		mElPLImage.setAttribute('placeholder', this._image);

		mElBbody.appendChild(mElPLName);
		mElBbody.appendChild(mElPLImage);


		mElnext.classList="btn btn-primary";
		mElreset.classList="btn btn-danger";
		mElnext.innerHTML="Next";
		mElreset.innerHTML="Reset";
		mElfooter.appendChild(mElnext);
		mElfooter.appendChild(mElreset);

		mElnext.addEventListener("click", function(){
			mainPL._name = mElPLName.value;
			mainPL._image = mElPLImage.value;
			console.log(typeof (mainPL._name));
			var ajtmp = '{ name: "'+ mainPL._name+'"}';
			console.log(ajtmp);
			/*
			var data = {
				name: mainPL._name,
				image: mainPL._image
			},
			serAnsw = ajaxRequest(mainPL._id, 'POST', data);
			console.log(JSON.stringify(data));
			*/
			
			$.ajax({
				method: "POST",
				url: strEndpoint + mainPL._id,
			  data:  { name: mElPLName.value}
				//data: ajtmp
			})
			.done(function( msg ) {
			    console.log( "Data Saved: " + msg );
			});
			

		});

		mElreset.addEventListener("click", function(){

		});


		$('#myModal').modal('toggle');

	}//Edit playlists

}

class Song{

	constructor(id, name, url, songs, audio){
		this._id = id;
		this._name = name;
		this._url = url;
		this._parentObj = songs;
		this._audioPlayer = audio;
		
	}

	toView(){
		var tmp = document.createElement('div'),
			self= this;
			tmp.innerHTML=this._name;
			tmp.setAttribute('data-id', this._id );
			this._parentObj.appendChild(tmp);	 
			tmp.addEventListener("click", function(){
				self.play();		
			}, false);

	}

	play(){

		this._audioPlayer.src=this._url;
	}

	stopp(){

	}

	loadtoPlayer(){

		this.play();
	}

}

class Search{
	constructor(){
		//this._elsearchPanel = document.getElementById('Search');
		var self =  document.getElementById('Search'),
			seacrCont = document.getElementById('search-res'),
			ulSearch = document.querySelector('#search-res > ul');


		self.addEventListener('input', function(){
			ulSearch.innerHTML="";
			seacrCont.classList=""
			//console.log(this.value);
		for(var key in arrPLlist) { 
   			var tmpText = arrPLlist[key]._name;
   				
   			if (tmpText.indexOf(this.value) != -1) {
   			//	this.placeholder=tmp;					
   				var liTmp = document.createElement('li');
   				liTmp.innerHTML=tmpText;
   				ulSearch.appendChild(liTmp);
   				/*liTmp.addEventListener('click', function(){
   					arrPLlist[key].showSong();

   				})
   				* function for playing from search
				*/
   			}

   			//here need add funcions - to view and addEventlistener - get songs
		}
		});

		self.addEventListener('blur ', function(){
			seacrCont.classList="hidden";
			
		});
	}


	toogle(){

	}

}

var all = new AllPlaylists();
all.toView();
var search = new Search();

function ajaxRequest(endpont, method, dataa, async){
	if (!async) async=false;
	var xhrEndpointTPL = new XMLHttpRequest(),
		strEndpointTPl = strEndpoint + endpont;
	xhrEndpointTPL.open(method, strEndpointTPl, async);
	
	xhrEndpointTPL.send({ name: "Chicagggg"});
	if (xhrEndpointTPL.status != 200) {  			
		//msg = xhrEndpointTPL.status + ': ' + xhrEndpointTPL.statusText; 
		msg = false;
	} else {
		msg = JSON.parse(xhrEndpointTPL.responseText);
		//console.log(this.msglog)
	}
	return msg;	
}


function jqueryRequest(endpont, method, dataa, async){
	console.log(dataa)
	$.ajax({
	  method: "POST",
	  url: strEndpoint + endpont,
	  //data: dataa
	   data: { name: "Chicagg"}
	})
	  .done(function( msg ) {
	    console.log( "Data Saved: " + msg );
	  });


	

}

