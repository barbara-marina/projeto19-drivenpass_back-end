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

const credentialRepository = {
    insert,
    findByLabelAndId
};
export default credentialRepository;