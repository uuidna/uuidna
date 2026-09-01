// object-i18n — ANY-LANGUAGE SURFACE FOR THE CATCH-ALL OBJECT TEMPLATE (captain, 2026-08-26).
//
// THE FOLD IS THE TRANSLATION. English object prose folds to an 8-hex handle; each locale ray (DIMENSIONS =
// en|bg|de|fr|es|ru|zh) reads those hexbits back via HEXBIT_WORDS — address-preserving, invertible, sealed in
// Readings.lean. en is the identity projection (wings are written in en). Dialects (en-GB, zh-CN, …) collapse to
// the primary ray via BCP-47 primary subtag; localeHandleOf names the full tag for PWA sync.
//
// hexbit reading preserves the content-address; it is NOT a semantic/NLP gloss of the Lean statement.
import { DIMENSIONS } from './dimensions.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { HEXBIT_WORDS, readHexbits } from './tts/readings.js'

export type LocaleRay = (typeof DIMENSIONS)[number]

export const OBJECT_LOCALE_RAYS: readonly LocaleRay[] = DIMENSIONS

/** UI chrome for the catch-all ObjectPage — seven sealed rays, one template. */
export const OBJECT_UI: Readonly<Record<LocaleRay, {
  proves: string
  provesLede: string
  hexbitDoor: string
  readingNote: string
  locale: string
  sourceEn: string
  groupAxes: string
  groupProof: string
  groupAxioms: string
  dependsOnLabel: string
  wingCatalog: string
  unboundLabel: string
  gravityLabel: string
  neighboursLabel: string
  unboundNote: string
  unusedInTheorem: string
  gravityUnbound: string
  gravityBound: string
  axiomIndexBtn: string
  unboundIndexBtn: string
  neighboursClique: string
  groupRelated: string
  keywords: string
  monograph: string
  relatedPubs: string
  relatedTheorems: string
  priorArt: string
  unlocks: string
  waves: string
  seals: string
  moreTheorems: string
  groupTenD: string
  tenFreeLabel: string
  tenCompactLabel: string
  tenFreeSummary: string
  tenCompactSummary: string
  tenQuantumBtn: string
  groupChannel: string
  trinityLabel: string
  tailLabel: string
  channelNote: string
  stationTenLabel: string
}>> = {
  en: {
    proves: 'Proves the abstract across dimensions',
    provesLede: 'Related objects across dimensions — hexbit door, skill · principle · sequence · rotation, axiom · witness · falsifier legs, publications, prior art.',
    hexbitDoor: 'Hexbit door',
    readingNote: 'Hexbit reading — address-preserving translation across the seven locale rays (not a semantic gloss).',
    locale: 'Language',
    sourceEn: 'Source (en)',
    groupAxes: 'Ledger axes',
    groupProof: 'Proof & legs',
    groupAxioms: 'Wing axioms',
    dependsOnLabel: 'Cites',
    wingCatalog: 'Wing vocabulary',
    unboundLabel: 'kernel only',
    gravityLabel: 'Gravity',
    neighboursLabel: 'Neighbours',
    unboundNote: 'no wing def in statement',
    unusedInTheorem: '{n} unused in this theorem',
    gravityUnbound: '0 hexbits (unbound)',
    gravityBound: '{gravity} hexbits · {count} defs',
    axiomIndexBtn: 'wing axiom index',
    unboundIndexBtn: 'unbound index',
    neighboursClique: '{count} in principle clique',
    groupRelated: 'Related',
    keywords: 'Keywords',
    monograph: 'Monograph',
    relatedPubs: 'Publications',
    relatedTheorems: 'Theorems',
    priorArt: 'Prior art',
    unlocks: 'Unlocks',
    waves: 'Waves',
    seals: 'Sealed surfaces',
    moreTheorems: 'more in body',
    groupTenD: '10D aura',
    tenFreeLabel: 'Free',
    tenCompactLabel: 'Compactified',
    tenFreeSummary: 'residue {residue} · ray {ray} · wave {wave}',
    tenCompactSummary: 'period {period}s · rotation {rotation}° — 7 from 3',
    tenQuantumBtn: '10D on /quantum',
    groupChannel: 'UUID channel',
    trinityLabel: 'Hex trinities',
    tailLabel: 'Tail',
    channelNote: 'Route and secure messaging without payload store',
    stationTenLabel: 'Station-10',
  },
  bg: {
    proves: 'Доказва абстракта през измерения',
    provesLede: 'Всяка карта е измерение на твърдението — hexbit адрес, оси на регистъра, измерено предимство.',
    hexbitDoor: 'Hexbit врата',
    readingNote: 'Hexbit четене — превод, запазващ адреса по седемте лъча (не семантичен глос).',
    locale: 'Език',
    sourceEn: 'Източник (en)',
    groupAxes: 'Оси на регистъра',
    groupProof: 'Доказателство и крака',
    groupAxioms: 'Крилни аксиоми',
    dependsOnLabel: 'Цитира',
    wingCatalog: 'Речник на крилото',
    unboundLabel: 'само ядро',
    gravityLabel: 'Гравитация',
    neighboursLabel: 'Съседи',
    unboundNote: 'няма wing def в изявлението',
    unusedInTheorem: '{n} неизползвани в тази теорема',
    gravityUnbound: '0 hexbits (необвързана)',
    gravityBound: '{gravity} hexbits · {count} defs',
    axiomIndexBtn: 'индекс на крилни аксиоми',
    unboundIndexBtn: 'индекс необвързани',
    neighboursClique: '{count} в клика на принципа',
    groupRelated: 'Свързани',
    keywords: 'Ключови думи',
    monograph: 'Монография',
    relatedPubs: 'Публикации',
    relatedTheorems: 'Теореми',
    priorArt: 'Предшественици',
    unlocks: 'Отключвания',
    waves: 'Вълни',
    seals: 'Запечатани повърхности',
    moreTheorems: 'още в текста',
    groupTenD: '10D аура',
    tenFreeLabel: 'Свободни',
    tenCompactLabel: 'Компактизирани',
    tenFreeSummary: 'остатък {residue} · лъч {ray} · вълна {wave}',
    tenCompactSummary: 'период {period}s · завъртане {rotation}° — 7 от 3',
    tenQuantumBtn: '10D на /quantum',
    groupChannel: 'UUID канал',
    trinityLabel: 'Hex trinities',
    tailLabel: 'Опашка',
    channelNote: 'Маршрут и съобщения без payload store',
    stationTenLabel: 'Station-10',
  },
  de: {
    proves: 'Beweist den Abstract über Dimensionen',
    provesLede: 'Jede Karte ist eine Dimension der Behauptung — Hexbit-Adresse, Ledger-Achsen, gemessener Vorteil.',
    hexbitDoor: 'Hexbit-Tür',
    readingNote: 'Hexbit-Lesung — adresswahrende Übersetzung über die sieben Strahlen (kein semantischer Gloss).',
    locale: 'Sprache',
    sourceEn: 'Quelle (en)',
    groupAxes: 'Ledger-Achsen',
    groupProof: 'Beweis & Beine',
    groupAxioms: 'Flügel-Axiome',
    dependsOnLabel: 'Zitiert',
    wingCatalog: 'Flügel-Vokabular',
    unboundLabel: 'nur Kernel',
    gravityLabel: 'Gravitation',
    neighboursLabel: 'Nachbarn',
    unboundNote: 'kein Flügel-def in der Aussage',
    unusedInTheorem: '{n} unbenutzt in diesem Theorem',
    gravityUnbound: '0 Hexbits (ungebunden)',
    gravityBound: '{gravity} Hexbits · {count} defs',
    axiomIndexBtn: 'Flügel-Axiom-Index',
    unboundIndexBtn: 'Ungebunden-Index',
    neighboursClique: '{count} im Prinzip-Klique',
    groupRelated: 'Verwandt',
    keywords: 'Schlüsselwörter',
    monograph: 'Monographie',
    relatedPubs: 'Publikationen',
    relatedTheorems: 'Theoreme',
    priorArt: 'Prior art',
    unlocks: 'Freischaltungen',
    waves: 'Wellen',
    seals: 'Versiegelte Oberflächen',
    moreTheorems: 'mehr im Text',
    groupTenD: '10D-Aura',
    tenFreeLabel: 'Frei',
    tenCompactLabel: 'Kompaktifiziert',
    tenFreeSummary: 'Rest {residue} · Strahl {ray} · Welle {wave}',
    tenCompactSummary: 'Periode {period}s · Drehung {rotation}° — 7 aus 3',
    tenQuantumBtn: '10D auf /quantum',
    groupChannel: 'UUID-Kanal',
    trinityLabel: 'Hex-Trinitäten',
    tailLabel: 'Schweif',
    channelNote: 'Routing und Messaging ohne Payload-Store',
    stationTenLabel: 'Station-10',
  },
  fr: {
    proves: 'Prouve l’abstract à travers les dimensions',
    provesLede: 'Chaque carte est une dimension de l’affirmation — adresse hexbit, axes du registre, avantage mesuré.',
    hexbitDoor: 'Porte hexbit',
    readingNote: 'Lecture hexbit — traduction qui préserve l’adresse sur les sept rayons (pas une glose sémantique).',
    locale: 'Langue',
    sourceEn: 'Source (en)',
    groupAxes: 'Axes du registre',
    groupProof: 'Preuve & jambes',
    groupAxioms: 'Axiomes d\'aile',
    dependsOnLabel: 'Cite',
    wingCatalog: 'Vocabulaire d\'aile',
    unboundLabel: 'noyau seul',
    gravityLabel: 'Gravité',
    neighboursLabel: 'Voisins',
    unboundNote: 'aucun def d\'aile dans l\'énoncé',
    unusedInTheorem: '{n} inutilisés dans ce théorème',
    gravityUnbound: '0 hexbits (non lié)',
    gravityBound: '{gravity} hexbits · {count} defs',
    axiomIndexBtn: 'index des axiomes d\'aile',
    unboundIndexBtn: 'index non liés',
    neighboursClique: '{count} dans la clique du principe',
    groupRelated: 'Lié',
    keywords: 'Mots-clés',
    monograph: 'Monographie',
    relatedPubs: 'Publications',
    relatedTheorems: 'Théorèmes',
    priorArt: 'Antériorité',
    unlocks: 'Déverrouillages',
    waves: 'Vagues',
    seals: 'Surfaces scellées',
    moreTheorems: 'plus dans le corps',
    groupTenD: 'Aura 10D',
    tenFreeLabel: 'Libres',
    tenCompactLabel: 'Compactifiées',
    tenFreeSummary: 'résidu {residue} · rayon {ray} · onde {wave}',
    tenCompactSummary: 'période {period}s · rotation {rotation}° — 7 sur 3',
    tenQuantumBtn: '10D sur /quantum',
    groupChannel: 'Canal UUID',
    trinityLabel: 'Trinités hex',
    tailLabel: 'Queue',
    channelNote: 'Routage et messagerie sans magasin payload',
    stationTenLabel: 'Station-10',
  },
  es: {
    proves: 'Prueba el abstracto a través de dimensiones',
    provesLede: 'Cada tarjeta es una dimensión de la afirmación — dirección hexbit, ejes del registro, ventaja medida.',
    hexbitDoor: 'Puerta hexbit',
    readingNote: 'Lectura hexbit — traducción que preserva la dirección en los siete rayos (no glosa semántica).',
    locale: 'Idioma',
    sourceEn: 'Fuente (en)',
    groupAxes: 'Ejes del registro',
    groupProof: 'Prueba y patas',
    groupAxioms: 'Axiomas del ala',
    dependsOnLabel: 'Cita',
    wingCatalog: 'Vocabulario del ala',
    unboundLabel: 'solo núcleo',
    gravityLabel: 'Gravedad',
    neighboursLabel: 'Vecinos',
    unboundNote: 'sin def de ala en la sentencia',
    unusedInTheorem: '{n} sin usar en este teorema',
    gravityUnbound: '0 hexbits (sin enlace)',
    gravityBound: '{gravity} hexbits · {count} defs',
    axiomIndexBtn: 'índice de axiomas del ala',
    unboundIndexBtn: 'índice sin enlace',
    neighboursClique: '{count} en la clique del principio',
    groupRelated: 'Relacionado',
    keywords: 'Palabras clave',
    monograph: 'Monografía',
    relatedPubs: 'Publicaciones',
    relatedTheorems: 'Teoremas',
    priorArt: 'Arte previo',
    unlocks: 'Desbloqueos',
    waves: 'Olas',
    seals: 'Superficies selladas',
    moreTheorems: 'más en el cuerpo',
    groupTenD: 'Aura 10D',
    tenFreeLabel: 'Libres',
    tenCompactLabel: 'Compactificadas',
    tenFreeSummary: 'residuo {residue} · rayo {ray} · onda {wave}',
    tenCompactSummary: 'periodo {period}s · rotación {rotation}° — 7 de 3',
    tenQuantumBtn: '10D en /quantum',
    groupChannel: 'Canal UUID',
    trinityLabel: 'Trinidades hex',
    tailLabel: 'Cola',
    channelNote: 'Enrutado y mensajería sin almacén payload',
    stationTenLabel: 'Estación-10',
  },
  ru: {
    proves: 'Доказывает абстракт по измерениям',
    provesLede: 'Каждая карточка — измерение утверждения: hexbit-адрес, оси реестра, измеренное преимущество.',
    hexbitDoor: 'Дверь hexbit',
    readingNote: 'Hexbit-чтение — перевод, сохраняющий адрес по семи лучам (не семантический глянец).',
    locale: 'Язык',
    sourceEn: 'Источник (en)',
    groupAxes: 'Оси реестра',
    groupProof: 'Доказательство и ноги',
    groupAxioms: 'Аксиомы крыла',
    dependsOnLabel: 'Цитирует',
    wingCatalog: 'Словарь крыла',
    unboundLabel: 'только ядро',
    gravityLabel: 'Гравитация',
    neighboursLabel: 'Соседи',
    unboundNote: 'нет wing def в утверждении',
    unusedInTheorem: '{n} не используются в этой теореме',
    gravityUnbound: '0 hexbits (независимая)',
    gravityBound: '{gravity} hexbits · {count} defs',
    axiomIndexBtn: 'индекс аксиом крыла',
    unboundIndexBtn: 'индекс независимых',
    neighboursClique: '{count} в клике принципа',
    groupRelated: 'Связанное',
    keywords: 'Ключевые слова',
    monograph: 'Монография',
    relatedPubs: 'Публикации',
    relatedTheorems: 'Теоремы',
    priorArt: 'Предшествующее',
    unlocks: 'Разблокировки',
    waves: 'Волны',
    seals: 'Запечатанные поверхности',
    moreTheorems: 'ещё в тексте',
    groupTenD: 'Аура 10D',
    tenFreeLabel: 'Свободные',
    tenCompactLabel: 'Компактифицированные',
    tenFreeSummary: 'остаток {residue} · луч {ray} · волна {wave}',
    tenCompactSummary: 'период {period}s · вращение {rotation}° — 7 из 3',
    tenQuantumBtn: '10D на /quantum',
    groupChannel: 'UUID-канал',
    trinityLabel: 'Hex-троицы',
    tailLabel: 'Хвост',
    channelNote: 'Маршрут и сообщения без payload store',
    stationTenLabel: 'Станция-10',
  },
  zh: {
    proves: '跨维度证明摘要',
    provesLede: '每张卡片是主张的一个维度——hexbit 地址、账本轴、测得优势。',
    hexbitDoor: 'Hexbit 之门',
    readingNote: 'Hexbit 读法——七束射线保址翻译（非语义意译）。',
    locale: '语言',
    sourceEn: '原文 (en)',
    groupAxes: '账本轴',
    groupProof: '证明与腿',
    groupAxioms: '翼公理',
    dependsOnLabel: '引用',
    wingCatalog: '翼词汇',
    unboundLabel: '仅内核',
    gravityLabel: '引力',
    neighboursLabel: '邻居',
    unboundNote: '陈述中无翼定义',
    unusedInTheorem: '本定理中 {n} 个未使用',
    gravityUnbound: '0 hexbits（未绑定）',
    gravityBound: '{gravity} hexbits · {count} defs',
    axiomIndexBtn: '翼公理索引',
    unboundIndexBtn: '未绑定索引',
    neighboursClique: '原理团中 {count} 个',
    groupRelated: '相关',
    keywords: '关键词',
    monograph: '专著',
    relatedPubs: '出版物',
    relatedTheorems: '定理',
    priorArt: '先前艺术',
    unlocks: '解锁',
    waves: '波',
    seals: '密封面',
    moreTheorems: '正文中更多',
    groupTenD: '10D 光环',
    tenFreeLabel: '自由',
    tenCompactLabel: '紧化',
    tenFreeSummary: '余数 {residue} · 射线 {ray} · 波 {wave}',
    tenCompactSummary: '周期 {period}s · 旋转 {rotation}° — 7 由 3',
    tenQuantumBtn: '/quantum 上的 10D',
    groupChannel: 'UUID 通道',
    trinityLabel: 'Hex 三位一体',
    tailLabel: '尾部',
    channelNote: '路由与消息无需 payload 存储',
    stationTenLabel: 'Station-10',
  },
}

/** Every OBJECT_UI field — parity across rays is gated in object-i18n.test.ts */
export const OBJECT_UI_KEYS = Object.keys(OBJECT_UI.en) as (keyof (typeof OBJECT_UI)['en'])[]

export const primaryRayOf = (tag: string): LocaleRay => {
  const p = String(tag || 'en').toLowerCase().replace(/_/g, '-').split('-')[0] || 'en'
  return (OBJECT_LOCALE_RAYS as readonly string[]).includes(p) ? (p as LocaleRay) : 'en'
}

export interface ObjectTranslation {
  lang: LocaleRay
  tag: string
  text: string
  source: string
  handle: string
  kind: 'identity' | 'hexbit-reading'
  honest: string
}

/**
 * translateObjectText(source, tag) → display text in any supported locale.
 * en → identity; other rays → HEXBIT_WORDS reading of handleOf(toUuid(source)).
 */
export function translateObjectText(source: string, tag = 'en'): ObjectTranslation {
  const raw = String(source ?? '')
  const handle = handleOf(toUuid(raw || '∅'))
  const lang = primaryRayOf(tag)
  if (lang === 'en' || !raw.trim()) {
    return {
      lang, tag: tag || 'en', text: raw, source: raw, handle, kind: 'identity',
      honest: 'en is the identity projection — wings are written in English; other rays read the same handle.',
    }
  }
  const reading = readHexbits(handle, lang)
  return {
    lang, tag, text: reading.words.join(' '), source: raw, handle,
    kind: 'hexbit-reading',
    honest:
      'Hexbit reading of the content-address handle — the fold IS the translation (readings_*_names_sixteen). ' +
      'Not a semantic gloss of Lean prose.',
  }
}

export function objectUi(tag = 'en'): (typeof OBJECT_UI)[LocaleRay] {
  return OBJECT_UI[primaryRayOf(tag)]
}
