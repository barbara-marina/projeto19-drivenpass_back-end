import { Router } from "express";
import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialRouter from "./credentialsRouter.js";
import secureNotesRouter from "./secureNotesRouter.js";
import wifiRouter from "./wifisRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(cardsRouter);
router.use(secureNotesRouter);
router.use(wifiRouter);

export default router;