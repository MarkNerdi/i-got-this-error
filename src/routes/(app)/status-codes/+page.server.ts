import { userCollection } from '$lib/server/db.js';
import { statusCodeController } from '$lib/server/status/status-code.controller';
import type { PageServerLoad } from './$types';
import type { ReceivedCode } from '$lib/server/users/users.types';
import { userController } from '$lib/server/users/users.controller';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const statusCodes = await statusCodeController.getAll();

    return { statusCodes };
};

export const actions = {
    default: async ({ locals, request }) => {
        const session = await locals.getSession();
        const user = session?.user?.id ? await userController.getById(session.user.id) : undefined;
        if (!user?._id) {
            return fail(403);
        }

        const data = await request.formData();
        const code = data.get('code') as string;
        const note = data.get('note') as string ?? '';

        if (!code) {
            return fail(400);
        }

        const statusCode = await statusCodeController.getByCode(code);
        if (!statusCode) {
            return { status: 400 };
        }

        const receivedStatusCode: ReceivedCode = {
            code,
            note,
            receivedAt: Date.now(),
        };

        if (user.receivedCodes?.some(receivedCode => receivedCode.code === code)) {
            await userCollection.updateOne({ _id: user._id }, { $pull: { 'receivedCodes.code': code } });        
            await userCollection.updateOne({ _id: user._id }, { $push: { receivedCodes: receivedStatusCode } });        
        } else {
            await userCollection.updateOne({ _id: user._id }, { $push: { receivedCodes: receivedStatusCode } });        
            await statusCodeController.addReceiver(code, user._id?.toString());        
        }
        

        return { success: true };
    },
};

