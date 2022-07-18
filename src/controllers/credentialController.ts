import { Request, Response } from "express";
import { Credential } from "@prisma/client";

async function create(req: Request, res: Response) {
    // const body: Credential = req.body;
    res.send("hello");
}

const credentialController = {
    create,
};
export default credentialController;