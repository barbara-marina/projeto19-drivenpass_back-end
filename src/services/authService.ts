import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import errorHandler from "../middlewares/errorMiddleware.js";
import authRepository from "../repositories/authRepository.js";

export type user = User;

async function insertNewUser({email, password}: User) {
    const existingEmail = await authRepository.findUserByEmail(email);
    if (existingEmail) throw errorHandler.conflict();

    password = await encryptPassword(password);

    await authRepository.insertUser({email, password})
}

async function encryptPassword(password: string) {
    const hash = bcrypt.hashSync(password, Number(process.env.SECRET_BCRYPT))
    return hash;
}

async function login({email, password}: User) {
    
}

const authService = {
    insertNewUser
};
export default authService;