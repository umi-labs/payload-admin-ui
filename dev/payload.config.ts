import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { adminDashboardPlugin } from '@foundrykit/payload-admin-ui'
import { seed } from './seed.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

const simple = (slug: string, singular: string, plural: string) => ({
  slug,
  labels: { singular, plural },
  admin: { useAsTitle: 'title' },
  fields: [{ name: 'title', type: 'text' as const }],
})

export default buildConfig({
  admin: {
    importMap: { baseDir: path.resolve(dirname) },
    autoLogin: { email: 'dev@payloadcms.com', password: 'test', prefillOnly: true },
  },
  collections: [
    simple('posts', 'Post', 'Posts'),
    simple('pages', 'Page', 'Pages'),
    simple('hotels', 'Hotel', 'Hotels'),
    simple('offers', 'Offer', 'Offers'),
    { slug: 'media', fields: [], upload: { staticDir: path.resolve(dirname, 'media') } },
  ],
  globals: [
    { slug: 'header', label: 'Header', fields: [{ name: 'title', type: 'text' }] },
    { slug: 'footer', label: 'Footer', fields: [{ name: 'title', type: 'text' }] },
    { slug: 'settings', label: 'Site Settings', fields: [{ name: 'title', type: 'text' }] },
  ],
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || `file:${path.resolve(dirname, 'dev.db')}` },
    push: true,
  }),
  editor: lexicalEditor(),
  onInit: async (payload) => {
    await seed(payload)
  },
  plugins: [adminDashboardPlugin()],
  secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
