// eslint-rules — THE UUIDNA SCANNER, as real AST rules rather than as greps.
//
// These laws were already enforced, but by two weaker instruments: a regex finder in src/tests/handle.test.ts and
// the harmonic scan's line matching. A regex cannot tell `address.slice(0, 8)` (minting an identity) from
// `forged.slice(0, 8)` (truncating a list for display) — the first version of the handle finder flagged 18 lines
// of which 3 were real, and a finder that cries wolf is a finder somebody switches off. An AST can tell them
// apart, because it knows what the receiver IS.
//
// Each rule below is a law this repository already holds in prose or in a test. Nothing new is invented here; the
// enforcement is moved to where it can be exact, and to where an editor shows it while the code is being written.

/** the modules allowed to carry a clock, a random, or a network call — the NAMED non-harmonic boundary. A file
 *  declares itself by its own first-line marker, so this list is not a second place to keep in sync. */
const nonHarmonic = (src) => /^\/\/ @non-harmonic:/m.test(src.getText().slice(0, 400))

/** does this expression read as a content-address? The receiver's NAME is the evidence an AST gives us. */
const addressShaped = (node) => {
  const name = node.type === 'Identifier' ? node.name
    : node.type === 'MemberExpression' && node.property.type === 'Identifier' ? node.property.name
    : node.type === 'CallExpression' && node.callee.type === 'Identifier' ? node.callee.name
    : ''
  return /^(address|receipt|superposition|fold|uuid|digest|coin64|toUuid|merkleFold|merkleGravity|merkleRoot)/i.test(name)
}

const oneHandleDerivation = {
  meta: {
    type: 'problem',
    docs: { description: 'a handle comes from handleOf(address) — never from an inline slice of eight' },
    messages: {
      inline: 'This re-derives a handle inline. Call handleOf({{src}}) — see src/handle.ts on why this was seven places agreeing by coincidence.',
      seed: 'This re-derives an address-integer inline. Call seedOf({{src}}) — the same law, one level along.',
    },
    schema: [],
  },
  create(context) {
    const code = context.sourceCode ?? context.getSourceCode()
    return {
      // <expr>.slice(0, 8) where <expr> is address-shaped — the identity mint
      'CallExpression[callee.property.name="slice"]'(node) {
        const [a, b] = node.arguments
        if (!a || !b || a.type !== 'Literal' || a.value !== 0 || b.type !== 'Literal' || b.value !== 8) return
        let recv = node.callee.object
        // see through .replace(/-/g, '') and .toLowerCase() — the strip is incidental, the address is the subject
        while (recv.type === 'CallExpression' && recv.callee.type === 'MemberExpression') recv = recv.callee.object
        if (!addressShaped(recv)) return
        // the one derivation, and the seed built on it, are allowed to do this
        const fn = context.filename ?? context.getFilename()
        if (/[/\\]handle\.ts$/.test(fn)) return
        const parent = node.parent
        const isSeed = parent && parent.type === 'CallExpression' &&
          ((parent.callee.type === 'Identifier' && parent.callee.name === 'parseInt') ||
           (parent.callee.type === 'Identifier' && parent.callee.name === 'BigInt'))
        context.report({ node, messageId: isSeed ? 'seed' : 'inline', data: { src: code.getText(recv).slice(0, 40) } })
      },
    }
  },
}

const noClockNoRandom = {
  meta: {
    type: 'problem',
    docs: { description: 'a receipt that moves on its own is not recomputable — no clock, no RNG outside the named boundary' },
    messages: { banned: '{{what}} makes this unrecomputable. A file that genuinely needs it declares `// @non-harmonic:` on its first line and says why.' },
    schema: [],
  },
  create(context) {
    const code = context.sourceCode ?? context.getSourceCode()
    if (nonHarmonic(code)) return {}
    const report = (node, what) => context.report({ node, messageId: 'banned', data: { what } })
    return {
      'CallExpression[callee.object.name="Math"][callee.property.name="random"]': (n) => report(n, 'Math.random()'),
      'CallExpression[callee.object.name="Date"][callee.property.name="now"]': (n) => report(n, 'Date.now()'),
      'NewExpression[callee.name="Date"]': (n) => { if (!n.arguments.length) report(n, 'new Date()') },
    }
  },
}

const noFloatMath = {
  meta: {
    type: 'problem',
    docs: { description: 'the folds are exact integer arithmetic — Math.* rounds, and a rounded receipt is not a receipt' },
    messages: { floaty: 'Math.{{fn}} is float arithmetic. The folds here are exact integers — write the integer form (FLOOR(n/2) is (n - n%2)/2).' },
    schema: [],
  },
  create(context) {
    return {
      'MemberExpression[object.name="Math"]'(node) {
        if (node.property.type !== 'Identifier') return
        const fn = node.property.name
        if (fn === 'random') return   // owned by no-clock-no-random, so one defect is never reported twice
        context.report({ node, messageId: 'floaty', data: { fn } })
      },
    }
  },
}

export default {
  rules: {
    'one-handle-derivation': oneHandleDerivation,
    'no-clock-no-random': noClockNoRandom,
    'no-float-math': noFloatMath,
  },
}
