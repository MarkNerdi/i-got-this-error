import { userCollection } from '$lib/server/db';
import { statusCodeController } from '$lib/server/status/status-code.controller';
import { getDateAsNumber } from '$lib/utils/general';
import type { PageServerLoad } from './$types';
import type { UserModel } from '$lib/server/users/users.types';
import { ObjectId } from 'mongodb';

type FeedEntry = {
    username: string;
    image: string;
    receivedCode: { code: string; note: string; receivedAt: number };
};

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession();
    const statusCodes = await statusCodeController.getAll();

    const userCount = await userCollection.countDocuments();

    const sortedStatusCodes = statusCodes.sort((a, b) => {
        if (a.receivedBy.length < b.receivedBy.length) return -1;
        return 1;
    }).slice(0, 5);
    
    const serializedStatusCodes = sortedStatusCodes.map(statusCode => ({
        ...statusCode,
        percentage: Math.round((statusCode.receivedBy.length / userCount) * 100),
    }));
    const rarestStatusCodes = serializedStatusCodes.slice(0, 5);

    const todaysRandomNumber = Math.floor(getDateAsNumber(new Date()) % statusCodes.length);
    const todaysStatusCode = statusCodes[todaysRandomNumber];

    let feed: FeedEntry[] = [];
    const currentUser = session?.user as UserModel | undefined;
    if (currentUser) {
        const followingIds = currentUser.followings?.map(following => new ObjectId(following.id));
        feed = await userCollection.aggregate([
            { $match : { _id: { $in: followingIds } } },
            { $project: { _id: 0, username: 1, image: 1, receivedCodes: 1 } },
            { $unwind : '$receivedCodes' },
            { $sort : { 'receivedCodes.receivedAt' : -1 } },
            { $limit : 5 },
            { $project : { username: 1, image: 1, receivedCode: '$receivedCodes' } },
        ]).toArray() as FeedEntry[];
    }

    return {
        rarestStatusCodes,
        todaysStatusCode,
        feed,
    };
};
