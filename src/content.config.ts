import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, ICON_NAMES } from './lib/site';

/**
 * One Markdown file per article in src/content/blog/.
 * The file name (without .md) becomes the URL slug: /YYYY/MM/DD/<file-name>/
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** Headline used in lists, the browser tab and the article page. */
    title: z.string().min(1),
    /** Optional second headline line on the article page, shown in light blue. */
    subtitle: z.string().optional(),
    /** Short summary shown in the expandable homepage preview. */
    description: z.string().min(1),
    /** Optional longer introduction under the article headline. Defaults to description. */
    lead: z.string().optional(),
    /** Publish date, YYYY-MM-DD. Also forms the URL. */
    date: z.coerce.date(),
    /** Drive the homepage topic filters. */
    categories: z.array(z.enum(CATEGORIES)).min(1),
    /** Free-text topics shown under the title, e.g. [Intune, Compliance]. Defaults to categories. */
    tags: z.array(z.string()).optional(),
    /** Small icon in the homepage list. */
    icon: z.enum(ICON_NAMES).default('article'),
    featured: z.boolean().default(false),
    /** Share image for LinkedIn/X/aggregators and the RSS feed. Defaults to the first image in the post. */
    image: z.string().optional(),
    /** true = left out of every page, the homepage and search. Still public in the Git repo. */
    draft: z.boolean().default(false),
    /** Override the generated URL, e.g. "/2021/10/04/old-wordpress-slug/". */
    permalink: z
      .string()
      .regex(/^\/[a-z0-9\-_/]*\/$/, 'permalink must start and end with "/" and use lowercase letters, numbers, dashes and underscores')
      .optional(),
    /** Optional project banner and action buttons at the top/bottom of the article. */
    project: z
      .object({
        name: z.string(),
        suffix: z.string().optional(),
        tagline: z.string().optional(),
        icon: z.enum(ICON_NAMES).default('code'),
        links: z
          .array(z.object({ label: z.string(), url: z.string().url(), primary: z.boolean().default(false) }))
          .default([]),
      })
      .optional(),
    /**
     * Posts migrated from WordPress. Keeps the RSS feed identical for existing subscribers and sites
     * that read it: the old item ID (guid, exactly as WordPress wrote it), the exact publish time, and the old category feeds
     * (/category/<slug>/feed/) the post belonged to. Leave it out on new posts.
     */
    wordpress: z
      .object({
        guid: z.string().min(1),
        published: z.coerce.date(),
        categories: z.array(z.string()).default([]),
      })
      .optional(),
    /** While the archive is being migrated: link to the article on the old WordPress site. */
    original: z.string().url().optional(),
  }),
});

export const collections = { blog };
