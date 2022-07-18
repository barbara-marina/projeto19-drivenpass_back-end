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

async function existingLabel(label: string, userId: number) {
    const existingConfict = await credentialRepository.findByLabelAndId({label, userId});

    if(existingConfict) throw errorHandler.conflict();
}

const credentialService = {
    insert
}
export default credentialService;