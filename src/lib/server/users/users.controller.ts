import { userCollection } from '$lib/server/db';
import type { User } from '$lib/server/users/users.types';
import { ObjectId } from 'mongodb';

async function getAll(search?: string): Promise<User[]> {
    const query = {};
    if (search) {
        query.username = { $regex : search, $options: 'i' };
    }
    const users = await userCollection.find(query).toArray();
    const serializedUsers = users.map((user) => {
        user.email = undefined;
        return user;
    });
    return serializedUsers;
}

async function getByUsername(username: string): Promise<User | null> {
    const user = await userCollection.findOne({ username });
    if (user) {
        user.email = undefined;
    }
    return user;
}

async function getById(id: string): Promise<User | null> {
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (user) {
        user.email = undefined;
    }
    return user;
}

export const userController = {
    getAll,
    getById,
    getByUsername,
};
