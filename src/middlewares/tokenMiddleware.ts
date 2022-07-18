import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";
import errorHandler from "./errorMiddleware.js";

export default async function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization: string = req.headers.authorization;
    const token = authorization?.replace("Bearrer ", "").trim();

    if (!token) throw errorHandler.unauthorized();

    jwt.verify(token, process.env.SECRET_JWT, (err, id) => {
        if (err) throw errorHandler.forbidden()
    })

    const session = await authRepository.findToken(token);
    console.log("session: ",session);
    if (!session) throw errorHandler.notFound;

    const user = await authRepository.findUserById(session.id);
    console.log("user: ", user);
    if (!user) throw errorHandler.notFound;

    res.locals.user = user;
    next();
}