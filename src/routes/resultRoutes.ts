import express from "express";
import resultController from "../modules/controller";

const resultRoutes = express.Router();

resultRoutes.post(
    "/add",
    resultController.addFull
);

resultRoutes.post(
    "/hdi",
    resultController.addHdi
);

resultRoutes.get(
    "/:userId",
    resultController.retrieve
);

export default resultRoutes;