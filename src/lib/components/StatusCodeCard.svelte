<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';
    import type { StatusCode } from '$lib/server/status/status-code.type';
    import { Card } from './ui/card';
    import { activeUser } from '$lib/stores/user.store';
    import LoginButton from '$lib/components/LoginButton.svelte';

    export let statusCode: StatusCode;

</script>

<Dialog.Root>
    <Dialog.Trigger >
        <Card class="flex flex-col justify-center items-center p-6 hover:bg-secondary cursor-pointer h-full gap-2">
            <h3 class="text-2xl">{statusCode.code}</h3>
            <p class="text-sm text-muted-foreground">{statusCode.title}</p>
        </Card>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <form method="POST">
            <Dialog.Header>
                <Dialog.Title>Did you get this status code?</Dialog.Title>
                <Dialog.Description>
                    Tick it off your list!
                </Dialog.Description>
            </Dialog.Header>
            <div class="flex flex-col items-center gap-8 py-4">
                <Card class="w-[120px] h-[120px] flex flex-col items-center justify-center p-6">
                    <h3 class="text-2xl">{statusCode.code}</h3>
                    <p class="text-sm text-center">{statusCode.title}</p>
                </Card>
                {#if $activeUser}
                    <div class="w-full flex flex-col gap-2">
                        <Label >Let everyone know how you got this one</Label>
                        <Input name="note" class="col-span-3" />
                    </div>
                    <Input value={statusCode.code} name="code" type="hidden" />

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