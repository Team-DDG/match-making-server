import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PatchUserLolDto {
  @ApiProperty()
  @IsString()
  public summonerName: string;
}
