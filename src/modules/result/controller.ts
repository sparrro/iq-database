import {
    Request,
    Response
} from "express";
import mongoose from "mongoose";
import resultService from "./service";
import { resultType } from "../../types";
import resultRepo from "./repo";

const resultController = {

    addFull: async (req: Request, res: Response) => {

        const {
            userId,
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
            verbalScore,
            numericalScore,
            abstractScore,
            generalKnowledge,
            hdi,
            country,
            region
        }

        try {
            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                if (!entry.hdi || !entry.verbalScore || !entry.numericalScore || !entry.abstractScore || !entry.generalKnowledge) {
                    return res.status(403).json({ success: false, message: "As you have already done some subtests separately you must do each of them separately" });
                };
                if (
                    (entry.verbalUpdatedAt && Date.now() - entry.verbalUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.numericalUpdatedAt && Date.now() - entry.numericalUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.abstractedUpdatedAt && Date.now() - entry.abstractedUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.generalUpdatedAt && Date.now() - entry.generalUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.hdiUpdatedAt && Date.now() - entry.hdiUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6)
                ) return res.status(403).json({ success: false, message: "Must wait at least six months before retaking the test" });
                const result = await resultService.updateFull(data);
            };
            const result = await resultService.addFull(data);
            if (result.success) {
                return res.status(201).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({success: false, message: "Server error"});
        };


    },

    add: async (req: Request, res: Response) => { //deprecated

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

        const { userId, country, region, hdi } = req.body;

        if (!userId || !hdi) return res.status(400).json({ success: false, message: "Missing userId or hdi" });

        try {

            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                if (entry.hdi && Date.now() - entry.hdiUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.hdi = hdi;
                    entry.hdiUpdatedAt = Date.now();
                    entry.save();  
                    return res.status(200).json({ success: true, message: "Hdi updated", data: entry });      
                };
            };

            const result = await resultService.addHdi(userId, country, region, hdi);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);

        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addVerbal: async (req: Request, res: Response) => {
        
        const {userId, verbalScore} = req.body;

        if (!userId || !verbalScore) return res.status(400).json({ success: false, message: "Missing userId or verbalScore" });

        try {

            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                if (entry.verbalScore && Date.now() - entry.verbalUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.verbalScore = verbalScore;
                    entry.verbalUpdatedAt = Date.now();
                    const updated = entry.save();   
                    return res.status(200).json({ success: true, message: "Verbal score updated", data: updated });             
                };
            };

            const result = await resultService.addVerbal(userId, verbalScore);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);

        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addNumerical: async (req: Request, res: Response) => {

        const {userId, numericalScore} = req.body;

        if (!userId || !numericalScore) return res.status(400).json({ success: false, message: "Missing userId or numericalScore" });

        try {

            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                if (entry.numericalScore && Date.now() - entry.numericalUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.numericalScore = numericalScore;
                    entry.numericalUpdatedAt = Date.now();
                    const updated = entry.save();   
                    return res.status(200).json({ success: true, message: "Numerical score updated", data: updated });             
                };
            };

            const result = await resultService.addNumerical(userId, numericalScore);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addAbstract: async (req: Request, res: Response) => {

        const {userId, abstractScore} = req.body;

        if (!userId || !abstractScore) return res.status(400).json({ success: false, message: "Missing userId or abstractScore" });

        try {

            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                if (entry.abstractScore && Date.now() - entry.abstractedUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.abstractScore = abstractScore;
                    entry.abstractedUpdatedAt = Date.now();
                    entry.save();
                    return res.status(200).json({ success: true, message: "Abstract score updated", data: entry });
                };
            };

            const result = await resultService.addAbstract(userId, abstractScore);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addGeneral: async (req: Request, res: Response) => {

        const {userId, generalKnowledge} = req.body;

        if (!userId || !generalKnowledge) return res.status(400).json({ success: false, message: "Missing userId or generalKnowledge" });

        try {

            const entry = await resultRepo.retrieve(userId);
            if (entry) {
                if (entry.generalKnowledge && Date.now() - entry.generalUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.generalKnowledge = generalKnowledge;
                    entry.generalUpdatedAt = Date.now();
                    entry.save();
                    return res.status(200).json({ success: true, message: "General knowledge updated", data: entry });                
                };
            };

            const result = await resultService.addGeneral(userId, generalKnowledge);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        };

    },

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