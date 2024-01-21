<script lang="ts">
    import { Card } from '$lib/components/ui/card';
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { activeUser } from '$lib/stores/user.store.js';
    import { goToExternalLink } from '$lib/utils/general.js';
    import { ExternalLink, ThumbsUp } from 'lucide-svelte';
    import type { ReceivedCode } from '$lib/server/users/users.types.js';
    import { enhance } from '$app/forms';
    import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
    import { MetaTags } from 'svelte-meta-tags';
    import { metaTags } from '$lib/constants/metadata.constant.js';

    export let data;

    $: user = data.user;
    $: isActiveUser = user?.username === $activeUser?.username;

    let groupedStatusCodes: Record<string, ReceivedCode[]> = {};
    $: groupedStatusCodes = user?.receivedCodes.reduce((acc, statusCode) => {
        const statusCodeGroup = statusCode.code[0] + 'xx';

        if (!acc[statusCodeGroup]) {
            acc[statusCodeGroup] = [];
        }
        acc[statusCodeGroup].push(statusCode);
        return acc;
    }, {} as Record<string, ReceivedCode[]>) ?? {};

    let newestStatusCodes: ReceivedCode[] = [];
    $: newestStatusCodes = user?.receivedCodes.sort((a, b) => b.receivedAt - a.receivedAt).slice(0, 5) ?? [];
</script>

<MetaTags {...metaTags} title={isActiveUser ? 'My Profile' : user?.username ?? 'Profile'} />

<profile-view>
    <div class="w-full flex flex-row justify-between align-center">
        <h2 class="text-3xl font-bold">{
            isActiveUser
                ? 'Your Profile'
                : `${user?.username}'s Profile`
        }</h2>
        {#if $activeUser && !isActiveUser}
            <form method="POST" action="?/toggleFollow" use:enhance>
                <input type="hidden" name="username" value={user?.username} />
                <input type="hidden" name="follow" value={!user?.isFollowed} />

                {#if user?.isFollowed}
                    <Button variant="outline" type="submit">
                        Unfollow
                    </Button>
                {:else}
                    <Button variant="secondary" type="submit">
                        <ThumbsUp class="w-4 h-4 mr-3" />
                        Follow
                    </Button>
                {/if}
            </form>
        {/if}
    </div>

    <progress-section >
        <div class="flex gap-4">
            <Avatar class="h-20 w-20">
                <AvatarImage src="{user?.image}" alt="{user?.username}" />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div class="flex flex-col justify-center">
                <div class="flex flex-row items-center">
                    <h3 class="text-2xl font-bold items-start">{user?.username}</h3>
                    <Button on:click={() => goToExternalLink(user?.profileUrl ?? '')} variant="link">
                        <ExternalLink class="w-4 h-4" />
                    </Button>
                </div>
                <p class="text-sm rounded-full text-muted-foreground pb-1">
                    <span class="font-bold">{user?.amountFollowers}</span> {`follower${ user?.amountFollowers !== 1 ? 's' : '' }`} | 
                    <span class="font-bold">{user?.amountFollowings}</span> {`following${ user?.amountFollowings !== 1 ? 's' : '' }`} 
                </p>
            </div>
        </div>
        <Card class="w-[120px] h-[120px] flex items-center justify-center p-6 border-2 rounded-full">
            <div class="flex gap-1 items-end justify-center">
                <h4 class="text-4xl font-bold">32</h4>
                <p class="text-xs rounded-full text-muted-foreground pb-1">/52</p>
            </div>
        </Card>

    </progress-section>

    <div class="w-full overflow-auto flex flex-col gap-12">
        {#if data.user?.receivedCodes?.length}
            <status-codes-section>
                <h2 class="text-2xl font-bold">Newest Achievements</h2>

                <status-code-list>
                    {#each newestStatusCodes as statusCode}
                        <StatusCodeCard {statusCode} />
                    {/each}
                </status-code-list>
            </status-codes-section>
        {/if}

        <status-codes-section>
            <h2 class="text-2xl font-bold">All Achievements</h2>

            {#if data.user?.receivedCodes?.length}
                <list-container>
                    {#each Object.keys(groupedStatusCodes) as statusCodesGroupKey}
                        <div class="flex flex-col items-start gap-4">
                            <h3 class="text-2xl">{statusCodesGroupKey}</h3>
                            <status-code-list>
                                {#each groupedStatusCodes[statusCodesGroupKey] as statusCode}
                                    <StatusCodeCard {statusCode} />
                                {/each}
                            </status-code-list>
                        </div>
                    {/each}
                </list-container>
            {:else}
                empty
            {/if}
        </status-codes-section>
    </div>
</profile-view>


<style lang="postcss">
    profile-view {
        @apply w-full h-full max-w-[1000px];
        @apply flex flex-col items-start;
    }

    progress-section {
        @apply w-full flex flex-row items-center justify-center gap-16 p-16;
    }

    status-codes-section {
        @apply w-full flex flex-col items-start gap-8;
    }

    list-container {
        @apply w-full flex-grow flex flex-col gap-8;
        @apply overflow-auto;
    }

    status-code-list {
        @apply w-full ;
        @apply grid gap-8;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        grid-auto-rows: 1fr;
    }
</style>
