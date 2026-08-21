import type { WidgetServerProps } from 'payload'
import { Intro, type DashboardUser } from '../components/Intro.js'

export default async function WelcomeWidget({ req }: WidgetServerProps) {
  return <Intro user={req.user as DashboardUser} />
}
