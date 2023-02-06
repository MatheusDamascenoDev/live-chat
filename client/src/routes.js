import { Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import JoinChatRoom from './JoinChatRoom';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<JoinChatRoom />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
