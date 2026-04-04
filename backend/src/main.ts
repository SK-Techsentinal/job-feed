import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the React frontend (port 5173) to call this API
  app.enableCors({ origin: 'http://localhost:5173' });

  // Automatically validate + reject bad query params
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,  // converts "2" string → 2 number automatically
      whitelist: true,  // strips unknown fields
    }),
  );

  await app.listen(3000);
  console.log('✅ Backend running at http://localhost:3000');
}
bootstrap();
