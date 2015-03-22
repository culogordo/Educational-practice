var run = function () {
	var sendButton = document.getElementById('sendButton');
	var newMessageTextArea = document.getElementById('newMessageTextArea');
	var buttonEditProfile = document.getElementById('buttonEditProfile');
	buttonEditProfile.onclick = showEditProfile;
	sendButton.onclick = send;
}();

function send (event) {
	//will not send form (reload page), if click submit button
	if (event.preventDefault) {
    	event.preventDefault();
   	}
	var currentUserName = document.getElementById('currentUserName'); 	
	var newMessageTextArea = document.getElementById('newMessageTextArea'); 
	var chatField = document.getElementById('chatField');
	newMessageTextArea.value = newMessageTextArea.value.replace(/\r?\n/g, '<br>');    							
	chatField.innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="user.png"></a><div class="media-body edit"><span class="currentChatText">'+
	newMessageTextArea.value
	+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
	currentUserName.textContent
	+'</span> | '+
	getTime()
	+'</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr></div></div></div></li>';
	scanDeleteMessage ();

	newMessageTextArea.value = '';
}

function showEditProfile (event) {
	var showFormEditProfile = document.getElementById('showFormEditProfile');
	showFormEditProfile.innerHTML ='<form class="form-inline" id="formEditProfile"><div class="form-group"><input type="text" class="form-control" placeholder="Your name" id="inputEditProfile"><button type="submit" class="btn btn-info" id="buttonSubmitProfile">edit</button></div></form>'
	buttonSubmitProfile = document.getElementById('buttonSubmitProfile');
	buttonSubmitProfile.onclick = submitEditedProfile;
}

function submitEditedProfile (event) {
	//will not send form (reload page), if click submit button
	if (event.preventDefault) {
    event.preventDefault();
   	} 
	currentUserName = document.getElementById('currentUserName');
	inputEditProfile = document.getElementById('inputEditProfile');
	formEditProfile = document.getElementById('formEditProfile');
	currentUserName.innerHTML = inputEditProfile.value;
	formEditProfile.style.display = 'none';

	var editeDeleteArray = document.getElementsByClassName('text-muted pull-right editDelete');
	var usersArray = document.getElementsByClassName('userNameEditDelete');
	for (var i = 0; i < usersArray.length; ++i) {
		if (currentUserName.textContent !== usersArray[i].textContent) {
			editeDeleteArray[i].innerHTML = '';
		} else if (currentUserName.textContent === usersArray[i].textContent){
			editeDeleteArray[i].innerHTML = '<a href="#">Edit</a> | <a href="#">Delete</a>';
		}
	}
	scanDeleteMessage ();
}

function scanDeleteMessage () {
	var editeDeleteArray = document.getElementsByClassName('text-muted pull-right editDelete');
	for (var i = 0; i < editeDeleteArray.length; ++i) {
		if (editeDeleteArray[i].lastChild !== null) {
			editeDeleteArray[i].lastChild.onclick = deleteMessage;
		}
		if(editeDeleteArray[i].firstChild !== null) {
			editeDeleteArray[i].firstChild.onclick = editeMessage;
		}
	}
}

function deleteMessage (event) {
	var deleteLi = event.target;
	while (deleteLi.tagName != 'LI') {
		deleteLi = deleteLi.parentNode;
	}
	deleteLi.innerHTML = '<div class="row"><div class="col-md-12 text-center"><small class="text-muted center">Message was deleted</small></div></div>';	
}

function editeMessage (event) {
	var editLi = event.target;
	while (editLi.className != 'media-body edit') {
		editLi = editLi.parentNode;
	}
	for (var i = 0; i < editLi.firstChild.childNodes.length; ++i) {
		if (editLi.firstChild.childNodes[i].tagName === 'BR') {
			editLi.firstChild.childNodes[i].innerHTML = '\n';
		}
	}
	var currentTextAreaContent = editLi.firstChild.textContent;  
	editLi.innerHTML = '<div class="input-group"><textarea type="text" class="form-control" id="editMessageTextArea" style="height:60px; resize: none">'+
	currentTextAreaContent 
	+'</textarea><span class="input-group-btn"><button type="submit" class="btn btn-info pull-right" id="editButtonTextArea" style="height:60px">edit</button></span></div>';
	var editMessageTextArea = document.getElementById('editMessageTextArea');
	var editButtonTextArea = document.getElementById('editButtonTextArea');
	editButtonTextArea.onclick = function (event) {
			//will not send form (reload page), if click submit button
			if (event.preventDefault) {
    			event.preventDefault();
   			}
   			editMessageTextArea.value = editMessageTextArea.value.replace(/\r?\n/g, '<br>');
   			editLi.innerHTML = '<span class="currentChatText">'+
			editMessageTextArea.value
			+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
			currentUserName.textContent
			+'</span> | '+
			getTime()
			+'</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr>';
			scanDeleteMessage (); 
	}
}

function getTime () {
	var currentTime = new Date();
	var result = currentTime.toDateString() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	return result;
}
