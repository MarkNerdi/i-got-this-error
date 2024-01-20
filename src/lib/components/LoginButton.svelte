
<script lang="ts">
    import Github from '$lib/components/Github.svelte';
    import { Button } from '$lib/components/ui/button';
    import { isMobile } from '$lib/stores/window.store';
    import { signIn } from '@auth/sveltekit/client';

</script>

<Button on:click={() => signIn('github')} class="flex gap-2 font-bold">
   <Github />
    Sign In { $isMobile ? '' : ' with GitHub'}
</Button>
