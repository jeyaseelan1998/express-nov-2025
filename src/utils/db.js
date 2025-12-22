import mongoose from "mongoose";

import { MONGO_URI, MONGO_DB_NAME } from "./config.js";

export default async function connectDatabase() {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: MONGO_DB_NAME,
        });
        console.log("\n>> MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}