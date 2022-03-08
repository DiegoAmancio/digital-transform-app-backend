import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
@ObjectType()
export class QuestionInputType {
  @Field(() => ID)
  id: string;

  @Field(() => [String])
  @IsNotEmpty()
  alternatives: string[];

  @Field(() => [Number])
  @IsNotEmpty()
  correctAnswers: number[];

  @Field()
  @IsNotEmpty()
  enunciate: string;

  @Field()
  @IsNotEmpty()
  quizId: string;
}
