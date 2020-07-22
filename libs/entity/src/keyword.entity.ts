import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserKeyword } from './user-keyword.entity';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public keyword: string;
  @OneToMany(
    () => UserKeyword,
    (userKeyword: UserKeyword) => userKeyword.keyword,
  )
  public users: UserKeyword[];
}
