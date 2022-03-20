import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Quiz } from '@modules/quiz/infra/database';
import { QuizType } from '@modules/quiz/infra/graphql/types';

@ObjectType()
@Entity('userQuizResponses')
export class UserQuizResponse {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [String])
  @Column('simple-array')
  responses: string[];

  @Field()
  @Column()
  complete: boolean;

  @Field()
  @Column()
  lastQuestion: number;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  created_at: Date;

  @Field(() => QuizType)
  @ManyToOne(() => Quiz, (quiz) => quiz.responses)
  quiz: Quiz;
}
