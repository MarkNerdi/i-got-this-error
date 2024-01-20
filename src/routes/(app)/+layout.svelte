<script lang="ts">
    import { goto } from '$app/navigation';
    import LoginButton from '$lib/components/LoginButton.svelte';
    import SideBarMenu from '$lib/components/SideBarMenu.svelte';
    import UserNav from '$lib/components/UserNav.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Input } from '$lib/components/ui/input';
    import { activeUser } from '$lib/stores/user.store';
    import { isMobile } from '$lib/stores/window.store';
    import { goToExternalLink } from '$lib/utils/general';
    import { ExternalLink } from 'lucide-svelte';

</script>

<div class="flex flex-col h-screen w-screen">
    <header>
        <div class="flex justify-between items-center gap-4">
            {#if $isMobile}
                <SideBarMenu />
            {:else}
                <a href="/">
                    <h2 class="text-3xl">{'<i-got-this-error />'}</h2>
                </a>
                <div class="flex items-center gap-4">
                    {#if $activeUser}
                        <Button on:click={() => goto('/profile')} variant="link">My Profile</Button>
                    {/if}
                    <Button on:click={() => goto('/status-codes')} variant="link">Status codes</Button>
                    <Button on:click={() => goto('/devs')} variant="link">Community</Button>
                    <Button on:click={() => goToExternalLink('https://github.com/MarkNerdi/i-got-this-error')} variant="link">
                        Contribute!
                        <ExternalLink class="w-4 h-4 ml-1" />
                    </Button>
                </div>
            {/if}
        </div>
        <div class="flex justify-between items-center gap-4">
            <form action="/devs"  >
                <Input placeholder="Search other devs" name="search" required />
            </form>
            {#if !$activeUser}
                <LoginButton />
            {:else if !$isMobile}
                <UserNav user={$activeUser}/>
            {/if}
        </div>
    </header>

    <main class="p-5 overflow-hidden">
        <slot />
    </main>
</div>

<style lang="postcss">
    header {
        @apply h-[70px] p-4;
        @apply flex justify-between items-center gap-4;
        @apply bg-white dark:bg-black;
        @apply border-b border-solid border-border ;
    }

    main {
        @apply flex-grow w-full flex items-center justify-center;
    }
</style>
