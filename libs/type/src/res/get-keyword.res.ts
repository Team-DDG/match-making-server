import { ApiProperty } from '@nestjs/swagger';

export class GetKeywordRes {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public keyword: string;
}
