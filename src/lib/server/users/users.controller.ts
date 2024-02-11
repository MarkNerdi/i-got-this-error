import { PAGE_SIZE } from '$lib/constants/page-size.constant';
import { userCollection } from '$lib/server/db';
import type { UserModel } from '$lib/server/users/users.types';
import { ObjectId } from 'mongodb';

type UserPaginated = {
    total: number;
    list: {username: string, image: string}[];
};

async function getAllPaginated(page: number, search?: string): Promise<UserPaginated> {
    const query = {};
    if (search) {
        query.username = { $regex : search, $options: 'i' };
    }

    const paginatedUsers = (await userCollection.aggregate([
        { $match: query },
        { $facet: {
            total: [{ $count: 'count' }],
            list: [
                { $skip: (page - 1) * PAGE_SIZE },
                { $limit: PAGE_SIZE },
                { $project: { email: 0, _id: 0, emailVerified: 0, followers: 0, followings: 0, receivedCodes: 0, profileUrl: 0 } },
            ],
        } },
    ]
    ).toArray())?.[0];

    if (!paginatedUsers) {
        return Promise.reject('No users found'); 
    }

    return {
        total: paginatedUsers.total[0]?.count || 0,
        list: paginatedUsers.list,
    };
}

async function getAllUsernames(): Promise<string[]> {
    const users = await userCollection.aggregate([
        { $project: { username: 1, _id: 0 } },
    ]
    ).toArray();
    const usernames = users.map(user => user.username) as string[];

    return usernames;
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

async function getByGithubId(id: number): Promise<UserModel | null> {
    const user = await userCollection.findOne({ githubId: id });
    if (user) {
        user.email = undefined;
    }
    return user;
}

async function addFollowerToUser(followed: UserModel, follower: UserModel): Promise<void> {
    await userCollection.updateOne({ _id: new ObjectId(follower._id) }, {
        $addToSet: {
            followings: {
                id: new ObjectId(followed._id),
                username: followed.username,
                image: followed.image,
            },
        },
    });        
    await userCollection.updateOne({ _id: new ObjectId(followed._id) }, {
        $addToSet: {
            followers: {
                id: new ObjectId(follower._id),
                username: follower.username,
                image: follower.image,
            },
        },
    });    
}

async function removeFollowerFromUser(followed: UserModel, follower: UserModel): Promise<void> {
    await userCollection.updateOne({ _id: new ObjectId(follower._id) }, {
        $pull: {
            followings: { id: new ObjectId(followed._id) },
        },
    });        
    await userCollection.updateOne({ _id: new ObjectId(followed._id) }, {
        $pull: {
            followers: { id: new ObjectId(follower._id) },
        },
    });
}

export const userController = {
    getAllPaginated,
    getById,
    getByUsername,
    getAllUsernames,
    getByGithubId,
    addFollowerToUser,
    removeFollowerFromUser,
};
