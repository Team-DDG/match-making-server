import { AuthModule, AuthService } from '@app/auth';
import { config } from '@app/config';
import { entities, GenderEnum } from '@app/entity';
import { TestUtilModule, TestUtilService } from '@app/test-util';
import { SignUpDto } from '@app/type';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let authService: AuthService;
  let testUtilService: TestUtilService;
  const testUser: SignUpDto = {
    birthday: new Date().toISOString().slice(0, 10),
    email: config.FIREBASE_ID,
    gender: GenderEnum.MALE,
    name: 'test',
    password: config.FIREBASE_PW,
    phone: '01012345678',
    playableEndTime: '00:00',
    playableStartTime: '12:00',
  };
  let userService: UserService;
  let token: string;


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule, TestUtilModule,
        TypeOrmModule.forRoot(config.ormConfig),
        TypeOrmModule.forFeature(entities),
        UserModule,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    testUtilService = module.get<TestUtilService>(TestUtilService);
    userService = module.get<UserService>(UserService);

    token = `Bearer ${await testUtilService.makeToken(config.FIREBASE_ID, config.FIREBASE_PW)}`;
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('should success postUser and deleteUser', async () => {
    const id: string = await authService.validateToken(token);
    await userService.postUser(id, testUser);
    await userService.deleteUser(id);
  });
});
