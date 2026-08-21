'use client'
import React from 'react'
import { CollapsibleSection } from './CollapsibleSection.js'
import { CollectionGrid, type GridEntry } from './CollectionGrid.js'

export const CollectionsGrid = ({ entries }: { entries: GridEntry[] }) => {
  const [search, setSearch] = React.useState<string | null>(null)
  const filtered = entries.filter((e) =>
    search ? e.label.toLowerCase().includes(search.toLowerCase()) : true,
  )
  return (
    <CollapsibleSection title="Collections" search searchValue={search} onSearchChange={setSearch}>
      <CollectionGrid entries={filtered} />
    </CollapsibleSection>
  )
}
