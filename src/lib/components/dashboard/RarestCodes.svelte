<script lang="ts">
    import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
    import type { StatusCode } from '$lib/server/status/status-code.type';

    export let statusCodes: (StatusCode & { percentage: number })[];
</script>

<Card class="h-full w-full">
    <CardHeader>
        <CardTitle>Rarest status codes</CardTitle>
        <CardDescription>Only for the most experienced devs</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
        {#each statusCodes as statusCode}
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