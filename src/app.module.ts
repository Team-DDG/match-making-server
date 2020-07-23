import { AuthModule } from '@app/auth';
import { config } from '@app/config';
import { LolModule } from '@app/lol';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule, LolModule,
    TypeOrmModule.forRoot(config.ormConfig),
    UserModule,
  ],
})
export class AppModule {
}
