import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** IOT — DEVICES AND TELEMETRY, AS ARITHMETIC (chosen by the registry). A sensor fleet is numbers: samples taken, battery
 *  life, telemetry volume, the duty cycle, hop latency, the payload size, the heartbeat count, and signal range. Crosses
 *  to `obs`. A measure. */

const PROOF = 'IoT arithmetic (sampling, battery life, telemetry volume, duty cycle, hop latency, payload size, heartbeats, range); a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const i = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'iot', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `iot.${name}`, params })

export class IotFormulas {
  /** SAMPLES: the sampling rate over a span of seconds. value hz · seconds. */
  static sampling(hz: number, seconds: number): CrossFormula { return i('iot-sampling', 'sampling(hz, seconds) = hz · seconds', hz * seconds, nat(hz, seconds), 'sampling', [hz, seconds]) }
  /** BATTERY LIFE in hours: capacity over the draw. value ⌊capacity / draw⌋. */
  static battery(capacity: number, draw: number): CrossFormula { return i('iot-battery', 'battery(capacity, draw) = ⌊capacity / draw⌋', draw > 0 ? Math.floor(capacity / draw) : 0, nat(capacity, draw) && draw > 0, 'battery', [capacity, draw]) }
  /** TELEMETRY VOLUME: devices at a message rate. value devices · rate. */
  static telemetry(devices: number, rate: number): CrossFormula { return i('iot-telemetry', 'telemetry(devices, rate) = devices · rate', devices * rate, nat(devices, rate), 'telemetry', [devices, rate]) }
  /** THE DUTY CYCLE as a percentage: active over the period. value ⌊active · 100 / period⌋. */
  static duty(active: number, period: number): CrossFormula { return i('iot-duty', 'duty(active, period) = ⌊active · 100 / period⌋', period > 0 ? Math.floor((active * 100) / period) : 0, nat(active, period) && period > 0 && active <= period, 'duty', [active, period]) }
  /** HOP LATENCY: hops at a per-hop delay. value hops · perHop. */
  static latency(hops: number, perHop: number): CrossFormula { return i('iot-latency', 'latency(hops, perHop) = hops · perHop', hops * perHop, nat(hops, perHop), 'latency', [hops, perHop]) }
  /** THE PAYLOAD SIZE: fields at bytes each. value fields · bytes. */
  static payload(fields: number, bytes: number): CrossFormula { return i('iot-payload', 'payload(fields, bytes) = fields · bytes', fields * bytes, nat(fields, bytes), 'payload', [fields, bytes]) }
  /** HEARTBEATS expected in a window at an interval. value ⌊window / interval⌋. */
  static heartbeat(window: number, interval: number): CrossFormula { return i('iot-heartbeat', 'heartbeat(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0, nat(window, interval) && interval > 0, 'heartbeat', [window, interval]) }
  /** RANGE proxy: transmit power over the path loss. value ⌊power / loss⌋. */
  static range(power: number, loss: number): CrossFormula { return i('iot-range', 'range(power, loss) = ⌊power / loss⌋', loss > 0 ? Math.floor(power / loss) : 0, nat(power, loss) && loss > 0, 'range', [power, loss]) }
}

for (const name of ['battery', 'duty', 'heartbeat', 'latency', 'payload', 'range', 'sampling', 'telemetry'] as const)
  hexRegisterOf('iot', name, (IotFormulas[name] as (...x: unknown[]) => unknown).bind(IotFormulas))
