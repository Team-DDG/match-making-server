import { Module } from '@nestjs/common';
import { LolService } from './lol.service';

@Module({
  exports: [LolService],
  providers: [LolService],
})
export class LolModule {}
