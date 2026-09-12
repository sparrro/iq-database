import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: String,
        required: true,
        validate: {
            validator: (s: string) => /^\d{1,3}$/.test(s) && Number(s) <= 200,
            message: "Score must be a number between 0 and 200"
        }
    }
});

export default mongoose.model("Result", resultSchema);