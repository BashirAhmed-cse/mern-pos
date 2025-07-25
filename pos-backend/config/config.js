require("dotenv").config();


const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    nodeEnv: process.env.NODE_ENV || "development",
    accessTokenSecret: process.env.JWT_SECRET,
    sslcommerzKeyId: process.env.store_id,
    sslcommerzSecretKey: process.env.store_passwd

});

module.exports = config;