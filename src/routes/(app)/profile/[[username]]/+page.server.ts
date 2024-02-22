import { userController } from '$lib/server/users/users.controller';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { UserModel } from '$lib/server/users/users.types.js';
import { userCollection } from '$lib/server/db.js';

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

    const amountFollowers: number = await userCollection.find({ followers: user.githubId }).count();
    const amountFollowings: number = await userCollection.find({ followers: user.githubId }).count();

    const serializedUser = {
        profileUrl: user.profileUrl,
        username: user.username,
        image: user.image,
        isFollowed: currentUser?.followings?.some(following => following === user.githubId),
        receivedCodes: user.receivedCodes ?? [],
        amountFollowers,
        amountFollowings,
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
            userController.addFollowerToUser(otherUser, currentUser);
        } else {
            userController.removeFollowerFromUser(otherUser, currentUser);
        }

        return { success: true };
    },
};
