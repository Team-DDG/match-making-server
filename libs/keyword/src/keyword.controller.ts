import { AuthService } from '@app/auth';
import { GetKeywordRes } from '@app/type';
import { Controller, Get, Inject } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { KeywordService } from './keyword.service';

@ApiTags('keyword')
@Controller('keyword')
export class KeywordController {
  @Inject()
  private readonly authService: AuthService;
  @Inject()
  private readonly keywordService: KeywordService;

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '키워드 목록 조회' })
  @ApiOkResponse({ description: 'success', type: [GetKeywordRes] })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async getKeyword(): Promise<GetKeywordRes[]> {
    return this.keywordService.getKeyword();
  }
}
