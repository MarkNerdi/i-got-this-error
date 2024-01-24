<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import PaginationFooter from '$lib/components/PaginationFooter.svelte';
    import { Card } from '$lib/components/ui/card/index.js';
    import { metaTags } from '$lib/constants/metadata.constant.js';
    import { Users } from 'lucide-svelte';
    import { MetaTags } from 'svelte-meta-tags';

    export let data;

    function gotoPage(pageNumber: number) {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set('page', pageNumber.toString());
            
        goto(`?${query.toString()}`);
    }
</script>

<MetaTags {...metaTags} title='Community' />

<users-view>
    <div class="w-full flex flex-row justify-between align-center">
        <h2 class="text-3xl font-bold">Devs ⋅ {data.users.total}</h2>
    </div>

    <user-list>
        {#each data.users.list as user}
            <Card on:click={() => goto(`/profile/${user.username}`)} class="flex flex-col justify-center items-center p-6 hover:bg-secondary cursor-pointer gap-2">
                <img src={user.image} alt={user.username} class="w-24 h-24 rounded-full" />
                <p class="text-center font-bold">{user.username}</p>
            </Card>
        {:else}
            <div class="h-full w-full flex flex-col justify-center items-center p-6 gap-2">
                <Users class="w-20 h-20 mb-4" />
                <h3 class="text-lg font-semibold">No users found</h3>
                <p class="text-sm text-muted-foreground">
                    There's no user called like this.
                </p>
            </div>
        {/each}
    </user-list>
    {#if data.users.list.length}
        <PaginationFooter count={data.users.total} onPageClick={gotoPage} />
    {/if}
</users-view>


<style lang="postcss">
    users-view {
        @apply w-full h-full max-w-[1000px] p-6;
        @apply flex flex-col justify-center items-start gap-8;
    }

    user-list {
        @apply w-full flex-grow;
        @apply flex flex-wrap gap-16 justify-start items-start;
    }
</style>
