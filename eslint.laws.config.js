// eslint.laws.config.js — THE GATE. Only this repository's own laws, so it is GREEN today and a violation of one
// is unmissable. eslint.config.js carries those same rules PLUS typescript-eslint's strict type-checked sets, which
// currently report ~3.7k findings across a mature codebase; that is a debt to measure (`npm run lint:strict`), not
// a thing to mass-rewrite under a guard-green tree. Two commands, because one number that is always red tells you
// nothing, and a gate nobody can pass is a gate nobody runs.
import tsparser from '@typescript-eslint/parser'
import uuidna from './eslint-rules/index.js'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'docs/.vitepress/**', 'packages/*/src/**', 'src/chunks/**', 'lean/**', 'extension/**', 'worker.js', 'handles.js', 'eslint.config.js', 'eslint.laws.config.js', 'eslint-rules/**'] },
  // the TS parser only — no projectService, so this gate needs no type information and stays fast enough to run
  // on every guard rather than only in CI. The laws are syntactic; they do not need to know what a type is.
  { files: ['**/*.ts'], languageOptions: { parser: tsparser }, plugins: { uuidna }, rules: {
      'uuidna/one-handle-derivation': 'error',
      'uuidna/no-clock-no-random': 'error',
      'uuidna/no-float-math': 'error',
  } },
  { files: ['src/scripts/**', '**/*.test.ts'],
    rules: { 'uuidna/no-float-math': 'off', 'uuidna/one-handle-derivation': 'warn' } },
]
