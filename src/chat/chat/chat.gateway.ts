import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`+ Conexión: ${client.id}`);
    this.server.emit('userJoined', { userId: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log(`– Desconexión: ${client.id}`);
    this.server.emit('userLeft', { userId: client.id });
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(
    @MessageBody() data: { userId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Mensaje de ${data.userId}: ${data.message}`);
    this.server.emit('chatMessage', data);
  }
  @SubscribeMessage('ping')
handlePing(@ConnectedSocket() client: Socket) {
  client.emit('pong', 'pong!');
}

}

