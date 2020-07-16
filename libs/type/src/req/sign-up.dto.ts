import { GenderEnum } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsISO8601, IsNumberString, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @IsISO8601()
  public birthday: string;
  @ApiProperty({ example: 'email@email.com' })
  @IsEmail()
  public email: string;
  @ApiProperty({ enum: GenderEnum, type: 'enum' })
  @IsEnum(GenderEnum)
  public gender: GenderEnum;
  @ApiProperty() @IsString()
  public name: string;
  @ApiProperty() @IsString()
  public password: string;
  @ApiProperty({ example: '01012345678' })
  @IsNumberString()
  public phone: string;
  @ApiProperty({ example: '10:30' })
  @IsString()
  public playableEndTime: string;
  @ApiProperty({ example: '11:30' }) @IsString()
  public playableStartTime: string;
}
