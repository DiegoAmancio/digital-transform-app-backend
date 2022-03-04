import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  reqEmail: string;

  @Field()
  reqGoogleId: string;

  @Field()
  reqTokenId: string;
}
