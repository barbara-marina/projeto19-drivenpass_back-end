import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";
import wifiRepository from "../repositories/wifisRepository.js";
import errorHandler from "../middlewares/errorMiddleware.js";

async function insert(wifi: Wifi) {
    const password = await encryptPassword(wifi.password);
    await wifiRepository.insert({...wifi, password});
}

async function encryptPassword(password: string) {
    const crypt = new Cryptr(process.env.SECRET_CRYPTR);
    return crypt.encrypt(password);
}

async function decryptPassword(password: string) {
    const crypt = new Cryptr(process.env.SECRET_CRYPTR);
    return crypt.decrypt(password);
}

async function findAll(userId: number) {
    const wifis: Wifi[] = await wifiRepository.findAll({userId});
    const decryptwifis: Wifi[] = [];

    for (let wifi of wifis) {
        const password = await decryptPassword(wifi.password);
        wifi = {...wifi, password};
        decryptwifis.push(wifi);
    }
    return decryptwifis;
}

async function findById(userId: number, id: number) {
    const wifi: Wifi = await wifiRepository.findById({userId, id});
    if (!wifi) throw errorHandler.unauthorized();
    await checkId(userId, wifi.userId);
    const password = await decryptPassword(wifi.password);
    
    return {...wifi, password};
}

async function checkId(userId: number, wifiUserId: number) {
    if (userId !== wifiUserId) throw errorHandler.unauthorized();
}

async function deleteById(userId: number, id: number) {
    const wifi: Wifi = await wifiRepository.findById({userId, id});
    if (!wifi) throw errorHandler.unauthorized();
    
    await checkId(userId, wifi.userId);
    
    await wifiRepository.deleteById({id});
}

const wifiService = {
    insert, 
    findAll, 
    findById, 
    deleteById
}
export default wifiService;