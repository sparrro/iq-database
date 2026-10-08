import {
    Request,
    Response
} from "express";
import mongoose from "mongoose";
import resultService from "./service";
import { resultType } from "../../types";
import resultRepo from "./repo";
import Joi from "joi";

const resultController = {
    //works
    addFull: async (req: Request, res: Response) => {

        const input = req.body;

        const inputSchema = Joi.object({
            userId: Joi.string().required(),
            verbalScore: Joi.number().required(),
            numericalScore: Joi.number().required(),
            abstractScore: Joi.number().required(),
            generalKnowledge: Joi.number().required(),
            hdi: Joi.number().required(),
            country: Joi.string().required(),
            region: Joi.string().required()
        });
        const { error } = inputSchema.validate(input);
        if (error) return res.status(400).json({ success: false, message: error.message });
        
        try {
            const entry = await resultRepo.retrieve(input.userId);
            if (entry) {
                if (!entry.hdi || !entry.verbalScore || !entry.numericalScore || !entry.abstractScore || !entry.generalKnowledge) {
                    return res.status(403).json({ success: false, message: "As you have already done some subtests you must also do the remaining ones separately of them separately" });
                };
                if (
                    (entry.verbalUpdatedAt && Date.now() - entry.verbalUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.numericalUpdatedAt && Date.now() - entry.numericalUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.abstractUpdatedAt && Date.now() - entry.abstractUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.generalUpdatedAt && Date.now() - entry.generalUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6) ||
                    (entry.hdiUpdatedAt && Date.now() - entry.hdiUpdatedAt < 1000 * 60 * 60 * 24 * 30 * 6)
                ) return res.status(403).json({ success: false, message: "Must wait at least six months before retaking the test" });
                const result = await resultService.updateFull(input);
                return res.status(200).json(result);
            };
            const result = await resultService.addFull(input);
            if (result.success) {
                return res.status(201).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ success: false, message: err.message });
            }
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
        //works
        const input = req.body;

        const inputSchema = Joi.object({
            userId: Joi.string().required(),
            country: Joi.string().required(),
            region: Joi.string().required(),
            hdi: Joi.number().required(),
        });
        const { error } = inputSchema.validate(input);

        if (error) return res.status(400).json({ success: false, message: error.message });

        try {

            const entry = await resultRepo.retrieve(input.userId);
            if (entry) {
                if (entry.hdi && Date.now() - entry.hdiUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.country = input.country;
                    entry.region = input.region;
                    entry.hdi = input.hdi;
                    entry.hdiUpdatedAt = Date.now();
                    const result = await entry.save();  
                    return res.status(200).json({ success: true, message: "Hdi updated", data: result });      
                };
            };

            const result = await resultService.addHdi(input.userId, input.country, input.region, input.hdi);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);

        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ success: false, message: err.message });
            } else return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addVerbal: async (req: Request, res: Response) => {
        //works
        const input = req.body;
        const inputSchema = Joi.object({
            userId: Joi.string().required(),
            verbalScore: Joi.number().required()
        });
        const { error } = inputSchema.validate(input);
        if (error) return res.status(400).json({ success: false, message: "Missing userId or verbalScore" });

        try {

            const entry = await resultRepo.retrieve(input.userId);
            if (entry) {
                if (entry.verbalScore && Date.now() - entry.verbalUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.verbalScore = input.verbalScore;
                    entry.verbalUpdatedAt = Date.now();
                    const updated = await entry.save();   
                    return res.status(200).json({ success: true, message: "Verbal score updated", data: updated });             
                };
            };

            const result = await resultService.addVerbal(input.userId, input.verbalScore);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);

        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ success: false, message: err.message });
            } else return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addNumerical: async (req: Request, res: Response) => {
        //works
        const input = req.body;
        const inputSchema = Joi.object({
            userId: Joi.string().required(),
            numericalScore: Joi.number().required()
        });
        const { error } = inputSchema.validate(input);
        if (error) return res.status(400).json({ success: false, message: error.message });

        try {

            const entry = await resultRepo.retrieve(input.userId);
            if (entry) {
                if (entry.numericalScore && Date.now() - entry.numericalUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.numericalScore = input.numericalScore;
                    entry.numericalUpdatedAt = Date.now();
                    const updated = await entry.save();   
                    return res.status(200).json({ success: true, message: "Numerical score updated", data: updated });             
                };
            };

            const result = await resultService.addNumerical(input.userId, input.numericalScore);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json(err.message);
            } else return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addAbstract: async (req: Request, res: Response) => {
        //works
        const input = req.body;
        const inputSchema = Joi.object({
            userId: Joi.string().required(),
            abstractScore: Joi.number().required()
        });
        const { error } = inputSchema.validate(input);
        if (error) return res.status(400).json({ success: false, message: error.message });

        try {

            const entry = await resultRepo.retrieve(input.userId);
            if (entry) {
                if (entry.abstractScore && Date.now() - entry.abstractUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.abstractScore = input.abstractScore;
                    entry.abstractUpdatedAt = Date.now();
                    const updated = await entry.save();
                    return res.status(200).json({ success: true, message: "Abstract score updated", data: updated });
                };
            };

            const result = await resultService.addAbstract(input.userId, input.abstractScore);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ success: false, message: err.message });
            } else return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    addGeneral: async (req: Request, res: Response) => {
        //works
        const input = req.body;
        const inputSchema = Joi.object({
            userId: Joi.string().required(),
            generalKnowledge: Joi.number().required()
        });
        const { error } = inputSchema.validate(input);
        if (error) return res.status(400).json({ success: false, message: error.message });

        try {

            const entry = await resultRepo.retrieve(input.userId);
            if (entry) {
                if (entry.generalKnowledge && Date.now() - entry.generalUpdatedAt! < 1000 * 60 * 60 * 24 * 30 * 6) {
                    return res.status(403).json({ success: false, message: "You must wait at least six months to redo a test" });
                } else {
                    entry.generalKnowledge = input.generalKnowledge;
                    entry.generalUpdatedAt = Date.now();
                    const updated = await entry.save();
                    return res.status(200).json({ success: true, message: "General knowledge updated", data: updated });                
                };
            };

            const result = await resultService.addGeneral(input.userId, input.generalKnowledge);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ success: false, message: err.message });
            } else return res.status(500).json({ success: false, message: "Server error" });
        };

    },

    retrieve: async (req: Request, res: Response) => {
        //works
        const { userId } = req.params;
        console.log(userId)

        if (!userId || typeof userId != "string") return res.status(400).json({success: false, message: "Missing userId"});

        try {
            const result = await resultService.retrieve(userId);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(404).json(result);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ success: false, message: err.message });
            } else return res.status(500).json({success: false, message: "Server error"});
        };

    }
};

export default resultController;