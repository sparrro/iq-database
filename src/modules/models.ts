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
    },
    verbalUpdatedAt: {
        type: Number,
    },
    numericalScore: {
        type: Number,
    },
    numericalUpdatedAt: {
        type: Number
    },
    abstractScore: {
        type: Number,
    },
    abstractedUpdatedAt: {
        type: Number
    },
    generalKnowledge: {
        type: Number,
    },
    generalUpdatedAt: {
        type: Number
    },
    hdi: {
        type: Number,
    },
    hdiUpdatedAt: {
        type: Number
    },
    country: {
        type: String,
    },
    region: {
        type: String,
    }
});

export default mongoose.model("Result", resultSchema);