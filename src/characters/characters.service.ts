import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Character } from './entities/character';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character)
    private readonly characterModel: ReturnModelType<typeof Character>,
  ) {}

  async findAllCharacters(): Promise<Character[]> {
    return await this.characterModel.find().exec();
  }
  async findAllCharacterDescriptions(): Promise<Character[]> {
    return await this.characterModel
      .find()
      .select('name')
      .exec();
  }
  async findCharacter(charName: string): Promise<Character> {
    return await this.characterModel.findOne({ name: charName }).exec();
  }
}
