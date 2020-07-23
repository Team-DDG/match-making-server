import { AuthModule } from '@app/auth';
import { config } from '@app/config';
import { KeywordModule } from '@app/keyword';
import { LolModule } from '@app/lol';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule, LolModule, KeywordModule,
    TypeOrmModule.forRoot(config.ormConfig),
    UserModule,
  ],
})
export class AppModule {
}
