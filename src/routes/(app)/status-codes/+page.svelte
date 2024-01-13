<script lang="ts">
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
    import type { StatusCode } from '$lib/server/status/status-code.type.js';

    export let data;

    let groupedStatusCodes: Record<string, StatusCode[]> = {};
    $: groupedStatusCodes = data.statusCodes.reduce((acc, statusCode) => {
        const statusCodeGroup = statusCode.code[0] + 'xx';
        if (!acc[statusCodeGroup]) {
            acc[statusCodeGroup] = [];
        }
        acc[statusCodeGroup].push(statusCode);
        return acc;
    }, {} as Record<string, StatusCode[]>);

    let selectedStatusCodes = ['4xx', '5xx'];
</script>

<status-codes-view>
    <div class="w-full flex flex-row justify-between align-center">
        <h2 class="text-3xl font-bold">Status codes</h2>
        
        <div class="flex gap-4 items-center">
            <p class="text-sm">Display only:</p>
            <ToggleGroup type="multiple" bind:value={selectedStatusCodes}>
                <ToggleGroupItem value="1xx" aria-label="1xx">
                    1xx
                </ToggleGroupItem>
                <ToggleGroupItem value="2xx" aria-label="2xx">
                    2xx
                </ToggleGroupItem>
                <ToggleGroupItem value="3xx" aria-label="3xx">
                    3xx
                </ToggleGroupItem>
                <ToggleGroupItem value="4xx" aria-label="4xx">
                    4xx
                </ToggleGroupItem>
                <ToggleGroupItem value="5xx" aria-label="5xx">
                    5xx
                </ToggleGroupItem>
              </ToggleGroup>
        </div>
    </div>

    <list-container>
        {#each Object.keys(groupedStatusCodes) as statusCodesGroupKey}
            {#if selectedStatusCodes.includes(statusCodesGroupKey)}
                <div class="flex flex-col items-start gap-4">
                    <h3 class="text-2xl">{statusCodesGroupKey}</h3>
                    <status-code-list>
                        {#each groupedStatusCodes[statusCodesGroupKey] as statusCode}
                            <StatusCodeCard {statusCode} />
                        {/each}
                    </status-code-list>
                </div>
            {/if}
        {/each}
    </list-container>
</status-codes-view>


<style lang="postcss">
    status-codes-view {
        @apply w-full h-full max-w-[1000px];
        @apply flex flex-col justify-center items-start gap-8;
    }

    list-container {
        @apply w-full flex-grow flex flex-col gap-8;
    }

    status-code-list {
        @apply w-full ;
        @apply grid gap-8;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        grid-auto-rows: 1fr;
    }
</style>
