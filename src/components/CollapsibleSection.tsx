'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon, SearchIcon } from 'lucide-react'
import React from 'react'
import { cn } from './cn.js'
import './dashboard.css'

export const CollapsibleSection = ({
  title,
  children,
  search = false,
  searchValue,
  onSearchChange,
}: {
  title: string
  children: React.ReactNode
  search?: boolean
  searchValue?: string | null
  onSearchChange?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const [open, setOpen] = React.useState(true)
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <Collapsible.Root
      defaultOpen
      className="fk-dash__section"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="fk-dash__section-trigger" style={{ cursor: 'default' }}>
        <button
          type="button"
          className="fk-dash__section-trigger"
          style={{ width: 'auto' }}
          onClick={() => setOpen((o) => !o)}
        >
          <h3 className="fk-dash__section-title">{title}</h3>
        </button>

        <div className="fk-dash__section-actions">
          {search && (
            <>
              <input
                className="fk-dash__search"
                data-open={searchOpen}
                value={searchValue || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchOpen ? 'Search…' : ''}
              />
              <button
                type="button"
                className="fk-dash__icon-btn"
                aria-label="Toggle search"
                onClick={() => setSearchOpen((s) => !s)}
              >
                <SearchIcon size={18} />
              </button>
            </>
          )}
          <button
            type="button"
            className="fk-dash__icon-btn"
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen((o) => !o)}
          >
            <ChevronDownIcon className={cn('fk-dash__caret')} data-open={open} size={22} />
          </button>
        </div>
      </div>

      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  )
}
