import { Module } from '@nestjs/common';
import { CmeService } from './cme.service';
import { CmeController } from './cme.controller';

@Module({
  providers: [CmeService],
  controllers: [CmeController]
})
export class CmeModule {}
