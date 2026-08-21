import type { PayloadRequest } from 'payload'

/** Resolve a Payload label (string | fn | i18n record) to a display string. */
export const labelFor = (label: unknown, fallback: string, req: PayloadRequest): string => {
  if (typeof label === 'function') {
    try {
      return String((label as (args: unknown) => unknown)({ i18n: req.i18n, t: req.i18n.t }))
    } catch {
      return fallback
    }
  }
  if (typeof label === 'string') return label
  return fallback
}
