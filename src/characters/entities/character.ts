import { Document } from 'mongoose';
import { ObjectType, InterfaceType, ArgsType, Field } from 'type-graphql';
import {
  prop as Property,
  arrayProp as ArrayProperty,
  Typegoose,
} from '@typegoose/typegoose';
import { Move } from './move';

@ObjectType()
export class Character {
  @Field()
  @Property({ required: true })
  name: string;

  @Field(() => [Move])
  @ArrayProperty({ items: Move, required: true, default: [] })
  moves: Move[];

  @Field(() => [Move])
  @ArrayProperty({ items: Move, required: true, default: [] })
  basicMoves: Move[];
}
