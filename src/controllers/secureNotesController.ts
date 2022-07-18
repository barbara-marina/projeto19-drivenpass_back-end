import { Request, Response } from "express";
import { SecureNote } from "@prisma/client";
import secureNoteService from "../services/secureNotesService.js";

async function create(req: Request, res: Response) {
    const secureNote: SecureNote = req.body;
    const userId: number = res.locals.userId;

    await secureNoteService.insert({...secureNote, userId})

    res.sendStatus(201);
}

async function catchAll(req: Request, res: Response) {
    const userId: number = res.locals.userId;

    const secureNotes = await secureNoteService.findAll(userId);

    res.status(201).send(secureNotes);
}

async function catchById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    const secureNote = await secureNoteService.findById(userId, parseInt(id));

    res.status(201).send(secureNote);
}

async function deleteById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    await secureNoteService.deleteById(userId, parseInt(id));

    res.sendStatus(200);
}

const secureNoteController = {
    create,
    catchAll,
    catchById, 
    deleteById
};
export default secureNoteController;