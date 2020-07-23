import { AuthModule } from '@app/auth';
import { entities } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [UserService],
})
export class UserModule {
}
