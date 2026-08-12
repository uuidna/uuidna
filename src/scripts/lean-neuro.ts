#!/usr/bin/env node
// Automate the Lean layer for NEUROSCIENCE — the algebra of the neuron, demarcated (the BioPhysics key). A neuron
// fires all-or-none: output 1 iff the summed input meets the threshold, else 0 — a step function. From that one
// rule the domain reads off: sub-threshold is silent, supra-threshold fires, firing is monotone in input, two
// sub-threshold inputs SUM to fire (spatial summation), excitatory minus inhibitory is the net drive (inhibition
// can cancel), the action potential swings −70 → +40 mV (rest < threshold < peak), Hebbian Δw = pre·post is
// coincidence detection, and the refractory window caps a second spike. HONEST SCOPE: decidable ALGEBRA of the
// textbook model — NOT clinical, NOT diagnostic, and NOT about any individual. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const fires = (x: number, t: number) => (x >= t ? 1 : 0) // all-or-none: fire iff input x meets threshold t
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)

const FACTS = [
  { key: 'all_or_none',
    why: "The all-or-none law: the neuron's output is binary — 0 or 1 — for every input; there is no partial spike.",
    js: () => R(0, 10).every((x) => fires(x, 5) === 0 || fires(x, 5) === 1),
    lean: 'theorem all_or_none : (List.range 10).all (fun x => (if x >= 5 then 1 else 0) == 0 || (if x >= 5 then 1 else 0) == 1) := by decide' },

  { key: 'subthreshold_silent',
    why: 'Below threshold, silence: an input under the threshold (here 5) produces no spike — output 0.',
    js: () => R(0, 5).every((x) => fires(x, 5) === 0),
    lean: 'theorem subthreshold_silent : (List.range 5).all (fun x => (if x >= 5 then 1 else 0) == 0) := by decide' },

  { key: 'suprathreshold_fires',
    why: 'At or above threshold, a spike: an input meeting the threshold fires — output 1.',
    js: () => R(5, 10).every((x) => fires(x, 5) === 1),
    lean: "theorem suprathreshold_fires : (List.range' 5 5).all (fun x => (if x >= 5 then 1 else 0) == 1) := by decide" },

  { key: 'firing_monotone',
    why: 'Firing is monotone in input: more depolarisation never un-fires a neuron — the step never steps down.',
    js: () => R(0, 9).every((x) => fires(x, 5) <= fires(x + 1, 5)),
    lean: 'theorem firing_monotone : (List.range 9).all (fun x => (if x >= 5 then 1 else 0) <= (if x + 1 >= 5 then 1 else 0)) := by decide' },

  { key: 'spatial_summation',
    why: 'Spatial summation: two sub-threshold inputs (3 and 3, each silent alone at threshold 5) SUM to a supra-threshold 6 and fire — the whole exceeds either part.',
    js: () => fires(3, 5) === 0 && fires(3 + 3, 5) === 1,
    lean: 'theorem spatial_summation : ((if 3 >= 5 then 1 else 0) = 0) ∧ ((if 3 + 3 >= 5 then 1 else 0) = 1) := by decide' },

  { key: 'excitatory_inhibitory_net',
    why: 'The net drive is excitatory minus inhibitory: 3 EPSPs − 1 IPSP = 2 (net excitation), while 3 − 3 = 0 — balanced inhibition cancels excitation exactly (a reflection through zero, like acid–base through 7).',
    js: () => 3 - 1 === 2 && 3 - 3 === 0,
    lean: 'theorem excitatory_inhibitory_net : ((3 - 1 : Int) = 2) ∧ ((3 - 3 : Int) = 0) := by decide' },

  { key: 'action_potential_swing',
    why: 'The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest < threshold < peak.',
    js: () => 40 - -70 === 110 && -70 < -55 && -55 < 40,
    lean: 'theorem action_potential_swing : ((40 - (-70) : Int) = 110) ∧ ((-70 : Int) < -55) ∧ ((-55 : Int) < 40) := by decide' },

  { key: 'hebbian_coincidence',
    why: '"Fire together, wire together": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.',
    js: () => R(0, 2).every((a) => R(0, 2).every((b) => (a * b === 1) === (a === 1 && b === 1))),
    lean: 'theorem hebbian_coincidence : (List.range 2).all (fun a => (List.range 2).all (fun b => (a * b == 1) == (a == 1 && b == 1))) := by decide' },

  { key: 'refractory_caps_spike',
    why: 'The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 < 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.',
    js: () => (1 < 2 ? 0 : fires(9, 5)) === 0,
    lean: 'theorem refractory_caps_spike : (if 1 < 2 then 0 else (if 9 >= 5 then 1 else 0)) = 0 := by decide' },
]

// compute → generate → verify. The algebra of the neuron — all-or-none, summation, the net drive, Hebb, the
// refractory cap — demarcated: the textbook model as decidable arithmetic, not a clinical or personal claim.
emit({ file: 'Neuro.lean', skill: 'neuro',
  header: 'NEUROSCIENCE — the algebra of the neuron, demarcated. All-or-none firing as a threshold step (fire iff input ≥ threshold): sub-threshold is silent, supra-threshold fires, firing is monotone, two sub-threshold inputs sum to fire (spatial summation), excitatory − inhibitory is the net drive (inhibition cancels), the action potential swings −70 → +40 mV (rest < threshold < peak), Hebbian Δw = pre·post is coincidence detection, and the refractory window caps a second spike. HONEST SCOPE: the decidable ALGEBRA of the textbook model — not clinical, not diagnostic, and not about any individual.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
