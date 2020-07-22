import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Keyword } from './keyword.entity';
import { User } from './user.entity';

@Entity()
export class UserKeyword {
  @PrimaryColumn()
  public userId: string;
  @PrimaryColumn()
  public keywordId: number;
  @Column({ default: 0 })
  public size: number;
  @ManyToOne(() => User, (user: User) => user.keywords)
  @JoinColumn({ name: 'userId' })
  public user: User;
  @ManyToOne(
    () => Keyword,
    (keyword: Keyword) => keyword.users,
  )
  @JoinColumn({ name: 'keywordId' })
  public keyword: Keyword;
}
