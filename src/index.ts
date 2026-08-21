import type { Config } from 'payload'

export type AdminDashboardConfig = {
  /** Include the "Welcome, {name}" widget. Default true. */
  welcome?: boolean
  /** Include the searchable Collections overview. Default true. */
  collections?: boolean
  /** Include the Globals overview. Default true. */
  globals?: boolean
  /**
   * Set `admin.dashboard.defaultLayout` to this plugin's widgets. Default true.
   * Set false to keep your own layout and just register the widgets.
   */
  setDefaultLayout?: boolean
  disabled?: boolean
}

const RSC = '@foundrykit/payload-admin-ui/rsc'

type Widget = {
  slug: string
  Component: string
  minWidth?: 'full'
  maxWidth?: 'full'
}

/**
 * Registers a polished, data-driven admin dashboard: a welcome widget plus
 * searchable Collections and Globals overviews that read straight from your
 * config (respecting the user's permissions). Styled with the admin theme
 * variables, so it looks right in light or dark and needs no Tailwind.
 */
export const adminDashboardPlugin =
  (options: AdminDashboardConfig = {}) =>
  (config: Config): Config => {
    if (options.disabled) return config

    const wantWelcome = options.welcome !== false
    const wantCollections = options.collections !== false
    const wantGlobals = options.globals !== false

    const widgets: Widget[] = []
    const layout: { widgetSlug: string; width: 'full' }[] = []

    if (wantWelcome) {
      widgets.push({ slug: 'fk-welcome', Component: `${RSC}#WelcomeWidget`, minWidth: 'full', maxWidth: 'full' })
      layout.push({ widgetSlug: 'fk-welcome', width: 'full' })
    }
    if (wantCollections) {
      widgets.push({ slug: 'fk-collections', Component: `${RSC}#CollectionsWidget`, minWidth: 'full', maxWidth: 'full' })
      layout.push({ widgetSlug: 'fk-collections', width: 'full' })
    }
    if (wantGlobals) {
      widgets.push({ slug: 'fk-globals', Component: `${RSC}#GlobalsWidget`, minWidth: 'full', maxWidth: 'full' })
      layout.push({ widgetSlug: 'fk-globals', width: 'full' })
    }

    const admin = (config.admin ?? {}) as Record<string, unknown>
    const dashboard = (admin.dashboard ?? {}) as Record<string, unknown>
    const existingWidgets = (dashboard.widgets as Widget[] | undefined) ?? []

    config.admin = {
      ...admin,
      dashboard: {
        ...dashboard,
        widgets: [...existingWidgets, ...widgets],
        ...(options.setDefaultLayout !== false || !dashboard.defaultLayout
          ? { defaultLayout: layout }
          : {}),
      },
    } as Config['admin']

    return config
  }

export default adminDashboardPlugin
