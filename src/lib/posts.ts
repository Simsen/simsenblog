import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const pad = (n: number) => String(n).padStart(2, '0');

/** Public path of a post: its permalink, or /YYYY/MM/DD/<file-name>/ like WordPress. */
export function postPath(post: Post): string {
  if (post.data.permalink) return post.data.permalink;
  const d = post.data.date;
  return `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${post.id}/`;
}

/** Published posts, newest first. Drafts are visible only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, month: 'short' | 'long' = 'short'): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month, year: 'numeric', timeZone: 'UTC' });
}

export function topics(post: Post): string {
  return (post.data.tags ?? post.data.categories).join(' · ');
}

/** Title as one line, for lists and the browser tab: "Title — Subtitle". */
export function fullTitle(post: Post): string {
  return post.data.subtitle ? `${post.data.title} — ${post.data.subtitle}` : post.data.title;
}
