import { statusCodeController } from '$lib/server/status/status-code.controller';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const achievedStatusCodes = await statusCodeController.getAll();
    const newestStatusCodes = achievedStatusCodes.slice(0, 5);

    return { achievedStatusCodes, newestStatusCodes };
};
