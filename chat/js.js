var defValueTextArea = document.getElementById('newMessage').defaultValue;
function send (event) {	
	var newMessage = document.getElementById('newMessage'); 
	newMessage.value = newMessage.value.replace(/\r?\n/g, '<br>');     							
	document.getElementById('chatField').innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="user.png"></a><div class="media-body">'+
	newMessage.value
	+'<br><small class="text-muted">Jhon Rexa | 23rd June at 5:00pm</small><small class="text-muted pull-right"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr></div></div></div></li>';
	newMessage.value = '';
}

function enterTextArea (event) {
	var newMessage = document.getElementById('newMessage');
	if (event.keyCode === 13 && event.ctrlKey) {
		newMessage.value += '\r\n';
	} else if (event.keyCode === 13) {
		send();
	}
}

var events = function () {
	var sendButton = document.getElementById('sendButton');
	var newMessage = document.getElementById('newMessage');
	sendButton.onclick = send;
	newMessage.addEventListener("keydown", enterTextArea);
}();
