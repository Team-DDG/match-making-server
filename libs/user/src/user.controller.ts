import { AuthService } from '@app/auth';
import { HeaderClass, SignUpDto } from '@app/type';
import { Body, Controller, Delete, Headers, Inject, Post, ValidationPipe } from '@nestjs/common';
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
  private readonly userService: UserService;

  @Inject()
  private readonly authService: AuthService;

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 가입' })
  @ApiCreatedResponse()
  @ApiConflictResponse({ description: 'name | email' })
  @ApiUnauthorizedResponse()
  public async postUser(
    @Headers() { authorization }: HeaderClass,
    @Body(new ValidationPipe()) payload: SignUpDto,
  ): Promise<void> {
    return this.userService.postUser(await this.authService.validateToken(authorization), payload);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  public async deleteUser(@Headers() { authorization }: HeaderClass): Promise<void> {
    return this.userService.deleteUser(await this.authService.validateToken(authorization));
  }
}
