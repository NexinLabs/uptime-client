import bcrypt from 'bcrypt';



export default class Helper {
    static async hashPassword(password: string): Promise<string> {
        const salt_key = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt_key);
    }


    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}