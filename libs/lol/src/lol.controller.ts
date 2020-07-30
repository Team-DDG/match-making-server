import { AuthService } from '@app/auth';
import { GetLolRes, HeaderClass } from '@app/type';
import { Controller, Get, Headers, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LolService } from './lol.service';

@ApiTags('user/lol')
@Controller('user/lol')
export class LolController {
  @Inject()
  private readonly lolService: LolService;
  @Inject()
  private readonly authService: AuthService;

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({ description: 'success', type: GetLolRes })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async getUserLol(
    @Headers() { authorization }: HeaderClass,
    @Query('summonerName') query: string,
  ): Promise<GetLolRes> {
    await this.authService.validateToken(authorization);
    return this.lolService.getUserLol(query);
  }
}
