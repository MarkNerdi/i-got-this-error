<script lang="ts">
    import { windowWidth } from '$lib/stores/window.store.ts';
    import { onMount } from 'svelte';
    import '../app.css';
    import { Toaster } from 'svelte-sonner';
    import { setMode } from 'mode-watcher';

    onMount(() => {
        console.log("hoioio");
        
        setMode("dark")
        $windowWidth = window.innerWidth;
        window.addEventListener('resize', () => ($windowWidth = window.innerWidth));
    });
</script>

<Toaster />
<slot />
