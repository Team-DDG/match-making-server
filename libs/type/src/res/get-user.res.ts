import { GenderEnum } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetUserKeywordRes } from './get-user-keyword.res';

export class GetUserRes {
  @ApiProperty({ example: 'email@email.com' })
  public email: string;
  @ApiProperty({ enum: GenderEnum, type: 'enum' })
  public gender: GenderEnum;
  @ApiProperty({ type: [GetUserKeywordRes] })
  public keywords: GetUserKeywordRes[];
  @ApiProperty({ example: '10:30' })
  public playableEndTime: string;
  @ApiProperty({ example: '11:30' })
  public playableStartTime: string;
}
