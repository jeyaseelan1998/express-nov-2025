import { config } from "dotenv";
import { isDebugEnabled } from "./logger.js";

config({
    debug: isDebugEnabled(),
});

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;
export const JWT_SECRET = process.env.JWT_SECRET;