<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';
    import type { StatusCode } from '$lib/server/status/status-code.type';
    import { Card } from './ui/card';

    export let statusCode: StatusCode;
</script>

<Dialog.Root>
    <Dialog.Trigger >
        <Card class="flex flex-col items-center p-6 hover:bg-secondary cursor-pointer" on:click={() => console.log(statusCode)} >
            <h3 class="text-2xl">{statusCode.code}</h3>
            <p class="text-sm">{statusCode.title}</p>
        </Card>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
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
            <div class="w-full flex flex-col gap-2">
                <Label >Let everyone know how you got this one</Label>
                <Input value="" class="col-span-3" />
            </div>
        </div>
        <Dialog.Footer>
            <Button>Add to list</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>