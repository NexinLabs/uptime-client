
export const appConfig = {
    port: Number(process.env.PORT) || 8000,
    endpoint : process.env.ENDPOINT || "https://api.uptimeclient.tech",
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/uptimeclient",
    JWT_EXPIRATION : Number(process.env.JWT_EXPIRATION || 921600), // 10 days in seconds
    JWT_SECRET : process.env.JWT_SECRET || "your_jwt_secret_key",
    DC_WEBHOOK_B64 : process.env.DC_WEBHOOK_B64 || "",
    production : process.env.NODE_ENV !== "development"
}



export const ALLOWED = {
    origin: process.env.ALLOWED_ORIGIN?.split(',') || ['https://uptimeclient.tech', 'https://www.uptimeclient.tech', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

export const emailConfig = {
    creds : 
    {
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use STARTTLS
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        }
    },
    from : {
        support : String(process.env.SUPPORT_EMAIL),
    }
};


export const oauthConfig = {
    google: {
        client_id: process.env.G_CLIENT_ID,
        client_secret: process.env.G_CLIENT_SECRET,
        token_url: `https://oauth2.googleapis.com/token`,
        user_profile : "https://www.googleapis.com/oauth2/v3/userinfo",
        redirect_uris: [ 
            appConfig.endpoint + "/auth/callback/google"
        ] 
    },
}


export const debug = {
    logLevel : Number(process.env.DEBUG_LOG_LEVEL || 1), //0 : debug, 1 : info, 2 : warn, 3 : error, 4 : fatal
    controllerError :  true,
}