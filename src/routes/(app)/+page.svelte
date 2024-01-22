<script lang="ts">
    import { AvatarFallback } from '$lib/components/ui/avatar';
    import Avatar from '$lib/components/ui/avatar/avatar.svelte';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    
    export let data;
</script>

<home-view>
    <div class="w-full grid gap-16 grid-cols-6">
        <Card class="col-span-2">
            <CardHeader>
                <CardTitle>What is this?</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-6">
                <CardDescription class="space-y-8">
                    <p class="text-lg">
                        <span class="font-bold">{'<i-got-this-error/>'}</span> is an objective measurement for your tech experience.
                    </p>
                    <p class="text-lg">
                        Track your career progress, compare yourself to your friends and show them who's better!
                    </p>
                </CardDescription>
            </CardContent>
        </Card>
        <Card class="col-span-4">
            <CardHeader>
                <CardTitle>Feed</CardTitle>
                <CardDescription>Look what your friends achieved</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6">
                {#each data.rarestStatusCodes as statusCode}
                    <div class="w-full flex flex-row justify-between">
                        <div class="w-full flex flex-row items-center">
                            <Avatar class="w-8 h-8">
                                <AvatarFallback>{statusCode.code}</AvatarFallback>
                            </Avatar>
                            <h3 class="text-base ml-4">{STATUS_CODES[statusCode.code]?.title}</h3>
                        </div>
                        <p class="text-base">{statusCode.percentage}%</p>
                    </div>
                {/each}
            </CardContent>
        </Card>
        <Card class="col-span-4">
            <CardHeader>
                <CardTitle>Rarest status codes</CardTitle>
                <CardDescription>Only for the most experienced devs</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6">
                {#each data.rarestStatusCodes as statusCode}
                    <div class="w-full flex flex-row justify-between">
                        <div class="w-full flex flex-row items-center">
                            <Avatar class="w-8 h-8">
                                <AvatarFallback>{statusCode.code}</AvatarFallback>
                            </Avatar>
                            <h3 class="text-base ml-4">{STATUS_CODES[statusCode.code]?.title}</h3>
                        </div>
                        <p class="text-base">{statusCode.percentage}%</p>
                    </div>
                {/each}
            </CardContent>
        </Card>
        <Card class="col-span-2">
            <CardHeader>
                <CardTitle>Status of the Day</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-6">
                <div class="flex flex-col justify-center items-center p-6 h-full gap-2">
                    <h3 class="text-2xl">{data.todaysStatusCode.code}</h3>
                    <p class="text-sm text-muted-foreground">{STATUS_CODES[data.todaysStatusCode.code]?.title}</p>
                </div>
                <CardDescription>
                    {STATUS_CODES[data.todaysStatusCode.code]?.description}
                </CardDescription>
            </CardContent>
        </Card>
    </div>
</home-view>

<style lang="postcss">
    home-view {
        @apply w-full h-full max-w-[1200px];
        @apply flex flex-col justify-center items-center gap-16;
    }
</style>
