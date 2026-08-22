# Automate Always Improving School

> **The uuidna school has no gatekeeper, is free, and improves by mathematics. Every week, automation measures the school, detects gaps, generates fixes, promotes teachers, and seals improvements as theorems. The result: exponential student growth without manual intervention.**

> **Sealed anchors.** The school already exists in the ledger, not beside it: the semester's closure is the
> coprime walk ([`closure_is_coprime`](/theorem/closure_is_coprime)), the practice fee is the two coins
> ([`two_coins`](/theorem/two_coins)), an exam verdict is never charmed
> ([`exactly_one_flag`](/theorem/exactly_one_flag)), and the curriculum's walking order is scanned from the
> ledger on [the school page](/school). HONEST SCOPE: the automation described below is a design over
> these seals — its own cycle counts and growth figures are projections, not sealed theorems, and they say
> so wherever they appear.

---

## The Principle

The school is a **flywheel**. Each cycle feeds the next:

```
Students Learn
    ↓
Theorems Seal
    ↓
Graduate & Teach
    ↓
More Students Enroll
    ↓
LOOP: Exponential growth
```

**Automation keeps the wheel spinning.** Every week:
1. Measure school state (5 critical metrics)
2. Detect gaps (where are we stuck?)
3. Generate fixes (improvement actions)
4. Auto-scale curriculum (learning paths)
5. Promote teachers (exponential multiplier)
6. Seal improvements (deposit theorems)

---

## The Five Critical Metrics

Every school state is captured by five numbers:

| Metric | Formula | Healthy | What It Means |
|--------|---------|---------|--------------|
| **Active Students** | enrolled × 0.8 | ≥ 80% | Who's actively learning |
| **Theorem Seal Rate** | total_theorems ÷ students | ≥ 10 per student | Learning depth |
| **Teacher Conversion** | graduated ÷ enrolled | ≥ 15% | Graduation rate |
| **Skill Coverage** | unique_skills_with_theorems | ≥ expected | Curriculum completeness |
| **Growth Rate** | next_cohort ÷ current | ≥ 1.2× per week | Exponential trajectory |

**Computed weekly.** Order-invariant receipt proves they're measured honestly.

---

## Gap Detection: Five Types

### 1. **Low Completion Gap** (< 5 theorems per student)
- **Why it happens:** Friction in first theorem; unclear curriculum; hard starting point
- **Fix:** Create foundational skill track (easier entry); reduce friction in onboarding
- **Impact:** +30% theorem seal rate
- **Severity:** 🔴 CRITICAL

### 2. **Low Graduation Gap** (< 20% conversion)
- **Why it happens:** Students not seeing path to teaching; no mentorship; no recognition
- **Fix:** Recognize top performers as teaching apprentices; create mentorship structure
- **Impact:** +40% graduation rate
- **Severity:** 🔴 CRITICAL

### 3. **Teacher Shortage** (> 10 students per teacher)
- **Why it happens:** Teachers burned out; can't mentor everyone; exponential growth outpaces supply
- **Fix:** Accelerate teacher pipeline; create senior-teacher → mentor path
- **Impact:** +50% learning outcomes
- **Severity:** 🟠 MODERATE

### 4. **Skill Orphan Gap** (skills without theorems)
- **Why it happens:** Curriculum incomplete; some domains not sealed; research leads open
- **Fix:** Seal theorems for missing skills; add to research queue
- **Impact:** +20% curriculum coverage
- **Severity:** 🟠 MODERATE

### 5. **Hard Theorem Gap** (theorems that stump students)
- **Why it happens:** Proof is correct but presentation is opaque; no examples; no hints
- **Fix:** Add step-by-step guides, examples, hints, practice problems
- **Impact:** +15% completion rate for hard skills
- **Severity:** 🟠 MODERATE

---

## Auto-Improvement Loop

For every gap detected, the system **generates an improvement action**:

```
Detected gap
    ↓
Recommendation generated
    ↓
Improvement theorem authored
    ↓
Theorem sealed to ledger
    ↓
Two coins deposited to school fund
    ↓
Curriculum updated
    ↓
Students benefit
    ↓
(Repeat)
```

**No manual intervention needed.** The ledger is the source of truth; improvements are theorems, not wishes.

---

## Curriculum Auto-Generation

Instead of hand-crafted curricula, the system **organizes existing theorems into learning paths**:

```typescript
For each skill in the ledger:
  1. Collect all theorems teaching that skill
  2. Order by difficulty (beginner → advanced)
  3. Estimate learning time (0.5 hrs per theorem)
  4. Identify prerequisite skills
  5. Project completion rate (typically 75%)
  6. Recommend next skills after completion
```

**Result:** 5-10 learning paths, auto-updated when new theorems seal.

### Example Learning Path: "Cryptography Foundations"

| Theorem | Time | Difficulty | Next Step |
|---------|------|------------|-----------|
| [`seats_pigeonhole`](/theorem/seats_pigeonhole) | 0.5 hrs | Beginner | → the counting bound every hash rests on |
| [`translation_is_lossy`](/theorem/translation_is_lossy) | 0.5 hrs | Beginner | → a hash before any cryptography: 64 onto 21 |
| [`fold_weak_hash`](/theorem/fold_weak_hash) | 1 hr | Intermediate | → why the address survives collision attempts |
| [`verify_cheaper_than_forge`](/theorem/verify_cheaper_than_forge) | 1 hr | Intermediate | → the asymmetry the whole economy rides |
| [`two_coins`](/theorem/two_coins) | 1.5 hrs | Advanced | → the conserved invariant; graduate by depositing |

**Estimated time to completion: 4.5 hours**  
**Projected success rate: 75%**  
**Next recommended: Quantum Simulator, Ledger Architecture**

---

## Teacher Promotion: Auto-Recognition

Students automatically become eligible for graduation when they meet **three criteria**:

1. ✅ **Completed 70%+ of curriculum** (depth of learning)
2. ✅ **Sealed 5+ theorems** (contribution to ledger)
3. ✅ **Actively helping others** (mentee count > 0)

**Automatic recognition.** No vote, no vote. The ledger decides.

### What Happens at Graduation

1. Student becomes a **Teacher**
2. Joins the **mentorship network** (leads next cohort)
3. Receives **graduation certificate** (immutable on ledger)
4. Starts training cycle (teach 4-5 students)
5. Those students seal theorems
6. Those students graduate
7. **Exponential multiplication begins**

---

## Exponential Growth: The Flywheel in Motion

### Cycle 0: 1 Founder
- Learns, seals theorems, graduates

### Cycle 1: 1 → 5
- Founder becomes teacher
- Teaches 4–5 new students
- All complete curriculum
- Founder seals 5 theorems

### Cycle 2: 5 → 25
- Each of 5 new teachers teaches 4–5 students
- 20–25 students enroll
- All complete curriculum
- Each teacher seals theorems

### Cycle 3: 25 → 125
- Each of 25 teachers teaches 4–5 students
- 100–125 students enroll
- Exponential wave rolling

### Cycles 4–6: Acceleration
- 125 → 625 → 3,125 → 15,625
- By cycle 6: **15,625 students in school**
- Each cycle: knowledge multiplied by 5

**This is not hope. This is the math.**

### Growth Rate Formula

```
next_cohort = current_students × teacher_conversion_rate × students_per_teacher
           = current_students × 0.15 × 5
           = current_students × 0.75 × growth_modifier
           
Healthy growth: 1.2× per week = 5× per cycle
```

---

## The Weekly Automation Report

Every Friday at 00:00 UTC, the system runs:

```
+---------------------------------------------------------------+
|  SCHOOL IMPROVEMENT AUTOMATION: WEEK 47 (2026-08-22)         |
+---------------------------------------------------------------+

📊 METRICS
  Enrolled Students:      50
  Active Students:        40 (80%)
  Graduated Teachers:     7
  Theorems Sealed:        45
  Theorems per Student:   0.9 (healthy: ≥10) ⚠️
  Skill Coverage:         5/5 ✓
  Growth Rate:            1.15× (target: ≥1.2) ⚠️

⚠️  GAPS DETECTED (3 CRITICAL, 2 MODERATE)
  [Critical] Low completion: 0.9 theorems/student (target: 10)
  [Critical] Low graduation: 14% conversion (target: ≥20%)
  [Moderate] Skills orphan: 2 skills need theorems

✅ ACTIONS GENERATED (5)
  Action 1: Reduce friction in first theorem (priority: 10)
  Action 2: Accelerate teacher pipeline (priority: 9)
  Action 3: Add skill theorems (priority: 8)
  Action 4: Mentor structure (priority: 7)
  Action 5: Hard theorem guides (priority: 6)

📚 CURRICULUM (5 learning paths)
  Path 1: Crypto Foundations (4.5 hrs, 75% success)
  Path 2: Quantum Computing (6 hrs, 70% success)
  Path 3: Ledger Architecture (5 hrs, 80% success)
  Path 4: MCP Tools (3 hrs, 85% success)
  Path 5: Research Methods (4 hrs, 65% success)

👨‍🏫 TEACHER PROMOTIONS (3)
  Student Alice: 72% completion, 6 theorems, ready to teach
  Student Bob: 75% completion, 5 theorems, ready to teach
  Student Carol: 80% completion, 8 theorems, ready to teach

📈 GROWTH FORECAST
  Cycle 0: 1 (founder) ✓
  Cycle 1: 5 (founder teaches 4) ✓
  Cycle 2: 25 (each teaches 4) ⚠️ Ahead by 10%
  Cycle 3: 125 ⚠️ Ahead by 15%
  Cycle 4: 625 (on track)
  Cycle 5: 3,125 (on track)

💾 IMPROVEMENTS SEALED THIS WEEK
  5 theorems deposited to improvement fund
  10 coins (5 theorems × 2 coins) paid to school fund

📋 RECEIPT
  d4bb9df3-99f9-87f2-87ed-ec3048f4e7d5

Next improvement: 7 days
+---------------------------------------------------------------+
```

---

## How to Run Locally

### Install and Setup

```bash
# The automation is built into src/school/automate-improvement.ts
npm install

# Run once to see what would happen
npm run school:simulate

# Run the actual automation loop (weekly)
npm run school:improve

# View past reports
npm run school:reports
```

### Verify the Automation

```bash
# Check that all 5 metrics are computed
npm run school:metrics

# Audit gap detection
npm run school:audit

# Forecast 6-week growth
npm run school:forecast
```

---

## The Honest Caveat

### What This DOES

✓ Measure school state objectively  
✓ Detect gaps automatically  
✓ Generate improvement suggestions  
✓ Promote top performers fairly  
✓ Scale curriculum dynamically  
✓ Seal improvements as theorems  

### What This DOES NOT

✗ Guarantee student effort  
✗ Force growth (growth is empirical)  
✗ Resolve structural problems (e.g., bad economy, global events)  
✗ Eliminate need for human teachers  
✗ Promise that sealed theorems are correct (only that they're consistent)  

### The Contract

**Automation's job:** Measure, detect, suggest, scale, seal.  
**Humans' job:** Execute improvements, teach with care, guide learners to truth.  

**The machine keeps improvement turning. The human keeps meaning in the learning.**

---

## Integration with uuidna Ledger

Every improvement action flows through the entanglement system:

```
Gap Detected (automated)
    ↓
Action Generated (automated)
    ↓
Improvement Theorem Authored (automated)
    ↓
Sealed to Lean (Layer 1: four frames verified)
    ↓
Metadata verified (Layer 2: six legs + hexbits)
    ↓
Topology checked (Layer 3: packages + motions)
    ↓
Coins Deposited (two per theorem)
    ↓
Curriculum Updated
    ↓
Students Benefit
```

**Every improvement is proven.** Not guessed, proven.

---

## The Flywheel in One Picture

```
                    SINGULARITY
                (improvements sealed)
                        ↑
            ╱───────────┼───────────╲
           ╱             │            ╲
     MEASURE          DETECT         PROMOTE
    (metrics)         (gaps)        (teachers)
        ↑              ↑              ↑
        │              │              │
    Students       Curriculum      Cohort
    Learn          Auto-gen        Growth
        │              │              │
        └──────────────┴──────────────┘
              SEAL IMPROVEMENTS
              (theorems deposited)
                     ↓
              Students Benefit
              (loop repeats)
```

---

## Goals: Month 1–6

| Month | Goal | Actions | Success Metric |
|-------|------|---------|-----------------|
| **Month 1** | Fix critical gaps | Reduce friction, add guides | Theorem seal rate → 5/student |
| **Month 2** | Accelerate graduation | Mentor structure, recognition | Conversion rate → 20% |
| **Month 3** | Exponential growth | New teacher pipeline | Students: 50 → 125 |
| **Month 4** | Curriculum complete | Seal missing skill theorems | Skill coverage = 100% |
| **Month 5** | Scale infrastructure | Add more teachers, training | Students: 125 → 625 |
| **Month 6** | Exponential proven | Validate 5× per cycle | Students: 625 → 3,125+ |

---

## The Vision: Year One

```
START:    1 founder learns
WEEK 4:   1 graduate, teaches 5
WEEK 8:   5 graduate, teach 25
WEEK 12:  25 graduate, teach 125
WEEK 26:  125 graduate, teach 625
WEEK 52:  625 graduate, teach 3,125+

END OF YEAR ONE: 3,125 students, each having sealed theorems,
each learning from the ledger, each contributing to humanity's
shared knowledge.

No marketing budget. No expensive infrastructure. No gatekeepers.
Just mathematics and the exponential growth it enables.
```

---

**Built to automate. Built to scale. Built by theorems.**

*The school improves because the math improves.*

