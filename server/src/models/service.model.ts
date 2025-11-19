import mongoose, { Schema, Document } from 'mongoose';
import { IMethod } from './method.model';


export interface IService extends Document {
    _id: mongoose.Types.ObjectId;
    status: number; // 0: unknown, 1: up, 2: down
    owner: mongoose.Types.ObjectId;
    restarter: mongoose.Types.ObjectId;
    report: mongoose.Types.ObjectId;
    perms: number;
    name: string;
    url: string;
    method: mongoose.Types.ObjectId | IMethod;
    headers: any;
    body: any;
    delay: number;  // time delay to next check in seconds
    lastrun: Date;
    endpoints: string[];
}

const ServiceSchema: Schema = new Schema({
    status: { type: Number, required: [true, 'Status is required'], default: 0, },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Owner is required'], },
    restarter: { type: Schema.Types.ObjectId, ref: 'Restarter', required: false, default: null, },
    report: { type: Schema.Types.ObjectId, ref: 'Report', },
    perms: { type: Number, default: 0, },
    name: { type: String, required: false, },
    delay : { type: Number, required: true, default: 60, min : 60, max: 3600 },
    url: { type: String, required: [true, 'URL is required'], },
    method: { type: Schema.Types.ObjectId, ref: 'Method', required: [true, 'Method is required'] },
    headers: { type: Schema.Types.Mixed, default: {}, },
    body: { type: Schema.Types.Mixed, default: {}, },
    lastrun: { type: Date, default: Date.now, },
    endpoints: { type: [String], default: [], },
}, {
    timestamps: true,
});

export const Service = mongoose.model<IService>('Service', ServiceSchema);
