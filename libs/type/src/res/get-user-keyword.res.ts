import { ApiProperty } from '@nestjs/swagger';

export class GetUserKeywordRes {
  @ApiProperty()
  public keyword: string;
  @ApiProperty()
  public size: number;
}
