import {
    Request,
    Response
} from "express";
import mongoose from "mongoose";
import resultService from "./services";
import { resultType } from "../types";

const resultController = {

    addFull: async (req: Request, res: Response) => {

        const {
            userId,
            score,
            verbalScore,
            numericalScore,
            abstractScore,
            generalKnowledge,
            hdi,
            country,
            region
        } = req.body;

        if (
            !userId ||
            !score ||
            !verbalScore ||
            !numericalScore ||
            !abstractScore ||
            !generalKnowledge ||
            !hdi ||
            !country ||
            !region
        ) return res.status(400).json({success: false, message: "Missing input data"});

        const data: resultType = {
            userId,
            score,
            verbalScore,
            numericalScore,
            abstractScore,
            generalKnowledge,
            hdi,
            country,
            region
        }

        try {
            const result = await resultService.addFull(data);
            if (result.success) {
                return res.status(201).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({success: false, message: "Server error"});
        };


    },

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

    addHdi: async (req: Request, res: Response) => {

        const { userId, hdi } = req.body;

        if (!userId || !hdi) return res.status(400).json({ success: false, message: "Missing userId or hdi" });

        try {
            const result = await resultService.addHdi(userId, hdi);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addVerbal: async (req: Request, res: Response) => {},

    addNumerical: async (req: Request, res: Response) => {},

    addAbstract: async (req: Request, res: Response) => {},

    addGeneral: async (req: Request, res: Response) => {},

    retrieve: async (req: Request, res: Response) => {

        const { userId } = req.params;

        if (!userId || typeof userId != "string") return res.status(400).json({success: false, message: "Missing userId"})

        try {
            const result = await resultService.retrieve(userId);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(404).json(result);
        } catch (err) {
            return res.status(500).json({success: false, message: "Server error"});
        };

    }
};

export default resultController;