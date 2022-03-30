import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserQuizResponse } from '@modules/userQuizResponse/infra/database';
@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserQuizResponse, (response) => response.userId)
  responses: UserQuizResponse[];
}
