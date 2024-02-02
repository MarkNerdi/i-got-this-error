<script lang="ts">
    import Feed from '$lib/components/dashboard/Feed.svelte';
    import RarestCodes from '$lib/components/dashboard/RarestCodes.svelte';
    import StatusOfTheDay from '$lib/components/dashboard/StatusOfTheDay.svelte';
    import WhatIsThis from '$lib/components/dashboard/WhatIsThis.svelte';
    import { metaTags } from '$lib/constants/metadata.constant.js';
    import { MetaTags } from 'svelte-meta-tags';
    
    export let data;
</script>

<MetaTags {...metaTags} title='Track your progress' />

<home-view>
    <div class="w-full grid gap-16 grid-cols-6">
        <WhatIsThis />
        <Feed statusCodes={data.rarestStatusCodes} />
        <RarestCodes statusCodes={data.rarestStatusCodes} />
        <StatusOfTheDay code={data.todaysStatusCode.code} />
    </div>
</home-view>

<style lang="postcss">
    home-view {
        @apply w-full h-full max-w-[1200px];
        @apply flex flex-col justify-center items-center gap-16;
    }
</style>
