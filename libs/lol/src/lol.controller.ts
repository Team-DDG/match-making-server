import { AuthService } from '@app/auth';
import { GetLolRes } from '@app/type';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LolService } from './lol.service';

@ApiTags('lol')
@Controller('lol')
export class LolController {
  @Inject()
  private readonly lolService: LolService;
  @Inject()
  private readonly authService: AuthService;

  @Get()
  @ApiOperation({ summary: '롤 정보 조회' })
  @ApiOkResponse({ description: 'success', type: GetLolRes })
  @ApiNotFoundResponse()
  public async getLol(
    @Query('summonerName') query: string,
  ): Promise<GetLolRes> {
    return this.lolService.getLol(query, false);
  }
}
