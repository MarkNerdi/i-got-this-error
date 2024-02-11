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

    followers: OtherUser[];
    followings: OtherUser[];

    createdAt: number;
};

export type ReceivedCode = {
    code: string;
    note: string;
    receivedAt: number;
}

export type OtherUser = {
    id: ObjectId | string;
    username: string;
    image: string;
}
