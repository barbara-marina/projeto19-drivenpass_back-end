import prisma from "../config/database.js";
import { Card } from "@prisma/client";

async function insert({userId, label, number, name, cvv, expirationDate,
                        password, isVirtual, type}: Card) {
    await prisma.card.create({
        data: {
            userId,
            label,
            number,
            name,
            cvv, 
            expirationDate,
            password,
            isVirtual, 
            type
        }
    });
}

async function findByLabelAndId({label, userId}: Card) {
    return prisma.card.findFirst({
        where: {
            label,
            userId
        }
    });
}

async function findAll({userId}: Card) {
    return prisma.card.findMany({
        where: {
            userId
        }
    });
}

async function findById({userId, id}: Card) {
    return prisma.card.findFirst({
        where: {
            userId,
            id
        }
    });
}

async function deleteById({id}: Card) {
    return prisma.card.delete({
        where: {
            id
        }
    });
}

const cardRepository = {
    insert,
    findByLabelAndId,
    findAll,
    findById, 
    deleteById
};
export default cardRepository;