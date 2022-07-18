import { Router } from "express";
import secureNotesController from "../controllers/secureNotesController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";

const secureNotesRouter = Router();

secureNotesRouter.post("/secureNotes/create", tokenMiddleware,
                    validateSchemaMiddleware(secureNoteSchema), secureNotesController.create);
secureNotesRouter.get("/secureNotes/catch", tokenMiddleware, secureNotesController.catchAll);
secureNotesRouter.get("/secureNotes/catch/:id", tokenMiddleware, secureNotesController.catchById);
secureNotesRouter.delete("/secureNotes/delete/:id", tokenMiddleware, secureNotesController.deleteById);

export default secureNotesRouter;