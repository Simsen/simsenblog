import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from './site';
import { fullTitle, getPosts, postPath, type Post } from './posts';

/**
 * RSS feeds. Other sites and feed readers subscribed to the WordPress feeds, so these keep the same
 * addresses and item IDs: a migrated post keeps its WordPress guid (e.g. https://www.simsenblog.dk/?p=2405)
 * and publish time, so nothing shows up as "new" again after the move.
 *
 *   /feed/  /feed/rss2/  /feed/atom/  /rss/  /rss.xml    the latest posts
 *   /category/<wordpress-slug>/feed/                     the latest posts in an old WordPress category
 *   /comments/feed/                                      empty (the new site has no comments)
 */

/** Same number of items as the WordPress feed, so older posts don't reappear as new. */
const FEED_SIZE = 8;

/** Old WordPress categories, by slug. Their feeds stay at /category/<slug>/feed/. */
export const WP_CATEGORIES: Record<string, string> = {
  'endpoint-manager': 'INTUNE / MEM',
  macos: 'macOS',
  tools: 'Tools',
  powershell: 'Powershell',
  mdfe: 'MDfE',
  avd: 'AVD / W365',
  edge: 'edge',
  msi: 'MSI',
  sccm: 'SCCM / MECM',
  'ad-gpo': 'AD / GPO',
  mcas: 'MCAS',
  mdatp: 'MDATP',
  shell: 'Shell',
};

/** New posts (no `wordpress` block) join the old category feeds through their site categories. */
const SITE_TO_WP: Record<string, string> = { Intune: 'endpoint-manager', macOS: 'macos', Tools: 'tools' };

export function wpCategories(post: Post): string[] {
  return post.data.wordpress?.categories ?? post.data.categories.map((c) => SITE_TO_WP[c]).filter(Boolean);
}

const published = (post: Post) => post.data.wordpress?.published ?? post.data.date;
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The article as HTML, with site-relative links and images made absolute so they work in any reader. */
function fullContent(post: Post, origin: string): string | undefined {
  const html = post.rendered?.html;
  if (!html) return undefined;
  return html.replace(/(\s(?:src|href|poster)=")\/(?!\/)/g, `$1${origin}/`);
}

interface FeedOptions {
  /** Path the feed is served at, for the atom:link self reference. */
  path: string;
  title?: string;
  /** Which posts to include. Defaults to all. */
  filter?: (post: Post) => boolean;
  /** Leave out every item (the comments feed). */
  empty?: boolean;
}

export async function feedResponse(context: APIContext, { path, title = SITE.title, filter, empty }: FeedOptions) {
  const site = context.site!;
  const origin = site.origin;
  const posts = empty ? [] : (await getPosts()).filter((p) => !filter || filter(p)).slice(0, FEED_SIZE);
  const newest = posts[0] ? published(posts[0]) : undefined;

  return rss({
    title,
    description: SITE.description,
    site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom', dc: 'http://purl.org/dc/elements/1.1/' },
    customData: [
      `<atom:link href="${new URL(path, site)}" rel="self" type="application/rss+xml" />`,
      '<language>en-GB</language>',
      newest ? `<lastBuildDate>${newest.toUTCString()}</lastBuildDate>` : '',
    ].join(''),
    items: posts.map((post) => {
      const wp = post.data.wordpress;
      return {
        title: fullTitle(post),
        link: postPath(post),
        pubDate: published(post),
        description: post.data.description,
        content: fullContent(post, origin),
        categories: [...post.data.categories, ...(post.data.tags ?? [])],
        customData:
          `<dc:creator>${escape(SITE.author)}</dc:creator>` +
          (wp ? `<guid isPermaLink="false">${escape(wp.guid)}</guid>` : ''),
      };
    }),
  });
}
