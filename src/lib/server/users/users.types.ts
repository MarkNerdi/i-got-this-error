import type { User as AuthUser } from '@auth/core/types';

export type User = AuthUser | {
    id?: string
    name?: string | null
    email?: string | null

    profileUrl: string;
    username: string;
    image: string;

    receivedCodes: ReceivedCode[]

    createdAt: number;
};

export type ReceivedCode = {
    code: string;
    title: string;
    rfc: string;

    note: string;
    receivedAt: number;
}
