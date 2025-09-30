import mongoose, { Schema, Document } from 'mongoose';

export interface IRestarter extends Document {
  _id: mongoose.Types.ObjectId;
  url: string;
  headers: Record<string, any>;
  body: Record<string, any>;
  lastrun: Date;
  status: boolean;
  error: string;
}

const RestarterSchema: Schema = new Schema({
  url: {
    type: String,
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
  lastrun: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export const Restarter = mongoose.model<IRestarter>('Restarter', RestarterSchema);
