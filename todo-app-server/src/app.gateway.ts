import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server, Socket} from "socket.io";

@WebSocketGateway(3000, {'transports': ['websocket', 'polling']} )
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: Server): any {
    this.logger.log('WebSocketGateway initialized!');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: any): void {
      this.logger.log(`Client ${client.id} sent the following message: ${text}`);

      // Notify all clients
      this.wss.emit('msgToClient', 'reload datasource');
  }
}
