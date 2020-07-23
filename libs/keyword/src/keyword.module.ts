import { AuthModule } from '@app/auth';
import { entities } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';

@Module({
  controllers: [KeywordController],
  exports: [KeywordService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [KeywordService],
})
export class KeywordModule {
}
