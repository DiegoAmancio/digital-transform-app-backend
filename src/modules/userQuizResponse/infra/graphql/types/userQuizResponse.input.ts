import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class UserQuizResponseInputType {
  @Field(() => Int)
  @IsNotEmpty()
  lastQuestion: number;

  @Field(() => [String])
  @IsNotEmpty()
  responses: string[];

  @Field()
  @IsDate()
  created_at: Date;

  @Field(() => Boolean)
  @IsNotEmpty()
  complete: boolean;

  @Field()
  @IsDate()
  updated_at: Date;

  @Field()
  @IsNotEmpty()
  quiz: string;
}
