import type { PageServerLoad } from './$types';
import { userController } from '$lib/server/users/users.controller';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page'));
    const search = url.searchParams.get('search') || undefined;
    
    if (!Number.isInteger(page) || page < 1) {
        return redirect(302, '/devs?page=1');
    }

    const users = await userController.getAllPaginated(page, search);
    return { users };
};


