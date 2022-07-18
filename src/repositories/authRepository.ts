import { Session } from "@prisma/client";
import prisma from "./../config/database.js";
import { user } from "./../services/authService.js";

async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

async function findUserById(id: number) {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}

async function insertUser({email, password}: user) {
    await prisma.user.create({
        data: {
            email,
            password
        }
    });
}

async function insertToken({userId, token}: Session) {
    await prisma.session.create({
        data: {
            userId,
            token
        }
    });
}

async function findToken(token: string) {
    return prisma.session.findUnique({
        where: {
            token
        }
    });
}

const authRepository = {
    findUserByEmail,
    findUserById,
    insertUser, 
    insertToken,
    findToken
};
export default authRepository;