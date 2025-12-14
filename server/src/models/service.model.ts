import { ILog , Log as LogModel} from './logs.model';
import mongoose, { Schema, Document } from 'mongoose';


export interface IService extends Document {
    _id: mongoose.Types.ObjectId;
    status: number; // 0: unknown, 1: up, 2: down
    owner: mongoose.Types.ObjectId;
    restarter: mongoose.Types.ObjectId;
    report: mongoose.Types.ObjectId;
    perms: number;
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'HEAD';
    headers: any;
    body: any;
    delay: number;  // time delay to next check in seconds
    lastrun: Date;
    endpoints: string[];
    log: ILog;
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
    method: { type: String, enum: ['GET', 'POST', 'HEAD'], required: [true, 'Method is required'], default: 'HEAD' },
    headers: { type: Schema.Types.Mixed, default: {}, },
    body: { type: Schema.Types.Mixed, default: {}, },
    lastrun: { type: Date, default: Date.now, },
    endpoints: { type: [String], default: [], },
    log: { type: Schema.Types.ObjectId, ref: 'Log', required: false, default: null, },
}, {
    timestamps: true,
});

export const Service = mongoose.model<IService>('Service', ServiceSchema);


// create a log when service is saved
ServiceSchema.pre('save', function (next) {
    if(!this.log){
        const _log = new LogModel({
            user: this.owner,
            service: this._id,
        });
        _log.save();
        this.log = _log._id;
    }
    next();
})

ServiceSchema
