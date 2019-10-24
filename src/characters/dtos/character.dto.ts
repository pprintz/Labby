import { Move } from '../interfaces/character.interface';

export class CharacterDto {
  constructor(readonly name: string, readonly moves: Move[]) {}
}
