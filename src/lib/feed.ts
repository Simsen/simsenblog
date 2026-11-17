import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from './site';
import { fullTitle, getPosts, postPath } from './posts';

/** RSS feed of all published posts. Served at /rss.xml and at /feed/ (the old WordPress address). */
export async function feedResponse(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: fullTitle(post),
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: [...post.data.categories, ...(post.data.tags ?? [])],
      author: SITE.author,
    })),
    customData: '<language>en</language>',
  });
}
