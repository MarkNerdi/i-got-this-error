import { userCollection } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    let username = params?.username ;
    if (!username) {
        const session = await locals.getSession();
        username = session?.user?.username;
    }

    const user = await userCollection.findOne({ username });
    if (!user) {
        return { status: 404 };
    }

    const serializedUser = {
        profileUrl: user.profileUrl,
        username: user.username,
        image: user.image, 
        receivedCodes: user.receivedCodes ?? [],
    };
    return { user: serializedUser };
};
