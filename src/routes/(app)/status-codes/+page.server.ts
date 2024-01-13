import { statusCodeController } from '$lib/server/status/status-code.controller';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const statusCodes = await statusCodeController.getAll();

    return { statusCodes };
};
