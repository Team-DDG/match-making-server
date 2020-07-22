import { AuthService } from '@app/auth';
import { Keyword, User, UserKeyword } from '@app/entity';
import { GetKeywordRes, GetUserRes, PostUserDto } from '@app/type';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;
  @InjectRepository(Keyword)
  private readonly KeywordRepo: Repository<Keyword>;
  @InjectRepository(UserKeyword)
  private readonly userKeywordRepo: Repository<UserKeyword>;
  @Inject()
  private readonly authService: AuthService;

  public async deleteUser(id: string): Promise<void> {
    const numOfUser: number = await this.userRepo.count({ id });
    if (1 > numOfUser) {
      throw new NotFoundException();
    }

    const foundUserKeywords: UserKeyword[] = await this.userKeywordRepo.find({ userId: id });
    await Promise.all(foundUserKeywords.map(async (e: UserKeyword): Promise<DeleteResult> => {
      return this.userKeywordRepo.delete(e);
    }));

    await this.userRepo.delete(id);
  }

  public async getUser(id: string): Promise<GetUserRes> {
    const foundUser: User = await this.userRepo.findOne(id, {
      join: {
        alias: 'User',
        leftJoinAndSelect: {
          UserKeyword: 'User.keywords',
          // eslint-disable-next-line sort-keys
          Keyword: 'UserKeyword.keyword',
        },
      },
    });
    if (!foundUser) {
      throw new NotFoundException();
    }
    ['id'].forEach((e: string) => Reflect.deleteProperty(foundUser, e));

    return {
      ...foundUser,
      keywords: foundUser.keywords.map((e: UserKeyword): GetKeywordRes => {
        const keywordRes: GetKeywordRes = new GetKeywordRes();
        Object.assign(keywordRes, { keyword: e.keyword.keyword, size: e.size });
        return keywordRes;
      }),
    };
  }

  public async postUser(id: string, payload: PostUserDto): Promise<void> {
    const numOfEmail: number = await this.userRepo.count({ email: payload.email });
    if (0 < numOfEmail) {
      throw new ConflictException();
    }

    const user: User = new User();
    const keywordIds: number[] = payload.keywords;
    ['keywords'].forEach((e: string) => Reflect.deleteProperty(payload, e));
    Object.assign(user, { ...payload, id });

    await this.userRepo.insert(user);

    await Promise.all(keywordIds.map(async (e: number) => {
      const userKeyword: UserKeyword = new UserKeyword();
      Object.assign(userKeyword, { keywordId: e, userId: id });
      return this.userKeywordRepo.insert(userKeyword);
    }));
  }
}
