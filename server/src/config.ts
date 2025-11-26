
export const appConfig = {
    port: Number(process.env.PORT) || 8080,
    endpoint : process.env.ENDPOINT || "https://api.uptimeclient.tech",
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/uptimeclient",
    JWT_EXPIRATION : Number(process.env.JWT_EXPIRATION || 921600), // 10 days in seconds
    JWT_SECRET : process.env.JWT_SECRET || "your_jwt_secret_key",
    DC_WEBHOOK_B64 : process.env.DC_WEBHOOK_B64 || "",
}



export const ALLOWED = {
    origin: process.env.ALLOWED_ORIGIN || 'https://uptimeclient.tech',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

export const emailConfig = {
    creds : 
    {
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    },
    from : {
        support : String(process.env.SUPPORT_EMAIL),
    }
};


export const debug = {
    controllerError : true
}