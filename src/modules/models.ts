import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: String,
        validate: {
            validator: (s: string) => /^\d{1,3}$/.test(s) && Number(s) <= 200,
            message: "Score must be a number between 0 and 200"
        }
    },
    verbalScore: {
        type: Number,
        required: true
    },
    numericalScore: {
        type: Number,
        required: true
    },
    abstractScore: {
        type: Number,
        required: true
    },
    generalKnowledge: {
        type: Number,
        required: true
    },
    hdi: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

export default mongoose.model("Result", resultSchema);