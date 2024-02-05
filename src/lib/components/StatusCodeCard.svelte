<script lang="ts">
    import { Card } from './ui/card';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { CheckIcon } from 'lucide-svelte';

    export let code: string;
    export let isReceivedByActiveUser: boolean = false;
    export let hoverAnimation: boolean = true;
</script>

<Card class="relative h-full flex flex-col lg:gap-2 gap-1 justify-center items-center lg:p-6 p-4 {hoverAnimation ? 'hover:bg-secondary cursor-pointer' : ''}">
    <h3 class="lg:text-2xl text-xl">{code}</h3>
    <p class="lg:text-sm text-xs text-muted-foreground text-center">{STATUS_CODES[code]?.title}</p>
    {#if !!isReceivedByActiveUser}
        <CheckIcon class="absolute top-2 right-2 size-5" />
    {/if}
</Card>
