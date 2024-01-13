import { statusCodeCollection } from '$lib/server/db';
import type { StatusCode } from '$lib/server/status/status-code.type';
import { type UpdateResult } from 'mongodb';


async function create(code: string, title: string, rfc: string): Promise<StatusCode | null> {
    const statusCode: StatusCode = {
        code,
        title,
        rfc,
        receivedBy: [],
    };

    await statusCodeCollection.insertOne(statusCode);
    return statusCode;
}


async function getById(code: string): Promise<StatusCode | null> {
    const statusCode = await statusCodeCollection.findOne({ code });
    if (statusCode) {
        statusCode.code = String(statusCode.code);
    }
    return statusCode;
}

async function update(code: string, statusCode: Partial<StatusCode>): Promise<UpdateResult> {
    return statusCodeCollection.updateOne({ code }, { $set: { ...statusCode } });
}

export const statusCodeController = {
    create,
    update,
    getById,
};
