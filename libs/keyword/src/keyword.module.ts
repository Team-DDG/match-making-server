import { entities } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordService } from './keyword.service';

@Module({
  exports: [KeywordService],
  imports: [
    TypeOrmModule.forFeature(entities),
  ],
  providers: [KeywordService],
})
export class KeywordModule {
}
