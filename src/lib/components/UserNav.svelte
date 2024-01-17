<script lang="ts">
    import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
    import { Button } from '$lib/components/ui/button';
    import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '$lib/components/ui/dropdown-menu';
    import type { User } from '$lib/server/users/users.types';
    import { signOut } from '@auth/sveltekit/client';

    export let user: User;
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar class="h-8 w-8">
				<AvatarImage src="{user.image}" alt="{user.username}" />
				<AvatarFallback>SC</AvatarFallback>
			</Avatar>
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
		<DropdownMenuItem on:click={() => signOut()} class="cursor-pointer">
			Log out
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>