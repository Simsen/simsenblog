import type { APIContext } from 'astro';
import { feedResponse } from '../../lib/feed';

// WordPress served its feed at /feed/. GitHub Pages serves that folder's index.html,
// so the same RSS XML is written there and existing subscribers keep receiving posts.
export const GET = (context: APIContext) => feedResponse(context);
