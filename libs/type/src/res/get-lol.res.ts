import { ApiProperty } from '@nestjs/swagger';
import { GetMostRes } from './get-most.res';
import { GetRankRes } from './get-rank.res';

export class GetLolRes {
  @ApiProperty({ nullable: true })
  public evaluation: string;
  @ApiProperty({ nullable: true, type: GetRankRes })
  public flexRank?: GetRankRes;
  @ApiProperty()
  public icon: string;
  @ApiProperty()
  public level: number;
  @ApiProperty({ nullable: true, type: [GetMostRes] })
  public mosts: GetMostRes[];
  @ApiProperty({ nullable: true, type: GetRankRes })
  public soloRank: GetRankRes;
  @ApiProperty()
  public summonerName: string;

  public constructor() {
    this.mosts = [];
  }
}
