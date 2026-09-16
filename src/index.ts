import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DB_URI, PORT } from "./config/environment";
import resultRoutes from "./routes/resultRoutes";

const app = express();

app.use(cors({origin: "*", optionsSuccessStatus: 200}));
app.use(express.json());

app.use("/results", resultRoutes);

const connectToDb = () => {
    if (!DB_URI) return;
    mongoose.connect(DB_URI);

    mongoose.connection.once("open", () => {
        console.log("Connected to database");
        app.listen(Number(PORT), "0.0.0.0", () => {
            console.log("Server running");
        });
    });
};

connectToDb();