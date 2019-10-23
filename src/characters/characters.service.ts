import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character } from './interfaces/character.interface';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel('Character') private readonly catModel: Model<Character>,
  ) {}

  async findAll(): Promise<Character[]> {
    return await this.catModel.find().exec();
  }
}
