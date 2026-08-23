// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import RefererCompass from './RefererCompass.vue'
import UrlAudit from './UrlAudit.vue'
import Terminal from './Terminal.vue'
import HexbitPlayer from './HexbitPlayer.vue'
import AnthemSuperposition from './AnthemSuperposition.vue'
import SchoolTools from './SchoolTools.vue'
import BookRoom from './BookRoom.vue'
import ReferrerNav from './ReferrerNav.vue'
import ReadAloud from './ReadAloud.vue'
import LinkAuditor from './LinkAuditor.vue'
import FoldAnimation from './FoldAnimation.vue'
import HeroAnimation from './HeroAnimation.vue'
import SiteFooter from './SiteFooter.vue'
import HomeGraph from './HomeGraph.vue'
import Reflect from './Reflect.vue'
import BookReflect from './BookReflect.vue'
import SearchResults from './SearchResults.vue'
import BillCalc from './BillCalc.vue'
import StarPlay from './StarPlay.vue'
import Chess from './Chess.vue'
import MessageStream from './MessageStream.vue'
import TokenMeter from './TokenMeter.vue'
import CostMeter from './CostMeter.vue'
import Handle from './Handle.vue'
import NimPlay from './NimPlay.vue'
import ChessMobility from './ChessMobility.vue'
import AuditPanel from './AuditPanel.vue'
import Dimensions from './Dimensions.vue'
import CaptainCoins from './CaptainCoins.vue'
import GridLattice from './GridLattice.vue'
import PairGrid from './PairGrid.vue'
import { loadDimensions } from './dimensions'
import { applySequence } from './palette'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    // Global categorised footer on every page, via the layout-bottom slot. The "next" link is VitePress's OWN
    // native pager — built-in, derived automatically from the sidebar's own order, which config.ts now computes
    // (site.ts's computeSidebar, walking the real docs/ tree) rather than hand-typing — one next button, the
    // local skill, not a second custom one that duplicated it and confused the page. (This comment previously
    // named a "seqNav" frontmatter mechanism that never existed in config.ts — corrected to what's actually here.)
    // LinkAuditor rides the layout-bottom slot so it mounts on EVERY page and re-audits on each route change — the
    // UI follows any link and audits its destination from the referrer-only perspective, automatically, by default.
    // Dimensions rides the same slot — the involution control on every page: fold the reading experience to its
    // simple pole and back, each dimension user-configurable, held in localStorage, applied as data-dim-* on the
    // root so CSS folds even the generated theorem pages.
    // ReferrerNav rides nav-bar-content-after — genuinely IN the nav bar (not a page-bottom note): a link computed
    // from ledger.data's own principle groups, offered only when the path actually walked makes one recomputable
    // (the previous page was a theorem); nav.ts's own 4 links stay the static baseline every static site needs,
    // this is the referrer-computed layer alongside them, not a replacement of what can't be made dynamic at build time.
    return h(DefaultTheme.Layout, null, {
      // THE 404 IS AN AUDIT (the captain's rule): the not-found slot parses the url in the visitor's browser
      // and computes the relevant sealed content — exact path meaning, family, token matches, total fallback —
      // so in substance every path serves. The logic is the pure app quantum/apps/url-audit; this is a shell.
      'not-found': () => h(UrlAudit),
      'nav-bar-content-after': () => h(ReferrerNav),
      // ReadAloud rides doc-before — right before the page's own content, so a reader tabbing in from the skip
      // link meets it immediately. Purely user-initiated (see the component's own header comment for why: an
      // auto-advancing or auto-reading page is a WCAG anti-pattern, not an accessibility win).
      'doc-before': () => h(ReadAloud),
      'layout-bottom': () => [h(SiteFooter), h(LinkAuditor), h(Dimensions)],
    })
  },
  enhanceApp({ app }) {
    // No hardcoded palette — the accent colours COMPUTE from the ℤ/9 sequence (5 → green, the heart), injected as
    // CSS custom properties on the document root so components read --seq-* instead of hex literals.
    applySequence()
    // The reading dimensions load once per visit (no-op during SSR) and re-apply on every preference change.
    loadDimensions()
    // Global — the theorem pages embed <RefererCompass /> to show a path-aware backlink (referer tracked client-side).
    app.component('RefererCompass', RefererCompass)
    // THE STANDARD HEXBIT QUANTUM APP for sound — states 0..15 in, lattice audio out, computed in the browser,
    // no asset fetched (the captain's rule: no assets; all computes in browser; hexbit quantum apps only).
    app.component('HexbitPlayer', HexbitPlayer)
    app.component('AnthemSuperposition', AnthemSuperposition)
    // The school's three instruments — test/edit/build, pure coding-shelf apps computed in the visitor's browser.
    app.component('SchoolTools', SchoolTools)
    // The reading room — read, find facts, try quotes: the books shelf computed in the visitor's browser.
    app.component('BookRoom', BookRoom)
    // THE TERMINAL ON THE MCP — a singularity, not a mirror: the toolbox is learned live from the wire's own
    // tools/list (the page carries no list to drift), and every command is a real tools/call through the same
    // gate, deposit, and receipt as any MCP client. The pure half is quantum/apps/terminal; this is the shell.
    app.component('UuidnaTerminal', Terminal)
    // The 7d fold, animated — seven addresses fold to one receipt (self-contained SVG/CSS).
    app.component('FoldAnimation', FoldAnimation)
    // The hero, animated — the sealed doubling orbit across the seven reading dimensions; `dimension` selects
    // which ray leads and dims the rest. Colours read the --seq-* properties applySequence() sets from ℤ/9.
    app.component('HeroAnimation', HeroAnimation)
    // GridLattice — the 432 grid SHOWN: every seat read from grid(), coloured by its own address, and reflowed
    // between the two shapes 432 admits (6 × 72 by the axes, 16 × 27 by the digit-reversal involution). The toggle
    // rearranges the SAME seats and adds none, which is the page's argument made visible rather than restated.
    app.component('GridLattice', GridLattice)
    // PairGrid — the 42 directions shown as the 7 × 7 matrix they are cut from, with the diagonal left empty so the
    // excluded identity is visible rather than asserted, and transposition read as reflection across it.
    app.component('PairGrid', PairGrid)
    // Reflect — a client-side content-addresser; the visitor's chosen data reflects to its address in the browser,
    // nothing sent or stored. Privacy by default; opt-in storage is a separate, consent-gated feature.
    app.component('Reflect', Reflect)
    // BookReflect — automate the audit while writing: the full offline auditText recomputes live in the browser on
    // every keystroke (fingerprint, chapter root, structure, gravity, gate). Nothing sent or stored.
    app.component('BookReflect', BookReflect)
    // SearchResults — an honest results page over the static theorem index; filters the bundled ledger in the
    // browser and lists matches. A static client-side index, not a live engine; nothing sent or stored.
    app.component('SearchResults', SearchResults)
    // BillCalc — the measured exchange (bits saved, the two coins), computed in the browser. Not financial trading.
    app.component('BillCalc', BillCalc)
    // StarPlay — the star-polygon {n/step} game drawn from the real starPolygon; single stroke iff coprime.
    app.component('StarPlay', StarPlay)
    // Chess — a complete, correct, offline chess (full legal moves, castling, en passant, promotion, mate). Pure client-side.
    app.component('Chess', Chess)
    // MessageStream — a live visualisation of uuidna messaging: seal a message into its uuid stream and open it back,
    // real ChaCha20-Poly1305 in the browser, nothing sent.
    app.component('MessageStream', MessageStream)
    // TokenMeter — tokens-per-theorem any time, computed in the browser against the live ledger count.
    app.component('TokenMeter', TokenMeter)
    // CostMeter — the RECOMPUTABLE cost, read from the ledger itself (no self-report); the proven counterpart to TokenMeter.
    app.component('CostMeter', CostMeter)
    // HomeGraph — the homepage as a graph: every principle a domain card, each a horizontal slider of its top
    // theorems linking its monograph. Computes from the ledger + the ℤ/9 palette; adding a domain adds a card.
    app.component('HomeGraph', HomeGraph)
    // Handle — the unified uuid citation: shows the 8-char handle, carries the full uuid (title + click-to-copy).
    // Used on every page so the "cite the handle, the fold is the whole" rule is one component, not per-page slices.
    app.component('Handle', Handle)
    // NimPlay — the game of heaps with the REAL nim-sum (XOR, the axiom-free lxor the 9×9 table seals): Bouton's
    // P-position, the exact winning move, and the "two coins" (verify by one XOR, not recompute the tree). Nothing sent.
    app.component('NimPlay', NimPlay)
    // ChessMobility — place a knight/king on any square; the reachable squares light up and the move-count links to
    // its sealed theorem. The decidable board geometry (deltas that stay on the 8×8), computed in-browser, nothing sent.
    app.component('ChessMobility', ChessMobility)
    // AuditPanel — the audit game: toggle independent refuters and the claim's verdict resolves by the {0,1} algebra
    // (survive = ∏(1−rᵢ), a P-position); N refuters are strictly more accurate. Sealed in AuditGame.lean; nothing sent.
    app.component('AuditPanel', AuditPanel)
    // CaptainCoins — THE ONE COIN ACCOUNT (on /captain): the twelve jobs tried on every read, the theorem list
    // filtered from the bundled ledger, the deposit arithmetic computed. Every other surface points here.
    app.component('CaptainCoins', CaptainCoins)
  }
} satisfies Theme
