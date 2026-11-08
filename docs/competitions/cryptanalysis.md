# XPRIZE Quantum Applications: cryptanalysis candidate

Status: candidate analysis, not a submission. It records what the sources establish and where the criteria are not met.

The application is factoring RSA integers with Shor's algorithm. The family pool gives the domain (`cryptanalysis`), but the family itself is arithmetic (keyspace, brute force time, entropy), so the evidence below comes from published sources, not from the family.

## The criteria

From the [XPRIZE annual report](https://annualreport.xprize.org/news/from-promise-to-proof-what-qualified-the-2025-xprize-quantum-applications-phase-i-finalists):

- **Phase I:** the real-world application and the novelty of the quantum approach; advantage is a hypothesis to be demonstrated; the approach must be benchmarkable against strong classical baselines.
- **Phase II:** the hardware the algorithm needs; evidence it beats the best classical approach; a projected real-world impact on fault-tolerant hardware.

## Classical baseline

The best classical method for factoring is the general number field sieve (GNFS).

- The largest public factorisations are now RSA-896 (896 bits, 19 September 2026, Stephen A. Weis with Claude's assistance; method and cost not stated on [Wikipedia's records page](https://en.wikipedia.org/wiki/Integer_factorization_records)) and RSA-260 (862 bits, 3 September 2026, Eric Lu at Cognition). The RSA-260 run was a GPU-accelerated GNFS based on CADO-NFS, about 4,900 GPU-days by the author's own estimate; the [Cognition post](https://cognition.com/blog/factoring-rsa-260) reports no algorithmic advance, only GPU performance engineering, and says RSA-2048 is not meaningfully affected. The post does not describe a primality test or a checksum check, so the RSA-260 factors are not verified here.
- The previous CPU record, RSA-250 (829 bits), was completed in February 2020 with CADO-NFS at roughly 2,700 core-years: 2,450 for sieving and 250 for the matrix stage, on Intel Xeon Gold 6130 CPUs at 2.1 GHz, per [Schneier on Security](https://www.schneier.com/blog/archives/2020/04/rsa-250_factore.html). The Schneier post is dated April 2020. The February 2020 date is from the Wikipedia records page.
- Extrapolating from RSA-896 with GNFS's heuristic complexity, RSA-2048 is about 3.5 × 10^10 times the work. Applied to RSA-896's reported effort of about 30 GPU-years (a secondary report, not verified), that is roughly 10^12 GPU-years, a rough order of magnitude only. The same heuristic from RSA-250 gives about 2.3 × 10^11 times its work. This is an asymptotic estimate, not a measurement. The heuristic puts RSA-250 at about 6.1 times the work of RSA-768. The reported costs, taken raw, give 1.35 (2,700 core-years on Xeon Gold 6130 CPUs against about 2,000 single-core years on 2.2 GHz Opterons), but that mixes hardware generations. Normalising per core: the [Xeon Gold 6130 scores 75.6](https://open.spec.org/cpu2006/results/res2018q2/cpu2006-20171225-51504.html) and the [Opteron 2427 scores 14.7](https://www.spec.org/cpu2006/results/res2009q3/cpu2006-20090811-08364.html) on SPECint_base2006, single copy, a ratio of 5.14. Applied to RSA-250, that gives about 13,900 Opteron core-years, and against RSA-768 a normalised ratio of 6.9, within about 13% of the heuristic. The normalisation assumes that CINT2006 stands in for the sieving code, that the paper's 2.2 GHz Opteron is comparable to the 2427 (the paper names no model), and that the 2017 Xeon's turbo to 3.7 GHz applies to a single copy. With the heuristic calibrated this way, the remaining uncertainty for RSA-2048 is the heuristic's own form at that size, which I have not measured. It is the classical side of any Phase II comparison. A measured baseline would need a run at the target size.
- RSA-768 (768 bits) was factored on 12 December 2009 by Kleinjung et al. ([CWI paper](https://ir.cwi.nl/pub/16870/16870D.pdf)). The paper gives "almost 2000 years of computing on a single core 2.2GHz AMD Opteron"; sieving alone is "about fifteen hundred years" on that core; polynomial selection took half a year on 80 processors, about 3% of the main task; linear algebra took 119 calendar days, and the paper gives no core-year figure for it.

## Quantum resources

- [Gidney (arXiv:2505.15917, May 2025)](https://arxiv.org/pdf/2505.15917v1) estimates RSA-2048 in under a week with fewer than one million noisy qubits. The assumptions: a square grid with nearest-neighbour connections, 0.1% uniform gate error, a 1 µs surface-code cycle and 10 µs control reaction time.
- The same paper compares with the 2019 estimate of about 20 million noisy qubits and eight hours.
- The `@uuidna/qpu` package (the `processor` tool) states the Willow processor at 105 qubits. The gap to one million is four orders of magnitude.

## Criteria met and not met

| Criterion | Status |
| --- | --- |
| Real-world application | Met. RSA factoring is the threat model for public-key cryptography. |
| Novelty of the approach | Not met for Shor's algorithm itself (1994). The estimate is a reduced-resource contribution, one of the three contribution types the XPRIZE report lists. |
| Quantum advantage demonstrated | Not met. The [survey of factoring on quantum computers (arXiv:2410.14397)](https://arxiv.org/html/2410.14397v2) reports that on digital hardware only N ≤ 35 has been factored with Shor's algorithm (experiments from 2001 to 2019). Its largest Shor result, 39 bits (N = 549 755 813 701), is a 2023 simulation on 2048 GPUs of JUWELS Booster, not hardware. The largest hardware factorisation, 23 bits (2024), is a D-Wave annealer, not Shor's algorithm. The survey also flags many claims of larger digital factorisations as unsound. Nothing has factored an RSA-sized integer with a quantum computer, and no run compares against GNFS. A search for 2026 records found none, but that search used secondary sources. |
| Benchmarkable | Partly met. The resource estimate is computable from its stated assumptions; the benchmark would need hardware that does not exist. |
| Hardware the algorithm needs | Met as an estimate: about one million noisy qubits under the stated assumptions. |
| Evidence of advantage over the best classical approach | Not met. The comparison is between a projected quantum runtime and an extrapolated classical one. |
| Projected impact on fault-tolerant hardware | Met in outline: a fault-tolerant machine of that size would break RSA-2048 keys. The projection stops there. |

## What would close the gaps

- A measured GNFS baseline at the target size, on stated hardware.
- A Shor resource estimate computed by the qpu package for the instance, not quoted from the paper.
- Demonstrated quantum factoring at any size, with a classical comparison on the same instance. Without it, the advantage criterion stays open.

Phase I can be argued on the reduced-resource contribution alone. Phase II cannot be claimed without the advantage evidence.
