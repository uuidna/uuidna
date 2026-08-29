// npm-pack — the umbrella tarball (@uuidna/uuidna) must carry every workspace package.
// Discovery is the packages/ directory, not a remembered six-name list: a new workspace that is not packed is a hole.
import { existsRoot, lsRoot, rdRoot } from './boundary.js'

export interface WorkspacePackage { dir: string; name: string }

export function workspacePackages(): WorkspacePackage[] {
  if (!existsRoot('packages')) return []
  return lsRoot('packages')
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()
    .flatMap((dir) => {
      const rel = `packages/${dir}/package.json`
      if (!existsRoot(rel)) return []
      const j = JSON.parse(rdRoot(rel)) as { name?: string }
      return [{ dir, name: j.name ?? `@uuidna/${dir}` }]
    })
}

/** A files-field glob covers a workspace when it names `packages`, `packages/*`, or that workspace's path. */
export function filesFieldCovers(files: readonly string[], dir: string): boolean {
  return files.some((f) =>
    f === 'packages' ||
    f === 'packages/*' ||
    f === `packages/${dir}` ||
    f.startsWith(`packages/${dir}/`) ||
    f.startsWith('packages/*/'))
}

export interface PackGap { what: string; fix: string }

const packedHas = (packed: readonly string[], dir: string): boolean =>
  packed.some((p) => {
    const n = p.replace(/\\/g, '/')
    return n === `packages/${dir}/package.json` || n.endsWith(`/packages/${dir}/package.json`)
  })

/** Gaps when the root files field or a measured pack list drops a workspace. packed=[] checks the field only. */
/** Committed uuidnaOS data that must ride the umbrella tarball — the catalogue load is `../../../mirror/` from dist/quantum/os. */
export const OS_SHIP_FILES = ['mirror/alpine-catalogue.tsv', 'mirror/alpine-overlay.tsv'] as const

const osFileCovered = (files: readonly string[], rel: string): boolean =>
  files.some((f) => f === rel || f === 'mirror' || f === 'mirror/*' || (rel.startsWith('mirror/') && f.startsWith('mirror/')))

const packedHasFile = (packed: readonly string[], rel: string): boolean =>
  packed.some((p) => {
    const n = p.replace(/\\/g, '/')
    return n === rel || n.endsWith('/' + rel)
  })

/** Gaps when npm pack omits the Alpine catalogue uuidnaOS reads, or the files field never names it. */
export function npmPackOsGaps(files: readonly string[], packed: readonly string[] = []): PackGap[] {
  const gaps: PackGap[] = []
  for (const rel of OS_SHIP_FILES) {
    if (!osFileCovered(files, rel)) {
      gaps.push({
        what: `package.json files omits uuidnaOS data ${rel}`,
        fix: `add "${rel}" to the root files field so npm pack ships the Alpine catalogue uuidnaOS boots from`,
      })
    }
    if (packed.length > 0 && !packedHasFile(packed, rel)) {
      gaps.push({
        what: `npm pack does not contain ${rel} — uuidnaOS on npm cannot load the Alpine catalogue`,
        fix: `keep ${rel} on disk and listed in package.json files`,
      })
    }
  }
  return gaps
}

export function npmPackWorkspaceGaps(files: readonly string[], packed: readonly string[] = []): PackGap[] {
  const gaps: PackGap[] = []
  for (const p of workspacePackages()) {
    if (!filesFieldCovers(files, p.dir)) {
      gaps.push({
        what: `package.json files omits workspace ${p.name} (packages/${p.dir})`,
        fix: `add "packages" to the root files field so npm pack ships ${p.name} inside @uuidna/uuidna`,
      })
    }
    if (packed.length > 0 && !packedHas(packed, p.dir)) {
      gaps.push({
        what: `npm pack does not contain packages/${p.dir}/package.json — ${p.name} is missing from the umbrella tarball`,
        fix: `keep packages/${p.dir}/package.json on disk and listed under the root files field`,
      })
    }
  }
  return gaps
}
