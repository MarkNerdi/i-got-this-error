<script lang="ts">
    import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
    import { Button } from '$lib/components/ui/button';
    import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '$lib/components/ui/dropdown-menu';
    import type { UserModel } from '$lib/server/users/users.types';
    import { signOut } from '@auth/sveltekit/client';
    import { toggleMode } from 'mode-watcher';

    export let user: UserModel;
    export let expanded: boolean = false;
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative lg:p-0 lg:rounded-full">
            <div class="flex flex-row items-center gap-4">
                <Avatar class="size-8">
                    <AvatarImage src="{user.image}" alt="{user.username}" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {#if expanded}
                    <div class="flex flex-col items-start space-y-1">
                        <h2>{user.username}</h2>
                        <p class="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                {/if}
            </div>
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-56" align="end">
		<DropdownMenuLabel class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.username}</p>
				<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
			</div>
		</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuItem on:click={() => toggleMode()} class="cursor-pointer">
            Switch theme
		</DropdownMenuItem>
		<DropdownMenuItem on:click={() => signOut()} class="cursor-pointer">
			Log out
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>