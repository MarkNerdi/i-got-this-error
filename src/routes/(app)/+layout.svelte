<script lang="ts">
    import { goto } from '$app/navigation';
    import LoginButton from '$lib/components/LoginButton.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Input } from '$lib/components/ui/input';
    import { activeUser } from '$lib/stores/user.store';
    import { signOut } from '@auth/sveltekit/client';

    const appName = '<i-got-this-error />';

</script>

<div class="flex flex-col h-screen w-screen">
    <header>
        <div class="flex justify-between items-center gap-4">
            <a href="/">
                <h2 class="text-3xl">{appName}</h2>
            </a>
            <div class="flex items-center gap-4">
                <Button on:click={() => goto('/profile')} variant="link">My Profile</Button>
                <Button on:click={() => goto('/status-codes')} variant="link">Status codes</Button>
                <Button on:click={() => goto('/about')} variant="link">About</Button>
            </div>
        </div>
        <div class="flex justify-between items-center gap-4">
            <Input placeholder="Search other devs" />
            {#if !$activeUser}
                <LoginButton />
            {:else}
                <Button variant="secondary" on:click={() => signOut()}>Logout</Button>
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
