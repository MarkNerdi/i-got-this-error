import { toast } from 'svelte-sonner';

export async function share(title: string, link: string = window.location.href) {
    if (window.navigator?.share) {
        await window.navigator.share({ title, text: link });
    } else if (window.navigator?.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            toast.success('Link copied to clipboard');
        });
    }
}

export function goToExternalLink(link: string) {
    window.open(link, '_blank', 'noopener, noreferrer');
}

export function getDateAsNumber(date: Date) {
    const dateAsString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    return Number(dateAsString);
}
