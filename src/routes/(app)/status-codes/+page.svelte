<script lang="ts">
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';

    export let data;

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

    <status-code-list>
        {#each data.statusCodes as statusCode}
            <StatusCodeCard {statusCode} />
        {/each}
    </status-code-list>
</status-codes-view>


<style lang="postcss">
    status-codes-view {
        @apply w-full h-full max-w-[1000px];
        @apply flex flex-col justify-center items-center gap-8;
    }

    status-code-list {
        @apply w-full flex-grow;
        @apply flex flex-wrap justify-center items-center gap-8;
    }
</style>
