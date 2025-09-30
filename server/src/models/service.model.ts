import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  _id: mongoose.Types.ObjectId;
  status: number;
  owner: mongoose.Types.ObjectId;
  restarter: mongoose.Types.ObjectId;
  report: mongoose.Types.ObjectId;
  perms: number;
  name: string;
  url: string;
  method: mongoose.Types.ObjectId;
  lastrun: Date;
  endpoints: string[];
}

const ServiceSchema: Schema = new Schema({
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restarter: {
    type: Schema.Types.ObjectId,
    ref: 'Restarter',
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'Report',
  },
  perms: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  method: {
    type: Schema.Types.ObjectId,
    ref: 'Method',
    required: true,
  },
  lastrun: {
    type: Date,
    default: Date.now,
  },
  endpoints: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

export const Service = mongoose.model<IService>('Service', ServiceSchema);
