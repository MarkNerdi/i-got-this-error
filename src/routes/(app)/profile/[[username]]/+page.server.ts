import { userController } from '$lib/server/users/users.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    let username = params?.username ;
    if (!username) {
        const session = await locals.getSession();
        username = session?.user?.username;
    }
    if (!username) {
        return redirect(300, '/');
    }

    const user = await userController.getByUsername(username);
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
