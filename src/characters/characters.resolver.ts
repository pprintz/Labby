import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { CharacterDescriptionDto } from './dtos/character-description.dto';
import { CharacterDto } from './dtos/character.dto';
import { Character } from './entities/character';

@Resolver()
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Query(() => [CharacterDescriptionDto])
  async characterDescriptions() {
    const chars = await this.charactersService.findAllCharacterDescriptions();
    const toDescription = (char: Character): CharacterDescriptionDto =>
      new CharacterDescriptionDto(char.name);

    return chars.map(toDescription);
  }
  @Query(() => Character)
  async character(@Args('name') name: string) {
    const char = await this.charactersService.findCharacter(name);
    return char;
    // return new Character(char.name, char.moves, char.basicMoves);
  }
}
