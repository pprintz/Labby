import {
  prop as Property,
  arrayProp as ArrayProperty,
  Typegoose,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Move {
  @Field(() => [String])
  @Property()
  command: string[];
  @Field(() => [String])
  @Property()
  hitLevel: string[];
  @Field(() => [Number])
  @Property()
  damage: number[];
  @Field(() => [String])
  @Property()
  startUpFrame: string[];
  @Field()
  @Property()
  blockFrame: string;
  @Field()
  @Property()
  hitFrame: string;
  @Field()
  @Property()
  chFrame: string;
  @Field(() => [String])
  @Property()
  notes: string[];
}
