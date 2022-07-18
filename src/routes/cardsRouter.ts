import { Router } from "express";
import cardController from "../controllers/cardsController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import cardSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards/create", tokenMiddleware,
                    validateSchemaMiddleware(cardSchema), cardController.create);
cardsRouter.get("/cards/catch", tokenMiddleware, cardController.catchAll);
cardsRouter.get("/cards/catch/:id", tokenMiddleware, cardController.catchById);
cardsRouter.delete("/cards/delete/:id", tokenMiddleware, cardController.deleteById);

export default cardsRouter;