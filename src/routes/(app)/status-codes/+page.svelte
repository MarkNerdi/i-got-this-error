<script lang="ts">
    import { pushState } from '$app/navigation';
    import AddStatusCodePopup from '$lib/components/AddStatusCodePopup.svelte';
    import StatusCodeCard from '$lib/components/StatusCodeCard.svelte';
    import { Input } from '$lib/components/ui/input/index.js';
    import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
    import Toggle from '$lib/components/ui/toggle/toggle.svelte';
    import { metaTags } from '$lib/constants/metadata.constant.js';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant.js';
    import type { StatusCode } from '$lib/server/status/status-code.type.js';
    import { activeUser } from '$lib/stores/user.store.js';
    import { isMobile } from '$lib/stores/window.store.js';
    import { Bird, ListFilter } from 'lucide-svelte';
    import { MetaTags } from 'svelte-meta-tags';

    export let data;

    let selectedStatusCodes = ['4xx', '5xx'];
    let searchTerm = '';
    let showFilter = false;

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

    function showCodeModal(code: string) {
        pushState('', {
            displayedCode: code,
        });
    }
</script>


<MetaTags {...metaTags} title='Status codes' />

<status-codes-view>
    <header-section>
        <div class="flex gap-8 items-center">
            <h2 class="lg:text-3xl font-bold text-xl flex-shrink-0">Status codes</h2>
            {#if $isMobile}
                <div class="flex gap-2 items-center">
                    <Toggle bind:pressed={showFilter} >
                        <ListFilter class="size-4" />
                    </Toggle>
                    <Input placeholder="Search..." bind:value={searchTerm} />
                </div>
            {/if}
        </div>
        
        {#if !$isMobile || showFilter}
            <div class="flex gap-4 items-center">
                {#if !$isMobile}
                    <Input placeholder="Search status codes" bind:value={searchTerm} />
                {/if}
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
        {/if}
    </header-section>

    <div class="size-full flex flex-row justify-center items-start overflow-auto">
        {#if Object.keys(groupedStatusCodes).length}
            <list-container>
                {#each Object.keys(groupedStatusCodes) as statusCodesGroupKey}
                    <div class="flex flex-col items-start gap-4">
                        <h3 class="lg:text-2xl text-lg">{statusCodesGroupKey}</h3>
                        <status-code-list>
                            {#each groupedStatusCodes[statusCodesGroupKey] as statusCode}
                                {@const code = $activeUser?.receivedCodes.find(code => code.code === statusCode.code)}
                                <StatusCodeCard code={statusCode.code} on:click={() => showCodeModal(statusCode.code)} isReceivedByActiveUser={!!code} />
                            {/each}
                        </status-code-list>
                    </div>
                {/each}
            </list-container>
        {:else}
            <div class="size-full flex flex-col justify-center items-center p-6 gap-2">
                <Bird class="lg:size-20 size-8 mb-4" />
                <h3 class="text-lg font-semibold">No status found</h3>
                <p class="text-sm text-muted-foreground">
                    Please search for something else.
                </p>
            </div>
        {/if}
    </div>
</status-codes-view>


<style lang="postcss">
    status-codes-view {
        @apply size-full lg:py-6 py-4;
        @apply flex flex-col justify-center items-center lg:gap-8 gap-4;
    }

    header-section {
        @apply w-full max-w-[1200px] lg:px-6 px-4;
        @apply flex lg:flex-row flex-col gap-4 justify-between items-start;
    }

    list-container {
        @apply w-full flex flex-col gap-8 max-w-[1200px] lg:px-6 px-4;
    }

    status-code-list {
        @apply w-full;
        @apply grid lg:grid-cols-6 grid-cols-3;
        @apply lg:gap-8 gap-4;
    }
</style>
