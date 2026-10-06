import express from "express";
import dataMineController from "../modules/dataMine/controller";


const dataMineRoutes = express.Router();

dataMineRoutes.post(
    "/add",
    dataMineController.add
);

dataMineRoutes.get(
    "/:userId",
    dataMineController.retrieve
);

export default dataMineRoutes;