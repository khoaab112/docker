const mysql = require("mysql2/promise");
require("dotenv").config();

let db;

async function connectDB() {
    if (!db) {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
    }
    return db;
}

module.exports = { connectDB };