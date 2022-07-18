import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import errorHandler from "../middlewares/errorMiddleware.js";
import authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";

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

async function decryptPassword(password: string, userPassword: string) {
    const hash = bcrypt.compareSync(password, userPassword)
    return hash;
}

async function tokenCreater(id: number) {
    const token = jwt.sign({id}, process.env.SECRET_JWT, {expiresIn: '2'})
    return token
}

async function login({email, password}: User) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) throw errorHandler.unauthorized();

    const hash = await decryptPassword(password, user.password);
    
    if (!hash) throw errorHandler.unauthorized();

    const token = await tokenCreater(user.id);
    console.log(token);
    await authRepository.insertToken({userId: user.id, token});
    return token;
}

const authService = {
    insertNewUser,
    login
};
export default authService;