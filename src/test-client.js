const { io } = require('socket.io-client');
const socket = io('http://localhost:4500');

socket.on('connect', () => {
  console.log('✅ Conectado como', socket.id);
  socket.emit('chatMessage', { userId: socket.id, message: 'Hola, ¡funciono!' });
});

socket.on('chatMessage', data => console.log('Recibido:', data));
socket.on('userJoined', data => console.log('Se conectó:', data));
socket.on('userLeft', data => console.log('Se desconectó:', data));
socket.on('disconnect', reason => console.log('🛑 Desconectado:', reason));
socket.on('connect', () => console.log('✅ Connected!', socket.id));
socket.on('connect_error', (err) => console.error('❌ Connection error:', err));
socket.onAny((evt, ...args) => console.log('🔔 Event', evt, args));
