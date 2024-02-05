<script lang="ts">
	import { cn } from '$lib/utils';
	import { MoreHorizontal } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<span
	aria-hidden
	class={cn('flex size-9 items-center justify-center', className)}
	{...$$restProps}
>
	<MoreHorizontal class="size-4" />
	<span class="sr-only">More pages</span>
</span>
