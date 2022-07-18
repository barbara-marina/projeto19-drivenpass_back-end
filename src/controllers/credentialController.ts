import { Request, Response } from "express";
import { Credential } from "@prisma/client";
import credentialService from "../services/credentialsService.js";

async function create(req: Request, res: Response) {
    const credential: Credential = req.body;
    const userId: number = res.locals.userId;

    await credentialService.insert({...credential, userId})

    res.sendStatus(201);
}

async function catchAll(req: Request, res: Response) {
    const userId: number = res.locals.userId;

    const credentials = await credentialService.findAll(userId);

    res.status(201).send(credentials);
}

async function catchById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    const credential = await credentialService.findById(userId, parseInt(id));

    res.status(201).send(credential);
}

const credentialController = {
    create,
    catchAll,
    catchById
};
export default credentialController;