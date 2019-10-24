import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character } from './interfaces/character.interface';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel('Character') private readonly characterModel: Model<Character>,
  ) {}

  async findAll(): Promise<Character[]> {
    return await this.characterModel.find().exec();
  }
  async find(charName: string): Promise<Character> {
    // await this.characterModel.create({
    //   name: 'steve',
    //   moves: [
    //     {
    //       command: ['1', '2', '1'],
    //       hitLevel: ['h', 'h', 'h'],
    //       damage: [7, 10, 15],
    //       startUpFrame: ['10'],
    //       blockFrame: -3,
    //       hitFrame: +3,
    //       chFrame: +3,
    //     },
    //   ],
    // });
    return await this.characterModel.findOne({ name: charName }).exec();
  }
}
