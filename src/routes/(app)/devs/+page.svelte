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
        <h2 class="lg:text-3xl font-bold text-xl">Devs ⋅ {data.users.total}</h2>
    </div>

    <div class="w-full flex-grow">
        {#if data.users.list.length}
            <user-list>
                {#each data.users.list as user}
                    <a href="/profile/{user.username}" data-sveltekit-preload-data="hover">
                        <Card class="flex flex-col justify-center items-center lg:p-6 p-4 hover:bg-secondary cursor-pointer gap-2">
                            <img src={user.image} alt={user.username} class="lg:size-24 size-16 rounded-full" />
                            <p class="text-center font-bold lg:text-base text-sm">{user.username}</p>
                        </Card>
                    </a>
                {/each}
            </user-list>
        {:else}
            <div class="size-full flex flex-col justify-center items-center p-6 gap-2">
                <Users class="lg:size-20 size-8 mb-4" />
                <h3 class="text-lg font-semibold">No users found</h3>
                <p class="text-sm text-muted-foreground">
                    There's no user called like this.
                </p>
            </div>
        {/if}
    </div>
    {#if data.users.list.length}
        <PaginationFooter count={data.users.total} onPageClick={gotoPage} />
    {/if}
</users-view>


<style lang="postcss">
    users-view {
        @apply size-full max-w-[1200px] lg:p-6 p-4;
        @apply flex flex-col justify-center items-start lg:gap-8 gap-4;
    }

    user-list {
        @apply w-full;
        @apply grid grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-4;
    }
</style>
