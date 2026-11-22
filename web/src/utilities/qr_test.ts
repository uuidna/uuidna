// The QR code of a product variation is read back by an independent decoder: it holds exactly the variation's URL.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import jsQR from 'jsqr'
// @ts-expect-error pngjs
import { PNG } from 'pngjs'
import { fallbackGallery, fallbackImage, qrImageUrl, qrPng, variationPath } from './qr.ts'

const ORIGIN = 'https://qpu.uuidna.com'
const scan = (bytes: Uint8Array) => { const image = PNG.sync.read(Buffer.from(bytes)); return jsQR(new Uint8ClampedArray(image.data), image.width, image.height)?.data ?? null }

/** ISO/IEC/IEEE 29119-3 test case. Identifier: a variation's path names each chosen option and the variant, as the template's selector writes them. */
test("a variation's path names each chosen option and the variant, as the template's selector writes them", () => {
  assert.equal(variationPath('textbook-fibonacci'), '/products/textbook-fibonacci')
  assert.equal(variationPath('textbook-fibonacci', { id: 7, options: [{ id: 3, type: 'example' }, { id: 12, type: 'context' }] }), '/products/textbook-fibonacci?example=3&context=12&variant=7')
})

/** ISO/IEC/IEEE 29119-3 test case. Identifier: the code scans back to exactly the URL it was drawn from. */
test('the code scans back to exactly the URL it was drawn from', () => {
  for (const path of ['/products/a', variationPath('textbook-fibonacci', { id: 7, options: [{ id: 3, type: 'example' }] }), variationPath('the-register-is-one-uuid-with-a-rather-long-slug-indeed', { id: 123456, options: [{ id: 98765, type: 'example' }, { id: 4321, type: 'iso' }] })]) {
    const drawn = qrPng(`${ORIGIN}${path}`)
    assert.equal(scan(drawn.png), `${ORIGIN}${path}`)
    const image = PNG.sync.read(Buffer.from(drawn.png))
    assert.deepEqual([image.width, image.height], [drawn.size, drawn.size])
  }
})

/** ISO/IEC/IEEE 29119-3 test case. Identifier: a product with no image gets its own code and one for each variation, and a product with images keeps them. */
test('a product with no image gets its own code and one for each variation, and a product with images keeps them', () => {
  const type = { name: 'example' }
  const product = { slug: 'textbook-fibonacci', title: 'textbook_fibonacci', gallery: [], variants: { docs: [{ id: 7, options: [{ id: 3, variantType: type }] }, { id: 8, options: [{ id: 4, variantType: type }] }, 9] } }
  const gallery = fallbackGallery(product, ORIGIN)!
  assert.equal(gallery.length, 3)
  assert.equal(gallery[0]!.image.url, qrImageUrl('/products/textbook-fibonacci'))
  assert.equal(gallery[0]!.variantOption, undefined)
  assert.deepEqual(gallery.slice(1).map((item) => [item.variantOption?.id, item.variation]), [[3, '/products/textbook-fibonacci?example=3&variant=7'], [4, '/products/textbook-fibonacci?example=4&variant=8']])
  for (const item of gallery) {
    const path = decodeURIComponent(item.image.url.slice('/api/qr?to='.length))
    assert.equal(scan(qrPng(`${ORIGIN}${path}`).png), `${ORIGIN}${item.variation ?? '/products/textbook-fibonacci'}`)
    assert.equal(item.image.width, qrPng(`${ORIGIN}${path}`).size)
  }
  assert.equal(fallbackGallery({ ...product, gallery: [{ image: 1 }] }, ORIGIN), null)
  assert.equal(fallbackGallery({ ...product, slug: null }, ORIGIN), null)
})

/** ISO/IEC/IEEE 29119-3 test case. Identifier: an option that names its type by id is read from the product's own types, and a list shows the product's code. */
test("an option that names its type by id is read from the product's own types, and a list shows the product's code", () => {
  const product = { slug: 'textbook-fibonacci', title: 'textbook_fibonacci', gallery: [], meta: { image: null }, variantTypes: [{ id: 114, name: 'example' }], variants: { docs: [{ id: 7, options: [{ id: 176, variantType: 114 }] }] } }
  const gallery = fallbackGallery(product, ORIGIN)!
  assert.deepEqual(gallery.map((item) => item.variation), [undefined, '/products/textbook-fibonacci?example=176&variant=7'])
  const image = fallbackImage(product, ORIGIN)!
  assert.equal(image.url, qrImageUrl('/products/textbook-fibonacci'))
  assert.equal(scan(qrPng(`${ORIGIN}/products/textbook-fibonacci`).png), `${ORIGIN}/products/textbook-fibonacci`)
  assert.equal(fallbackImage({ ...product, meta: { image: 5 } }, ORIGIN), null)
})
