import { Router } from "express";
import wifiController from "../controllers/wifisController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi/create", tokenMiddleware,
                    validateSchemaMiddleware(wifiSchema), wifiController.create);
wifiRouter.get("/wifi/catch", tokenMiddleware, wifiController.catchAll);
wifiRouter.get("/wifi/catch/:id", tokenMiddleware, wifiController.catchById);
wifiRouter.delete("/wifi/delete/:id", tokenMiddleware, wifiController.deleteById);

export default wifiRouter;