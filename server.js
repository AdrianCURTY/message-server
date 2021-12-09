const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
  });
  
  app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client.js');
  });
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        let obj=JSON.parse(msg);
      console.log('From '+obj.sender+': ' + obj.msg);
      io.emit('chat message', '['+obj.sender+']: ' + obj.msg);
    });
  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});

