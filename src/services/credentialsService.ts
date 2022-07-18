import Cryptr from "cryptr";
import { Credential } from "@prisma/client";
import credentialRepository from "../repositories/credentialRepository.js";
import errorHandler from "../middlewares/errorMiddleware.js";

async function insert(credential: Credential) {
    const password = await encryptPassword(credential.password);
    await existingLabel(credential.label, credential.userId);
    await credentialRepository.insert({...credential, password});

}

async function encryptPassword(password: string) {
    const crypt = new Cryptr(process.env.SECRET_CRYPTR);
    return crypt.encrypt(password);
}

async function decryptPassword(password: string) {
    const crypt = new Cryptr(process.env.SECRET_CRYPTR);
    return crypt.decrypt(password);
}

async function existingLabel(label: string, userId: number) {
    const existingConfict = await credentialRepository.findByLabelAndId({label, userId});

    if(existingConfict) throw errorHandler.conflict();
}

async function findAll(userId: number) {
    const credentials: Credential[] = await credentialRepository.findAll({userId});
    const decryptCredentials: Credential[] = [];

    for (let credential of credentials) {
        const password = await decryptPassword(credential.password);
        credential = {...credential, password};
        decryptCredentials.push(credential);
    }
    return decryptCredentials;
}

async function findById(userId: number, id: number) {
    const credential: Credential = await credentialRepository.findById({userId, id});
    if (!credential) throw errorHandler.unauthorized();
    await checkId(userId, credential.userId);
    const password = await decryptPassword(credential.password);
    
    return {...credential, password};
}

async function checkId(userId: number, credentialUserId: number) {
    if (userId !== credentialUserId) throw errorHandler.unauthorized();
}

async function deleteById(userId: number, id: number) {
    const credential: Credential = await credentialRepository.findById({userId, id});
    if (!credential) throw errorHandler.unauthorized();
    
    await checkId(userId, credential.userId);
    
    await credentialRepository.deleteById({id});
}

const credentialService = {
    insert, 
    findAll, 
    findById, 
    deleteById
}
export default credentialService;