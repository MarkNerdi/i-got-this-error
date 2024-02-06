<script lang="ts">
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { MessageSquare } from 'lucide-svelte';

    type FeedEntry = {
        username: string;
        image: string;
        receivedCode: { code: string; note: string; receivedAt: number };
    };

    export let feed: FeedEntry[];


    function getDateString(timestamp: number): string {
        const date = new Date(timestamp);
        const timediff = Date.now() - date.getTime();
        const days = Math.floor(timediff / (1000 * 60 * 60 * 24));

        if (days < 1) {
            return 'Today';
        }
        if (days < 2) {
            return 'Yesterday';
        }
        if (days < 7) {
            return 'Last week';
        }
        if (days < 31) {
            return 'Last month';
        }
        if (days < 365) {
            return 'Last year';
        }
        return 'Long time ago';
    }

</script>

<Card class="size-full">
    <CardHeader>
        <CardTitle>Feed</CardTitle>
        <CardDescription>Look what your friends achieved</CardDescription>
    </CardHeader>
    <CardContent class="w-full space-y-4">
        {#if feed.length}
            {#each feed as feedEntry}
                <div class="w-full flex flex-row justify-between lg:gap-8 gap-4">
                    <div class="flex flex-row items-center gap-4">
                        <Avatar class="lg:size-12 size-8">
                            <AvatarFallback>{feedEntry.receivedCode.code}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 class="lg:text-base text-sm">{STATUS_CODES[feedEntry.receivedCode.code]?.title}</h3>
                            <p class="lg:text-sm text-xs text-muted-foreground text-ellipsis line-clamp-1">{feedEntry.receivedCode.note}</p>
                        </div>
                    </div>
                    
                    <a class="flex flex-row items-center gap-2" href="/profile/{feedEntry.username}" data-sveltekit-preload-data="hover">
                        <div class="text-right">
                            <h3 class="lg:text-sm text-xs">{feedEntry.username}</h3>
                            <p class="col-span-1 lg:text-xs text-xs text-muted-foreground">{getDateString(feedEntry.receivedCode.receivedAt)}</p>
                        </div>
                        <Avatar class="lg:size-8 size-6">
                            <AvatarImage src="{feedEntry.image}" alt="{feedEntry.username}" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </a>
                </div>
            {/each}
        {:else}
             <div class="size-full flex flex-col justify-center items-center p-6 gap-2">
                <MessageSquare class="lg:size-16 size-8 mb-4" />
                <h3 class="text-lg font-semibold">Empty</h3>
                <p class="text-sm text-muted-foreground">
                    There are no feed entries yet.
                </p>
            </div>
        {/if}
    </CardContent>
</Card>