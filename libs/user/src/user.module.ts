import { AuthModule } from '@app/auth';
import { entities } from '@app/entity';
import { TestUtilModule } from '@app/test-util';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    AuthModule, TestUtilModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [UserService],
})
export class UserModule {
}
