// https://vitepress.dev/guide/custom-theme
// Layout = ObjectPage (stock H1 + crosslinks). Home uses stock VPHome; uuidnaOS serves handle doors.
// Widgets are async so Rolldown does not hold every shelf in the monitor's main chunk — TypeScript computes, VitePress reads.
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent } from 'vue'
import ObjectPage from './ObjectPage.vue'
import Handle from './Handle.vue'
import { applySequence } from './palette'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: ObjectPage,
  enhanceApp({ app }) {
    applySequence()
    app.component('Handle', Handle)
    app.component('HexbitPlayer', defineAsyncComponent(() => import('./HexbitPlayer.vue')))
    app.component('AnthemSuperposition', defineAsyncComponent(() => import('./AnthemSuperposition.vue')))
    app.component('AnthemLive', defineAsyncComponent(() => import('./AnthemLive.vue')))
    app.component('SchoolTools', defineAsyncComponent(() => import('./SchoolTools.vue')))
    app.component('BookRoom', defineAsyncComponent(() => import('./BookRoom.vue')))
    app.component('HandleStrips', defineAsyncComponent(() => import('./HandleStrips.vue')))
    app.component('HexbitAnimator', defineAsyncComponent(() => import('./HexbitAnimator.vue')))
    app.component('UuidnaTerminal', defineAsyncComponent(() => import('./Terminal.vue')))
    app.component('ExecShell', defineAsyncComponent(() => import('./ExecShell.vue')))
    app.component('PortPanel', defineAsyncComponent(() => import('./PortPanel.vue')))
    app.component('CatalogueBrowser', defineAsyncComponent(() => import('./CatalogueBrowser.vue')))
    app.component('AgentCoverage', defineAsyncComponent(() => import('./AgentCoverage.vue')))
    app.component('FoldAnimation', defineAsyncComponent(() => import('./FoldAnimation.vue')))
    app.component('GridLattice', defineAsyncComponent(() => import('./GridLattice.vue')))
    app.component('PairGrid', defineAsyncComponent(() => import('./PairGrid.vue')))
    app.component('Reflect', defineAsyncComponent(() => import('./Reflect.vue')))
    app.component('BookReflect', defineAsyncComponent(() => import('./BookReflect.vue')))
    app.component('SearchResults', defineAsyncComponent(() => import('./SearchResults.vue')))
    app.component('BillCalc', defineAsyncComponent(() => import('./BillCalc.vue')))
    app.component('StarPlay', defineAsyncComponent(() => import('./StarPlay.vue')))
    app.component('Chess', defineAsyncComponent(() => import('./Chess.vue')))
    app.component('MessageStream', defineAsyncComponent(() => import('./MessageStream.vue')))
    app.component('TokenMeter', defineAsyncComponent(() => import('./TokenMeter.vue')))
    app.component('CostMeter', defineAsyncComponent(() => import('./CostMeter.vue')))
    app.component('HomeGraph', defineAsyncComponent(() => import('./HomeGraph.vue')))
    app.component('NimPlay', defineAsyncComponent(() => import('./NimPlay.vue')))
    app.component('ChessMobility', defineAsyncComponent(() => import('./ChessMobility.vue')))
    app.component('PracticeLoop', defineAsyncComponent(() => import('./PracticeLoop.vue')))
    app.component('AdvantageMcp', defineAsyncComponent(() => import('./AdvantageMcp.vue')))
    app.component('TheoremUse', defineAsyncComponent(() => import('./TheoremUse.vue')))
    app.component('TradingFloor', defineAsyncComponent(() => import('./TradingFloor.vue')))
    app.component('AuditPanel', defineAsyncComponent(() => import('./AuditPanel.vue')))
    app.component('CaptainCoins', defineAsyncComponent(() => import('./CaptainCoins.vue')))
  }
} satisfies Theme
