import { config } from '@app/config';
import { entities } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { AuthService } from './auth.service';

@Module({
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature(entities),
  ],
  providers: [AuthService],
})
export class AuthModule {
  public constructor() {
    admin.initializeApp(config.firebaseAdminConfig);
  }
}
