import mongoose from "mongoose";

const dataMineSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    verbalAnswers: [{
        type: {
            question: {
                type: String
            },
            answer: {
                type: String
            },
            correct: {
                type: Boolean
            },
            difficulty: {
                type: Number,
                unique: true
            }
        }
    }],
    numericalAnswers: [{
        type: {
            question: {
                type: String
            },
            answer: {
                type: String
            },
            correct: {
                type: Boolean
            },
            difficulty: {
                type: Number,
                unique: true
            }
        }
    }],
    abstractAnswers: [{
        type: {
            question: {
                type: String
            },
            answer: {
                type: String
            },
            correct: {
                type: Boolean
            },
            difficulty: {
                type: Number,
                unique: true
            }
        }
    }],
    generalAnswers: [{
        type: {
            question: {
                type: String
            },
            answer: {
                type: String
            },
            correct: {
                type: Boolean
            },
            difficulty: {
                type: Number,
                unique: true
            }
        }
    }]
});

export default mongoose.model("DataMine", dataMineSchema);