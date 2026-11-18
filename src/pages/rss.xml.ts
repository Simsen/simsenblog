import type { APIContext } from 'astro';
import { feedResponse } from '../lib/feed';

// The feed linked from every page's <head>. Same content as /feed/, served with an RSS content type.
export const GET = (context: APIContext) => feedResponse(context, { path: '/rss.xml' });
