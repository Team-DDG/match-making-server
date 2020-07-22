import { ApiProperty } from '@nestjs/swagger';

export class GetKeywordRes {
  @ApiProperty()
  public keyword: string;
  @ApiProperty()
  public size: number;
}
