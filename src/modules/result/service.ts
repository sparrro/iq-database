import mongoose from "mongoose";
import resultRepo from "./repo";
import { resultType } from "../../types";

const resultService = {

    addFull: async (data: resultType) => {
        try {
            const currentTime = Date.now();
            const entry = await resultRepo.addFull({
                ...data,
                verbalUpdatedAt: currentTime,
                numericalUpdatedAt: currentTime,
                abstractUpdatedAt: currentTime,
                generalUpdatedAt: currentTime,
                hdiUpdatedAt: currentTime
            });
            return {success: true, message: "Score added", data: entry};
        } catch (err) {
            if (err instanceof Error) {
                return {success: false, message: err.message};
            } else return {success: false, message: "Unknown error"};
        };
    },

    updateFull: async (data: resultType) => {
        try {
            const currentTime = Date.now();
            const entry = await resultRepo.updateFull({
                ...data,
                verbalUpdatedAt: currentTime,
                numericalUpdatedAt: currentTime,
                abstractUpdatedAt: currentTime,
                generalUpdatedAt: currentTime,
                hdiUpdatedAt: currentTime
            });
            return { success: true, message: "Score updated", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
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

    addHdi: async (userId: string, country: string, region: string, hdi: number) => {
        try {
            const entry = await resultRepo.addHdi({userId, hdi, country, region, hdiUpdatedAt: Date.now()});
            return { success: true, message: "Hdi added", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, messsage: "Unknown error" };
        };
    },

    addVerbal: async (userId: string, verbalScore: number) => {
        try {
            const entry = await resultRepo.addVerbal({ userId, verbalScore, verbalUpdatedAt: Date.now() });
            return { success: true, message: "Verbal score added", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
        };
    },

    addNumerical: async (userId: string, numericalScore: number) => {
        try {
            const entry = await resultRepo.addNumerical({ userId, numericalScore, numericalUpdatedAt: Date.now() });
            return { success: true, message: "Numerical score added", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
        };
    },

    addAbstract: async (userId: string, abstractScore: number) => {
        try {
            const entry = await resultRepo.addAbstract({ userId, abstractScore, abstractUpdatedAt: Date.now() });
            return { success: true, message: "Abstract score added", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
        };
    },

    addGeneral: async (userId: string, generalKnowledge: number) => {
        try {
            const entry = await resultRepo.addGeneral({ userId, generalKnowledge, generalUpdatedAt: Date.now() });
            return { success: true, message: "General knowledge updated", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
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