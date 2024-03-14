import { userCollection } from '$lib/server/db';
import type { UserModel } from '$lib/server/users/users.types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();
    const currentUser = session?.user as UserModel | undefined;

    const followers = await userCollection.find(
        { githubId: { $in: currentUser?.followers ?? [] } },
        { projection: { email: 0 } }
    ).toArray() as UserModel[];

    return json(followers);
};
