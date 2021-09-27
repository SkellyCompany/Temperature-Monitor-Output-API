import { OnGatewayConnection, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { HumidityService } from "src/services/humidity/humidity.service";

@WebSocketGateway()
export class HumidityGateway implements OnGatewayConnection {
	constructor(private humidityService: HumidityService) { }

	handleConnection(client: Socket, ...args: any[]) {
		client.emit('humidityRecords', this.humidityService.getAllRecords());
	}
}
