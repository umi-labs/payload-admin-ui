'use client'
import './dashboard.css'

export type DashboardUser = { name?: string | null; email?: string | null } | null | undefined

export const Intro = ({ user }: { user: DashboardUser }) => {
  const name = user?.name || user?.email || 'there'
  return (
    <div className="fk-dash__welcome">
      <h1>Welcome, {name}!</h1>
      <p>Jump into your content below.</p>
    </div>
  )
}
