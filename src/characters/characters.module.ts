import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CharactersService } from './characters.service';
import { CharacterSchema } from './schemas/characters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
  ],
  providers: [CharactersService],
})
export class CharactersModule {}
