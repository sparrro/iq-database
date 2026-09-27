import mongoose from "mongoose";
import resultRepo from "./repos";
import { resultType } from "../types";

const resultService = {

    addFull: async (data: resultType) => {
        try {
            const entry = await resultRepo.addFull(data);
            return {success: true, message: "Score added", data: entry};
        } catch (err) {
            if (err instanceof Error) {
                return {success: false, message: err.message};
            } else return {success: false, message: "Unknown error"};
        };
    },

    add: async (userId: string, score: string) => {
        try {
            const entry = await resultRepo.add({userId, score});
            return {success: true, message: "Score added", data: entry}
        } catch (err) {
            if (err instanceof Error) {
                return {success: false, message: err.message}
            } else return {success: false, message: "Unknown error"}
        }
    },

    addHdi: async (userId: string, hdi: number) => {
        try {
            const entry = await resultRepo.addHdi({userId, hdi});
            return { success: true, message: "Hdi added", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, messsage: "Unknown error" };
        };
    },

    retrieve: async (userId: string) => {
        try {
            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                return {success: true, message: "Score retrieved", data: entry}
            } else return {success: false, message: "Score not found"}
            
        } catch (err) {
            if (err instanceof Error) {
                return {success: false, message: err.message}
            } else return {success: false, message: "Unknown error"}
        }

    }

};

export default resultService;