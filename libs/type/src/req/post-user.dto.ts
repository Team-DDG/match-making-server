import { GenderEnum } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostUserDto {
  @ApiProperty({ example: 'email@email.com' })
  @IsEmail()
  public email: string;
  @ApiProperty({ enum: GenderEnum, enumName: 'GenderEnum', type: 'enum' })
  @IsEnum(GenderEnum)
  public gender: GenderEnum;
  @ApiProperty({ example: '[1, 2]' })
  @IsNumber({}, { each: true })
  @IsOptional()
  public keywords?: number[];
  @ApiProperty({ example: '10:30' })
  @IsString()
  public playableEndTime: string;
  @ApiProperty({ example: '11:30' })
  @IsString()
  public playableStartTime: string;
}
