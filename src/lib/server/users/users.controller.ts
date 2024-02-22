import { PAGE_SIZE } from '$lib/constants/page-size.constant';
import { userCollection } from '$lib/server/db';
import type { UserModel } from '$lib/server/users/users.types';
import { ObjectId } from 'mongodb';

type UserPaginated = {
    total: number;
    list: {username: string, image: string}[];
};

async function getAllPaginated(page: number, search?: string): Promise<UserPaginated> {
    const query: Record<string, unknown>  = {};
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
    const user = await userCollection.findOne({ username }, { projection: { email: 0 } });
    return user;
}

async function getById(id: string): Promise<UserModel | null> {
    const user = await userCollection.findOne({ _id: new ObjectId(id) }, { projection: { email: 0 } });
    return user;
}

async function getByGithubId(id: number): Promise<UserModel | null> {
    const user = await userCollection.findOne({ githubId: id }, { projection: { email: 0 } } );
    return user;
}

async function addFollowerToUserByGithubIds(followed: number, follower: number): Promise<void> {
    await userCollection.updateOne({ githubId: follower }, {
        $addToSet: {
            followings: followed,
        },
    });        
    await userCollection.updateOne({ githubId: followed }, {
        $addToSet: {
            followers: follower,
        },
    });    
}
async function addFollowerToUser(followed: UserModel, follower: UserModel): Promise<void> {
    await userCollection.updateOne({ _id: new ObjectId(follower._id) }, {
        $addToSet: {
            followings: followed.githubId,
        },
    });        
    await userCollection.updateOne({ _id: new ObjectId(followed._id) }, {
        $addToSet: {
            followers: follower.githubId,
        },
    });    
}

async function removeFollowerFromUser(followed: UserModel, follower: UserModel): Promise<void> {
    await userCollection.updateOne({ _id: new ObjectId(follower._id) }, {
        $pull: {
            followings: followed.githubId,
        },
    });        
    await userCollection.updateOne({ _id: new ObjectId(followed._id) }, {
        $pull: {
            followers: follower.githubId,
        },
    });
}

export const userController = {
    getAllPaginated,
    getById,
    getByUsername,
    getAllUsernames,
    getByGithubId,
    addFollowerToUserByGithubIds,
    addFollowerToUser,
    removeFollowerFromUser,
};
