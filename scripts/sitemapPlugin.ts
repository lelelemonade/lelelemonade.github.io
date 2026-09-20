import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

const SITE = 'https://zhongli.dev'
const CONTENT_DIRS = ['src/content/blogs', 'src/content/news'] as const

/** W3C Datetime / sitemap-safe calendar date (YYYY-MM-DD). */
function toSitemapDate(raw: string): string | null {
  const match = raw.trim().match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return null

  const [, y, m, d] = match
  const year = Number(y)
  const month = Number(m)
  const day = Number(d)
  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  const parsed = new Date(`${y}-${m}-${d}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return null
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  ) {
    return null
  }

  return `${y}-${m}-${d}`
}

function latestContentLastmod(root: string): string | null {
  let newest: string | null = null

  for (const dir of CONTENT_DIRS) {
    const abs = join(root, dir)
    let files: string[]
    try {
      files = readdirSync(abs).filter((f) => f.endsWith('.md'))
    } catch {
      continue
    }

    for (const file of files) {
      const text = readFileSync(join(abs, file), 'utf8')
      const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      if (!frontmatter) continue

      const dateLine = frontmatter[1].match(/^date:\s*(.+)$/m)
      if (!dateLine) continue

      const iso = toSitemapDate(dateLine[1])
      if (iso && (!newest || iso > newest)) newest = iso
    }
  }

  return newest
}

function buildSitemapXml(lastmod: string | null): string {
  const homeLastmod = lastmod
    ? `\n    <lastmod>${lastmod}</lastmod>`
    : ''

  // HashRouter pages are not crawlable; only real HTML documents.
  // Omit changefreq/priority (ignored by Google/Bing).
  // Omit lastmod on stickers.html — content is live S3, not versioned here.
  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  HashRouter routes live behind # fragments crawlers ignore.
  Only documents GitHub Pages serves as real URLs are listed.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>${homeLastmod}
  </url>
  <url>
    <loc>${SITE}/stickers.html</loc>
  </url>
</urlset>
`
}

export function sitemapPlugin(): Plugin {
  let outDir = 'dist'
  let root = process.cwd()

  return {
    name: 'generate-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
      root = config.root
    },
    closeBundle() {
      const lastmod = latestContentLastmod(root)
      const xml = buildSitemapXml(lastmod)
      writeFileSync(join(outDir, 'sitemap.xml'), xml)
    },
  }
}
