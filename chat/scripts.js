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
	showFormEditProfile.innerHTML ='<form class="form-inline" id="formEditProfile"><div class="form-group"><input type="text" class="form-control" placeholder="Your name" id="inputEditProfile"></div><button type="submit" class="btn btn-info" id="buttonSubmitProfile">edit</button></form>'
	buttonSubmitProfile = document.getElementById('buttonSubmitProfile');
	buttonSubmitProfile.onclick = submitEditedProfile;
}

function getTime () {
	var currentTime = new Date();
	var result = currentTime.toDateString() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	return result;
}

function submitEditedProfile (event) {
	currentUserName = document.getElementById('currentUserName');
	inputEditProfile = document.getElementById('inputEditProfile');
	formEditProfile = document.getElementById('formEditProfile');
	currentUserName.innerHTML = inputEditProfile.value;
	formEditProfile.style.display = 'none';

	var messagesArray = document.getElementsByClassName('text-muted pull-right editDelete');
	var usersArray = document.getElementsByClassName('userNameEditDelete');
	for (var i = 0; i < usersArray.length; ++i) {
		if (currentUserName.textContent !== usersArray[i].textContent) {
			messagesArray[i].innerHTML = '';
		} else if (currentUserName.textContent === usersArray[i].textContent){
			messagesArray[i].innerHTML = '<a href="#">Edit</a> | <a href="#">Delete</a>';
		}
	}
}