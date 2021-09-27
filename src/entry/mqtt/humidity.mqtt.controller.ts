import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'
import { HumidityService } from 'src/infrastructure/services/domain/humidity/humidity.service';
import { SocketService } from 'src/infrastructure/services/socket/socket.service';

@Controller()
export class HumidityMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly humidityService: HumidityService,
		private readonly socketService: SocketService,
	) { }

	@MessagePattern('humidity/newInsert')
	newHumidityInsert(@Payload() data: any, @Ctx() context: MqttContext) {
		this.humidityService.getAllRecords().then(humidityRecords => {
			this.socketService.server.emit('humidityRecords', humidityRecords);
		})
	}
}
