import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  avatar: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const User = mongoose.model<IUser>('User', UserSchema);
