import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Quiz } from '@modules/quiz/infra/database';

@ObjectType()
@Entity('userQuizResponses')
export class UserQuizResponse {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [Number])
  @Column('int', { array: true })
  responses: number[];

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

  @ManyToOne(() => Quiz, (quiz) => quiz.responses)
  quiz: Quiz;
}
