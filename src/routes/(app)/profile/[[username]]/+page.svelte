<script lang="ts">
    import { Card } from '$lib/components/ui/card';
    import AddStatusCodePopup from '$lib/components/AddStatusCodePopup.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { activeUser } from '$lib/stores/user.store.js';
    import { goToExternalLink } from '$lib/utils/general.js';
    import { ExternalLink, ThumbsUp, Trophy } from 'lucide-svelte';
    import type { ReceivedCode } from '$lib/server/users/users.types.js';
    import { enhance } from '$app/forms';
    import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
    import { MetaTags } from 'svelte-meta-tags';
    import { metaTags } from '$lib/constants/metadata.constant.js';
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant.js';

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
    <div class="w-full max-w-[1000px] flex flex-row justify-between align-center lg:p-6 p-4 pb-0">
        <h2 class="lg:text-3xl font-bold text-xl">{
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
        <div class="flex items-center gap-4">
            <Avatar class="lg:h-20 lg:w-20 w-12 h-12">
                <AvatarImage src="{user?.image}" alt="{user?.username}" />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div class="flex flex-col justify-center">
                <div class="flex flex-row items-center">
                    <h3 class="lg:text-2xl text-xl font-bold items-start">{user?.username}</h3>
                    <Button on:click={() => goToExternalLink(user?.profileUrl ?? '')} variant="link">
                        <ExternalLink class="w-4 h-4" />
                    </Button>
                </div>
                <p class="lg:text-sm text-xs rounded-full text-muted-foreground pb-1">
                    <span class="font-bold">{user?.amountFollowers}</span> {`follower${ user?.amountFollowers !== 1 ? 's' : '' }`} | 
                    <span class="font-bold">{user?.amountFollowings}</span> {`following${ user?.amountFollowings !== 1 ? 's' : '' }`} 
                </p>
            </div>
        </div>
        <Card class="lg:w-[120px] lg:h-[120px] h-[75px] w-[75px] flex items-center justify-center lg:p-6 p-2 border-2 rounded-full">
            <div class="flex gap-1 items-end justify-center">
                <h4 class="lg:text-4xl text-2xl font-bold">{user?.receivedCodes?.length ?? 0}</h4>
                <p class="text-xs rounded-full text-muted-foreground pb-1">/{Object.keys(STATUS_CODES).length}</p>
            </div>
        </Card>
    </progress-section>

    <div class="w-full flex-grow overflow-auto flex flex-col items-center lg:gap-12 gap-6">
        {#if data.user?.receivedCodes?.length}
            <status-codes-section>
                <h2 class="lg:text-2xl text-xl font-bold">Newest Achievements</h2>

                <status-code-list>
                    {#each newestStatusCodes as statusCode}
                        {#if isActiveUser}
                            <AddStatusCodePopup code={statusCode.code} receivedStatusCode={statusCode} >
                                <StatusCodeCard code={statusCode.code} />
                            </AddStatusCodePopup>
                        {:else}
                            {@const isReceivedByActiveUser = $activeUser?.receivedCodes.some(code => code.code === statusCode.code)}
                            <StatusCodeCard code={statusCode.code} {isReceivedByActiveUser} hoverAnimation={false} />
                        {/if}
                    {/each}
                </status-code-list>
            </status-codes-section>
        {/if}

        <status-codes-section>
            <h2 class="lg:text-2xl text-xl font-bold">All Achievements</h2>

            <list-container>
                {#each Object.keys(groupedStatusCodes) as statusCodesGroupKey}
                    <div class="flex flex-col items-start gap-4">
                        <h3 class="lg:text-2xl text-lg">{statusCodesGroupKey}</h3>
                        <status-code-list>
                            {#each groupedStatusCodes[statusCodesGroupKey] as statusCode}
                                {#if isActiveUser}
                                    <AddStatusCodePopup code={statusCode.code} receivedStatusCode={statusCode} >
                                        <StatusCodeCard code={statusCode.code} />
                                    </AddStatusCodePopup>
                                {:else}
                                    {@const isReceivedByActiveUser = $activeUser?.receivedCodes.some(code => code.code === statusCode.code)}
                                    <StatusCodeCard code={statusCode.code} {isReceivedByActiveUser} hoverAnimation={false} />
                                {/if}
                            {/each}
                        </status-code-list>
                    </div>
                {:else}
                    <div class="h-full w-full flex flex-col justify-center items-center p-6 gap-2">
                        <Trophy class="w-20 h-20 mb-4" />
                        <h3 class="text-lg font-semibold">No achievements</h3>
                        <p class="text-sm text-muted-foreground">
                            {isActiveUser ?
                                'You have not received any status codes yet.' :
                                user?.username + ' has not received any status codes yet.'}
                        </p>
                    </div>
                {/each}
            </list-container>
        </status-codes-section>
    </div>
</profile-view>


<style lang="postcss">
    profile-view {
        @apply w-full h-full;
        @apply flex flex-col items-center justify-start;
    }

    progress-section {
        @apply w-full max-w-[1000px] flex flex-row items-center justify-center lg:gap-16 gap-4 lg:p-12 p-4;
    }

    status-codes-section {
        @apply w-full max-w-[1000px] flex-grow flex flex-col items-start lg:gap-8 gap-4 lg:p-6 p-4;
    }

    list-container {
        @apply w-full flex-grow flex flex-col gap-8;
        @apply overflow-auto;
    }

    status-code-list {
        @apply w-full ;
        @apply grid lg:grid-cols-6 grid-cols-3;
        @apply lg:gap-8 gap-4;
    }
</style>
