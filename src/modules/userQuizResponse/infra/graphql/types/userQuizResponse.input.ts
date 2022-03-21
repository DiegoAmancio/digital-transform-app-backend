import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserQuizResponseInputType {
  @Field(() => Int)
  @IsNotEmpty()
  lastQuestion: number;

  @Field(() => [Number])
  @IsNotEmpty()
  responses: number[];

  @Field(() => Boolean)
  @IsNotEmpty()
  complete: boolean;

  @Field()
  @IsNotEmpty()
  quiz: string;
}
