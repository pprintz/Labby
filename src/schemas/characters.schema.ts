import * as mongoose from 'mongoose';

const MoveSchema = new mongoose.Schema({
  command: [String],
  hitLevel: [String],
  damage: [Number],
  startUpFrame: [String],
  blockFrame: String,
  hitFrame: String,
  chFrame: String,
  notes: [String],
});

export const CharacterSchema = new mongoose.Schema({
  name: String,
  moves: [MoveSchema],
});
