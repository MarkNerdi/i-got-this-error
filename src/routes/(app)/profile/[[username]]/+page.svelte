<script lang="ts">
    import { Card } from '$lib/components/ui/card';
    import type { StatusCode } from '$lib/server/status/status-code.type.js';
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import Button from '$lib/components/ui/button/button.svelte';

    export let data;

    console.log(data.user);
    

    let groupedStatusCodes: Record<string, StatusCode[]> = {};
    $: groupedStatusCodes = data.user?.receivedCodes.reduce((acc, statusCode) => {
        const statusCodeGroup = statusCode.code[0] + 'xx';

        if (!acc[statusCodeGroup]) {
            acc[statusCodeGroup] = [];
        }
        acc[statusCodeGroup].push(statusCode);
        return acc;
    }, {} as Record<string, StatusCode[]>);

    let newestStatusCodes: StatusCode[] = [];
    $: newestStatusCodes = data.user?.receivedCodes.sort((a, b) => b.receivedAt - a.receivedAt).slice(0, 5) ?? [];
</script>

<profile-view>
    <div class="w-full flex flex-row justify-between align-center">
        <h2 class="text-3xl font-bold">Your Profile</h2>
    </div>

    <progress-section >
        <div class="flex flex-col items-center gap-4">
            <Card class="w-[120px] h-[120px] flex items-center justify-center  p-6 border-2 rounded-full">
                <div class="flex gap-1 items-end justify-center">
                    <h4 class="text-4xl font-bold">32</h4>
                    <p class="text-xs rounded-full text-muted-foreground pb-1">/52</p>
                </div>
            </Card>
        </div>
        <div class="flex flex-col gap-4">
            <h3 class="text-2xl font-bold">{data.user?.username}</h3>
            <Button
                variant="secondary"
                on:click={() => window.open(data.user?.profileUrl ?? '', '_blank', 'noopener, noreferrer')}
            >
                Go to github
            </Button>
        </div>
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
        @apply w-full flex flex-row items-center justify-center gap-12 p-16;
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
