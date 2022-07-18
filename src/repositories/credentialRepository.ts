import prisma from "../config/database.js";
import { Credential } from "@prisma/client";

async function insert({userId, label, url, name, password}: Credential) {
    await prisma.credential.create({
        data: {
            userId,
            label,
            url,
            name,
            password
        }
    });
}

async function findByLabelAndId({label, userId}: Credential) {
    return prisma.credential.findFirst({
        where: {
            label,
            userId
        }
    });
}

async function findAll({userId}: Credential) {
    return prisma.credential.findMany({
        where: {
            userId
        }
    });
}

async function findById({userId, id}: Credential) {
    return prisma.credential.findFirst({
        where: {
            userId,
            id
        }
    });
}

async function deleteById({id}: Credential) {
    return prisma.credential.delete({
        where: {
            id
        }
    });
}

const credentialRepository = {
    insert,
    findByLabelAndId,
    findAll,
    findById, 
    deleteById
};
export default credentialRepository;