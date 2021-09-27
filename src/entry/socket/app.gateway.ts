import { OnGatewayConnection } from '@nestjs/websockets';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { SocketService } from 'src/infrastructure/services/socket/socket.service';
import { TemperatureService } from 'src/infrastructure/services/domain/temperature/temperature.service';
import { HumidityService } from 'src/infrastructure/services/domain/humidity/humidity.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection {
	constructor(
		private socketService: SocketService,
		private readonly temperatureService: TemperatureService,
		private readonly humidityService: HumidityService,
	) { }

	@WebSocketServer() server: Server

	afterInit(server: Server) {
		this.socketService.server = server
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.temperatureService.getAllRecords().then(temperatureRecords => {
			client.emit('temperatureRecords', temperatureRecords);
		})
		this.humidityService.getAllRecords().then(humidityRecords => {
			client.emit('humidityRecords', humidityRecords);
		})
	}
}
