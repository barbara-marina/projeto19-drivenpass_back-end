import { Router } from "express";
import credentialController from "../controllers/credentialController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post("/credential/create", tokenMiddleware,
                    validateSchemaMiddleware(credentialSchema), credentialController.create);

export default credentialRouter;