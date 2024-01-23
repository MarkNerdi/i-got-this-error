<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';
    import type { StatusCode } from '$lib/server/status/status-code.type';
    import { Card } from './ui/card';
    import { activeUser } from '$lib/stores/user.store';
    import LoginButton from '$lib/components/LoginButton.svelte';
    import type { ReceivedCode } from '$lib/server/users/users.types';
    import { applyAction, enhance } from '$app/forms';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { CheckIcon } from 'lucide-svelte';

    export let statusCode: StatusCode | ReceivedCode;
    export let isReceived = false;

    let open = false;
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger >
        <Card class="relative flex flex-col justify-center items-center p-6 hover:bg-secondary cursor-pointer h-full gap-2">
            <h3 class="text-2xl">{statusCode.code}</h3>
            <p class="text-sm text-muted-foreground">{STATUS_CODES[statusCode.code]?.title}</p>
            {#if isReceived}
                <CheckIcon class="absolute top-2 right-2 w-5 h-5" />
            {/if}
        </Card>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <form method="POST" use:enhance={() => {
            return async ({ result }) => {
                if (result.type === 'success') {
                    open = false;
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
            <div class="flex flex-col items-center gap-8 py-4">
                <Card class="w-[120px] h-[120px] flex flex-col items-center justify-center p-6">
                    <h3 class="text-2xl">{statusCode.code}</h3>
                    <p class="text-sm text-center">{STATUS_CODES[statusCode.code]?.title}</p>
                </Card>
                {#if $activeUser}
                    <div class="w-full flex flex-col gap-2">
                        <Label >Let everyone know how you got this one</Label>
                        <Input name="note" class="col-span-3" />
                    </div>
                    <Input value={statusCode.code} name="code" type="hidden" textarea />

                    {:else}
                    <p class="text-xl">To track your progress, please first sign up!</p>
                {/if}
            </div>
            <Dialog.Footer>
                {#if $activeUser}
                    <Button type="submit">Add to list</Button>
                {:else}
                    <LoginButton />
                {/if}
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>