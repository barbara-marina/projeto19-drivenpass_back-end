import { Router } from "express";
import credentialController from "../controllers/credentialController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post("/credential/create", tokenMiddleware,
                    validateSchemaMiddleware(credentialSchema), credentialController.create);
credentialRouter.get("/credential/catch", tokenMiddleware, credentialController.catchAll);
credentialRouter.get("/credential/catch/:id", tokenMiddleware, credentialController.catchById);

export default credentialRouter;