var run = function () {
	var sendButton = document.getElementById('sendButton');
	var newMessage = document.getElementById('newMessage');
	var buttonEditProfile = document.getElementById('buttonEditProfile');
	sendButton.onclick = send;
	buttonEditProfile.onclick = showEditProfile;
	newMessage.addEventListener("keydown", enterTextArea);
}();

function send (event) {
	var currentUserName = document.getElementById('currentUserName'); 	
	var newMessage = document.getElementById('newMessage'); 
	var chatField = document.getElementById('chatField');
	var scrollDown = document.getElementById('scrollDown');
	newMessage.value = newMessage.value.replace(/\r?\n/g, '<br>');    							
	chatField.innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="user.png"></a><div class="media-body">'+
	newMessage.value
	+'<br><small class="text-muted"><span class="userNameEditDelete">'+
	currentUserName.textContent
	+'</span> | '+
	getTime()
	+'</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr></div></div></div></li>';
	scanDeleteMessage ();

	newMessage.value = '';
	//scrollDown.scrollTop = scrollDown.scrollHeight;
}

function enterTextArea (event) {
	var newMessage = document.getElementById('newMessage');
	if (event.keyCode === 13 && event.ctrlKey) {
		newMessage.value += '\r\n';
	} else if (event.keyCode === 13) {
		send();
	}
}

function showEditProfile (event) {
	var showFormEditProfile = document.getElementById('showFormEditProfile');
	showFormEditProfile.innerHTML ='<form class="form-inline" id="formEditProfile"><div class="form-group"><input type="text" class="form-control" placeholder="Your name" id="inputEditProfile"><button type="submit" class="btn btn-info" id="buttonSubmitProfile">edit</button></div></form>'
	buttonSubmitProfile = document.getElementById('buttonSubmitProfile');
	buttonSubmitProfile.onclick = submitEditedProfile;
}

function submitEditedProfile (event) {
	//will not send form (reload page), if cleck submit button
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
	}
}

function deleteMessage (event) {
	var deleteLi = event.target;
	console.log(deleteLi);
	while (deleteLi.tagName != 'LI') {
		console.log(deleteLi.tagName);
		deleteLi = deleteLi.parentNode;
	}
	deleteLi.innerHTML = '<div class="row"><div class="col-md-12 text-center"><small class="text-muted center">Message was deleted</small></div></div>';	
}

function getTime () {
	var currentTime = new Date();
	var result = currentTime.toDateString() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	return result;
}
