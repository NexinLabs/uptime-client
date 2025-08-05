import dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT) || 8080;
export const MONGO_URI : string = process.env.MONGO_URI || "";
export const DB_NAME : string = process.env.DB_NAME || "";

export const googleCreds = {
    client_id : process.env.GOOGLE_CLIENT_ID,
    client_secret : process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris : process.env.GOOGLE_REDIRECT_URIS,
    token_url : process.env.GOOGLE_TOKEN_URL
}
