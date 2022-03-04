import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field()
  @IsNotEmpty()
  alternatives: {
    letter: string;
    text: string;
  }[];

  @Field()
  @IsNotEmpty()
  corrects: string[];
}
