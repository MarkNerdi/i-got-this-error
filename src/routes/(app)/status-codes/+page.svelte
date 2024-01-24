<script lang="ts">
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import { Input } from '$lib/components/ui/input/index.js';
    import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
    import { metaTags } from '$lib/constants/metadata.constant.js';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant.js';
    import type { StatusCode } from '$lib/server/status/status-code.type.js';
    import { activeUser } from '$lib/stores/user.store.js';
    import { MetaTags } from 'svelte-meta-tags';

    export let data;

    let selectedStatusCodes = ['4xx', '5xx'];
    let searchTerm = '';

    let groupedStatusCodes: Record<string, StatusCode[]> = {};
    $: groupedStatusCodes = data.statusCodes.reduce((acc, statusCode) => {
        if (!isVisibleStatusCode(statusCode, searchTerm)) {
            return acc;
        }

        const statusCodeGroup = statusCode.code[0] + 'xx';
        if (!isVisibleGroup(statusCodeGroup, selectedStatusCodes)) {
            return acc;
        }

        if (!acc[statusCodeGroup]) {
            acc[statusCodeGroup] = [];
        }
        acc[statusCodeGroup].push(statusCode);
        return acc;
    }, {} as Record<string, StatusCode[]>);

    function isVisibleGroup(statusCodeGroup: string, selectedStatusCodes: string[]) {
        return selectedStatusCodes.includes(statusCodeGroup);
    }

    function isVisibleStatusCode(statusCode: StatusCode, searchTerm: string) {
        if (!searchTerm) {
            return true;
        }

        return statusCode.code.toLowerCase().includes(searchTerm.toLowerCase()) || STATUS_CODES[statusCode.code]?.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
</script>


<MetaTags {...metaTags} title='Status codes' />

<status-codes-view>
    <div class="w-full flex flex-row justify-between align-center max-w-[1000px]">
        <h2 class="text-3xl font-bold">Status codes</h2>
        
        <div class="flex gap-4 items-center">
            <Input placeholder="Search status codes" bind:value={searchTerm} />
            <p class="text-sm">Filter:</p>
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

    <div class="w-full h-full flex flex-row justify-center items-start overflow-auto">
        <list-container>
            {#each Object.keys(groupedStatusCodes) as statusCodesGroupKey}
                <div class="flex flex-col items-start gap-4">
                    <h3 class="text-2xl">{statusCodesGroupKey}</h3>
                    <status-code-list>
                        {#each groupedStatusCodes[statusCodesGroupKey] as statusCode}
                            {@const code = $activeUser?.receivedCodes.find(code => code.code === statusCode.code)}
                            <StatusCodeCard code={statusCode.code} receivedStatusCode={code} />
                        {/each}
                    </status-code-list>
                </div>
            {/each}
        </list-container>
    </div>
</status-codes-view>


<style lang="postcss">
    status-codes-view {
        @apply w-full h-full py-6;
        @apply flex flex-col justify-center items-center gap-8;
    }

    list-container {
        @apply w-full flex flex-col gap-8  max-w-[1000px];
    }

    status-code-list {
        @apply w-full ;
        @apply grid gap-8;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        grid-auto-rows: 1fr;
    }
</style>
