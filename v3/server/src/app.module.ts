import { Module } from '@nestjs/common';
import { AppController } from './api/running/app.controller';
import { AppService } from './api/running/app.service';
import { WebsocketsModule } from './websockets/websockets.module';
import { RunningModule } from './api/running/running.module';

@Module({
    imports: [WebsocketsModule, RunningModule],
})
export class AppModule {}
