<script lang="ts">
    import LoginButton from '$lib/components/LoginButton.svelte';
    import SideBarMenu from '$lib/components/SideBarMenu.svelte';
    import UserNav from '$lib/components/UserNav.svelte';
    import { Input } from '$lib/components/ui/input';
    import { metaTags } from '$lib/constants/metadata.constant';
    import { activeUser } from '$lib/stores/user.store';
    import { isMobile } from '$lib/stores/window.store';
    import { ExternalLink } from 'lucide-svelte';
    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...metaTags} />

<div class="flex flex-col h-screen">
    <header>
        <div class="flex justify-between items-center gap-4">
            {#if $isMobile}
                <SideBarMenu />
            {:else}
                <a class="shrink-0" href="/" data-sveltekit-preload-data="hover">
                    <h2 class="text-2xl">{'<i-got-this-error />'}</h2>
                </a>
                <div class="flex items-center">
                    {#if $activeUser}
                        <a href="/profile" class="header-link" data-sveltekit-preload-data="hover">My Profile</a>
                    {/if}
                    <a href="/status-codes" class="header-link" data-sveltekit-preload-data="hover">Status codes</a>
                    <a href="/devs?page=1" class="header-link" data-sveltekit-preload-data="hover">Community</a>
                    <a href="https://github.com/MarkNerdi/i-got-this-error" target="_blank" rel="noreferrer noopener" class="header-link flex">
                        Contribute!
                        <ExternalLink class="size-4 ml-1" />
                    </a>
                </div>
            {/if}
        </div>
        <div class="flex justify-between items-center gap-4">
            <form action="/devs">
                <input type="hidden" name="page" value="1" />
                <Input placeholder="Search other devs" name="search" required />
            </form>
            {#if !$activeUser}
                <LoginButton />
            {:else if !$isMobile}
                <UserNav user={$activeUser} />
            {/if}
        </div>
    </header>

    <main class="overflow-hidden">
        <slot />
    </main>
</div>

<style lang="postcss">
    header {
        @apply h-[70px] p-4;
        @apply flex justify-between items-center gap-4;
        @apply bg-white dark:bg-black;
        @apply border-b border-solid border-border;
    }

    .header-link {
        @apply py-2 px-4;
        @apply text-sm underline-offset-4;
        @apply hover:underline
    }

    main {
        @apply flex-grow w-full flex items-center justify-center;
    }
</style>
