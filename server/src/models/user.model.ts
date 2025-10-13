import mongoose, { Schema, Document } from 'mongoose';


interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatar?: string;
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
    avatar: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

export const User = mongoose.model('User', UserSchema);
export default User;
