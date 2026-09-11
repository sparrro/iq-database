import dotenv from "dotenv";

dotenv.config();

const {
    DB_URI
} = process.env;

if (
    !DB_URI
) throw new Error("Missing environment variable(s)");

export {
    DB_URI
};