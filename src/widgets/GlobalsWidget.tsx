import type { WidgetServerProps } from 'payload'
import { GlobalsGrid } from '../components/GlobalsGrid.js'
import { labelFor } from './labels.js'

export default async function GlobalsWidget({ req, permissions }: WidgetServerProps) {
  const entries = req.payload.config.globals
    .filter((g) => permissions?.globals?.[g.slug])
    .map((g) => ({ slug: g.slug, label: labelFor(g.label, g.slug, req) }))

  return <GlobalsGrid entries={entries} />
}
