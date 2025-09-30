import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  _id: mongoose.Types.ObjectId;
  status: string;
  lastrun: Date;
  conclusion: string;
  lastweek: Record<string, any>;
}

const ReportSchema: Schema = new Schema({
  status: {
    type: String,
    required: true,
  },
  lastrun: {
    type: Date,
    default: Date.now,
  },
  conclusion: {
    type: String,
    required: true,
  },
  lastweek: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

export const Report = mongoose.model<IReport>('Report', ReportSchema);
