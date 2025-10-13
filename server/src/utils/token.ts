import { appConfig } from '@/config';
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
    phone: number;
}


export class UserVerifyLink {
    public name: string | null;
    public password: string | null;
    public email: string | null;
    public phone: number | null;

    constructor(obj: UserVerifyLinkPayload) {
        this.name = obj.name || 'Guest';
        this.email = obj.email;
        this.password = obj.password;
        this.phone = obj.phone;
    }

    sign() {
        return sign(this.toJSON(), appConfig.JWT_SECRET, { expiresIn: 10 * 60 * 1000 }); // 10 minutes
    }

    static fromToken(token: string) {
        try {
            const decoded = verify(token, appConfig.JWT_SECRET) as JwtPayload;
            const name = String(decoded.name || 'Guest');
            const email = decoded.email || null;
            const password = decoded.password || null;
            const phone = decoded.phone || null;

            return new UserVerifyLink({
                name,
                email,
                password,
                phone
            });

        } catch (error: any) {
            // Token verification failed
        }
    }

    toJSON() {
        return {
            name: this.name || 'Guest',
            email: this.email || null,
            password: this.password || null,
            phone: this.phone || null
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }

}