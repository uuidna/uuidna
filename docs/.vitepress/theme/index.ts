// https://vitepress.dev/guide/custom-theme
// Layout = ObjectPage (object hero + crosslinks). Home uses stock VPHome; QA only via <QuantumAdvantage /> in index.md.
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import RefererCompass from './RefererCompass.vue'
import Terminal from './Terminal.vue'
import HexbitPlayer from './HexbitPlayer.vue'
import AnthemSuperposition from './AnthemSuperposition.vue'
import AnthemLive from './AnthemLive.vue'
import SchoolTools from './SchoolTools.vue'
import BookRoom from './BookRoom.vue'
import HexbitAnimator from './HexbitAnimator.vue'
import FoldAnimation from './FoldAnimation.vue'
import HeroAnimation from './HeroAnimation.vue'
import QuantumAdvantage from './QuantumAdvantage.vue'
import ObjectPage from './ObjectPage.vue'
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
import CaptainCoins from './CaptainCoins.vue'
import GridLattice from './GridLattice.vue'
import PairGrid from './PairGrid.vue'
import { loadDimensions } from './dimensions'
import { applySequence } from './palette'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: ObjectPage,
  enhanceApp({ app }) {
    applySequence()
    loadDimensions()
    // Home-only QA monitor (mounted explicitly in docs/index.md — not layout chrome).
    app.component('QuantumAdvantage', QuantumAdvantage)
    app.component('RefererCompass', RefererCompass)
    app.component('HexbitPlayer', HexbitPlayer)
    app.component('AnthemSuperposition', AnthemSuperposition)
    app.component('AnthemLive', AnthemLive)
    app.component('SchoolTools', SchoolTools)
    app.component('BookRoom', BookRoom)
    app.component('HexbitAnimator', HexbitAnimator)
    app.component('UuidnaTerminal', Terminal)
    app.component('FoldAnimation', FoldAnimation)
    app.component('HeroAnimation', HeroAnimation)
    app.component('GridLattice', GridLattice)
    app.component('PairGrid', PairGrid)
    app.component('Reflect', Reflect)
    app.component('BookReflect', BookReflect)
    app.component('SearchResults', SearchResults)
    app.component('BillCalc', BillCalc)
    app.component('StarPlay', StarPlay)
    app.component('Chess', Chess)
    app.component('MessageStream', MessageStream)
    app.component('TokenMeter', TokenMeter)
    app.component('CostMeter', CostMeter)
    app.component('HomeGraph', HomeGraph)
    app.component('Handle', Handle)
    app.component('NimPlay', NimPlay)
    app.component('ChessMobility', ChessMobility)
    app.component('AuditPanel', AuditPanel)
    app.component('CaptainCoins', CaptainCoins)
  }
} satisfies Theme
