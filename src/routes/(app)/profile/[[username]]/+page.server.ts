import { userController } from '$lib/server/users/users.controller';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { userCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.getSession();

    let username = params?.username;
    if (!username) {
        username = session?.user?.username;
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
        isFollowed: session?.user?.followings?.some(following => following.toString() === user._id.toString()),
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

        const user = await userController.getByUsername(username);
        if (!user) {
            return fail(400);
        }

        if (follow) {
            if (!session.user.followings?.some(following => following.toString() === user._id.toString())) {
                await userCollection.updateOne({ _id: new ObjectId(session.user._id) }, { $push: { followings: new ObjectId(user._id) } });        
            }
            if (!user.followers?.some(follower => follower.toString() === session.user?._id.toString())) {
                await userCollection.updateOne({ _id: new ObjectId(user._id) }, { $push: { followers: new ObjectId(session.user._id) } });        
            }
        } else {
            
            if (session.user.followings?.some(following => following.toString() === user._id.toString())) {
                await userCollection.updateOne({ _id: new ObjectId(session.user._id) }, { $pull: { followings: new ObjectId(user._id) } });        
            }
            if (user.followers?.some(follower => follower.toString() === session.user?._id.toString())) {
                await userCollection.updateOne({ _id: new ObjectId(user._id) }, { $pull: { followers: new ObjectId(session.user._id) } });        
            }
        }

        return { success: true };
    },
};
