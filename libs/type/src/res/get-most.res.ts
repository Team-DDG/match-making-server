import { ApiProperty } from '@nestjs/swagger';

export class GetMostRes {
  @ApiProperty()
  public evaluation: string;
  @ApiProperty()
  public gameCount: number;
  @ApiProperty()
  public image: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public winRate: number;
}
