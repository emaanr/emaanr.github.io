import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const tags = z.enum([
  // Web
  'Web',
  'JavaScript',
  'TypeScript',
  'Vue',
  // Embedded
  'Embedded',
  'ESP32',
  'FreeRTOS',
  'Electronics',
  // OS
  'C',
  'Linux',
  // Mobile
  'Mobile',
  'Android',
  'Kotlin',
  'Jetpack Compose',
  // Other
  'Photography',
  'Gaming'
])

const tz = z.enum([
  'America/New_York'
])

const execProjects = defineCollection({
  loader: glob({ base: './src/content/exec', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    description: z.string(),
    image: image().optional(),
    repo: z.string().url().optional(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(tags).default([]),
    tz
  })
})

const readBlog = defineCollection({
  loader: glob({ base: './src/content/read/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(tags).default([]),
    tz
  })
})

const readNotes = defineCollection({
  loader: glob({ base: './src/content/read/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(tags).default([]),
    tz,
    group: z.string().optional(),
    order: z.number().optional()
  }).refine((data) => (data.group === undefined) === (data.order === undefined))
})

const readThoughts = defineCollection({
  loader: glob({ base: './src/content/read/thoughts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    draft: z.boolean().default(false),
    created: z.coerce.date(),
    tz
  })
})

export const collections = { execProjects, readBlog, readNotes, readThoughts }