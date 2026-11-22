// The image of a product that has none: the QR code of its own address. A product is a theorem and a variant an
// example, so the code of a variation encodes exactly the URL the shop opens for that variation: the product's
// page with each chosen option and the variant, as the ecommerce template's own variant selector writes them.
// Scanning the code opens that variation and no other. Pure: a URL in, a PNG out, no canvas and no file.
// @ts-expect-error qrcode core has no types; create() returns the module matrix
import { create } from 'qrcode/lib/core/qrcode.js'

export type VariationOption = { id: number | string; type: string }
export type Variation = { id: number | string; options: readonly VariationOption[] }

/** The path and query of a product, or of one of its variations: `?<type>=<option>…&variant=<id>`, as the template's selector builds it. */
export const variationPath = (slug: string, variation?: Variation): string => {
  const base = `/products/${encodeURIComponent(slug)}`
  if (!variation) return base
  const params = new URLSearchParams()
  for (const option of variation.options) params.set(option.type, String(option.id))
  params.set('variant', String(variation.id))
  return `${base}?${params.toString()}`
}

const CRC = (() => { const table = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0 } return table })()
const crc32 = (bytes: Uint8Array) => { let c = 0xffffffff; for (const b of bytes) c = CRC[(c ^ b) & 0xff]! ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
const adler32 = (bytes: Uint8Array) => { let a = 1, b = 0; for (const x of bytes) { a = (a + x) % 65521; b = (b + a) % 65521 } return ((b << 16) | a) >>> 0 }
const u32 = (n: number) => new Uint8Array([(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255])
const join = (parts: readonly Uint8Array[]) => { const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0)); let at = 0; for (const p of parts) { out.set(p, at); at += p.length } return out }
const chunk = (type: string, data: Uint8Array) => { const body = join([new TextEncoder().encode(type), data]); return join([u32(data.length), body, u32(crc32(body))]) }

/** An 8-bit greyscale PNG of the pixels given, row by row. The zlib stream is stored, not compressed: no dependency, any runtime. */
export const png = (width: number, height: number, pixels: Uint8Array): Uint8Array => {
  const raw = new Uint8Array((width + 1) * height)
  for (let y = 0; y < height; y++) raw.set(pixels.subarray(y * width, (y + 1) * width), y * (width + 1) + 1)
  const blocks: Uint8Array[] = [new Uint8Array([0x78, 0x01])]
  for (let at = 0; at < raw.length || at === 0; at += 65535) {
    const part = raw.subarray(at, at + 65535), last = at + 65535 >= raw.length ? 1 : 0
    blocks.push(new Uint8Array([last, part.length & 255, part.length >>> 8, ~part.length & 255, (~part.length >>> 8) & 255]), part)
    if (last) break
  }
  blocks.push(u32(adler32(raw)))
  return join([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', join([u32(width), u32(height), new Uint8Array([8, 0, 0, 0, 0])])), chunk('IDAT', join(blocks)), chunk('IEND', new Uint8Array(0))])
}

/** The QR code of a text as a PNG: each module `scale` pixels, with the quiet zone the standard asks for (ISO/IEC 18004: four modules). */
export const qrPng = (text: string, scale = 8, quiet = 4): { png: Uint8Array; size: number } => {
  const code = create(text, { errorCorrectionLevel: 'M' }), modules = code.modules.size as number, data = code.modules.data as Uint8Array
  const size = (modules + 2 * quiet) * scale, pixels = new Uint8Array(size * size).fill(255)
  for (let y = 0; y < modules; y++) for (let x = 0; x < modules; x++) if (data[y * modules + x]) for (let dy = 0; dy < scale; dy++) pixels.fill(0, ((y + quiet) * scale + dy) * size + (x + quiet) * scale, ((y + quiet) * scale + dy) * size + (x + quiet + 1) * scale)
  return { png: png(size, size, pixels), size }
}

/** The address the QR endpoint serves a code at. The endpoint encodes the origin and this path, and nothing else. */
export const qrImageUrl = (path: string) => `/api/qr?to=${encodeURIComponent(path)}`

/** The size of the code of a path at this origin, without drawing it twice. */
const sizeOf = (origin: string, path: string) => qrPng(`${origin.replace(/\/$/, '')}${path}`).size

type GalleryOption = { id: number | string; variantType?: { name?: string | null } | number | string | null }
type GalleryVariant = { id: number | string; options?: readonly (GalleryOption | number | string)[] | null }
type GalleryType = { id: number | string; name?: string | null }
export type ProductForGallery = { slug?: string | null; title?: string | null; gallery?: readonly unknown[] | null; meta?: { image?: unknown } | null; variantTypes?: readonly (GalleryType | number | string)[] | null; variants?: { docs?: readonly (GalleryVariant | number | string)[] | null } | null }

/** The gallery of a product that has no image: first the code of the product itself, then one code for each variation
 *  whose options are known, attached to the variation's option so the template's gallery shows it when that option is
 *  chosen. A product that has a gallery keeps it untouched. */
export const fallbackGallery = (product: ProductForGallery, origin: string) => {
  if (product.gallery?.length || !product.slug) return null
  const media = (path: string, label: string) => { const size = sizeOf(origin, path); return { id: 0, alt: `QR: ${label}`, url: qrImageUrl(path), width: size, height: size, filename: 'qr.png', mimeType: 'image/png', updatedAt: '1970-01-01T00:00:00.000Z', createdAt: '1970-01-01T00:00:00.000Z' } }
  const title = product.title ?? product.slug
  const items: { image: ReturnType<typeof media>; variantOption?: GalleryOption; variation?: string }[] = [{ image: media(variationPath(product.slug), title) }]
  for (const variant of product.variants?.docs ?? []) {
    if (typeof variant !== 'object' || !variant.options?.length) continue
    const options = variant.options.filter((option): option is GalleryOption => typeof option === 'object' && option !== null)
    // an option names its type by the type itself, or by its id among the types the product holds
    const typeName = (of: GalleryOption['variantType']) => (typeof of === 'object' && of ? of.name : (product.variantTypes ?? []).find((type): type is GalleryType => typeof type === 'object' && type !== null && type.id === of)?.name) ?? ''
    const named = options.map((option) => ({ id: option.id, type: typeName(option.variantType) }))
    if (named.length !== variant.options.length || named.some((option) => !option.type)) continue
    const path = variationPath(product.slug, { id: variant.id, options: named })
    items.push({ image: media(path, `${title} ${named.map((option) => `${option.type} ${option.id}`).join(' ')}`), variantOption: options.at(-1)!, variation: path })
  }
  return items
}

/** The image a product is listed by when it has none: the code of the product itself. Grids and carousels read it. */
export const fallbackImage = (product: ProductForGallery, origin: string) => {
  if (product.meta?.image || product.gallery?.length || !product.slug) return null
  const path = variationPath(product.slug), size = sizeOf(origin, path)
  return { id: 0, alt: `QR: ${product.title ?? product.slug}`, url: qrImageUrl(path), width: size, height: size, filename: 'qr.png', mimeType: 'image/png', updatedAt: '1970-01-01T00:00:00.000Z', createdAt: '1970-01-01T00:00:00.000Z' }
}
