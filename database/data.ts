import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '080379',
    database: process.env.DB_NAME || 'user_auth',
});

pool.on('connect', () => {
    console.log('PostgreSQL connected')
})

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database successfully"))
  .catch(err => console.error("❌ Failed to connect to PostgreSQL:", err));