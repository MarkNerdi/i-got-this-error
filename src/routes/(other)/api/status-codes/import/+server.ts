import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { statusCodeController } from '$lib/server/status/status-code.controller';
import { statusCodes } from './status-codes';

export const POST: RequestHandler = (async ({ locals }) => {
    const session = await locals.getSession();

    // Add auth here
    const user = session?.user;
    if (!user?.id) {
        return error(400, 'You have to be logged in.');
    }

    for (const statusCode of statusCodes) {
        await statusCodeController.create(statusCode.code, statusCode.title, statusCode.rfc);
    }

    return json({ success: true });
});
