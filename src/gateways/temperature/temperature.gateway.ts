import { Inject } from '@nestjs/common';
import { ClientMqtt, Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { TemperatureRecordDocument } from 'src/schemas/temperature-record.schema';
import { TemperatureService } from "src/services/temperature/temperature.service";

@WebSocketGateway()
export class TemperatureGateway implements OnGatewayConnection {
  constructor(
    @Inject('MQTT_CLIENT') private client: ClientMqtt,
    private temperatureService: TemperatureService
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
    client.emit('temperatureRecords', this.temperatureService.getAllRecords());
  }

  @MessagePattern('temperature/newInsert')
  newTemperatureInsert(@Payload() data: TemperatureRecordDocument, @Ctx() context: MqttContext) {
    this.server.emit('temperatureRecords', this.temperatureService.getAllRecords());
  }
}
