import prisma from "../config/database.js";
import { Wifi } from "@prisma/client";

async function insert({ userId, label, network, password }: Wifi) {
    await prisma.wifi.create({
        data: {
            userId, 
            label, 
            network, 
            password
        }
    });
}


async function findAll({userId}: Wifi) {
    return prisma.wifi.findMany({
        where: {
            userId
        }
    });
}

async function findById({userId, id}: Wifi) {
    return prisma.wifi.findFirst({
        where: {
            userId,
            id
        }
    });
}

async function deleteById({id}: Wifi) {
    return prisma.wifi.delete({
        where: {
            id
        }
    });
}

const WifiRepository = {
    insert,
    findAll,
    findById, 
    deleteById
};
export default WifiRepository;