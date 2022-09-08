import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import './patch'
import { SocketAdapter } from './websockets/websockets.adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    );

    app.useWebSocketAdapter(new SocketAdapter(app));

    await app.listen(process.env.PORT || 3030)
}
bootstrap();
