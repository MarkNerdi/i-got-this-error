<script lang="ts">
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

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

<Card class="h-full w-full">
    <CardHeader>
        <CardTitle>Feed</CardTitle>
        <CardDescription>Look what your friends achieved</CardDescription>
    </CardHeader>
    <CardContent class="w-full space-y-4">
        {#each feed as feedEntry}
            <div class="w-full flex flex-row justify-between lg:gap-8 gap-4">
                <div class="flex flex-row items-center gap-4">
                    <Avatar class="lg:w-12 lg:h-12 w-8 h-8">
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
                    <Avatar class="lg:w-8 lg:h-8 h-6 w-6">
                        <AvatarImage src="{feedEntry.image}" alt="{feedEntry.username}" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </a>
            </div>
        {/each}
    </CardContent>
</Card>