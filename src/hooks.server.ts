import { SvelteKitAuth } from '@auth/sveltekit';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    PRIVATE_DB_NAME,
    AUTH_SECRET
} from '$env/static/private';
import { mongoClient, userCollection } from '$lib/server/db';
import GitHub, { type GitHubEmail } from '@auth/core/providers/github';
import { userController } from '$lib/server/users/users.controller';

export const handle = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            userinfo: {
                url: 'https://api.github.com/user',
                async request({ tokens, provider }) {
                    const profile = await fetch(provider.userinfo?.url as URL, {
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`,
                            'User-Agent': 'authjs',
                        },
                    }).then(async (res) => await res.json());

                    if (!profile.email) {
                        // If the user does not have a public email, get another via the GitHub API
                        // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
                        const res = await fetch('https://api.github.com/user/emails', {
                            headers: {
                                Authorization: `Bearer ${tokens.access_token}`,
                                'User-Agent': 'authjs',
                            },
                        });

                        if (res.ok) {
                            const emails: GitHubEmail[] = await res.json();
                            profile.email = (emails.find((e) => e.primary) ?? emails[0]).email;
                        }
                    }

                    return profile;
                },
            },
            profile(profile) {
                console.log(profile);

                const [followingUrl ] = profile.following_url.split('{');

                fetch(followingUrl).then(async (res) => {
                    const followings = await res.json();
                    followings.forEach((following: { id: number }) => {
                        const githubId = following.id;
                        userController.addFollowerToUserByGithubIds(githubId, profile.id);
                    });
                });
                const [followersUrl ] = profile.followers_url.split('{');
                
                fetch(followersUrl).then(async (res) => {
                    const followers = await res.json();
                    followers.forEach((following: { id: number }) => {
                        const githubId = following.id;
                        userController.addFollowerToUserByGithubIds(profile.id, githubId);
                    });
                });
                
                return {
                    id: profile.id.toString(),
                    githubId: profile.id,
                    email: profile.email,
                    profileUrl: profile.html_url,
                    username: profile.login,
                    image: profile.avatar_url,
                    receivedCodes: [],
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            return { ...session, user: { ...user, _id: user.id } };
        },
    },
    adapter: MongoDBAdapter(mongoClient, { databaseName: PRIVATE_DB_NAME }),
    trustHost: true,
    secret: AUTH_SECRET,
});
