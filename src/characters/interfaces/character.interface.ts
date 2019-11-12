import { Document } from 'mongoose';

export interface PersistentMove extends Move, Document { }

export interface Move {
  command: string[];
  hitLevel: string[];
  damage: number[];
  startUpFrame: string[];
  blockFrame: string;
  hitFrame: string;
  chFrame: string;
  notes: string[];
}

export interface Character {
  name: string;
  moves: Move[];
  basicMoves: Move[];
}

export interface PersistentCharacter extends Character, Document { }
