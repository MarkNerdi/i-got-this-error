import type { User as AuthUser } from '@auth/core/types';

export type User = AuthUser | {
    profileUrl: string;
    username: string;
    image: string;

    receivedCodes: {
        code: string;
        title: string;
        rfc: string;

        note: string;
    }[]

    createdAt: number;
};
