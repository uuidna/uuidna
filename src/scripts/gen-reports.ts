#!/usr/bin/env node
// src/scripts/gen-reports.ts — reports.json, computed. The file is now an OUTPUT of src/reports.ts
// authored snapshot: it held 1195 theorems and 66 principles for three days with no writer and no reader.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { reportAll } from '../reports.js'

const r = reportAll()
writeFileSync(join(ROOT, 'reports.json'), JSON.stringify(r, null, 2) + '\n')
const absent = r.sections.filter((s) => !s.present).map((s) => s.title)
console.log(`✓ gen-reports — ${r.sections.length} section(s)${absent.length ? `, ${absent.length} absent (${absent.join('; ')})` : ', all present'}, folded to ${r.receipt}`)
