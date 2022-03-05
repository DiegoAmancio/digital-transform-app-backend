import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => [String])
  @IsNotEmpty()
  alternatives: string[];

  @Field(() => [Number])
  @IsNotEmpty()
  correctAnswers: number[];

  @Field()
  @IsNotEmpty()
  enunciate: string;
}
