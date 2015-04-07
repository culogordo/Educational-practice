var messageListFromServer = [];
var messageList = [];
var interval = null;
var mainUrl = 'http://localhost:999/chat';
var token = 'TN11EN';
var messageCounter = 0;
var deletedMessages;
var editMessages;


var run = function () {
	var currentUserName = document.getElementById('currentUserName');
		currentUserName.textContent = restoreAnotherName() || 'Your name';
	var sendButton = document.getElementById('sendButton');
		sendButton.onclick = send;
	var buttonEditProfile = document.getElementById('buttonEditProfile');
		buttonEditProfile.onclick = showEditProfile;
}();

var interval = setInterval("restoreMessages()", 500);

function storeName(nameToSave) {
	var stringToSave = JSON.stringify(nameToSave);
	localStorage.setItem("Previos name", stringToSave); 
}

function restoreAnotherName () {
	return (restoreName() + uniqueId());
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
		if (_lastSession[i].deleted === 'true') {
			chatField.innerHTML += '<li class="media"><div class="row"><div class="col-md-12 text-center"><small class="text-muted center">Message was deleted</small></div></div></li>';
		} else if (_lastSession[i].editDelete === 'true'){
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

function storeSend(messageItem, _deleted, _message, _author, _date, _editDelete, _id) {
	messageItem = {
		deleted: _deleted,
		message: _message,
 		author:  _author,
 		date: _date,
 		editDelete:  _editDelete,
 		id: _id
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

function uniqueId () {
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
}

function restoreMessages (continueWith) {

	var url = mainUrl + '?token=' + token;
	get(url, function(responseText) {
		console.assert(responseText != null);
		var response = JSON.parse(responseText);
		token = response.token;
		messageListFromServer = response.message;
		deletedMessages = response.deletedMessages;
		editMessages = response.editMessages;

		
		for (var i = 0; i < messageList.length; ++i) {
			for (var j = 0; j < editMessages.length; ++j) {
				if (messageList[i].id === editMessages[j].id && messageList[i].message !== editMessages[j].message) {
					var k = 0;
					var editLi = document.getElementById('chatField').firstChild.nextSibling;
					while (k !== i) {
						editLi = editLi.nextSibling;
						++k;
					}

					editLi = editLi.getElementsByClassName('media-body edit')[0];
					editMessages[j].message = editMessages[j].message.replace(/\r?\n/g, '<br>');
   					var currentTime = 'Message was edited on ' + getTime();
   					editLi.innerHTML = '<span class="currentChatText">'+
					editMessages[j].message
					+'</span><br><small class="text-muted"><span class="userNameEditDelete">'+
					currentUserName.textContent
					+'</span> | '+
					currentTime
					+'</small><small class="text-muted pull-right editDelete"><a href="#">Edit</a> | <a href="#">Delete</a></small><hr>';
					scanDeleteMessage ();
					messageList[i] = storeEditMessage(messageList[i], currentTime, editMessages[j].message);
				}
			}
		}


		for (var i = 0; i < messageList.length; ++i) {
			for (var j = 0; j < deletedMessages.length; ++j) {
				if (messageList[i].id === deletedMessages[j] && messageList[i].deleted === 'false') {
					var k = 0;
					var del = document.getElementById('chatField').firstChild.nextSibling;
					while (k !== i) {
						del = del.nextSibling;
						++k;
					}
					del.innerHTML = '<div class="row"><div class="col-md-12 text-center"><small class="text-muted center">Message was deleted</small></div></div>';
					messageList[i] = storeDeleteMessage(messageList[i], true);
				}
			}
		}



		for (var i = 0; i < messageListFromServer.length; ++i) {
			messageList[messageCounter] = messageListFromServer[i];
			++messageCounter;
		}

		var lastSession = messageListFromServer;
		if (lastSession.length !== 0) {
			messageListFromServer = lastSession;
			innerRestoredMesseges(lastSession);	
			editDeleteChange ();
		}
		continueWith && continueWith();
	});
}

function get(url, continueWith, continueWithError) {
	ajax('GET', url, null, continueWith, continueWithError);
}

function post(url, data, continueWith, continueWithError) {
	ajax('POST', url, data, continueWith, continueWithError);	
}

function put(url, data, continueWith, continueWithError) {
	ajax('PUT', url, data, continueWith, continueWithError);	
}

function delete_(url, data, continueWith, continueWithError) {
	ajax('DELETE', url, data, continueWith, continueWithError);	
}

function isError(text) {
	if(text == "")
		return false;
	
	try {
		var obj = JSON.parse(text);
	} catch(ex) {
		return true;
	}

	return !!obj.error;
}

function defaultErrorHandler(message) {
	clearInterval(interval);
	console.error(message);
	output(message);
}

function ajax(method, url, data, continueWith, continueWithError) {
	var xhr = new XMLHttpRequest();

	continueWithError = continueWithError || defaultErrorHandler;
	xhr.open(method || 'GET', url, true);

	xhr.onload = function () {
		if (xhr.readyState !== 4)
			return;

		if(xhr.status != 200) {
			clearInterval(interval);
			continueWithError('Error on the server side, response ' + xhr.status);
			return;
		}

		if(isError(xhr.responseText)) {
			clearInterval(interval);
			continueWithError('Error on the server side, response ' + xhr.responseText);
			return;
		}

		continueWith(xhr.responseText);
	};    

    xhr.ontimeout = function () {
    	clearInterval(interval);
    	continueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
    	clearInterval(interval);
    	var errMsg = 'Server connection error !\n'+
    	'Check if server is active';
        continueWithError(errMsg);
    };

    xhr.send(data);
}

window.onerror = function(err) {
	output(err.toString());
}

function output (str) {
	var connection = document.getElementById('connection');
	connection.innerHTML = str;
}

function send (event) {
	//will not send form (reload page), if click submit button
	if (event.preventDefault) {
    	event.preventDefault();
   	}
	var currentUserName = document.getElementById('currentUserName'); 	
	var newMessageTextArea = document.getElementById('newMessageTextArea');
	var delEmptyText = newMessageTextArea.value.replace(/\r?\n?\t?\s/g, '');
	if ((newMessageTextArea.value !== '') && (delEmptyText !== ''))  {
		newMessageTextArea.value = newMessageTextArea.value.replace(/\r?\n/g, '<br>');
		var currentTime = getTime();     							
		var SC = storeSend(messageList[messageCounter] ,false, newMessageTextArea.value, 
		currentUserName.textContent, currentTime, true, uniqueId());

		post(mainUrl, JSON.stringify(SC), function(){
			restoreMessages();
		});
		var srcroll = document.getElementById('scrollDown');
		srcroll.scrollTop = srcroll.scrollHeight;
		scanDeleteMessage ();
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
		editDeleteChange (); 
   	}
}

function editDeleteChange () {
	currentUserName = document.getElementById('currentUserName');
	inputEditProfile = document.getElementById('inputEditProfile');
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
	scanDeleteMessage ();
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

	var messageNumber = 0;
	while (deleteLi.previousSibling.tagName === 'LI') {
		deleteLi = deleteLi.previousSibling;
		++messageNumber;
	}	

	var messageItem = {};
	messageItem.id = messageList[messageNumber].id;

	delete_(mainUrl, JSON.stringify(messageItem), function(){
		restoreMessages();
	});
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

			var messageNumber = 0;
			while (editLi.tagName != 'LI') {
				editLi = editLi.parentNode;
			}

			while (editLi.previousSibling.tagName === 'LI') {
				editLi = editLi.previousSibling;
				++messageNumber;
			}

			var messageItem = {};
			messageItem.id = messageList[messageNumber].id;
			messageItem.message = editMessageTextArea.value;

			put(mainUrl, JSON.stringify(messageItem), function() {
				restoreMessages();
			});
		}

		sendButton.onclick = send;
	}
}

function getTime () {
	var currentTime = new Date();
	var result = currentTime.toDateString() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	return result;
}