const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

const messagesContainer = document.querySelector('.messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');

socket.onopen = function() {
  console.log('WebSocket connection established');
};

socket.onmessage = function(event) {
  const message = event.data;
  const messageElement = document.createElement('div');

  if (message.startsWith('Сообщение от сервера: ')) {
    messageElement.classList.add('server-message');
  } else {
    messageElement.classList.add('user-message');
  }

  const messageTextElement = document.createElement('span');
  messageTextElement.classList.add('message-text');

  messageTextElement.textContent = message;
  messageElement.appendChild(messageTextElement);
  messagesContainer.appendChild(messageElement);

  // Дублирование сообщений пользователя обратно от сервера
  if (!message.startsWith('Сообщение от сервера: ')) {
    socket.send('Сообщение от сервера: ' + message);
  }
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error);
};

sendButton.addEventListener('click', function() {
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
});

locationButton.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationMessage = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const messageElement = document.createElement('div');
    const linkElement = document.createElement('a');
    linkElement.href = locationMessage;
    linkElement.textContent = 'Гео-локация';
    linkElement.target = '_blank';
    messageElement.appendChild(linkElement);
    messagesContainer.appendChild(messageElement);
  });
});