import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { SocketService } from 'src/infrastructure/services/socket/socket.service';

@WebSocketGateway({ cors: true })
export class AppGateway {
	constructor(private socketService: SocketService) { }

	@WebSocketServer() server: Server

	afterInit(server: Server) {
		this.socketService.server = server
	}
}
