import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { GenderEnum } from './enum/gender.enum';
import { UserKeyword } from './user-keyword.entity';

@Entity()
export class User {
  @PrimaryColumn()
  public id: string;
  @Column({ unique: true })
  public email: string;
  @Column({ enum: GenderEnum, type: 'enum' })
  public gender: GenderEnum;
  @Column()
  public playableEndTime: string;
  @Column()
  public playableStartTime: string;
  @Column({ nullable: true })
  public summonerName: string;
  @OneToMany(
    () => UserKeyword,
    (userKeyword: UserKeyword) => userKeyword.user,
  )
  public keywords: UserKeyword[];
}
