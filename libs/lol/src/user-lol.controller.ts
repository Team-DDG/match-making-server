import { AuthService } from '@app/auth';
import { GetLolRes, HeaderClass, PatchUserLolDto } from '@app/type';
import { Body, Controller, Get, Headers, Inject, Patch, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth, ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LolService } from './lol.service';

@ApiTags('user/lol')
@Controller('user/lol')
export class UserLolController {
  @Inject()
  private readonly lolService: LolService;
  @Inject()
  private readonly authService: AuthService;

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 롤 정보 조회' })
  @ApiOkResponse({ description: 'success', type: GetLolRes })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  @ApiNotFoundResponse()
  public async getUserLol(
    @Headers() { authorization }: HeaderClass,
  ): Promise<GetLolRes> {
    return this.lolService.getLol(await this.authService.validateToken(authorization), true);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 롤 정보 수정' })
  @ApiOkResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  @ApiConflictResponse({ description: 'summonerName already exist' })
  public async patchUserLol(
    @Headers() { authorization }: HeaderClass,
    @Body(new ValidationPipe()) payload: PatchUserLolDto,
  ): Promise<void> {
    return this.lolService.patchUserLol(await this.authService.validateToken(authorization), payload);
  }
}
