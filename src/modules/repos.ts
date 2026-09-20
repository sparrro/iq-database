import mongoose from "mongoose";
import Result from "./models";

const resultRepo = {

    add: async (data: {userId: string, score: string}) => {
        return await Result.create(data);
    },

    addHdi: async (data: {userId: string, hdi: number}) => {
        return await Result.create({...data, score: 100});
    },

    retrieve: async (userId: string) => {
        return await Result.findOne({userId: userId})
    }

};

export default resultRepo;