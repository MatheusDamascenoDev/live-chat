import { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function JoinChatRoom() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };

  return (
    <div className="container">
      <h3>Join a Chat</h3>
      <input
        type="text"
        placeholder="Digite seu Nome"
        onChange={(event) => { setUsername(event.target.value); }}
      />
      <input
        type="text"
        placeholder="Digite o codigo da sala"
        onChange={(event) => { setRoom(event.target.value); }}
      />

      <button type="button" onClick={joinRoom}>Join A Room</button>
    </div>
  );
}
