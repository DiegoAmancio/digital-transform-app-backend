import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
@ObjectType()
export class QuizInputType {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;
}
