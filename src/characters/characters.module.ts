import { Module } from '@nestjs/common';

import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Character } from './entities/character';

@Module({
  imports: [TypegooseModule.forFeature([Character])],
  providers: [CharactersService, CharactersResolver],
})
export class CharactersModule {}
