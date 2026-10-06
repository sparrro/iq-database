import mongoose from "mongoose";
import dataMineRepo from "./repo";
import { dataMineType } from "../../types";

const dataMineService = {

    add: async (data: dataMineType) => {
        try {
            const entry = await dataMineRepo.add(data);
            return { success: true, message: "Answers added", data: entry };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
        };
    },

    retrieve: async (userId: string) => {
        try {
            const entry = await dataMineRepo.retrieve(userId);
            if (entry) {
                return { success: true, message: "Answers retrieved", data: entry };
            } else return { success: false, message: "Answers not found" };
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, message: err.message };
            } else return { success: false, message: "Unknown error" };
        };
    }
};

export default dataMineService;