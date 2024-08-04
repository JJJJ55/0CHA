var stompClient = null;
var clientId = null;

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
                // 구독은 ID를 받은 후에 설정
                stompClient.subscribe('/queue/messages/' + clientId, function (chatMessage) {
                    showMessage(JSON.parse(chatMessage.body));
                });
            }
        });

        // ID 요청
        stompClient.send("/app/connect", {}, {});
    });
}

function sendMessage() {
    var receiver = document.getElementById('receiver').value;
    var message = document.getElementById('message').value;

    if (clientId && receiver && message) {
        var chatMessage = {
            senderId: clientId,
            roomId: receiver, // Assuming roomId represents the receiver in this context
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

window.onload = function() {
    connect();
};
