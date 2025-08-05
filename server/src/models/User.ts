import { Collection, ObjectId} from "mongodb";
import {db} from "@/utils/db"

interface UserData {
    _id: ObjectId;
    services: Array<string>;
    tokens: string;
}

/**
 * Represents a user in the system
 * @class User
 * @property {ObjectId} _id - The unique identifier for the user
 * @method save - Saves the user to the database
 * @method findOne - Finds a user by their ID
 */
export class User {
    _id: ObjectId;
    protected static _col: Collection = db.collection("users");

    constructor(obj: UserData | User) {
        this._id = obj._id;
    }

    public async save() {
        await User._col.insertOne(this);
    }

    public static async findOne(_id: ObjectId) {
        const user = await User._col.findOne({ _id: _id }) as UserData | null;
        if (user) {
            return new User(user);
        }
        return null;
    }
}