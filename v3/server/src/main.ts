import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import './patch'
import { SocketAdapter } from './websockets/websockets.adapter';

require('events').EventEmitter.defaultMaxListeners = 1000; // verificar se isso realmente está certo, pois pode ocorrer gargalos

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    );

    /* app.setGlobalPrefix("/api"); */

    app.useWebSocketAdapter(new SocketAdapter(app));

    await app.listen(process.env.PORT || 3030)
}
bootstrap();
