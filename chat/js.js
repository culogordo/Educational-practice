var defValueTextArea = document.getElementById('newMessage').defaultValue;
function send (event) {	
	var newMessage = document.getElementById('newMessage'); 
	var chatField = document.getElementById('chatField');
	var scrollDown = document.getElementById('scrollDown');
	newMessage.value = newMessage.value.replace(/\r?\n/g, '<br>');     							
	chatField.innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="user.png"></a><div class="media-body">'+
	newMessage.value
	+'<br><small class="text-muted">Jhon Rexa | 23rd June at 5:00pm</small><small class="text-muted pull-right"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr></div></div></div></li>';
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

function submitEditedProfile (event) {
	inputEditProfile = document.getElementById('inputEditProfile');
	formEditProfile = document.getElementById('formEditProfile');
	previousUserName.innerHTML = inputEditProfile.value;
	formEditProfile.style.display = 'none';
}

var events = function () {
	var sendButton = document.getElementById('sendButton');
	var newMessage = document.getElementById('newMessage');
	var buttonEditProfile = document.getElementById('buttonEditProfile');
	sendButton.onclick = send;
	buttonEditProfile.onclick = showEditProfile;
	newMessage.addEventListener("keydown", enterTextArea);
}();
