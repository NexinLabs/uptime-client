




export const appConfig = {
    port: Number(process.env.PORT) || 8080,
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/uptimeclient",
}



export const googleCreds = {
    client_id : process.env.GOOGLE_CLIENT_ID,
    client_secret : process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris : process.env.GOOGLE_REDIRECT_URIS,
    token_url : process.env.GOOGLE_TOKEN_URL
}
