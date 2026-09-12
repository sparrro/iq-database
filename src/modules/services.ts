import mongoose from "mongoose";
import resultRepo from "./repos";

const resultService = {

    add: async (userId: string, score: string) => {
        try {
            const entry = await resultRepo.add({userId, score});
            return {success: true, message: "Score added", entry}
        } catch (err) {
            if (err instanceof Error) {
                return {success: false, message: err.message}
            } else return {success: false, message: "Unknown error"}
        }
    },

    retrieve: async (userId: string) => {
        try {
            const entry = await resultRepo.retrieve(userId);
            return {success: true, message: "Score retrieved", entry}
        } catch (err) {
            if (err instanceof Error) {
                return {success: false, message: err.message}
            } else return {success: false, message: "Unknown error"}
        }

    }

};

export default resultService;