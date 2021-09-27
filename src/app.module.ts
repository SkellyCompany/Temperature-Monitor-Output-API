import { TemperatureGateway } from './gateways/temperature/temperature.gateway';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { HumidityRecord, HumidityRecordSchema } from 'src/schemas/humidity-record.schema';
import { TemperatureRecord, TemperatureRecordSchema } from 'src/schemas/temperature-record.schema';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TemperatureService } from 'src/services/temperature/temperature.service';
import { HumidityService } from 'src/services/humidity/humidity.service';

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
  controllers: [AppController],
  providers: [AppService, TemperatureService, TemperatureGateway, HumidityService],
})
export class AppModule { }
