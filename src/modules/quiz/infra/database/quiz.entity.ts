import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Question } from '@modules/question/infra/database';
import { UserQuizResponse } from '@modules/userQuizResponse/infra/database';
import { QuestionType } from '@modules/question/infra/graphql/types';
@ObjectType()
@Entity('quizes')
export class Quiz {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => QuestionType)
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => UserQuizResponse, (response) => response.quiz)
  responses: UserQuizResponse[];
}
