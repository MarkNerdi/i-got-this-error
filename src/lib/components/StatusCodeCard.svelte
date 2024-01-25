<script lang="ts">
    import { Card } from './ui/card';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { CheckIcon } from 'lucide-svelte';

    export let code: string;
    export let isReceivedByActiveUser: boolean = false;
    export let hoverAnimation: boolean = true;
</script>

<Card class="relative h-full flex flex-col gap-2 justify-center items-center p-6 {hoverAnimation ? 'hover:bg-secondary cursor-pointer' : ''}">
    <h3 class="text-2xl">{code}</h3>
    <p class="text-sm text-muted-foreground text-center">{STATUS_CODES[code]?.title}</p>
    {#if !!isReceivedByActiveUser}
        <CheckIcon class="absolute top-2 right-2 w-5 h-5" />
    {/if}
</Card>
