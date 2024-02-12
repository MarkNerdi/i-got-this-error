<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';
    import { Card } from './ui/card';
    import { activeUser } from '$lib/stores/user.store';
    import LoginButton from '$lib/components/LoginButton.svelte';
    import { applyAction, enhance } from '$app/forms';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { Pencil } from 'lucide-svelte';
    import type { ReceivedCode } from '$lib/server/users/users.types';
    import { Toggle } from '$lib/components/ui/toggle';
    import Textarea from '$lib/components/ui/textarea/textarea.svelte';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';

    export let receivedStatusCode: ReceivedCode | undefined = undefined;
    
    let editMode = false;
    
    $: code = $page.state.displayedCode;
    $: open = !!code;
</script>

<Dialog.Root bind:open onOpenChange={() => open && history.back()}>
    <Dialog.Content class="sm:max-w-[425px]">
        <form method="POST" action="/status-codes" use:enhance={() => {
            return async ({ result }) => {
                if (result.type === 'success') {
                    invalidateAll();
                    console.log('sadasdas');
                    
                    history.back();
                } else {
                    await applyAction(result);
                }
            };
        }}>
            <Dialog.Header>
                <Dialog.Title>Did you get this status code?</Dialog.Title>
                <Dialog.Description>
                    Tick it off your list!
                </Dialog.Description>
            </Dialog.Header>
            <div class="relative flex flex-col items-center gap-8 py-4">
                <Card class="size-[120px] flex flex-col items-center justify-center p-6">
                    <h3 class="text-2xl">{code}</h3>
                    <p class="text-sm text-center">{STATUS_CODES[code]?.title}</p>
                </Card>
                <Input value={code} name="code" type="hidden" />

                {#if receivedStatusCode}
                    <Toggle bind:pressed={editMode} class="absolute top-2 right-2">
                        <Pencil class="size-4" />
                    </Toggle>

                    <div class="w-full flex flex-col gap-2">
                        {#if editMode}
                            <Label >Let everyone know how you got this one:</Label>
                            <Textarea name="note" class="col-span-3" />
                        {:else if receivedStatusCode.note}
                            <Label >How you described this one:</Label>
                            <p class="text-sm text-muted-foreground">{receivedStatusCode.note}</p>
                        {/if}
                    </div>
                {:else}
                    {#if $activeUser}
                        <div class="w-full flex flex-col gap-2">
                            <Label >Let everyone know how you got this one</Label>
                            <Textarea name="note" class="col-span-3" />
                        </div>
                    {:else}
                        <p class="text-xl">To track your progress, please first sign up!</p>
                    {/if}
                {/if}
            </div>
            <Dialog.Footer>
                {#if $activeUser}
                    {#if receivedStatusCode && editMode}
                         <Button type="submit">Update</Button>
                    {:else if !receivedStatusCode}
                        <Button type="submit">{receivedStatusCode ? 'Remove from list' : 'Add to list'}</Button>
                    {/if}
                {:else}
                    <LoginButton />
                {/if}
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>