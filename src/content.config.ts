import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const tags = z.enum([
  'Web',
  'JavaScript',
  'TypeScript',
  'Vue',
  'Embedded',
  'C',
  'Linux',
  'Electronics',
  'ESP32',
  'FreeRTOS',
  'Mobile',
  'Kotlin',
  'Jetpack Compose'
])

const execProjects = defineCollection({
  loader: glob({ base: './src/content/exec/projects', pattern: '**/*.md' }),
  schema: z.object({
    draft: z.boolean().default(false),
    name: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(tags).default([])
  })
})

const readBlog = defineCollection({
  loader: glob({ base: './src/content/read/blog', pattern: '**/*.md' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(tags).default([])
  })
})

const readNotes = defineCollection({
  loader: glob({ base: './src/content/read/notes', pattern: '**/*.md' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(tags).default([])
  })
})

const readThoughts = defineCollection({
  loader: glob({ base: './src/content/read/thoughts', pattern: '**/*.md' }),
  schema: z.object({
    draft: z.boolean().default(false),
    created: z.coerce.date()
  })
})

export const collections = { execProjects, readBlog, readNotes, readThoughts }