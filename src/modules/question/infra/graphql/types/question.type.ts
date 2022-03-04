import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class QuestionType {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  alternatives: string[];

  @Field()
  @IsNotEmpty()
  corrects: number[];

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;
}
