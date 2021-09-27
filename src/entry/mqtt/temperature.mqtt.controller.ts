import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'
import { TemperatureService } from 'src/infrastructure/services/domain/temperature/temperature.service';
import { SocketService } from 'src/infrastructure/services/socket/socket.service';

@Controller()
export class TemperatureMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly temperatureService: TemperatureService,
		private readonly socketService: SocketService,
	) { }

	@MessagePattern('temperature/newInsert')
	newTemperatureInsert(@Payload() data: any, @Ctx() context: MqttContext) {
		this.temperatureService.getAllRecords().then(temperatureRecords => {
			this.socketService.server.emit('temperatureRecords', temperatureRecords);
		})
	}
}
