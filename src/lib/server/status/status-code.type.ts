import type { ObjectId } from 'mongodb';

export type StatusCode = {
    _id?: ObjectId | string

    code: string

    receivedBy: string[]
};
