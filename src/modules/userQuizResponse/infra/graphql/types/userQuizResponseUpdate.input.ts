import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class QuizInputUpdateType {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  @IsNotEmpty()
  lastQuestion: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  complete: boolean;

  @Field(() => [Int])
  @IsNotEmpty()
  responses: number[];

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;
}
