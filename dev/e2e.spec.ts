import { expect, test } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const shot = (name: string) => path.resolve(dirname, 'screenshots', name)

test('capture dashboard screenshot', async ({ page }) => {
  test.setTimeout(180_000)
  const res = await page.request.post('/api/users/login', { data: { email: 'dev@payloadcms.com', password: 'test' } })
  expect(res.ok(), `login failed: ${res.status()}`).toBeTruthy()

  await page.goto('/admin')
  await page.waitForSelector('.fk-dash__card, .fk-dash__welcome', { timeout: 40_000 })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: shot('01-dashboard.png'), fullPage: true })
})
