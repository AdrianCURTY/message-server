console.log('WebSocket client script will run here.');
var socket = io("http://localhost:3000");
      
var form = document.getElementById('form');
var input = document.getElementById('input');
var sender = document.getElementById('sender');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
      let msg={
          msg:input.value,
          sender:sender.value
      };
    socket.emit('chat message', JSON.stringify(msg));
    input.value = '';
  }
});
socket.on('chat message', function(msg) {
var item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
messages.scrollTo(0, messages.scrollHeight);
});