<script lang="ts">
    import * as Pagination from '$lib/components/ui/pagination';
    import { PAGE_SIZE } from '$lib/constants/page-size.constant';
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';
    
    export let count: number;
    export let onPageClick: (page: number) => void;
</script>

<Pagination.Root {count} perPage={PAGE_SIZE} siblingCount={1} let:pages let:currentPage>
    <Pagination.Content>
        <Pagination.Item>
        <Pagination.PrevButton on:click={() => onPageClick((currentPage ?? 0) - 1)}>
            <ChevronLeft class="size-4" />
            <span class="hidden sm:block">Previous</span>
        </Pagination.PrevButton>
        </Pagination.Item>
        {#each pages as page (page.key)}
        {#if page.type === 'ellipsis'}
            <Pagination.Item>
            <Pagination.Ellipsis />
            </Pagination.Item>
        {:else}
            <Pagination.Item>
                <Pagination.Link {page} isActive={currentPage === page.value} on:click={() => onPageClick(page.value)}>
                    {page.value}
                </Pagination.Link>
            </Pagination.Item>
        {/if}
        {/each}
        <Pagination.Item>
        <Pagination.NextButton on:click={() => onPageClick((currentPage ?? 0) + 1)}>
            <span class="hidden sm:block">Next</span>
            <ChevronRight class="size-4" />
        </Pagination.NextButton>
        </Pagination.Item>
    </Pagination.Content>
</Pagination.Root>