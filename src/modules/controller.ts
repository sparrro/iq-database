import {
    Request,
    Response
} from "express";
import mongoose from "mongoose";
import resultService from "./services";

const resultController = {

    add: async (req: Request, res: Response) => {

        const { userId, score } = req.body;

        if (!userId || !score) return res.status(400).json({success: false, message: "Missing userId or score"});

        try {
            const result = await resultService.add(userId, score);
            if (result.success) {
                return res.status(201).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({success: false, message: "Server error"});
        };

    },

    retrieve: async (req: Request, res: Response) => {

        const { userId } = req.params;

    }
};

export default resultController;