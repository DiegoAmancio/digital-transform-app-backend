import { QuestionDTO } from '@modules/question/Dto';
import { QuestionType } from '@modules/question/infra/graphql/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class QuizType {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;

  @Field(() => [QuestionType])
  questions: QuestionDTO[];
}
