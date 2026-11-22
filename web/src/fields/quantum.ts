import type { CollectionBeforeChangeHook, Field } from 'payload'

import { runCircuit } from '@/utilities/qpuCatalogue'

/** A product or variant that is a quantum program: the circuit it runs on qpu's classical exact simulator (the circuit
 *  tool's arguments, as /api/mcp takes them), the outcome the simulator answered and its receipt. */
export const quantumField: Field = {
  name: 'quantum',
  type: 'group',
  admin: {
    description:
      'A circuit run by a classical exact simulator of quantum circuits (ISO/IEC 4879 terms). The outcome is computed when the document is saved, by the same handler as the circuit tool at /api/mcp.',
  },
  fields: [
    {
      name: 'program',
      type: 'json',
      admin: { description: 'The circuit tool\'s arguments: { operations: [{ gate, qubits: [{ kind: "line", x }] }], measure?, repetitions? }' },
    },
    { name: 'outcome', type: 'json', admin: { readOnly: true } },
    { name: 'receipt', type: 'text', admin: { readOnly: true } },
  ],
}

/** The program runs before the document is stored, so a stored outcome is always the simulator's answer to the stored
 *  program. Without a program the outcome and receipt are cleared. */
export const runQuantumProgram: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
  const program = data.quantum?.program ?? (data.quantum === undefined ? originalDoc?.quantum?.program : undefined)
  if (!program || typeof program !== 'object') return data.quantum ? { ...data, quantum: { ...data.quantum, outcome: null, receipt: null } } : data
  const { outcome, receipt } = await runCircuit(program as Record<string, unknown>)
  return { ...data, quantum: { ...data.quantum, program, outcome, receipt } }
}
