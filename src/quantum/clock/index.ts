// clock — the quantum computer's time, which is a POSITION and never a reading. See clock/step for why a hardware
// clock is the one component this machine is forbidden, and clock/order for what a clock without a now can still say.
export { tick, advance, residueOf, type Tick } from './step.js'
export { isAfter, agree, between } from './order.js'
