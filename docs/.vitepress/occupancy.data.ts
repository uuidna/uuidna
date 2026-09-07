// occupancy.data — THE ONE OCCUPANCY-CITATION TABLE, loaded once for every page instead of repeated in each.
// A hex face's `occupancyCites` is occupancy × (number → the census keys that supply that number), and the table
// half is address-independent: measured over all 10,344 object pages, zero pages disagreed about the keys for any
// count, and the whole table is 36 entries / 6 KB — while the repeated array was 58 MB of the 130 MB param payload
// (lead 126). HexFace.vue derives the citations from a page's own occupancy numbers and this table, so the rendered
// citations are byte-identical to occupancyCitesOf(address); src/occupancy-table.test.ts asserts that round-trip.
// Requires the package to be built first (`npm run build` → dist/), like every other loader here.
import { occupancyCiteTable } from '../../dist/hexagram.js'

export default {
  watch: ['../../src/theorems/generated.ts'],
  load(): Record<number, readonly string[]> {
    return occupancyCiteTable()
  },
}
