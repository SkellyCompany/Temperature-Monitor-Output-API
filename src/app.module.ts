import { AppGateway } from './entry/socket/app.gateway';
import { HumidityMqttController } from './entry/mqtt/humidity.mqtt.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { HumidityRecord, HumidityRecordSchema } from 'src/domain/schemas/humidity-record.schema';
import { TemperatureRecord, TemperatureRecordSchema } from 'src/domain/schemas/temperature-record.schema';
import { AppController } from './entry/http/app.controller';
import { AppService } from './infrastructure/services/app.service';
import { HumidityService } from 'src/infrastructure/services/domain/humidity/humidity.service';
import { SocketService } from 'src/infrastructure/services/socket/socket.service';
import { TemperatureMqttController } from 'src/entry/mqtt/temperature.mqtt.controller';
import { TemperatureService } from 'src/infrastructure/services/domain/temperature/temperature.service';

@Module({
  imports: [
    // MONGODB
    MongooseModule.forRoot(
      'mongodb+srv://skelly:SKELLYskelly11!@cluster0.vr2pa.mongodb.net/TemperatureMonitor?retryWrites=true&w=majority'
    ),
    MongooseModule.forFeature(
      [
        { name: TemperatureRecord.name, schema: TemperatureRecordSchema },
        { name: HumidityRecord.name, schema: HumidityRecordSchema }
      ]
    ),

    // HiveMQ
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: 'mqtts://c858b836a97a4d2ca9327bfa2eb51fb6.s1.eu.hivemq.cloud',
          port: 8883,
          username: 'skelly',
          password: 'SKELLYskelly11!'
        },
      },
    ]),
  ],
  controllers: [AppController, TemperatureMqttController, HumidityMqttController],
  providers: [AppService, TemperatureService, HumidityService, SocketService, AppGateway],
})
export class AppModule { }
