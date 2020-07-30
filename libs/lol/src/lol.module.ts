import { AuthModule } from '@app/auth';
import { entities } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LolController } from './lol.controller';
import { LolService } from './lol.service';

@Module({
  controllers: [LolController],
  exports: [LolService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [LolService],
})
export class LolModule {
}
