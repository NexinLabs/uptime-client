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
    method: string;
    headers: any;
    body: any;
    lastrun: Date;
    endpoints: string[];
}

export interface IService extends Document {
    _id: mongoose.Types.ObjectId;
    status: number;
    owner: mongoose.Types.ObjectId;
    restarter: mongoose.Types.ObjectId;
    report: mongoose.Types.ObjectId;
    perms: number;
    name: string;
    url: string;
    method: string;
    headers: any;
    body: any;
    lastrun: Date;
    endpoints: string[];
}

const ServiceSchema: Schema = new Schema({
    status: { type: Number, required: true, default: 0, },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    restarter: { type: Schema.Types.ObjectId, ref: 'Restarter', required: false, default: null, },
    report: { type: Schema.Types.ObjectId, ref: 'Report', },
    perms: { type: Number, default: 0, },
    name: { type: String, required: false, },
    url: { type: String, required: true, },
    method: { type: String, enum: ['POST', 'GET', 'HEAD'], required: true, default: "HEAD" },
    headers: { type: Schema.Types.Mixed, default: {}, },
    body: { type: Schema.Types.Mixed, default: {}, },
    lastrun: { type: Date, default: Date.now, },
    endpoints: { type: [String], default: [], },
}, {
    timestamps: true,
});

export const Service = mongoose.model<IService>('Service', ServiceSchema);
