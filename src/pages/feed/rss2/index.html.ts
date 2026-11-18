import type { APIContext } from 'astro';
import { feedResponse } from '../../../lib/feed';

// Old WordPress feed address /feed/rss2/: the same RSS feed as /feed/.
export const GET = (context: APIContext) => feedResponse(context, { path: '/feed/rss2/' });
