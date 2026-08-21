'use client'
import { CollapsibleSection } from './CollapsibleSection.js'
import { CollectionGrid, type GridEntry } from './CollectionGrid.js'

export const GlobalsGrid = ({ entries }: { entries: GridEntry[] }) => (
  <CollapsibleSection title="Site wide">
    <CollectionGrid entries={entries} type="globals" />
  </CollapsibleSection>
)
