import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmeModule } from './cme/cme.module';

@Module({
  imports: [CmeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
