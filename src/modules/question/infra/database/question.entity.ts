import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity('questions')
export class Question {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column('string', { array: true })
  alternatives: string[];

  @Field()
  @Column('int', { array: true })
  corrects: number[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
