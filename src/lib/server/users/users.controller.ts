import { userCollection } from '$lib/server/db';
import type { UserModel } from '$lib/server/users/users.types';
import { ObjectId } from 'mongodb';

async function getAll(search?: string): Promise<UserModel[]> {
    const query = {};
    if (search) {
        query.username = { $regex : search, $options: 'i' };
    }
    return userCollection.find(query).toArray();
}

async function getByUsername(username: string): Promise<UserModel | null> {
    const user = await userCollection.findOne({ username });
    if (user) {
        user.email = undefined;
    }
    return user;
}

async function getById(id: string): Promise<UserModel | null> {
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
