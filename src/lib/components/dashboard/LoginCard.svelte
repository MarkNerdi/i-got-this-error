<script lang="ts">
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
    import LoginButton from '$lib/components/LoginButton.svelte';
</script>

<Card class="size-full">
    <CardHeader>
        <CardTitle>Welcome developer!</CardTitle>
        <CardDescription>Track your progress</CardDescription>
    </CardHeader>
    <CardContent class="w-full flex flex-col justify-between lg:gap-8 gap-4">
        <CardDescription>
            <p class="lg:text-lg text-base">
                Ready to track your coding progress? Sign up for your account now and start keeping tabs on your HTTP status codes. Join us and connect with fellow developers!
            </p>
        </CardDescription>
        <div class="flex justify-center w-full">
            <LoginButton />
        </div>
    </CardContent>
</Card>