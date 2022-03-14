import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class QuizInputType {
  @Field(() => Int)
  @IsNotEmpty()
  lastQuestion: number;

  @Field(() => [Int])
  @IsNotEmpty()
  responses: number[];

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;

  @Field()
  @IsNotEmpty()
  quiz: string;
}
