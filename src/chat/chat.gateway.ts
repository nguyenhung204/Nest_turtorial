import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { HttpException, Logger, UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'src/config/guard/ws-jwt-auth.guard';
import { wsAuthMiddleware } from 'src/config/middleware/ws-auth.middleware';
import { ChatsService } from './chats.service';

@WebSocketGateway(4000, {
  namespace: '/chats',
})
@UseGuards(WsJwtAuthGuard)
export class ChatsGateway {

  constructor(private readonly chatsService: ChatsService) { }

  @WebSocketServer()
  server: Server;

 
  afterInit(client: Socket) {
    client.use((socket, next) => wsAuthMiddleware(socket, next));
    Logger.log('Initialized!', 'ChatsGateway');
  }

  @SubscribeMessage('chats')
  async createChat(
    @ConnectedSocket() client: any ,
    @MessageBody() createChatDto: CreateChatDto,

  ) {
    console.log("Create chat");
    console.log(createChatDto);
    const senderId = client.handshake.user._id.toString(); 
    console.log(senderId);

    const chat = await this.chatsService.create(senderId, createChatDto);

    this.server.emit('chats', chat);
  }


  handleConnection(client: Socket) {
    if (client.id) {
      console.log('User connected');
    }
    else{
      console.log('User not connected')
      return new HttpException('Unauthorized', 401);
    }
  
  }
  
  handleDisconnect(client: any) {
    console.log("Disconnected");
  }
  
}