// scripts/prerender.mjs
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'

const DIST_DIR = path.resolve('dist')
const PORT = 4173
const ORIGIN = `http://127.0.0.1:${PORT}`

// Put *real* routes here (no :params). For dynamic routes, list each concrete path.
const ROUTES = [
'/',
'/about',
'/contact',
'/locations',
'/news',
'/testimonials',
'/csr',
'/sister-companies',
'/spare-parts',
'/shop/ather',
'/shop/ather/electric-scooter',
'/shop/ather/electric-scooter/694cdd255402906a994a2edc',
'/shop/ather/electric-scooter/694dee8fcc60a21673b656e7',
'/shop/ather/electric-scooter/694e040bcc60a21673b657cf',
'/shop/ather/electric-scooter/694e094dcc60a21673b658c7',
'/shop/bull',
'/shop/bull/backhoe-loader',
'/shop/bull/backhoe-loader/6948f1a431778e231eb0fd1e',
'/shop/bull/backhoe-loader/694d14e0cc60a21673b65151',
'/shop/bull/backhoe-loader/694d19d5cc60a21673b6532f',
'/shop/bull/skid',
'/shop/bull/skid/694e2950cc60a21673b65a18',
'/shop/dongfeng',
'/shop/dongfeng/ev-van',
'/shop/dongfeng/ev-van/694e1e51cc60a21673b658fe',
'/shop/dongfeng/ev-van/694e2077cc60a21673b6591c',
'/shop/dongfeng/ev-van/694e2113cc60a21673b6593a',
'/shop/eicher',
'/shop/eicher/light-medium-duty-trucks',
'/shop/eicher/light-medium-duty-trucks/694e6351cc60a21673b65b86',
'/shop/eicher/light-medium-duty-trucks/694e64c8cc60a21673b65ba4',
'/shop/komatsu',
'/shop/komatsu/excavator',
'/shop/komatsu/excavator/694e22dccc60a21673b6597a',
'/shop/komatsu/excavator/694e26b9cc60a21673b659f8',
'/shop/toyota',
'/shop/toyota/bus',
'/shop/toyota/bus/6950e7fa2fe9ff237a67e942',
'/shop/toyota/pick-up',
'/shop/toyota/pick-up/6950e7382fe9ff237a67e924',
'/shop/toyota/sedan',
'/shop/toyota/sedan/694e3bbfcc60a21673b65b05',
'/shop/toyota/suv',
'/shop/toyota/suv/694e3e44cc60a21673b65b41',
'/shop/toyota/suv/6950e11d2fe9ff237a67e864',
'/shop/toyota/suv/6950e2072fe9ff237a67e886',
'/shop/toyota/suv/6950e2d72fe9ff237a67e8a4',
'/shop/toyota/suv/6950e3732fe9ff237a67e8c2',
'/shop/toyota/suv/6950e4922fe9ff237a67e8e0',
'/shop/toyota/suv/6950e5882fe9ff237a67e8fe',
'/shop/xcmg',
'/shop/xcmg/motor-grader',
'/shop/xcmg/motor-grader/694e3781cc60a21673b65abf',
'/shop/xcmg/truck-mounted-crane',
'/shop/xcmg/truck-mounted-crane/694e3990cc60a21673b65adf',
'/shop/xcmg/wheel-loader',
'/shop/xcmg/wheel-loader/694e2b3acc60a21673b65a3c',
'/shop/xcmg/wheel-loader/694e2e75cc60a21673b65a80',
]

// --- helpers ---
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForServer(url) {
  // Try until the server responds. (Keeps the script robust across machines.)
  for (let i = 0; i < 200; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (res.ok) return
    } catch {
      // ignore until next retry
    }
    await sleep(50)
  }
  throw new Error(`Preview server did not start at ${url}`)
}

function routeToOutDir(route) {
  if (route === '/') return DIST_DIR
  // "/a/b" -> "dist/a/b"
  return path.join(DIST_DIR, route.replace(/^\/+/, ''))
}

function getNpxCmd() {
  return process.platform === 'win32' ? 'npx.cmd' : 'npx'
}

async function main() {
  // 1) Start a static server for dist/
  const serverProc = spawn(
    getNpxCmd(),
    ['serve', '-s', 'dist', '-l', String(PORT)],
    { stdio: 'inherit' }
  )

  try {
    await waitForServer(ORIGIN)

    // 2) Launch browser and prerender each route
    const browser = await chromium.launch()
    const page = await browser.newPage()

    for (const route of ROUTES) {
      const url = new URL(route, ORIGIN).toString()

      // networkidle works for many apps; if you have long-polling websockets, you may
      // want 'domcontentloaded' and then wait for a selector instead.
      await page.goto(url, { waitUntil: 'networkidle' })

      // small buffer to let late renders finish (tweak if needed)
      await page.waitForTimeout(200)

      await page.evaluate(() => {
        document.querySelector('[data-rht-toaster]')?.remove()
        })
      const html = await page.content() // Playwright page.content(): https://playwright.dev/docs/api/class-page#page-content

      const outDir = routeToOutDir(route)
      await fs.mkdir(outDir, { recursive: true })
      await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')

      console.log(`Prerendered: ${route} -> ${path.relative(process.cwd(), path.join(outDir, 'index.html'))}`)
    }

    await browser.close()
  } finally {
    // 3) Stop server
    serverProc.kill()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})