import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class CharacterDescriptionDto {
  constructor(name: string) {
    this.name = name;
  }
  @Field(() => ID)
  readonly name: string;
}
