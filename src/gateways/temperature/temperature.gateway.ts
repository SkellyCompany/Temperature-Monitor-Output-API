import { OnGatewayConnection, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { TemperatureService } from "src/services/temperature/temperature.service";

@WebSocketGateway()
export class TemperatureGateway implements OnGatewayConnection {
  constructor(private temperatureService: TemperatureService) { }

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('temperatureRecords', this.temperatureService.getAllRecords());
  }
}
