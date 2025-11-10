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


// export default pool;





// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/auth"); // <- use 127.0.0.1
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.error(" MongoDB connection error:", error);
//         process.exit(1);
//     }
// }



// // import mongoose from "mongoose";

// // export const connectDB = async () => {
// //     try {
// //         await mongoose.connect("mongodb://localhost:27017/auth");
// //         console.log("MongoDB Connected");
// //     } catch (error) {
// //         console.log(error);
// //         process.exit(1);
// //     }
// // }