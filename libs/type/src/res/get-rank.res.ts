import { ApiProperty } from '@nestjs/swagger';

export class GetRankRes {
  @ApiProperty()
  public image: string;
  @ApiProperty()
  public name: string;
}
