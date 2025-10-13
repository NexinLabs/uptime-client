




export const appConfig = {
    port: Number(process.env.PORT) || 8080,
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/uptimeclient",
    JWT_EXPIRATION : Number(process.env.JWT_EXPIRATION || 921600), // 10 days in seconds
    JWT_SECRET : process.env.JWT_SECRET || "your_jwt_secret_key"
}



export const googleCreds = {
    client_id : process.env.GOOGLE_CLIENT_ID,
    client_secret : process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris : process.env.GOOGLE_REDIRECT_URIS,
    token_url : process.env.GOOGLE_TOKEN_URL
}


export const ALLOWED = {
    origin: [process.env.ALLOWED_ORIGIN || 'https://uptimeclient.tech'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}