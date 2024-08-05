var stompClient = null;
var clientId = null;
var currentRoomId = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        // 서버에 연결하고 나서 바로 ID를 요청
        stompClient.subscribe('/topic/connect', function (message) {
            if (!clientId) {
                clientId = JSON.parse(message.body);
                document.getElementById('sender-id').innerText = clientId;
                loadUsers();
            }
        });

        // ID 요청
        stompClient.send("/app/connect", {}, {});
    });
}

function loadUsers() {
    fetch('/api/sns/chat/users?excludeUserId=' + clientId)
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            users.forEach(user => {
                const userItem = document.createElement('li');
                userItem.innerText = user.name;
                userItem.onclick = () => joinRoom(user.id);
                userList.appendChild(userItem);
            });
        });
}

function joinRoom(receiverId) {
    if (!clientId) {
        alert("Client ID를 먼저 받아야 합니다.");
        return;
    }

    // 기존 방 구독 해제
    if (currentRoomId) {
        stompClient.unsubscribe('/queue/messages/room/' + currentRoomId);
    }

    // 서버에서 roomId를 가져옴
    fetch('/api/sns/chat/createRoom?senderId=' + clientId + '&receiverId=' + receiverId)
        .then(response => response.json())
        .then(roomId => {
            currentRoomId = roomId;

            // 메시지 히스토리 가져오기
            fetch('/api/sns/chat/history?roomId=' + currentRoomId)
                .then(response => response.json())
                .then(messages => {
                    const chat = document.getElementById('chat');
                    chat.innerHTML = ''; // 기존 메시지 초기화
                    messages.forEach(message => {
                        showMessage(message);
                    });
                });

            stompClient.subscribe('/queue/messages/room/' + currentRoomId, function (chatMessage) {
                showMessage(JSON.parse(chatMessage.body));
            });

            document.getElementById('current-room-id').innerText = currentRoomId;
        });
}

function sendMessage() {
    var message = document.getElementById('message').value;

    if (clientId && currentRoomId && message) {
        var chatMessage = {
            senderId: clientId,
            roomId: currentRoomId, // 방 ID를 명확히 지정
            message: message
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        document.getElementById('message').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

function showMessage(chatMessage) {
    var chat = document.getElementById('chat');
    var messageElement = document.createElement('div');
    messageElement.appendChild(document.createTextNode(chatMessage.senderId + ": " + chatMessage.message));
    chat.appendChild(messageElement);
}

window.onload = function () {
    connect();
};
