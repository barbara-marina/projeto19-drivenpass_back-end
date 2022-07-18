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

const authRepository = {
    findUserByEmail,
    findUserById,
    insertUser
};
export default authRepository;