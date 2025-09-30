import mongoose, { Schema, Document } from 'mongoose';

export interface IMethod extends Document {
  _id: mongoose.Types.ObjectId;
  method: 'POST' | 'GET' | 'HEAD';
  headers: Record<string, any>;
  body: Record<string, any>;
}

const MethodSchema: Schema = new Schema({
  method: {
    type: String,
    enum: ['POST', 'GET', 'HEAD'],
    required: true,
  },
  headers: {
    type: Schema.Types.Mixed,
    default: {},
  },
  body: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

export const Method = mongoose.model<IMethod>('Method', MethodSchema);
