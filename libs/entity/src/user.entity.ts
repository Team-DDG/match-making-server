import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { GenderEnum } from './enum/gender.enum';
import { Keyword } from './keyword.entity';

@Entity()
export class User {
  @PrimaryColumn()
  public id: string;
  @CreateDateColumn()
  public createDate: Date;
  @Column()
  public birthday: Date;
  @Column({ unique: true })
  public email: string;
  @Column({ enum: GenderEnum, type: 'enum' })
  public gender: GenderEnum;
  @Column({ unique: true })
  public name: string;
  @Column()
  public password: string;
  @Column()
  public phone: string;
  @Column()
  public playableEndTime: string;
  @Column()
  public playableStartTime: string;
  @ManyToMany(() => User)
  @JoinTable()
  public keywords: Keyword[];
}
