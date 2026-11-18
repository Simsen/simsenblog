import type { APIContext } from 'astro';
import { feedResponse } from '../../../lib/feed';
import { SITE } from '../../../lib/site';

// WordPress had a comments feed. The new site has no comments, so it stays valid but empty.
export const GET = (context: APIContext) =>
  feedResponse(context, { path: '/comments/feed/', title: `Comments for ${SITE.title}`, empty: true });
