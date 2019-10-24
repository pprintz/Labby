import * as mongoose from 'mongoose';

const MoveSchema = new mongoose.Schema(
  {
    command: [String],
    hitLevel: [String],
    damage: [Number],
    startUpFrame: [String],
    blockFrame: Number,
    hitFrame: Number,
    chFrame: Number,
    notes: [String],
  },
  { _id: false },
);

export const CharacterSchema = new mongoose.Schema({
  name: String,
  moves: [MoveSchema],
});
