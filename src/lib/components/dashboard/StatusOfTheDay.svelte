<script lang="ts">
    import { STATUS_CODES } from '$lib/constants/status-codes.constant';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

    export let code: string;
</script>

<Card class="size-full">
    <CardHeader>
        <CardTitle>Status of the Day</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-6">
        <div class="flex flex-col justify-center items-center p-6 h-full gap-2">
            <h3 class="text-2xl">{code}</h3>
            <p class="text-sm text-muted-foreground">{STATUS_CODES[code]?.title}</p>
        </div>
        <CardDescription class="text-center">
            {STATUS_CODES[code]?.description}
        </CardDescription>
    </CardContent>
</Card>