import { NestFactory } from '@nestjs/core';
import { ENV } from 'env/environment';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV.PORT);
}
bootstrap();
