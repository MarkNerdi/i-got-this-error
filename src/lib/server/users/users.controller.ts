import { userCollection } from '$lib/server/db';
import type { User } from '$lib/server/users/users.types';

async function getAll(): Promise<User[]> {
    const users = await userCollection.find().toArray();
    const serializedUsers = users.map((user) => {
        user.email = undefined;
        return user;
    });
    return serializedUsers;
}

async function getById(username: string): Promise<User | null> {
    const user = await userCollection.findOne({ username });
    if (user) {
        user.email = undefined;
    }
    return user;
}

export const statusCodeController = {
    getAll,
    getById,
};
