import { Request, Response } from "express";
import { Credential } from "@prisma/client";
import credentialService from "../services/credentialsService.js";

async function create(req: Request, res: Response) {
    const credential: Credential = req.body;
    const userId: number = res.locals.userId;

    await credentialService.insert({...credential, userId})

    res.sendStatus(201);
}

const credentialController = {
    create,
};
export default credentialController;