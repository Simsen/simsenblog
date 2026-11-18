import type { APIContext } from 'astro';
import { WP_CATEGORIES, feedResponse, wpCategories } from '../../../../lib/feed';
import { SITE } from '../../../../lib/site';

// Old WordPress category feeds, e.g. /category/macos/feed/: the latest posts in that category.
export function getStaticPaths() {
  return Object.keys(WP_CATEGORIES).map((slug) => ({ params: { slug } }));
}

export const GET = (context: APIContext) => {
  const slug = context.params.slug!;
  return feedResponse(context, {
    path: `/category/${slug}/feed/`,
    title: `${WP_CATEGORIES[slug]} – ${SITE.title}`,
    filter: (post) => wpCategories(post).includes(slug),
  });
};
