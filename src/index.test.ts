import { describe, expect, it } from 'vitest'
import { adminDashboardPlugin } from './index.js'

const base = () => ({ collections: [], admin: {} }) as any

describe('adminDashboardPlugin', () => {
  it('registers all three widgets + a default layout by default', () => {
    const cfg = adminDashboardPlugin()(base())
    const widgets = cfg.admin!.dashboard!.widgets as { slug: string }[]
    expect(widgets.map((w) => w.slug)).toEqual(['fk-welcome', 'fk-collections', 'fk-globals'])
    const layout = (cfg.admin!.dashboard as any).defaultLayout as { widgetSlug: string }[]
    expect(layout).toHaveLength(3)
  })

  it('honours toggles', () => {
    const cfg = adminDashboardPlugin({ globals: false, welcome: false })(base())
    const widgets = cfg.admin!.dashboard!.widgets as { slug: string }[]
    expect(widgets.map((w) => w.slug)).toEqual(['fk-collections'])
  })

  it('appends to existing widgets rather than replacing them', () => {
    const cfg = base()
    cfg.admin.dashboard = { widgets: [{ slug: 'custom', Component: 'x#Y' }] }
    const out = adminDashboardPlugin({ collections: false, globals: false })(cfg)
    const slugs = (out.admin!.dashboard!.widgets as { slug: string }[]).map((w) => w.slug)
    expect(slugs).toEqual(['custom', 'fk-welcome'])
  })

  it('is a no-op when disabled', () => {
    const cfg = adminDashboardPlugin({ disabled: true })(base())
    expect((cfg.admin as any).dashboard).toBeUndefined()
  })

  it('points widgets at the RSC export', () => {
    const cfg = adminDashboardPlugin({ collections: false, globals: false })(base())
    const w = (cfg.admin!.dashboard!.widgets as { Component: string }[])[0]
    expect(w.Component).toBe('@foundrykit/payload-admin-ui/rsc#WelcomeWidget')
  })
})
