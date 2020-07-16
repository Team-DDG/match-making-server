import { AuthService } from '@app/auth';
import { User } from '@app/entity';
import { TestUtilService } from '@app/test-util';
import { SignUpDto } from '@app/type';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  @Inject()
  private readonly authService: AuthService;

  @Inject()
  private readonly testUtilService: TestUtilService;

  public async postUser(id: string, payload: SignUpDto): Promise<void> {
    const numOfName: number = await this.userRepo.count({ name: payload.name });
    if (0 < numOfName) {
      throw new ConflictException('name');
    }

    const numOfEmail: number = await this.userRepo.count({ name: payload.name });
    if (0 < numOfEmail) {
      throw new ConflictException('email');
    }

    const user: User = new User();
    Object.assign(user, { ...payload, id });

    await this.userRepo.insert(user);
  }

  public async deleteUser(id: string): Promise<void> {
    const numOfUser: number = await this.userRepo.count({ id });
    if (1 > numOfUser) {
      throw new NotFoundException();
    }
    await this.userRepo.delete(id);
  }
}
