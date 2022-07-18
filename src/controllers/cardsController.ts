import { Request, Response } from "express";
import { Card } from "@prisma/client";
import cardService from "../services/cardsService.js";

async function create(req: Request, res: Response) {
    const card: Card = req.body;
    const userId: number = res.locals.userId;

    await cardService.insert({...card, userId})

    res.sendStatus(201);
}

async function catchAll(req: Request, res: Response) {
    const userId: number = res.locals.userId;

    const cards = await cardService.findAll(userId);

    res.status(201).send(cards);
}

async function catchById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    const card = await cardService.findById(userId, parseInt(id));

    res.status(201).send(card);
}

async function deleteById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    await cardService.deleteById(userId, parseInt(id));

    res.sendStatus(200);
}

const cardController = {
    create,
    catchAll,
    catchById, 
    deleteById
};
export default cardController;