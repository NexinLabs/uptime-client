import mongoose, { Schema, Document } from 'mongoose';
import { Token } from '@/utils/token';


const notificationSchema: Schema = new Schema({
    email : {
        type: Boolean,
        default: false,
    },
    sms : {
        type: Boolean,
        default: false,
    },
    push : {
        type: Boolean,
        default: false,
    },
});


interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    token: string;
    password: string;
    avatar?: string;
    notification: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
}



const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
            "Please Provide a valid Email address",
        ],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },
    
    token : {
        type: String,
        required: [true, "Token is required"],
    },

    avatar: {
        type: String,
        required: false,
    },

    notification : notificationSchema,
}, {
    timestamps: true,
});

export const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        // Generate a new token (assuming a generateToken function is defined elsewhere)
        this.token = new Token({ _id: this._id.toString(), name: this.name }).save();
    }
    next();
});
export default User;
