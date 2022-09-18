import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try{
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);  
    app.useGlobalPipes(new ValidationPipe ());

    const config = new DocumentBuilder()
    .setTitle('Imaginamos-test Api')
    .setDescription('Test pre-selección para Imaginamos, S.A.S')
    .setVersion('1.0')    
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const server = await app.listen(PORT, async () => {
      Logger .log(`Imaginamos-api Server is running in port ${PORT}`);     
    });    
  } catch (error) {
    Logger.error('Error initializing Imaginamos-api Server', error);
  }  
}
bootstrap();
