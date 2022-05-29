import { server } from './http';
import './websocket/ChatService';

server.listen(process.env.PORT || 3030, () => console.log('Server started on port 3030'));