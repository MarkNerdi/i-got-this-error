import { userCollection } from '$lib/server/db';
import { statusCodeController } from '$lib/server/status/status-code.controller';
import { getDateAsNumber } from '$lib/utils/general';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const statusCodes = await statusCodeController.getAll();

    const userCount = await userCollection.countDocuments();
    const sortedStatusCodes = statusCodes.sort((a, b) => {
        if (a.receivedBy.length < b.receivedBy.length) return -1;
        return 1;
    }).map(statusCode => ({
        ...statusCode,
        percentage: Math.round((statusCode.receivedBy.length / userCount) * 100),
    }));

    const todaysRandomNumber = Math.floor(getDateAsNumber(new Date()) % sortedStatusCodes.length);

    return {
        rarestStatusCodes: sortedStatusCodes.slice(0, 5),
        todaysStatusCode: sortedStatusCodes[todaysRandomNumber],
    };
};
