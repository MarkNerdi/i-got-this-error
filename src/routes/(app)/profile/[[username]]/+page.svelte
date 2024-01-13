<script lang="ts">
    import { Card } from '$lib/components/ui/card';
    import type { StatusCode } from '$lib/server/status/status-code.type.js';
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';

    export let data;

    let groupedStatusCodes: Record<string, StatusCode[]> = {};
    $: groupedStatusCodes = data.achievedStatusCodes.reduce((acc, statusCode) => {
        const statusCodeGroup = statusCode.code[0] + 'xx';

        if (!acc[statusCodeGroup]) {
            acc[statusCodeGroup] = [];
        }
        acc[statusCodeGroup].push(statusCode);
        return acc;
    }, {} as Record<string, StatusCode[]>);
</script>

<profile-view>
    <div class="w-full flex flex-row justify-between align-center">
        <h2 class="text-3xl font-bold">Your Profile</h2>
    </div>

    <progress-section >
        <div class="flex flex-col items-center gap-4">
            <Card class="w-[120px] h-[120px] flex flex-col gap-1 items-center justify-center p-6 border-2 rounded-full">
                <h4 class="text-4xl font-bold">32</h4>
                <p class="text-xs rounded-full">32/52</p>
            </Card>
        </div>
        <div class="flex flex-col gap-4">
            <h3 class="text-xl">Max Mustermann</h3>
            <p class="text-sm">Go to github</p>
        </div>
    </progress-section>

    <div class="w-full overflow-auto flex flex-col gap-12">
        <status-codes-section>
            <h2 class="text-2xl font-bold">Newest Achievements</h2>

            <status-code-list>
                {#each data.newestStatusCodes as statusCode}
                    <StatusCodeCard {statusCode} />
                {/each}
            </status-code-list>
        </status-codes-section>

        <status-codes-section>
            <h2 class="text-2xl font-bold">All Achievements</h2>

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
