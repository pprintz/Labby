import { ObjectType, Field, Int, ID } from 'type-graphql';
import { Character } from '../entities/character';
import { Move } from '../entities/move';

export class CharacterDto extends Character {
  constructor(name: string, moves: Move[], basicMoves: Move[]) {
    super();
  }
  readonly name: string;
  readonly moves: Move[];
  readonly basicMovies: Move[];
}
