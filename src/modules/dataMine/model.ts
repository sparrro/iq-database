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
                type: Number
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
                type: Number
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
                type: Number
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
                type: Number
            }
        }
    }]
});

export default mongoose.model("DataMine", dataMineSchema);