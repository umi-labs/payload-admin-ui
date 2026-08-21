import { ChevronRightIcon } from 'lucide-react'

export type GridEntry = { slug: string; label: string }

export const CollectionGrid = ({
  entries,
  type = 'collections',
}: {
  entries: GridEntry[]
  type?: 'globals' | 'collections'
}) => {
  if (entries.length === 0) {
    return <p className="fk-dash__empty">Nothing to show here yet.</p>
  }
  return (
    <ul className="fk-dash__grid">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <a className="fk-dash__card" href={`/admin/${type}/${entry.slug}`}>
            {entry.label}
            <ChevronRightIcon size={18} />
          </a>
        </li>
      ))}
    </ul>
  )
}
