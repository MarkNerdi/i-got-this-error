import { statusCodeCollection } from '$lib/server/db';
import type { StatusCode } from '$lib/server/status/status-code.type';
import type { UpdateResult } from 'mongodb';


async function getAll(): Promise<StatusCode[]> {
    const statusCode = await statusCodeCollection.find().toArray();
    const serializedStatusCodes = statusCode.map((statusCode) => {
        statusCode._id = String(statusCode._id);
        return statusCode;
    });
    return serializedStatusCodes;
}

async function getByCode(code: string): Promise<StatusCode | null> {
    const statusCode = await statusCodeCollection.findOne({ code });
    if (statusCode) {
        statusCode.code = String(statusCode.code);
    }
    return statusCode;
}

async function update(code: string, statusCode: Partial<StatusCode>): Promise<UpdateResult> {
    return statusCodeCollection.updateOne({ code }, { $set: { ...statusCode } });
}

async function addReceiver(code: string, userId: string): Promise<UpdateResult> {
    return statusCodeCollection.updateOne({ code }, { $push: { receivedBy: userId } });        
}

export const statusCodeController = {
    update,
    getAll,
    getByCode,
    addReceiver,
};
