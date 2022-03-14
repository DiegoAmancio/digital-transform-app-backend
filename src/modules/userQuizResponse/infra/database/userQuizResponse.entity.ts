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
@Entity('userQuizResponses')
export class UserQuizResponse {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('simple-array')
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

  @Field()
  @ManyToOne(() => Quiz, (quiz) => quiz.responses)
  quiz: Quiz;
}
