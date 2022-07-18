import prisma from "../config/database.js";
import { SecureNote } from "@prisma/client";

async function insert({userId, title, note}: SecureNote) {
    await prisma.secureNote.create({
        data: {
            userId,
            title,
            note
        }
    });
}

async function findByTitleAndId({title, userId}: SecureNote) {
    return prisma.secureNote.findFirst({
        where: {
            title,
            userId
        }
    });
}

async function findAll({userId}: SecureNote) {
    return prisma.secureNote.findMany({
        where: {
            userId
        }
    });
}

async function findById({userId, id}: SecureNote) {
    return prisma.secureNote.findFirst({
        where: {
            userId,
            id
        }
    });
}

async function deleteById({id}: SecureNote) {
    return prisma.secureNote.delete({
        where: {
            id
        }
    });
}

const secureNoteRepository = {
    insert,
    findByTitleAndId,
    findAll,
    findById, 
    deleteById
};
export default secureNoteRepository;