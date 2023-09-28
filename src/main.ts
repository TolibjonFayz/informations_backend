import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.setGlobalPrefix('api');

    await app.listen(PORT, () => {
      console.log(`Server is running at ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
