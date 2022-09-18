import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try{
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);  
    app.useGlobalPipes(new ValidationPipe ());
    const server = await app.listen(PORT, async () => {
      Logger .log(`Imaginamos-api Server is running in port ${PORT}`);     
    });    
  } catch (error) {
    Logger.error('Error initializing Imaginamos-api Server', error);
  }  
}
bootstrap();
