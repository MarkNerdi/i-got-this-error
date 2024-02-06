<script lang="ts">
    import Feed from '$lib/components/dashboard/Feed.svelte';
    import LoginCard from '$lib/components/dashboard/LoginCard.svelte';
    import RarestCodes from '$lib/components/dashboard/RarestCodes.svelte';
    import StatusOfTheDay from '$lib/components/dashboard/StatusOfTheDay.svelte';
    import WhatIsThis from '$lib/components/dashboard/WhatIsThis.svelte';
    import { metaTags } from '$lib/constants/metadata.constant.js';
    import { activeUser } from '$lib/stores/user.store.js';
    import { isDesktop } from '$lib/stores/window.store.js';
    import { MetaTags } from 'svelte-meta-tags';
    
    export let data;
</script>

<MetaTags {...metaTags} title='Track your progress' />

<home-view>
    <div class="w-full grid lg:gap-8 gap-4 lg:grid-cols-6 grid-cols-1 lg:p-8 p-4 overflow-auto">
        {#if $isDesktop}
            <div class="lg:col-span-2">
                <WhatIsThis />
            </div>
            <div class="lg:col-span-4">
                {#if $activeUser}
                    <Feed feed={data.feed} />
                {:else}
                    <LoginCard />
                {/if}
            </div>
            <div class="lg:col-span-3">
                <RarestCodes statusCodes={data.rarestStatusCodes} />
            </div>
            <div class="lg:col-span-3">
                <StatusOfTheDay code={data.todaysStatusCode.code} />
            </div>
        {:else}
            {#if $activeUser}
                <Feed feed={data.feed} />
            {:else}
                <WhatIsThis />
                <LoginCard />
            {/if}
            <StatusOfTheDay code={data.todaysStatusCode.code} />
            {#if $activeUser}
                <WhatIsThis />
            {/if}
            <RarestCodes statusCodes={data.rarestStatusCodes} />
        {/if}
    </div>
</home-view>

<style lang="postcss">
    home-view {
        @apply size-full max-w-[1200px];
        @apply flex flex-col justify-center items-center gap-16;
    }
</style>
