import { page } from '$app/stores';
import type { UserModel } from '$lib/server/users/users.types';
import { derived, type Readable } from 'svelte/store';

export const activeUser: Readable<UserModel | undefined> = derived([page], ([page]) => page.data.session?.user as UserModel ?? undefined);
