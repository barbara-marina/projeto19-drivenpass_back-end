import Cryptr from "cryptr";
import { SecureNote } from "@prisma/client";
import secureNoteRepository from "../repositories/secureNotesRepository.js";
import errorHandler from "../middlewares/errorMiddleware.js";

async function insert(secureNote: SecureNote) {
    await existingTitle(secureNote.title, secureNote.userId);
    await secureNoteRepository.insert(secureNote);
}

async function existingTitle(title: string, userId: number) {
    const existingConfict = await secureNoteRepository.findByTitleAndId({title, userId});

    if(existingConfict) throw errorHandler.conflict();
}

async function findAll(userId: number) {
    const secureNotes: SecureNote[] = await secureNoteRepository.findAll({userId});

    return secureNotes;
}

async function findById(userId: number, id: number) {
    const secureNote: SecureNote = await secureNoteRepository.findById({userId, id});
    if (!secureNote) throw errorHandler.unauthorized();
    await checkId(userId, secureNote.userId);
    
    
    return secureNote;
}

async function checkId(userId: number, secureNoteUserId: number) {
    if (userId !== secureNoteUserId) throw errorHandler.unauthorized();
}

async function deleteById(userId: number, id: number) {
    const secureNote: SecureNote = await secureNoteRepository.findById({userId, id});
    if (!secureNote) throw errorHandler.unauthorized();
    
    await checkId(userId, secureNote.userId);
    
    await secureNoteRepository.deleteById({id});
}

const secureNoteService = {
    insert, 
    findAll, 
    findById, 
    deleteById
}
export default secureNoteService;