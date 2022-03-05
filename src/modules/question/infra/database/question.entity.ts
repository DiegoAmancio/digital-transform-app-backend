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
  @PrimaryColumn('uuid')
  id: string;

  @Field(() => [String])
  @Column('simple-array')
  alternatives: string[];

  @Field(() => [Number])
  @Column('int', { array: true })
  correctAnswers: number[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
