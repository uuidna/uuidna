import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SECURITY — INFORMATION-SECURITY OPERATIONS, AS ARITHMETIC (chosen by the registry). A posture is numbers: the adjusted
 *  severity of a finding, unpatched vulnerabilities, mean time to resolve, exposed assets, a password-strength proxy, the
 *  detection rate, the exposure window, and scan coverage. Crosses to `access`. A measure. */

const PROOF = 'infosec arithmetic (adjusted severity, unpatched count, mean time to resolve, exposed assets, password strength, detection rate, exposure window, scan coverage); a measure crossed to access'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const s = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'security', dst: 'access', formula, value, proof: PROOF, ...extra }, holds, { name: `security.${name}`, params })

export class SecurityFormulas {
  /** THE ADJUSTED SEVERITY of a finding: the base score scaled by a temporal factor (×1). value ⌊base · temporal / 10⌋. */
  static severity(base: number, temporal: number): CrossFormula { return s('security-severity', 'severity(base, temporal) = ⌊base · temporal / 10⌋', Math.floor((base * temporal) / 10), nat(base, temporal), 'severity', [base, temporal]) }
  /** UNPATCHED: vulnerabilities found that are not yet fixed. value max(0, found − fixed). */
  static patch(found: number, fixed: number): CrossFormula { return s('security-patch', 'patch(found, fixed) = max(0, found − fixed)', Math.max(0, found - fixed), nat(found, fixed), 'patch', [found, fixed]) }
  /** MEAN TIME TO RESOLVE: total hours over the incidents. value ⌊total / incidents⌋. */
  static mttr(total: number, incidents: number): CrossFormula { return s('security-mttr', 'mttr(total, incidents) = ⌊total / incidents⌋', incidents > 0 ? Math.floor(total / incidents) : 0, nat(total, incidents) && incidents > 0, 'mttr', [total, incidents]) }
  /** EXPOSED ASSETS: those not behind a control. value max(0, assets − protected). */
  static exposure(assets: number, protectedAssets: number): CrossFormula { return s('security-exposure', 'exposure(assets, protected) = max(0, assets − protected)', Math.max(0, assets - protectedAssets), nat(assets, protectedAssets), 'exposure', [assets, protectedAssets]) }
  /** A PASSWORD-STRENGTH proxy in bits: length times the character classes used. value length · classes. */
  static strength(length: number, classes: number): CrossFormula { return s('security-strength', 'strength(length, classes) = length · classes', length * classes, nat(length, classes), 'strength', [length, classes]) }
  /** THE DETECTION RATE as a percentage: detected over all threats. value ⌊detected · 100 / total⌋. */
  static detection(detected: number, total: number): CrossFormula { return s('security-detection', 'detection(detected, total) = ⌊detected · 100 / total⌋', total > 0 ? Math.floor((detected * 100) / total) : 0, nat(detected, total) && total > 0 && detected <= total, 'detection', [detected, total]) }
  /** THE EXPOSURE WINDOW: days from disclosure to patch. value max(0, patched − disclosed). */
  static window(disclosed: number, patched: number): CrossFormula { return s('security-window', 'window(disclosed, patched) = max(0, patched − disclosed)', Math.max(0, patched - disclosed), nat(disclosed, patched), 'window', [disclosed, patched]) }
  /** SCAN COVERAGE as a percentage: assets scanned over all assets. value ⌊scanned · 100 / total⌋. */
  static coverage(scanned: number, total: number): CrossFormula { return s('security-coverage', 'coverage(scanned, total) = ⌊scanned · 100 / total⌋', total > 0 ? Math.floor((scanned * 100) / total) : 0, nat(scanned, total) && total > 0 && scanned <= total, 'coverage', [scanned, total]) }
}

for (const name of ['coverage', 'detection', 'exposure', 'mttr', 'patch', 'severity', 'strength', 'window'] as const)
  hexRegisterOf('security', name, (SecurityFormulas[name] as (...x: unknown[]) => unknown).bind(SecurityFormulas))
