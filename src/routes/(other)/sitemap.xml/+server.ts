import { userController } from '$lib/server/users/users.controller';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const siteURL = 'https://i-got-this-error.com';
    const priority = 1;
    const frequency = 'daily';

    const allUsernames = await userController.getAllUsernames();
    const userPages = allUsernames.map((username) => {
        return {
            path: `/profile/${username}`,
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        };
    });

    const allPages = [
        {
            path: '',
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        },
        {
            path: '/status-codes',
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        },
        {
            path: '/devs?page=1',
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        },
        ...userPages,
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages.map((entry) =>
        `<url>
            <loc>${siteURL}${entry.path}</loc>
            <lastmod>${entry.lastmod}</lastmod>
            <changefreq>${entry.frequency}</changefreq>
            <priority>${entry.priority}</priority>
        </url>`).join('')}
    </urlset>`;

    return new Response(xml, {
        headers: {
            'Cache-Control': 'max-age=0, s-maxage=3600',
            'Content-Type': 'application/xml',
        },
    });
};
