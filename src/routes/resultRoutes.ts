import express from "express";
import resultController from "../modules/result/controller";

const resultRoutes = express.Router();

resultRoutes.post(
    "/add",
    resultController.addFull
);

resultRoutes.post(
    "/hdi",
    resultController.addHdi
);

resultRoutes.post(
    "/verbal",
    resultController.addVerbal
);

resultRoutes.post(
    "/numerical",
    resultController.addNumerical
);

resultRoutes.post(
    "/abstract",
    resultController.addAbstract
);

resultRoutes.post(
    "/general",
    resultController.addGeneral
);

resultRoutes.get(
    "/:userId",
    resultController.retrieve
);

export default resultRoutes;