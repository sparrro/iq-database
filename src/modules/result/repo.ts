import mongoose from "mongoose";
import Result from "./model";
import { resultType } from "../../types";

const resultRepo = {

    add: async (data: {userId: string, score: string}) => {
        return await Result.create(data);
    },

    addFull: async (data: resultType) => {
        return await Result.create(data);
    },

    updateFull: async (data: resultType) => {
        return await Result.findOneAndUpdate({ userId: data.userId }, data, { new: true });
    },

    addHdi: async (data: {userId: string, country: string, region: string, hdi: number}) => {
        return await Result.create(data);
    },

    addVerbal: async (data: {userId: string, verbalScore: number, verbalUpdatedAt: number}) => {
        return await Result.create(data);
    },

    addNumerical: async (data: {userId: string, numericalScore: number, numericalUpdatedAt: number}) => {
        return await Result.create(data);
    },

    addAbstract: async (data: {userId: string, abstractScore: number, abstractUpdatedAt: number}) => {
        return await Result.create(data);
    },

    addGeneral: async (data: {userId: string, generalKnowledge: number, generalUpdatedAt: number}) => {
        return await Result.create(data);
    },

    retrieve: async (userId: string) => {
        return await Result.findOne({userId: userId})
    }

};

export default resultRepo;