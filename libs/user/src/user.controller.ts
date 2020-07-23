import { AuthService } from '@app/auth';
import { GetUserRes, HeaderClass, PostUserDto, PostUserSummonerNameDto } from '@app/type';
import { Body, Controller, Delete, Get, Headers, Inject, Patch, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Inject()
  private readonly authService: AuthService;
  @Inject()
  private readonly userService: UserService;

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiOkResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async deleteUser(@Headers() { authorization }: HeaderClass): Promise<void> {
    return this.userService.deleteUser(await this.authService.validateToken(authorization));
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({ description: 'success', type: GetUserRes })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async getUser(@Headers() { authorization }: HeaderClass): Promise<GetUserRes> {
    return this.userService.getUser(await this.authService.validateToken(authorization));
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 가입' })
  @ApiCreatedResponse({ description: 'success' })
  @ApiConflictResponse({ description: 'email already exists' })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async postUser(
    @Headers() { authorization }: HeaderClass,
    @Body(new ValidationPipe()) payload: PostUserDto,
  ): Promise<void> {
    return this.userService.postUser(await this.authService.validateToken(authorization), payload);
  }

  @Patch('summonerName')
  @ApiBearerAuth()
  @ApiOperation({ summary: '소환사 명 등록(임시)' })
  @ApiOkResponse({ description: 'success' })
  @ApiConflictResponse({ description: 'summoner name already exists' })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async patchUserSummonerName(
    @Headers() { authorization }: HeaderClass,
    @Body(new ValidationPipe()) payload: PostUserSummonerNameDto,
  ): Promise<void> {
    return this.userService.patchUserSummonerName(
      await this.authService.validateToken(authorization), payload);
  }
}
