import { Router } from "express";
import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialRouter from "./credentialsRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(cardsRouter);

export default router;