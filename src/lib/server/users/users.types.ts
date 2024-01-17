import type { ObjectId } from 'mongodb';

export type UserModel = {
    _id?: string
    name?: string | null
    email?: string | null

    profileUrl: string;
    username: string;
    image: string;

    receivedCodes: ReceivedCode[]

    followers: ObjectId[];
    followings: ObjectId[];

    createdAt: number;
};

export type ReceivedCode = {
    code: string;
    title: string;
    rfc: string;

    note: string;
    receivedAt: number;
}
