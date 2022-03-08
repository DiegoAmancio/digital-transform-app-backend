import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuizInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
