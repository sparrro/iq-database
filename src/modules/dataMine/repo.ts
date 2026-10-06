import mongoose from "mongoose";
import DataMine from "./model";
import { dataMineType } from "../../types";

const dataMineRepo = {

    add: async (data: dataMineType) => {
        return await DataMine.create(data);
    },

    retrieve: async (userId: string) => {
        return await DataMine.findOne({userId});
    }

};

export default dataMineRepo;