import Cryptr from "cryptr";
import { Card } from "@prisma/client";
import cardRepository from "../repositories/cardsRepository.js";
import errorHandler from "../middlewares/errorMiddleware.js";

async function insert(card: Card) {
    const number = await encryptData(card.number);
    const cvv = await encryptData(card.cvv);
    await existingLabel(card.label, card.userId);
    await cardRepository.insert({...card, number, cvv});

}

async function encryptData(data: string) {
    const crypt = new Cryptr(process.env.SECRET_CRYPTR);
    return crypt.encrypt(data);
}

async function decryptData(data: string) {
    const crypt = new Cryptr(process.env.SECRET_CRYPTR);
    return crypt.decrypt(data);
}

async function existingLabel(label: string, userId: number) {
    const existingConfict = await cardRepository.findByLabelAndId({label, userId});

    if(existingConfict) throw errorHandler.conflict();
}

async function findAll(userId: number) {
    const cards: Card[] = await cardRepository.findAll({userId});
    const decryptCards: Card[] = [];

    for (let card of cards) {
        const number = await decryptData(card.number);
        const cvv = await decryptData(card.cvv);
        card = {...card, number, cvv};
        decryptCards.push(card);
    }
    return decryptCards;
}

async function findById(userId: number, id: number) {
    const card: Card = await cardRepository.findById({userId, id});
    if (!card) throw errorHandler.unauthorized();
    await checkId(userId, card.userId);
    const number = await decryptData(card.number);
    const cvv = await decryptData(card.cvv);
    
    return {...card, number, cvv};
}

async function checkId(userId: number, cardUserId: number) {
    if (userId !== cardUserId) throw errorHandler.unauthorized();
}

async function deleteById(userId: number, id: number) {
    const card: Card = await cardRepository.findById({userId, id});
    if (!card) throw errorHandler.unauthorized();
    
    await checkId(userId, card.userId);
    
    await cardRepository.deleteById({id});
}

const cardService = {
    insert, 
    findAll, 
    findById, 
    deleteById
}
export default cardService;