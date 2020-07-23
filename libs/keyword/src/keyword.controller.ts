import { AuthService } from '@app/auth';
import { GetKeywordRes, GetUserRes } from '@app/type';
import { UserService } from '@app/user';
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
  @Inject()
  private readonly userService: UserService;

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({ description: 'success', type: GetUserRes })
  @ApiUnauthorizedResponse({ description: 'token has expired or is invalid' })
  public async getKeyword(): Promise<GetKeywordRes[]> {
    return this.keywordService.getKeyword();
  }
}
