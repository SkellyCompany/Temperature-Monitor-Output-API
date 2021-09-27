import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // HiveMQ
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtts://c858b836a97a4d2ca9327bfa2eb51fb6.s1.eu.hivemq.cloud',
      port: 8883,
      username: 'skelly',
      password: 'SKELLYskelly11!'
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
