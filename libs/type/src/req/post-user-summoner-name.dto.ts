import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostUserSummonerNameDto {
  @ApiProperty()
  @IsString()
  public summonerName: string;
}
