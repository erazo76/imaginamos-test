import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TvServModule } from './tv-serv.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TvServModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
