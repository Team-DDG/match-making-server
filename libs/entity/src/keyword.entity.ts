import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public content: string;
}
