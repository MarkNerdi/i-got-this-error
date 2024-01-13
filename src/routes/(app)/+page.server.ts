import { statusCodeController } from '$lib/server/status/status-code.controller';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const statusCodes = await statusCodeController.getAll();

    const sortedStatusCodes = statusCodes.sort((a, b) => {
        if (a.receivedBy.length < b.receivedBy.length) return -1;
        return 1;
    });

    return { rarestStatusCodes: sortedStatusCodes.slice(0, 5) };
};
