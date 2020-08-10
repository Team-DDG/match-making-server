import { AuthModule, AuthService } from '@app/auth';
import { config } from '@app/config';
import { entities, GenderEnum } from '@app/entity';
import { KeywordModule, KeywordService } from '@app/keyword';
import { LolModule, LolService } from '@app/lol';
import { TestUtilModule, TestUtilService } from '@app/test-util';
import { GetKeywordRes, GetUserKeywordRes, GetUserRes, PatchUserLolDto, PostUserDto } from '@app/type';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let authService: AuthService;
  let lolService: LolService;
  let keywordService: KeywordService;
  const testKeywords: string[] = ['test', 'test_2'];
  let testUtilService: TestUtilService;
  const testUser: PostUserDto = {
    email: config.FIREBASE_ID,
    gender: GenderEnum.MALE,
    playableEndTime: '00:00',
    playableStartTime: '12:00',
  };
  const testUserSummonerName: PatchUserLolDto = {
    summonerName: 'test',
  };
  let testUserId: string;
  let userService: UserService;


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule, LolModule, KeywordModule, TestUtilModule,
        TypeOrmModule.forRoot(config.ormConfig),
        TypeOrmModule.forFeature(entities),
        UserModule,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    lolService = module.get<LolService>(LolService);
    keywordService = module.get<KeywordService>(KeywordService);
    testUtilService = module.get<TestUtilService>(TestUtilService);
    userService = module.get<UserService>(UserService);

    const token: string = `Bearer ${await testUtilService.makeToken(config.FIREBASE_ID, config.FIREBASE_PW)}`;

    testUserId = await authService.validateToken(token);
    await keywordService.postKeywords(testKeywords);
    await userService.postUser(testUserId, {
      ...testUser,
      keywords: (await keywordService.getKeyword()).map((e: GetKeywordRes): number => e.id),
    });
  });

  afterAll(async () => {
    await userService.deleteUser(testUserId);
    await keywordService.deleteKeywords((await keywordService.getKeyword())
      .map((e: GetKeywordRes): number => e.id));
    await getConnection().close();
  });

  it('should success getUser', async () => {
    await lolService.patchUserLol(testUserId, testUserSummonerName);
    const resUser: GetUserRes = await userService.getUser(testUserId);

    expect(testKeywords).toEqual(resUser.keywords.map((e: GetUserKeywordRes) => e.keyword));

    const [req, res] = testUtilService.makeElementComparable({
      ...testUser, ...testUserSummonerName,
    }, resUser, ['keywords']);

    expect(req).toEqual(res);
  });
});
