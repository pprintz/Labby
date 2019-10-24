import { Document } from 'mongoose';

export interface Move extends Document {
  command: string[];
  hitLevel: string[];
  damage: string[];
  startUpFrame: string[];
  blockFrame: string;
  hitFrame: string;
  chFrame: string;
  notes: string[];
}

export interface Character extends Document {
  name: string;
  moves: Move[];
}
