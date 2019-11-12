import { Controller, Get, Param, Post } from '@nestjs/common';

import { CharacterDescriptionDto } from './dtos/character-description.dto';
import { CharactersService } from './characters.service';
import { Character } from './interfaces/character.interface';
import { ApiUseTags } from '@nestjs/swagger';
import { CharacterDto } from './dtos/character.dto';

@ApiUseTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @Get()
  async getAllCharacterDescriptions(): Promise<string[]> {
    const chars = await this.charactersService.findAll();
    const toDescription = (char: Character) =>
      char.name;
    return chars.map(toDescription);
  }
  @Get(':name')
  async getCharacter(@Param('name') name: string): Promise<CharacterDto> {
    const char = await this.charactersService.find(name);
    return new CharacterDto(char.name, char.moves);
  }
}
