import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CharactersService } from './characters.service';
import { CharacterSchema } from './schemas/characters.schema';
import { CharactersController } from './characters.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
  ],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
