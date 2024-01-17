import type { PageServerLoad } from './$types';
import { userController } from '$lib/server/users/users.controller';

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get('search') || undefined;
    const users = await userController.getAll(search);

    const serializedUsers = users.map((user) => 
        ({
            username: user.username,
            email: undefined,
            image: user.image, 
            followings: undefined,
            followers: undefined,
        })
    );

    return { users: serializedUsers };
};


