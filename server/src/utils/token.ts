import { appConfig } from '@/config';
import Sanitizer from '@/ext/sanitizer';
import { sign, verify, JwtPayload } from 'jsonwebtoken';


interface TokenPayload {
    _id?: string | null;
    name?: string | null;
    permissions?: number[] | null;
    expireAt?: number | null;
}


export class Token {
    public _id?: string | null;
    public name?: string;
    public expireAt: number;

    constructor(object: TokenPayload) {
        this._id = object._id || null;
        this.name = object.name || 'Guest';
        this.expireAt = appConfig.JWT_EXPIRATION;
    }

    static fromToken(token: string) {
        try {
            const decoded = verify(token, appConfig.JWT_SECRET) as JwtPayload;
            const _id = decoded._id || null;
            const name = String(decoded.name || 'Guest');
            const expireAt = decoded.expireAt || appConfig.JWT_EXPIRATION;

            return new Token({
                _id,
                name,
                expireAt
            });

        } catch (error: any) {
            throw new Error('Invalid token or token expired');
        }
    }

    static isTokenValid(token: string): boolean {
        try {
            verify(token, appConfig.JWT_SECRET);
            return true;
        } catch {
            return false;
        }
    }

    save() {
        return sign(this.toJSON(), appConfig.JWT_SECRET, { expiresIn: this.expireAt });
    }


    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            expireAt: this.expireAt
        };
    }
}


interface UserVerifyLinkPayload {
    name: string;
    email: string;
    password: string;
}


export class UserVerifyLink {
    public name: string | null;
    public password: string | null;
    public email: string | null;

    constructor(obj: UserVerifyLinkPayload) {
        this.name = Sanitizer.html(obj.name || 'Guest');
        this.email = Sanitizer.email(obj.email);
        this.password = obj.password;
    }

    validate(){
        if(!this.email) throw new Error("Email is required");
        if(!this.password) throw new Error("Password is required");
        if(this.password.length < 6) throw new Error("Password must be at least 6 characters long");
        if(!this.name) this.name = 'Guest';
        return true;
    }

    /**Sign the user and return verification token */
    sign() {
        this.validate();
        return sign(this.toJSON(), appConfig.JWT_SECRET, { expiresIn: 10 * 60 * 1000 }); // 10 minutes
    }

    static fromToken(token: string) {
        try {
            const decoded = verify(token, appConfig.JWT_SECRET) as JwtPayload;
            const name = String(decoded.name || 'Guest');
            const email = decoded.email || null;
            const password = decoded.password || null;

            return new UserVerifyLink({
                name,
                email,
                password
            });

        } catch (error: any) {
            // Token verification failed
        }
    }

    toJSON() {
        return {
            name: this.name || 'Guest',
            email: this.email || null,
            password: this.password || null
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }

}