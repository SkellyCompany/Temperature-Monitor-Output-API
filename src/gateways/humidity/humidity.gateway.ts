import { TemperatureRecordDocument } from './../../../../InputAPI/src/schemas/temperature-record.schema';
import { Inject } from '@nestjs/common';
import { ClientMqtt, Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { HumidityService } from "src/services/humidity/humidity.service";

@WebSocketGateway()
export class HumidityGateway implements OnGatewayConnection {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private humidityService: HumidityService
	) { }

	@WebSocketServer() server;

	public async onModuleInit(): Promise<void> {
		await this.client
			.connect()
			.then(() => {
				console.log('connected');
			})
			.catch((e) => console.log('e', e));
	}

	handleConnection(client: Socket, ...args: any[]) {
		client.emit('humidityRecords', this.humidityService.getAllRecords());
	}

	@MessagePattern('humidity/newInsert')
	getForwardBackward(@Payload() data: TemperatureRecordDocument, @Ctx() context: MqttContext) {
		this.server.emit('humidityRecords', this.humidityService.getAllRecords());
	}
}
