<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Code, ExternalLink, Github, Home, Menu, User2, Users } from 'lucide-svelte';
    import * as Sheet from '$lib/components/ui/sheet';
    import UserNav from '$lib/components/UserNav.svelte';
    import { activeUser } from '$lib/stores/user.store';
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import { goto } from '$app/navigation';
    import { goToExternalLink } from '$lib/utils/general';

    let open = false;

    function onMenuItemClick(route: string, external: boolean = false) {
        if (external) {
            goToExternalLink(route);
        } else {
            goto(route);
        }
        open = false;
    }
</script>

<Sheet.Root bind:open>
  <Sheet.Trigger asChild let:builder>
    <Button builders={[builder]} variant="ghost" class="px-0">
        <Menu class="w-8 h-8" />
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="left" class="flex flex-col px-2">
    <Sheet.Header>
        <h2 class="text-xl">{'<i-got-this-error />'}</h2>
    </Sheet.Header>
    <Separator />
    <div class="flex-grow flex flex-col space-y-4 py-4">
        <div class="space-y-1">
            <Button variant="ghost" class="w-full justify-start" on:click={() => onMenuItemClick('/')} >
                <Home class="w-4 h-4 mr-2" />
                Home
            </Button>
            {#if $activeUser}
                <Button variant="ghost" class="w-full justify-start" on:click={() => onMenuItemClick('/profile')} >
                    <User2 class="w-4 h-4 mr-2" />
                    My Profile
                </Button>
            {/if}
            <Button variant="ghost" class="w-full justify-start" on:click={() => onMenuItemClick('/status-codes')}>
                <Code class="w-4 h-4 mr-2" />
                Status Codes
            </Button>
            <Button variant="ghost" class="w-full justify-start" on:click={() => onMenuItemClick('/devs')}>
                <Users class="w-4 h-4 mr-2" />
                Community
            </Button>
        </div>
        <Separator />
        <div class="space-y-1">
            <Button variant="ghost" class="w-full justify-start" on:click={() => onMenuItemClick('https://github.com/MarkNerdi/i-got-this-error', true)}>
                <Github class="w-4 h-4 mr-2" />
                Contribute
                <ExternalLink class="w-4 h-4 ml-1" />
            </Button>
        </div>
    </div>
    {#if $activeUser}
        <Sheet.Footer>
            <div class="w-full">
                <UserNav user={$activeUser} expanded />
            </div>
        </Sheet.Footer>
    {/if}
  </Sheet.Content>
</Sheet.Root>

