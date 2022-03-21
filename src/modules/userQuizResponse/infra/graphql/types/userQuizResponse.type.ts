import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class UserQuizResponseType {
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
