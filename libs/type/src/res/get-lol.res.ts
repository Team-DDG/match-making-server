import { ApiProperty } from '@nestjs/swagger';
import { GetMostRes } from './get-most.res';
import { GetRankRes } from './get-rank.res';

export class GetLolRes {
  @ApiProperty()
  public evaluation: string;
  @ApiProperty({ type: GetRankRes })
  public flexRank: GetRankRes;
  @ApiProperty()
  public icon: string;
  @ApiProperty()
  public level: number;
  @ApiProperty({ type: [GetMostRes] })
  public mosts: GetMostRes[];
  @ApiProperty({ type: GetRankRes })
  public soloRank: GetRankRes;
  @ApiProperty()
  public summonerName: string;

  public constructor() {
    this.mosts = [];
  }
}
