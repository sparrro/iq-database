import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DB_URI } from "./config/environment";
import resultRoutes from "./routes/resultRoutes";

const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(cors({origin: "*", optionsSuccessStatus: 200}));
app.use(express.json());

app.use("/results", resultRoutes);

app.get("/", (req, res) => {
    res.send("Api is working")
})

const connectToDb = () => {
    if (!DB_URI) return;
    mongoose.connect(DB_URI);

    mongoose.connection.once("open", () => {
        console.log("Connected to database");
        app.listen(port, "0.0.0.0", () => {
            console.log("Server running");
        });
    });
};

connectToDb();