import { Schema, model, Document } from 'mongoose';

interface ILogRecord {
    method: string;
    level: 'info' | 'warning' | 'error';
    message: string;
    status_code?: number;
    meta?: Record<string, any>;
}

export interface ILog extends Document {
    _id: Schema.Types.ObjectId;
    service: Schema.Types.ObjectId;
    records: ILogRecord[];
}

const LogRecordSchema = new Schema({
    method: {
        type: String,
        required: true
    },
    status_code : {
        type: Number,
        required: false
    },
    level: {
        type: String,
        enum: ['info', 'warning', 'error'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    meta: {
        type: Schema.Types.Mixed,
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const LogSchema: Schema = new Schema({
    service: { 
        type: Schema.Types.ObjectId, 
        ref: 'Service', 
        required: [true, "Service is required"],
    },
    records: [LogRecordSchema],
}, {
    timestamps: true,
});


export const Log = model<ILog>('Log', LogSchema);