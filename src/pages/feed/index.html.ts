import type { APIContext } from 'astro';
import { feedResponse } from '../../lib/feed';

// The WordPress feed address. GitHub Pages serves a folder's index.html, so the RSS XML is written
// there and existing subscribers keep receiving posts. See src/lib/feed.ts for all feed addresses.
export const GET = (context: APIContext) => feedResponse(context, { path: '/feed/' });
