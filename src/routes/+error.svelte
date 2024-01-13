<script lang="ts">
    import { page } from '$app/stores';
</script>

<main class="error-page flex-center">
    <div class="flex-center flex-column">
        <h2>404</h2>
        <h3>{$page.error?.message}</h3>
        <h3>Congratulations! You got a 404.</h3>
    </div>
</main>

<style lang="postcss">
    h2 {
        font-size: 30px;
    }

    h3 {
        font-size: 22px;
        margin-bottom: 20px;
    }
</style>
