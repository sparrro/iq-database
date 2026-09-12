import mongoose from "mongoose";
import Result from "./models";

const resultRepo = {

    add: async (data: {userId: string, score: string}) => {
        return await Result.create(data);
    },

    retrieve: async (userId: string) => {
        return await Result.findOne({userId: userId})
    }

};

export default resultRepo;