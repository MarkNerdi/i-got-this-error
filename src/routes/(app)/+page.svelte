<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button } from '$lib/components/ui/button';
    import { activeUser } from '$lib/stores/user.store';
</script>

<home-view>
    {#if $activeUser}
    asdasd
    {:else}
        <h1 class="text-5xl font-bold">Welcome Player!</h1>
        <h2 class="text-2xl">You're not logged in. To continue, please first create an account or log in</h2>
        <Button on:click={() => goto('/auth/signin')}>Sign in</Button>
    {/if}
    <form method="POST">
        <button>dadas</button>
    </form>
</home-view>

<style lang="postcss">
    home-view {
        @apply w-full h-full max-w-[1000px];
        @apply flex flex-col justify-center items-center gap-8;
    }
</style>
