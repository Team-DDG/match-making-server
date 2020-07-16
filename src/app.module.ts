import { AuthModule } from '@app/auth';
import { config } from '@app/config';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(config.ormConfig),
    UserModule,
  ],
})
export class AppModule {
}
