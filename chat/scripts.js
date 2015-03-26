var messageList = [];
var messageCounter = 0;
var run = function () {
	var currentUserName = document.getElementById('currentUserName');
		currentUserName.textContent = restoreName() || 'Your name';
	var lastSession = restoreMessages();
		if (lastSession !== null) {
			messageList = lastSession;
			messageCounter = messageList.length;
			innerRestoredMesseges(lastSession);
			scanDeleteMessage ();
		}
	var sendButton = document.getElementById('sendButton');
		sendButton.onclick = send;
	var buttonEditProfile = document.getElementById('buttonEditProfile');
		buttonEditProfile.onclick = showEditProfile;
}();

function storeName(nameToSave) {
	var stringToSave = JSON.stringify(nameToSave);
	localStorage.setItem("Previos name", stringToSave); 
}

function restoreName() {
	if(typeof(Storage) == "undefined") {
		return;
	}
	var item = localStorage.getItem("Previos name"); 
	if (item) return JSON.parse(item);
	else return item;
	//return item && JSON.parse(item); 
}

// send() ------------------ deleted, message, author, date, editDelete
// editMessage() ---------- date, message 
// submitEditedProfile() --- editDelete
// deleteMessage() --------- deleted

function innerRestoredMesseges (_lastSession) {
	var chatField = document.getElementById('chatField');
	var size = _lastSession.length;
	for (var i = 0; i < size; ++i) {
		if (_lastSession[i].deleted === true) {
			chatField.innerHTML += '<li class="media"><div class="row"><div class="col-md-12 text-center"><small class="text-muted center">Message was deleted</small></div></div></li>';
		} else if (_lastSession[i].editDelete === true){
					chatField.innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="message.png"></a><div class="media-body edit"><span class="currentChatText">'+
					_lastSession[i].message
					+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
					_lastSession[i].author
					+'</span> | '+
					_lastSession[i].date
					+ '</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr></div></div></div></li>';
					} else {
							chatField.innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="message.png"></a><div class="media-body edit"><span class="currentChatText">'+
						_lastSession[i].message
						+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
						_lastSession[i].author
						+'</span> | '+
						_lastSession[i].date
						+ '</small><small class="text-muted pull-right editDelete"></small><hr></div></div></div></li>';
		}
	}
			var srcroll = document.getElementById('scrollDown');
			srcroll.scrollTop = srcroll.scrollHeight; 
}

function storeSend(messageItem, _deleted, _message, _author, _date, _editDelete) {
	messageItem = {
		deleted: _deleted,
		message: _message,
 		author:  _author,
 		date: _date,
 		editDelete:  _editDelete
	};
	return messageItem;
}

function storeEditMessage (messageItem, _date, _message) {
	messageItem.message = _message;
	messageItem.date = _date;
	return messageItem;
}

function storeSubmitEditedProfile (messageItem, _editDelete) {
	messageItem.editDelete = _editDelete;
	return messageItem;
}

function storeDeleteMessage (messageItem, _deleted) {
	messageItem.deleted = _deleted;
	return messageItem;
}

function storeMessages(nameMessageList) {
	var stringToSave = JSON.stringify(nameMessageList);
	localStorage.setItem("Message list", stringToSave); 
}

function restoreMessages () {
	if(typeof(Storage) == "undefined") {
		return;
	}
	var item = localStorage.getItem("Message list"); 
	if (item) return JSON.parse(item);
	else return item;
	//return item && JSON.parse(item); 
}

function send (event) {
	//will not send form (reload page), if click submit button
	if (event.preventDefault) {
    	event.preventDefault();
   	}
	var currentUserName = document.getElementById('currentUserName'); 	
	var newMessageTextArea = document.getElementById('newMessageTextArea');
	var delEmptyText = newMessageTextArea.value.replace(/\r?\n?\t?\s/g, '');
	console.log(delEmptyText);
	if ((newMessageTextArea.value !== '') && (delEmptyText !== ''))  {
			var chatField = document.getElementById('chatField');
		newMessageTextArea.value = newMessageTextArea.value.replace(/\r?\n/g, '<br>');
		var currentTime = getTime();     							
		chatField.innerHTML += '<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="message.png"></a><div class="media-body edit"><span class="currentChatText">'+
		newMessageTextArea.value
		+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
		currentUserName.textContent
		+'</span> | '+
		currentTime
		+'</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr></div></div></div></li>';
		scanDeleteMessage ();

		var srcroll = document.getElementById('scrollDown');
		srcroll.scrollTop = srcroll.scrollHeight;

		messageList[messageCounter] = storeSend(messageList[messageCounter] ,false, newMessageTextArea.value, 
		currentUserName.textContent, currentTime, true);
		storeMessages(messageList);
		++messageCounter;

		newMessageTextArea.value = '';
	}
}

function showEditProfile (event) {
	var showFormEditProfile = document.getElementById('showFormEditProfile');
	showFormEditProfile.innerHTML ='<form class="form-inline" id="formEditProfile"><div class="form-group"><input type="text" class="form-control" style="height: 30px; width: 150px; display: inline" placeholder="Your name" id="inputEditProfile"><button type="submit" class="btn btn-info" style="height: 30px; display: inline" id="buttonSubmitProfile">edit</button></div></form>'
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
	if (inputEditProfile.value !== '') {
		formEditProfile = document.getElementById('formEditProfile');
		currentUserName.innerHTML = inputEditProfile.value;
		storeName(inputEditProfile.value);
		formEditProfile.style.display = 'none';

		var editDeleteArray = document.getElementsByClassName('text-muted pull-right editDelete');
		var usersArray = document.getElementsByClassName('userNameEditDelete');
		for (var i = 0; i < usersArray.length; ++i) {
			if (currentUserName.textContent !== usersArray[i].textContent) {
				editDeleteArray[i].innerHTML = '';

				var messageNumber = 0;
				var editLi = editDeleteArray[i];
				while (editLi.tagName != 'LI') {
					editLi = editLi.parentNode;
				}

				while (editLi.previousSibling.tagName === 'LI') {
					editLi = editLi.previousSibling;
					++messageNumber;
				}
				messageList[messageNumber] = storeSubmitEditedProfile(messageList[messageNumber], false);
			} else if (currentUserName.textContent === usersArray[i].textContent){
				editDeleteArray[i].innerHTML = '<a href="#">Edit</a> | <a href="#">Delete</a>';
			
				var messageNumber = 0;
				var editLi = editDeleteArray[i];
				while (editLi.tagName != 'LI') {
					editLi = editLi.parentNode;
				}

				while (editLi.previousSibling.tagName === 'LI') {
					editLi = editLi.previousSibling;
					++messageNumber;
				}
				messageList[messageNumber] = storeSubmitEditedProfile(messageList[messageNumber], true);
			}
	}
	storeMessages(messageList);
	scanDeleteMessage ();
	}
}

function scanDeleteMessage () {
	var editDeleteArray = document.getElementsByClassName('text-muted pull-right editDelete');
	for (var i = 0; i < editDeleteArray.length; ++i) {
		if (editDeleteArray[i].lastChild !== null) {
			editDeleteArray[i].lastChild.onclick = deleteMessage;
		}
		if(editDeleteArray[i].firstChild !== null) {
			editDeleteArray[i].firstChild.onclick = editMessage;
		}
	}
}

function deleteMessage (event) {
	var deleteLi = event.target;
	while (deleteLi.tagName != 'LI') {
		deleteLi = deleteLi.parentNode;
	}
	deleteLi.innerHTML = '<div class="row"><div class="col-md-12 text-center"><small class="text-muted center">Message was deleted</small></div></div>';

	var messageNumber = 0;
	while (deleteLi.previousSibling.tagName === 'LI') {
		deleteLi = deleteLi.previousSibling;
		++messageNumber;
	}	
	messageList[messageNumber] = storeDeleteMessage(messageList[messageNumber], true);
	storeMessages(messageList);
}

function editMessage (event) {
	var sendButton = document.getElementById('sendButton');
	sendButton.onclick = '';
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

   		if (editMessageTextArea.value !== '') {
   			editMessageTextArea.value = editMessageTextArea.value.replace(/\r?\n/g, '<br>');
   			var currentTime = 'Message was edited on ' + getTime();
   			editLi.innerHTML = '<span class="currentChatText">'+
			editMessageTextArea.value
			+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
			currentUserName.textContent
			+'</span> | '+
			currentTime
			+'</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr>';
			scanDeleteMessage ();

			var messageNumber = 0;
			while (editLi.tagName != 'LI') {
				editLi = editLi.parentNode;
			}

			while (editLi.previousSibling.tagName === 'LI') {
				editLi = editLi.previousSibling;
				++messageNumber;
			}
			messageList[messageNumber] = storeEditMessage(messageList[messageNumber], currentTime, editMessageTextArea.value);
			storeMessages(messageList);
		}
		sendButton.onclick = send;
	}
}

function getTime () {
	var currentTime = new Date();
	var result = currentTime.toDateString() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	return result;
}