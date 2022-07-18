import { Request, Response } from "express";
import { Wifi } from "@prisma/client";
import wifiService from "../services/wifisService.js";

async function create(req: Request, res: Response) {
    const wifi: Wifi = req.body;
    const userId: number = res.locals.userId;

    await wifiService.insert({...wifi, userId})

    res.sendStatus(201);
}

async function catchAll(req: Request, res: Response) {
    const userId: number = res.locals.userId;

    const wifis = await wifiService.findAll(userId);

    res.status(201).send(wifis);
}

async function catchById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    const wifi = await wifiService.findById(userId, parseInt(id));

    res.status(201).send(wifi);
}

async function deleteById(req: Request, res: Response) {
    const userId: number = res.locals.userId;
    const { id }= req.params;

    await wifiService.deleteById(userId, parseInt(id));

    res.sendStatus(200);
}

const wifiController = {
    create,
    catchAll,
    catchById, 
    deleteById
};
export default wifiController;