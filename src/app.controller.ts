import { AuthService } from '@app/auth';
import { HeaderClass } from '@app/type';
import { Controller, Get, Headers, Inject } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags()
@Controller()
export class AppController {
  @Inject()
  private readonly authService: AuthService;

  @Get('/authorization')
  @ApiBearerAuth()
  @ApiOperation({ summary: '토큰 유효성 검사' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  public async getAuthorization(@Headers() { authorization }: HeaderClass): Promise<void> {
    await this.authService.validateToken(authorization);
  }
}
