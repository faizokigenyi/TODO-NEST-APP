import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [
      'https://todo-list-frontend-ym77.vercel.app',
      'http://localhost:3000',
      'https://zmits.singles',
    ],
    credentials: true, // if you’re sending cookies or auth headers
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
