import type { Payload } from 'payload'
import config from '@payload-config'
import { getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let payload: Payload
beforeAll(async () => { payload = await getPayload({ config }) })
afterAll(async () => { await payload.destroy() })

describe('adminDashboardPlugin wiring', () => {
  test('registers the three dashboard widgets', () => {
    const widgets = (payload.config.admin.dashboard?.widgets ?? []) as { slug: string }[]
    const slugs = widgets.map((w) => w.slug)
    expect(slugs).toContain('fk-welcome')
    expect(slugs).toContain('fk-collections')
    expect(slugs).toContain('fk-globals')
  })

  test('sets a default layout of three full-width rows', () => {
    const layout = (payload.config.admin.dashboard as { defaultLayout?: unknown[] })?.defaultLayout
    expect(layout).toHaveLength(3)
  })
})
