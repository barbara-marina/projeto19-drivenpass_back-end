import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSchemaMiddleware(authSchema));
authRouter.post("/sign-up", validateSchemaMiddleware(authSchema));

export default authRouter;