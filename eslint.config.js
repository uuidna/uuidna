// eslint.config.js — STRICT, extended with the uuidna scanner.
//
// typescript-eslint's strict + stylistic type-checked sets carry the general laws; eslint-rules/ carries the ones
// only this repository has, as AST rules rather than as the greps that were enforcing them. The uuidna rules are
// ERRORS: they are not style, they are the difference between a receipt anyone can recompute and one that moves on
// its own. The generated and vendored trees are not linted — a generated file is a report about the source, and
// linting a report tells you nothing the source did not already say.
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import uuidna from './eslint-rules/index.js'

export default tseslint.config(
  // `.claude/worktrees/**` HOLDS OTHER SESSIONS' CHECKOUTS OF THIS SAME REPOSITORY, and linting them lints this tree
  // again through a copy. Measured 2026-09-28: 26 errors, of which 20 were six worktrees reporting the same handful of
  // files — including `docs/.vitepress/home.data.ts`, which the next entry already exempts at the root and which the
  // pattern cannot reach at `.claude/worktrees/<agent>/docs/.vitepress/`. So a rule this tree has decided not to apply
  // was applied anyway, to a file it does not own, in a checkout another session is mid-edit on.
  { ignores: ['dist/**', 'node_modules/**', '.claude/worktrees/**', 'docs/.vitepress/**', 'packages/*/src/**', 'src/chunks/**', 'lean/**', 'extension/**', 'worker.js', 'handles.js'] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    plugins: { uuidna },
    rules: {
      // ── THE UUIDNA LAWS. Errors, not warnings: each one is a recomputability defect, not a preference.
      'uuidna/one-handle-derivation': 'error',
      'uuidna/no-clock-no-random': 'error',
      'uuidna/no-float-math': 'error',
    },
  },
  // The scripts and tests are TOOLS, not the shipped surface: they print, they read the disk, they measure.
  // one-handle-derivation stays ON here but as a WARNING, because the remaining hits are all the DISPLAY case --
  // `${receipt.slice(0, 8)}` inside a log line, which SHOWS a handle rather than minting one. Calling handleOf()
  // there is still the better sentence, so the warning stands rather than an exemption: an `off` would be the rule
  // quietly shrinking to fit what the code already does, which is how a law becomes a description.
  { files: ['src/scripts/**', '**/*.test.ts', 'eslint-rules/**'],
    rules: { 'uuidna/no-float-math': 'off', 'uuidna/one-handle-derivation': 'warn' } },
  { files: ['eslint-rules/**', '*.js'], ...tseslint.configs.disableTypeChecked },
)
