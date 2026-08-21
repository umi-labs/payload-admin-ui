import type { WidgetServerProps } from 'payload'
import { CollectionsGrid } from '../components/CollectionsGrid.js'
import { labelFor } from './labels.js'

export default async function CollectionsWidget({ req, permissions }: WidgetServerProps) {
  const entries = req.payload.config.collections
    .filter((col) => !col.slug.startsWith('payload-'))
    .filter((col) => permissions?.collections?.[col.slug])
    .map((col) => ({ slug: col.slug, label: labelFor(col.labels?.plural, col.slug, req) }))

  return <CollectionsGrid entries={entries} />
}
