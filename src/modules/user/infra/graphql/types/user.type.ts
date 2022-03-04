import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;
}
