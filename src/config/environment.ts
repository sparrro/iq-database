import dotenv from "dotenv";

dotenv.config();

let {
    DB_URI,
    PORT
} = process.env;

if (
    !DB_URI
) throw new Error("Missing environment variable(s)");

if (!PORT) {
    PORT = "3000"
}

export {
    DB_URI,
    PORT
};