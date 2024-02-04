import { userController } from '$lib/server/users/users.controller';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { userCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { UserModel } from '$lib/server/users/users.types.js';

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.getSession();
    const currentUser = session?.user as UserModel | undefined;

    let username = params?.username;
    if (!username) {
        username = currentUser?.username;
    }
    if (!username) {
        return redirect(308, '/');
    }

    const user = await userController.getByUsername(username);
    if (!user) {
        return fail(404);
    }

    const serializedUser = {
        profileUrl: user.profileUrl,
        username: user.username,
        image: user.image,
        isFollowed: currentUser?.followings?.some(following => following.id.toString() === user._id?.toString()),
        receivedCodes: user.receivedCodes ?? [],
        amountFollowers: user.followers?.length ?? 0,
        amountFollowings: user.followings?.length ?? 0,
    };
    return { user: serializedUser };
};

export const actions = {
    toggleFollow: async ({ locals, request }) => {
        const session = await locals.getSession();
        if (!session?.user) {
            return fail(403);
        }

        const data = await request.formData();
        const username = data.get('username') as string;
        const follow = data.get('follow') as string === 'true';
        if (!username) {
            return fail(400);
        }

        const otherUser = await userController.getByUsername(username);
        const currentUser = session.user as UserModel;
        if (!otherUser) {
            return fail(400);
        }

        if (follow) {
            await userCollection.updateOne({ _id: new ObjectId(currentUser._id) }, {
                $addToSet: {
                    followings: {
                        id: new ObjectId(otherUser._id),
                        username: otherUser.username,
                        image: otherUser.image,
                    },
                },
            });        
            await userCollection.updateOne({ _id: new ObjectId(otherUser._id) }, {
                $addToSet: {
                    followers: {
                        id: new ObjectId(currentUser._id),
                        username: currentUser.username,
                        image: currentUser.image,
                    },
                },
            });        
        } else {
            await userCollection.updateOne({ _id: new ObjectId(currentUser._id) }, {
                $pull: {
                    followings: { id: new ObjectId(otherUser._id) },
                },
            });        
            await userCollection.updateOne({ _id: new ObjectId(otherUser._id) }, {
                $pull: {
                    followers: { id: new ObjectId(currentUser._id) },
                },
            });        
        }

        return { success: true };
    },
};
