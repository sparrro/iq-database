import {
    Request,
    Response
} from "express";
import dataMineService from "./service";
import dataMineRepo from "./repo";
import { dataMineType } from "../../types";

const dataMineController  = {

    add: async (req: Request, res: Response) => {

        const {
            userId,
            verbalAnswers,
            numericalAnswers,
            abstractAnswers,
            generalAnswers
        } = req.body;

        if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

        try {

            const entry = await dataMineRepo.retrieve(userId);

            if (entry) {
                if (verbalAnswers) entry.verbalAnswers = verbalAnswers;
                if (numericalAnswers) entry.numericalAnswers = numericalAnswers;
                if (abstractAnswers) entry.abstractAnswers = abstractAnswers;
                if (generalAnswers) entry.generalAnswers = generalAnswers;
                const updated = await entry.save();
                return res.status(200).json({ success: true, message: "Answers updated", data: updated });
            };

            const newEntry: dataMineType = { ...req.body };
            const result = await dataMineService.add(newEntry);
            if (result.success) {
                return res.status(201).json(result);
            } else return res.status(400).json(result);

        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        }

    },

    retrieve: async (req: Request, res: Response) => {

        const { userId } = req.body;

        if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

        try {
            const result = await dataMineService.retrieve(userId);
            if (result.success) {
                return res.status(200).json(result);
            } else return res.status(400).json(result);
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }

};

export default dataMineController;