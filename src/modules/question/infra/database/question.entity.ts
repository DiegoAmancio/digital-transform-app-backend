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
@ObjectType()
@Entity('questions')
export class Question {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  enunciate: string;

  @Field(() => [String])
  @Column('text', { array: true })
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

  @Column()
  quizId: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
