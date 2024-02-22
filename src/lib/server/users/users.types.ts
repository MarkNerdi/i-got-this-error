import type { ObjectId } from 'mongodb';

export type UserModel = {
    _id?: ObjectId | string;
    name?: string | null;
    email?: string | null;
    
    githubId?: number

    profileUrl: string;
    username: string;
    image: string;

    receivedCodes: ReceivedCode[];

    followers: number[]; // githubId[]
    followings: number[]; // githubId[]

    createdAt: number;
};

export type ReceivedCode = {
    code: string;
    note: string;
    receivedAt: number;
}
