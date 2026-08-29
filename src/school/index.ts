// src/school — the school's automation, one concept per folder, the extension never names the face.
// automate/improvement: the weekly measure → detect → fix → promote cycle.
// practice/feedback/loop: student trials fed back into the curriculum.
export * from './automate/improvement/index.js'
export * from './practice/feedback/loop/index.js'
// the open doors — the unverified organised in topics for the school (lead 88b)
export { openQuestions, placeItem, isInvolutionShaped, type OpenItem, type OpenTopic, type PlacedItem } from './open/questions/index.js'
// the leads roster — held, refuted, and refused, so none is invisible at school
export { schoolLeads, leadsCensus, renderSchoolLeads, LEAD_KINDS, type SchoolLead, type LeadsRecord } from './leads/index.js'
// laboratory — labs entangled to theorems and related resources; sufficient for every admitted domain
export {
  labOf, domainLab, schoolLabs, simulationKind, LAB_CITES,
  type Lab, type LabMember, type LabKind, type SimulationKind, type Simulation, type Emulator, type DomainLab, type SchoolLabs,
} from './laboratory/index.js'
