<script lang="ts">
    import { ChevronRight, Users } from 'lucide-svelte';
    import * as Sheet from '$lib/components/ui/sheet';
    import { activeUser } from '$lib/stores/user.store';
    import { followersDrawerOpen } from '$lib/stores/followers-drawer.store';
    import * as Tabs from '$lib/components/ui/tabs';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { onMount } from 'svelte';
    import { fetchApi } from '$lib/utils/api';
    import type { UserModel } from '$lib/server/users/users.types';
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

    let followers: UserModel[] | undefined = undefined;
    let followings: UserModel[] | undefined = undefined;

    onMount(async () => {
        followers = await fetchApi('/api/followers', 'GET') as UserModel[];
        followings = await fetchApi('/api/followings', 'GET') as UserModel[];
    });
</script>

<Sheet.Root bind:open={$followersDrawerOpen}>
  <Sheet.Content side="right" class="flex flex-col px-0">
    <Sheet.Header>
        <h2 class="text-xl  px-8">Followers</h2>
    </Sheet.Header>
    <div class="w-full flex-grow flex flex-col space-y-4 py-4 overflow-hidden">
        <Tabs.Root value="followings" class="h-full flex flex-col space-y-12">
            <div class="w-full space-between flex items-center px-8">
                <Tabs.List class="w-full">
                    <Tabs.Trigger value="followings" class="w-full ">Followings</Tabs.Trigger>
                    <Tabs.Trigger value="followers" class="w-full relative">Followers</Tabs.Trigger>
                </Tabs.List>
            </div>
            <Tabs.Content value="followings" class="flex-grow overflow-hidden">
                {#if followings?.length}
                    <div class="h-full flex flex-col gap-2 overflow-auto">
                        {#each followings as following}
                            <div class="w-full px-6">
                                <a
                                    href="/profile/{following.username}"
                                    class="w-full flex flex-row justify-between items-center hover:bg-secondary p-2 rounded-md"
                                    on:click={() => $followersDrawerOpen = false}
                                    data-sveltekit-preload-data="hover"
                                >
                                    <div class="w-full flex flex-row items-center">
                                        <Avatar class="size-10">
                                            <AvatarImage src="{following.image}" alt="{following.username}" />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        <h3 class="text-base ml-4">{following.username}</h3>
                                    </div>
                                    <ChevronRight class="size-6" />
                                </a>
                            </div>
                        {/each}
                    </div>
                {:else if followings?.length === 0}
                    <div class="size-full flex flex-col justify-center items-center p-6 gap-2">
                        <Users class="lg:size-20 size-8 mb-4" />
                        <h3 class="text-lg font-semibold">No followings</h3>
                        <p class="text-sm text-muted-foreground text-center">
                            You're not following anyone yet. Check out our Community!
                        </p>
                        <a href="/devs?page=1" on:click={() => $followersDrawerOpen = false} class="px-4 py-2 underline-offset-4 hover:underline">Go to Community</a>
                    </div>
                {:else}
                    <div class="size-full flex flex-col items-center gap-2">
                        {#each Array.from({ length: 3 }) as _}
                            <div class="w-full px-6">
                                <div class="w-full flex flex-row items-center p-2 rounded-md gap-2">
                                    <Skeleton class="size-10 rounded-full" />
                                    <Skeleton class="h-4 flex-grow rounded-sm" />
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </Tabs.Content>
            <Tabs.Content value="followers" class="flex-grow">
                {#if followers?.length}
                    <div class="h-full flex flex-col gap-2 overflow-auto">
                        {#each followers as follower}
                            <div class="w-full px-6">
                                <a
                                    href="/profile/{follower.username}"
                                    class="w-full flex flex-row justify-between items-center hover:bg-secondary p-2 rounded-md"
                                    on:click={() => $followersDrawerOpen = false}
                                    data-sveltekit-preload-data="hover"
                                >
                                    <div class="w-full flex flex-row items-center">
                                        <Avatar class="size-10">
                                            <AvatarImage src="{follower.image}" alt="{follower.username}" />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        <h3 class="text-base ml-4">{follower.username}</h3>
                                    </div>
                                    <ChevronRight class="size-6" />
                                </a>
                            </div>
                        {/each}
                    </div>
                {:else if followers?.length === 0}
                    <div class="size-full flex flex-col justify-center items-center p-6 gap-2">
                        <Users class="lg:size-20 size-8 mb-4" />
                        <h3 class="text-lg font-semibold">No followers</h3>
                        <p class="text-sm text-muted-foreground text-center">
                            You don't have any followers yet.
                        </p>
                    </div>
                {:else}
                    <div class="size-full flex flex-col items-center gap-2">
                        {#each Array.from({ length: 3 }) as _}
                            <div class="w-full px-6">
                                <div class="w-full flex flex-row items-center p-2 rounded-md gap-2">
                                    <Skeleton class="size-10 rounded-full" />
                                    <Skeleton class="h-4 flex-grow rounded-sm" />
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </Tabs.Content>
        </Tabs.Root>
    </div>
  </Sheet.Content>
</Sheet.Root>

