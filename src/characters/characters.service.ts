import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Character,
  PersistentCharacter,
} from './interfaces/character.interface';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel('Character')
    private readonly characterModel: Model<PersistentCharacter>,
  ) {}

  async findAll(): Promise<Character[]> {
    return await this.characterModel.find().exec();
  }
  async find(charName: string): Promise<Character> {
    return await this.characterModel.findOne({ name: charName }).exec();
  }
}
