-- lean/HexSpan3.lean — GENERATED. THE FOUR-HEX SPAN, PART 3 — addresses 2000…2fff of 65536. Each surface decides two facts about ONE address, both computed by the kernel: the address reassembles from its own four nibbles, and its nibble sum is congruent to it modulo 15 (casting out fifteens, the base-16 analogue of casting out nines). The span is 2^16 because that is the square root of the 2^32 an eight-hex handle addresses — the BIRTHDAY POINT of this tree's identity scheme, the count at which two different contents begin sharing an address as often as not. Filling it populates the capacity with the objects the capacity exists for. The naming is taken from the axiom families rather than invented: every statement here classifies as ENUMERATION under familyOf, and the name is that family plus the address, so the address IS the identity and no two names can collide. Emitted in lane-sized files because a flat walk of this width exceeds Lean's recursion depth — 128 passes, 256 fails, measured — and one enormous file would hold a lane while the others idle. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def nibbles (n : Nat) : List Nat := (List.range 4).map (fun k => (n / (16 ^ k)) % 16)

def reassembles (n : Nat) : Bool := (nibbles n).foldr (fun d a => a * 16 + d) 0 == n

def castsFifteens (n : Nat) : Bool := ((nibbles n).foldl (fun a d => a + d) 0) % 15 == n % 15

/-- 2000: nibbles fold back to 8192; digit sum 2 ≡ 8192 (mod 15). -/
theorem enumeration_hex4_2000 : reassembles 8192 = true ∧ castsFifteens 8192 = true := by decide

/-- 2001: nibbles fold back to 8193; digit sum 3 ≡ 8193 (mod 15). -/
theorem enumeration_hex4_2001 : reassembles 8193 = true ∧ castsFifteens 8193 = true := by decide

/-- 2002: nibbles fold back to 8194; digit sum 4 ≡ 8194 (mod 15). -/
theorem enumeration_hex4_2002 : reassembles 8194 = true ∧ castsFifteens 8194 = true := by decide

/-- 2003: nibbles fold back to 8195; digit sum 5 ≡ 8195 (mod 15). -/
theorem enumeration_hex4_2003 : reassembles 8195 = true ∧ castsFifteens 8195 = true := by decide

/-- 2004: nibbles fold back to 8196; digit sum 6 ≡ 8196 (mod 15). -/
theorem enumeration_hex4_2004 : reassembles 8196 = true ∧ castsFifteens 8196 = true := by decide

/-- 2005: nibbles fold back to 8197; digit sum 7 ≡ 8197 (mod 15). -/
theorem enumeration_hex4_2005 : reassembles 8197 = true ∧ castsFifteens 8197 = true := by decide

/-- 2006: nibbles fold back to 8198; digit sum 8 ≡ 8198 (mod 15). -/
theorem enumeration_hex4_2006 : reassembles 8198 = true ∧ castsFifteens 8198 = true := by decide

/-- 2007: nibbles fold back to 8199; digit sum 9 ≡ 8199 (mod 15). -/
theorem enumeration_hex4_2007 : reassembles 8199 = true ∧ castsFifteens 8199 = true := by decide

/-- 2008: nibbles fold back to 8200; digit sum 10 ≡ 8200 (mod 15). -/
theorem enumeration_hex4_2008 : reassembles 8200 = true ∧ castsFifteens 8200 = true := by decide

/-- 2009: nibbles fold back to 8201; digit sum 11 ≡ 8201 (mod 15). -/
theorem enumeration_hex4_2009 : reassembles 8201 = true ∧ castsFifteens 8201 = true := by decide

/-- 200a: nibbles fold back to 8202; digit sum 12 ≡ 8202 (mod 15). -/
theorem enumeration_hex4_200a : reassembles 8202 = true ∧ castsFifteens 8202 = true := by decide

/-- 200b: nibbles fold back to 8203; digit sum 13 ≡ 8203 (mod 15). -/
theorem enumeration_hex4_200b : reassembles 8203 = true ∧ castsFifteens 8203 = true := by decide

/-- 200c: nibbles fold back to 8204; digit sum 14 ≡ 8204 (mod 15). -/
theorem enumeration_hex4_200c : reassembles 8204 = true ∧ castsFifteens 8204 = true := by decide

/-- 200d: nibbles fold back to 8205; digit sum 15 ≡ 8205 (mod 15). -/
theorem enumeration_hex4_200d : reassembles 8205 = true ∧ castsFifteens 8205 = true := by decide

/-- 200e: nibbles fold back to 8206; digit sum 16 ≡ 8206 (mod 15). -/
theorem enumeration_hex4_200e : reassembles 8206 = true ∧ castsFifteens 8206 = true := by decide

/-- 200f: nibbles fold back to 8207; digit sum 17 ≡ 8207 (mod 15). -/
theorem enumeration_hex4_200f : reassembles 8207 = true ∧ castsFifteens 8207 = true := by decide

/-- 2010: nibbles fold back to 8208; digit sum 3 ≡ 8208 (mod 15). -/
theorem enumeration_hex4_2010 : reassembles 8208 = true ∧ castsFifteens 8208 = true := by decide

/-- 2011: nibbles fold back to 8209; digit sum 4 ≡ 8209 (mod 15). -/
theorem enumeration_hex4_2011 : reassembles 8209 = true ∧ castsFifteens 8209 = true := by decide

/-- 2012: nibbles fold back to 8210; digit sum 5 ≡ 8210 (mod 15). -/
theorem enumeration_hex4_2012 : reassembles 8210 = true ∧ castsFifteens 8210 = true := by decide

/-- 2013: nibbles fold back to 8211; digit sum 6 ≡ 8211 (mod 15). -/
theorem enumeration_hex4_2013 : reassembles 8211 = true ∧ castsFifteens 8211 = true := by decide

/-- 2014: nibbles fold back to 8212; digit sum 7 ≡ 8212 (mod 15). -/
theorem enumeration_hex4_2014 : reassembles 8212 = true ∧ castsFifteens 8212 = true := by decide

/-- 2015: nibbles fold back to 8213; digit sum 8 ≡ 8213 (mod 15). -/
theorem enumeration_hex4_2015 : reassembles 8213 = true ∧ castsFifteens 8213 = true := by decide

/-- 2016: nibbles fold back to 8214; digit sum 9 ≡ 8214 (mod 15). -/
theorem enumeration_hex4_2016 : reassembles 8214 = true ∧ castsFifteens 8214 = true := by decide

/-- 2017: nibbles fold back to 8215; digit sum 10 ≡ 8215 (mod 15). -/
theorem enumeration_hex4_2017 : reassembles 8215 = true ∧ castsFifteens 8215 = true := by decide

/-- 2018: nibbles fold back to 8216; digit sum 11 ≡ 8216 (mod 15). -/
theorem enumeration_hex4_2018 : reassembles 8216 = true ∧ castsFifteens 8216 = true := by decide

/-- 2019: nibbles fold back to 8217; digit sum 12 ≡ 8217 (mod 15). -/
theorem enumeration_hex4_2019 : reassembles 8217 = true ∧ castsFifteens 8217 = true := by decide

/-- 201a: nibbles fold back to 8218; digit sum 13 ≡ 8218 (mod 15). -/
theorem enumeration_hex4_201a : reassembles 8218 = true ∧ castsFifteens 8218 = true := by decide

/-- 201b: nibbles fold back to 8219; digit sum 14 ≡ 8219 (mod 15). -/
theorem enumeration_hex4_201b : reassembles 8219 = true ∧ castsFifteens 8219 = true := by decide

/-- 201c: nibbles fold back to 8220; digit sum 15 ≡ 8220 (mod 15). -/
theorem enumeration_hex4_201c : reassembles 8220 = true ∧ castsFifteens 8220 = true := by decide

/-- 201d: nibbles fold back to 8221; digit sum 16 ≡ 8221 (mod 15). -/
theorem enumeration_hex4_201d : reassembles 8221 = true ∧ castsFifteens 8221 = true := by decide

/-- 201e: nibbles fold back to 8222; digit sum 17 ≡ 8222 (mod 15). -/
theorem enumeration_hex4_201e : reassembles 8222 = true ∧ castsFifteens 8222 = true := by decide

/-- 201f: nibbles fold back to 8223; digit sum 18 ≡ 8223 (mod 15). -/
theorem enumeration_hex4_201f : reassembles 8223 = true ∧ castsFifteens 8223 = true := by decide

/-- 2020: nibbles fold back to 8224; digit sum 4 ≡ 8224 (mod 15). -/
theorem enumeration_hex4_2020 : reassembles 8224 = true ∧ castsFifteens 8224 = true := by decide

/-- 2021: nibbles fold back to 8225; digit sum 5 ≡ 8225 (mod 15). -/
theorem enumeration_hex4_2021 : reassembles 8225 = true ∧ castsFifteens 8225 = true := by decide

/-- 2022: nibbles fold back to 8226; digit sum 6 ≡ 8226 (mod 15). -/
theorem enumeration_hex4_2022 : reassembles 8226 = true ∧ castsFifteens 8226 = true := by decide

/-- 2023: nibbles fold back to 8227; digit sum 7 ≡ 8227 (mod 15). -/
theorem enumeration_hex4_2023 : reassembles 8227 = true ∧ castsFifteens 8227 = true := by decide

/-- 2024: nibbles fold back to 8228; digit sum 8 ≡ 8228 (mod 15). -/
theorem enumeration_hex4_2024 : reassembles 8228 = true ∧ castsFifteens 8228 = true := by decide

/-- 2025: nibbles fold back to 8229; digit sum 9 ≡ 8229 (mod 15). -/
theorem enumeration_hex4_2025 : reassembles 8229 = true ∧ castsFifteens 8229 = true := by decide

/-- 2026: nibbles fold back to 8230; digit sum 10 ≡ 8230 (mod 15). -/
theorem enumeration_hex4_2026 : reassembles 8230 = true ∧ castsFifteens 8230 = true := by decide

/-- 2027: nibbles fold back to 8231; digit sum 11 ≡ 8231 (mod 15). -/
theorem enumeration_hex4_2027 : reassembles 8231 = true ∧ castsFifteens 8231 = true := by decide

/-- 2028: nibbles fold back to 8232; digit sum 12 ≡ 8232 (mod 15). -/
theorem enumeration_hex4_2028 : reassembles 8232 = true ∧ castsFifteens 8232 = true := by decide

/-- 2029: nibbles fold back to 8233; digit sum 13 ≡ 8233 (mod 15). -/
theorem enumeration_hex4_2029 : reassembles 8233 = true ∧ castsFifteens 8233 = true := by decide

/-- 202a: nibbles fold back to 8234; digit sum 14 ≡ 8234 (mod 15). -/
theorem enumeration_hex4_202a : reassembles 8234 = true ∧ castsFifteens 8234 = true := by decide

/-- 202b: nibbles fold back to 8235; digit sum 15 ≡ 8235 (mod 15). -/
theorem enumeration_hex4_202b : reassembles 8235 = true ∧ castsFifteens 8235 = true := by decide

/-- 202c: nibbles fold back to 8236; digit sum 16 ≡ 8236 (mod 15). -/
theorem enumeration_hex4_202c : reassembles 8236 = true ∧ castsFifteens 8236 = true := by decide

/-- 202d: nibbles fold back to 8237; digit sum 17 ≡ 8237 (mod 15). -/
theorem enumeration_hex4_202d : reassembles 8237 = true ∧ castsFifteens 8237 = true := by decide

/-- 202e: nibbles fold back to 8238; digit sum 18 ≡ 8238 (mod 15). -/
theorem enumeration_hex4_202e : reassembles 8238 = true ∧ castsFifteens 8238 = true := by decide

/-- 202f: nibbles fold back to 8239; digit sum 19 ≡ 8239 (mod 15). -/
theorem enumeration_hex4_202f : reassembles 8239 = true ∧ castsFifteens 8239 = true := by decide

/-- 2030: nibbles fold back to 8240; digit sum 5 ≡ 8240 (mod 15). -/
theorem enumeration_hex4_2030 : reassembles 8240 = true ∧ castsFifteens 8240 = true := by decide

/-- 2031: nibbles fold back to 8241; digit sum 6 ≡ 8241 (mod 15). -/
theorem enumeration_hex4_2031 : reassembles 8241 = true ∧ castsFifteens 8241 = true := by decide

/-- 2032: nibbles fold back to 8242; digit sum 7 ≡ 8242 (mod 15). -/
theorem enumeration_hex4_2032 : reassembles 8242 = true ∧ castsFifteens 8242 = true := by decide

/-- 2033: nibbles fold back to 8243; digit sum 8 ≡ 8243 (mod 15). -/
theorem enumeration_hex4_2033 : reassembles 8243 = true ∧ castsFifteens 8243 = true := by decide

/-- 2034: nibbles fold back to 8244; digit sum 9 ≡ 8244 (mod 15). -/
theorem enumeration_hex4_2034 : reassembles 8244 = true ∧ castsFifteens 8244 = true := by decide

/-- 2035: nibbles fold back to 8245; digit sum 10 ≡ 8245 (mod 15). -/
theorem enumeration_hex4_2035 : reassembles 8245 = true ∧ castsFifteens 8245 = true := by decide

/-- 2036: nibbles fold back to 8246; digit sum 11 ≡ 8246 (mod 15). -/
theorem enumeration_hex4_2036 : reassembles 8246 = true ∧ castsFifteens 8246 = true := by decide

/-- 2037: nibbles fold back to 8247; digit sum 12 ≡ 8247 (mod 15). -/
theorem enumeration_hex4_2037 : reassembles 8247 = true ∧ castsFifteens 8247 = true := by decide

/-- 2038: nibbles fold back to 8248; digit sum 13 ≡ 8248 (mod 15). -/
theorem enumeration_hex4_2038 : reassembles 8248 = true ∧ castsFifteens 8248 = true := by decide

/-- 2039: nibbles fold back to 8249; digit sum 14 ≡ 8249 (mod 15). -/
theorem enumeration_hex4_2039 : reassembles 8249 = true ∧ castsFifteens 8249 = true := by decide

/-- 203a: nibbles fold back to 8250; digit sum 15 ≡ 8250 (mod 15). -/
theorem enumeration_hex4_203a : reassembles 8250 = true ∧ castsFifteens 8250 = true := by decide

/-- 203b: nibbles fold back to 8251; digit sum 16 ≡ 8251 (mod 15). -/
theorem enumeration_hex4_203b : reassembles 8251 = true ∧ castsFifteens 8251 = true := by decide

/-- 203c: nibbles fold back to 8252; digit sum 17 ≡ 8252 (mod 15). -/
theorem enumeration_hex4_203c : reassembles 8252 = true ∧ castsFifteens 8252 = true := by decide

/-- 203d: nibbles fold back to 8253; digit sum 18 ≡ 8253 (mod 15). -/
theorem enumeration_hex4_203d : reassembles 8253 = true ∧ castsFifteens 8253 = true := by decide

/-- 203e: nibbles fold back to 8254; digit sum 19 ≡ 8254 (mod 15). -/
theorem enumeration_hex4_203e : reassembles 8254 = true ∧ castsFifteens 8254 = true := by decide

/-- 203f: nibbles fold back to 8255; digit sum 20 ≡ 8255 (mod 15). -/
theorem enumeration_hex4_203f : reassembles 8255 = true ∧ castsFifteens 8255 = true := by decide

/-- 2040: nibbles fold back to 8256; digit sum 6 ≡ 8256 (mod 15). -/
theorem enumeration_hex4_2040 : reassembles 8256 = true ∧ castsFifteens 8256 = true := by decide

/-- 2041: nibbles fold back to 8257; digit sum 7 ≡ 8257 (mod 15). -/
theorem enumeration_hex4_2041 : reassembles 8257 = true ∧ castsFifteens 8257 = true := by decide

/-- 2042: nibbles fold back to 8258; digit sum 8 ≡ 8258 (mod 15). -/
theorem enumeration_hex4_2042 : reassembles 8258 = true ∧ castsFifteens 8258 = true := by decide

/-- 2043: nibbles fold back to 8259; digit sum 9 ≡ 8259 (mod 15). -/
theorem enumeration_hex4_2043 : reassembles 8259 = true ∧ castsFifteens 8259 = true := by decide

/-- 2044: nibbles fold back to 8260; digit sum 10 ≡ 8260 (mod 15). -/
theorem enumeration_hex4_2044 : reassembles 8260 = true ∧ castsFifteens 8260 = true := by decide

/-- 2045: nibbles fold back to 8261; digit sum 11 ≡ 8261 (mod 15). -/
theorem enumeration_hex4_2045 : reassembles 8261 = true ∧ castsFifteens 8261 = true := by decide

/-- 2046: nibbles fold back to 8262; digit sum 12 ≡ 8262 (mod 15). -/
theorem enumeration_hex4_2046 : reassembles 8262 = true ∧ castsFifteens 8262 = true := by decide

/-- 2047: nibbles fold back to 8263; digit sum 13 ≡ 8263 (mod 15). -/
theorem enumeration_hex4_2047 : reassembles 8263 = true ∧ castsFifteens 8263 = true := by decide

/-- 2048: nibbles fold back to 8264; digit sum 14 ≡ 8264 (mod 15). -/
theorem enumeration_hex4_2048 : reassembles 8264 = true ∧ castsFifteens 8264 = true := by decide

/-- 2049: nibbles fold back to 8265; digit sum 15 ≡ 8265 (mod 15). -/
theorem enumeration_hex4_2049 : reassembles 8265 = true ∧ castsFifteens 8265 = true := by decide

/-- 204a: nibbles fold back to 8266; digit sum 16 ≡ 8266 (mod 15). -/
theorem enumeration_hex4_204a : reassembles 8266 = true ∧ castsFifteens 8266 = true := by decide

/-- 204b: nibbles fold back to 8267; digit sum 17 ≡ 8267 (mod 15). -/
theorem enumeration_hex4_204b : reassembles 8267 = true ∧ castsFifteens 8267 = true := by decide

/-- 204c: nibbles fold back to 8268; digit sum 18 ≡ 8268 (mod 15). -/
theorem enumeration_hex4_204c : reassembles 8268 = true ∧ castsFifteens 8268 = true := by decide

/-- 204d: nibbles fold back to 8269; digit sum 19 ≡ 8269 (mod 15). -/
theorem enumeration_hex4_204d : reassembles 8269 = true ∧ castsFifteens 8269 = true := by decide

/-- 204e: nibbles fold back to 8270; digit sum 20 ≡ 8270 (mod 15). -/
theorem enumeration_hex4_204e : reassembles 8270 = true ∧ castsFifteens 8270 = true := by decide

/-- 204f: nibbles fold back to 8271; digit sum 21 ≡ 8271 (mod 15). -/
theorem enumeration_hex4_204f : reassembles 8271 = true ∧ castsFifteens 8271 = true := by decide

/-- 2050: nibbles fold back to 8272; digit sum 7 ≡ 8272 (mod 15). -/
theorem enumeration_hex4_2050 : reassembles 8272 = true ∧ castsFifteens 8272 = true := by decide

/-- 2051: nibbles fold back to 8273; digit sum 8 ≡ 8273 (mod 15). -/
theorem enumeration_hex4_2051 : reassembles 8273 = true ∧ castsFifteens 8273 = true := by decide

/-- 2052: nibbles fold back to 8274; digit sum 9 ≡ 8274 (mod 15). -/
theorem enumeration_hex4_2052 : reassembles 8274 = true ∧ castsFifteens 8274 = true := by decide

/-- 2053: nibbles fold back to 8275; digit sum 10 ≡ 8275 (mod 15). -/
theorem enumeration_hex4_2053 : reassembles 8275 = true ∧ castsFifteens 8275 = true := by decide

/-- 2054: nibbles fold back to 8276; digit sum 11 ≡ 8276 (mod 15). -/
theorem enumeration_hex4_2054 : reassembles 8276 = true ∧ castsFifteens 8276 = true := by decide

/-- 2055: nibbles fold back to 8277; digit sum 12 ≡ 8277 (mod 15). -/
theorem enumeration_hex4_2055 : reassembles 8277 = true ∧ castsFifteens 8277 = true := by decide

/-- 2056: nibbles fold back to 8278; digit sum 13 ≡ 8278 (mod 15). -/
theorem enumeration_hex4_2056 : reassembles 8278 = true ∧ castsFifteens 8278 = true := by decide

/-- 2057: nibbles fold back to 8279; digit sum 14 ≡ 8279 (mod 15). -/
theorem enumeration_hex4_2057 : reassembles 8279 = true ∧ castsFifteens 8279 = true := by decide

/-- 2058: nibbles fold back to 8280; digit sum 15 ≡ 8280 (mod 15). -/
theorem enumeration_hex4_2058 : reassembles 8280 = true ∧ castsFifteens 8280 = true := by decide

/-- 2059: nibbles fold back to 8281; digit sum 16 ≡ 8281 (mod 15). -/
theorem enumeration_hex4_2059 : reassembles 8281 = true ∧ castsFifteens 8281 = true := by decide

/-- 205a: nibbles fold back to 8282; digit sum 17 ≡ 8282 (mod 15). -/
theorem enumeration_hex4_205a : reassembles 8282 = true ∧ castsFifteens 8282 = true := by decide

/-- 205b: nibbles fold back to 8283; digit sum 18 ≡ 8283 (mod 15). -/
theorem enumeration_hex4_205b : reassembles 8283 = true ∧ castsFifteens 8283 = true := by decide

/-- 205c: nibbles fold back to 8284; digit sum 19 ≡ 8284 (mod 15). -/
theorem enumeration_hex4_205c : reassembles 8284 = true ∧ castsFifteens 8284 = true := by decide

/-- 205d: nibbles fold back to 8285; digit sum 20 ≡ 8285 (mod 15). -/
theorem enumeration_hex4_205d : reassembles 8285 = true ∧ castsFifteens 8285 = true := by decide

/-- 205e: nibbles fold back to 8286; digit sum 21 ≡ 8286 (mod 15). -/
theorem enumeration_hex4_205e : reassembles 8286 = true ∧ castsFifteens 8286 = true := by decide

/-- 205f: nibbles fold back to 8287; digit sum 22 ≡ 8287 (mod 15). -/
theorem enumeration_hex4_205f : reassembles 8287 = true ∧ castsFifteens 8287 = true := by decide

/-- 2060: nibbles fold back to 8288; digit sum 8 ≡ 8288 (mod 15). -/
theorem enumeration_hex4_2060 : reassembles 8288 = true ∧ castsFifteens 8288 = true := by decide

/-- 2061: nibbles fold back to 8289; digit sum 9 ≡ 8289 (mod 15). -/
theorem enumeration_hex4_2061 : reassembles 8289 = true ∧ castsFifteens 8289 = true := by decide

/-- 2062: nibbles fold back to 8290; digit sum 10 ≡ 8290 (mod 15). -/
theorem enumeration_hex4_2062 : reassembles 8290 = true ∧ castsFifteens 8290 = true := by decide

/-- 2063: nibbles fold back to 8291; digit sum 11 ≡ 8291 (mod 15). -/
theorem enumeration_hex4_2063 : reassembles 8291 = true ∧ castsFifteens 8291 = true := by decide

/-- 2064: nibbles fold back to 8292; digit sum 12 ≡ 8292 (mod 15). -/
theorem enumeration_hex4_2064 : reassembles 8292 = true ∧ castsFifteens 8292 = true := by decide

/-- 2065: nibbles fold back to 8293; digit sum 13 ≡ 8293 (mod 15). -/
theorem enumeration_hex4_2065 : reassembles 8293 = true ∧ castsFifteens 8293 = true := by decide

/-- 2066: nibbles fold back to 8294; digit sum 14 ≡ 8294 (mod 15). -/
theorem enumeration_hex4_2066 : reassembles 8294 = true ∧ castsFifteens 8294 = true := by decide

/-- 2067: nibbles fold back to 8295; digit sum 15 ≡ 8295 (mod 15). -/
theorem enumeration_hex4_2067 : reassembles 8295 = true ∧ castsFifteens 8295 = true := by decide

/-- 2068: nibbles fold back to 8296; digit sum 16 ≡ 8296 (mod 15). -/
theorem enumeration_hex4_2068 : reassembles 8296 = true ∧ castsFifteens 8296 = true := by decide

/-- 2069: nibbles fold back to 8297; digit sum 17 ≡ 8297 (mod 15). -/
theorem enumeration_hex4_2069 : reassembles 8297 = true ∧ castsFifteens 8297 = true := by decide

/-- 206a: nibbles fold back to 8298; digit sum 18 ≡ 8298 (mod 15). -/
theorem enumeration_hex4_206a : reassembles 8298 = true ∧ castsFifteens 8298 = true := by decide

/-- 206b: nibbles fold back to 8299; digit sum 19 ≡ 8299 (mod 15). -/
theorem enumeration_hex4_206b : reassembles 8299 = true ∧ castsFifteens 8299 = true := by decide

/-- 206c: nibbles fold back to 8300; digit sum 20 ≡ 8300 (mod 15). -/
theorem enumeration_hex4_206c : reassembles 8300 = true ∧ castsFifteens 8300 = true := by decide

/-- 206d: nibbles fold back to 8301; digit sum 21 ≡ 8301 (mod 15). -/
theorem enumeration_hex4_206d : reassembles 8301 = true ∧ castsFifteens 8301 = true := by decide

/-- 206e: nibbles fold back to 8302; digit sum 22 ≡ 8302 (mod 15). -/
theorem enumeration_hex4_206e : reassembles 8302 = true ∧ castsFifteens 8302 = true := by decide

/-- 206f: nibbles fold back to 8303; digit sum 23 ≡ 8303 (mod 15). -/
theorem enumeration_hex4_206f : reassembles 8303 = true ∧ castsFifteens 8303 = true := by decide

/-- 2070: nibbles fold back to 8304; digit sum 9 ≡ 8304 (mod 15). -/
theorem enumeration_hex4_2070 : reassembles 8304 = true ∧ castsFifteens 8304 = true := by decide

/-- 2071: nibbles fold back to 8305; digit sum 10 ≡ 8305 (mod 15). -/
theorem enumeration_hex4_2071 : reassembles 8305 = true ∧ castsFifteens 8305 = true := by decide

/-- 2072: nibbles fold back to 8306; digit sum 11 ≡ 8306 (mod 15). -/
theorem enumeration_hex4_2072 : reassembles 8306 = true ∧ castsFifteens 8306 = true := by decide

/-- 2073: nibbles fold back to 8307; digit sum 12 ≡ 8307 (mod 15). -/
theorem enumeration_hex4_2073 : reassembles 8307 = true ∧ castsFifteens 8307 = true := by decide

/-- 2074: nibbles fold back to 8308; digit sum 13 ≡ 8308 (mod 15). -/
theorem enumeration_hex4_2074 : reassembles 8308 = true ∧ castsFifteens 8308 = true := by decide

/-- 2075: nibbles fold back to 8309; digit sum 14 ≡ 8309 (mod 15). -/
theorem enumeration_hex4_2075 : reassembles 8309 = true ∧ castsFifteens 8309 = true := by decide

/-- 2076: nibbles fold back to 8310; digit sum 15 ≡ 8310 (mod 15). -/
theorem enumeration_hex4_2076 : reassembles 8310 = true ∧ castsFifteens 8310 = true := by decide

/-- 2077: nibbles fold back to 8311; digit sum 16 ≡ 8311 (mod 15). -/
theorem enumeration_hex4_2077 : reassembles 8311 = true ∧ castsFifteens 8311 = true := by decide

/-- 2078: nibbles fold back to 8312; digit sum 17 ≡ 8312 (mod 15). -/
theorem enumeration_hex4_2078 : reassembles 8312 = true ∧ castsFifteens 8312 = true := by decide

/-- 2079: nibbles fold back to 8313; digit sum 18 ≡ 8313 (mod 15). -/
theorem enumeration_hex4_2079 : reassembles 8313 = true ∧ castsFifteens 8313 = true := by decide

/-- 207a: nibbles fold back to 8314; digit sum 19 ≡ 8314 (mod 15). -/
theorem enumeration_hex4_207a : reassembles 8314 = true ∧ castsFifteens 8314 = true := by decide

/-- 207b: nibbles fold back to 8315; digit sum 20 ≡ 8315 (mod 15). -/
theorem enumeration_hex4_207b : reassembles 8315 = true ∧ castsFifteens 8315 = true := by decide

/-- 207c: nibbles fold back to 8316; digit sum 21 ≡ 8316 (mod 15). -/
theorem enumeration_hex4_207c : reassembles 8316 = true ∧ castsFifteens 8316 = true := by decide

/-- 207d: nibbles fold back to 8317; digit sum 22 ≡ 8317 (mod 15). -/
theorem enumeration_hex4_207d : reassembles 8317 = true ∧ castsFifteens 8317 = true := by decide

/-- 207e: nibbles fold back to 8318; digit sum 23 ≡ 8318 (mod 15). -/
theorem enumeration_hex4_207e : reassembles 8318 = true ∧ castsFifteens 8318 = true := by decide

/-- 207f: nibbles fold back to 8319; digit sum 24 ≡ 8319 (mod 15). -/
theorem enumeration_hex4_207f : reassembles 8319 = true ∧ castsFifteens 8319 = true := by decide

/-- 2080: nibbles fold back to 8320; digit sum 10 ≡ 8320 (mod 15). -/
theorem enumeration_hex4_2080 : reassembles 8320 = true ∧ castsFifteens 8320 = true := by decide

/-- 2081: nibbles fold back to 8321; digit sum 11 ≡ 8321 (mod 15). -/
theorem enumeration_hex4_2081 : reassembles 8321 = true ∧ castsFifteens 8321 = true := by decide

/-- 2082: nibbles fold back to 8322; digit sum 12 ≡ 8322 (mod 15). -/
theorem enumeration_hex4_2082 : reassembles 8322 = true ∧ castsFifteens 8322 = true := by decide

/-- 2083: nibbles fold back to 8323; digit sum 13 ≡ 8323 (mod 15). -/
theorem enumeration_hex4_2083 : reassembles 8323 = true ∧ castsFifteens 8323 = true := by decide

/-- 2084: nibbles fold back to 8324; digit sum 14 ≡ 8324 (mod 15). -/
theorem enumeration_hex4_2084 : reassembles 8324 = true ∧ castsFifteens 8324 = true := by decide

/-- 2085: nibbles fold back to 8325; digit sum 15 ≡ 8325 (mod 15). -/
theorem enumeration_hex4_2085 : reassembles 8325 = true ∧ castsFifteens 8325 = true := by decide

/-- 2086: nibbles fold back to 8326; digit sum 16 ≡ 8326 (mod 15). -/
theorem enumeration_hex4_2086 : reassembles 8326 = true ∧ castsFifteens 8326 = true := by decide

/-- 2087: nibbles fold back to 8327; digit sum 17 ≡ 8327 (mod 15). -/
theorem enumeration_hex4_2087 : reassembles 8327 = true ∧ castsFifteens 8327 = true := by decide

/-- 2088: nibbles fold back to 8328; digit sum 18 ≡ 8328 (mod 15). -/
theorem enumeration_hex4_2088 : reassembles 8328 = true ∧ castsFifteens 8328 = true := by decide

/-- 2089: nibbles fold back to 8329; digit sum 19 ≡ 8329 (mod 15). -/
theorem enumeration_hex4_2089 : reassembles 8329 = true ∧ castsFifteens 8329 = true := by decide

/-- 208a: nibbles fold back to 8330; digit sum 20 ≡ 8330 (mod 15). -/
theorem enumeration_hex4_208a : reassembles 8330 = true ∧ castsFifteens 8330 = true := by decide

/-- 208b: nibbles fold back to 8331; digit sum 21 ≡ 8331 (mod 15). -/
theorem enumeration_hex4_208b : reassembles 8331 = true ∧ castsFifteens 8331 = true := by decide

/-- 208c: nibbles fold back to 8332; digit sum 22 ≡ 8332 (mod 15). -/
theorem enumeration_hex4_208c : reassembles 8332 = true ∧ castsFifteens 8332 = true := by decide

/-- 208d: nibbles fold back to 8333; digit sum 23 ≡ 8333 (mod 15). -/
theorem enumeration_hex4_208d : reassembles 8333 = true ∧ castsFifteens 8333 = true := by decide

/-- 208e: nibbles fold back to 8334; digit sum 24 ≡ 8334 (mod 15). -/
theorem enumeration_hex4_208e : reassembles 8334 = true ∧ castsFifteens 8334 = true := by decide

/-- 208f: nibbles fold back to 8335; digit sum 25 ≡ 8335 (mod 15). -/
theorem enumeration_hex4_208f : reassembles 8335 = true ∧ castsFifteens 8335 = true := by decide

/-- 2090: nibbles fold back to 8336; digit sum 11 ≡ 8336 (mod 15). -/
theorem enumeration_hex4_2090 : reassembles 8336 = true ∧ castsFifteens 8336 = true := by decide

/-- 2091: nibbles fold back to 8337; digit sum 12 ≡ 8337 (mod 15). -/
theorem enumeration_hex4_2091 : reassembles 8337 = true ∧ castsFifteens 8337 = true := by decide

/-- 2092: nibbles fold back to 8338; digit sum 13 ≡ 8338 (mod 15). -/
theorem enumeration_hex4_2092 : reassembles 8338 = true ∧ castsFifteens 8338 = true := by decide

/-- 2093: nibbles fold back to 8339; digit sum 14 ≡ 8339 (mod 15). -/
theorem enumeration_hex4_2093 : reassembles 8339 = true ∧ castsFifteens 8339 = true := by decide

/-- 2094: nibbles fold back to 8340; digit sum 15 ≡ 8340 (mod 15). -/
theorem enumeration_hex4_2094 : reassembles 8340 = true ∧ castsFifteens 8340 = true := by decide

/-- 2095: nibbles fold back to 8341; digit sum 16 ≡ 8341 (mod 15). -/
theorem enumeration_hex4_2095 : reassembles 8341 = true ∧ castsFifteens 8341 = true := by decide

/-- 2096: nibbles fold back to 8342; digit sum 17 ≡ 8342 (mod 15). -/
theorem enumeration_hex4_2096 : reassembles 8342 = true ∧ castsFifteens 8342 = true := by decide

/-- 2097: nibbles fold back to 8343; digit sum 18 ≡ 8343 (mod 15). -/
theorem enumeration_hex4_2097 : reassembles 8343 = true ∧ castsFifteens 8343 = true := by decide

/-- 2098: nibbles fold back to 8344; digit sum 19 ≡ 8344 (mod 15). -/
theorem enumeration_hex4_2098 : reassembles 8344 = true ∧ castsFifteens 8344 = true := by decide

/-- 2099: nibbles fold back to 8345; digit sum 20 ≡ 8345 (mod 15). -/
theorem enumeration_hex4_2099 : reassembles 8345 = true ∧ castsFifteens 8345 = true := by decide

/-- 209a: nibbles fold back to 8346; digit sum 21 ≡ 8346 (mod 15). -/
theorem enumeration_hex4_209a : reassembles 8346 = true ∧ castsFifteens 8346 = true := by decide

/-- 209b: nibbles fold back to 8347; digit sum 22 ≡ 8347 (mod 15). -/
theorem enumeration_hex4_209b : reassembles 8347 = true ∧ castsFifteens 8347 = true := by decide

/-- 209c: nibbles fold back to 8348; digit sum 23 ≡ 8348 (mod 15). -/
theorem enumeration_hex4_209c : reassembles 8348 = true ∧ castsFifteens 8348 = true := by decide

/-- 209d: nibbles fold back to 8349; digit sum 24 ≡ 8349 (mod 15). -/
theorem enumeration_hex4_209d : reassembles 8349 = true ∧ castsFifteens 8349 = true := by decide

/-- 209e: nibbles fold back to 8350; digit sum 25 ≡ 8350 (mod 15). -/
theorem enumeration_hex4_209e : reassembles 8350 = true ∧ castsFifteens 8350 = true := by decide

/-- 209f: nibbles fold back to 8351; digit sum 26 ≡ 8351 (mod 15). -/
theorem enumeration_hex4_209f : reassembles 8351 = true ∧ castsFifteens 8351 = true := by decide

/-- 20a0: nibbles fold back to 8352; digit sum 12 ≡ 8352 (mod 15). -/
theorem enumeration_hex4_20a0 : reassembles 8352 = true ∧ castsFifteens 8352 = true := by decide

/-- 20a1: nibbles fold back to 8353; digit sum 13 ≡ 8353 (mod 15). -/
theorem enumeration_hex4_20a1 : reassembles 8353 = true ∧ castsFifteens 8353 = true := by decide

/-- 20a2: nibbles fold back to 8354; digit sum 14 ≡ 8354 (mod 15). -/
theorem enumeration_hex4_20a2 : reassembles 8354 = true ∧ castsFifteens 8354 = true := by decide

/-- 20a3: nibbles fold back to 8355; digit sum 15 ≡ 8355 (mod 15). -/
theorem enumeration_hex4_20a3 : reassembles 8355 = true ∧ castsFifteens 8355 = true := by decide

/-- 20a4: nibbles fold back to 8356; digit sum 16 ≡ 8356 (mod 15). -/
theorem enumeration_hex4_20a4 : reassembles 8356 = true ∧ castsFifteens 8356 = true := by decide

/-- 20a5: nibbles fold back to 8357; digit sum 17 ≡ 8357 (mod 15). -/
theorem enumeration_hex4_20a5 : reassembles 8357 = true ∧ castsFifteens 8357 = true := by decide

/-- 20a6: nibbles fold back to 8358; digit sum 18 ≡ 8358 (mod 15). -/
theorem enumeration_hex4_20a6 : reassembles 8358 = true ∧ castsFifteens 8358 = true := by decide

/-- 20a7: nibbles fold back to 8359; digit sum 19 ≡ 8359 (mod 15). -/
theorem enumeration_hex4_20a7 : reassembles 8359 = true ∧ castsFifteens 8359 = true := by decide

/-- 20a8: nibbles fold back to 8360; digit sum 20 ≡ 8360 (mod 15). -/
theorem enumeration_hex4_20a8 : reassembles 8360 = true ∧ castsFifteens 8360 = true := by decide

/-- 20a9: nibbles fold back to 8361; digit sum 21 ≡ 8361 (mod 15). -/
theorem enumeration_hex4_20a9 : reassembles 8361 = true ∧ castsFifteens 8361 = true := by decide

/-- 20aa: nibbles fold back to 8362; digit sum 22 ≡ 8362 (mod 15). -/
theorem enumeration_hex4_20aa : reassembles 8362 = true ∧ castsFifteens 8362 = true := by decide

/-- 20ab: nibbles fold back to 8363; digit sum 23 ≡ 8363 (mod 15). -/
theorem enumeration_hex4_20ab : reassembles 8363 = true ∧ castsFifteens 8363 = true := by decide

/-- 20ac: nibbles fold back to 8364; digit sum 24 ≡ 8364 (mod 15). -/
theorem enumeration_hex4_20ac : reassembles 8364 = true ∧ castsFifteens 8364 = true := by decide

/-- 20ad: nibbles fold back to 8365; digit sum 25 ≡ 8365 (mod 15). -/
theorem enumeration_hex4_20ad : reassembles 8365 = true ∧ castsFifteens 8365 = true := by decide

/-- 20ae: nibbles fold back to 8366; digit sum 26 ≡ 8366 (mod 15). -/
theorem enumeration_hex4_20ae : reassembles 8366 = true ∧ castsFifteens 8366 = true := by decide

/-- 20af: nibbles fold back to 8367; digit sum 27 ≡ 8367 (mod 15). -/
theorem enumeration_hex4_20af : reassembles 8367 = true ∧ castsFifteens 8367 = true := by decide

/-- 20b0: nibbles fold back to 8368; digit sum 13 ≡ 8368 (mod 15). -/
theorem enumeration_hex4_20b0 : reassembles 8368 = true ∧ castsFifteens 8368 = true := by decide

/-- 20b1: nibbles fold back to 8369; digit sum 14 ≡ 8369 (mod 15). -/
theorem enumeration_hex4_20b1 : reassembles 8369 = true ∧ castsFifteens 8369 = true := by decide

/-- 20b2: nibbles fold back to 8370; digit sum 15 ≡ 8370 (mod 15). -/
theorem enumeration_hex4_20b2 : reassembles 8370 = true ∧ castsFifteens 8370 = true := by decide

/-- 20b3: nibbles fold back to 8371; digit sum 16 ≡ 8371 (mod 15). -/
theorem enumeration_hex4_20b3 : reassembles 8371 = true ∧ castsFifteens 8371 = true := by decide

/-- 20b4: nibbles fold back to 8372; digit sum 17 ≡ 8372 (mod 15). -/
theorem enumeration_hex4_20b4 : reassembles 8372 = true ∧ castsFifteens 8372 = true := by decide

/-- 20b5: nibbles fold back to 8373; digit sum 18 ≡ 8373 (mod 15). -/
theorem enumeration_hex4_20b5 : reassembles 8373 = true ∧ castsFifteens 8373 = true := by decide

/-- 20b6: nibbles fold back to 8374; digit sum 19 ≡ 8374 (mod 15). -/
theorem enumeration_hex4_20b6 : reassembles 8374 = true ∧ castsFifteens 8374 = true := by decide

/-- 20b7: nibbles fold back to 8375; digit sum 20 ≡ 8375 (mod 15). -/
theorem enumeration_hex4_20b7 : reassembles 8375 = true ∧ castsFifteens 8375 = true := by decide

/-- 20b8: nibbles fold back to 8376; digit sum 21 ≡ 8376 (mod 15). -/
theorem enumeration_hex4_20b8 : reassembles 8376 = true ∧ castsFifteens 8376 = true := by decide

/-- 20b9: nibbles fold back to 8377; digit sum 22 ≡ 8377 (mod 15). -/
theorem enumeration_hex4_20b9 : reassembles 8377 = true ∧ castsFifteens 8377 = true := by decide

/-- 20ba: nibbles fold back to 8378; digit sum 23 ≡ 8378 (mod 15). -/
theorem enumeration_hex4_20ba : reassembles 8378 = true ∧ castsFifteens 8378 = true := by decide

/-- 20bb: nibbles fold back to 8379; digit sum 24 ≡ 8379 (mod 15). -/
theorem enumeration_hex4_20bb : reassembles 8379 = true ∧ castsFifteens 8379 = true := by decide

/-- 20bc: nibbles fold back to 8380; digit sum 25 ≡ 8380 (mod 15). -/
theorem enumeration_hex4_20bc : reassembles 8380 = true ∧ castsFifteens 8380 = true := by decide

/-- 20bd: nibbles fold back to 8381; digit sum 26 ≡ 8381 (mod 15). -/
theorem enumeration_hex4_20bd : reassembles 8381 = true ∧ castsFifteens 8381 = true := by decide

/-- 20be: nibbles fold back to 8382; digit sum 27 ≡ 8382 (mod 15). -/
theorem enumeration_hex4_20be : reassembles 8382 = true ∧ castsFifteens 8382 = true := by decide

/-- 20bf: nibbles fold back to 8383; digit sum 28 ≡ 8383 (mod 15). -/
theorem enumeration_hex4_20bf : reassembles 8383 = true ∧ castsFifteens 8383 = true := by decide

/-- 20c0: nibbles fold back to 8384; digit sum 14 ≡ 8384 (mod 15). -/
theorem enumeration_hex4_20c0 : reassembles 8384 = true ∧ castsFifteens 8384 = true := by decide

/-- 20c1: nibbles fold back to 8385; digit sum 15 ≡ 8385 (mod 15). -/
theorem enumeration_hex4_20c1 : reassembles 8385 = true ∧ castsFifteens 8385 = true := by decide

/-- 20c2: nibbles fold back to 8386; digit sum 16 ≡ 8386 (mod 15). -/
theorem enumeration_hex4_20c2 : reassembles 8386 = true ∧ castsFifteens 8386 = true := by decide

/-- 20c3: nibbles fold back to 8387; digit sum 17 ≡ 8387 (mod 15). -/
theorem enumeration_hex4_20c3 : reassembles 8387 = true ∧ castsFifteens 8387 = true := by decide

/-- 20c4: nibbles fold back to 8388; digit sum 18 ≡ 8388 (mod 15). -/
theorem enumeration_hex4_20c4 : reassembles 8388 = true ∧ castsFifteens 8388 = true := by decide

/-- 20c5: nibbles fold back to 8389; digit sum 19 ≡ 8389 (mod 15). -/
theorem enumeration_hex4_20c5 : reassembles 8389 = true ∧ castsFifteens 8389 = true := by decide

/-- 20c6: nibbles fold back to 8390; digit sum 20 ≡ 8390 (mod 15). -/
theorem enumeration_hex4_20c6 : reassembles 8390 = true ∧ castsFifteens 8390 = true := by decide

/-- 20c7: nibbles fold back to 8391; digit sum 21 ≡ 8391 (mod 15). -/
theorem enumeration_hex4_20c7 : reassembles 8391 = true ∧ castsFifteens 8391 = true := by decide

/-- 20c8: nibbles fold back to 8392; digit sum 22 ≡ 8392 (mod 15). -/
theorem enumeration_hex4_20c8 : reassembles 8392 = true ∧ castsFifteens 8392 = true := by decide

/-- 20c9: nibbles fold back to 8393; digit sum 23 ≡ 8393 (mod 15). -/
theorem enumeration_hex4_20c9 : reassembles 8393 = true ∧ castsFifteens 8393 = true := by decide

/-- 20ca: nibbles fold back to 8394; digit sum 24 ≡ 8394 (mod 15). -/
theorem enumeration_hex4_20ca : reassembles 8394 = true ∧ castsFifteens 8394 = true := by decide

/-- 20cb: nibbles fold back to 8395; digit sum 25 ≡ 8395 (mod 15). -/
theorem enumeration_hex4_20cb : reassembles 8395 = true ∧ castsFifteens 8395 = true := by decide

/-- 20cc: nibbles fold back to 8396; digit sum 26 ≡ 8396 (mod 15). -/
theorem enumeration_hex4_20cc : reassembles 8396 = true ∧ castsFifteens 8396 = true := by decide

/-- 20cd: nibbles fold back to 8397; digit sum 27 ≡ 8397 (mod 15). -/
theorem enumeration_hex4_20cd : reassembles 8397 = true ∧ castsFifteens 8397 = true := by decide

/-- 20ce: nibbles fold back to 8398; digit sum 28 ≡ 8398 (mod 15). -/
theorem enumeration_hex4_20ce : reassembles 8398 = true ∧ castsFifteens 8398 = true := by decide

/-- 20cf: nibbles fold back to 8399; digit sum 29 ≡ 8399 (mod 15). -/
theorem enumeration_hex4_20cf : reassembles 8399 = true ∧ castsFifteens 8399 = true := by decide

/-- 20d0: nibbles fold back to 8400; digit sum 15 ≡ 8400 (mod 15). -/
theorem enumeration_hex4_20d0 : reassembles 8400 = true ∧ castsFifteens 8400 = true := by decide

/-- 20d1: nibbles fold back to 8401; digit sum 16 ≡ 8401 (mod 15). -/
theorem enumeration_hex4_20d1 : reassembles 8401 = true ∧ castsFifteens 8401 = true := by decide

/-- 20d2: nibbles fold back to 8402; digit sum 17 ≡ 8402 (mod 15). -/
theorem enumeration_hex4_20d2 : reassembles 8402 = true ∧ castsFifteens 8402 = true := by decide

/-- 20d3: nibbles fold back to 8403; digit sum 18 ≡ 8403 (mod 15). -/
theorem enumeration_hex4_20d3 : reassembles 8403 = true ∧ castsFifteens 8403 = true := by decide

/-- 20d4: nibbles fold back to 8404; digit sum 19 ≡ 8404 (mod 15). -/
theorem enumeration_hex4_20d4 : reassembles 8404 = true ∧ castsFifteens 8404 = true := by decide

/-- 20d5: nibbles fold back to 8405; digit sum 20 ≡ 8405 (mod 15). -/
theorem enumeration_hex4_20d5 : reassembles 8405 = true ∧ castsFifteens 8405 = true := by decide

/-- 20d6: nibbles fold back to 8406; digit sum 21 ≡ 8406 (mod 15). -/
theorem enumeration_hex4_20d6 : reassembles 8406 = true ∧ castsFifteens 8406 = true := by decide

/-- 20d7: nibbles fold back to 8407; digit sum 22 ≡ 8407 (mod 15). -/
theorem enumeration_hex4_20d7 : reassembles 8407 = true ∧ castsFifteens 8407 = true := by decide

/-- 20d8: nibbles fold back to 8408; digit sum 23 ≡ 8408 (mod 15). -/
theorem enumeration_hex4_20d8 : reassembles 8408 = true ∧ castsFifteens 8408 = true := by decide

/-- 20d9: nibbles fold back to 8409; digit sum 24 ≡ 8409 (mod 15). -/
theorem enumeration_hex4_20d9 : reassembles 8409 = true ∧ castsFifteens 8409 = true := by decide

/-- 20da: nibbles fold back to 8410; digit sum 25 ≡ 8410 (mod 15). -/
theorem enumeration_hex4_20da : reassembles 8410 = true ∧ castsFifteens 8410 = true := by decide

/-- 20db: nibbles fold back to 8411; digit sum 26 ≡ 8411 (mod 15). -/
theorem enumeration_hex4_20db : reassembles 8411 = true ∧ castsFifteens 8411 = true := by decide

/-- 20dc: nibbles fold back to 8412; digit sum 27 ≡ 8412 (mod 15). -/
theorem enumeration_hex4_20dc : reassembles 8412 = true ∧ castsFifteens 8412 = true := by decide

/-- 20dd: nibbles fold back to 8413; digit sum 28 ≡ 8413 (mod 15). -/
theorem enumeration_hex4_20dd : reassembles 8413 = true ∧ castsFifteens 8413 = true := by decide

/-- 20de: nibbles fold back to 8414; digit sum 29 ≡ 8414 (mod 15). -/
theorem enumeration_hex4_20de : reassembles 8414 = true ∧ castsFifteens 8414 = true := by decide

/-- 20df: nibbles fold back to 8415; digit sum 30 ≡ 8415 (mod 15). -/
theorem enumeration_hex4_20df : reassembles 8415 = true ∧ castsFifteens 8415 = true := by decide

/-- 20e0: nibbles fold back to 8416; digit sum 16 ≡ 8416 (mod 15). -/
theorem enumeration_hex4_20e0 : reassembles 8416 = true ∧ castsFifteens 8416 = true := by decide

/-- 20e1: nibbles fold back to 8417; digit sum 17 ≡ 8417 (mod 15). -/
theorem enumeration_hex4_20e1 : reassembles 8417 = true ∧ castsFifteens 8417 = true := by decide

/-- 20e2: nibbles fold back to 8418; digit sum 18 ≡ 8418 (mod 15). -/
theorem enumeration_hex4_20e2 : reassembles 8418 = true ∧ castsFifteens 8418 = true := by decide

/-- 20e3: nibbles fold back to 8419; digit sum 19 ≡ 8419 (mod 15). -/
theorem enumeration_hex4_20e3 : reassembles 8419 = true ∧ castsFifteens 8419 = true := by decide

/-- 20e4: nibbles fold back to 8420; digit sum 20 ≡ 8420 (mod 15). -/
theorem enumeration_hex4_20e4 : reassembles 8420 = true ∧ castsFifteens 8420 = true := by decide

/-- 20e5: nibbles fold back to 8421; digit sum 21 ≡ 8421 (mod 15). -/
theorem enumeration_hex4_20e5 : reassembles 8421 = true ∧ castsFifteens 8421 = true := by decide

/-- 20e6: nibbles fold back to 8422; digit sum 22 ≡ 8422 (mod 15). -/
theorem enumeration_hex4_20e6 : reassembles 8422 = true ∧ castsFifteens 8422 = true := by decide

/-- 20e7: nibbles fold back to 8423; digit sum 23 ≡ 8423 (mod 15). -/
theorem enumeration_hex4_20e7 : reassembles 8423 = true ∧ castsFifteens 8423 = true := by decide

/-- 20e8: nibbles fold back to 8424; digit sum 24 ≡ 8424 (mod 15). -/
theorem enumeration_hex4_20e8 : reassembles 8424 = true ∧ castsFifteens 8424 = true := by decide

/-- 20e9: nibbles fold back to 8425; digit sum 25 ≡ 8425 (mod 15). -/
theorem enumeration_hex4_20e9 : reassembles 8425 = true ∧ castsFifteens 8425 = true := by decide

/-- 20ea: nibbles fold back to 8426; digit sum 26 ≡ 8426 (mod 15). -/
theorem enumeration_hex4_20ea : reassembles 8426 = true ∧ castsFifteens 8426 = true := by decide

/-- 20eb: nibbles fold back to 8427; digit sum 27 ≡ 8427 (mod 15). -/
theorem enumeration_hex4_20eb : reassembles 8427 = true ∧ castsFifteens 8427 = true := by decide

/-- 20ec: nibbles fold back to 8428; digit sum 28 ≡ 8428 (mod 15). -/
theorem enumeration_hex4_20ec : reassembles 8428 = true ∧ castsFifteens 8428 = true := by decide

/-- 20ed: nibbles fold back to 8429; digit sum 29 ≡ 8429 (mod 15). -/
theorem enumeration_hex4_20ed : reassembles 8429 = true ∧ castsFifteens 8429 = true := by decide

/-- 20ee: nibbles fold back to 8430; digit sum 30 ≡ 8430 (mod 15). -/
theorem enumeration_hex4_20ee : reassembles 8430 = true ∧ castsFifteens 8430 = true := by decide

/-- 20ef: nibbles fold back to 8431; digit sum 31 ≡ 8431 (mod 15). -/
theorem enumeration_hex4_20ef : reassembles 8431 = true ∧ castsFifteens 8431 = true := by decide

/-- 20f0: nibbles fold back to 8432; digit sum 17 ≡ 8432 (mod 15). -/
theorem enumeration_hex4_20f0 : reassembles 8432 = true ∧ castsFifteens 8432 = true := by decide

/-- 20f1: nibbles fold back to 8433; digit sum 18 ≡ 8433 (mod 15). -/
theorem enumeration_hex4_20f1 : reassembles 8433 = true ∧ castsFifteens 8433 = true := by decide

/-- 20f2: nibbles fold back to 8434; digit sum 19 ≡ 8434 (mod 15). -/
theorem enumeration_hex4_20f2 : reassembles 8434 = true ∧ castsFifteens 8434 = true := by decide

/-- 20f3: nibbles fold back to 8435; digit sum 20 ≡ 8435 (mod 15). -/
theorem enumeration_hex4_20f3 : reassembles 8435 = true ∧ castsFifteens 8435 = true := by decide

/-- 20f4: nibbles fold back to 8436; digit sum 21 ≡ 8436 (mod 15). -/
theorem enumeration_hex4_20f4 : reassembles 8436 = true ∧ castsFifteens 8436 = true := by decide

/-- 20f5: nibbles fold back to 8437; digit sum 22 ≡ 8437 (mod 15). -/
theorem enumeration_hex4_20f5 : reassembles 8437 = true ∧ castsFifteens 8437 = true := by decide

/-- 20f6: nibbles fold back to 8438; digit sum 23 ≡ 8438 (mod 15). -/
theorem enumeration_hex4_20f6 : reassembles 8438 = true ∧ castsFifteens 8438 = true := by decide

/-- 20f7: nibbles fold back to 8439; digit sum 24 ≡ 8439 (mod 15). -/
theorem enumeration_hex4_20f7 : reassembles 8439 = true ∧ castsFifteens 8439 = true := by decide

/-- 20f8: nibbles fold back to 8440; digit sum 25 ≡ 8440 (mod 15). -/
theorem enumeration_hex4_20f8 : reassembles 8440 = true ∧ castsFifteens 8440 = true := by decide

/-- 20f9: nibbles fold back to 8441; digit sum 26 ≡ 8441 (mod 15). -/
theorem enumeration_hex4_20f9 : reassembles 8441 = true ∧ castsFifteens 8441 = true := by decide

/-- 20fa: nibbles fold back to 8442; digit sum 27 ≡ 8442 (mod 15). -/
theorem enumeration_hex4_20fa : reassembles 8442 = true ∧ castsFifteens 8442 = true := by decide

/-- 20fb: nibbles fold back to 8443; digit sum 28 ≡ 8443 (mod 15). -/
theorem enumeration_hex4_20fb : reassembles 8443 = true ∧ castsFifteens 8443 = true := by decide

/-- 20fc: nibbles fold back to 8444; digit sum 29 ≡ 8444 (mod 15). -/
theorem enumeration_hex4_20fc : reassembles 8444 = true ∧ castsFifteens 8444 = true := by decide

/-- 20fd: nibbles fold back to 8445; digit sum 30 ≡ 8445 (mod 15). -/
theorem enumeration_hex4_20fd : reassembles 8445 = true ∧ castsFifteens 8445 = true := by decide

/-- 20fe: nibbles fold back to 8446; digit sum 31 ≡ 8446 (mod 15). -/
theorem enumeration_hex4_20fe : reassembles 8446 = true ∧ castsFifteens 8446 = true := by decide

/-- 20ff: nibbles fold back to 8447; digit sum 32 ≡ 8447 (mod 15). -/
theorem enumeration_hex4_20ff : reassembles 8447 = true ∧ castsFifteens 8447 = true := by decide

/-- 2100: nibbles fold back to 8448; digit sum 3 ≡ 8448 (mod 15). -/
theorem enumeration_hex4_2100 : reassembles 8448 = true ∧ castsFifteens 8448 = true := by decide

/-- 2101: nibbles fold back to 8449; digit sum 4 ≡ 8449 (mod 15). -/
theorem enumeration_hex4_2101 : reassembles 8449 = true ∧ castsFifteens 8449 = true := by decide

/-- 2102: nibbles fold back to 8450; digit sum 5 ≡ 8450 (mod 15). -/
theorem enumeration_hex4_2102 : reassembles 8450 = true ∧ castsFifteens 8450 = true := by decide

/-- 2103: nibbles fold back to 8451; digit sum 6 ≡ 8451 (mod 15). -/
theorem enumeration_hex4_2103 : reassembles 8451 = true ∧ castsFifteens 8451 = true := by decide

/-- 2104: nibbles fold back to 8452; digit sum 7 ≡ 8452 (mod 15). -/
theorem enumeration_hex4_2104 : reassembles 8452 = true ∧ castsFifteens 8452 = true := by decide

/-- 2105: nibbles fold back to 8453; digit sum 8 ≡ 8453 (mod 15). -/
theorem enumeration_hex4_2105 : reassembles 8453 = true ∧ castsFifteens 8453 = true := by decide

/-- 2106: nibbles fold back to 8454; digit sum 9 ≡ 8454 (mod 15). -/
theorem enumeration_hex4_2106 : reassembles 8454 = true ∧ castsFifteens 8454 = true := by decide

/-- 2107: nibbles fold back to 8455; digit sum 10 ≡ 8455 (mod 15). -/
theorem enumeration_hex4_2107 : reassembles 8455 = true ∧ castsFifteens 8455 = true := by decide

/-- 2108: nibbles fold back to 8456; digit sum 11 ≡ 8456 (mod 15). -/
theorem enumeration_hex4_2108 : reassembles 8456 = true ∧ castsFifteens 8456 = true := by decide

/-- 2109: nibbles fold back to 8457; digit sum 12 ≡ 8457 (mod 15). -/
theorem enumeration_hex4_2109 : reassembles 8457 = true ∧ castsFifteens 8457 = true := by decide

/-- 210a: nibbles fold back to 8458; digit sum 13 ≡ 8458 (mod 15). -/
theorem enumeration_hex4_210a : reassembles 8458 = true ∧ castsFifteens 8458 = true := by decide

/-- 210b: nibbles fold back to 8459; digit sum 14 ≡ 8459 (mod 15). -/
theorem enumeration_hex4_210b : reassembles 8459 = true ∧ castsFifteens 8459 = true := by decide

/-- 210c: nibbles fold back to 8460; digit sum 15 ≡ 8460 (mod 15). -/
theorem enumeration_hex4_210c : reassembles 8460 = true ∧ castsFifteens 8460 = true := by decide

/-- 210d: nibbles fold back to 8461; digit sum 16 ≡ 8461 (mod 15). -/
theorem enumeration_hex4_210d : reassembles 8461 = true ∧ castsFifteens 8461 = true := by decide

/-- 210e: nibbles fold back to 8462; digit sum 17 ≡ 8462 (mod 15). -/
theorem enumeration_hex4_210e : reassembles 8462 = true ∧ castsFifteens 8462 = true := by decide

/-- 210f: nibbles fold back to 8463; digit sum 18 ≡ 8463 (mod 15). -/
theorem enumeration_hex4_210f : reassembles 8463 = true ∧ castsFifteens 8463 = true := by decide

/-- 2110: nibbles fold back to 8464; digit sum 4 ≡ 8464 (mod 15). -/
theorem enumeration_hex4_2110 : reassembles 8464 = true ∧ castsFifteens 8464 = true := by decide

/-- 2111: nibbles fold back to 8465; digit sum 5 ≡ 8465 (mod 15). -/
theorem enumeration_hex4_2111 : reassembles 8465 = true ∧ castsFifteens 8465 = true := by decide

/-- 2112: nibbles fold back to 8466; digit sum 6 ≡ 8466 (mod 15). -/
theorem enumeration_hex4_2112 : reassembles 8466 = true ∧ castsFifteens 8466 = true := by decide

/-- 2113: nibbles fold back to 8467; digit sum 7 ≡ 8467 (mod 15). -/
theorem enumeration_hex4_2113 : reassembles 8467 = true ∧ castsFifteens 8467 = true := by decide

/-- 2114: nibbles fold back to 8468; digit sum 8 ≡ 8468 (mod 15). -/
theorem enumeration_hex4_2114 : reassembles 8468 = true ∧ castsFifteens 8468 = true := by decide

/-- 2115: nibbles fold back to 8469; digit sum 9 ≡ 8469 (mod 15). -/
theorem enumeration_hex4_2115 : reassembles 8469 = true ∧ castsFifteens 8469 = true := by decide

/-- 2116: nibbles fold back to 8470; digit sum 10 ≡ 8470 (mod 15). -/
theorem enumeration_hex4_2116 : reassembles 8470 = true ∧ castsFifteens 8470 = true := by decide

/-- 2117: nibbles fold back to 8471; digit sum 11 ≡ 8471 (mod 15). -/
theorem enumeration_hex4_2117 : reassembles 8471 = true ∧ castsFifteens 8471 = true := by decide

/-- 2118: nibbles fold back to 8472; digit sum 12 ≡ 8472 (mod 15). -/
theorem enumeration_hex4_2118 : reassembles 8472 = true ∧ castsFifteens 8472 = true := by decide

/-- 2119: nibbles fold back to 8473; digit sum 13 ≡ 8473 (mod 15). -/
theorem enumeration_hex4_2119 : reassembles 8473 = true ∧ castsFifteens 8473 = true := by decide

/-- 211a: nibbles fold back to 8474; digit sum 14 ≡ 8474 (mod 15). -/
theorem enumeration_hex4_211a : reassembles 8474 = true ∧ castsFifteens 8474 = true := by decide

/-- 211b: nibbles fold back to 8475; digit sum 15 ≡ 8475 (mod 15). -/
theorem enumeration_hex4_211b : reassembles 8475 = true ∧ castsFifteens 8475 = true := by decide

/-- 211c: nibbles fold back to 8476; digit sum 16 ≡ 8476 (mod 15). -/
theorem enumeration_hex4_211c : reassembles 8476 = true ∧ castsFifteens 8476 = true := by decide

/-- 211d: nibbles fold back to 8477; digit sum 17 ≡ 8477 (mod 15). -/
theorem enumeration_hex4_211d : reassembles 8477 = true ∧ castsFifteens 8477 = true := by decide

/-- 211e: nibbles fold back to 8478; digit sum 18 ≡ 8478 (mod 15). -/
theorem enumeration_hex4_211e : reassembles 8478 = true ∧ castsFifteens 8478 = true := by decide

/-- 211f: nibbles fold back to 8479; digit sum 19 ≡ 8479 (mod 15). -/
theorem enumeration_hex4_211f : reassembles 8479 = true ∧ castsFifteens 8479 = true := by decide

/-- 2120: nibbles fold back to 8480; digit sum 5 ≡ 8480 (mod 15). -/
theorem enumeration_hex4_2120 : reassembles 8480 = true ∧ castsFifteens 8480 = true := by decide

/-- 2121: nibbles fold back to 8481; digit sum 6 ≡ 8481 (mod 15). -/
theorem enumeration_hex4_2121 : reassembles 8481 = true ∧ castsFifteens 8481 = true := by decide

/-- 2122: nibbles fold back to 8482; digit sum 7 ≡ 8482 (mod 15). -/
theorem enumeration_hex4_2122 : reassembles 8482 = true ∧ castsFifteens 8482 = true := by decide

/-- 2123: nibbles fold back to 8483; digit sum 8 ≡ 8483 (mod 15). -/
theorem enumeration_hex4_2123 : reassembles 8483 = true ∧ castsFifteens 8483 = true := by decide

/-- 2124: nibbles fold back to 8484; digit sum 9 ≡ 8484 (mod 15). -/
theorem enumeration_hex4_2124 : reassembles 8484 = true ∧ castsFifteens 8484 = true := by decide

/-- 2125: nibbles fold back to 8485; digit sum 10 ≡ 8485 (mod 15). -/
theorem enumeration_hex4_2125 : reassembles 8485 = true ∧ castsFifteens 8485 = true := by decide

/-- 2126: nibbles fold back to 8486; digit sum 11 ≡ 8486 (mod 15). -/
theorem enumeration_hex4_2126 : reassembles 8486 = true ∧ castsFifteens 8486 = true := by decide

/-- 2127: nibbles fold back to 8487; digit sum 12 ≡ 8487 (mod 15). -/
theorem enumeration_hex4_2127 : reassembles 8487 = true ∧ castsFifteens 8487 = true := by decide

/-- 2128: nibbles fold back to 8488; digit sum 13 ≡ 8488 (mod 15). -/
theorem enumeration_hex4_2128 : reassembles 8488 = true ∧ castsFifteens 8488 = true := by decide

/-- 2129: nibbles fold back to 8489; digit sum 14 ≡ 8489 (mod 15). -/
theorem enumeration_hex4_2129 : reassembles 8489 = true ∧ castsFifteens 8489 = true := by decide

/-- 212a: nibbles fold back to 8490; digit sum 15 ≡ 8490 (mod 15). -/
theorem enumeration_hex4_212a : reassembles 8490 = true ∧ castsFifteens 8490 = true := by decide

/-- 212b: nibbles fold back to 8491; digit sum 16 ≡ 8491 (mod 15). -/
theorem enumeration_hex4_212b : reassembles 8491 = true ∧ castsFifteens 8491 = true := by decide

/-- 212c: nibbles fold back to 8492; digit sum 17 ≡ 8492 (mod 15). -/
theorem enumeration_hex4_212c : reassembles 8492 = true ∧ castsFifteens 8492 = true := by decide

/-- 212d: nibbles fold back to 8493; digit sum 18 ≡ 8493 (mod 15). -/
theorem enumeration_hex4_212d : reassembles 8493 = true ∧ castsFifteens 8493 = true := by decide

/-- 212e: nibbles fold back to 8494; digit sum 19 ≡ 8494 (mod 15). -/
theorem enumeration_hex4_212e : reassembles 8494 = true ∧ castsFifteens 8494 = true := by decide

/-- 212f: nibbles fold back to 8495; digit sum 20 ≡ 8495 (mod 15). -/
theorem enumeration_hex4_212f : reassembles 8495 = true ∧ castsFifteens 8495 = true := by decide

/-- 2130: nibbles fold back to 8496; digit sum 6 ≡ 8496 (mod 15). -/
theorem enumeration_hex4_2130 : reassembles 8496 = true ∧ castsFifteens 8496 = true := by decide

/-- 2131: nibbles fold back to 8497; digit sum 7 ≡ 8497 (mod 15). -/
theorem enumeration_hex4_2131 : reassembles 8497 = true ∧ castsFifteens 8497 = true := by decide

/-- 2132: nibbles fold back to 8498; digit sum 8 ≡ 8498 (mod 15). -/
theorem enumeration_hex4_2132 : reassembles 8498 = true ∧ castsFifteens 8498 = true := by decide

/-- 2133: nibbles fold back to 8499; digit sum 9 ≡ 8499 (mod 15). -/
theorem enumeration_hex4_2133 : reassembles 8499 = true ∧ castsFifteens 8499 = true := by decide

/-- 2134: nibbles fold back to 8500; digit sum 10 ≡ 8500 (mod 15). -/
theorem enumeration_hex4_2134 : reassembles 8500 = true ∧ castsFifteens 8500 = true := by decide

/-- 2135: nibbles fold back to 8501; digit sum 11 ≡ 8501 (mod 15). -/
theorem enumeration_hex4_2135 : reassembles 8501 = true ∧ castsFifteens 8501 = true := by decide

/-- 2136: nibbles fold back to 8502; digit sum 12 ≡ 8502 (mod 15). -/
theorem enumeration_hex4_2136 : reassembles 8502 = true ∧ castsFifteens 8502 = true := by decide

/-- 2137: nibbles fold back to 8503; digit sum 13 ≡ 8503 (mod 15). -/
theorem enumeration_hex4_2137 : reassembles 8503 = true ∧ castsFifteens 8503 = true := by decide

/-- 2138: nibbles fold back to 8504; digit sum 14 ≡ 8504 (mod 15). -/
theorem enumeration_hex4_2138 : reassembles 8504 = true ∧ castsFifteens 8504 = true := by decide

/-- 2139: nibbles fold back to 8505; digit sum 15 ≡ 8505 (mod 15). -/
theorem enumeration_hex4_2139 : reassembles 8505 = true ∧ castsFifteens 8505 = true := by decide

/-- 213a: nibbles fold back to 8506; digit sum 16 ≡ 8506 (mod 15). -/
theorem enumeration_hex4_213a : reassembles 8506 = true ∧ castsFifteens 8506 = true := by decide

/-- 213b: nibbles fold back to 8507; digit sum 17 ≡ 8507 (mod 15). -/
theorem enumeration_hex4_213b : reassembles 8507 = true ∧ castsFifteens 8507 = true := by decide

/-- 213c: nibbles fold back to 8508; digit sum 18 ≡ 8508 (mod 15). -/
theorem enumeration_hex4_213c : reassembles 8508 = true ∧ castsFifteens 8508 = true := by decide

/-- 213d: nibbles fold back to 8509; digit sum 19 ≡ 8509 (mod 15). -/
theorem enumeration_hex4_213d : reassembles 8509 = true ∧ castsFifteens 8509 = true := by decide

/-- 213e: nibbles fold back to 8510; digit sum 20 ≡ 8510 (mod 15). -/
theorem enumeration_hex4_213e : reassembles 8510 = true ∧ castsFifteens 8510 = true := by decide

/-- 213f: nibbles fold back to 8511; digit sum 21 ≡ 8511 (mod 15). -/
theorem enumeration_hex4_213f : reassembles 8511 = true ∧ castsFifteens 8511 = true := by decide

/-- 2140: nibbles fold back to 8512; digit sum 7 ≡ 8512 (mod 15). -/
theorem enumeration_hex4_2140 : reassembles 8512 = true ∧ castsFifteens 8512 = true := by decide

/-- 2141: nibbles fold back to 8513; digit sum 8 ≡ 8513 (mod 15). -/
theorem enumeration_hex4_2141 : reassembles 8513 = true ∧ castsFifteens 8513 = true := by decide

/-- 2142: nibbles fold back to 8514; digit sum 9 ≡ 8514 (mod 15). -/
theorem enumeration_hex4_2142 : reassembles 8514 = true ∧ castsFifteens 8514 = true := by decide

/-- 2143: nibbles fold back to 8515; digit sum 10 ≡ 8515 (mod 15). -/
theorem enumeration_hex4_2143 : reassembles 8515 = true ∧ castsFifteens 8515 = true := by decide

/-- 2144: nibbles fold back to 8516; digit sum 11 ≡ 8516 (mod 15). -/
theorem enumeration_hex4_2144 : reassembles 8516 = true ∧ castsFifteens 8516 = true := by decide

/-- 2145: nibbles fold back to 8517; digit sum 12 ≡ 8517 (mod 15). -/
theorem enumeration_hex4_2145 : reassembles 8517 = true ∧ castsFifteens 8517 = true := by decide

/-- 2146: nibbles fold back to 8518; digit sum 13 ≡ 8518 (mod 15). -/
theorem enumeration_hex4_2146 : reassembles 8518 = true ∧ castsFifteens 8518 = true := by decide

/-- 2147: nibbles fold back to 8519; digit sum 14 ≡ 8519 (mod 15). -/
theorem enumeration_hex4_2147 : reassembles 8519 = true ∧ castsFifteens 8519 = true := by decide

/-- 2148: nibbles fold back to 8520; digit sum 15 ≡ 8520 (mod 15). -/
theorem enumeration_hex4_2148 : reassembles 8520 = true ∧ castsFifteens 8520 = true := by decide

/-- 2149: nibbles fold back to 8521; digit sum 16 ≡ 8521 (mod 15). -/
theorem enumeration_hex4_2149 : reassembles 8521 = true ∧ castsFifteens 8521 = true := by decide

/-- 214a: nibbles fold back to 8522; digit sum 17 ≡ 8522 (mod 15). -/
theorem enumeration_hex4_214a : reassembles 8522 = true ∧ castsFifteens 8522 = true := by decide

/-- 214b: nibbles fold back to 8523; digit sum 18 ≡ 8523 (mod 15). -/
theorem enumeration_hex4_214b : reassembles 8523 = true ∧ castsFifteens 8523 = true := by decide

/-- 214c: nibbles fold back to 8524; digit sum 19 ≡ 8524 (mod 15). -/
theorem enumeration_hex4_214c : reassembles 8524 = true ∧ castsFifteens 8524 = true := by decide

/-- 214d: nibbles fold back to 8525; digit sum 20 ≡ 8525 (mod 15). -/
theorem enumeration_hex4_214d : reassembles 8525 = true ∧ castsFifteens 8525 = true := by decide

/-- 214e: nibbles fold back to 8526; digit sum 21 ≡ 8526 (mod 15). -/
theorem enumeration_hex4_214e : reassembles 8526 = true ∧ castsFifteens 8526 = true := by decide

/-- 214f: nibbles fold back to 8527; digit sum 22 ≡ 8527 (mod 15). -/
theorem enumeration_hex4_214f : reassembles 8527 = true ∧ castsFifteens 8527 = true := by decide

/-- 2150: nibbles fold back to 8528; digit sum 8 ≡ 8528 (mod 15). -/
theorem enumeration_hex4_2150 : reassembles 8528 = true ∧ castsFifteens 8528 = true := by decide

/-- 2151: nibbles fold back to 8529; digit sum 9 ≡ 8529 (mod 15). -/
theorem enumeration_hex4_2151 : reassembles 8529 = true ∧ castsFifteens 8529 = true := by decide

/-- 2152: nibbles fold back to 8530; digit sum 10 ≡ 8530 (mod 15). -/
theorem enumeration_hex4_2152 : reassembles 8530 = true ∧ castsFifteens 8530 = true := by decide

/-- 2153: nibbles fold back to 8531; digit sum 11 ≡ 8531 (mod 15). -/
theorem enumeration_hex4_2153 : reassembles 8531 = true ∧ castsFifteens 8531 = true := by decide

/-- 2154: nibbles fold back to 8532; digit sum 12 ≡ 8532 (mod 15). -/
theorem enumeration_hex4_2154 : reassembles 8532 = true ∧ castsFifteens 8532 = true := by decide

/-- 2155: nibbles fold back to 8533; digit sum 13 ≡ 8533 (mod 15). -/
theorem enumeration_hex4_2155 : reassembles 8533 = true ∧ castsFifteens 8533 = true := by decide

/-- 2156: nibbles fold back to 8534; digit sum 14 ≡ 8534 (mod 15). -/
theorem enumeration_hex4_2156 : reassembles 8534 = true ∧ castsFifteens 8534 = true := by decide

/-- 2157: nibbles fold back to 8535; digit sum 15 ≡ 8535 (mod 15). -/
theorem enumeration_hex4_2157 : reassembles 8535 = true ∧ castsFifteens 8535 = true := by decide

/-- 2158: nibbles fold back to 8536; digit sum 16 ≡ 8536 (mod 15). -/
theorem enumeration_hex4_2158 : reassembles 8536 = true ∧ castsFifteens 8536 = true := by decide

/-- 2159: nibbles fold back to 8537; digit sum 17 ≡ 8537 (mod 15). -/
theorem enumeration_hex4_2159 : reassembles 8537 = true ∧ castsFifteens 8537 = true := by decide

/-- 215a: nibbles fold back to 8538; digit sum 18 ≡ 8538 (mod 15). -/
theorem enumeration_hex4_215a : reassembles 8538 = true ∧ castsFifteens 8538 = true := by decide

/-- 215b: nibbles fold back to 8539; digit sum 19 ≡ 8539 (mod 15). -/
theorem enumeration_hex4_215b : reassembles 8539 = true ∧ castsFifteens 8539 = true := by decide

/-- 215c: nibbles fold back to 8540; digit sum 20 ≡ 8540 (mod 15). -/
theorem enumeration_hex4_215c : reassembles 8540 = true ∧ castsFifteens 8540 = true := by decide

/-- 215d: nibbles fold back to 8541; digit sum 21 ≡ 8541 (mod 15). -/
theorem enumeration_hex4_215d : reassembles 8541 = true ∧ castsFifteens 8541 = true := by decide

/-- 215e: nibbles fold back to 8542; digit sum 22 ≡ 8542 (mod 15). -/
theorem enumeration_hex4_215e : reassembles 8542 = true ∧ castsFifteens 8542 = true := by decide

/-- 215f: nibbles fold back to 8543; digit sum 23 ≡ 8543 (mod 15). -/
theorem enumeration_hex4_215f : reassembles 8543 = true ∧ castsFifteens 8543 = true := by decide

/-- 2160: nibbles fold back to 8544; digit sum 9 ≡ 8544 (mod 15). -/
theorem enumeration_hex4_2160 : reassembles 8544 = true ∧ castsFifteens 8544 = true := by decide

/-- 2161: nibbles fold back to 8545; digit sum 10 ≡ 8545 (mod 15). -/
theorem enumeration_hex4_2161 : reassembles 8545 = true ∧ castsFifteens 8545 = true := by decide

/-- 2162: nibbles fold back to 8546; digit sum 11 ≡ 8546 (mod 15). -/
theorem enumeration_hex4_2162 : reassembles 8546 = true ∧ castsFifteens 8546 = true := by decide

/-- 2163: nibbles fold back to 8547; digit sum 12 ≡ 8547 (mod 15). -/
theorem enumeration_hex4_2163 : reassembles 8547 = true ∧ castsFifteens 8547 = true := by decide

/-- 2164: nibbles fold back to 8548; digit sum 13 ≡ 8548 (mod 15). -/
theorem enumeration_hex4_2164 : reassembles 8548 = true ∧ castsFifteens 8548 = true := by decide

/-- 2165: nibbles fold back to 8549; digit sum 14 ≡ 8549 (mod 15). -/
theorem enumeration_hex4_2165 : reassembles 8549 = true ∧ castsFifteens 8549 = true := by decide

/-- 2166: nibbles fold back to 8550; digit sum 15 ≡ 8550 (mod 15). -/
theorem enumeration_hex4_2166 : reassembles 8550 = true ∧ castsFifteens 8550 = true := by decide

/-- 2167: nibbles fold back to 8551; digit sum 16 ≡ 8551 (mod 15). -/
theorem enumeration_hex4_2167 : reassembles 8551 = true ∧ castsFifteens 8551 = true := by decide

/-- 2168: nibbles fold back to 8552; digit sum 17 ≡ 8552 (mod 15). -/
theorem enumeration_hex4_2168 : reassembles 8552 = true ∧ castsFifteens 8552 = true := by decide

/-- 2169: nibbles fold back to 8553; digit sum 18 ≡ 8553 (mod 15). -/
theorem enumeration_hex4_2169 : reassembles 8553 = true ∧ castsFifteens 8553 = true := by decide

/-- 216a: nibbles fold back to 8554; digit sum 19 ≡ 8554 (mod 15). -/
theorem enumeration_hex4_216a : reassembles 8554 = true ∧ castsFifteens 8554 = true := by decide

/-- 216b: nibbles fold back to 8555; digit sum 20 ≡ 8555 (mod 15). -/
theorem enumeration_hex4_216b : reassembles 8555 = true ∧ castsFifteens 8555 = true := by decide

/-- 216c: nibbles fold back to 8556; digit sum 21 ≡ 8556 (mod 15). -/
theorem enumeration_hex4_216c : reassembles 8556 = true ∧ castsFifteens 8556 = true := by decide

/-- 216d: nibbles fold back to 8557; digit sum 22 ≡ 8557 (mod 15). -/
theorem enumeration_hex4_216d : reassembles 8557 = true ∧ castsFifteens 8557 = true := by decide

/-- 216e: nibbles fold back to 8558; digit sum 23 ≡ 8558 (mod 15). -/
theorem enumeration_hex4_216e : reassembles 8558 = true ∧ castsFifteens 8558 = true := by decide

/-- 216f: nibbles fold back to 8559; digit sum 24 ≡ 8559 (mod 15). -/
theorem enumeration_hex4_216f : reassembles 8559 = true ∧ castsFifteens 8559 = true := by decide

/-- 2170: nibbles fold back to 8560; digit sum 10 ≡ 8560 (mod 15). -/
theorem enumeration_hex4_2170 : reassembles 8560 = true ∧ castsFifteens 8560 = true := by decide

/-- 2171: nibbles fold back to 8561; digit sum 11 ≡ 8561 (mod 15). -/
theorem enumeration_hex4_2171 : reassembles 8561 = true ∧ castsFifteens 8561 = true := by decide

/-- 2172: nibbles fold back to 8562; digit sum 12 ≡ 8562 (mod 15). -/
theorem enumeration_hex4_2172 : reassembles 8562 = true ∧ castsFifteens 8562 = true := by decide

/-- 2173: nibbles fold back to 8563; digit sum 13 ≡ 8563 (mod 15). -/
theorem enumeration_hex4_2173 : reassembles 8563 = true ∧ castsFifteens 8563 = true := by decide

/-- 2174: nibbles fold back to 8564; digit sum 14 ≡ 8564 (mod 15). -/
theorem enumeration_hex4_2174 : reassembles 8564 = true ∧ castsFifteens 8564 = true := by decide

/-- 2175: nibbles fold back to 8565; digit sum 15 ≡ 8565 (mod 15). -/
theorem enumeration_hex4_2175 : reassembles 8565 = true ∧ castsFifteens 8565 = true := by decide

/-- 2176: nibbles fold back to 8566; digit sum 16 ≡ 8566 (mod 15). -/
theorem enumeration_hex4_2176 : reassembles 8566 = true ∧ castsFifteens 8566 = true := by decide

/-- 2177: nibbles fold back to 8567; digit sum 17 ≡ 8567 (mod 15). -/
theorem enumeration_hex4_2177 : reassembles 8567 = true ∧ castsFifteens 8567 = true := by decide

/-- 2178: nibbles fold back to 8568; digit sum 18 ≡ 8568 (mod 15). -/
theorem enumeration_hex4_2178 : reassembles 8568 = true ∧ castsFifteens 8568 = true := by decide

/-- 2179: nibbles fold back to 8569; digit sum 19 ≡ 8569 (mod 15). -/
theorem enumeration_hex4_2179 : reassembles 8569 = true ∧ castsFifteens 8569 = true := by decide

/-- 217a: nibbles fold back to 8570; digit sum 20 ≡ 8570 (mod 15). -/
theorem enumeration_hex4_217a : reassembles 8570 = true ∧ castsFifteens 8570 = true := by decide

/-- 217b: nibbles fold back to 8571; digit sum 21 ≡ 8571 (mod 15). -/
theorem enumeration_hex4_217b : reassembles 8571 = true ∧ castsFifteens 8571 = true := by decide

/-- 217c: nibbles fold back to 8572; digit sum 22 ≡ 8572 (mod 15). -/
theorem enumeration_hex4_217c : reassembles 8572 = true ∧ castsFifteens 8572 = true := by decide

/-- 217d: nibbles fold back to 8573; digit sum 23 ≡ 8573 (mod 15). -/
theorem enumeration_hex4_217d : reassembles 8573 = true ∧ castsFifteens 8573 = true := by decide

/-- 217e: nibbles fold back to 8574; digit sum 24 ≡ 8574 (mod 15). -/
theorem enumeration_hex4_217e : reassembles 8574 = true ∧ castsFifteens 8574 = true := by decide

/-- 217f: nibbles fold back to 8575; digit sum 25 ≡ 8575 (mod 15). -/
theorem enumeration_hex4_217f : reassembles 8575 = true ∧ castsFifteens 8575 = true := by decide

/-- 2180: nibbles fold back to 8576; digit sum 11 ≡ 8576 (mod 15). -/
theorem enumeration_hex4_2180 : reassembles 8576 = true ∧ castsFifteens 8576 = true := by decide

/-- 2181: nibbles fold back to 8577; digit sum 12 ≡ 8577 (mod 15). -/
theorem enumeration_hex4_2181 : reassembles 8577 = true ∧ castsFifteens 8577 = true := by decide

/-- 2182: nibbles fold back to 8578; digit sum 13 ≡ 8578 (mod 15). -/
theorem enumeration_hex4_2182 : reassembles 8578 = true ∧ castsFifteens 8578 = true := by decide

/-- 2183: nibbles fold back to 8579; digit sum 14 ≡ 8579 (mod 15). -/
theorem enumeration_hex4_2183 : reassembles 8579 = true ∧ castsFifteens 8579 = true := by decide

/-- 2184: nibbles fold back to 8580; digit sum 15 ≡ 8580 (mod 15). -/
theorem enumeration_hex4_2184 : reassembles 8580 = true ∧ castsFifteens 8580 = true := by decide

/-- 2185: nibbles fold back to 8581; digit sum 16 ≡ 8581 (mod 15). -/
theorem enumeration_hex4_2185 : reassembles 8581 = true ∧ castsFifteens 8581 = true := by decide

/-- 2186: nibbles fold back to 8582; digit sum 17 ≡ 8582 (mod 15). -/
theorem enumeration_hex4_2186 : reassembles 8582 = true ∧ castsFifteens 8582 = true := by decide

/-- 2187: nibbles fold back to 8583; digit sum 18 ≡ 8583 (mod 15). -/
theorem enumeration_hex4_2187 : reassembles 8583 = true ∧ castsFifteens 8583 = true := by decide

/-- 2188: nibbles fold back to 8584; digit sum 19 ≡ 8584 (mod 15). -/
theorem enumeration_hex4_2188 : reassembles 8584 = true ∧ castsFifteens 8584 = true := by decide

/-- 2189: nibbles fold back to 8585; digit sum 20 ≡ 8585 (mod 15). -/
theorem enumeration_hex4_2189 : reassembles 8585 = true ∧ castsFifteens 8585 = true := by decide

/-- 218a: nibbles fold back to 8586; digit sum 21 ≡ 8586 (mod 15). -/
theorem enumeration_hex4_218a : reassembles 8586 = true ∧ castsFifteens 8586 = true := by decide

/-- 218b: nibbles fold back to 8587; digit sum 22 ≡ 8587 (mod 15). -/
theorem enumeration_hex4_218b : reassembles 8587 = true ∧ castsFifteens 8587 = true := by decide

/-- 218c: nibbles fold back to 8588; digit sum 23 ≡ 8588 (mod 15). -/
theorem enumeration_hex4_218c : reassembles 8588 = true ∧ castsFifteens 8588 = true := by decide

/-- 218d: nibbles fold back to 8589; digit sum 24 ≡ 8589 (mod 15). -/
theorem enumeration_hex4_218d : reassembles 8589 = true ∧ castsFifteens 8589 = true := by decide

/-- 218e: nibbles fold back to 8590; digit sum 25 ≡ 8590 (mod 15). -/
theorem enumeration_hex4_218e : reassembles 8590 = true ∧ castsFifteens 8590 = true := by decide

/-- 218f: nibbles fold back to 8591; digit sum 26 ≡ 8591 (mod 15). -/
theorem enumeration_hex4_218f : reassembles 8591 = true ∧ castsFifteens 8591 = true := by decide

/-- 2190: nibbles fold back to 8592; digit sum 12 ≡ 8592 (mod 15). -/
theorem enumeration_hex4_2190 : reassembles 8592 = true ∧ castsFifteens 8592 = true := by decide

/-- 2191: nibbles fold back to 8593; digit sum 13 ≡ 8593 (mod 15). -/
theorem enumeration_hex4_2191 : reassembles 8593 = true ∧ castsFifteens 8593 = true := by decide

/-- 2192: nibbles fold back to 8594; digit sum 14 ≡ 8594 (mod 15). -/
theorem enumeration_hex4_2192 : reassembles 8594 = true ∧ castsFifteens 8594 = true := by decide

/-- 2193: nibbles fold back to 8595; digit sum 15 ≡ 8595 (mod 15). -/
theorem enumeration_hex4_2193 : reassembles 8595 = true ∧ castsFifteens 8595 = true := by decide

/-- 2194: nibbles fold back to 8596; digit sum 16 ≡ 8596 (mod 15). -/
theorem enumeration_hex4_2194 : reassembles 8596 = true ∧ castsFifteens 8596 = true := by decide

/-- 2195: nibbles fold back to 8597; digit sum 17 ≡ 8597 (mod 15). -/
theorem enumeration_hex4_2195 : reassembles 8597 = true ∧ castsFifteens 8597 = true := by decide

/-- 2196: nibbles fold back to 8598; digit sum 18 ≡ 8598 (mod 15). -/
theorem enumeration_hex4_2196 : reassembles 8598 = true ∧ castsFifteens 8598 = true := by decide

/-- 2197: nibbles fold back to 8599; digit sum 19 ≡ 8599 (mod 15). -/
theorem enumeration_hex4_2197 : reassembles 8599 = true ∧ castsFifteens 8599 = true := by decide

/-- 2198: nibbles fold back to 8600; digit sum 20 ≡ 8600 (mod 15). -/
theorem enumeration_hex4_2198 : reassembles 8600 = true ∧ castsFifteens 8600 = true := by decide

/-- 2199: nibbles fold back to 8601; digit sum 21 ≡ 8601 (mod 15). -/
theorem enumeration_hex4_2199 : reassembles 8601 = true ∧ castsFifteens 8601 = true := by decide

/-- 219a: nibbles fold back to 8602; digit sum 22 ≡ 8602 (mod 15). -/
theorem enumeration_hex4_219a : reassembles 8602 = true ∧ castsFifteens 8602 = true := by decide

/-- 219b: nibbles fold back to 8603; digit sum 23 ≡ 8603 (mod 15). -/
theorem enumeration_hex4_219b : reassembles 8603 = true ∧ castsFifteens 8603 = true := by decide

/-- 219c: nibbles fold back to 8604; digit sum 24 ≡ 8604 (mod 15). -/
theorem enumeration_hex4_219c : reassembles 8604 = true ∧ castsFifteens 8604 = true := by decide

/-- 219d: nibbles fold back to 8605; digit sum 25 ≡ 8605 (mod 15). -/
theorem enumeration_hex4_219d : reassembles 8605 = true ∧ castsFifteens 8605 = true := by decide

/-- 219e: nibbles fold back to 8606; digit sum 26 ≡ 8606 (mod 15). -/
theorem enumeration_hex4_219e : reassembles 8606 = true ∧ castsFifteens 8606 = true := by decide

/-- 219f: nibbles fold back to 8607; digit sum 27 ≡ 8607 (mod 15). -/
theorem enumeration_hex4_219f : reassembles 8607 = true ∧ castsFifteens 8607 = true := by decide

/-- 21a0: nibbles fold back to 8608; digit sum 13 ≡ 8608 (mod 15). -/
theorem enumeration_hex4_21a0 : reassembles 8608 = true ∧ castsFifteens 8608 = true := by decide

/-- 21a1: nibbles fold back to 8609; digit sum 14 ≡ 8609 (mod 15). -/
theorem enumeration_hex4_21a1 : reassembles 8609 = true ∧ castsFifteens 8609 = true := by decide

/-- 21a2: nibbles fold back to 8610; digit sum 15 ≡ 8610 (mod 15). -/
theorem enumeration_hex4_21a2 : reassembles 8610 = true ∧ castsFifteens 8610 = true := by decide

/-- 21a3: nibbles fold back to 8611; digit sum 16 ≡ 8611 (mod 15). -/
theorem enumeration_hex4_21a3 : reassembles 8611 = true ∧ castsFifteens 8611 = true := by decide

/-- 21a4: nibbles fold back to 8612; digit sum 17 ≡ 8612 (mod 15). -/
theorem enumeration_hex4_21a4 : reassembles 8612 = true ∧ castsFifteens 8612 = true := by decide

/-- 21a5: nibbles fold back to 8613; digit sum 18 ≡ 8613 (mod 15). -/
theorem enumeration_hex4_21a5 : reassembles 8613 = true ∧ castsFifteens 8613 = true := by decide

/-- 21a6: nibbles fold back to 8614; digit sum 19 ≡ 8614 (mod 15). -/
theorem enumeration_hex4_21a6 : reassembles 8614 = true ∧ castsFifteens 8614 = true := by decide

/-- 21a7: nibbles fold back to 8615; digit sum 20 ≡ 8615 (mod 15). -/
theorem enumeration_hex4_21a7 : reassembles 8615 = true ∧ castsFifteens 8615 = true := by decide

/-- 21a8: nibbles fold back to 8616; digit sum 21 ≡ 8616 (mod 15). -/
theorem enumeration_hex4_21a8 : reassembles 8616 = true ∧ castsFifteens 8616 = true := by decide

/-- 21a9: nibbles fold back to 8617; digit sum 22 ≡ 8617 (mod 15). -/
theorem enumeration_hex4_21a9 : reassembles 8617 = true ∧ castsFifteens 8617 = true := by decide

/-- 21aa: nibbles fold back to 8618; digit sum 23 ≡ 8618 (mod 15). -/
theorem enumeration_hex4_21aa : reassembles 8618 = true ∧ castsFifteens 8618 = true := by decide

/-- 21ab: nibbles fold back to 8619; digit sum 24 ≡ 8619 (mod 15). -/
theorem enumeration_hex4_21ab : reassembles 8619 = true ∧ castsFifteens 8619 = true := by decide

/-- 21ac: nibbles fold back to 8620; digit sum 25 ≡ 8620 (mod 15). -/
theorem enumeration_hex4_21ac : reassembles 8620 = true ∧ castsFifteens 8620 = true := by decide

/-- 21ad: nibbles fold back to 8621; digit sum 26 ≡ 8621 (mod 15). -/
theorem enumeration_hex4_21ad : reassembles 8621 = true ∧ castsFifteens 8621 = true := by decide

/-- 21ae: nibbles fold back to 8622; digit sum 27 ≡ 8622 (mod 15). -/
theorem enumeration_hex4_21ae : reassembles 8622 = true ∧ castsFifteens 8622 = true := by decide

/-- 21af: nibbles fold back to 8623; digit sum 28 ≡ 8623 (mod 15). -/
theorem enumeration_hex4_21af : reassembles 8623 = true ∧ castsFifteens 8623 = true := by decide

/-- 21b0: nibbles fold back to 8624; digit sum 14 ≡ 8624 (mod 15). -/
theorem enumeration_hex4_21b0 : reassembles 8624 = true ∧ castsFifteens 8624 = true := by decide

/-- 21b1: nibbles fold back to 8625; digit sum 15 ≡ 8625 (mod 15). -/
theorem enumeration_hex4_21b1 : reassembles 8625 = true ∧ castsFifteens 8625 = true := by decide

/-- 21b2: nibbles fold back to 8626; digit sum 16 ≡ 8626 (mod 15). -/
theorem enumeration_hex4_21b2 : reassembles 8626 = true ∧ castsFifteens 8626 = true := by decide

/-- 21b3: nibbles fold back to 8627; digit sum 17 ≡ 8627 (mod 15). -/
theorem enumeration_hex4_21b3 : reassembles 8627 = true ∧ castsFifteens 8627 = true := by decide

/-- 21b4: nibbles fold back to 8628; digit sum 18 ≡ 8628 (mod 15). -/
theorem enumeration_hex4_21b4 : reassembles 8628 = true ∧ castsFifteens 8628 = true := by decide

/-- 21b5: nibbles fold back to 8629; digit sum 19 ≡ 8629 (mod 15). -/
theorem enumeration_hex4_21b5 : reassembles 8629 = true ∧ castsFifteens 8629 = true := by decide

/-- 21b6: nibbles fold back to 8630; digit sum 20 ≡ 8630 (mod 15). -/
theorem enumeration_hex4_21b6 : reassembles 8630 = true ∧ castsFifteens 8630 = true := by decide

/-- 21b7: nibbles fold back to 8631; digit sum 21 ≡ 8631 (mod 15). -/
theorem enumeration_hex4_21b7 : reassembles 8631 = true ∧ castsFifteens 8631 = true := by decide

/-- 21b8: nibbles fold back to 8632; digit sum 22 ≡ 8632 (mod 15). -/
theorem enumeration_hex4_21b8 : reassembles 8632 = true ∧ castsFifteens 8632 = true := by decide

/-- 21b9: nibbles fold back to 8633; digit sum 23 ≡ 8633 (mod 15). -/
theorem enumeration_hex4_21b9 : reassembles 8633 = true ∧ castsFifteens 8633 = true := by decide

/-- 21ba: nibbles fold back to 8634; digit sum 24 ≡ 8634 (mod 15). -/
theorem enumeration_hex4_21ba : reassembles 8634 = true ∧ castsFifteens 8634 = true := by decide

/-- 21bb: nibbles fold back to 8635; digit sum 25 ≡ 8635 (mod 15). -/
theorem enumeration_hex4_21bb : reassembles 8635 = true ∧ castsFifteens 8635 = true := by decide

/-- 21bc: nibbles fold back to 8636; digit sum 26 ≡ 8636 (mod 15). -/
theorem enumeration_hex4_21bc : reassembles 8636 = true ∧ castsFifteens 8636 = true := by decide

/-- 21bd: nibbles fold back to 8637; digit sum 27 ≡ 8637 (mod 15). -/
theorem enumeration_hex4_21bd : reassembles 8637 = true ∧ castsFifteens 8637 = true := by decide

/-- 21be: nibbles fold back to 8638; digit sum 28 ≡ 8638 (mod 15). -/
theorem enumeration_hex4_21be : reassembles 8638 = true ∧ castsFifteens 8638 = true := by decide

/-- 21bf: nibbles fold back to 8639; digit sum 29 ≡ 8639 (mod 15). -/
theorem enumeration_hex4_21bf : reassembles 8639 = true ∧ castsFifteens 8639 = true := by decide

/-- 21c0: nibbles fold back to 8640; digit sum 15 ≡ 8640 (mod 15). -/
theorem enumeration_hex4_21c0 : reassembles 8640 = true ∧ castsFifteens 8640 = true := by decide

/-- 21c1: nibbles fold back to 8641; digit sum 16 ≡ 8641 (mod 15). -/
theorem enumeration_hex4_21c1 : reassembles 8641 = true ∧ castsFifteens 8641 = true := by decide

/-- 21c2: nibbles fold back to 8642; digit sum 17 ≡ 8642 (mod 15). -/
theorem enumeration_hex4_21c2 : reassembles 8642 = true ∧ castsFifteens 8642 = true := by decide

/-- 21c3: nibbles fold back to 8643; digit sum 18 ≡ 8643 (mod 15). -/
theorem enumeration_hex4_21c3 : reassembles 8643 = true ∧ castsFifteens 8643 = true := by decide

/-- 21c4: nibbles fold back to 8644; digit sum 19 ≡ 8644 (mod 15). -/
theorem enumeration_hex4_21c4 : reassembles 8644 = true ∧ castsFifteens 8644 = true := by decide

/-- 21c5: nibbles fold back to 8645; digit sum 20 ≡ 8645 (mod 15). -/
theorem enumeration_hex4_21c5 : reassembles 8645 = true ∧ castsFifteens 8645 = true := by decide

/-- 21c6: nibbles fold back to 8646; digit sum 21 ≡ 8646 (mod 15). -/
theorem enumeration_hex4_21c6 : reassembles 8646 = true ∧ castsFifteens 8646 = true := by decide

/-- 21c7: nibbles fold back to 8647; digit sum 22 ≡ 8647 (mod 15). -/
theorem enumeration_hex4_21c7 : reassembles 8647 = true ∧ castsFifteens 8647 = true := by decide

/-- 21c8: nibbles fold back to 8648; digit sum 23 ≡ 8648 (mod 15). -/
theorem enumeration_hex4_21c8 : reassembles 8648 = true ∧ castsFifteens 8648 = true := by decide

/-- 21c9: nibbles fold back to 8649; digit sum 24 ≡ 8649 (mod 15). -/
theorem enumeration_hex4_21c9 : reassembles 8649 = true ∧ castsFifteens 8649 = true := by decide

/-- 21ca: nibbles fold back to 8650; digit sum 25 ≡ 8650 (mod 15). -/
theorem enumeration_hex4_21ca : reassembles 8650 = true ∧ castsFifteens 8650 = true := by decide

/-- 21cb: nibbles fold back to 8651; digit sum 26 ≡ 8651 (mod 15). -/
theorem enumeration_hex4_21cb : reassembles 8651 = true ∧ castsFifteens 8651 = true := by decide

/-- 21cc: nibbles fold back to 8652; digit sum 27 ≡ 8652 (mod 15). -/
theorem enumeration_hex4_21cc : reassembles 8652 = true ∧ castsFifteens 8652 = true := by decide

/-- 21cd: nibbles fold back to 8653; digit sum 28 ≡ 8653 (mod 15). -/
theorem enumeration_hex4_21cd : reassembles 8653 = true ∧ castsFifteens 8653 = true := by decide

/-- 21ce: nibbles fold back to 8654; digit sum 29 ≡ 8654 (mod 15). -/
theorem enumeration_hex4_21ce : reassembles 8654 = true ∧ castsFifteens 8654 = true := by decide

/-- 21cf: nibbles fold back to 8655; digit sum 30 ≡ 8655 (mod 15). -/
theorem enumeration_hex4_21cf : reassembles 8655 = true ∧ castsFifteens 8655 = true := by decide

/-- 21d0: nibbles fold back to 8656; digit sum 16 ≡ 8656 (mod 15). -/
theorem enumeration_hex4_21d0 : reassembles 8656 = true ∧ castsFifteens 8656 = true := by decide

/-- 21d1: nibbles fold back to 8657; digit sum 17 ≡ 8657 (mod 15). -/
theorem enumeration_hex4_21d1 : reassembles 8657 = true ∧ castsFifteens 8657 = true := by decide

/-- 21d2: nibbles fold back to 8658; digit sum 18 ≡ 8658 (mod 15). -/
theorem enumeration_hex4_21d2 : reassembles 8658 = true ∧ castsFifteens 8658 = true := by decide

/-- 21d3: nibbles fold back to 8659; digit sum 19 ≡ 8659 (mod 15). -/
theorem enumeration_hex4_21d3 : reassembles 8659 = true ∧ castsFifteens 8659 = true := by decide

/-- 21d4: nibbles fold back to 8660; digit sum 20 ≡ 8660 (mod 15). -/
theorem enumeration_hex4_21d4 : reassembles 8660 = true ∧ castsFifteens 8660 = true := by decide

/-- 21d5: nibbles fold back to 8661; digit sum 21 ≡ 8661 (mod 15). -/
theorem enumeration_hex4_21d5 : reassembles 8661 = true ∧ castsFifteens 8661 = true := by decide

/-- 21d6: nibbles fold back to 8662; digit sum 22 ≡ 8662 (mod 15). -/
theorem enumeration_hex4_21d6 : reassembles 8662 = true ∧ castsFifteens 8662 = true := by decide

/-- 21d7: nibbles fold back to 8663; digit sum 23 ≡ 8663 (mod 15). -/
theorem enumeration_hex4_21d7 : reassembles 8663 = true ∧ castsFifteens 8663 = true := by decide

/-- 21d8: nibbles fold back to 8664; digit sum 24 ≡ 8664 (mod 15). -/
theorem enumeration_hex4_21d8 : reassembles 8664 = true ∧ castsFifteens 8664 = true := by decide

/-- 21d9: nibbles fold back to 8665; digit sum 25 ≡ 8665 (mod 15). -/
theorem enumeration_hex4_21d9 : reassembles 8665 = true ∧ castsFifteens 8665 = true := by decide

/-- 21da: nibbles fold back to 8666; digit sum 26 ≡ 8666 (mod 15). -/
theorem enumeration_hex4_21da : reassembles 8666 = true ∧ castsFifteens 8666 = true := by decide

/-- 21db: nibbles fold back to 8667; digit sum 27 ≡ 8667 (mod 15). -/
theorem enumeration_hex4_21db : reassembles 8667 = true ∧ castsFifteens 8667 = true := by decide

/-- 21dc: nibbles fold back to 8668; digit sum 28 ≡ 8668 (mod 15). -/
theorem enumeration_hex4_21dc : reassembles 8668 = true ∧ castsFifteens 8668 = true := by decide

/-- 21dd: nibbles fold back to 8669; digit sum 29 ≡ 8669 (mod 15). -/
theorem enumeration_hex4_21dd : reassembles 8669 = true ∧ castsFifteens 8669 = true := by decide

/-- 21de: nibbles fold back to 8670; digit sum 30 ≡ 8670 (mod 15). -/
theorem enumeration_hex4_21de : reassembles 8670 = true ∧ castsFifteens 8670 = true := by decide

/-- 21df: nibbles fold back to 8671; digit sum 31 ≡ 8671 (mod 15). -/
theorem enumeration_hex4_21df : reassembles 8671 = true ∧ castsFifteens 8671 = true := by decide

/-- 21e0: nibbles fold back to 8672; digit sum 17 ≡ 8672 (mod 15). -/
theorem enumeration_hex4_21e0 : reassembles 8672 = true ∧ castsFifteens 8672 = true := by decide

/-- 21e1: nibbles fold back to 8673; digit sum 18 ≡ 8673 (mod 15). -/
theorem enumeration_hex4_21e1 : reassembles 8673 = true ∧ castsFifteens 8673 = true := by decide

/-- 21e2: nibbles fold back to 8674; digit sum 19 ≡ 8674 (mod 15). -/
theorem enumeration_hex4_21e2 : reassembles 8674 = true ∧ castsFifteens 8674 = true := by decide

/-- 21e3: nibbles fold back to 8675; digit sum 20 ≡ 8675 (mod 15). -/
theorem enumeration_hex4_21e3 : reassembles 8675 = true ∧ castsFifteens 8675 = true := by decide

/-- 21e4: nibbles fold back to 8676; digit sum 21 ≡ 8676 (mod 15). -/
theorem enumeration_hex4_21e4 : reassembles 8676 = true ∧ castsFifteens 8676 = true := by decide

/-- 21e5: nibbles fold back to 8677; digit sum 22 ≡ 8677 (mod 15). -/
theorem enumeration_hex4_21e5 : reassembles 8677 = true ∧ castsFifteens 8677 = true := by decide

/-- 21e6: nibbles fold back to 8678; digit sum 23 ≡ 8678 (mod 15). -/
theorem enumeration_hex4_21e6 : reassembles 8678 = true ∧ castsFifteens 8678 = true := by decide

/-- 21e7: nibbles fold back to 8679; digit sum 24 ≡ 8679 (mod 15). -/
theorem enumeration_hex4_21e7 : reassembles 8679 = true ∧ castsFifteens 8679 = true := by decide

/-- 21e8: nibbles fold back to 8680; digit sum 25 ≡ 8680 (mod 15). -/
theorem enumeration_hex4_21e8 : reassembles 8680 = true ∧ castsFifteens 8680 = true := by decide

/-- 21e9: nibbles fold back to 8681; digit sum 26 ≡ 8681 (mod 15). -/
theorem enumeration_hex4_21e9 : reassembles 8681 = true ∧ castsFifteens 8681 = true := by decide

/-- 21ea: nibbles fold back to 8682; digit sum 27 ≡ 8682 (mod 15). -/
theorem enumeration_hex4_21ea : reassembles 8682 = true ∧ castsFifteens 8682 = true := by decide

/-- 21eb: nibbles fold back to 8683; digit sum 28 ≡ 8683 (mod 15). -/
theorem enumeration_hex4_21eb : reassembles 8683 = true ∧ castsFifteens 8683 = true := by decide

/-- 21ec: nibbles fold back to 8684; digit sum 29 ≡ 8684 (mod 15). -/
theorem enumeration_hex4_21ec : reassembles 8684 = true ∧ castsFifteens 8684 = true := by decide

/-- 21ed: nibbles fold back to 8685; digit sum 30 ≡ 8685 (mod 15). -/
theorem enumeration_hex4_21ed : reassembles 8685 = true ∧ castsFifteens 8685 = true := by decide

/-- 21ee: nibbles fold back to 8686; digit sum 31 ≡ 8686 (mod 15). -/
theorem enumeration_hex4_21ee : reassembles 8686 = true ∧ castsFifteens 8686 = true := by decide

/-- 21ef: nibbles fold back to 8687; digit sum 32 ≡ 8687 (mod 15). -/
theorem enumeration_hex4_21ef : reassembles 8687 = true ∧ castsFifteens 8687 = true := by decide

/-- 21f0: nibbles fold back to 8688; digit sum 18 ≡ 8688 (mod 15). -/
theorem enumeration_hex4_21f0 : reassembles 8688 = true ∧ castsFifteens 8688 = true := by decide

/-- 21f1: nibbles fold back to 8689; digit sum 19 ≡ 8689 (mod 15). -/
theorem enumeration_hex4_21f1 : reassembles 8689 = true ∧ castsFifteens 8689 = true := by decide

/-- 21f2: nibbles fold back to 8690; digit sum 20 ≡ 8690 (mod 15). -/
theorem enumeration_hex4_21f2 : reassembles 8690 = true ∧ castsFifteens 8690 = true := by decide

/-- 21f3: nibbles fold back to 8691; digit sum 21 ≡ 8691 (mod 15). -/
theorem enumeration_hex4_21f3 : reassembles 8691 = true ∧ castsFifteens 8691 = true := by decide

/-- 21f4: nibbles fold back to 8692; digit sum 22 ≡ 8692 (mod 15). -/
theorem enumeration_hex4_21f4 : reassembles 8692 = true ∧ castsFifteens 8692 = true := by decide

/-- 21f5: nibbles fold back to 8693; digit sum 23 ≡ 8693 (mod 15). -/
theorem enumeration_hex4_21f5 : reassembles 8693 = true ∧ castsFifteens 8693 = true := by decide

/-- 21f6: nibbles fold back to 8694; digit sum 24 ≡ 8694 (mod 15). -/
theorem enumeration_hex4_21f6 : reassembles 8694 = true ∧ castsFifteens 8694 = true := by decide

/-- 21f7: nibbles fold back to 8695; digit sum 25 ≡ 8695 (mod 15). -/
theorem enumeration_hex4_21f7 : reassembles 8695 = true ∧ castsFifteens 8695 = true := by decide

/-- 21f8: nibbles fold back to 8696; digit sum 26 ≡ 8696 (mod 15). -/
theorem enumeration_hex4_21f8 : reassembles 8696 = true ∧ castsFifteens 8696 = true := by decide

/-- 21f9: nibbles fold back to 8697; digit sum 27 ≡ 8697 (mod 15). -/
theorem enumeration_hex4_21f9 : reassembles 8697 = true ∧ castsFifteens 8697 = true := by decide

/-- 21fa: nibbles fold back to 8698; digit sum 28 ≡ 8698 (mod 15). -/
theorem enumeration_hex4_21fa : reassembles 8698 = true ∧ castsFifteens 8698 = true := by decide

/-- 21fb: nibbles fold back to 8699; digit sum 29 ≡ 8699 (mod 15). -/
theorem enumeration_hex4_21fb : reassembles 8699 = true ∧ castsFifteens 8699 = true := by decide

/-- 21fc: nibbles fold back to 8700; digit sum 30 ≡ 8700 (mod 15). -/
theorem enumeration_hex4_21fc : reassembles 8700 = true ∧ castsFifteens 8700 = true := by decide

/-- 21fd: nibbles fold back to 8701; digit sum 31 ≡ 8701 (mod 15). -/
theorem enumeration_hex4_21fd : reassembles 8701 = true ∧ castsFifteens 8701 = true := by decide

/-- 21fe: nibbles fold back to 8702; digit sum 32 ≡ 8702 (mod 15). -/
theorem enumeration_hex4_21fe : reassembles 8702 = true ∧ castsFifteens 8702 = true := by decide

/-- 21ff: nibbles fold back to 8703; digit sum 33 ≡ 8703 (mod 15). -/
theorem enumeration_hex4_21ff : reassembles 8703 = true ∧ castsFifteens 8703 = true := by decide

/-- 2200: nibbles fold back to 8704; digit sum 4 ≡ 8704 (mod 15). -/
theorem enumeration_hex4_2200 : reassembles 8704 = true ∧ castsFifteens 8704 = true := by decide

/-- 2201: nibbles fold back to 8705; digit sum 5 ≡ 8705 (mod 15). -/
theorem enumeration_hex4_2201 : reassembles 8705 = true ∧ castsFifteens 8705 = true := by decide

/-- 2202: nibbles fold back to 8706; digit sum 6 ≡ 8706 (mod 15). -/
theorem enumeration_hex4_2202 : reassembles 8706 = true ∧ castsFifteens 8706 = true := by decide

/-- 2203: nibbles fold back to 8707; digit sum 7 ≡ 8707 (mod 15). -/
theorem enumeration_hex4_2203 : reassembles 8707 = true ∧ castsFifteens 8707 = true := by decide

/-- 2204: nibbles fold back to 8708; digit sum 8 ≡ 8708 (mod 15). -/
theorem enumeration_hex4_2204 : reassembles 8708 = true ∧ castsFifteens 8708 = true := by decide

/-- 2205: nibbles fold back to 8709; digit sum 9 ≡ 8709 (mod 15). -/
theorem enumeration_hex4_2205 : reassembles 8709 = true ∧ castsFifteens 8709 = true := by decide

/-- 2206: nibbles fold back to 8710; digit sum 10 ≡ 8710 (mod 15). -/
theorem enumeration_hex4_2206 : reassembles 8710 = true ∧ castsFifteens 8710 = true := by decide

/-- 2207: nibbles fold back to 8711; digit sum 11 ≡ 8711 (mod 15). -/
theorem enumeration_hex4_2207 : reassembles 8711 = true ∧ castsFifteens 8711 = true := by decide

/-- 2208: nibbles fold back to 8712; digit sum 12 ≡ 8712 (mod 15). -/
theorem enumeration_hex4_2208 : reassembles 8712 = true ∧ castsFifteens 8712 = true := by decide

/-- 2209: nibbles fold back to 8713; digit sum 13 ≡ 8713 (mod 15). -/
theorem enumeration_hex4_2209 : reassembles 8713 = true ∧ castsFifteens 8713 = true := by decide

/-- 220a: nibbles fold back to 8714; digit sum 14 ≡ 8714 (mod 15). -/
theorem enumeration_hex4_220a : reassembles 8714 = true ∧ castsFifteens 8714 = true := by decide

/-- 220b: nibbles fold back to 8715; digit sum 15 ≡ 8715 (mod 15). -/
theorem enumeration_hex4_220b : reassembles 8715 = true ∧ castsFifteens 8715 = true := by decide

/-- 220c: nibbles fold back to 8716; digit sum 16 ≡ 8716 (mod 15). -/
theorem enumeration_hex4_220c : reassembles 8716 = true ∧ castsFifteens 8716 = true := by decide

/-- 220d: nibbles fold back to 8717; digit sum 17 ≡ 8717 (mod 15). -/
theorem enumeration_hex4_220d : reassembles 8717 = true ∧ castsFifteens 8717 = true := by decide

/-- 220e: nibbles fold back to 8718; digit sum 18 ≡ 8718 (mod 15). -/
theorem enumeration_hex4_220e : reassembles 8718 = true ∧ castsFifteens 8718 = true := by decide

/-- 220f: nibbles fold back to 8719; digit sum 19 ≡ 8719 (mod 15). -/
theorem enumeration_hex4_220f : reassembles 8719 = true ∧ castsFifteens 8719 = true := by decide

/-- 2210: nibbles fold back to 8720; digit sum 5 ≡ 8720 (mod 15). -/
theorem enumeration_hex4_2210 : reassembles 8720 = true ∧ castsFifteens 8720 = true := by decide

/-- 2211: nibbles fold back to 8721; digit sum 6 ≡ 8721 (mod 15). -/
theorem enumeration_hex4_2211 : reassembles 8721 = true ∧ castsFifteens 8721 = true := by decide

/-- 2212: nibbles fold back to 8722; digit sum 7 ≡ 8722 (mod 15). -/
theorem enumeration_hex4_2212 : reassembles 8722 = true ∧ castsFifteens 8722 = true := by decide

/-- 2213: nibbles fold back to 8723; digit sum 8 ≡ 8723 (mod 15). -/
theorem enumeration_hex4_2213 : reassembles 8723 = true ∧ castsFifteens 8723 = true := by decide

/-- 2214: nibbles fold back to 8724; digit sum 9 ≡ 8724 (mod 15). -/
theorem enumeration_hex4_2214 : reassembles 8724 = true ∧ castsFifteens 8724 = true := by decide

/-- 2215: nibbles fold back to 8725; digit sum 10 ≡ 8725 (mod 15). -/
theorem enumeration_hex4_2215 : reassembles 8725 = true ∧ castsFifteens 8725 = true := by decide

/-- 2216: nibbles fold back to 8726; digit sum 11 ≡ 8726 (mod 15). -/
theorem enumeration_hex4_2216 : reassembles 8726 = true ∧ castsFifteens 8726 = true := by decide

/-- 2217: nibbles fold back to 8727; digit sum 12 ≡ 8727 (mod 15). -/
theorem enumeration_hex4_2217 : reassembles 8727 = true ∧ castsFifteens 8727 = true := by decide

/-- 2218: nibbles fold back to 8728; digit sum 13 ≡ 8728 (mod 15). -/
theorem enumeration_hex4_2218 : reassembles 8728 = true ∧ castsFifteens 8728 = true := by decide

/-- 2219: nibbles fold back to 8729; digit sum 14 ≡ 8729 (mod 15). -/
theorem enumeration_hex4_2219 : reassembles 8729 = true ∧ castsFifteens 8729 = true := by decide

/-- 221a: nibbles fold back to 8730; digit sum 15 ≡ 8730 (mod 15). -/
theorem enumeration_hex4_221a : reassembles 8730 = true ∧ castsFifteens 8730 = true := by decide

/-- 221b: nibbles fold back to 8731; digit sum 16 ≡ 8731 (mod 15). -/
theorem enumeration_hex4_221b : reassembles 8731 = true ∧ castsFifteens 8731 = true := by decide

/-- 221c: nibbles fold back to 8732; digit sum 17 ≡ 8732 (mod 15). -/
theorem enumeration_hex4_221c : reassembles 8732 = true ∧ castsFifteens 8732 = true := by decide

/-- 221d: nibbles fold back to 8733; digit sum 18 ≡ 8733 (mod 15). -/
theorem enumeration_hex4_221d : reassembles 8733 = true ∧ castsFifteens 8733 = true := by decide

/-- 221e: nibbles fold back to 8734; digit sum 19 ≡ 8734 (mod 15). -/
theorem enumeration_hex4_221e : reassembles 8734 = true ∧ castsFifteens 8734 = true := by decide

/-- 221f: nibbles fold back to 8735; digit sum 20 ≡ 8735 (mod 15). -/
theorem enumeration_hex4_221f : reassembles 8735 = true ∧ castsFifteens 8735 = true := by decide

/-- 2220: nibbles fold back to 8736; digit sum 6 ≡ 8736 (mod 15). -/
theorem enumeration_hex4_2220 : reassembles 8736 = true ∧ castsFifteens 8736 = true := by decide

/-- 2221: nibbles fold back to 8737; digit sum 7 ≡ 8737 (mod 15). -/
theorem enumeration_hex4_2221 : reassembles 8737 = true ∧ castsFifteens 8737 = true := by decide

/-- 2222: nibbles fold back to 8738; digit sum 8 ≡ 8738 (mod 15). -/
theorem enumeration_hex4_2222 : reassembles 8738 = true ∧ castsFifteens 8738 = true := by decide

/-- 2223: nibbles fold back to 8739; digit sum 9 ≡ 8739 (mod 15). -/
theorem enumeration_hex4_2223 : reassembles 8739 = true ∧ castsFifteens 8739 = true := by decide

/-- 2224: nibbles fold back to 8740; digit sum 10 ≡ 8740 (mod 15). -/
theorem enumeration_hex4_2224 : reassembles 8740 = true ∧ castsFifteens 8740 = true := by decide

/-- 2225: nibbles fold back to 8741; digit sum 11 ≡ 8741 (mod 15). -/
theorem enumeration_hex4_2225 : reassembles 8741 = true ∧ castsFifteens 8741 = true := by decide

/-- 2226: nibbles fold back to 8742; digit sum 12 ≡ 8742 (mod 15). -/
theorem enumeration_hex4_2226 : reassembles 8742 = true ∧ castsFifteens 8742 = true := by decide

/-- 2227: nibbles fold back to 8743; digit sum 13 ≡ 8743 (mod 15). -/
theorem enumeration_hex4_2227 : reassembles 8743 = true ∧ castsFifteens 8743 = true := by decide

/-- 2228: nibbles fold back to 8744; digit sum 14 ≡ 8744 (mod 15). -/
theorem enumeration_hex4_2228 : reassembles 8744 = true ∧ castsFifteens 8744 = true := by decide

/-- 2229: nibbles fold back to 8745; digit sum 15 ≡ 8745 (mod 15). -/
theorem enumeration_hex4_2229 : reassembles 8745 = true ∧ castsFifteens 8745 = true := by decide

/-- 222a: nibbles fold back to 8746; digit sum 16 ≡ 8746 (mod 15). -/
theorem enumeration_hex4_222a : reassembles 8746 = true ∧ castsFifteens 8746 = true := by decide

/-- 222b: nibbles fold back to 8747; digit sum 17 ≡ 8747 (mod 15). -/
theorem enumeration_hex4_222b : reassembles 8747 = true ∧ castsFifteens 8747 = true := by decide

/-- 222c: nibbles fold back to 8748; digit sum 18 ≡ 8748 (mod 15). -/
theorem enumeration_hex4_222c : reassembles 8748 = true ∧ castsFifteens 8748 = true := by decide

/-- 222d: nibbles fold back to 8749; digit sum 19 ≡ 8749 (mod 15). -/
theorem enumeration_hex4_222d : reassembles 8749 = true ∧ castsFifteens 8749 = true := by decide

/-- 222e: nibbles fold back to 8750; digit sum 20 ≡ 8750 (mod 15). -/
theorem enumeration_hex4_222e : reassembles 8750 = true ∧ castsFifteens 8750 = true := by decide

/-- 222f: nibbles fold back to 8751; digit sum 21 ≡ 8751 (mod 15). -/
theorem enumeration_hex4_222f : reassembles 8751 = true ∧ castsFifteens 8751 = true := by decide

/-- 2230: nibbles fold back to 8752; digit sum 7 ≡ 8752 (mod 15). -/
theorem enumeration_hex4_2230 : reassembles 8752 = true ∧ castsFifteens 8752 = true := by decide

/-- 2231: nibbles fold back to 8753; digit sum 8 ≡ 8753 (mod 15). -/
theorem enumeration_hex4_2231 : reassembles 8753 = true ∧ castsFifteens 8753 = true := by decide

/-- 2232: nibbles fold back to 8754; digit sum 9 ≡ 8754 (mod 15). -/
theorem enumeration_hex4_2232 : reassembles 8754 = true ∧ castsFifteens 8754 = true := by decide

/-- 2233: nibbles fold back to 8755; digit sum 10 ≡ 8755 (mod 15). -/
theorem enumeration_hex4_2233 : reassembles 8755 = true ∧ castsFifteens 8755 = true := by decide

/-- 2234: nibbles fold back to 8756; digit sum 11 ≡ 8756 (mod 15). -/
theorem enumeration_hex4_2234 : reassembles 8756 = true ∧ castsFifteens 8756 = true := by decide

/-- 2235: nibbles fold back to 8757; digit sum 12 ≡ 8757 (mod 15). -/
theorem enumeration_hex4_2235 : reassembles 8757 = true ∧ castsFifteens 8757 = true := by decide

/-- 2236: nibbles fold back to 8758; digit sum 13 ≡ 8758 (mod 15). -/
theorem enumeration_hex4_2236 : reassembles 8758 = true ∧ castsFifteens 8758 = true := by decide

/-- 2237: nibbles fold back to 8759; digit sum 14 ≡ 8759 (mod 15). -/
theorem enumeration_hex4_2237 : reassembles 8759 = true ∧ castsFifteens 8759 = true := by decide

/-- 2238: nibbles fold back to 8760; digit sum 15 ≡ 8760 (mod 15). -/
theorem enumeration_hex4_2238 : reassembles 8760 = true ∧ castsFifteens 8760 = true := by decide

/-- 2239: nibbles fold back to 8761; digit sum 16 ≡ 8761 (mod 15). -/
theorem enumeration_hex4_2239 : reassembles 8761 = true ∧ castsFifteens 8761 = true := by decide

/-- 223a: nibbles fold back to 8762; digit sum 17 ≡ 8762 (mod 15). -/
theorem enumeration_hex4_223a : reassembles 8762 = true ∧ castsFifteens 8762 = true := by decide

/-- 223b: nibbles fold back to 8763; digit sum 18 ≡ 8763 (mod 15). -/
theorem enumeration_hex4_223b : reassembles 8763 = true ∧ castsFifteens 8763 = true := by decide

/-- 223c: nibbles fold back to 8764; digit sum 19 ≡ 8764 (mod 15). -/
theorem enumeration_hex4_223c : reassembles 8764 = true ∧ castsFifteens 8764 = true := by decide

/-- 223d: nibbles fold back to 8765; digit sum 20 ≡ 8765 (mod 15). -/
theorem enumeration_hex4_223d : reassembles 8765 = true ∧ castsFifteens 8765 = true := by decide

/-- 223e: nibbles fold back to 8766; digit sum 21 ≡ 8766 (mod 15). -/
theorem enumeration_hex4_223e : reassembles 8766 = true ∧ castsFifteens 8766 = true := by decide

/-- 223f: nibbles fold back to 8767; digit sum 22 ≡ 8767 (mod 15). -/
theorem enumeration_hex4_223f : reassembles 8767 = true ∧ castsFifteens 8767 = true := by decide

/-- 2240: nibbles fold back to 8768; digit sum 8 ≡ 8768 (mod 15). -/
theorem enumeration_hex4_2240 : reassembles 8768 = true ∧ castsFifteens 8768 = true := by decide

/-- 2241: nibbles fold back to 8769; digit sum 9 ≡ 8769 (mod 15). -/
theorem enumeration_hex4_2241 : reassembles 8769 = true ∧ castsFifteens 8769 = true := by decide

/-- 2242: nibbles fold back to 8770; digit sum 10 ≡ 8770 (mod 15). -/
theorem enumeration_hex4_2242 : reassembles 8770 = true ∧ castsFifteens 8770 = true := by decide

/-- 2243: nibbles fold back to 8771; digit sum 11 ≡ 8771 (mod 15). -/
theorem enumeration_hex4_2243 : reassembles 8771 = true ∧ castsFifteens 8771 = true := by decide

/-- 2244: nibbles fold back to 8772; digit sum 12 ≡ 8772 (mod 15). -/
theorem enumeration_hex4_2244 : reassembles 8772 = true ∧ castsFifteens 8772 = true := by decide

/-- 2245: nibbles fold back to 8773; digit sum 13 ≡ 8773 (mod 15). -/
theorem enumeration_hex4_2245 : reassembles 8773 = true ∧ castsFifteens 8773 = true := by decide

/-- 2246: nibbles fold back to 8774; digit sum 14 ≡ 8774 (mod 15). -/
theorem enumeration_hex4_2246 : reassembles 8774 = true ∧ castsFifteens 8774 = true := by decide

/-- 2247: nibbles fold back to 8775; digit sum 15 ≡ 8775 (mod 15). -/
theorem enumeration_hex4_2247 : reassembles 8775 = true ∧ castsFifteens 8775 = true := by decide

/-- 2248: nibbles fold back to 8776; digit sum 16 ≡ 8776 (mod 15). -/
theorem enumeration_hex4_2248 : reassembles 8776 = true ∧ castsFifteens 8776 = true := by decide

/-- 2249: nibbles fold back to 8777; digit sum 17 ≡ 8777 (mod 15). -/
theorem enumeration_hex4_2249 : reassembles 8777 = true ∧ castsFifteens 8777 = true := by decide

/-- 224a: nibbles fold back to 8778; digit sum 18 ≡ 8778 (mod 15). -/
theorem enumeration_hex4_224a : reassembles 8778 = true ∧ castsFifteens 8778 = true := by decide

/-- 224b: nibbles fold back to 8779; digit sum 19 ≡ 8779 (mod 15). -/
theorem enumeration_hex4_224b : reassembles 8779 = true ∧ castsFifteens 8779 = true := by decide

/-- 224c: nibbles fold back to 8780; digit sum 20 ≡ 8780 (mod 15). -/
theorem enumeration_hex4_224c : reassembles 8780 = true ∧ castsFifteens 8780 = true := by decide

/-- 224d: nibbles fold back to 8781; digit sum 21 ≡ 8781 (mod 15). -/
theorem enumeration_hex4_224d : reassembles 8781 = true ∧ castsFifteens 8781 = true := by decide

/-- 224e: nibbles fold back to 8782; digit sum 22 ≡ 8782 (mod 15). -/
theorem enumeration_hex4_224e : reassembles 8782 = true ∧ castsFifteens 8782 = true := by decide

/-- 224f: nibbles fold back to 8783; digit sum 23 ≡ 8783 (mod 15). -/
theorem enumeration_hex4_224f : reassembles 8783 = true ∧ castsFifteens 8783 = true := by decide

/-- 2250: nibbles fold back to 8784; digit sum 9 ≡ 8784 (mod 15). -/
theorem enumeration_hex4_2250 : reassembles 8784 = true ∧ castsFifteens 8784 = true := by decide

/-- 2251: nibbles fold back to 8785; digit sum 10 ≡ 8785 (mod 15). -/
theorem enumeration_hex4_2251 : reassembles 8785 = true ∧ castsFifteens 8785 = true := by decide

/-- 2252: nibbles fold back to 8786; digit sum 11 ≡ 8786 (mod 15). -/
theorem enumeration_hex4_2252 : reassembles 8786 = true ∧ castsFifteens 8786 = true := by decide

/-- 2253: nibbles fold back to 8787; digit sum 12 ≡ 8787 (mod 15). -/
theorem enumeration_hex4_2253 : reassembles 8787 = true ∧ castsFifteens 8787 = true := by decide

/-- 2254: nibbles fold back to 8788; digit sum 13 ≡ 8788 (mod 15). -/
theorem enumeration_hex4_2254 : reassembles 8788 = true ∧ castsFifteens 8788 = true := by decide

/-- 2255: nibbles fold back to 8789; digit sum 14 ≡ 8789 (mod 15). -/
theorem enumeration_hex4_2255 : reassembles 8789 = true ∧ castsFifteens 8789 = true := by decide

/-- 2256: nibbles fold back to 8790; digit sum 15 ≡ 8790 (mod 15). -/
theorem enumeration_hex4_2256 : reassembles 8790 = true ∧ castsFifteens 8790 = true := by decide

/-- 2257: nibbles fold back to 8791; digit sum 16 ≡ 8791 (mod 15). -/
theorem enumeration_hex4_2257 : reassembles 8791 = true ∧ castsFifteens 8791 = true := by decide

/-- 2258: nibbles fold back to 8792; digit sum 17 ≡ 8792 (mod 15). -/
theorem enumeration_hex4_2258 : reassembles 8792 = true ∧ castsFifteens 8792 = true := by decide

/-- 2259: nibbles fold back to 8793; digit sum 18 ≡ 8793 (mod 15). -/
theorem enumeration_hex4_2259 : reassembles 8793 = true ∧ castsFifteens 8793 = true := by decide

/-- 225a: nibbles fold back to 8794; digit sum 19 ≡ 8794 (mod 15). -/
theorem enumeration_hex4_225a : reassembles 8794 = true ∧ castsFifteens 8794 = true := by decide

/-- 225b: nibbles fold back to 8795; digit sum 20 ≡ 8795 (mod 15). -/
theorem enumeration_hex4_225b : reassembles 8795 = true ∧ castsFifteens 8795 = true := by decide

/-- 225c: nibbles fold back to 8796; digit sum 21 ≡ 8796 (mod 15). -/
theorem enumeration_hex4_225c : reassembles 8796 = true ∧ castsFifteens 8796 = true := by decide

/-- 225d: nibbles fold back to 8797; digit sum 22 ≡ 8797 (mod 15). -/
theorem enumeration_hex4_225d : reassembles 8797 = true ∧ castsFifteens 8797 = true := by decide

/-- 225e: nibbles fold back to 8798; digit sum 23 ≡ 8798 (mod 15). -/
theorem enumeration_hex4_225e : reassembles 8798 = true ∧ castsFifteens 8798 = true := by decide

/-- 225f: nibbles fold back to 8799; digit sum 24 ≡ 8799 (mod 15). -/
theorem enumeration_hex4_225f : reassembles 8799 = true ∧ castsFifteens 8799 = true := by decide

/-- 2260: nibbles fold back to 8800; digit sum 10 ≡ 8800 (mod 15). -/
theorem enumeration_hex4_2260 : reassembles 8800 = true ∧ castsFifteens 8800 = true := by decide

/-- 2261: nibbles fold back to 8801; digit sum 11 ≡ 8801 (mod 15). -/
theorem enumeration_hex4_2261 : reassembles 8801 = true ∧ castsFifteens 8801 = true := by decide

/-- 2262: nibbles fold back to 8802; digit sum 12 ≡ 8802 (mod 15). -/
theorem enumeration_hex4_2262 : reassembles 8802 = true ∧ castsFifteens 8802 = true := by decide

/-- 2263: nibbles fold back to 8803; digit sum 13 ≡ 8803 (mod 15). -/
theorem enumeration_hex4_2263 : reassembles 8803 = true ∧ castsFifteens 8803 = true := by decide

/-- 2264: nibbles fold back to 8804; digit sum 14 ≡ 8804 (mod 15). -/
theorem enumeration_hex4_2264 : reassembles 8804 = true ∧ castsFifteens 8804 = true := by decide

/-- 2265: nibbles fold back to 8805; digit sum 15 ≡ 8805 (mod 15). -/
theorem enumeration_hex4_2265 : reassembles 8805 = true ∧ castsFifteens 8805 = true := by decide

/-- 2266: nibbles fold back to 8806; digit sum 16 ≡ 8806 (mod 15). -/
theorem enumeration_hex4_2266 : reassembles 8806 = true ∧ castsFifteens 8806 = true := by decide

/-- 2267: nibbles fold back to 8807; digit sum 17 ≡ 8807 (mod 15). -/
theorem enumeration_hex4_2267 : reassembles 8807 = true ∧ castsFifteens 8807 = true := by decide

/-- 2268: nibbles fold back to 8808; digit sum 18 ≡ 8808 (mod 15). -/
theorem enumeration_hex4_2268 : reassembles 8808 = true ∧ castsFifteens 8808 = true := by decide

/-- 2269: nibbles fold back to 8809; digit sum 19 ≡ 8809 (mod 15). -/
theorem enumeration_hex4_2269 : reassembles 8809 = true ∧ castsFifteens 8809 = true := by decide

/-- 226a: nibbles fold back to 8810; digit sum 20 ≡ 8810 (mod 15). -/
theorem enumeration_hex4_226a : reassembles 8810 = true ∧ castsFifteens 8810 = true := by decide

/-- 226b: nibbles fold back to 8811; digit sum 21 ≡ 8811 (mod 15). -/
theorem enumeration_hex4_226b : reassembles 8811 = true ∧ castsFifteens 8811 = true := by decide

/-- 226c: nibbles fold back to 8812; digit sum 22 ≡ 8812 (mod 15). -/
theorem enumeration_hex4_226c : reassembles 8812 = true ∧ castsFifteens 8812 = true := by decide

/-- 226d: nibbles fold back to 8813; digit sum 23 ≡ 8813 (mod 15). -/
theorem enumeration_hex4_226d : reassembles 8813 = true ∧ castsFifteens 8813 = true := by decide

/-- 226e: nibbles fold back to 8814; digit sum 24 ≡ 8814 (mod 15). -/
theorem enumeration_hex4_226e : reassembles 8814 = true ∧ castsFifteens 8814 = true := by decide

/-- 226f: nibbles fold back to 8815; digit sum 25 ≡ 8815 (mod 15). -/
theorem enumeration_hex4_226f : reassembles 8815 = true ∧ castsFifteens 8815 = true := by decide

/-- 2270: nibbles fold back to 8816; digit sum 11 ≡ 8816 (mod 15). -/
theorem enumeration_hex4_2270 : reassembles 8816 = true ∧ castsFifteens 8816 = true := by decide

/-- 2271: nibbles fold back to 8817; digit sum 12 ≡ 8817 (mod 15). -/
theorem enumeration_hex4_2271 : reassembles 8817 = true ∧ castsFifteens 8817 = true := by decide

/-- 2272: nibbles fold back to 8818; digit sum 13 ≡ 8818 (mod 15). -/
theorem enumeration_hex4_2272 : reassembles 8818 = true ∧ castsFifteens 8818 = true := by decide

/-- 2273: nibbles fold back to 8819; digit sum 14 ≡ 8819 (mod 15). -/
theorem enumeration_hex4_2273 : reassembles 8819 = true ∧ castsFifteens 8819 = true := by decide

/-- 2274: nibbles fold back to 8820; digit sum 15 ≡ 8820 (mod 15). -/
theorem enumeration_hex4_2274 : reassembles 8820 = true ∧ castsFifteens 8820 = true := by decide

/-- 2275: nibbles fold back to 8821; digit sum 16 ≡ 8821 (mod 15). -/
theorem enumeration_hex4_2275 : reassembles 8821 = true ∧ castsFifteens 8821 = true := by decide

/-- 2276: nibbles fold back to 8822; digit sum 17 ≡ 8822 (mod 15). -/
theorem enumeration_hex4_2276 : reassembles 8822 = true ∧ castsFifteens 8822 = true := by decide

/-- 2277: nibbles fold back to 8823; digit sum 18 ≡ 8823 (mod 15). -/
theorem enumeration_hex4_2277 : reassembles 8823 = true ∧ castsFifteens 8823 = true := by decide

/-- 2278: nibbles fold back to 8824; digit sum 19 ≡ 8824 (mod 15). -/
theorem enumeration_hex4_2278 : reassembles 8824 = true ∧ castsFifteens 8824 = true := by decide

/-- 2279: nibbles fold back to 8825; digit sum 20 ≡ 8825 (mod 15). -/
theorem enumeration_hex4_2279 : reassembles 8825 = true ∧ castsFifteens 8825 = true := by decide

/-- 227a: nibbles fold back to 8826; digit sum 21 ≡ 8826 (mod 15). -/
theorem enumeration_hex4_227a : reassembles 8826 = true ∧ castsFifteens 8826 = true := by decide

/-- 227b: nibbles fold back to 8827; digit sum 22 ≡ 8827 (mod 15). -/
theorem enumeration_hex4_227b : reassembles 8827 = true ∧ castsFifteens 8827 = true := by decide

/-- 227c: nibbles fold back to 8828; digit sum 23 ≡ 8828 (mod 15). -/
theorem enumeration_hex4_227c : reassembles 8828 = true ∧ castsFifteens 8828 = true := by decide

/-- 227d: nibbles fold back to 8829; digit sum 24 ≡ 8829 (mod 15). -/
theorem enumeration_hex4_227d : reassembles 8829 = true ∧ castsFifteens 8829 = true := by decide

/-- 227e: nibbles fold back to 8830; digit sum 25 ≡ 8830 (mod 15). -/
theorem enumeration_hex4_227e : reassembles 8830 = true ∧ castsFifteens 8830 = true := by decide

/-- 227f: nibbles fold back to 8831; digit sum 26 ≡ 8831 (mod 15). -/
theorem enumeration_hex4_227f : reassembles 8831 = true ∧ castsFifteens 8831 = true := by decide

/-- 2280: nibbles fold back to 8832; digit sum 12 ≡ 8832 (mod 15). -/
theorem enumeration_hex4_2280 : reassembles 8832 = true ∧ castsFifteens 8832 = true := by decide

/-- 2281: nibbles fold back to 8833; digit sum 13 ≡ 8833 (mod 15). -/
theorem enumeration_hex4_2281 : reassembles 8833 = true ∧ castsFifteens 8833 = true := by decide

/-- 2282: nibbles fold back to 8834; digit sum 14 ≡ 8834 (mod 15). -/
theorem enumeration_hex4_2282 : reassembles 8834 = true ∧ castsFifteens 8834 = true := by decide

/-- 2283: nibbles fold back to 8835; digit sum 15 ≡ 8835 (mod 15). -/
theorem enumeration_hex4_2283 : reassembles 8835 = true ∧ castsFifteens 8835 = true := by decide

/-- 2284: nibbles fold back to 8836; digit sum 16 ≡ 8836 (mod 15). -/
theorem enumeration_hex4_2284 : reassembles 8836 = true ∧ castsFifteens 8836 = true := by decide

/-- 2285: nibbles fold back to 8837; digit sum 17 ≡ 8837 (mod 15). -/
theorem enumeration_hex4_2285 : reassembles 8837 = true ∧ castsFifteens 8837 = true := by decide

/-- 2286: nibbles fold back to 8838; digit sum 18 ≡ 8838 (mod 15). -/
theorem enumeration_hex4_2286 : reassembles 8838 = true ∧ castsFifteens 8838 = true := by decide

/-- 2287: nibbles fold back to 8839; digit sum 19 ≡ 8839 (mod 15). -/
theorem enumeration_hex4_2287 : reassembles 8839 = true ∧ castsFifteens 8839 = true := by decide

/-- 2288: nibbles fold back to 8840; digit sum 20 ≡ 8840 (mod 15). -/
theorem enumeration_hex4_2288 : reassembles 8840 = true ∧ castsFifteens 8840 = true := by decide

/-- 2289: nibbles fold back to 8841; digit sum 21 ≡ 8841 (mod 15). -/
theorem enumeration_hex4_2289 : reassembles 8841 = true ∧ castsFifteens 8841 = true := by decide

/-- 228a: nibbles fold back to 8842; digit sum 22 ≡ 8842 (mod 15). -/
theorem enumeration_hex4_228a : reassembles 8842 = true ∧ castsFifteens 8842 = true := by decide

/-- 228b: nibbles fold back to 8843; digit sum 23 ≡ 8843 (mod 15). -/
theorem enumeration_hex4_228b : reassembles 8843 = true ∧ castsFifteens 8843 = true := by decide

/-- 228c: nibbles fold back to 8844; digit sum 24 ≡ 8844 (mod 15). -/
theorem enumeration_hex4_228c : reassembles 8844 = true ∧ castsFifteens 8844 = true := by decide

/-- 228d: nibbles fold back to 8845; digit sum 25 ≡ 8845 (mod 15). -/
theorem enumeration_hex4_228d : reassembles 8845 = true ∧ castsFifteens 8845 = true := by decide

/-- 228e: nibbles fold back to 8846; digit sum 26 ≡ 8846 (mod 15). -/
theorem enumeration_hex4_228e : reassembles 8846 = true ∧ castsFifteens 8846 = true := by decide

/-- 228f: nibbles fold back to 8847; digit sum 27 ≡ 8847 (mod 15). -/
theorem enumeration_hex4_228f : reassembles 8847 = true ∧ castsFifteens 8847 = true := by decide

/-- 2290: nibbles fold back to 8848; digit sum 13 ≡ 8848 (mod 15). -/
theorem enumeration_hex4_2290 : reassembles 8848 = true ∧ castsFifteens 8848 = true := by decide

/-- 2291: nibbles fold back to 8849; digit sum 14 ≡ 8849 (mod 15). -/
theorem enumeration_hex4_2291 : reassembles 8849 = true ∧ castsFifteens 8849 = true := by decide

/-- 2292: nibbles fold back to 8850; digit sum 15 ≡ 8850 (mod 15). -/
theorem enumeration_hex4_2292 : reassembles 8850 = true ∧ castsFifteens 8850 = true := by decide

/-- 2293: nibbles fold back to 8851; digit sum 16 ≡ 8851 (mod 15). -/
theorem enumeration_hex4_2293 : reassembles 8851 = true ∧ castsFifteens 8851 = true := by decide

/-- 2294: nibbles fold back to 8852; digit sum 17 ≡ 8852 (mod 15). -/
theorem enumeration_hex4_2294 : reassembles 8852 = true ∧ castsFifteens 8852 = true := by decide

/-- 2295: nibbles fold back to 8853; digit sum 18 ≡ 8853 (mod 15). -/
theorem enumeration_hex4_2295 : reassembles 8853 = true ∧ castsFifteens 8853 = true := by decide

/-- 2296: nibbles fold back to 8854; digit sum 19 ≡ 8854 (mod 15). -/
theorem enumeration_hex4_2296 : reassembles 8854 = true ∧ castsFifteens 8854 = true := by decide

/-- 2297: nibbles fold back to 8855; digit sum 20 ≡ 8855 (mod 15). -/
theorem enumeration_hex4_2297 : reassembles 8855 = true ∧ castsFifteens 8855 = true := by decide

/-- 2298: nibbles fold back to 8856; digit sum 21 ≡ 8856 (mod 15). -/
theorem enumeration_hex4_2298 : reassembles 8856 = true ∧ castsFifteens 8856 = true := by decide

/-- 2299: nibbles fold back to 8857; digit sum 22 ≡ 8857 (mod 15). -/
theorem enumeration_hex4_2299 : reassembles 8857 = true ∧ castsFifteens 8857 = true := by decide

/-- 229a: nibbles fold back to 8858; digit sum 23 ≡ 8858 (mod 15). -/
theorem enumeration_hex4_229a : reassembles 8858 = true ∧ castsFifteens 8858 = true := by decide

/-- 229b: nibbles fold back to 8859; digit sum 24 ≡ 8859 (mod 15). -/
theorem enumeration_hex4_229b : reassembles 8859 = true ∧ castsFifteens 8859 = true := by decide

/-- 229c: nibbles fold back to 8860; digit sum 25 ≡ 8860 (mod 15). -/
theorem enumeration_hex4_229c : reassembles 8860 = true ∧ castsFifteens 8860 = true := by decide

/-- 229d: nibbles fold back to 8861; digit sum 26 ≡ 8861 (mod 15). -/
theorem enumeration_hex4_229d : reassembles 8861 = true ∧ castsFifteens 8861 = true := by decide

/-- 229e: nibbles fold back to 8862; digit sum 27 ≡ 8862 (mod 15). -/
theorem enumeration_hex4_229e : reassembles 8862 = true ∧ castsFifteens 8862 = true := by decide

/-- 229f: nibbles fold back to 8863; digit sum 28 ≡ 8863 (mod 15). -/
theorem enumeration_hex4_229f : reassembles 8863 = true ∧ castsFifteens 8863 = true := by decide

/-- 22a0: nibbles fold back to 8864; digit sum 14 ≡ 8864 (mod 15). -/
theorem enumeration_hex4_22a0 : reassembles 8864 = true ∧ castsFifteens 8864 = true := by decide

/-- 22a1: nibbles fold back to 8865; digit sum 15 ≡ 8865 (mod 15). -/
theorem enumeration_hex4_22a1 : reassembles 8865 = true ∧ castsFifteens 8865 = true := by decide

/-- 22a2: nibbles fold back to 8866; digit sum 16 ≡ 8866 (mod 15). -/
theorem enumeration_hex4_22a2 : reassembles 8866 = true ∧ castsFifteens 8866 = true := by decide

/-- 22a3: nibbles fold back to 8867; digit sum 17 ≡ 8867 (mod 15). -/
theorem enumeration_hex4_22a3 : reassembles 8867 = true ∧ castsFifteens 8867 = true := by decide

/-- 22a4: nibbles fold back to 8868; digit sum 18 ≡ 8868 (mod 15). -/
theorem enumeration_hex4_22a4 : reassembles 8868 = true ∧ castsFifteens 8868 = true := by decide

/-- 22a5: nibbles fold back to 8869; digit sum 19 ≡ 8869 (mod 15). -/
theorem enumeration_hex4_22a5 : reassembles 8869 = true ∧ castsFifteens 8869 = true := by decide

/-- 22a6: nibbles fold back to 8870; digit sum 20 ≡ 8870 (mod 15). -/
theorem enumeration_hex4_22a6 : reassembles 8870 = true ∧ castsFifteens 8870 = true := by decide

/-- 22a7: nibbles fold back to 8871; digit sum 21 ≡ 8871 (mod 15). -/
theorem enumeration_hex4_22a7 : reassembles 8871 = true ∧ castsFifteens 8871 = true := by decide

/-- 22a8: nibbles fold back to 8872; digit sum 22 ≡ 8872 (mod 15). -/
theorem enumeration_hex4_22a8 : reassembles 8872 = true ∧ castsFifteens 8872 = true := by decide

/-- 22a9: nibbles fold back to 8873; digit sum 23 ≡ 8873 (mod 15). -/
theorem enumeration_hex4_22a9 : reassembles 8873 = true ∧ castsFifteens 8873 = true := by decide

/-- 22aa: nibbles fold back to 8874; digit sum 24 ≡ 8874 (mod 15). -/
theorem enumeration_hex4_22aa : reassembles 8874 = true ∧ castsFifteens 8874 = true := by decide

/-- 22ab: nibbles fold back to 8875; digit sum 25 ≡ 8875 (mod 15). -/
theorem enumeration_hex4_22ab : reassembles 8875 = true ∧ castsFifteens 8875 = true := by decide

/-- 22ac: nibbles fold back to 8876; digit sum 26 ≡ 8876 (mod 15). -/
theorem enumeration_hex4_22ac : reassembles 8876 = true ∧ castsFifteens 8876 = true := by decide

/-- 22ad: nibbles fold back to 8877; digit sum 27 ≡ 8877 (mod 15). -/
theorem enumeration_hex4_22ad : reassembles 8877 = true ∧ castsFifteens 8877 = true := by decide

/-- 22ae: nibbles fold back to 8878; digit sum 28 ≡ 8878 (mod 15). -/
theorem enumeration_hex4_22ae : reassembles 8878 = true ∧ castsFifteens 8878 = true := by decide

/-- 22af: nibbles fold back to 8879; digit sum 29 ≡ 8879 (mod 15). -/
theorem enumeration_hex4_22af : reassembles 8879 = true ∧ castsFifteens 8879 = true := by decide

/-- 22b0: nibbles fold back to 8880; digit sum 15 ≡ 8880 (mod 15). -/
theorem enumeration_hex4_22b0 : reassembles 8880 = true ∧ castsFifteens 8880 = true := by decide

/-- 22b1: nibbles fold back to 8881; digit sum 16 ≡ 8881 (mod 15). -/
theorem enumeration_hex4_22b1 : reassembles 8881 = true ∧ castsFifteens 8881 = true := by decide

/-- 22b2: nibbles fold back to 8882; digit sum 17 ≡ 8882 (mod 15). -/
theorem enumeration_hex4_22b2 : reassembles 8882 = true ∧ castsFifteens 8882 = true := by decide

/-- 22b3: nibbles fold back to 8883; digit sum 18 ≡ 8883 (mod 15). -/
theorem enumeration_hex4_22b3 : reassembles 8883 = true ∧ castsFifteens 8883 = true := by decide

/-- 22b4: nibbles fold back to 8884; digit sum 19 ≡ 8884 (mod 15). -/
theorem enumeration_hex4_22b4 : reassembles 8884 = true ∧ castsFifteens 8884 = true := by decide

/-- 22b5: nibbles fold back to 8885; digit sum 20 ≡ 8885 (mod 15). -/
theorem enumeration_hex4_22b5 : reassembles 8885 = true ∧ castsFifteens 8885 = true := by decide

/-- 22b6: nibbles fold back to 8886; digit sum 21 ≡ 8886 (mod 15). -/
theorem enumeration_hex4_22b6 : reassembles 8886 = true ∧ castsFifteens 8886 = true := by decide

/-- 22b7: nibbles fold back to 8887; digit sum 22 ≡ 8887 (mod 15). -/
theorem enumeration_hex4_22b7 : reassembles 8887 = true ∧ castsFifteens 8887 = true := by decide

/-- 22b8: nibbles fold back to 8888; digit sum 23 ≡ 8888 (mod 15). -/
theorem enumeration_hex4_22b8 : reassembles 8888 = true ∧ castsFifteens 8888 = true := by decide

/-- 22b9: nibbles fold back to 8889; digit sum 24 ≡ 8889 (mod 15). -/
theorem enumeration_hex4_22b9 : reassembles 8889 = true ∧ castsFifteens 8889 = true := by decide

/-- 22ba: nibbles fold back to 8890; digit sum 25 ≡ 8890 (mod 15). -/
theorem enumeration_hex4_22ba : reassembles 8890 = true ∧ castsFifteens 8890 = true := by decide

/-- 22bb: nibbles fold back to 8891; digit sum 26 ≡ 8891 (mod 15). -/
theorem enumeration_hex4_22bb : reassembles 8891 = true ∧ castsFifteens 8891 = true := by decide

/-- 22bc: nibbles fold back to 8892; digit sum 27 ≡ 8892 (mod 15). -/
theorem enumeration_hex4_22bc : reassembles 8892 = true ∧ castsFifteens 8892 = true := by decide

/-- 22bd: nibbles fold back to 8893; digit sum 28 ≡ 8893 (mod 15). -/
theorem enumeration_hex4_22bd : reassembles 8893 = true ∧ castsFifteens 8893 = true := by decide

/-- 22be: nibbles fold back to 8894; digit sum 29 ≡ 8894 (mod 15). -/
theorem enumeration_hex4_22be : reassembles 8894 = true ∧ castsFifteens 8894 = true := by decide

/-- 22bf: nibbles fold back to 8895; digit sum 30 ≡ 8895 (mod 15). -/
theorem enumeration_hex4_22bf : reassembles 8895 = true ∧ castsFifteens 8895 = true := by decide

/-- 22c0: nibbles fold back to 8896; digit sum 16 ≡ 8896 (mod 15). -/
theorem enumeration_hex4_22c0 : reassembles 8896 = true ∧ castsFifteens 8896 = true := by decide

/-- 22c1: nibbles fold back to 8897; digit sum 17 ≡ 8897 (mod 15). -/
theorem enumeration_hex4_22c1 : reassembles 8897 = true ∧ castsFifteens 8897 = true := by decide

/-- 22c2: nibbles fold back to 8898; digit sum 18 ≡ 8898 (mod 15). -/
theorem enumeration_hex4_22c2 : reassembles 8898 = true ∧ castsFifteens 8898 = true := by decide

/-- 22c3: nibbles fold back to 8899; digit sum 19 ≡ 8899 (mod 15). -/
theorem enumeration_hex4_22c3 : reassembles 8899 = true ∧ castsFifteens 8899 = true := by decide

/-- 22c4: nibbles fold back to 8900; digit sum 20 ≡ 8900 (mod 15). -/
theorem enumeration_hex4_22c4 : reassembles 8900 = true ∧ castsFifteens 8900 = true := by decide

/-- 22c5: nibbles fold back to 8901; digit sum 21 ≡ 8901 (mod 15). -/
theorem enumeration_hex4_22c5 : reassembles 8901 = true ∧ castsFifteens 8901 = true := by decide

/-- 22c6: nibbles fold back to 8902; digit sum 22 ≡ 8902 (mod 15). -/
theorem enumeration_hex4_22c6 : reassembles 8902 = true ∧ castsFifteens 8902 = true := by decide

/-- 22c7: nibbles fold back to 8903; digit sum 23 ≡ 8903 (mod 15). -/
theorem enumeration_hex4_22c7 : reassembles 8903 = true ∧ castsFifteens 8903 = true := by decide

/-- 22c8: nibbles fold back to 8904; digit sum 24 ≡ 8904 (mod 15). -/
theorem enumeration_hex4_22c8 : reassembles 8904 = true ∧ castsFifteens 8904 = true := by decide

/-- 22c9: nibbles fold back to 8905; digit sum 25 ≡ 8905 (mod 15). -/
theorem enumeration_hex4_22c9 : reassembles 8905 = true ∧ castsFifteens 8905 = true := by decide

/-- 22ca: nibbles fold back to 8906; digit sum 26 ≡ 8906 (mod 15). -/
theorem enumeration_hex4_22ca : reassembles 8906 = true ∧ castsFifteens 8906 = true := by decide

/-- 22cb: nibbles fold back to 8907; digit sum 27 ≡ 8907 (mod 15). -/
theorem enumeration_hex4_22cb : reassembles 8907 = true ∧ castsFifteens 8907 = true := by decide

/-- 22cc: nibbles fold back to 8908; digit sum 28 ≡ 8908 (mod 15). -/
theorem enumeration_hex4_22cc : reassembles 8908 = true ∧ castsFifteens 8908 = true := by decide

/-- 22cd: nibbles fold back to 8909; digit sum 29 ≡ 8909 (mod 15). -/
theorem enumeration_hex4_22cd : reassembles 8909 = true ∧ castsFifteens 8909 = true := by decide

/-- 22ce: nibbles fold back to 8910; digit sum 30 ≡ 8910 (mod 15). -/
theorem enumeration_hex4_22ce : reassembles 8910 = true ∧ castsFifteens 8910 = true := by decide

/-- 22cf: nibbles fold back to 8911; digit sum 31 ≡ 8911 (mod 15). -/
theorem enumeration_hex4_22cf : reassembles 8911 = true ∧ castsFifteens 8911 = true := by decide

/-- 22d0: nibbles fold back to 8912; digit sum 17 ≡ 8912 (mod 15). -/
theorem enumeration_hex4_22d0 : reassembles 8912 = true ∧ castsFifteens 8912 = true := by decide

/-- 22d1: nibbles fold back to 8913; digit sum 18 ≡ 8913 (mod 15). -/
theorem enumeration_hex4_22d1 : reassembles 8913 = true ∧ castsFifteens 8913 = true := by decide

/-- 22d2: nibbles fold back to 8914; digit sum 19 ≡ 8914 (mod 15). -/
theorem enumeration_hex4_22d2 : reassembles 8914 = true ∧ castsFifteens 8914 = true := by decide

/-- 22d3: nibbles fold back to 8915; digit sum 20 ≡ 8915 (mod 15). -/
theorem enumeration_hex4_22d3 : reassembles 8915 = true ∧ castsFifteens 8915 = true := by decide

/-- 22d4: nibbles fold back to 8916; digit sum 21 ≡ 8916 (mod 15). -/
theorem enumeration_hex4_22d4 : reassembles 8916 = true ∧ castsFifteens 8916 = true := by decide

/-- 22d5: nibbles fold back to 8917; digit sum 22 ≡ 8917 (mod 15). -/
theorem enumeration_hex4_22d5 : reassembles 8917 = true ∧ castsFifteens 8917 = true := by decide

/-- 22d6: nibbles fold back to 8918; digit sum 23 ≡ 8918 (mod 15). -/
theorem enumeration_hex4_22d6 : reassembles 8918 = true ∧ castsFifteens 8918 = true := by decide

/-- 22d7: nibbles fold back to 8919; digit sum 24 ≡ 8919 (mod 15). -/
theorem enumeration_hex4_22d7 : reassembles 8919 = true ∧ castsFifteens 8919 = true := by decide

/-- 22d8: nibbles fold back to 8920; digit sum 25 ≡ 8920 (mod 15). -/
theorem enumeration_hex4_22d8 : reassembles 8920 = true ∧ castsFifteens 8920 = true := by decide

/-- 22d9: nibbles fold back to 8921; digit sum 26 ≡ 8921 (mod 15). -/
theorem enumeration_hex4_22d9 : reassembles 8921 = true ∧ castsFifteens 8921 = true := by decide

/-- 22da: nibbles fold back to 8922; digit sum 27 ≡ 8922 (mod 15). -/
theorem enumeration_hex4_22da : reassembles 8922 = true ∧ castsFifteens 8922 = true := by decide

/-- 22db: nibbles fold back to 8923; digit sum 28 ≡ 8923 (mod 15). -/
theorem enumeration_hex4_22db : reassembles 8923 = true ∧ castsFifteens 8923 = true := by decide

/-- 22dc: nibbles fold back to 8924; digit sum 29 ≡ 8924 (mod 15). -/
theorem enumeration_hex4_22dc : reassembles 8924 = true ∧ castsFifteens 8924 = true := by decide

/-- 22dd: nibbles fold back to 8925; digit sum 30 ≡ 8925 (mod 15). -/
theorem enumeration_hex4_22dd : reassembles 8925 = true ∧ castsFifteens 8925 = true := by decide

/-- 22de: nibbles fold back to 8926; digit sum 31 ≡ 8926 (mod 15). -/
theorem enumeration_hex4_22de : reassembles 8926 = true ∧ castsFifteens 8926 = true := by decide

/-- 22df: nibbles fold back to 8927; digit sum 32 ≡ 8927 (mod 15). -/
theorem enumeration_hex4_22df : reassembles 8927 = true ∧ castsFifteens 8927 = true := by decide

/-- 22e0: nibbles fold back to 8928; digit sum 18 ≡ 8928 (mod 15). -/
theorem enumeration_hex4_22e0 : reassembles 8928 = true ∧ castsFifteens 8928 = true := by decide

/-- 22e1: nibbles fold back to 8929; digit sum 19 ≡ 8929 (mod 15). -/
theorem enumeration_hex4_22e1 : reassembles 8929 = true ∧ castsFifteens 8929 = true := by decide

/-- 22e2: nibbles fold back to 8930; digit sum 20 ≡ 8930 (mod 15). -/
theorem enumeration_hex4_22e2 : reassembles 8930 = true ∧ castsFifteens 8930 = true := by decide

/-- 22e3: nibbles fold back to 8931; digit sum 21 ≡ 8931 (mod 15). -/
theorem enumeration_hex4_22e3 : reassembles 8931 = true ∧ castsFifteens 8931 = true := by decide

/-- 22e4: nibbles fold back to 8932; digit sum 22 ≡ 8932 (mod 15). -/
theorem enumeration_hex4_22e4 : reassembles 8932 = true ∧ castsFifteens 8932 = true := by decide

/-- 22e5: nibbles fold back to 8933; digit sum 23 ≡ 8933 (mod 15). -/
theorem enumeration_hex4_22e5 : reassembles 8933 = true ∧ castsFifteens 8933 = true := by decide

/-- 22e6: nibbles fold back to 8934; digit sum 24 ≡ 8934 (mod 15). -/
theorem enumeration_hex4_22e6 : reassembles 8934 = true ∧ castsFifteens 8934 = true := by decide

/-- 22e7: nibbles fold back to 8935; digit sum 25 ≡ 8935 (mod 15). -/
theorem enumeration_hex4_22e7 : reassembles 8935 = true ∧ castsFifteens 8935 = true := by decide

/-- 22e8: nibbles fold back to 8936; digit sum 26 ≡ 8936 (mod 15). -/
theorem enumeration_hex4_22e8 : reassembles 8936 = true ∧ castsFifteens 8936 = true := by decide

/-- 22e9: nibbles fold back to 8937; digit sum 27 ≡ 8937 (mod 15). -/
theorem enumeration_hex4_22e9 : reassembles 8937 = true ∧ castsFifteens 8937 = true := by decide

/-- 22ea: nibbles fold back to 8938; digit sum 28 ≡ 8938 (mod 15). -/
theorem enumeration_hex4_22ea : reassembles 8938 = true ∧ castsFifteens 8938 = true := by decide

/-- 22eb: nibbles fold back to 8939; digit sum 29 ≡ 8939 (mod 15). -/
theorem enumeration_hex4_22eb : reassembles 8939 = true ∧ castsFifteens 8939 = true := by decide

/-- 22ec: nibbles fold back to 8940; digit sum 30 ≡ 8940 (mod 15). -/
theorem enumeration_hex4_22ec : reassembles 8940 = true ∧ castsFifteens 8940 = true := by decide

/-- 22ed: nibbles fold back to 8941; digit sum 31 ≡ 8941 (mod 15). -/
theorem enumeration_hex4_22ed : reassembles 8941 = true ∧ castsFifteens 8941 = true := by decide

/-- 22ee: nibbles fold back to 8942; digit sum 32 ≡ 8942 (mod 15). -/
theorem enumeration_hex4_22ee : reassembles 8942 = true ∧ castsFifteens 8942 = true := by decide

/-- 22ef: nibbles fold back to 8943; digit sum 33 ≡ 8943 (mod 15). -/
theorem enumeration_hex4_22ef : reassembles 8943 = true ∧ castsFifteens 8943 = true := by decide

/-- 22f0: nibbles fold back to 8944; digit sum 19 ≡ 8944 (mod 15). -/
theorem enumeration_hex4_22f0 : reassembles 8944 = true ∧ castsFifteens 8944 = true := by decide

/-- 22f1: nibbles fold back to 8945; digit sum 20 ≡ 8945 (mod 15). -/
theorem enumeration_hex4_22f1 : reassembles 8945 = true ∧ castsFifteens 8945 = true := by decide

/-- 22f2: nibbles fold back to 8946; digit sum 21 ≡ 8946 (mod 15). -/
theorem enumeration_hex4_22f2 : reassembles 8946 = true ∧ castsFifteens 8946 = true := by decide

/-- 22f3: nibbles fold back to 8947; digit sum 22 ≡ 8947 (mod 15). -/
theorem enumeration_hex4_22f3 : reassembles 8947 = true ∧ castsFifteens 8947 = true := by decide

/-- 22f4: nibbles fold back to 8948; digit sum 23 ≡ 8948 (mod 15). -/
theorem enumeration_hex4_22f4 : reassembles 8948 = true ∧ castsFifteens 8948 = true := by decide

/-- 22f5: nibbles fold back to 8949; digit sum 24 ≡ 8949 (mod 15). -/
theorem enumeration_hex4_22f5 : reassembles 8949 = true ∧ castsFifteens 8949 = true := by decide

/-- 22f6: nibbles fold back to 8950; digit sum 25 ≡ 8950 (mod 15). -/
theorem enumeration_hex4_22f6 : reassembles 8950 = true ∧ castsFifteens 8950 = true := by decide

/-- 22f7: nibbles fold back to 8951; digit sum 26 ≡ 8951 (mod 15). -/
theorem enumeration_hex4_22f7 : reassembles 8951 = true ∧ castsFifteens 8951 = true := by decide

/-- 22f8: nibbles fold back to 8952; digit sum 27 ≡ 8952 (mod 15). -/
theorem enumeration_hex4_22f8 : reassembles 8952 = true ∧ castsFifteens 8952 = true := by decide

/-- 22f9: nibbles fold back to 8953; digit sum 28 ≡ 8953 (mod 15). -/
theorem enumeration_hex4_22f9 : reassembles 8953 = true ∧ castsFifteens 8953 = true := by decide

/-- 22fa: nibbles fold back to 8954; digit sum 29 ≡ 8954 (mod 15). -/
theorem enumeration_hex4_22fa : reassembles 8954 = true ∧ castsFifteens 8954 = true := by decide

/-- 22fb: nibbles fold back to 8955; digit sum 30 ≡ 8955 (mod 15). -/
theorem enumeration_hex4_22fb : reassembles 8955 = true ∧ castsFifteens 8955 = true := by decide

/-- 22fc: nibbles fold back to 8956; digit sum 31 ≡ 8956 (mod 15). -/
theorem enumeration_hex4_22fc : reassembles 8956 = true ∧ castsFifteens 8956 = true := by decide

/-- 22fd: nibbles fold back to 8957; digit sum 32 ≡ 8957 (mod 15). -/
theorem enumeration_hex4_22fd : reassembles 8957 = true ∧ castsFifteens 8957 = true := by decide

/-- 22fe: nibbles fold back to 8958; digit sum 33 ≡ 8958 (mod 15). -/
theorem enumeration_hex4_22fe : reassembles 8958 = true ∧ castsFifteens 8958 = true := by decide

/-- 22ff: nibbles fold back to 8959; digit sum 34 ≡ 8959 (mod 15). -/
theorem enumeration_hex4_22ff : reassembles 8959 = true ∧ castsFifteens 8959 = true := by decide

/-- 2300: nibbles fold back to 8960; digit sum 5 ≡ 8960 (mod 15). -/
theorem enumeration_hex4_2300 : reassembles 8960 = true ∧ castsFifteens 8960 = true := by decide

/-- 2301: nibbles fold back to 8961; digit sum 6 ≡ 8961 (mod 15). -/
theorem enumeration_hex4_2301 : reassembles 8961 = true ∧ castsFifteens 8961 = true := by decide

/-- 2302: nibbles fold back to 8962; digit sum 7 ≡ 8962 (mod 15). -/
theorem enumeration_hex4_2302 : reassembles 8962 = true ∧ castsFifteens 8962 = true := by decide

/-- 2303: nibbles fold back to 8963; digit sum 8 ≡ 8963 (mod 15). -/
theorem enumeration_hex4_2303 : reassembles 8963 = true ∧ castsFifteens 8963 = true := by decide

/-- 2304: nibbles fold back to 8964; digit sum 9 ≡ 8964 (mod 15). -/
theorem enumeration_hex4_2304 : reassembles 8964 = true ∧ castsFifteens 8964 = true := by decide

/-- 2305: nibbles fold back to 8965; digit sum 10 ≡ 8965 (mod 15). -/
theorem enumeration_hex4_2305 : reassembles 8965 = true ∧ castsFifteens 8965 = true := by decide

/-- 2306: nibbles fold back to 8966; digit sum 11 ≡ 8966 (mod 15). -/
theorem enumeration_hex4_2306 : reassembles 8966 = true ∧ castsFifteens 8966 = true := by decide

/-- 2307: nibbles fold back to 8967; digit sum 12 ≡ 8967 (mod 15). -/
theorem enumeration_hex4_2307 : reassembles 8967 = true ∧ castsFifteens 8967 = true := by decide

/-- 2308: nibbles fold back to 8968; digit sum 13 ≡ 8968 (mod 15). -/
theorem enumeration_hex4_2308 : reassembles 8968 = true ∧ castsFifteens 8968 = true := by decide

/-- 2309: nibbles fold back to 8969; digit sum 14 ≡ 8969 (mod 15). -/
theorem enumeration_hex4_2309 : reassembles 8969 = true ∧ castsFifteens 8969 = true := by decide

/-- 230a: nibbles fold back to 8970; digit sum 15 ≡ 8970 (mod 15). -/
theorem enumeration_hex4_230a : reassembles 8970 = true ∧ castsFifteens 8970 = true := by decide

/-- 230b: nibbles fold back to 8971; digit sum 16 ≡ 8971 (mod 15). -/
theorem enumeration_hex4_230b : reassembles 8971 = true ∧ castsFifteens 8971 = true := by decide

/-- 230c: nibbles fold back to 8972; digit sum 17 ≡ 8972 (mod 15). -/
theorem enumeration_hex4_230c : reassembles 8972 = true ∧ castsFifteens 8972 = true := by decide

/-- 230d: nibbles fold back to 8973; digit sum 18 ≡ 8973 (mod 15). -/
theorem enumeration_hex4_230d : reassembles 8973 = true ∧ castsFifteens 8973 = true := by decide

/-- 230e: nibbles fold back to 8974; digit sum 19 ≡ 8974 (mod 15). -/
theorem enumeration_hex4_230e : reassembles 8974 = true ∧ castsFifteens 8974 = true := by decide

/-- 230f: nibbles fold back to 8975; digit sum 20 ≡ 8975 (mod 15). -/
theorem enumeration_hex4_230f : reassembles 8975 = true ∧ castsFifteens 8975 = true := by decide

/-- 2310: nibbles fold back to 8976; digit sum 6 ≡ 8976 (mod 15). -/
theorem enumeration_hex4_2310 : reassembles 8976 = true ∧ castsFifteens 8976 = true := by decide

/-- 2311: nibbles fold back to 8977; digit sum 7 ≡ 8977 (mod 15). -/
theorem enumeration_hex4_2311 : reassembles 8977 = true ∧ castsFifteens 8977 = true := by decide

/-- 2312: nibbles fold back to 8978; digit sum 8 ≡ 8978 (mod 15). -/
theorem enumeration_hex4_2312 : reassembles 8978 = true ∧ castsFifteens 8978 = true := by decide

/-- 2313: nibbles fold back to 8979; digit sum 9 ≡ 8979 (mod 15). -/
theorem enumeration_hex4_2313 : reassembles 8979 = true ∧ castsFifteens 8979 = true := by decide

/-- 2314: nibbles fold back to 8980; digit sum 10 ≡ 8980 (mod 15). -/
theorem enumeration_hex4_2314 : reassembles 8980 = true ∧ castsFifteens 8980 = true := by decide

/-- 2315: nibbles fold back to 8981; digit sum 11 ≡ 8981 (mod 15). -/
theorem enumeration_hex4_2315 : reassembles 8981 = true ∧ castsFifteens 8981 = true := by decide

/-- 2316: nibbles fold back to 8982; digit sum 12 ≡ 8982 (mod 15). -/
theorem enumeration_hex4_2316 : reassembles 8982 = true ∧ castsFifteens 8982 = true := by decide

/-- 2317: nibbles fold back to 8983; digit sum 13 ≡ 8983 (mod 15). -/
theorem enumeration_hex4_2317 : reassembles 8983 = true ∧ castsFifteens 8983 = true := by decide

/-- 2318: nibbles fold back to 8984; digit sum 14 ≡ 8984 (mod 15). -/
theorem enumeration_hex4_2318 : reassembles 8984 = true ∧ castsFifteens 8984 = true := by decide

/-- 2319: nibbles fold back to 8985; digit sum 15 ≡ 8985 (mod 15). -/
theorem enumeration_hex4_2319 : reassembles 8985 = true ∧ castsFifteens 8985 = true := by decide

/-- 231a: nibbles fold back to 8986; digit sum 16 ≡ 8986 (mod 15). -/
theorem enumeration_hex4_231a : reassembles 8986 = true ∧ castsFifteens 8986 = true := by decide

/-- 231b: nibbles fold back to 8987; digit sum 17 ≡ 8987 (mod 15). -/
theorem enumeration_hex4_231b : reassembles 8987 = true ∧ castsFifteens 8987 = true := by decide

/-- 231c: nibbles fold back to 8988; digit sum 18 ≡ 8988 (mod 15). -/
theorem enumeration_hex4_231c : reassembles 8988 = true ∧ castsFifteens 8988 = true := by decide

/-- 231d: nibbles fold back to 8989; digit sum 19 ≡ 8989 (mod 15). -/
theorem enumeration_hex4_231d : reassembles 8989 = true ∧ castsFifteens 8989 = true := by decide

/-- 231e: nibbles fold back to 8990; digit sum 20 ≡ 8990 (mod 15). -/
theorem enumeration_hex4_231e : reassembles 8990 = true ∧ castsFifteens 8990 = true := by decide

/-- 231f: nibbles fold back to 8991; digit sum 21 ≡ 8991 (mod 15). -/
theorem enumeration_hex4_231f : reassembles 8991 = true ∧ castsFifteens 8991 = true := by decide

/-- 2320: nibbles fold back to 8992; digit sum 7 ≡ 8992 (mod 15). -/
theorem enumeration_hex4_2320 : reassembles 8992 = true ∧ castsFifteens 8992 = true := by decide

/-- 2321: nibbles fold back to 8993; digit sum 8 ≡ 8993 (mod 15). -/
theorem enumeration_hex4_2321 : reassembles 8993 = true ∧ castsFifteens 8993 = true := by decide

/-- 2322: nibbles fold back to 8994; digit sum 9 ≡ 8994 (mod 15). -/
theorem enumeration_hex4_2322 : reassembles 8994 = true ∧ castsFifteens 8994 = true := by decide

/-- 2323: nibbles fold back to 8995; digit sum 10 ≡ 8995 (mod 15). -/
theorem enumeration_hex4_2323 : reassembles 8995 = true ∧ castsFifteens 8995 = true := by decide

/-- 2324: nibbles fold back to 8996; digit sum 11 ≡ 8996 (mod 15). -/
theorem enumeration_hex4_2324 : reassembles 8996 = true ∧ castsFifteens 8996 = true := by decide

/-- 2325: nibbles fold back to 8997; digit sum 12 ≡ 8997 (mod 15). -/
theorem enumeration_hex4_2325 : reassembles 8997 = true ∧ castsFifteens 8997 = true := by decide

/-- 2326: nibbles fold back to 8998; digit sum 13 ≡ 8998 (mod 15). -/
theorem enumeration_hex4_2326 : reassembles 8998 = true ∧ castsFifteens 8998 = true := by decide

/-- 2327: nibbles fold back to 8999; digit sum 14 ≡ 8999 (mod 15). -/
theorem enumeration_hex4_2327 : reassembles 8999 = true ∧ castsFifteens 8999 = true := by decide

/-- 2328: nibbles fold back to 9000; digit sum 15 ≡ 9000 (mod 15). -/
theorem enumeration_hex4_2328 : reassembles 9000 = true ∧ castsFifteens 9000 = true := by decide

/-- 2329: nibbles fold back to 9001; digit sum 16 ≡ 9001 (mod 15). -/
theorem enumeration_hex4_2329 : reassembles 9001 = true ∧ castsFifteens 9001 = true := by decide

/-- 232a: nibbles fold back to 9002; digit sum 17 ≡ 9002 (mod 15). -/
theorem enumeration_hex4_232a : reassembles 9002 = true ∧ castsFifteens 9002 = true := by decide

/-- 232b: nibbles fold back to 9003; digit sum 18 ≡ 9003 (mod 15). -/
theorem enumeration_hex4_232b : reassembles 9003 = true ∧ castsFifteens 9003 = true := by decide

/-- 232c: nibbles fold back to 9004; digit sum 19 ≡ 9004 (mod 15). -/
theorem enumeration_hex4_232c : reassembles 9004 = true ∧ castsFifteens 9004 = true := by decide

/-- 232d: nibbles fold back to 9005; digit sum 20 ≡ 9005 (mod 15). -/
theorem enumeration_hex4_232d : reassembles 9005 = true ∧ castsFifteens 9005 = true := by decide

/-- 232e: nibbles fold back to 9006; digit sum 21 ≡ 9006 (mod 15). -/
theorem enumeration_hex4_232e : reassembles 9006 = true ∧ castsFifteens 9006 = true := by decide

/-- 232f: nibbles fold back to 9007; digit sum 22 ≡ 9007 (mod 15). -/
theorem enumeration_hex4_232f : reassembles 9007 = true ∧ castsFifteens 9007 = true := by decide

/-- 2330: nibbles fold back to 9008; digit sum 8 ≡ 9008 (mod 15). -/
theorem enumeration_hex4_2330 : reassembles 9008 = true ∧ castsFifteens 9008 = true := by decide

/-- 2331: nibbles fold back to 9009; digit sum 9 ≡ 9009 (mod 15). -/
theorem enumeration_hex4_2331 : reassembles 9009 = true ∧ castsFifteens 9009 = true := by decide

/-- 2332: nibbles fold back to 9010; digit sum 10 ≡ 9010 (mod 15). -/
theorem enumeration_hex4_2332 : reassembles 9010 = true ∧ castsFifteens 9010 = true := by decide

/-- 2333: nibbles fold back to 9011; digit sum 11 ≡ 9011 (mod 15). -/
theorem enumeration_hex4_2333 : reassembles 9011 = true ∧ castsFifteens 9011 = true := by decide

/-- 2334: nibbles fold back to 9012; digit sum 12 ≡ 9012 (mod 15). -/
theorem enumeration_hex4_2334 : reassembles 9012 = true ∧ castsFifteens 9012 = true := by decide

/-- 2335: nibbles fold back to 9013; digit sum 13 ≡ 9013 (mod 15). -/
theorem enumeration_hex4_2335 : reassembles 9013 = true ∧ castsFifteens 9013 = true := by decide

/-- 2336: nibbles fold back to 9014; digit sum 14 ≡ 9014 (mod 15). -/
theorem enumeration_hex4_2336 : reassembles 9014 = true ∧ castsFifteens 9014 = true := by decide

/-- 2337: nibbles fold back to 9015; digit sum 15 ≡ 9015 (mod 15). -/
theorem enumeration_hex4_2337 : reassembles 9015 = true ∧ castsFifteens 9015 = true := by decide

/-- 2338: nibbles fold back to 9016; digit sum 16 ≡ 9016 (mod 15). -/
theorem enumeration_hex4_2338 : reassembles 9016 = true ∧ castsFifteens 9016 = true := by decide

/-- 2339: nibbles fold back to 9017; digit sum 17 ≡ 9017 (mod 15). -/
theorem enumeration_hex4_2339 : reassembles 9017 = true ∧ castsFifteens 9017 = true := by decide

/-- 233a: nibbles fold back to 9018; digit sum 18 ≡ 9018 (mod 15). -/
theorem enumeration_hex4_233a : reassembles 9018 = true ∧ castsFifteens 9018 = true := by decide

/-- 233b: nibbles fold back to 9019; digit sum 19 ≡ 9019 (mod 15). -/
theorem enumeration_hex4_233b : reassembles 9019 = true ∧ castsFifteens 9019 = true := by decide

/-- 233c: nibbles fold back to 9020; digit sum 20 ≡ 9020 (mod 15). -/
theorem enumeration_hex4_233c : reassembles 9020 = true ∧ castsFifteens 9020 = true := by decide

/-- 233d: nibbles fold back to 9021; digit sum 21 ≡ 9021 (mod 15). -/
theorem enumeration_hex4_233d : reassembles 9021 = true ∧ castsFifteens 9021 = true := by decide

/-- 233e: nibbles fold back to 9022; digit sum 22 ≡ 9022 (mod 15). -/
theorem enumeration_hex4_233e : reassembles 9022 = true ∧ castsFifteens 9022 = true := by decide

/-- 233f: nibbles fold back to 9023; digit sum 23 ≡ 9023 (mod 15). -/
theorem enumeration_hex4_233f : reassembles 9023 = true ∧ castsFifteens 9023 = true := by decide

/-- 2340: nibbles fold back to 9024; digit sum 9 ≡ 9024 (mod 15). -/
theorem enumeration_hex4_2340 : reassembles 9024 = true ∧ castsFifteens 9024 = true := by decide

/-- 2341: nibbles fold back to 9025; digit sum 10 ≡ 9025 (mod 15). -/
theorem enumeration_hex4_2341 : reassembles 9025 = true ∧ castsFifteens 9025 = true := by decide

/-- 2342: nibbles fold back to 9026; digit sum 11 ≡ 9026 (mod 15). -/
theorem enumeration_hex4_2342 : reassembles 9026 = true ∧ castsFifteens 9026 = true := by decide

/-- 2343: nibbles fold back to 9027; digit sum 12 ≡ 9027 (mod 15). -/
theorem enumeration_hex4_2343 : reassembles 9027 = true ∧ castsFifteens 9027 = true := by decide

/-- 2344: nibbles fold back to 9028; digit sum 13 ≡ 9028 (mod 15). -/
theorem enumeration_hex4_2344 : reassembles 9028 = true ∧ castsFifteens 9028 = true := by decide

/-- 2345: nibbles fold back to 9029; digit sum 14 ≡ 9029 (mod 15). -/
theorem enumeration_hex4_2345 : reassembles 9029 = true ∧ castsFifteens 9029 = true := by decide

/-- 2346: nibbles fold back to 9030; digit sum 15 ≡ 9030 (mod 15). -/
theorem enumeration_hex4_2346 : reassembles 9030 = true ∧ castsFifteens 9030 = true := by decide

/-- 2347: nibbles fold back to 9031; digit sum 16 ≡ 9031 (mod 15). -/
theorem enumeration_hex4_2347 : reassembles 9031 = true ∧ castsFifteens 9031 = true := by decide

/-- 2348: nibbles fold back to 9032; digit sum 17 ≡ 9032 (mod 15). -/
theorem enumeration_hex4_2348 : reassembles 9032 = true ∧ castsFifteens 9032 = true := by decide

/-- 2349: nibbles fold back to 9033; digit sum 18 ≡ 9033 (mod 15). -/
theorem enumeration_hex4_2349 : reassembles 9033 = true ∧ castsFifteens 9033 = true := by decide

/-- 234a: nibbles fold back to 9034; digit sum 19 ≡ 9034 (mod 15). -/
theorem enumeration_hex4_234a : reassembles 9034 = true ∧ castsFifteens 9034 = true := by decide

/-- 234b: nibbles fold back to 9035; digit sum 20 ≡ 9035 (mod 15). -/
theorem enumeration_hex4_234b : reassembles 9035 = true ∧ castsFifteens 9035 = true := by decide

/-- 234c: nibbles fold back to 9036; digit sum 21 ≡ 9036 (mod 15). -/
theorem enumeration_hex4_234c : reassembles 9036 = true ∧ castsFifteens 9036 = true := by decide

/-- 234d: nibbles fold back to 9037; digit sum 22 ≡ 9037 (mod 15). -/
theorem enumeration_hex4_234d : reassembles 9037 = true ∧ castsFifteens 9037 = true := by decide

/-- 234e: nibbles fold back to 9038; digit sum 23 ≡ 9038 (mod 15). -/
theorem enumeration_hex4_234e : reassembles 9038 = true ∧ castsFifteens 9038 = true := by decide

/-- 234f: nibbles fold back to 9039; digit sum 24 ≡ 9039 (mod 15). -/
theorem enumeration_hex4_234f : reassembles 9039 = true ∧ castsFifteens 9039 = true := by decide

/-- 2350: nibbles fold back to 9040; digit sum 10 ≡ 9040 (mod 15). -/
theorem enumeration_hex4_2350 : reassembles 9040 = true ∧ castsFifteens 9040 = true := by decide

/-- 2351: nibbles fold back to 9041; digit sum 11 ≡ 9041 (mod 15). -/
theorem enumeration_hex4_2351 : reassembles 9041 = true ∧ castsFifteens 9041 = true := by decide

/-- 2352: nibbles fold back to 9042; digit sum 12 ≡ 9042 (mod 15). -/
theorem enumeration_hex4_2352 : reassembles 9042 = true ∧ castsFifteens 9042 = true := by decide

/-- 2353: nibbles fold back to 9043; digit sum 13 ≡ 9043 (mod 15). -/
theorem enumeration_hex4_2353 : reassembles 9043 = true ∧ castsFifteens 9043 = true := by decide

/-- 2354: nibbles fold back to 9044; digit sum 14 ≡ 9044 (mod 15). -/
theorem enumeration_hex4_2354 : reassembles 9044 = true ∧ castsFifteens 9044 = true := by decide

/-- 2355: nibbles fold back to 9045; digit sum 15 ≡ 9045 (mod 15). -/
theorem enumeration_hex4_2355 : reassembles 9045 = true ∧ castsFifteens 9045 = true := by decide

/-- 2356: nibbles fold back to 9046; digit sum 16 ≡ 9046 (mod 15). -/
theorem enumeration_hex4_2356 : reassembles 9046 = true ∧ castsFifteens 9046 = true := by decide

/-- 2357: nibbles fold back to 9047; digit sum 17 ≡ 9047 (mod 15). -/
theorem enumeration_hex4_2357 : reassembles 9047 = true ∧ castsFifteens 9047 = true := by decide

/-- 2358: nibbles fold back to 9048; digit sum 18 ≡ 9048 (mod 15). -/
theorem enumeration_hex4_2358 : reassembles 9048 = true ∧ castsFifteens 9048 = true := by decide

/-- 2359: nibbles fold back to 9049; digit sum 19 ≡ 9049 (mod 15). -/
theorem enumeration_hex4_2359 : reassembles 9049 = true ∧ castsFifteens 9049 = true := by decide

/-- 235a: nibbles fold back to 9050; digit sum 20 ≡ 9050 (mod 15). -/
theorem enumeration_hex4_235a : reassembles 9050 = true ∧ castsFifteens 9050 = true := by decide

/-- 235b: nibbles fold back to 9051; digit sum 21 ≡ 9051 (mod 15). -/
theorem enumeration_hex4_235b : reassembles 9051 = true ∧ castsFifteens 9051 = true := by decide

/-- 235c: nibbles fold back to 9052; digit sum 22 ≡ 9052 (mod 15). -/
theorem enumeration_hex4_235c : reassembles 9052 = true ∧ castsFifteens 9052 = true := by decide

/-- 235d: nibbles fold back to 9053; digit sum 23 ≡ 9053 (mod 15). -/
theorem enumeration_hex4_235d : reassembles 9053 = true ∧ castsFifteens 9053 = true := by decide

/-- 235e: nibbles fold back to 9054; digit sum 24 ≡ 9054 (mod 15). -/
theorem enumeration_hex4_235e : reassembles 9054 = true ∧ castsFifteens 9054 = true := by decide

/-- 235f: nibbles fold back to 9055; digit sum 25 ≡ 9055 (mod 15). -/
theorem enumeration_hex4_235f : reassembles 9055 = true ∧ castsFifteens 9055 = true := by decide

/-- 2360: nibbles fold back to 9056; digit sum 11 ≡ 9056 (mod 15). -/
theorem enumeration_hex4_2360 : reassembles 9056 = true ∧ castsFifteens 9056 = true := by decide

/-- 2361: nibbles fold back to 9057; digit sum 12 ≡ 9057 (mod 15). -/
theorem enumeration_hex4_2361 : reassembles 9057 = true ∧ castsFifteens 9057 = true := by decide

/-- 2362: nibbles fold back to 9058; digit sum 13 ≡ 9058 (mod 15). -/
theorem enumeration_hex4_2362 : reassembles 9058 = true ∧ castsFifteens 9058 = true := by decide

/-- 2363: nibbles fold back to 9059; digit sum 14 ≡ 9059 (mod 15). -/
theorem enumeration_hex4_2363 : reassembles 9059 = true ∧ castsFifteens 9059 = true := by decide

/-- 2364: nibbles fold back to 9060; digit sum 15 ≡ 9060 (mod 15). -/
theorem enumeration_hex4_2364 : reassembles 9060 = true ∧ castsFifteens 9060 = true := by decide

/-- 2365: nibbles fold back to 9061; digit sum 16 ≡ 9061 (mod 15). -/
theorem enumeration_hex4_2365 : reassembles 9061 = true ∧ castsFifteens 9061 = true := by decide

/-- 2366: nibbles fold back to 9062; digit sum 17 ≡ 9062 (mod 15). -/
theorem enumeration_hex4_2366 : reassembles 9062 = true ∧ castsFifteens 9062 = true := by decide

/-- 2367: nibbles fold back to 9063; digit sum 18 ≡ 9063 (mod 15). -/
theorem enumeration_hex4_2367 : reassembles 9063 = true ∧ castsFifteens 9063 = true := by decide

/-- 2368: nibbles fold back to 9064; digit sum 19 ≡ 9064 (mod 15). -/
theorem enumeration_hex4_2368 : reassembles 9064 = true ∧ castsFifteens 9064 = true := by decide

/-- 2369: nibbles fold back to 9065; digit sum 20 ≡ 9065 (mod 15). -/
theorem enumeration_hex4_2369 : reassembles 9065 = true ∧ castsFifteens 9065 = true := by decide

/-- 236a: nibbles fold back to 9066; digit sum 21 ≡ 9066 (mod 15). -/
theorem enumeration_hex4_236a : reassembles 9066 = true ∧ castsFifteens 9066 = true := by decide

/-- 236b: nibbles fold back to 9067; digit sum 22 ≡ 9067 (mod 15). -/
theorem enumeration_hex4_236b : reassembles 9067 = true ∧ castsFifteens 9067 = true := by decide

/-- 236c: nibbles fold back to 9068; digit sum 23 ≡ 9068 (mod 15). -/
theorem enumeration_hex4_236c : reassembles 9068 = true ∧ castsFifteens 9068 = true := by decide

/-- 236d: nibbles fold back to 9069; digit sum 24 ≡ 9069 (mod 15). -/
theorem enumeration_hex4_236d : reassembles 9069 = true ∧ castsFifteens 9069 = true := by decide

/-- 236e: nibbles fold back to 9070; digit sum 25 ≡ 9070 (mod 15). -/
theorem enumeration_hex4_236e : reassembles 9070 = true ∧ castsFifteens 9070 = true := by decide

/-- 236f: nibbles fold back to 9071; digit sum 26 ≡ 9071 (mod 15). -/
theorem enumeration_hex4_236f : reassembles 9071 = true ∧ castsFifteens 9071 = true := by decide

/-- 2370: nibbles fold back to 9072; digit sum 12 ≡ 9072 (mod 15). -/
theorem enumeration_hex4_2370 : reassembles 9072 = true ∧ castsFifteens 9072 = true := by decide

/-- 2371: nibbles fold back to 9073; digit sum 13 ≡ 9073 (mod 15). -/
theorem enumeration_hex4_2371 : reassembles 9073 = true ∧ castsFifteens 9073 = true := by decide

/-- 2372: nibbles fold back to 9074; digit sum 14 ≡ 9074 (mod 15). -/
theorem enumeration_hex4_2372 : reassembles 9074 = true ∧ castsFifteens 9074 = true := by decide

/-- 2373: nibbles fold back to 9075; digit sum 15 ≡ 9075 (mod 15). -/
theorem enumeration_hex4_2373 : reassembles 9075 = true ∧ castsFifteens 9075 = true := by decide

/-- 2374: nibbles fold back to 9076; digit sum 16 ≡ 9076 (mod 15). -/
theorem enumeration_hex4_2374 : reassembles 9076 = true ∧ castsFifteens 9076 = true := by decide

/-- 2375: nibbles fold back to 9077; digit sum 17 ≡ 9077 (mod 15). -/
theorem enumeration_hex4_2375 : reassembles 9077 = true ∧ castsFifteens 9077 = true := by decide

/-- 2376: nibbles fold back to 9078; digit sum 18 ≡ 9078 (mod 15). -/
theorem enumeration_hex4_2376 : reassembles 9078 = true ∧ castsFifteens 9078 = true := by decide

/-- 2377: nibbles fold back to 9079; digit sum 19 ≡ 9079 (mod 15). -/
theorem enumeration_hex4_2377 : reassembles 9079 = true ∧ castsFifteens 9079 = true := by decide

/-- 2378: nibbles fold back to 9080; digit sum 20 ≡ 9080 (mod 15). -/
theorem enumeration_hex4_2378 : reassembles 9080 = true ∧ castsFifteens 9080 = true := by decide

/-- 2379: nibbles fold back to 9081; digit sum 21 ≡ 9081 (mod 15). -/
theorem enumeration_hex4_2379 : reassembles 9081 = true ∧ castsFifteens 9081 = true := by decide

/-- 237a: nibbles fold back to 9082; digit sum 22 ≡ 9082 (mod 15). -/
theorem enumeration_hex4_237a : reassembles 9082 = true ∧ castsFifteens 9082 = true := by decide

/-- 237b: nibbles fold back to 9083; digit sum 23 ≡ 9083 (mod 15). -/
theorem enumeration_hex4_237b : reassembles 9083 = true ∧ castsFifteens 9083 = true := by decide

/-- 237c: nibbles fold back to 9084; digit sum 24 ≡ 9084 (mod 15). -/
theorem enumeration_hex4_237c : reassembles 9084 = true ∧ castsFifteens 9084 = true := by decide

/-- 237d: nibbles fold back to 9085; digit sum 25 ≡ 9085 (mod 15). -/
theorem enumeration_hex4_237d : reassembles 9085 = true ∧ castsFifteens 9085 = true := by decide

/-- 237e: nibbles fold back to 9086; digit sum 26 ≡ 9086 (mod 15). -/
theorem enumeration_hex4_237e : reassembles 9086 = true ∧ castsFifteens 9086 = true := by decide

/-- 237f: nibbles fold back to 9087; digit sum 27 ≡ 9087 (mod 15). -/
theorem enumeration_hex4_237f : reassembles 9087 = true ∧ castsFifteens 9087 = true := by decide

/-- 2380: nibbles fold back to 9088; digit sum 13 ≡ 9088 (mod 15). -/
theorem enumeration_hex4_2380 : reassembles 9088 = true ∧ castsFifteens 9088 = true := by decide

/-- 2381: nibbles fold back to 9089; digit sum 14 ≡ 9089 (mod 15). -/
theorem enumeration_hex4_2381 : reassembles 9089 = true ∧ castsFifteens 9089 = true := by decide

/-- 2382: nibbles fold back to 9090; digit sum 15 ≡ 9090 (mod 15). -/
theorem enumeration_hex4_2382 : reassembles 9090 = true ∧ castsFifteens 9090 = true := by decide

/-- 2383: nibbles fold back to 9091; digit sum 16 ≡ 9091 (mod 15). -/
theorem enumeration_hex4_2383 : reassembles 9091 = true ∧ castsFifteens 9091 = true := by decide

/-- 2384: nibbles fold back to 9092; digit sum 17 ≡ 9092 (mod 15). -/
theorem enumeration_hex4_2384 : reassembles 9092 = true ∧ castsFifteens 9092 = true := by decide

/-- 2385: nibbles fold back to 9093; digit sum 18 ≡ 9093 (mod 15). -/
theorem enumeration_hex4_2385 : reassembles 9093 = true ∧ castsFifteens 9093 = true := by decide

/-- 2386: nibbles fold back to 9094; digit sum 19 ≡ 9094 (mod 15). -/
theorem enumeration_hex4_2386 : reassembles 9094 = true ∧ castsFifteens 9094 = true := by decide

/-- 2387: nibbles fold back to 9095; digit sum 20 ≡ 9095 (mod 15). -/
theorem enumeration_hex4_2387 : reassembles 9095 = true ∧ castsFifteens 9095 = true := by decide

/-- 2388: nibbles fold back to 9096; digit sum 21 ≡ 9096 (mod 15). -/
theorem enumeration_hex4_2388 : reassembles 9096 = true ∧ castsFifteens 9096 = true := by decide

/-- 2389: nibbles fold back to 9097; digit sum 22 ≡ 9097 (mod 15). -/
theorem enumeration_hex4_2389 : reassembles 9097 = true ∧ castsFifteens 9097 = true := by decide

/-- 238a: nibbles fold back to 9098; digit sum 23 ≡ 9098 (mod 15). -/
theorem enumeration_hex4_238a : reassembles 9098 = true ∧ castsFifteens 9098 = true := by decide

/-- 238b: nibbles fold back to 9099; digit sum 24 ≡ 9099 (mod 15). -/
theorem enumeration_hex4_238b : reassembles 9099 = true ∧ castsFifteens 9099 = true := by decide

/-- 238c: nibbles fold back to 9100; digit sum 25 ≡ 9100 (mod 15). -/
theorem enumeration_hex4_238c : reassembles 9100 = true ∧ castsFifteens 9100 = true := by decide

/-- 238d: nibbles fold back to 9101; digit sum 26 ≡ 9101 (mod 15). -/
theorem enumeration_hex4_238d : reassembles 9101 = true ∧ castsFifteens 9101 = true := by decide

/-- 238e: nibbles fold back to 9102; digit sum 27 ≡ 9102 (mod 15). -/
theorem enumeration_hex4_238e : reassembles 9102 = true ∧ castsFifteens 9102 = true := by decide

/-- 238f: nibbles fold back to 9103; digit sum 28 ≡ 9103 (mod 15). -/
theorem enumeration_hex4_238f : reassembles 9103 = true ∧ castsFifteens 9103 = true := by decide

/-- 2390: nibbles fold back to 9104; digit sum 14 ≡ 9104 (mod 15). -/
theorem enumeration_hex4_2390 : reassembles 9104 = true ∧ castsFifteens 9104 = true := by decide

/-- 2391: nibbles fold back to 9105; digit sum 15 ≡ 9105 (mod 15). -/
theorem enumeration_hex4_2391 : reassembles 9105 = true ∧ castsFifteens 9105 = true := by decide

/-- 2392: nibbles fold back to 9106; digit sum 16 ≡ 9106 (mod 15). -/
theorem enumeration_hex4_2392 : reassembles 9106 = true ∧ castsFifteens 9106 = true := by decide

/-- 2393: nibbles fold back to 9107; digit sum 17 ≡ 9107 (mod 15). -/
theorem enumeration_hex4_2393 : reassembles 9107 = true ∧ castsFifteens 9107 = true := by decide

/-- 2394: nibbles fold back to 9108; digit sum 18 ≡ 9108 (mod 15). -/
theorem enumeration_hex4_2394 : reassembles 9108 = true ∧ castsFifteens 9108 = true := by decide

/-- 2395: nibbles fold back to 9109; digit sum 19 ≡ 9109 (mod 15). -/
theorem enumeration_hex4_2395 : reassembles 9109 = true ∧ castsFifteens 9109 = true := by decide

/-- 2396: nibbles fold back to 9110; digit sum 20 ≡ 9110 (mod 15). -/
theorem enumeration_hex4_2396 : reassembles 9110 = true ∧ castsFifteens 9110 = true := by decide

/-- 2397: nibbles fold back to 9111; digit sum 21 ≡ 9111 (mod 15). -/
theorem enumeration_hex4_2397 : reassembles 9111 = true ∧ castsFifteens 9111 = true := by decide

/-- 2398: nibbles fold back to 9112; digit sum 22 ≡ 9112 (mod 15). -/
theorem enumeration_hex4_2398 : reassembles 9112 = true ∧ castsFifteens 9112 = true := by decide

/-- 2399: nibbles fold back to 9113; digit sum 23 ≡ 9113 (mod 15). -/
theorem enumeration_hex4_2399 : reassembles 9113 = true ∧ castsFifteens 9113 = true := by decide

/-- 239a: nibbles fold back to 9114; digit sum 24 ≡ 9114 (mod 15). -/
theorem enumeration_hex4_239a : reassembles 9114 = true ∧ castsFifteens 9114 = true := by decide

/-- 239b: nibbles fold back to 9115; digit sum 25 ≡ 9115 (mod 15). -/
theorem enumeration_hex4_239b : reassembles 9115 = true ∧ castsFifteens 9115 = true := by decide

/-- 239c: nibbles fold back to 9116; digit sum 26 ≡ 9116 (mod 15). -/
theorem enumeration_hex4_239c : reassembles 9116 = true ∧ castsFifteens 9116 = true := by decide

/-- 239d: nibbles fold back to 9117; digit sum 27 ≡ 9117 (mod 15). -/
theorem enumeration_hex4_239d : reassembles 9117 = true ∧ castsFifteens 9117 = true := by decide

/-- 239e: nibbles fold back to 9118; digit sum 28 ≡ 9118 (mod 15). -/
theorem enumeration_hex4_239e : reassembles 9118 = true ∧ castsFifteens 9118 = true := by decide

/-- 239f: nibbles fold back to 9119; digit sum 29 ≡ 9119 (mod 15). -/
theorem enumeration_hex4_239f : reassembles 9119 = true ∧ castsFifteens 9119 = true := by decide

/-- 23a0: nibbles fold back to 9120; digit sum 15 ≡ 9120 (mod 15). -/
theorem enumeration_hex4_23a0 : reassembles 9120 = true ∧ castsFifteens 9120 = true := by decide

/-- 23a1: nibbles fold back to 9121; digit sum 16 ≡ 9121 (mod 15). -/
theorem enumeration_hex4_23a1 : reassembles 9121 = true ∧ castsFifteens 9121 = true := by decide

/-- 23a2: nibbles fold back to 9122; digit sum 17 ≡ 9122 (mod 15). -/
theorem enumeration_hex4_23a2 : reassembles 9122 = true ∧ castsFifteens 9122 = true := by decide

/-- 23a3: nibbles fold back to 9123; digit sum 18 ≡ 9123 (mod 15). -/
theorem enumeration_hex4_23a3 : reassembles 9123 = true ∧ castsFifteens 9123 = true := by decide

/-- 23a4: nibbles fold back to 9124; digit sum 19 ≡ 9124 (mod 15). -/
theorem enumeration_hex4_23a4 : reassembles 9124 = true ∧ castsFifteens 9124 = true := by decide

/-- 23a5: nibbles fold back to 9125; digit sum 20 ≡ 9125 (mod 15). -/
theorem enumeration_hex4_23a5 : reassembles 9125 = true ∧ castsFifteens 9125 = true := by decide

/-- 23a6: nibbles fold back to 9126; digit sum 21 ≡ 9126 (mod 15). -/
theorem enumeration_hex4_23a6 : reassembles 9126 = true ∧ castsFifteens 9126 = true := by decide

/-- 23a7: nibbles fold back to 9127; digit sum 22 ≡ 9127 (mod 15). -/
theorem enumeration_hex4_23a7 : reassembles 9127 = true ∧ castsFifteens 9127 = true := by decide

/-- 23a8: nibbles fold back to 9128; digit sum 23 ≡ 9128 (mod 15). -/
theorem enumeration_hex4_23a8 : reassembles 9128 = true ∧ castsFifteens 9128 = true := by decide

/-- 23a9: nibbles fold back to 9129; digit sum 24 ≡ 9129 (mod 15). -/
theorem enumeration_hex4_23a9 : reassembles 9129 = true ∧ castsFifteens 9129 = true := by decide

/-- 23aa: nibbles fold back to 9130; digit sum 25 ≡ 9130 (mod 15). -/
theorem enumeration_hex4_23aa : reassembles 9130 = true ∧ castsFifteens 9130 = true := by decide

/-- 23ab: nibbles fold back to 9131; digit sum 26 ≡ 9131 (mod 15). -/
theorem enumeration_hex4_23ab : reassembles 9131 = true ∧ castsFifteens 9131 = true := by decide

/-- 23ac: nibbles fold back to 9132; digit sum 27 ≡ 9132 (mod 15). -/
theorem enumeration_hex4_23ac : reassembles 9132 = true ∧ castsFifteens 9132 = true := by decide

/-- 23ad: nibbles fold back to 9133; digit sum 28 ≡ 9133 (mod 15). -/
theorem enumeration_hex4_23ad : reassembles 9133 = true ∧ castsFifteens 9133 = true := by decide

/-- 23ae: nibbles fold back to 9134; digit sum 29 ≡ 9134 (mod 15). -/
theorem enumeration_hex4_23ae : reassembles 9134 = true ∧ castsFifteens 9134 = true := by decide

/-- 23af: nibbles fold back to 9135; digit sum 30 ≡ 9135 (mod 15). -/
theorem enumeration_hex4_23af : reassembles 9135 = true ∧ castsFifteens 9135 = true := by decide

/-- 23b0: nibbles fold back to 9136; digit sum 16 ≡ 9136 (mod 15). -/
theorem enumeration_hex4_23b0 : reassembles 9136 = true ∧ castsFifteens 9136 = true := by decide

/-- 23b1: nibbles fold back to 9137; digit sum 17 ≡ 9137 (mod 15). -/
theorem enumeration_hex4_23b1 : reassembles 9137 = true ∧ castsFifteens 9137 = true := by decide

/-- 23b2: nibbles fold back to 9138; digit sum 18 ≡ 9138 (mod 15). -/
theorem enumeration_hex4_23b2 : reassembles 9138 = true ∧ castsFifteens 9138 = true := by decide

/-- 23b3: nibbles fold back to 9139; digit sum 19 ≡ 9139 (mod 15). -/
theorem enumeration_hex4_23b3 : reassembles 9139 = true ∧ castsFifteens 9139 = true := by decide

/-- 23b4: nibbles fold back to 9140; digit sum 20 ≡ 9140 (mod 15). -/
theorem enumeration_hex4_23b4 : reassembles 9140 = true ∧ castsFifteens 9140 = true := by decide

/-- 23b5: nibbles fold back to 9141; digit sum 21 ≡ 9141 (mod 15). -/
theorem enumeration_hex4_23b5 : reassembles 9141 = true ∧ castsFifteens 9141 = true := by decide

/-- 23b6: nibbles fold back to 9142; digit sum 22 ≡ 9142 (mod 15). -/
theorem enumeration_hex4_23b6 : reassembles 9142 = true ∧ castsFifteens 9142 = true := by decide

/-- 23b7: nibbles fold back to 9143; digit sum 23 ≡ 9143 (mod 15). -/
theorem enumeration_hex4_23b7 : reassembles 9143 = true ∧ castsFifteens 9143 = true := by decide

/-- 23b8: nibbles fold back to 9144; digit sum 24 ≡ 9144 (mod 15). -/
theorem enumeration_hex4_23b8 : reassembles 9144 = true ∧ castsFifteens 9144 = true := by decide

/-- 23b9: nibbles fold back to 9145; digit sum 25 ≡ 9145 (mod 15). -/
theorem enumeration_hex4_23b9 : reassembles 9145 = true ∧ castsFifteens 9145 = true := by decide

/-- 23ba: nibbles fold back to 9146; digit sum 26 ≡ 9146 (mod 15). -/
theorem enumeration_hex4_23ba : reassembles 9146 = true ∧ castsFifteens 9146 = true := by decide

/-- 23bb: nibbles fold back to 9147; digit sum 27 ≡ 9147 (mod 15). -/
theorem enumeration_hex4_23bb : reassembles 9147 = true ∧ castsFifteens 9147 = true := by decide

/-- 23bc: nibbles fold back to 9148; digit sum 28 ≡ 9148 (mod 15). -/
theorem enumeration_hex4_23bc : reassembles 9148 = true ∧ castsFifteens 9148 = true := by decide

/-- 23bd: nibbles fold back to 9149; digit sum 29 ≡ 9149 (mod 15). -/
theorem enumeration_hex4_23bd : reassembles 9149 = true ∧ castsFifteens 9149 = true := by decide

/-- 23be: nibbles fold back to 9150; digit sum 30 ≡ 9150 (mod 15). -/
theorem enumeration_hex4_23be : reassembles 9150 = true ∧ castsFifteens 9150 = true := by decide

/-- 23bf: nibbles fold back to 9151; digit sum 31 ≡ 9151 (mod 15). -/
theorem enumeration_hex4_23bf : reassembles 9151 = true ∧ castsFifteens 9151 = true := by decide

/-- 23c0: nibbles fold back to 9152; digit sum 17 ≡ 9152 (mod 15). -/
theorem enumeration_hex4_23c0 : reassembles 9152 = true ∧ castsFifteens 9152 = true := by decide

/-- 23c1: nibbles fold back to 9153; digit sum 18 ≡ 9153 (mod 15). -/
theorem enumeration_hex4_23c1 : reassembles 9153 = true ∧ castsFifteens 9153 = true := by decide

/-- 23c2: nibbles fold back to 9154; digit sum 19 ≡ 9154 (mod 15). -/
theorem enumeration_hex4_23c2 : reassembles 9154 = true ∧ castsFifteens 9154 = true := by decide

/-- 23c3: nibbles fold back to 9155; digit sum 20 ≡ 9155 (mod 15). -/
theorem enumeration_hex4_23c3 : reassembles 9155 = true ∧ castsFifteens 9155 = true := by decide

/-- 23c4: nibbles fold back to 9156; digit sum 21 ≡ 9156 (mod 15). -/
theorem enumeration_hex4_23c4 : reassembles 9156 = true ∧ castsFifteens 9156 = true := by decide

/-- 23c5: nibbles fold back to 9157; digit sum 22 ≡ 9157 (mod 15). -/
theorem enumeration_hex4_23c5 : reassembles 9157 = true ∧ castsFifteens 9157 = true := by decide

/-- 23c6: nibbles fold back to 9158; digit sum 23 ≡ 9158 (mod 15). -/
theorem enumeration_hex4_23c6 : reassembles 9158 = true ∧ castsFifteens 9158 = true := by decide

/-- 23c7: nibbles fold back to 9159; digit sum 24 ≡ 9159 (mod 15). -/
theorem enumeration_hex4_23c7 : reassembles 9159 = true ∧ castsFifteens 9159 = true := by decide

/-- 23c8: nibbles fold back to 9160; digit sum 25 ≡ 9160 (mod 15). -/
theorem enumeration_hex4_23c8 : reassembles 9160 = true ∧ castsFifteens 9160 = true := by decide

/-- 23c9: nibbles fold back to 9161; digit sum 26 ≡ 9161 (mod 15). -/
theorem enumeration_hex4_23c9 : reassembles 9161 = true ∧ castsFifteens 9161 = true := by decide

/-- 23ca: nibbles fold back to 9162; digit sum 27 ≡ 9162 (mod 15). -/
theorem enumeration_hex4_23ca : reassembles 9162 = true ∧ castsFifteens 9162 = true := by decide

/-- 23cb: nibbles fold back to 9163; digit sum 28 ≡ 9163 (mod 15). -/
theorem enumeration_hex4_23cb : reassembles 9163 = true ∧ castsFifteens 9163 = true := by decide

/-- 23cc: nibbles fold back to 9164; digit sum 29 ≡ 9164 (mod 15). -/
theorem enumeration_hex4_23cc : reassembles 9164 = true ∧ castsFifteens 9164 = true := by decide

/-- 23cd: nibbles fold back to 9165; digit sum 30 ≡ 9165 (mod 15). -/
theorem enumeration_hex4_23cd : reassembles 9165 = true ∧ castsFifteens 9165 = true := by decide

/-- 23ce: nibbles fold back to 9166; digit sum 31 ≡ 9166 (mod 15). -/
theorem enumeration_hex4_23ce : reassembles 9166 = true ∧ castsFifteens 9166 = true := by decide

/-- 23cf: nibbles fold back to 9167; digit sum 32 ≡ 9167 (mod 15). -/
theorem enumeration_hex4_23cf : reassembles 9167 = true ∧ castsFifteens 9167 = true := by decide

/-- 23d0: nibbles fold back to 9168; digit sum 18 ≡ 9168 (mod 15). -/
theorem enumeration_hex4_23d0 : reassembles 9168 = true ∧ castsFifteens 9168 = true := by decide

/-- 23d1: nibbles fold back to 9169; digit sum 19 ≡ 9169 (mod 15). -/
theorem enumeration_hex4_23d1 : reassembles 9169 = true ∧ castsFifteens 9169 = true := by decide

/-- 23d2: nibbles fold back to 9170; digit sum 20 ≡ 9170 (mod 15). -/
theorem enumeration_hex4_23d2 : reassembles 9170 = true ∧ castsFifteens 9170 = true := by decide

/-- 23d3: nibbles fold back to 9171; digit sum 21 ≡ 9171 (mod 15). -/
theorem enumeration_hex4_23d3 : reassembles 9171 = true ∧ castsFifteens 9171 = true := by decide

/-- 23d4: nibbles fold back to 9172; digit sum 22 ≡ 9172 (mod 15). -/
theorem enumeration_hex4_23d4 : reassembles 9172 = true ∧ castsFifteens 9172 = true := by decide

/-- 23d5: nibbles fold back to 9173; digit sum 23 ≡ 9173 (mod 15). -/
theorem enumeration_hex4_23d5 : reassembles 9173 = true ∧ castsFifteens 9173 = true := by decide

/-- 23d6: nibbles fold back to 9174; digit sum 24 ≡ 9174 (mod 15). -/
theorem enumeration_hex4_23d6 : reassembles 9174 = true ∧ castsFifteens 9174 = true := by decide

/-- 23d7: nibbles fold back to 9175; digit sum 25 ≡ 9175 (mod 15). -/
theorem enumeration_hex4_23d7 : reassembles 9175 = true ∧ castsFifteens 9175 = true := by decide

/-- 23d8: nibbles fold back to 9176; digit sum 26 ≡ 9176 (mod 15). -/
theorem enumeration_hex4_23d8 : reassembles 9176 = true ∧ castsFifteens 9176 = true := by decide

/-- 23d9: nibbles fold back to 9177; digit sum 27 ≡ 9177 (mod 15). -/
theorem enumeration_hex4_23d9 : reassembles 9177 = true ∧ castsFifteens 9177 = true := by decide

/-- 23da: nibbles fold back to 9178; digit sum 28 ≡ 9178 (mod 15). -/
theorem enumeration_hex4_23da : reassembles 9178 = true ∧ castsFifteens 9178 = true := by decide

/-- 23db: nibbles fold back to 9179; digit sum 29 ≡ 9179 (mod 15). -/
theorem enumeration_hex4_23db : reassembles 9179 = true ∧ castsFifteens 9179 = true := by decide

/-- 23dc: nibbles fold back to 9180; digit sum 30 ≡ 9180 (mod 15). -/
theorem enumeration_hex4_23dc : reassembles 9180 = true ∧ castsFifteens 9180 = true := by decide

/-- 23dd: nibbles fold back to 9181; digit sum 31 ≡ 9181 (mod 15). -/
theorem enumeration_hex4_23dd : reassembles 9181 = true ∧ castsFifteens 9181 = true := by decide

/-- 23de: nibbles fold back to 9182; digit sum 32 ≡ 9182 (mod 15). -/
theorem enumeration_hex4_23de : reassembles 9182 = true ∧ castsFifteens 9182 = true := by decide

/-- 23df: nibbles fold back to 9183; digit sum 33 ≡ 9183 (mod 15). -/
theorem enumeration_hex4_23df : reassembles 9183 = true ∧ castsFifteens 9183 = true := by decide

/-- 23e0: nibbles fold back to 9184; digit sum 19 ≡ 9184 (mod 15). -/
theorem enumeration_hex4_23e0 : reassembles 9184 = true ∧ castsFifteens 9184 = true := by decide

/-- 23e1: nibbles fold back to 9185; digit sum 20 ≡ 9185 (mod 15). -/
theorem enumeration_hex4_23e1 : reassembles 9185 = true ∧ castsFifteens 9185 = true := by decide

/-- 23e2: nibbles fold back to 9186; digit sum 21 ≡ 9186 (mod 15). -/
theorem enumeration_hex4_23e2 : reassembles 9186 = true ∧ castsFifteens 9186 = true := by decide

/-- 23e3: nibbles fold back to 9187; digit sum 22 ≡ 9187 (mod 15). -/
theorem enumeration_hex4_23e3 : reassembles 9187 = true ∧ castsFifteens 9187 = true := by decide

/-- 23e4: nibbles fold back to 9188; digit sum 23 ≡ 9188 (mod 15). -/
theorem enumeration_hex4_23e4 : reassembles 9188 = true ∧ castsFifteens 9188 = true := by decide

/-- 23e5: nibbles fold back to 9189; digit sum 24 ≡ 9189 (mod 15). -/
theorem enumeration_hex4_23e5 : reassembles 9189 = true ∧ castsFifteens 9189 = true := by decide

/-- 23e6: nibbles fold back to 9190; digit sum 25 ≡ 9190 (mod 15). -/
theorem enumeration_hex4_23e6 : reassembles 9190 = true ∧ castsFifteens 9190 = true := by decide

/-- 23e7: nibbles fold back to 9191; digit sum 26 ≡ 9191 (mod 15). -/
theorem enumeration_hex4_23e7 : reassembles 9191 = true ∧ castsFifteens 9191 = true := by decide

/-- 23e8: nibbles fold back to 9192; digit sum 27 ≡ 9192 (mod 15). -/
theorem enumeration_hex4_23e8 : reassembles 9192 = true ∧ castsFifteens 9192 = true := by decide

/-- 23e9: nibbles fold back to 9193; digit sum 28 ≡ 9193 (mod 15). -/
theorem enumeration_hex4_23e9 : reassembles 9193 = true ∧ castsFifteens 9193 = true := by decide

/-- 23ea: nibbles fold back to 9194; digit sum 29 ≡ 9194 (mod 15). -/
theorem enumeration_hex4_23ea : reassembles 9194 = true ∧ castsFifteens 9194 = true := by decide

/-- 23eb: nibbles fold back to 9195; digit sum 30 ≡ 9195 (mod 15). -/
theorem enumeration_hex4_23eb : reassembles 9195 = true ∧ castsFifteens 9195 = true := by decide

/-- 23ec: nibbles fold back to 9196; digit sum 31 ≡ 9196 (mod 15). -/
theorem enumeration_hex4_23ec : reassembles 9196 = true ∧ castsFifteens 9196 = true := by decide

/-- 23ed: nibbles fold back to 9197; digit sum 32 ≡ 9197 (mod 15). -/
theorem enumeration_hex4_23ed : reassembles 9197 = true ∧ castsFifteens 9197 = true := by decide

/-- 23ee: nibbles fold back to 9198; digit sum 33 ≡ 9198 (mod 15). -/
theorem enumeration_hex4_23ee : reassembles 9198 = true ∧ castsFifteens 9198 = true := by decide

/-- 23ef: nibbles fold back to 9199; digit sum 34 ≡ 9199 (mod 15). -/
theorem enumeration_hex4_23ef : reassembles 9199 = true ∧ castsFifteens 9199 = true := by decide

/-- 23f0: nibbles fold back to 9200; digit sum 20 ≡ 9200 (mod 15). -/
theorem enumeration_hex4_23f0 : reassembles 9200 = true ∧ castsFifteens 9200 = true := by decide

/-- 23f1: nibbles fold back to 9201; digit sum 21 ≡ 9201 (mod 15). -/
theorem enumeration_hex4_23f1 : reassembles 9201 = true ∧ castsFifteens 9201 = true := by decide

/-- 23f2: nibbles fold back to 9202; digit sum 22 ≡ 9202 (mod 15). -/
theorem enumeration_hex4_23f2 : reassembles 9202 = true ∧ castsFifteens 9202 = true := by decide

/-- 23f3: nibbles fold back to 9203; digit sum 23 ≡ 9203 (mod 15). -/
theorem enumeration_hex4_23f3 : reassembles 9203 = true ∧ castsFifteens 9203 = true := by decide

/-- 23f4: nibbles fold back to 9204; digit sum 24 ≡ 9204 (mod 15). -/
theorem enumeration_hex4_23f4 : reassembles 9204 = true ∧ castsFifteens 9204 = true := by decide

/-- 23f5: nibbles fold back to 9205; digit sum 25 ≡ 9205 (mod 15). -/
theorem enumeration_hex4_23f5 : reassembles 9205 = true ∧ castsFifteens 9205 = true := by decide

/-- 23f6: nibbles fold back to 9206; digit sum 26 ≡ 9206 (mod 15). -/
theorem enumeration_hex4_23f6 : reassembles 9206 = true ∧ castsFifteens 9206 = true := by decide

/-- 23f7: nibbles fold back to 9207; digit sum 27 ≡ 9207 (mod 15). -/
theorem enumeration_hex4_23f7 : reassembles 9207 = true ∧ castsFifteens 9207 = true := by decide

/-- 23f8: nibbles fold back to 9208; digit sum 28 ≡ 9208 (mod 15). -/
theorem enumeration_hex4_23f8 : reassembles 9208 = true ∧ castsFifteens 9208 = true := by decide

/-- 23f9: nibbles fold back to 9209; digit sum 29 ≡ 9209 (mod 15). -/
theorem enumeration_hex4_23f9 : reassembles 9209 = true ∧ castsFifteens 9209 = true := by decide

/-- 23fa: nibbles fold back to 9210; digit sum 30 ≡ 9210 (mod 15). -/
theorem enumeration_hex4_23fa : reassembles 9210 = true ∧ castsFifteens 9210 = true := by decide

/-- 23fb: nibbles fold back to 9211; digit sum 31 ≡ 9211 (mod 15). -/
theorem enumeration_hex4_23fb : reassembles 9211 = true ∧ castsFifteens 9211 = true := by decide

/-- 23fc: nibbles fold back to 9212; digit sum 32 ≡ 9212 (mod 15). -/
theorem enumeration_hex4_23fc : reassembles 9212 = true ∧ castsFifteens 9212 = true := by decide

/-- 23fd: nibbles fold back to 9213; digit sum 33 ≡ 9213 (mod 15). -/
theorem enumeration_hex4_23fd : reassembles 9213 = true ∧ castsFifteens 9213 = true := by decide

/-- 23fe: nibbles fold back to 9214; digit sum 34 ≡ 9214 (mod 15). -/
theorem enumeration_hex4_23fe : reassembles 9214 = true ∧ castsFifteens 9214 = true := by decide

/-- 23ff: nibbles fold back to 9215; digit sum 35 ≡ 9215 (mod 15). -/
theorem enumeration_hex4_23ff : reassembles 9215 = true ∧ castsFifteens 9215 = true := by decide

/-- 2400: nibbles fold back to 9216; digit sum 6 ≡ 9216 (mod 15). -/
theorem enumeration_hex4_2400 : reassembles 9216 = true ∧ castsFifteens 9216 = true := by decide

/-- 2401: nibbles fold back to 9217; digit sum 7 ≡ 9217 (mod 15). -/
theorem enumeration_hex4_2401 : reassembles 9217 = true ∧ castsFifteens 9217 = true := by decide

/-- 2402: nibbles fold back to 9218; digit sum 8 ≡ 9218 (mod 15). -/
theorem enumeration_hex4_2402 : reassembles 9218 = true ∧ castsFifteens 9218 = true := by decide

/-- 2403: nibbles fold back to 9219; digit sum 9 ≡ 9219 (mod 15). -/
theorem enumeration_hex4_2403 : reassembles 9219 = true ∧ castsFifteens 9219 = true := by decide

/-- 2404: nibbles fold back to 9220; digit sum 10 ≡ 9220 (mod 15). -/
theorem enumeration_hex4_2404 : reassembles 9220 = true ∧ castsFifteens 9220 = true := by decide

/-- 2405: nibbles fold back to 9221; digit sum 11 ≡ 9221 (mod 15). -/
theorem enumeration_hex4_2405 : reassembles 9221 = true ∧ castsFifteens 9221 = true := by decide

/-- 2406: nibbles fold back to 9222; digit sum 12 ≡ 9222 (mod 15). -/
theorem enumeration_hex4_2406 : reassembles 9222 = true ∧ castsFifteens 9222 = true := by decide

/-- 2407: nibbles fold back to 9223; digit sum 13 ≡ 9223 (mod 15). -/
theorem enumeration_hex4_2407 : reassembles 9223 = true ∧ castsFifteens 9223 = true := by decide

/-- 2408: nibbles fold back to 9224; digit sum 14 ≡ 9224 (mod 15). -/
theorem enumeration_hex4_2408 : reassembles 9224 = true ∧ castsFifteens 9224 = true := by decide

/-- 2409: nibbles fold back to 9225; digit sum 15 ≡ 9225 (mod 15). -/
theorem enumeration_hex4_2409 : reassembles 9225 = true ∧ castsFifteens 9225 = true := by decide

/-- 240a: nibbles fold back to 9226; digit sum 16 ≡ 9226 (mod 15). -/
theorem enumeration_hex4_240a : reassembles 9226 = true ∧ castsFifteens 9226 = true := by decide

/-- 240b: nibbles fold back to 9227; digit sum 17 ≡ 9227 (mod 15). -/
theorem enumeration_hex4_240b : reassembles 9227 = true ∧ castsFifteens 9227 = true := by decide

/-- 240c: nibbles fold back to 9228; digit sum 18 ≡ 9228 (mod 15). -/
theorem enumeration_hex4_240c : reassembles 9228 = true ∧ castsFifteens 9228 = true := by decide

/-- 240d: nibbles fold back to 9229; digit sum 19 ≡ 9229 (mod 15). -/
theorem enumeration_hex4_240d : reassembles 9229 = true ∧ castsFifteens 9229 = true := by decide

/-- 240e: nibbles fold back to 9230; digit sum 20 ≡ 9230 (mod 15). -/
theorem enumeration_hex4_240e : reassembles 9230 = true ∧ castsFifteens 9230 = true := by decide

/-- 240f: nibbles fold back to 9231; digit sum 21 ≡ 9231 (mod 15). -/
theorem enumeration_hex4_240f : reassembles 9231 = true ∧ castsFifteens 9231 = true := by decide

/-- 2410: nibbles fold back to 9232; digit sum 7 ≡ 9232 (mod 15). -/
theorem enumeration_hex4_2410 : reassembles 9232 = true ∧ castsFifteens 9232 = true := by decide

/-- 2411: nibbles fold back to 9233; digit sum 8 ≡ 9233 (mod 15). -/
theorem enumeration_hex4_2411 : reassembles 9233 = true ∧ castsFifteens 9233 = true := by decide

/-- 2412: nibbles fold back to 9234; digit sum 9 ≡ 9234 (mod 15). -/
theorem enumeration_hex4_2412 : reassembles 9234 = true ∧ castsFifteens 9234 = true := by decide

/-- 2413: nibbles fold back to 9235; digit sum 10 ≡ 9235 (mod 15). -/
theorem enumeration_hex4_2413 : reassembles 9235 = true ∧ castsFifteens 9235 = true := by decide

/-- 2414: nibbles fold back to 9236; digit sum 11 ≡ 9236 (mod 15). -/
theorem enumeration_hex4_2414 : reassembles 9236 = true ∧ castsFifteens 9236 = true := by decide

/-- 2415: nibbles fold back to 9237; digit sum 12 ≡ 9237 (mod 15). -/
theorem enumeration_hex4_2415 : reassembles 9237 = true ∧ castsFifteens 9237 = true := by decide

/-- 2416: nibbles fold back to 9238; digit sum 13 ≡ 9238 (mod 15). -/
theorem enumeration_hex4_2416 : reassembles 9238 = true ∧ castsFifteens 9238 = true := by decide

/-- 2417: nibbles fold back to 9239; digit sum 14 ≡ 9239 (mod 15). -/
theorem enumeration_hex4_2417 : reassembles 9239 = true ∧ castsFifteens 9239 = true := by decide

/-- 2418: nibbles fold back to 9240; digit sum 15 ≡ 9240 (mod 15). -/
theorem enumeration_hex4_2418 : reassembles 9240 = true ∧ castsFifteens 9240 = true := by decide

/-- 2419: nibbles fold back to 9241; digit sum 16 ≡ 9241 (mod 15). -/
theorem enumeration_hex4_2419 : reassembles 9241 = true ∧ castsFifteens 9241 = true := by decide

/-- 241a: nibbles fold back to 9242; digit sum 17 ≡ 9242 (mod 15). -/
theorem enumeration_hex4_241a : reassembles 9242 = true ∧ castsFifteens 9242 = true := by decide

/-- 241b: nibbles fold back to 9243; digit sum 18 ≡ 9243 (mod 15). -/
theorem enumeration_hex4_241b : reassembles 9243 = true ∧ castsFifteens 9243 = true := by decide

/-- 241c: nibbles fold back to 9244; digit sum 19 ≡ 9244 (mod 15). -/
theorem enumeration_hex4_241c : reassembles 9244 = true ∧ castsFifteens 9244 = true := by decide

/-- 241d: nibbles fold back to 9245; digit sum 20 ≡ 9245 (mod 15). -/
theorem enumeration_hex4_241d : reassembles 9245 = true ∧ castsFifteens 9245 = true := by decide

/-- 241e: nibbles fold back to 9246; digit sum 21 ≡ 9246 (mod 15). -/
theorem enumeration_hex4_241e : reassembles 9246 = true ∧ castsFifteens 9246 = true := by decide

/-- 241f: nibbles fold back to 9247; digit sum 22 ≡ 9247 (mod 15). -/
theorem enumeration_hex4_241f : reassembles 9247 = true ∧ castsFifteens 9247 = true := by decide

/-- 2420: nibbles fold back to 9248; digit sum 8 ≡ 9248 (mod 15). -/
theorem enumeration_hex4_2420 : reassembles 9248 = true ∧ castsFifteens 9248 = true := by decide

/-- 2421: nibbles fold back to 9249; digit sum 9 ≡ 9249 (mod 15). -/
theorem enumeration_hex4_2421 : reassembles 9249 = true ∧ castsFifteens 9249 = true := by decide

/-- 2422: nibbles fold back to 9250; digit sum 10 ≡ 9250 (mod 15). -/
theorem enumeration_hex4_2422 : reassembles 9250 = true ∧ castsFifteens 9250 = true := by decide

/-- 2423: nibbles fold back to 9251; digit sum 11 ≡ 9251 (mod 15). -/
theorem enumeration_hex4_2423 : reassembles 9251 = true ∧ castsFifteens 9251 = true := by decide

/-- 2424: nibbles fold back to 9252; digit sum 12 ≡ 9252 (mod 15). -/
theorem enumeration_hex4_2424 : reassembles 9252 = true ∧ castsFifteens 9252 = true := by decide

/-- 2425: nibbles fold back to 9253; digit sum 13 ≡ 9253 (mod 15). -/
theorem enumeration_hex4_2425 : reassembles 9253 = true ∧ castsFifteens 9253 = true := by decide

/-- 2426: nibbles fold back to 9254; digit sum 14 ≡ 9254 (mod 15). -/
theorem enumeration_hex4_2426 : reassembles 9254 = true ∧ castsFifteens 9254 = true := by decide

/-- 2427: nibbles fold back to 9255; digit sum 15 ≡ 9255 (mod 15). -/
theorem enumeration_hex4_2427 : reassembles 9255 = true ∧ castsFifteens 9255 = true := by decide

/-- 2428: nibbles fold back to 9256; digit sum 16 ≡ 9256 (mod 15). -/
theorem enumeration_hex4_2428 : reassembles 9256 = true ∧ castsFifteens 9256 = true := by decide

/-- 2429: nibbles fold back to 9257; digit sum 17 ≡ 9257 (mod 15). -/
theorem enumeration_hex4_2429 : reassembles 9257 = true ∧ castsFifteens 9257 = true := by decide

/-- 242a: nibbles fold back to 9258; digit sum 18 ≡ 9258 (mod 15). -/
theorem enumeration_hex4_242a : reassembles 9258 = true ∧ castsFifteens 9258 = true := by decide

/-- 242b: nibbles fold back to 9259; digit sum 19 ≡ 9259 (mod 15). -/
theorem enumeration_hex4_242b : reassembles 9259 = true ∧ castsFifteens 9259 = true := by decide

/-- 242c: nibbles fold back to 9260; digit sum 20 ≡ 9260 (mod 15). -/
theorem enumeration_hex4_242c : reassembles 9260 = true ∧ castsFifteens 9260 = true := by decide

/-- 242d: nibbles fold back to 9261; digit sum 21 ≡ 9261 (mod 15). -/
theorem enumeration_hex4_242d : reassembles 9261 = true ∧ castsFifteens 9261 = true := by decide

/-- 242e: nibbles fold back to 9262; digit sum 22 ≡ 9262 (mod 15). -/
theorem enumeration_hex4_242e : reassembles 9262 = true ∧ castsFifteens 9262 = true := by decide

/-- 242f: nibbles fold back to 9263; digit sum 23 ≡ 9263 (mod 15). -/
theorem enumeration_hex4_242f : reassembles 9263 = true ∧ castsFifteens 9263 = true := by decide

/-- 2430: nibbles fold back to 9264; digit sum 9 ≡ 9264 (mod 15). -/
theorem enumeration_hex4_2430 : reassembles 9264 = true ∧ castsFifteens 9264 = true := by decide

/-- 2431: nibbles fold back to 9265; digit sum 10 ≡ 9265 (mod 15). -/
theorem enumeration_hex4_2431 : reassembles 9265 = true ∧ castsFifteens 9265 = true := by decide

/-- 2432: nibbles fold back to 9266; digit sum 11 ≡ 9266 (mod 15). -/
theorem enumeration_hex4_2432 : reassembles 9266 = true ∧ castsFifteens 9266 = true := by decide

/-- 2433: nibbles fold back to 9267; digit sum 12 ≡ 9267 (mod 15). -/
theorem enumeration_hex4_2433 : reassembles 9267 = true ∧ castsFifteens 9267 = true := by decide

/-- 2434: nibbles fold back to 9268; digit sum 13 ≡ 9268 (mod 15). -/
theorem enumeration_hex4_2434 : reassembles 9268 = true ∧ castsFifteens 9268 = true := by decide

/-- 2435: nibbles fold back to 9269; digit sum 14 ≡ 9269 (mod 15). -/
theorem enumeration_hex4_2435 : reassembles 9269 = true ∧ castsFifteens 9269 = true := by decide

/-- 2436: nibbles fold back to 9270; digit sum 15 ≡ 9270 (mod 15). -/
theorem enumeration_hex4_2436 : reassembles 9270 = true ∧ castsFifteens 9270 = true := by decide

/-- 2437: nibbles fold back to 9271; digit sum 16 ≡ 9271 (mod 15). -/
theorem enumeration_hex4_2437 : reassembles 9271 = true ∧ castsFifteens 9271 = true := by decide

/-- 2438: nibbles fold back to 9272; digit sum 17 ≡ 9272 (mod 15). -/
theorem enumeration_hex4_2438 : reassembles 9272 = true ∧ castsFifteens 9272 = true := by decide

/-- 2439: nibbles fold back to 9273; digit sum 18 ≡ 9273 (mod 15). -/
theorem enumeration_hex4_2439 : reassembles 9273 = true ∧ castsFifteens 9273 = true := by decide

/-- 243a: nibbles fold back to 9274; digit sum 19 ≡ 9274 (mod 15). -/
theorem enumeration_hex4_243a : reassembles 9274 = true ∧ castsFifteens 9274 = true := by decide

/-- 243b: nibbles fold back to 9275; digit sum 20 ≡ 9275 (mod 15). -/
theorem enumeration_hex4_243b : reassembles 9275 = true ∧ castsFifteens 9275 = true := by decide

/-- 243c: nibbles fold back to 9276; digit sum 21 ≡ 9276 (mod 15). -/
theorem enumeration_hex4_243c : reassembles 9276 = true ∧ castsFifteens 9276 = true := by decide

/-- 243d: nibbles fold back to 9277; digit sum 22 ≡ 9277 (mod 15). -/
theorem enumeration_hex4_243d : reassembles 9277 = true ∧ castsFifteens 9277 = true := by decide

/-- 243e: nibbles fold back to 9278; digit sum 23 ≡ 9278 (mod 15). -/
theorem enumeration_hex4_243e : reassembles 9278 = true ∧ castsFifteens 9278 = true := by decide

/-- 243f: nibbles fold back to 9279; digit sum 24 ≡ 9279 (mod 15). -/
theorem enumeration_hex4_243f : reassembles 9279 = true ∧ castsFifteens 9279 = true := by decide

/-- 2440: nibbles fold back to 9280; digit sum 10 ≡ 9280 (mod 15). -/
theorem enumeration_hex4_2440 : reassembles 9280 = true ∧ castsFifteens 9280 = true := by decide

/-- 2441: nibbles fold back to 9281; digit sum 11 ≡ 9281 (mod 15). -/
theorem enumeration_hex4_2441 : reassembles 9281 = true ∧ castsFifteens 9281 = true := by decide

/-- 2442: nibbles fold back to 9282; digit sum 12 ≡ 9282 (mod 15). -/
theorem enumeration_hex4_2442 : reassembles 9282 = true ∧ castsFifteens 9282 = true := by decide

/-- 2443: nibbles fold back to 9283; digit sum 13 ≡ 9283 (mod 15). -/
theorem enumeration_hex4_2443 : reassembles 9283 = true ∧ castsFifteens 9283 = true := by decide

/-- 2444: nibbles fold back to 9284; digit sum 14 ≡ 9284 (mod 15). -/
theorem enumeration_hex4_2444 : reassembles 9284 = true ∧ castsFifteens 9284 = true := by decide

/-- 2445: nibbles fold back to 9285; digit sum 15 ≡ 9285 (mod 15). -/
theorem enumeration_hex4_2445 : reassembles 9285 = true ∧ castsFifteens 9285 = true := by decide

/-- 2446: nibbles fold back to 9286; digit sum 16 ≡ 9286 (mod 15). -/
theorem enumeration_hex4_2446 : reassembles 9286 = true ∧ castsFifteens 9286 = true := by decide

/-- 2447: nibbles fold back to 9287; digit sum 17 ≡ 9287 (mod 15). -/
theorem enumeration_hex4_2447 : reassembles 9287 = true ∧ castsFifteens 9287 = true := by decide

/-- 2448: nibbles fold back to 9288; digit sum 18 ≡ 9288 (mod 15). -/
theorem enumeration_hex4_2448 : reassembles 9288 = true ∧ castsFifteens 9288 = true := by decide

/-- 2449: nibbles fold back to 9289; digit sum 19 ≡ 9289 (mod 15). -/
theorem enumeration_hex4_2449 : reassembles 9289 = true ∧ castsFifteens 9289 = true := by decide

/-- 244a: nibbles fold back to 9290; digit sum 20 ≡ 9290 (mod 15). -/
theorem enumeration_hex4_244a : reassembles 9290 = true ∧ castsFifteens 9290 = true := by decide

/-- 244b: nibbles fold back to 9291; digit sum 21 ≡ 9291 (mod 15). -/
theorem enumeration_hex4_244b : reassembles 9291 = true ∧ castsFifteens 9291 = true := by decide

/-- 244c: nibbles fold back to 9292; digit sum 22 ≡ 9292 (mod 15). -/
theorem enumeration_hex4_244c : reassembles 9292 = true ∧ castsFifteens 9292 = true := by decide

/-- 244d: nibbles fold back to 9293; digit sum 23 ≡ 9293 (mod 15). -/
theorem enumeration_hex4_244d : reassembles 9293 = true ∧ castsFifteens 9293 = true := by decide

/-- 244e: nibbles fold back to 9294; digit sum 24 ≡ 9294 (mod 15). -/
theorem enumeration_hex4_244e : reassembles 9294 = true ∧ castsFifteens 9294 = true := by decide

/-- 244f: nibbles fold back to 9295; digit sum 25 ≡ 9295 (mod 15). -/
theorem enumeration_hex4_244f : reassembles 9295 = true ∧ castsFifteens 9295 = true := by decide

/-- 2450: nibbles fold back to 9296; digit sum 11 ≡ 9296 (mod 15). -/
theorem enumeration_hex4_2450 : reassembles 9296 = true ∧ castsFifteens 9296 = true := by decide

/-- 2451: nibbles fold back to 9297; digit sum 12 ≡ 9297 (mod 15). -/
theorem enumeration_hex4_2451 : reassembles 9297 = true ∧ castsFifteens 9297 = true := by decide

/-- 2452: nibbles fold back to 9298; digit sum 13 ≡ 9298 (mod 15). -/
theorem enumeration_hex4_2452 : reassembles 9298 = true ∧ castsFifteens 9298 = true := by decide

/-- 2453: nibbles fold back to 9299; digit sum 14 ≡ 9299 (mod 15). -/
theorem enumeration_hex4_2453 : reassembles 9299 = true ∧ castsFifteens 9299 = true := by decide

/-- 2454: nibbles fold back to 9300; digit sum 15 ≡ 9300 (mod 15). -/
theorem enumeration_hex4_2454 : reassembles 9300 = true ∧ castsFifteens 9300 = true := by decide

/-- 2455: nibbles fold back to 9301; digit sum 16 ≡ 9301 (mod 15). -/
theorem enumeration_hex4_2455 : reassembles 9301 = true ∧ castsFifteens 9301 = true := by decide

/-- 2456: nibbles fold back to 9302; digit sum 17 ≡ 9302 (mod 15). -/
theorem enumeration_hex4_2456 : reassembles 9302 = true ∧ castsFifteens 9302 = true := by decide

/-- 2457: nibbles fold back to 9303; digit sum 18 ≡ 9303 (mod 15). -/
theorem enumeration_hex4_2457 : reassembles 9303 = true ∧ castsFifteens 9303 = true := by decide

/-- 2458: nibbles fold back to 9304; digit sum 19 ≡ 9304 (mod 15). -/
theorem enumeration_hex4_2458 : reassembles 9304 = true ∧ castsFifteens 9304 = true := by decide

/-- 2459: nibbles fold back to 9305; digit sum 20 ≡ 9305 (mod 15). -/
theorem enumeration_hex4_2459 : reassembles 9305 = true ∧ castsFifteens 9305 = true := by decide

/-- 245a: nibbles fold back to 9306; digit sum 21 ≡ 9306 (mod 15). -/
theorem enumeration_hex4_245a : reassembles 9306 = true ∧ castsFifteens 9306 = true := by decide

/-- 245b: nibbles fold back to 9307; digit sum 22 ≡ 9307 (mod 15). -/
theorem enumeration_hex4_245b : reassembles 9307 = true ∧ castsFifteens 9307 = true := by decide

/-- 245c: nibbles fold back to 9308; digit sum 23 ≡ 9308 (mod 15). -/
theorem enumeration_hex4_245c : reassembles 9308 = true ∧ castsFifteens 9308 = true := by decide

/-- 245d: nibbles fold back to 9309; digit sum 24 ≡ 9309 (mod 15). -/
theorem enumeration_hex4_245d : reassembles 9309 = true ∧ castsFifteens 9309 = true := by decide

/-- 245e: nibbles fold back to 9310; digit sum 25 ≡ 9310 (mod 15). -/
theorem enumeration_hex4_245e : reassembles 9310 = true ∧ castsFifteens 9310 = true := by decide

/-- 245f: nibbles fold back to 9311; digit sum 26 ≡ 9311 (mod 15). -/
theorem enumeration_hex4_245f : reassembles 9311 = true ∧ castsFifteens 9311 = true := by decide

/-- 2460: nibbles fold back to 9312; digit sum 12 ≡ 9312 (mod 15). -/
theorem enumeration_hex4_2460 : reassembles 9312 = true ∧ castsFifteens 9312 = true := by decide

/-- 2461: nibbles fold back to 9313; digit sum 13 ≡ 9313 (mod 15). -/
theorem enumeration_hex4_2461 : reassembles 9313 = true ∧ castsFifteens 9313 = true := by decide

/-- 2462: nibbles fold back to 9314; digit sum 14 ≡ 9314 (mod 15). -/
theorem enumeration_hex4_2462 : reassembles 9314 = true ∧ castsFifteens 9314 = true := by decide

/-- 2463: nibbles fold back to 9315; digit sum 15 ≡ 9315 (mod 15). -/
theorem enumeration_hex4_2463 : reassembles 9315 = true ∧ castsFifteens 9315 = true := by decide

/-- 2464: nibbles fold back to 9316; digit sum 16 ≡ 9316 (mod 15). -/
theorem enumeration_hex4_2464 : reassembles 9316 = true ∧ castsFifteens 9316 = true := by decide

/-- 2465: nibbles fold back to 9317; digit sum 17 ≡ 9317 (mod 15). -/
theorem enumeration_hex4_2465 : reassembles 9317 = true ∧ castsFifteens 9317 = true := by decide

/-- 2466: nibbles fold back to 9318; digit sum 18 ≡ 9318 (mod 15). -/
theorem enumeration_hex4_2466 : reassembles 9318 = true ∧ castsFifteens 9318 = true := by decide

/-- 2467: nibbles fold back to 9319; digit sum 19 ≡ 9319 (mod 15). -/
theorem enumeration_hex4_2467 : reassembles 9319 = true ∧ castsFifteens 9319 = true := by decide

/-- 2468: nibbles fold back to 9320; digit sum 20 ≡ 9320 (mod 15). -/
theorem enumeration_hex4_2468 : reassembles 9320 = true ∧ castsFifteens 9320 = true := by decide

/-- 2469: nibbles fold back to 9321; digit sum 21 ≡ 9321 (mod 15). -/
theorem enumeration_hex4_2469 : reassembles 9321 = true ∧ castsFifteens 9321 = true := by decide

/-- 246a: nibbles fold back to 9322; digit sum 22 ≡ 9322 (mod 15). -/
theorem enumeration_hex4_246a : reassembles 9322 = true ∧ castsFifteens 9322 = true := by decide

/-- 246b: nibbles fold back to 9323; digit sum 23 ≡ 9323 (mod 15). -/
theorem enumeration_hex4_246b : reassembles 9323 = true ∧ castsFifteens 9323 = true := by decide

/-- 246c: nibbles fold back to 9324; digit sum 24 ≡ 9324 (mod 15). -/
theorem enumeration_hex4_246c : reassembles 9324 = true ∧ castsFifteens 9324 = true := by decide

/-- 246d: nibbles fold back to 9325; digit sum 25 ≡ 9325 (mod 15). -/
theorem enumeration_hex4_246d : reassembles 9325 = true ∧ castsFifteens 9325 = true := by decide

/-- 246e: nibbles fold back to 9326; digit sum 26 ≡ 9326 (mod 15). -/
theorem enumeration_hex4_246e : reassembles 9326 = true ∧ castsFifteens 9326 = true := by decide

/-- 246f: nibbles fold back to 9327; digit sum 27 ≡ 9327 (mod 15). -/
theorem enumeration_hex4_246f : reassembles 9327 = true ∧ castsFifteens 9327 = true := by decide

/-- 2470: nibbles fold back to 9328; digit sum 13 ≡ 9328 (mod 15). -/
theorem enumeration_hex4_2470 : reassembles 9328 = true ∧ castsFifteens 9328 = true := by decide

/-- 2471: nibbles fold back to 9329; digit sum 14 ≡ 9329 (mod 15). -/
theorem enumeration_hex4_2471 : reassembles 9329 = true ∧ castsFifteens 9329 = true := by decide

/-- 2472: nibbles fold back to 9330; digit sum 15 ≡ 9330 (mod 15). -/
theorem enumeration_hex4_2472 : reassembles 9330 = true ∧ castsFifteens 9330 = true := by decide

/-- 2473: nibbles fold back to 9331; digit sum 16 ≡ 9331 (mod 15). -/
theorem enumeration_hex4_2473 : reassembles 9331 = true ∧ castsFifteens 9331 = true := by decide

/-- 2474: nibbles fold back to 9332; digit sum 17 ≡ 9332 (mod 15). -/
theorem enumeration_hex4_2474 : reassembles 9332 = true ∧ castsFifteens 9332 = true := by decide

/-- 2475: nibbles fold back to 9333; digit sum 18 ≡ 9333 (mod 15). -/
theorem enumeration_hex4_2475 : reassembles 9333 = true ∧ castsFifteens 9333 = true := by decide

/-- 2476: nibbles fold back to 9334; digit sum 19 ≡ 9334 (mod 15). -/
theorem enumeration_hex4_2476 : reassembles 9334 = true ∧ castsFifteens 9334 = true := by decide

/-- 2477: nibbles fold back to 9335; digit sum 20 ≡ 9335 (mod 15). -/
theorem enumeration_hex4_2477 : reassembles 9335 = true ∧ castsFifteens 9335 = true := by decide

/-- 2478: nibbles fold back to 9336; digit sum 21 ≡ 9336 (mod 15). -/
theorem enumeration_hex4_2478 : reassembles 9336 = true ∧ castsFifteens 9336 = true := by decide

/-- 2479: nibbles fold back to 9337; digit sum 22 ≡ 9337 (mod 15). -/
theorem enumeration_hex4_2479 : reassembles 9337 = true ∧ castsFifteens 9337 = true := by decide

/-- 247a: nibbles fold back to 9338; digit sum 23 ≡ 9338 (mod 15). -/
theorem enumeration_hex4_247a : reassembles 9338 = true ∧ castsFifteens 9338 = true := by decide

/-- 247b: nibbles fold back to 9339; digit sum 24 ≡ 9339 (mod 15). -/
theorem enumeration_hex4_247b : reassembles 9339 = true ∧ castsFifteens 9339 = true := by decide

/-- 247c: nibbles fold back to 9340; digit sum 25 ≡ 9340 (mod 15). -/
theorem enumeration_hex4_247c : reassembles 9340 = true ∧ castsFifteens 9340 = true := by decide

/-- 247d: nibbles fold back to 9341; digit sum 26 ≡ 9341 (mod 15). -/
theorem enumeration_hex4_247d : reassembles 9341 = true ∧ castsFifteens 9341 = true := by decide

/-- 247e: nibbles fold back to 9342; digit sum 27 ≡ 9342 (mod 15). -/
theorem enumeration_hex4_247e : reassembles 9342 = true ∧ castsFifteens 9342 = true := by decide

/-- 247f: nibbles fold back to 9343; digit sum 28 ≡ 9343 (mod 15). -/
theorem enumeration_hex4_247f : reassembles 9343 = true ∧ castsFifteens 9343 = true := by decide

/-- 2480: nibbles fold back to 9344; digit sum 14 ≡ 9344 (mod 15). -/
theorem enumeration_hex4_2480 : reassembles 9344 = true ∧ castsFifteens 9344 = true := by decide

/-- 2481: nibbles fold back to 9345; digit sum 15 ≡ 9345 (mod 15). -/
theorem enumeration_hex4_2481 : reassembles 9345 = true ∧ castsFifteens 9345 = true := by decide

/-- 2482: nibbles fold back to 9346; digit sum 16 ≡ 9346 (mod 15). -/
theorem enumeration_hex4_2482 : reassembles 9346 = true ∧ castsFifteens 9346 = true := by decide

/-- 2483: nibbles fold back to 9347; digit sum 17 ≡ 9347 (mod 15). -/
theorem enumeration_hex4_2483 : reassembles 9347 = true ∧ castsFifteens 9347 = true := by decide

/-- 2484: nibbles fold back to 9348; digit sum 18 ≡ 9348 (mod 15). -/
theorem enumeration_hex4_2484 : reassembles 9348 = true ∧ castsFifteens 9348 = true := by decide

/-- 2485: nibbles fold back to 9349; digit sum 19 ≡ 9349 (mod 15). -/
theorem enumeration_hex4_2485 : reassembles 9349 = true ∧ castsFifteens 9349 = true := by decide

/-- 2486: nibbles fold back to 9350; digit sum 20 ≡ 9350 (mod 15). -/
theorem enumeration_hex4_2486 : reassembles 9350 = true ∧ castsFifteens 9350 = true := by decide

/-- 2487: nibbles fold back to 9351; digit sum 21 ≡ 9351 (mod 15). -/
theorem enumeration_hex4_2487 : reassembles 9351 = true ∧ castsFifteens 9351 = true := by decide

/-- 2488: nibbles fold back to 9352; digit sum 22 ≡ 9352 (mod 15). -/
theorem enumeration_hex4_2488 : reassembles 9352 = true ∧ castsFifteens 9352 = true := by decide

/-- 2489: nibbles fold back to 9353; digit sum 23 ≡ 9353 (mod 15). -/
theorem enumeration_hex4_2489 : reassembles 9353 = true ∧ castsFifteens 9353 = true := by decide

/-- 248a: nibbles fold back to 9354; digit sum 24 ≡ 9354 (mod 15). -/
theorem enumeration_hex4_248a : reassembles 9354 = true ∧ castsFifteens 9354 = true := by decide

/-- 248b: nibbles fold back to 9355; digit sum 25 ≡ 9355 (mod 15). -/
theorem enumeration_hex4_248b : reassembles 9355 = true ∧ castsFifteens 9355 = true := by decide

/-- 248c: nibbles fold back to 9356; digit sum 26 ≡ 9356 (mod 15). -/
theorem enumeration_hex4_248c : reassembles 9356 = true ∧ castsFifteens 9356 = true := by decide

/-- 248d: nibbles fold back to 9357; digit sum 27 ≡ 9357 (mod 15). -/
theorem enumeration_hex4_248d : reassembles 9357 = true ∧ castsFifteens 9357 = true := by decide

/-- 248e: nibbles fold back to 9358; digit sum 28 ≡ 9358 (mod 15). -/
theorem enumeration_hex4_248e : reassembles 9358 = true ∧ castsFifteens 9358 = true := by decide

/-- 248f: nibbles fold back to 9359; digit sum 29 ≡ 9359 (mod 15). -/
theorem enumeration_hex4_248f : reassembles 9359 = true ∧ castsFifteens 9359 = true := by decide

/-- 2490: nibbles fold back to 9360; digit sum 15 ≡ 9360 (mod 15). -/
theorem enumeration_hex4_2490 : reassembles 9360 = true ∧ castsFifteens 9360 = true := by decide

/-- 2491: nibbles fold back to 9361; digit sum 16 ≡ 9361 (mod 15). -/
theorem enumeration_hex4_2491 : reassembles 9361 = true ∧ castsFifteens 9361 = true := by decide

/-- 2492: nibbles fold back to 9362; digit sum 17 ≡ 9362 (mod 15). -/
theorem enumeration_hex4_2492 : reassembles 9362 = true ∧ castsFifteens 9362 = true := by decide

/-- 2493: nibbles fold back to 9363; digit sum 18 ≡ 9363 (mod 15). -/
theorem enumeration_hex4_2493 : reassembles 9363 = true ∧ castsFifteens 9363 = true := by decide

/-- 2494: nibbles fold back to 9364; digit sum 19 ≡ 9364 (mod 15). -/
theorem enumeration_hex4_2494 : reassembles 9364 = true ∧ castsFifteens 9364 = true := by decide

/-- 2495: nibbles fold back to 9365; digit sum 20 ≡ 9365 (mod 15). -/
theorem enumeration_hex4_2495 : reassembles 9365 = true ∧ castsFifteens 9365 = true := by decide

/-- 2496: nibbles fold back to 9366; digit sum 21 ≡ 9366 (mod 15). -/
theorem enumeration_hex4_2496 : reassembles 9366 = true ∧ castsFifteens 9366 = true := by decide

/-- 2497: nibbles fold back to 9367; digit sum 22 ≡ 9367 (mod 15). -/
theorem enumeration_hex4_2497 : reassembles 9367 = true ∧ castsFifteens 9367 = true := by decide

/-- 2498: nibbles fold back to 9368; digit sum 23 ≡ 9368 (mod 15). -/
theorem enumeration_hex4_2498 : reassembles 9368 = true ∧ castsFifteens 9368 = true := by decide

/-- 2499: nibbles fold back to 9369; digit sum 24 ≡ 9369 (mod 15). -/
theorem enumeration_hex4_2499 : reassembles 9369 = true ∧ castsFifteens 9369 = true := by decide

/-- 249a: nibbles fold back to 9370; digit sum 25 ≡ 9370 (mod 15). -/
theorem enumeration_hex4_249a : reassembles 9370 = true ∧ castsFifteens 9370 = true := by decide

/-- 249b: nibbles fold back to 9371; digit sum 26 ≡ 9371 (mod 15). -/
theorem enumeration_hex4_249b : reassembles 9371 = true ∧ castsFifteens 9371 = true := by decide

/-- 249c: nibbles fold back to 9372; digit sum 27 ≡ 9372 (mod 15). -/
theorem enumeration_hex4_249c : reassembles 9372 = true ∧ castsFifteens 9372 = true := by decide

/-- 249d: nibbles fold back to 9373; digit sum 28 ≡ 9373 (mod 15). -/
theorem enumeration_hex4_249d : reassembles 9373 = true ∧ castsFifteens 9373 = true := by decide

/-- 249e: nibbles fold back to 9374; digit sum 29 ≡ 9374 (mod 15). -/
theorem enumeration_hex4_249e : reassembles 9374 = true ∧ castsFifteens 9374 = true := by decide

/-- 249f: nibbles fold back to 9375; digit sum 30 ≡ 9375 (mod 15). -/
theorem enumeration_hex4_249f : reassembles 9375 = true ∧ castsFifteens 9375 = true := by decide

/-- 24a0: nibbles fold back to 9376; digit sum 16 ≡ 9376 (mod 15). -/
theorem enumeration_hex4_24a0 : reassembles 9376 = true ∧ castsFifteens 9376 = true := by decide

/-- 24a1: nibbles fold back to 9377; digit sum 17 ≡ 9377 (mod 15). -/
theorem enumeration_hex4_24a1 : reassembles 9377 = true ∧ castsFifteens 9377 = true := by decide

/-- 24a2: nibbles fold back to 9378; digit sum 18 ≡ 9378 (mod 15). -/
theorem enumeration_hex4_24a2 : reassembles 9378 = true ∧ castsFifteens 9378 = true := by decide

/-- 24a3: nibbles fold back to 9379; digit sum 19 ≡ 9379 (mod 15). -/
theorem enumeration_hex4_24a3 : reassembles 9379 = true ∧ castsFifteens 9379 = true := by decide

/-- 24a4: nibbles fold back to 9380; digit sum 20 ≡ 9380 (mod 15). -/
theorem enumeration_hex4_24a4 : reassembles 9380 = true ∧ castsFifteens 9380 = true := by decide

/-- 24a5: nibbles fold back to 9381; digit sum 21 ≡ 9381 (mod 15). -/
theorem enumeration_hex4_24a5 : reassembles 9381 = true ∧ castsFifteens 9381 = true := by decide

/-- 24a6: nibbles fold back to 9382; digit sum 22 ≡ 9382 (mod 15). -/
theorem enumeration_hex4_24a6 : reassembles 9382 = true ∧ castsFifteens 9382 = true := by decide

/-- 24a7: nibbles fold back to 9383; digit sum 23 ≡ 9383 (mod 15). -/
theorem enumeration_hex4_24a7 : reassembles 9383 = true ∧ castsFifteens 9383 = true := by decide

/-- 24a8: nibbles fold back to 9384; digit sum 24 ≡ 9384 (mod 15). -/
theorem enumeration_hex4_24a8 : reassembles 9384 = true ∧ castsFifteens 9384 = true := by decide

/-- 24a9: nibbles fold back to 9385; digit sum 25 ≡ 9385 (mod 15). -/
theorem enumeration_hex4_24a9 : reassembles 9385 = true ∧ castsFifteens 9385 = true := by decide

/-- 24aa: nibbles fold back to 9386; digit sum 26 ≡ 9386 (mod 15). -/
theorem enumeration_hex4_24aa : reassembles 9386 = true ∧ castsFifteens 9386 = true := by decide

/-- 24ab: nibbles fold back to 9387; digit sum 27 ≡ 9387 (mod 15). -/
theorem enumeration_hex4_24ab : reassembles 9387 = true ∧ castsFifteens 9387 = true := by decide

/-- 24ac: nibbles fold back to 9388; digit sum 28 ≡ 9388 (mod 15). -/
theorem enumeration_hex4_24ac : reassembles 9388 = true ∧ castsFifteens 9388 = true := by decide

/-- 24ad: nibbles fold back to 9389; digit sum 29 ≡ 9389 (mod 15). -/
theorem enumeration_hex4_24ad : reassembles 9389 = true ∧ castsFifteens 9389 = true := by decide

/-- 24ae: nibbles fold back to 9390; digit sum 30 ≡ 9390 (mod 15). -/
theorem enumeration_hex4_24ae : reassembles 9390 = true ∧ castsFifteens 9390 = true := by decide

/-- 24af: nibbles fold back to 9391; digit sum 31 ≡ 9391 (mod 15). -/
theorem enumeration_hex4_24af : reassembles 9391 = true ∧ castsFifteens 9391 = true := by decide

/-- 24b0: nibbles fold back to 9392; digit sum 17 ≡ 9392 (mod 15). -/
theorem enumeration_hex4_24b0 : reassembles 9392 = true ∧ castsFifteens 9392 = true := by decide

/-- 24b1: nibbles fold back to 9393; digit sum 18 ≡ 9393 (mod 15). -/
theorem enumeration_hex4_24b1 : reassembles 9393 = true ∧ castsFifteens 9393 = true := by decide

/-- 24b2: nibbles fold back to 9394; digit sum 19 ≡ 9394 (mod 15). -/
theorem enumeration_hex4_24b2 : reassembles 9394 = true ∧ castsFifteens 9394 = true := by decide

/-- 24b3: nibbles fold back to 9395; digit sum 20 ≡ 9395 (mod 15). -/
theorem enumeration_hex4_24b3 : reassembles 9395 = true ∧ castsFifteens 9395 = true := by decide

/-- 24b4: nibbles fold back to 9396; digit sum 21 ≡ 9396 (mod 15). -/
theorem enumeration_hex4_24b4 : reassembles 9396 = true ∧ castsFifteens 9396 = true := by decide

/-- 24b5: nibbles fold back to 9397; digit sum 22 ≡ 9397 (mod 15). -/
theorem enumeration_hex4_24b5 : reassembles 9397 = true ∧ castsFifteens 9397 = true := by decide

/-- 24b6: nibbles fold back to 9398; digit sum 23 ≡ 9398 (mod 15). -/
theorem enumeration_hex4_24b6 : reassembles 9398 = true ∧ castsFifteens 9398 = true := by decide

/-- 24b7: nibbles fold back to 9399; digit sum 24 ≡ 9399 (mod 15). -/
theorem enumeration_hex4_24b7 : reassembles 9399 = true ∧ castsFifteens 9399 = true := by decide

/-- 24b8: nibbles fold back to 9400; digit sum 25 ≡ 9400 (mod 15). -/
theorem enumeration_hex4_24b8 : reassembles 9400 = true ∧ castsFifteens 9400 = true := by decide

/-- 24b9: nibbles fold back to 9401; digit sum 26 ≡ 9401 (mod 15). -/
theorem enumeration_hex4_24b9 : reassembles 9401 = true ∧ castsFifteens 9401 = true := by decide

/-- 24ba: nibbles fold back to 9402; digit sum 27 ≡ 9402 (mod 15). -/
theorem enumeration_hex4_24ba : reassembles 9402 = true ∧ castsFifteens 9402 = true := by decide

/-- 24bb: nibbles fold back to 9403; digit sum 28 ≡ 9403 (mod 15). -/
theorem enumeration_hex4_24bb : reassembles 9403 = true ∧ castsFifteens 9403 = true := by decide

/-- 24bc: nibbles fold back to 9404; digit sum 29 ≡ 9404 (mod 15). -/
theorem enumeration_hex4_24bc : reassembles 9404 = true ∧ castsFifteens 9404 = true := by decide

/-- 24bd: nibbles fold back to 9405; digit sum 30 ≡ 9405 (mod 15). -/
theorem enumeration_hex4_24bd : reassembles 9405 = true ∧ castsFifteens 9405 = true := by decide

/-- 24be: nibbles fold back to 9406; digit sum 31 ≡ 9406 (mod 15). -/
theorem enumeration_hex4_24be : reassembles 9406 = true ∧ castsFifteens 9406 = true := by decide

/-- 24bf: nibbles fold back to 9407; digit sum 32 ≡ 9407 (mod 15). -/
theorem enumeration_hex4_24bf : reassembles 9407 = true ∧ castsFifteens 9407 = true := by decide

/-- 24c0: nibbles fold back to 9408; digit sum 18 ≡ 9408 (mod 15). -/
theorem enumeration_hex4_24c0 : reassembles 9408 = true ∧ castsFifteens 9408 = true := by decide

/-- 24c1: nibbles fold back to 9409; digit sum 19 ≡ 9409 (mod 15). -/
theorem enumeration_hex4_24c1 : reassembles 9409 = true ∧ castsFifteens 9409 = true := by decide

/-- 24c2: nibbles fold back to 9410; digit sum 20 ≡ 9410 (mod 15). -/
theorem enumeration_hex4_24c2 : reassembles 9410 = true ∧ castsFifteens 9410 = true := by decide

/-- 24c3: nibbles fold back to 9411; digit sum 21 ≡ 9411 (mod 15). -/
theorem enumeration_hex4_24c3 : reassembles 9411 = true ∧ castsFifteens 9411 = true := by decide

/-- 24c4: nibbles fold back to 9412; digit sum 22 ≡ 9412 (mod 15). -/
theorem enumeration_hex4_24c4 : reassembles 9412 = true ∧ castsFifteens 9412 = true := by decide

/-- 24c5: nibbles fold back to 9413; digit sum 23 ≡ 9413 (mod 15). -/
theorem enumeration_hex4_24c5 : reassembles 9413 = true ∧ castsFifteens 9413 = true := by decide

/-- 24c6: nibbles fold back to 9414; digit sum 24 ≡ 9414 (mod 15). -/
theorem enumeration_hex4_24c6 : reassembles 9414 = true ∧ castsFifteens 9414 = true := by decide

/-- 24c7: nibbles fold back to 9415; digit sum 25 ≡ 9415 (mod 15). -/
theorem enumeration_hex4_24c7 : reassembles 9415 = true ∧ castsFifteens 9415 = true := by decide

/-- 24c8: nibbles fold back to 9416; digit sum 26 ≡ 9416 (mod 15). -/
theorem enumeration_hex4_24c8 : reassembles 9416 = true ∧ castsFifteens 9416 = true := by decide

/-- 24c9: nibbles fold back to 9417; digit sum 27 ≡ 9417 (mod 15). -/
theorem enumeration_hex4_24c9 : reassembles 9417 = true ∧ castsFifteens 9417 = true := by decide

/-- 24ca: nibbles fold back to 9418; digit sum 28 ≡ 9418 (mod 15). -/
theorem enumeration_hex4_24ca : reassembles 9418 = true ∧ castsFifteens 9418 = true := by decide

/-- 24cb: nibbles fold back to 9419; digit sum 29 ≡ 9419 (mod 15). -/
theorem enumeration_hex4_24cb : reassembles 9419 = true ∧ castsFifteens 9419 = true := by decide

/-- 24cc: nibbles fold back to 9420; digit sum 30 ≡ 9420 (mod 15). -/
theorem enumeration_hex4_24cc : reassembles 9420 = true ∧ castsFifteens 9420 = true := by decide

/-- 24cd: nibbles fold back to 9421; digit sum 31 ≡ 9421 (mod 15). -/
theorem enumeration_hex4_24cd : reassembles 9421 = true ∧ castsFifteens 9421 = true := by decide

/-- 24ce: nibbles fold back to 9422; digit sum 32 ≡ 9422 (mod 15). -/
theorem enumeration_hex4_24ce : reassembles 9422 = true ∧ castsFifteens 9422 = true := by decide

/-- 24cf: nibbles fold back to 9423; digit sum 33 ≡ 9423 (mod 15). -/
theorem enumeration_hex4_24cf : reassembles 9423 = true ∧ castsFifteens 9423 = true := by decide

/-- 24d0: nibbles fold back to 9424; digit sum 19 ≡ 9424 (mod 15). -/
theorem enumeration_hex4_24d0 : reassembles 9424 = true ∧ castsFifteens 9424 = true := by decide

/-- 24d1: nibbles fold back to 9425; digit sum 20 ≡ 9425 (mod 15). -/
theorem enumeration_hex4_24d1 : reassembles 9425 = true ∧ castsFifteens 9425 = true := by decide

/-- 24d2: nibbles fold back to 9426; digit sum 21 ≡ 9426 (mod 15). -/
theorem enumeration_hex4_24d2 : reassembles 9426 = true ∧ castsFifteens 9426 = true := by decide

/-- 24d3: nibbles fold back to 9427; digit sum 22 ≡ 9427 (mod 15). -/
theorem enumeration_hex4_24d3 : reassembles 9427 = true ∧ castsFifteens 9427 = true := by decide

/-- 24d4: nibbles fold back to 9428; digit sum 23 ≡ 9428 (mod 15). -/
theorem enumeration_hex4_24d4 : reassembles 9428 = true ∧ castsFifteens 9428 = true := by decide

/-- 24d5: nibbles fold back to 9429; digit sum 24 ≡ 9429 (mod 15). -/
theorem enumeration_hex4_24d5 : reassembles 9429 = true ∧ castsFifteens 9429 = true := by decide

/-- 24d6: nibbles fold back to 9430; digit sum 25 ≡ 9430 (mod 15). -/
theorem enumeration_hex4_24d6 : reassembles 9430 = true ∧ castsFifteens 9430 = true := by decide

/-- 24d7: nibbles fold back to 9431; digit sum 26 ≡ 9431 (mod 15). -/
theorem enumeration_hex4_24d7 : reassembles 9431 = true ∧ castsFifteens 9431 = true := by decide

/-- 24d8: nibbles fold back to 9432; digit sum 27 ≡ 9432 (mod 15). -/
theorem enumeration_hex4_24d8 : reassembles 9432 = true ∧ castsFifteens 9432 = true := by decide

/-- 24d9: nibbles fold back to 9433; digit sum 28 ≡ 9433 (mod 15). -/
theorem enumeration_hex4_24d9 : reassembles 9433 = true ∧ castsFifteens 9433 = true := by decide

/-- 24da: nibbles fold back to 9434; digit sum 29 ≡ 9434 (mod 15). -/
theorem enumeration_hex4_24da : reassembles 9434 = true ∧ castsFifteens 9434 = true := by decide

/-- 24db: nibbles fold back to 9435; digit sum 30 ≡ 9435 (mod 15). -/
theorem enumeration_hex4_24db : reassembles 9435 = true ∧ castsFifteens 9435 = true := by decide

/-- 24dc: nibbles fold back to 9436; digit sum 31 ≡ 9436 (mod 15). -/
theorem enumeration_hex4_24dc : reassembles 9436 = true ∧ castsFifteens 9436 = true := by decide

/-- 24dd: nibbles fold back to 9437; digit sum 32 ≡ 9437 (mod 15). -/
theorem enumeration_hex4_24dd : reassembles 9437 = true ∧ castsFifteens 9437 = true := by decide

/-- 24de: nibbles fold back to 9438; digit sum 33 ≡ 9438 (mod 15). -/
theorem enumeration_hex4_24de : reassembles 9438 = true ∧ castsFifteens 9438 = true := by decide

/-- 24df: nibbles fold back to 9439; digit sum 34 ≡ 9439 (mod 15). -/
theorem enumeration_hex4_24df : reassembles 9439 = true ∧ castsFifteens 9439 = true := by decide

/-- 24e0: nibbles fold back to 9440; digit sum 20 ≡ 9440 (mod 15). -/
theorem enumeration_hex4_24e0 : reassembles 9440 = true ∧ castsFifteens 9440 = true := by decide

/-- 24e1: nibbles fold back to 9441; digit sum 21 ≡ 9441 (mod 15). -/
theorem enumeration_hex4_24e1 : reassembles 9441 = true ∧ castsFifteens 9441 = true := by decide

/-- 24e2: nibbles fold back to 9442; digit sum 22 ≡ 9442 (mod 15). -/
theorem enumeration_hex4_24e2 : reassembles 9442 = true ∧ castsFifteens 9442 = true := by decide

/-- 24e3: nibbles fold back to 9443; digit sum 23 ≡ 9443 (mod 15). -/
theorem enumeration_hex4_24e3 : reassembles 9443 = true ∧ castsFifteens 9443 = true := by decide

/-- 24e4: nibbles fold back to 9444; digit sum 24 ≡ 9444 (mod 15). -/
theorem enumeration_hex4_24e4 : reassembles 9444 = true ∧ castsFifteens 9444 = true := by decide

/-- 24e5: nibbles fold back to 9445; digit sum 25 ≡ 9445 (mod 15). -/
theorem enumeration_hex4_24e5 : reassembles 9445 = true ∧ castsFifteens 9445 = true := by decide

/-- 24e6: nibbles fold back to 9446; digit sum 26 ≡ 9446 (mod 15). -/
theorem enumeration_hex4_24e6 : reassembles 9446 = true ∧ castsFifteens 9446 = true := by decide

/-- 24e7: nibbles fold back to 9447; digit sum 27 ≡ 9447 (mod 15). -/
theorem enumeration_hex4_24e7 : reassembles 9447 = true ∧ castsFifteens 9447 = true := by decide

/-- 24e8: nibbles fold back to 9448; digit sum 28 ≡ 9448 (mod 15). -/
theorem enumeration_hex4_24e8 : reassembles 9448 = true ∧ castsFifteens 9448 = true := by decide

/-- 24e9: nibbles fold back to 9449; digit sum 29 ≡ 9449 (mod 15). -/
theorem enumeration_hex4_24e9 : reassembles 9449 = true ∧ castsFifteens 9449 = true := by decide

/-- 24ea: nibbles fold back to 9450; digit sum 30 ≡ 9450 (mod 15). -/
theorem enumeration_hex4_24ea : reassembles 9450 = true ∧ castsFifteens 9450 = true := by decide

/-- 24eb: nibbles fold back to 9451; digit sum 31 ≡ 9451 (mod 15). -/
theorem enumeration_hex4_24eb : reassembles 9451 = true ∧ castsFifteens 9451 = true := by decide

/-- 24ec: nibbles fold back to 9452; digit sum 32 ≡ 9452 (mod 15). -/
theorem enumeration_hex4_24ec : reassembles 9452 = true ∧ castsFifteens 9452 = true := by decide

/-- 24ed: nibbles fold back to 9453; digit sum 33 ≡ 9453 (mod 15). -/
theorem enumeration_hex4_24ed : reassembles 9453 = true ∧ castsFifteens 9453 = true := by decide

/-- 24ee: nibbles fold back to 9454; digit sum 34 ≡ 9454 (mod 15). -/
theorem enumeration_hex4_24ee : reassembles 9454 = true ∧ castsFifteens 9454 = true := by decide

/-- 24ef: nibbles fold back to 9455; digit sum 35 ≡ 9455 (mod 15). -/
theorem enumeration_hex4_24ef : reassembles 9455 = true ∧ castsFifteens 9455 = true := by decide

/-- 24f0: nibbles fold back to 9456; digit sum 21 ≡ 9456 (mod 15). -/
theorem enumeration_hex4_24f0 : reassembles 9456 = true ∧ castsFifteens 9456 = true := by decide

/-- 24f1: nibbles fold back to 9457; digit sum 22 ≡ 9457 (mod 15). -/
theorem enumeration_hex4_24f1 : reassembles 9457 = true ∧ castsFifteens 9457 = true := by decide

/-- 24f2: nibbles fold back to 9458; digit sum 23 ≡ 9458 (mod 15). -/
theorem enumeration_hex4_24f2 : reassembles 9458 = true ∧ castsFifteens 9458 = true := by decide

/-- 24f3: nibbles fold back to 9459; digit sum 24 ≡ 9459 (mod 15). -/
theorem enumeration_hex4_24f3 : reassembles 9459 = true ∧ castsFifteens 9459 = true := by decide

/-- 24f4: nibbles fold back to 9460; digit sum 25 ≡ 9460 (mod 15). -/
theorem enumeration_hex4_24f4 : reassembles 9460 = true ∧ castsFifteens 9460 = true := by decide

/-- 24f5: nibbles fold back to 9461; digit sum 26 ≡ 9461 (mod 15). -/
theorem enumeration_hex4_24f5 : reassembles 9461 = true ∧ castsFifteens 9461 = true := by decide

/-- 24f6: nibbles fold back to 9462; digit sum 27 ≡ 9462 (mod 15). -/
theorem enumeration_hex4_24f6 : reassembles 9462 = true ∧ castsFifteens 9462 = true := by decide

/-- 24f7: nibbles fold back to 9463; digit sum 28 ≡ 9463 (mod 15). -/
theorem enumeration_hex4_24f7 : reassembles 9463 = true ∧ castsFifteens 9463 = true := by decide

/-- 24f8: nibbles fold back to 9464; digit sum 29 ≡ 9464 (mod 15). -/
theorem enumeration_hex4_24f8 : reassembles 9464 = true ∧ castsFifteens 9464 = true := by decide

/-- 24f9: nibbles fold back to 9465; digit sum 30 ≡ 9465 (mod 15). -/
theorem enumeration_hex4_24f9 : reassembles 9465 = true ∧ castsFifteens 9465 = true := by decide

/-- 24fa: nibbles fold back to 9466; digit sum 31 ≡ 9466 (mod 15). -/
theorem enumeration_hex4_24fa : reassembles 9466 = true ∧ castsFifteens 9466 = true := by decide

/-- 24fb: nibbles fold back to 9467; digit sum 32 ≡ 9467 (mod 15). -/
theorem enumeration_hex4_24fb : reassembles 9467 = true ∧ castsFifteens 9467 = true := by decide

/-- 24fc: nibbles fold back to 9468; digit sum 33 ≡ 9468 (mod 15). -/
theorem enumeration_hex4_24fc : reassembles 9468 = true ∧ castsFifteens 9468 = true := by decide

/-- 24fd: nibbles fold back to 9469; digit sum 34 ≡ 9469 (mod 15). -/
theorem enumeration_hex4_24fd : reassembles 9469 = true ∧ castsFifteens 9469 = true := by decide

/-- 24fe: nibbles fold back to 9470; digit sum 35 ≡ 9470 (mod 15). -/
theorem enumeration_hex4_24fe : reassembles 9470 = true ∧ castsFifteens 9470 = true := by decide

/-- 24ff: nibbles fold back to 9471; digit sum 36 ≡ 9471 (mod 15). -/
theorem enumeration_hex4_24ff : reassembles 9471 = true ∧ castsFifteens 9471 = true := by decide

/-- 2500: nibbles fold back to 9472; digit sum 7 ≡ 9472 (mod 15). -/
theorem enumeration_hex4_2500 : reassembles 9472 = true ∧ castsFifteens 9472 = true := by decide

/-- 2501: nibbles fold back to 9473; digit sum 8 ≡ 9473 (mod 15). -/
theorem enumeration_hex4_2501 : reassembles 9473 = true ∧ castsFifteens 9473 = true := by decide

/-- 2502: nibbles fold back to 9474; digit sum 9 ≡ 9474 (mod 15). -/
theorem enumeration_hex4_2502 : reassembles 9474 = true ∧ castsFifteens 9474 = true := by decide

/-- 2503: nibbles fold back to 9475; digit sum 10 ≡ 9475 (mod 15). -/
theorem enumeration_hex4_2503 : reassembles 9475 = true ∧ castsFifteens 9475 = true := by decide

/-- 2504: nibbles fold back to 9476; digit sum 11 ≡ 9476 (mod 15). -/
theorem enumeration_hex4_2504 : reassembles 9476 = true ∧ castsFifteens 9476 = true := by decide

/-- 2505: nibbles fold back to 9477; digit sum 12 ≡ 9477 (mod 15). -/
theorem enumeration_hex4_2505 : reassembles 9477 = true ∧ castsFifteens 9477 = true := by decide

/-- 2506: nibbles fold back to 9478; digit sum 13 ≡ 9478 (mod 15). -/
theorem enumeration_hex4_2506 : reassembles 9478 = true ∧ castsFifteens 9478 = true := by decide

/-- 2507: nibbles fold back to 9479; digit sum 14 ≡ 9479 (mod 15). -/
theorem enumeration_hex4_2507 : reassembles 9479 = true ∧ castsFifteens 9479 = true := by decide

/-- 2508: nibbles fold back to 9480; digit sum 15 ≡ 9480 (mod 15). -/
theorem enumeration_hex4_2508 : reassembles 9480 = true ∧ castsFifteens 9480 = true := by decide

/-- 2509: nibbles fold back to 9481; digit sum 16 ≡ 9481 (mod 15). -/
theorem enumeration_hex4_2509 : reassembles 9481 = true ∧ castsFifteens 9481 = true := by decide

/-- 250a: nibbles fold back to 9482; digit sum 17 ≡ 9482 (mod 15). -/
theorem enumeration_hex4_250a : reassembles 9482 = true ∧ castsFifteens 9482 = true := by decide

/-- 250b: nibbles fold back to 9483; digit sum 18 ≡ 9483 (mod 15). -/
theorem enumeration_hex4_250b : reassembles 9483 = true ∧ castsFifteens 9483 = true := by decide

/-- 250c: nibbles fold back to 9484; digit sum 19 ≡ 9484 (mod 15). -/
theorem enumeration_hex4_250c : reassembles 9484 = true ∧ castsFifteens 9484 = true := by decide

/-- 250d: nibbles fold back to 9485; digit sum 20 ≡ 9485 (mod 15). -/
theorem enumeration_hex4_250d : reassembles 9485 = true ∧ castsFifteens 9485 = true := by decide

/-- 250e: nibbles fold back to 9486; digit sum 21 ≡ 9486 (mod 15). -/
theorem enumeration_hex4_250e : reassembles 9486 = true ∧ castsFifteens 9486 = true := by decide

/-- 250f: nibbles fold back to 9487; digit sum 22 ≡ 9487 (mod 15). -/
theorem enumeration_hex4_250f : reassembles 9487 = true ∧ castsFifteens 9487 = true := by decide

/-- 2510: nibbles fold back to 9488; digit sum 8 ≡ 9488 (mod 15). -/
theorem enumeration_hex4_2510 : reassembles 9488 = true ∧ castsFifteens 9488 = true := by decide

/-- 2511: nibbles fold back to 9489; digit sum 9 ≡ 9489 (mod 15). -/
theorem enumeration_hex4_2511 : reassembles 9489 = true ∧ castsFifteens 9489 = true := by decide

/-- 2512: nibbles fold back to 9490; digit sum 10 ≡ 9490 (mod 15). -/
theorem enumeration_hex4_2512 : reassembles 9490 = true ∧ castsFifteens 9490 = true := by decide

/-- 2513: nibbles fold back to 9491; digit sum 11 ≡ 9491 (mod 15). -/
theorem enumeration_hex4_2513 : reassembles 9491 = true ∧ castsFifteens 9491 = true := by decide

/-- 2514: nibbles fold back to 9492; digit sum 12 ≡ 9492 (mod 15). -/
theorem enumeration_hex4_2514 : reassembles 9492 = true ∧ castsFifteens 9492 = true := by decide

/-- 2515: nibbles fold back to 9493; digit sum 13 ≡ 9493 (mod 15). -/
theorem enumeration_hex4_2515 : reassembles 9493 = true ∧ castsFifteens 9493 = true := by decide

/-- 2516: nibbles fold back to 9494; digit sum 14 ≡ 9494 (mod 15). -/
theorem enumeration_hex4_2516 : reassembles 9494 = true ∧ castsFifteens 9494 = true := by decide

/-- 2517: nibbles fold back to 9495; digit sum 15 ≡ 9495 (mod 15). -/
theorem enumeration_hex4_2517 : reassembles 9495 = true ∧ castsFifteens 9495 = true := by decide

/-- 2518: nibbles fold back to 9496; digit sum 16 ≡ 9496 (mod 15). -/
theorem enumeration_hex4_2518 : reassembles 9496 = true ∧ castsFifteens 9496 = true := by decide

/-- 2519: nibbles fold back to 9497; digit sum 17 ≡ 9497 (mod 15). -/
theorem enumeration_hex4_2519 : reassembles 9497 = true ∧ castsFifteens 9497 = true := by decide

/-- 251a: nibbles fold back to 9498; digit sum 18 ≡ 9498 (mod 15). -/
theorem enumeration_hex4_251a : reassembles 9498 = true ∧ castsFifteens 9498 = true := by decide

/-- 251b: nibbles fold back to 9499; digit sum 19 ≡ 9499 (mod 15). -/
theorem enumeration_hex4_251b : reassembles 9499 = true ∧ castsFifteens 9499 = true := by decide

/-- 251c: nibbles fold back to 9500; digit sum 20 ≡ 9500 (mod 15). -/
theorem enumeration_hex4_251c : reassembles 9500 = true ∧ castsFifteens 9500 = true := by decide

/-- 251d: nibbles fold back to 9501; digit sum 21 ≡ 9501 (mod 15). -/
theorem enumeration_hex4_251d : reassembles 9501 = true ∧ castsFifteens 9501 = true := by decide

/-- 251e: nibbles fold back to 9502; digit sum 22 ≡ 9502 (mod 15). -/
theorem enumeration_hex4_251e : reassembles 9502 = true ∧ castsFifteens 9502 = true := by decide

/-- 251f: nibbles fold back to 9503; digit sum 23 ≡ 9503 (mod 15). -/
theorem enumeration_hex4_251f : reassembles 9503 = true ∧ castsFifteens 9503 = true := by decide

/-- 2520: nibbles fold back to 9504; digit sum 9 ≡ 9504 (mod 15). -/
theorem enumeration_hex4_2520 : reassembles 9504 = true ∧ castsFifteens 9504 = true := by decide

/-- 2521: nibbles fold back to 9505; digit sum 10 ≡ 9505 (mod 15). -/
theorem enumeration_hex4_2521 : reassembles 9505 = true ∧ castsFifteens 9505 = true := by decide

/-- 2522: nibbles fold back to 9506; digit sum 11 ≡ 9506 (mod 15). -/
theorem enumeration_hex4_2522 : reassembles 9506 = true ∧ castsFifteens 9506 = true := by decide

/-- 2523: nibbles fold back to 9507; digit sum 12 ≡ 9507 (mod 15). -/
theorem enumeration_hex4_2523 : reassembles 9507 = true ∧ castsFifteens 9507 = true := by decide

/-- 2524: nibbles fold back to 9508; digit sum 13 ≡ 9508 (mod 15). -/
theorem enumeration_hex4_2524 : reassembles 9508 = true ∧ castsFifteens 9508 = true := by decide

/-- 2525: nibbles fold back to 9509; digit sum 14 ≡ 9509 (mod 15). -/
theorem enumeration_hex4_2525 : reassembles 9509 = true ∧ castsFifteens 9509 = true := by decide

/-- 2526: nibbles fold back to 9510; digit sum 15 ≡ 9510 (mod 15). -/
theorem enumeration_hex4_2526 : reassembles 9510 = true ∧ castsFifteens 9510 = true := by decide

/-- 2527: nibbles fold back to 9511; digit sum 16 ≡ 9511 (mod 15). -/
theorem enumeration_hex4_2527 : reassembles 9511 = true ∧ castsFifteens 9511 = true := by decide

/-- 2528: nibbles fold back to 9512; digit sum 17 ≡ 9512 (mod 15). -/
theorem enumeration_hex4_2528 : reassembles 9512 = true ∧ castsFifteens 9512 = true := by decide

/-- 2529: nibbles fold back to 9513; digit sum 18 ≡ 9513 (mod 15). -/
theorem enumeration_hex4_2529 : reassembles 9513 = true ∧ castsFifteens 9513 = true := by decide

/-- 252a: nibbles fold back to 9514; digit sum 19 ≡ 9514 (mod 15). -/
theorem enumeration_hex4_252a : reassembles 9514 = true ∧ castsFifteens 9514 = true := by decide

/-- 252b: nibbles fold back to 9515; digit sum 20 ≡ 9515 (mod 15). -/
theorem enumeration_hex4_252b : reassembles 9515 = true ∧ castsFifteens 9515 = true := by decide

/-- 252c: nibbles fold back to 9516; digit sum 21 ≡ 9516 (mod 15). -/
theorem enumeration_hex4_252c : reassembles 9516 = true ∧ castsFifteens 9516 = true := by decide

/-- 252d: nibbles fold back to 9517; digit sum 22 ≡ 9517 (mod 15). -/
theorem enumeration_hex4_252d : reassembles 9517 = true ∧ castsFifteens 9517 = true := by decide

/-- 252e: nibbles fold back to 9518; digit sum 23 ≡ 9518 (mod 15). -/
theorem enumeration_hex4_252e : reassembles 9518 = true ∧ castsFifteens 9518 = true := by decide

/-- 252f: nibbles fold back to 9519; digit sum 24 ≡ 9519 (mod 15). -/
theorem enumeration_hex4_252f : reassembles 9519 = true ∧ castsFifteens 9519 = true := by decide

/-- 2530: nibbles fold back to 9520; digit sum 10 ≡ 9520 (mod 15). -/
theorem enumeration_hex4_2530 : reassembles 9520 = true ∧ castsFifteens 9520 = true := by decide

/-- 2531: nibbles fold back to 9521; digit sum 11 ≡ 9521 (mod 15). -/
theorem enumeration_hex4_2531 : reassembles 9521 = true ∧ castsFifteens 9521 = true := by decide

/-- 2532: nibbles fold back to 9522; digit sum 12 ≡ 9522 (mod 15). -/
theorem enumeration_hex4_2532 : reassembles 9522 = true ∧ castsFifteens 9522 = true := by decide

/-- 2533: nibbles fold back to 9523; digit sum 13 ≡ 9523 (mod 15). -/
theorem enumeration_hex4_2533 : reassembles 9523 = true ∧ castsFifteens 9523 = true := by decide

/-- 2534: nibbles fold back to 9524; digit sum 14 ≡ 9524 (mod 15). -/
theorem enumeration_hex4_2534 : reassembles 9524 = true ∧ castsFifteens 9524 = true := by decide

/-- 2535: nibbles fold back to 9525; digit sum 15 ≡ 9525 (mod 15). -/
theorem enumeration_hex4_2535 : reassembles 9525 = true ∧ castsFifteens 9525 = true := by decide

/-- 2536: nibbles fold back to 9526; digit sum 16 ≡ 9526 (mod 15). -/
theorem enumeration_hex4_2536 : reassembles 9526 = true ∧ castsFifteens 9526 = true := by decide

/-- 2537: nibbles fold back to 9527; digit sum 17 ≡ 9527 (mod 15). -/
theorem enumeration_hex4_2537 : reassembles 9527 = true ∧ castsFifteens 9527 = true := by decide

/-- 2538: nibbles fold back to 9528; digit sum 18 ≡ 9528 (mod 15). -/
theorem enumeration_hex4_2538 : reassembles 9528 = true ∧ castsFifteens 9528 = true := by decide

/-- 2539: nibbles fold back to 9529; digit sum 19 ≡ 9529 (mod 15). -/
theorem enumeration_hex4_2539 : reassembles 9529 = true ∧ castsFifteens 9529 = true := by decide

/-- 253a: nibbles fold back to 9530; digit sum 20 ≡ 9530 (mod 15). -/
theorem enumeration_hex4_253a : reassembles 9530 = true ∧ castsFifteens 9530 = true := by decide

/-- 253b: nibbles fold back to 9531; digit sum 21 ≡ 9531 (mod 15). -/
theorem enumeration_hex4_253b : reassembles 9531 = true ∧ castsFifteens 9531 = true := by decide

/-- 253c: nibbles fold back to 9532; digit sum 22 ≡ 9532 (mod 15). -/
theorem enumeration_hex4_253c : reassembles 9532 = true ∧ castsFifteens 9532 = true := by decide

/-- 253d: nibbles fold back to 9533; digit sum 23 ≡ 9533 (mod 15). -/
theorem enumeration_hex4_253d : reassembles 9533 = true ∧ castsFifteens 9533 = true := by decide

/-- 253e: nibbles fold back to 9534; digit sum 24 ≡ 9534 (mod 15). -/
theorem enumeration_hex4_253e : reassembles 9534 = true ∧ castsFifteens 9534 = true := by decide

/-- 253f: nibbles fold back to 9535; digit sum 25 ≡ 9535 (mod 15). -/
theorem enumeration_hex4_253f : reassembles 9535 = true ∧ castsFifteens 9535 = true := by decide

/-- 2540: nibbles fold back to 9536; digit sum 11 ≡ 9536 (mod 15). -/
theorem enumeration_hex4_2540 : reassembles 9536 = true ∧ castsFifteens 9536 = true := by decide

/-- 2541: nibbles fold back to 9537; digit sum 12 ≡ 9537 (mod 15). -/
theorem enumeration_hex4_2541 : reassembles 9537 = true ∧ castsFifteens 9537 = true := by decide

/-- 2542: nibbles fold back to 9538; digit sum 13 ≡ 9538 (mod 15). -/
theorem enumeration_hex4_2542 : reassembles 9538 = true ∧ castsFifteens 9538 = true := by decide

/-- 2543: nibbles fold back to 9539; digit sum 14 ≡ 9539 (mod 15). -/
theorem enumeration_hex4_2543 : reassembles 9539 = true ∧ castsFifteens 9539 = true := by decide

/-- 2544: nibbles fold back to 9540; digit sum 15 ≡ 9540 (mod 15). -/
theorem enumeration_hex4_2544 : reassembles 9540 = true ∧ castsFifteens 9540 = true := by decide

/-- 2545: nibbles fold back to 9541; digit sum 16 ≡ 9541 (mod 15). -/
theorem enumeration_hex4_2545 : reassembles 9541 = true ∧ castsFifteens 9541 = true := by decide

/-- 2546: nibbles fold back to 9542; digit sum 17 ≡ 9542 (mod 15). -/
theorem enumeration_hex4_2546 : reassembles 9542 = true ∧ castsFifteens 9542 = true := by decide

/-- 2547: nibbles fold back to 9543; digit sum 18 ≡ 9543 (mod 15). -/
theorem enumeration_hex4_2547 : reassembles 9543 = true ∧ castsFifteens 9543 = true := by decide

/-- 2548: nibbles fold back to 9544; digit sum 19 ≡ 9544 (mod 15). -/
theorem enumeration_hex4_2548 : reassembles 9544 = true ∧ castsFifteens 9544 = true := by decide

/-- 2549: nibbles fold back to 9545; digit sum 20 ≡ 9545 (mod 15). -/
theorem enumeration_hex4_2549 : reassembles 9545 = true ∧ castsFifteens 9545 = true := by decide

/-- 254a: nibbles fold back to 9546; digit sum 21 ≡ 9546 (mod 15). -/
theorem enumeration_hex4_254a : reassembles 9546 = true ∧ castsFifteens 9546 = true := by decide

/-- 254b: nibbles fold back to 9547; digit sum 22 ≡ 9547 (mod 15). -/
theorem enumeration_hex4_254b : reassembles 9547 = true ∧ castsFifteens 9547 = true := by decide

/-- 254c: nibbles fold back to 9548; digit sum 23 ≡ 9548 (mod 15). -/
theorem enumeration_hex4_254c : reassembles 9548 = true ∧ castsFifteens 9548 = true := by decide

/-- 254d: nibbles fold back to 9549; digit sum 24 ≡ 9549 (mod 15). -/
theorem enumeration_hex4_254d : reassembles 9549 = true ∧ castsFifteens 9549 = true := by decide

/-- 254e: nibbles fold back to 9550; digit sum 25 ≡ 9550 (mod 15). -/
theorem enumeration_hex4_254e : reassembles 9550 = true ∧ castsFifteens 9550 = true := by decide

/-- 254f: nibbles fold back to 9551; digit sum 26 ≡ 9551 (mod 15). -/
theorem enumeration_hex4_254f : reassembles 9551 = true ∧ castsFifteens 9551 = true := by decide

/-- 2550: nibbles fold back to 9552; digit sum 12 ≡ 9552 (mod 15). -/
theorem enumeration_hex4_2550 : reassembles 9552 = true ∧ castsFifteens 9552 = true := by decide

/-- 2551: nibbles fold back to 9553; digit sum 13 ≡ 9553 (mod 15). -/
theorem enumeration_hex4_2551 : reassembles 9553 = true ∧ castsFifteens 9553 = true := by decide

/-- 2552: nibbles fold back to 9554; digit sum 14 ≡ 9554 (mod 15). -/
theorem enumeration_hex4_2552 : reassembles 9554 = true ∧ castsFifteens 9554 = true := by decide

/-- 2553: nibbles fold back to 9555; digit sum 15 ≡ 9555 (mod 15). -/
theorem enumeration_hex4_2553 : reassembles 9555 = true ∧ castsFifteens 9555 = true := by decide

/-- 2554: nibbles fold back to 9556; digit sum 16 ≡ 9556 (mod 15). -/
theorem enumeration_hex4_2554 : reassembles 9556 = true ∧ castsFifteens 9556 = true := by decide

/-- 2555: nibbles fold back to 9557; digit sum 17 ≡ 9557 (mod 15). -/
theorem enumeration_hex4_2555 : reassembles 9557 = true ∧ castsFifteens 9557 = true := by decide

/-- 2556: nibbles fold back to 9558; digit sum 18 ≡ 9558 (mod 15). -/
theorem enumeration_hex4_2556 : reassembles 9558 = true ∧ castsFifteens 9558 = true := by decide

/-- 2557: nibbles fold back to 9559; digit sum 19 ≡ 9559 (mod 15). -/
theorem enumeration_hex4_2557 : reassembles 9559 = true ∧ castsFifteens 9559 = true := by decide

/-- 2558: nibbles fold back to 9560; digit sum 20 ≡ 9560 (mod 15). -/
theorem enumeration_hex4_2558 : reassembles 9560 = true ∧ castsFifteens 9560 = true := by decide

/-- 2559: nibbles fold back to 9561; digit sum 21 ≡ 9561 (mod 15). -/
theorem enumeration_hex4_2559 : reassembles 9561 = true ∧ castsFifteens 9561 = true := by decide

/-- 255a: nibbles fold back to 9562; digit sum 22 ≡ 9562 (mod 15). -/
theorem enumeration_hex4_255a : reassembles 9562 = true ∧ castsFifteens 9562 = true := by decide

/-- 255b: nibbles fold back to 9563; digit sum 23 ≡ 9563 (mod 15). -/
theorem enumeration_hex4_255b : reassembles 9563 = true ∧ castsFifteens 9563 = true := by decide

/-- 255c: nibbles fold back to 9564; digit sum 24 ≡ 9564 (mod 15). -/
theorem enumeration_hex4_255c : reassembles 9564 = true ∧ castsFifteens 9564 = true := by decide

/-- 255d: nibbles fold back to 9565; digit sum 25 ≡ 9565 (mod 15). -/
theorem enumeration_hex4_255d : reassembles 9565 = true ∧ castsFifteens 9565 = true := by decide

/-- 255e: nibbles fold back to 9566; digit sum 26 ≡ 9566 (mod 15). -/
theorem enumeration_hex4_255e : reassembles 9566 = true ∧ castsFifteens 9566 = true := by decide

/-- 255f: nibbles fold back to 9567; digit sum 27 ≡ 9567 (mod 15). -/
theorem enumeration_hex4_255f : reassembles 9567 = true ∧ castsFifteens 9567 = true := by decide

/-- 2560: nibbles fold back to 9568; digit sum 13 ≡ 9568 (mod 15). -/
theorem enumeration_hex4_2560 : reassembles 9568 = true ∧ castsFifteens 9568 = true := by decide

/-- 2561: nibbles fold back to 9569; digit sum 14 ≡ 9569 (mod 15). -/
theorem enumeration_hex4_2561 : reassembles 9569 = true ∧ castsFifteens 9569 = true := by decide

/-- 2562: nibbles fold back to 9570; digit sum 15 ≡ 9570 (mod 15). -/
theorem enumeration_hex4_2562 : reassembles 9570 = true ∧ castsFifteens 9570 = true := by decide

/-- 2563: nibbles fold back to 9571; digit sum 16 ≡ 9571 (mod 15). -/
theorem enumeration_hex4_2563 : reassembles 9571 = true ∧ castsFifteens 9571 = true := by decide

/-- 2564: nibbles fold back to 9572; digit sum 17 ≡ 9572 (mod 15). -/
theorem enumeration_hex4_2564 : reassembles 9572 = true ∧ castsFifteens 9572 = true := by decide

/-- 2565: nibbles fold back to 9573; digit sum 18 ≡ 9573 (mod 15). -/
theorem enumeration_hex4_2565 : reassembles 9573 = true ∧ castsFifteens 9573 = true := by decide

/-- 2566: nibbles fold back to 9574; digit sum 19 ≡ 9574 (mod 15). -/
theorem enumeration_hex4_2566 : reassembles 9574 = true ∧ castsFifteens 9574 = true := by decide

/-- 2567: nibbles fold back to 9575; digit sum 20 ≡ 9575 (mod 15). -/
theorem enumeration_hex4_2567 : reassembles 9575 = true ∧ castsFifteens 9575 = true := by decide

/-- 2568: nibbles fold back to 9576; digit sum 21 ≡ 9576 (mod 15). -/
theorem enumeration_hex4_2568 : reassembles 9576 = true ∧ castsFifteens 9576 = true := by decide

/-- 2569: nibbles fold back to 9577; digit sum 22 ≡ 9577 (mod 15). -/
theorem enumeration_hex4_2569 : reassembles 9577 = true ∧ castsFifteens 9577 = true := by decide

/-- 256a: nibbles fold back to 9578; digit sum 23 ≡ 9578 (mod 15). -/
theorem enumeration_hex4_256a : reassembles 9578 = true ∧ castsFifteens 9578 = true := by decide

/-- 256b: nibbles fold back to 9579; digit sum 24 ≡ 9579 (mod 15). -/
theorem enumeration_hex4_256b : reassembles 9579 = true ∧ castsFifteens 9579 = true := by decide

/-- 256c: nibbles fold back to 9580; digit sum 25 ≡ 9580 (mod 15). -/
theorem enumeration_hex4_256c : reassembles 9580 = true ∧ castsFifteens 9580 = true := by decide

/-- 256d: nibbles fold back to 9581; digit sum 26 ≡ 9581 (mod 15). -/
theorem enumeration_hex4_256d : reassembles 9581 = true ∧ castsFifteens 9581 = true := by decide

/-- 256e: nibbles fold back to 9582; digit sum 27 ≡ 9582 (mod 15). -/
theorem enumeration_hex4_256e : reassembles 9582 = true ∧ castsFifteens 9582 = true := by decide

/-- 256f: nibbles fold back to 9583; digit sum 28 ≡ 9583 (mod 15). -/
theorem enumeration_hex4_256f : reassembles 9583 = true ∧ castsFifteens 9583 = true := by decide

/-- 2570: nibbles fold back to 9584; digit sum 14 ≡ 9584 (mod 15). -/
theorem enumeration_hex4_2570 : reassembles 9584 = true ∧ castsFifteens 9584 = true := by decide

/-- 2571: nibbles fold back to 9585; digit sum 15 ≡ 9585 (mod 15). -/
theorem enumeration_hex4_2571 : reassembles 9585 = true ∧ castsFifteens 9585 = true := by decide

/-- 2572: nibbles fold back to 9586; digit sum 16 ≡ 9586 (mod 15). -/
theorem enumeration_hex4_2572 : reassembles 9586 = true ∧ castsFifteens 9586 = true := by decide

/-- 2573: nibbles fold back to 9587; digit sum 17 ≡ 9587 (mod 15). -/
theorem enumeration_hex4_2573 : reassembles 9587 = true ∧ castsFifteens 9587 = true := by decide

/-- 2574: nibbles fold back to 9588; digit sum 18 ≡ 9588 (mod 15). -/
theorem enumeration_hex4_2574 : reassembles 9588 = true ∧ castsFifteens 9588 = true := by decide

/-- 2575: nibbles fold back to 9589; digit sum 19 ≡ 9589 (mod 15). -/
theorem enumeration_hex4_2575 : reassembles 9589 = true ∧ castsFifteens 9589 = true := by decide

/-- 2576: nibbles fold back to 9590; digit sum 20 ≡ 9590 (mod 15). -/
theorem enumeration_hex4_2576 : reassembles 9590 = true ∧ castsFifteens 9590 = true := by decide

/-- 2577: nibbles fold back to 9591; digit sum 21 ≡ 9591 (mod 15). -/
theorem enumeration_hex4_2577 : reassembles 9591 = true ∧ castsFifteens 9591 = true := by decide

/-- 2578: nibbles fold back to 9592; digit sum 22 ≡ 9592 (mod 15). -/
theorem enumeration_hex4_2578 : reassembles 9592 = true ∧ castsFifteens 9592 = true := by decide

/-- 2579: nibbles fold back to 9593; digit sum 23 ≡ 9593 (mod 15). -/
theorem enumeration_hex4_2579 : reassembles 9593 = true ∧ castsFifteens 9593 = true := by decide

/-- 257a: nibbles fold back to 9594; digit sum 24 ≡ 9594 (mod 15). -/
theorem enumeration_hex4_257a : reassembles 9594 = true ∧ castsFifteens 9594 = true := by decide

/-- 257b: nibbles fold back to 9595; digit sum 25 ≡ 9595 (mod 15). -/
theorem enumeration_hex4_257b : reassembles 9595 = true ∧ castsFifteens 9595 = true := by decide

/-- 257c: nibbles fold back to 9596; digit sum 26 ≡ 9596 (mod 15). -/
theorem enumeration_hex4_257c : reassembles 9596 = true ∧ castsFifteens 9596 = true := by decide

/-- 257d: nibbles fold back to 9597; digit sum 27 ≡ 9597 (mod 15). -/
theorem enumeration_hex4_257d : reassembles 9597 = true ∧ castsFifteens 9597 = true := by decide

/-- 257e: nibbles fold back to 9598; digit sum 28 ≡ 9598 (mod 15). -/
theorem enumeration_hex4_257e : reassembles 9598 = true ∧ castsFifteens 9598 = true := by decide

/-- 257f: nibbles fold back to 9599; digit sum 29 ≡ 9599 (mod 15). -/
theorem enumeration_hex4_257f : reassembles 9599 = true ∧ castsFifteens 9599 = true := by decide

/-- 2580: nibbles fold back to 9600; digit sum 15 ≡ 9600 (mod 15). -/
theorem enumeration_hex4_2580 : reassembles 9600 = true ∧ castsFifteens 9600 = true := by decide

/-- 2581: nibbles fold back to 9601; digit sum 16 ≡ 9601 (mod 15). -/
theorem enumeration_hex4_2581 : reassembles 9601 = true ∧ castsFifteens 9601 = true := by decide

/-- 2582: nibbles fold back to 9602; digit sum 17 ≡ 9602 (mod 15). -/
theorem enumeration_hex4_2582 : reassembles 9602 = true ∧ castsFifteens 9602 = true := by decide

/-- 2583: nibbles fold back to 9603; digit sum 18 ≡ 9603 (mod 15). -/
theorem enumeration_hex4_2583 : reassembles 9603 = true ∧ castsFifteens 9603 = true := by decide

/-- 2584: nibbles fold back to 9604; digit sum 19 ≡ 9604 (mod 15). -/
theorem enumeration_hex4_2584 : reassembles 9604 = true ∧ castsFifteens 9604 = true := by decide

/-- 2585: nibbles fold back to 9605; digit sum 20 ≡ 9605 (mod 15). -/
theorem enumeration_hex4_2585 : reassembles 9605 = true ∧ castsFifteens 9605 = true := by decide

/-- 2586: nibbles fold back to 9606; digit sum 21 ≡ 9606 (mod 15). -/
theorem enumeration_hex4_2586 : reassembles 9606 = true ∧ castsFifteens 9606 = true := by decide

/-- 2587: nibbles fold back to 9607; digit sum 22 ≡ 9607 (mod 15). -/
theorem enumeration_hex4_2587 : reassembles 9607 = true ∧ castsFifteens 9607 = true := by decide

/-- 2588: nibbles fold back to 9608; digit sum 23 ≡ 9608 (mod 15). -/
theorem enumeration_hex4_2588 : reassembles 9608 = true ∧ castsFifteens 9608 = true := by decide

/-- 2589: nibbles fold back to 9609; digit sum 24 ≡ 9609 (mod 15). -/
theorem enumeration_hex4_2589 : reassembles 9609 = true ∧ castsFifteens 9609 = true := by decide

/-- 258a: nibbles fold back to 9610; digit sum 25 ≡ 9610 (mod 15). -/
theorem enumeration_hex4_258a : reassembles 9610 = true ∧ castsFifteens 9610 = true := by decide

/-- 258b: nibbles fold back to 9611; digit sum 26 ≡ 9611 (mod 15). -/
theorem enumeration_hex4_258b : reassembles 9611 = true ∧ castsFifteens 9611 = true := by decide

/-- 258c: nibbles fold back to 9612; digit sum 27 ≡ 9612 (mod 15). -/
theorem enumeration_hex4_258c : reassembles 9612 = true ∧ castsFifteens 9612 = true := by decide

/-- 258d: nibbles fold back to 9613; digit sum 28 ≡ 9613 (mod 15). -/
theorem enumeration_hex4_258d : reassembles 9613 = true ∧ castsFifteens 9613 = true := by decide

/-- 258e: nibbles fold back to 9614; digit sum 29 ≡ 9614 (mod 15). -/
theorem enumeration_hex4_258e : reassembles 9614 = true ∧ castsFifteens 9614 = true := by decide

/-- 258f: nibbles fold back to 9615; digit sum 30 ≡ 9615 (mod 15). -/
theorem enumeration_hex4_258f : reassembles 9615 = true ∧ castsFifteens 9615 = true := by decide

/-- 2590: nibbles fold back to 9616; digit sum 16 ≡ 9616 (mod 15). -/
theorem enumeration_hex4_2590 : reassembles 9616 = true ∧ castsFifteens 9616 = true := by decide

/-- 2591: nibbles fold back to 9617; digit sum 17 ≡ 9617 (mod 15). -/
theorem enumeration_hex4_2591 : reassembles 9617 = true ∧ castsFifteens 9617 = true := by decide

/-- 2592: nibbles fold back to 9618; digit sum 18 ≡ 9618 (mod 15). -/
theorem enumeration_hex4_2592 : reassembles 9618 = true ∧ castsFifteens 9618 = true := by decide

/-- 2593: nibbles fold back to 9619; digit sum 19 ≡ 9619 (mod 15). -/
theorem enumeration_hex4_2593 : reassembles 9619 = true ∧ castsFifteens 9619 = true := by decide

/-- 2594: nibbles fold back to 9620; digit sum 20 ≡ 9620 (mod 15). -/
theorem enumeration_hex4_2594 : reassembles 9620 = true ∧ castsFifteens 9620 = true := by decide

/-- 2595: nibbles fold back to 9621; digit sum 21 ≡ 9621 (mod 15). -/
theorem enumeration_hex4_2595 : reassembles 9621 = true ∧ castsFifteens 9621 = true := by decide

/-- 2596: nibbles fold back to 9622; digit sum 22 ≡ 9622 (mod 15). -/
theorem enumeration_hex4_2596 : reassembles 9622 = true ∧ castsFifteens 9622 = true := by decide

/-- 2597: nibbles fold back to 9623; digit sum 23 ≡ 9623 (mod 15). -/
theorem enumeration_hex4_2597 : reassembles 9623 = true ∧ castsFifteens 9623 = true := by decide

/-- 2598: nibbles fold back to 9624; digit sum 24 ≡ 9624 (mod 15). -/
theorem enumeration_hex4_2598 : reassembles 9624 = true ∧ castsFifteens 9624 = true := by decide

/-- 2599: nibbles fold back to 9625; digit sum 25 ≡ 9625 (mod 15). -/
theorem enumeration_hex4_2599 : reassembles 9625 = true ∧ castsFifteens 9625 = true := by decide

/-- 259a: nibbles fold back to 9626; digit sum 26 ≡ 9626 (mod 15). -/
theorem enumeration_hex4_259a : reassembles 9626 = true ∧ castsFifteens 9626 = true := by decide

/-- 259b: nibbles fold back to 9627; digit sum 27 ≡ 9627 (mod 15). -/
theorem enumeration_hex4_259b : reassembles 9627 = true ∧ castsFifteens 9627 = true := by decide

/-- 259c: nibbles fold back to 9628; digit sum 28 ≡ 9628 (mod 15). -/
theorem enumeration_hex4_259c : reassembles 9628 = true ∧ castsFifteens 9628 = true := by decide

/-- 259d: nibbles fold back to 9629; digit sum 29 ≡ 9629 (mod 15). -/
theorem enumeration_hex4_259d : reassembles 9629 = true ∧ castsFifteens 9629 = true := by decide

/-- 259e: nibbles fold back to 9630; digit sum 30 ≡ 9630 (mod 15). -/
theorem enumeration_hex4_259e : reassembles 9630 = true ∧ castsFifteens 9630 = true := by decide

/-- 259f: nibbles fold back to 9631; digit sum 31 ≡ 9631 (mod 15). -/
theorem enumeration_hex4_259f : reassembles 9631 = true ∧ castsFifteens 9631 = true := by decide

/-- 25a0: nibbles fold back to 9632; digit sum 17 ≡ 9632 (mod 15). -/
theorem enumeration_hex4_25a0 : reassembles 9632 = true ∧ castsFifteens 9632 = true := by decide

/-- 25a1: nibbles fold back to 9633; digit sum 18 ≡ 9633 (mod 15). -/
theorem enumeration_hex4_25a1 : reassembles 9633 = true ∧ castsFifteens 9633 = true := by decide

/-- 25a2: nibbles fold back to 9634; digit sum 19 ≡ 9634 (mod 15). -/
theorem enumeration_hex4_25a2 : reassembles 9634 = true ∧ castsFifteens 9634 = true := by decide

/-- 25a3: nibbles fold back to 9635; digit sum 20 ≡ 9635 (mod 15). -/
theorem enumeration_hex4_25a3 : reassembles 9635 = true ∧ castsFifteens 9635 = true := by decide

/-- 25a4: nibbles fold back to 9636; digit sum 21 ≡ 9636 (mod 15). -/
theorem enumeration_hex4_25a4 : reassembles 9636 = true ∧ castsFifteens 9636 = true := by decide

/-- 25a5: nibbles fold back to 9637; digit sum 22 ≡ 9637 (mod 15). -/
theorem enumeration_hex4_25a5 : reassembles 9637 = true ∧ castsFifteens 9637 = true := by decide

/-- 25a6: nibbles fold back to 9638; digit sum 23 ≡ 9638 (mod 15). -/
theorem enumeration_hex4_25a6 : reassembles 9638 = true ∧ castsFifteens 9638 = true := by decide

/-- 25a7: nibbles fold back to 9639; digit sum 24 ≡ 9639 (mod 15). -/
theorem enumeration_hex4_25a7 : reassembles 9639 = true ∧ castsFifteens 9639 = true := by decide

/-- 25a8: nibbles fold back to 9640; digit sum 25 ≡ 9640 (mod 15). -/
theorem enumeration_hex4_25a8 : reassembles 9640 = true ∧ castsFifteens 9640 = true := by decide

/-- 25a9: nibbles fold back to 9641; digit sum 26 ≡ 9641 (mod 15). -/
theorem enumeration_hex4_25a9 : reassembles 9641 = true ∧ castsFifteens 9641 = true := by decide

/-- 25aa: nibbles fold back to 9642; digit sum 27 ≡ 9642 (mod 15). -/
theorem enumeration_hex4_25aa : reassembles 9642 = true ∧ castsFifteens 9642 = true := by decide

/-- 25ab: nibbles fold back to 9643; digit sum 28 ≡ 9643 (mod 15). -/
theorem enumeration_hex4_25ab : reassembles 9643 = true ∧ castsFifteens 9643 = true := by decide

/-- 25ac: nibbles fold back to 9644; digit sum 29 ≡ 9644 (mod 15). -/
theorem enumeration_hex4_25ac : reassembles 9644 = true ∧ castsFifteens 9644 = true := by decide

/-- 25ad: nibbles fold back to 9645; digit sum 30 ≡ 9645 (mod 15). -/
theorem enumeration_hex4_25ad : reassembles 9645 = true ∧ castsFifteens 9645 = true := by decide

/-- 25ae: nibbles fold back to 9646; digit sum 31 ≡ 9646 (mod 15). -/
theorem enumeration_hex4_25ae : reassembles 9646 = true ∧ castsFifteens 9646 = true := by decide

/-- 25af: nibbles fold back to 9647; digit sum 32 ≡ 9647 (mod 15). -/
theorem enumeration_hex4_25af : reassembles 9647 = true ∧ castsFifteens 9647 = true := by decide

/-- 25b0: nibbles fold back to 9648; digit sum 18 ≡ 9648 (mod 15). -/
theorem enumeration_hex4_25b0 : reassembles 9648 = true ∧ castsFifteens 9648 = true := by decide

/-- 25b1: nibbles fold back to 9649; digit sum 19 ≡ 9649 (mod 15). -/
theorem enumeration_hex4_25b1 : reassembles 9649 = true ∧ castsFifteens 9649 = true := by decide

/-- 25b2: nibbles fold back to 9650; digit sum 20 ≡ 9650 (mod 15). -/
theorem enumeration_hex4_25b2 : reassembles 9650 = true ∧ castsFifteens 9650 = true := by decide

/-- 25b3: nibbles fold back to 9651; digit sum 21 ≡ 9651 (mod 15). -/
theorem enumeration_hex4_25b3 : reassembles 9651 = true ∧ castsFifteens 9651 = true := by decide

/-- 25b4: nibbles fold back to 9652; digit sum 22 ≡ 9652 (mod 15). -/
theorem enumeration_hex4_25b4 : reassembles 9652 = true ∧ castsFifteens 9652 = true := by decide

/-- 25b5: nibbles fold back to 9653; digit sum 23 ≡ 9653 (mod 15). -/
theorem enumeration_hex4_25b5 : reassembles 9653 = true ∧ castsFifteens 9653 = true := by decide

/-- 25b6: nibbles fold back to 9654; digit sum 24 ≡ 9654 (mod 15). -/
theorem enumeration_hex4_25b6 : reassembles 9654 = true ∧ castsFifteens 9654 = true := by decide

/-- 25b7: nibbles fold back to 9655; digit sum 25 ≡ 9655 (mod 15). -/
theorem enumeration_hex4_25b7 : reassembles 9655 = true ∧ castsFifteens 9655 = true := by decide

/-- 25b8: nibbles fold back to 9656; digit sum 26 ≡ 9656 (mod 15). -/
theorem enumeration_hex4_25b8 : reassembles 9656 = true ∧ castsFifteens 9656 = true := by decide

/-- 25b9: nibbles fold back to 9657; digit sum 27 ≡ 9657 (mod 15). -/
theorem enumeration_hex4_25b9 : reassembles 9657 = true ∧ castsFifteens 9657 = true := by decide

/-- 25ba: nibbles fold back to 9658; digit sum 28 ≡ 9658 (mod 15). -/
theorem enumeration_hex4_25ba : reassembles 9658 = true ∧ castsFifteens 9658 = true := by decide

/-- 25bb: nibbles fold back to 9659; digit sum 29 ≡ 9659 (mod 15). -/
theorem enumeration_hex4_25bb : reassembles 9659 = true ∧ castsFifteens 9659 = true := by decide

/-- 25bc: nibbles fold back to 9660; digit sum 30 ≡ 9660 (mod 15). -/
theorem enumeration_hex4_25bc : reassembles 9660 = true ∧ castsFifteens 9660 = true := by decide

/-- 25bd: nibbles fold back to 9661; digit sum 31 ≡ 9661 (mod 15). -/
theorem enumeration_hex4_25bd : reassembles 9661 = true ∧ castsFifteens 9661 = true := by decide

/-- 25be: nibbles fold back to 9662; digit sum 32 ≡ 9662 (mod 15). -/
theorem enumeration_hex4_25be : reassembles 9662 = true ∧ castsFifteens 9662 = true := by decide

/-- 25bf: nibbles fold back to 9663; digit sum 33 ≡ 9663 (mod 15). -/
theorem enumeration_hex4_25bf : reassembles 9663 = true ∧ castsFifteens 9663 = true := by decide

/-- 25c0: nibbles fold back to 9664; digit sum 19 ≡ 9664 (mod 15). -/
theorem enumeration_hex4_25c0 : reassembles 9664 = true ∧ castsFifteens 9664 = true := by decide

/-- 25c1: nibbles fold back to 9665; digit sum 20 ≡ 9665 (mod 15). -/
theorem enumeration_hex4_25c1 : reassembles 9665 = true ∧ castsFifteens 9665 = true := by decide

/-- 25c2: nibbles fold back to 9666; digit sum 21 ≡ 9666 (mod 15). -/
theorem enumeration_hex4_25c2 : reassembles 9666 = true ∧ castsFifteens 9666 = true := by decide

/-- 25c3: nibbles fold back to 9667; digit sum 22 ≡ 9667 (mod 15). -/
theorem enumeration_hex4_25c3 : reassembles 9667 = true ∧ castsFifteens 9667 = true := by decide

/-- 25c4: nibbles fold back to 9668; digit sum 23 ≡ 9668 (mod 15). -/
theorem enumeration_hex4_25c4 : reassembles 9668 = true ∧ castsFifteens 9668 = true := by decide

/-- 25c5: nibbles fold back to 9669; digit sum 24 ≡ 9669 (mod 15). -/
theorem enumeration_hex4_25c5 : reassembles 9669 = true ∧ castsFifteens 9669 = true := by decide

/-- 25c6: nibbles fold back to 9670; digit sum 25 ≡ 9670 (mod 15). -/
theorem enumeration_hex4_25c6 : reassembles 9670 = true ∧ castsFifteens 9670 = true := by decide

/-- 25c7: nibbles fold back to 9671; digit sum 26 ≡ 9671 (mod 15). -/
theorem enumeration_hex4_25c7 : reassembles 9671 = true ∧ castsFifteens 9671 = true := by decide

/-- 25c8: nibbles fold back to 9672; digit sum 27 ≡ 9672 (mod 15). -/
theorem enumeration_hex4_25c8 : reassembles 9672 = true ∧ castsFifteens 9672 = true := by decide

/-- 25c9: nibbles fold back to 9673; digit sum 28 ≡ 9673 (mod 15). -/
theorem enumeration_hex4_25c9 : reassembles 9673 = true ∧ castsFifteens 9673 = true := by decide

/-- 25ca: nibbles fold back to 9674; digit sum 29 ≡ 9674 (mod 15). -/
theorem enumeration_hex4_25ca : reassembles 9674 = true ∧ castsFifteens 9674 = true := by decide

/-- 25cb: nibbles fold back to 9675; digit sum 30 ≡ 9675 (mod 15). -/
theorem enumeration_hex4_25cb : reassembles 9675 = true ∧ castsFifteens 9675 = true := by decide

/-- 25cc: nibbles fold back to 9676; digit sum 31 ≡ 9676 (mod 15). -/
theorem enumeration_hex4_25cc : reassembles 9676 = true ∧ castsFifteens 9676 = true := by decide

/-- 25cd: nibbles fold back to 9677; digit sum 32 ≡ 9677 (mod 15). -/
theorem enumeration_hex4_25cd : reassembles 9677 = true ∧ castsFifteens 9677 = true := by decide

/-- 25ce: nibbles fold back to 9678; digit sum 33 ≡ 9678 (mod 15). -/
theorem enumeration_hex4_25ce : reassembles 9678 = true ∧ castsFifteens 9678 = true := by decide

/-- 25cf: nibbles fold back to 9679; digit sum 34 ≡ 9679 (mod 15). -/
theorem enumeration_hex4_25cf : reassembles 9679 = true ∧ castsFifteens 9679 = true := by decide

/-- 25d0: nibbles fold back to 9680; digit sum 20 ≡ 9680 (mod 15). -/
theorem enumeration_hex4_25d0 : reassembles 9680 = true ∧ castsFifteens 9680 = true := by decide

/-- 25d1: nibbles fold back to 9681; digit sum 21 ≡ 9681 (mod 15). -/
theorem enumeration_hex4_25d1 : reassembles 9681 = true ∧ castsFifteens 9681 = true := by decide

/-- 25d2: nibbles fold back to 9682; digit sum 22 ≡ 9682 (mod 15). -/
theorem enumeration_hex4_25d2 : reassembles 9682 = true ∧ castsFifteens 9682 = true := by decide

/-- 25d3: nibbles fold back to 9683; digit sum 23 ≡ 9683 (mod 15). -/
theorem enumeration_hex4_25d3 : reassembles 9683 = true ∧ castsFifteens 9683 = true := by decide

/-- 25d4: nibbles fold back to 9684; digit sum 24 ≡ 9684 (mod 15). -/
theorem enumeration_hex4_25d4 : reassembles 9684 = true ∧ castsFifteens 9684 = true := by decide

/-- 25d5: nibbles fold back to 9685; digit sum 25 ≡ 9685 (mod 15). -/
theorem enumeration_hex4_25d5 : reassembles 9685 = true ∧ castsFifteens 9685 = true := by decide

/-- 25d6: nibbles fold back to 9686; digit sum 26 ≡ 9686 (mod 15). -/
theorem enumeration_hex4_25d6 : reassembles 9686 = true ∧ castsFifteens 9686 = true := by decide

/-- 25d7: nibbles fold back to 9687; digit sum 27 ≡ 9687 (mod 15). -/
theorem enumeration_hex4_25d7 : reassembles 9687 = true ∧ castsFifteens 9687 = true := by decide

/-- 25d8: nibbles fold back to 9688; digit sum 28 ≡ 9688 (mod 15). -/
theorem enumeration_hex4_25d8 : reassembles 9688 = true ∧ castsFifteens 9688 = true := by decide

/-- 25d9: nibbles fold back to 9689; digit sum 29 ≡ 9689 (mod 15). -/
theorem enumeration_hex4_25d9 : reassembles 9689 = true ∧ castsFifteens 9689 = true := by decide

/-- 25da: nibbles fold back to 9690; digit sum 30 ≡ 9690 (mod 15). -/
theorem enumeration_hex4_25da : reassembles 9690 = true ∧ castsFifteens 9690 = true := by decide

/-- 25db: nibbles fold back to 9691; digit sum 31 ≡ 9691 (mod 15). -/
theorem enumeration_hex4_25db : reassembles 9691 = true ∧ castsFifteens 9691 = true := by decide

/-- 25dc: nibbles fold back to 9692; digit sum 32 ≡ 9692 (mod 15). -/
theorem enumeration_hex4_25dc : reassembles 9692 = true ∧ castsFifteens 9692 = true := by decide

/-- 25dd: nibbles fold back to 9693; digit sum 33 ≡ 9693 (mod 15). -/
theorem enumeration_hex4_25dd : reassembles 9693 = true ∧ castsFifteens 9693 = true := by decide

/-- 25de: nibbles fold back to 9694; digit sum 34 ≡ 9694 (mod 15). -/
theorem enumeration_hex4_25de : reassembles 9694 = true ∧ castsFifteens 9694 = true := by decide

/-- 25df: nibbles fold back to 9695; digit sum 35 ≡ 9695 (mod 15). -/
theorem enumeration_hex4_25df : reassembles 9695 = true ∧ castsFifteens 9695 = true := by decide

/-- 25e0: nibbles fold back to 9696; digit sum 21 ≡ 9696 (mod 15). -/
theorem enumeration_hex4_25e0 : reassembles 9696 = true ∧ castsFifteens 9696 = true := by decide

/-- 25e1: nibbles fold back to 9697; digit sum 22 ≡ 9697 (mod 15). -/
theorem enumeration_hex4_25e1 : reassembles 9697 = true ∧ castsFifteens 9697 = true := by decide

/-- 25e2: nibbles fold back to 9698; digit sum 23 ≡ 9698 (mod 15). -/
theorem enumeration_hex4_25e2 : reassembles 9698 = true ∧ castsFifteens 9698 = true := by decide

/-- 25e3: nibbles fold back to 9699; digit sum 24 ≡ 9699 (mod 15). -/
theorem enumeration_hex4_25e3 : reassembles 9699 = true ∧ castsFifteens 9699 = true := by decide

/-- 25e4: nibbles fold back to 9700; digit sum 25 ≡ 9700 (mod 15). -/
theorem enumeration_hex4_25e4 : reassembles 9700 = true ∧ castsFifteens 9700 = true := by decide

/-- 25e5: nibbles fold back to 9701; digit sum 26 ≡ 9701 (mod 15). -/
theorem enumeration_hex4_25e5 : reassembles 9701 = true ∧ castsFifteens 9701 = true := by decide

/-- 25e6: nibbles fold back to 9702; digit sum 27 ≡ 9702 (mod 15). -/
theorem enumeration_hex4_25e6 : reassembles 9702 = true ∧ castsFifteens 9702 = true := by decide

/-- 25e7: nibbles fold back to 9703; digit sum 28 ≡ 9703 (mod 15). -/
theorem enumeration_hex4_25e7 : reassembles 9703 = true ∧ castsFifteens 9703 = true := by decide

/-- 25e8: nibbles fold back to 9704; digit sum 29 ≡ 9704 (mod 15). -/
theorem enumeration_hex4_25e8 : reassembles 9704 = true ∧ castsFifteens 9704 = true := by decide

/-- 25e9: nibbles fold back to 9705; digit sum 30 ≡ 9705 (mod 15). -/
theorem enumeration_hex4_25e9 : reassembles 9705 = true ∧ castsFifteens 9705 = true := by decide

/-- 25ea: nibbles fold back to 9706; digit sum 31 ≡ 9706 (mod 15). -/
theorem enumeration_hex4_25ea : reassembles 9706 = true ∧ castsFifteens 9706 = true := by decide

/-- 25eb: nibbles fold back to 9707; digit sum 32 ≡ 9707 (mod 15). -/
theorem enumeration_hex4_25eb : reassembles 9707 = true ∧ castsFifteens 9707 = true := by decide

/-- 25ec: nibbles fold back to 9708; digit sum 33 ≡ 9708 (mod 15). -/
theorem enumeration_hex4_25ec : reassembles 9708 = true ∧ castsFifteens 9708 = true := by decide

/-- 25ed: nibbles fold back to 9709; digit sum 34 ≡ 9709 (mod 15). -/
theorem enumeration_hex4_25ed : reassembles 9709 = true ∧ castsFifteens 9709 = true := by decide

/-- 25ee: nibbles fold back to 9710; digit sum 35 ≡ 9710 (mod 15). -/
theorem enumeration_hex4_25ee : reassembles 9710 = true ∧ castsFifteens 9710 = true := by decide

/-- 25ef: nibbles fold back to 9711; digit sum 36 ≡ 9711 (mod 15). -/
theorem enumeration_hex4_25ef : reassembles 9711 = true ∧ castsFifteens 9711 = true := by decide

/-- 25f0: nibbles fold back to 9712; digit sum 22 ≡ 9712 (mod 15). -/
theorem enumeration_hex4_25f0 : reassembles 9712 = true ∧ castsFifteens 9712 = true := by decide

/-- 25f1: nibbles fold back to 9713; digit sum 23 ≡ 9713 (mod 15). -/
theorem enumeration_hex4_25f1 : reassembles 9713 = true ∧ castsFifteens 9713 = true := by decide

/-- 25f2: nibbles fold back to 9714; digit sum 24 ≡ 9714 (mod 15). -/
theorem enumeration_hex4_25f2 : reassembles 9714 = true ∧ castsFifteens 9714 = true := by decide

/-- 25f3: nibbles fold back to 9715; digit sum 25 ≡ 9715 (mod 15). -/
theorem enumeration_hex4_25f3 : reassembles 9715 = true ∧ castsFifteens 9715 = true := by decide

/-- 25f4: nibbles fold back to 9716; digit sum 26 ≡ 9716 (mod 15). -/
theorem enumeration_hex4_25f4 : reassembles 9716 = true ∧ castsFifteens 9716 = true := by decide

/-- 25f5: nibbles fold back to 9717; digit sum 27 ≡ 9717 (mod 15). -/
theorem enumeration_hex4_25f5 : reassembles 9717 = true ∧ castsFifteens 9717 = true := by decide

/-- 25f6: nibbles fold back to 9718; digit sum 28 ≡ 9718 (mod 15). -/
theorem enumeration_hex4_25f6 : reassembles 9718 = true ∧ castsFifteens 9718 = true := by decide

/-- 25f7: nibbles fold back to 9719; digit sum 29 ≡ 9719 (mod 15). -/
theorem enumeration_hex4_25f7 : reassembles 9719 = true ∧ castsFifteens 9719 = true := by decide

/-- 25f8: nibbles fold back to 9720; digit sum 30 ≡ 9720 (mod 15). -/
theorem enumeration_hex4_25f8 : reassembles 9720 = true ∧ castsFifteens 9720 = true := by decide

/-- 25f9: nibbles fold back to 9721; digit sum 31 ≡ 9721 (mod 15). -/
theorem enumeration_hex4_25f9 : reassembles 9721 = true ∧ castsFifteens 9721 = true := by decide

/-- 25fa: nibbles fold back to 9722; digit sum 32 ≡ 9722 (mod 15). -/
theorem enumeration_hex4_25fa : reassembles 9722 = true ∧ castsFifteens 9722 = true := by decide

/-- 25fb: nibbles fold back to 9723; digit sum 33 ≡ 9723 (mod 15). -/
theorem enumeration_hex4_25fb : reassembles 9723 = true ∧ castsFifteens 9723 = true := by decide

/-- 25fc: nibbles fold back to 9724; digit sum 34 ≡ 9724 (mod 15). -/
theorem enumeration_hex4_25fc : reassembles 9724 = true ∧ castsFifteens 9724 = true := by decide

/-- 25fd: nibbles fold back to 9725; digit sum 35 ≡ 9725 (mod 15). -/
theorem enumeration_hex4_25fd : reassembles 9725 = true ∧ castsFifteens 9725 = true := by decide

/-- 25fe: nibbles fold back to 9726; digit sum 36 ≡ 9726 (mod 15). -/
theorem enumeration_hex4_25fe : reassembles 9726 = true ∧ castsFifteens 9726 = true := by decide

/-- 25ff: nibbles fold back to 9727; digit sum 37 ≡ 9727 (mod 15). -/
theorem enumeration_hex4_25ff : reassembles 9727 = true ∧ castsFifteens 9727 = true := by decide

/-- 2600: nibbles fold back to 9728; digit sum 8 ≡ 9728 (mod 15). -/
theorem enumeration_hex4_2600 : reassembles 9728 = true ∧ castsFifteens 9728 = true := by decide

/-- 2601: nibbles fold back to 9729; digit sum 9 ≡ 9729 (mod 15). -/
theorem enumeration_hex4_2601 : reassembles 9729 = true ∧ castsFifteens 9729 = true := by decide

/-- 2602: nibbles fold back to 9730; digit sum 10 ≡ 9730 (mod 15). -/
theorem enumeration_hex4_2602 : reassembles 9730 = true ∧ castsFifteens 9730 = true := by decide

/-- 2603: nibbles fold back to 9731; digit sum 11 ≡ 9731 (mod 15). -/
theorem enumeration_hex4_2603 : reassembles 9731 = true ∧ castsFifteens 9731 = true := by decide

/-- 2604: nibbles fold back to 9732; digit sum 12 ≡ 9732 (mod 15). -/
theorem enumeration_hex4_2604 : reassembles 9732 = true ∧ castsFifteens 9732 = true := by decide

/-- 2605: nibbles fold back to 9733; digit sum 13 ≡ 9733 (mod 15). -/
theorem enumeration_hex4_2605 : reassembles 9733 = true ∧ castsFifteens 9733 = true := by decide

/-- 2606: nibbles fold back to 9734; digit sum 14 ≡ 9734 (mod 15). -/
theorem enumeration_hex4_2606 : reassembles 9734 = true ∧ castsFifteens 9734 = true := by decide

/-- 2607: nibbles fold back to 9735; digit sum 15 ≡ 9735 (mod 15). -/
theorem enumeration_hex4_2607 : reassembles 9735 = true ∧ castsFifteens 9735 = true := by decide

/-- 2608: nibbles fold back to 9736; digit sum 16 ≡ 9736 (mod 15). -/
theorem enumeration_hex4_2608 : reassembles 9736 = true ∧ castsFifteens 9736 = true := by decide

/-- 2609: nibbles fold back to 9737; digit sum 17 ≡ 9737 (mod 15). -/
theorem enumeration_hex4_2609 : reassembles 9737 = true ∧ castsFifteens 9737 = true := by decide

/-- 260a: nibbles fold back to 9738; digit sum 18 ≡ 9738 (mod 15). -/
theorem enumeration_hex4_260a : reassembles 9738 = true ∧ castsFifteens 9738 = true := by decide

/-- 260b: nibbles fold back to 9739; digit sum 19 ≡ 9739 (mod 15). -/
theorem enumeration_hex4_260b : reassembles 9739 = true ∧ castsFifteens 9739 = true := by decide

/-- 260c: nibbles fold back to 9740; digit sum 20 ≡ 9740 (mod 15). -/
theorem enumeration_hex4_260c : reassembles 9740 = true ∧ castsFifteens 9740 = true := by decide

/-- 260d: nibbles fold back to 9741; digit sum 21 ≡ 9741 (mod 15). -/
theorem enumeration_hex4_260d : reassembles 9741 = true ∧ castsFifteens 9741 = true := by decide

/-- 260e: nibbles fold back to 9742; digit sum 22 ≡ 9742 (mod 15). -/
theorem enumeration_hex4_260e : reassembles 9742 = true ∧ castsFifteens 9742 = true := by decide

/-- 260f: nibbles fold back to 9743; digit sum 23 ≡ 9743 (mod 15). -/
theorem enumeration_hex4_260f : reassembles 9743 = true ∧ castsFifteens 9743 = true := by decide

/-- 2610: nibbles fold back to 9744; digit sum 9 ≡ 9744 (mod 15). -/
theorem enumeration_hex4_2610 : reassembles 9744 = true ∧ castsFifteens 9744 = true := by decide

/-- 2611: nibbles fold back to 9745; digit sum 10 ≡ 9745 (mod 15). -/
theorem enumeration_hex4_2611 : reassembles 9745 = true ∧ castsFifteens 9745 = true := by decide

/-- 2612: nibbles fold back to 9746; digit sum 11 ≡ 9746 (mod 15). -/
theorem enumeration_hex4_2612 : reassembles 9746 = true ∧ castsFifteens 9746 = true := by decide

/-- 2613: nibbles fold back to 9747; digit sum 12 ≡ 9747 (mod 15). -/
theorem enumeration_hex4_2613 : reassembles 9747 = true ∧ castsFifteens 9747 = true := by decide

/-- 2614: nibbles fold back to 9748; digit sum 13 ≡ 9748 (mod 15). -/
theorem enumeration_hex4_2614 : reassembles 9748 = true ∧ castsFifteens 9748 = true := by decide

/-- 2615: nibbles fold back to 9749; digit sum 14 ≡ 9749 (mod 15). -/
theorem enumeration_hex4_2615 : reassembles 9749 = true ∧ castsFifteens 9749 = true := by decide

/-- 2616: nibbles fold back to 9750; digit sum 15 ≡ 9750 (mod 15). -/
theorem enumeration_hex4_2616 : reassembles 9750 = true ∧ castsFifteens 9750 = true := by decide

/-- 2617: nibbles fold back to 9751; digit sum 16 ≡ 9751 (mod 15). -/
theorem enumeration_hex4_2617 : reassembles 9751 = true ∧ castsFifteens 9751 = true := by decide

/-- 2618: nibbles fold back to 9752; digit sum 17 ≡ 9752 (mod 15). -/
theorem enumeration_hex4_2618 : reassembles 9752 = true ∧ castsFifteens 9752 = true := by decide

/-- 2619: nibbles fold back to 9753; digit sum 18 ≡ 9753 (mod 15). -/
theorem enumeration_hex4_2619 : reassembles 9753 = true ∧ castsFifteens 9753 = true := by decide

/-- 261a: nibbles fold back to 9754; digit sum 19 ≡ 9754 (mod 15). -/
theorem enumeration_hex4_261a : reassembles 9754 = true ∧ castsFifteens 9754 = true := by decide

/-- 261b: nibbles fold back to 9755; digit sum 20 ≡ 9755 (mod 15). -/
theorem enumeration_hex4_261b : reassembles 9755 = true ∧ castsFifteens 9755 = true := by decide

/-- 261c: nibbles fold back to 9756; digit sum 21 ≡ 9756 (mod 15). -/
theorem enumeration_hex4_261c : reassembles 9756 = true ∧ castsFifteens 9756 = true := by decide

/-- 261d: nibbles fold back to 9757; digit sum 22 ≡ 9757 (mod 15). -/
theorem enumeration_hex4_261d : reassembles 9757 = true ∧ castsFifteens 9757 = true := by decide

/-- 261e: nibbles fold back to 9758; digit sum 23 ≡ 9758 (mod 15). -/
theorem enumeration_hex4_261e : reassembles 9758 = true ∧ castsFifteens 9758 = true := by decide

/-- 261f: nibbles fold back to 9759; digit sum 24 ≡ 9759 (mod 15). -/
theorem enumeration_hex4_261f : reassembles 9759 = true ∧ castsFifteens 9759 = true := by decide

/-- 2620: nibbles fold back to 9760; digit sum 10 ≡ 9760 (mod 15). -/
theorem enumeration_hex4_2620 : reassembles 9760 = true ∧ castsFifteens 9760 = true := by decide

/-- 2621: nibbles fold back to 9761; digit sum 11 ≡ 9761 (mod 15). -/
theorem enumeration_hex4_2621 : reassembles 9761 = true ∧ castsFifteens 9761 = true := by decide

/-- 2622: nibbles fold back to 9762; digit sum 12 ≡ 9762 (mod 15). -/
theorem enumeration_hex4_2622 : reassembles 9762 = true ∧ castsFifteens 9762 = true := by decide

/-- 2623: nibbles fold back to 9763; digit sum 13 ≡ 9763 (mod 15). -/
theorem enumeration_hex4_2623 : reassembles 9763 = true ∧ castsFifteens 9763 = true := by decide

/-- 2624: nibbles fold back to 9764; digit sum 14 ≡ 9764 (mod 15). -/
theorem enumeration_hex4_2624 : reassembles 9764 = true ∧ castsFifteens 9764 = true := by decide

/-- 2625: nibbles fold back to 9765; digit sum 15 ≡ 9765 (mod 15). -/
theorem enumeration_hex4_2625 : reassembles 9765 = true ∧ castsFifteens 9765 = true := by decide

/-- 2626: nibbles fold back to 9766; digit sum 16 ≡ 9766 (mod 15). -/
theorem enumeration_hex4_2626 : reassembles 9766 = true ∧ castsFifteens 9766 = true := by decide

/-- 2627: nibbles fold back to 9767; digit sum 17 ≡ 9767 (mod 15). -/
theorem enumeration_hex4_2627 : reassembles 9767 = true ∧ castsFifteens 9767 = true := by decide

/-- 2628: nibbles fold back to 9768; digit sum 18 ≡ 9768 (mod 15). -/
theorem enumeration_hex4_2628 : reassembles 9768 = true ∧ castsFifteens 9768 = true := by decide

/-- 2629: nibbles fold back to 9769; digit sum 19 ≡ 9769 (mod 15). -/
theorem enumeration_hex4_2629 : reassembles 9769 = true ∧ castsFifteens 9769 = true := by decide

/-- 262a: nibbles fold back to 9770; digit sum 20 ≡ 9770 (mod 15). -/
theorem enumeration_hex4_262a : reassembles 9770 = true ∧ castsFifteens 9770 = true := by decide

/-- 262b: nibbles fold back to 9771; digit sum 21 ≡ 9771 (mod 15). -/
theorem enumeration_hex4_262b : reassembles 9771 = true ∧ castsFifteens 9771 = true := by decide

/-- 262c: nibbles fold back to 9772; digit sum 22 ≡ 9772 (mod 15). -/
theorem enumeration_hex4_262c : reassembles 9772 = true ∧ castsFifteens 9772 = true := by decide

/-- 262d: nibbles fold back to 9773; digit sum 23 ≡ 9773 (mod 15). -/
theorem enumeration_hex4_262d : reassembles 9773 = true ∧ castsFifteens 9773 = true := by decide

/-- 262e: nibbles fold back to 9774; digit sum 24 ≡ 9774 (mod 15). -/
theorem enumeration_hex4_262e : reassembles 9774 = true ∧ castsFifteens 9774 = true := by decide

/-- 262f: nibbles fold back to 9775; digit sum 25 ≡ 9775 (mod 15). -/
theorem enumeration_hex4_262f : reassembles 9775 = true ∧ castsFifteens 9775 = true := by decide

/-- 2630: nibbles fold back to 9776; digit sum 11 ≡ 9776 (mod 15). -/
theorem enumeration_hex4_2630 : reassembles 9776 = true ∧ castsFifteens 9776 = true := by decide

/-- 2631: nibbles fold back to 9777; digit sum 12 ≡ 9777 (mod 15). -/
theorem enumeration_hex4_2631 : reassembles 9777 = true ∧ castsFifteens 9777 = true := by decide

/-- 2632: nibbles fold back to 9778; digit sum 13 ≡ 9778 (mod 15). -/
theorem enumeration_hex4_2632 : reassembles 9778 = true ∧ castsFifteens 9778 = true := by decide

/-- 2633: nibbles fold back to 9779; digit sum 14 ≡ 9779 (mod 15). -/
theorem enumeration_hex4_2633 : reassembles 9779 = true ∧ castsFifteens 9779 = true := by decide

/-- 2634: nibbles fold back to 9780; digit sum 15 ≡ 9780 (mod 15). -/
theorem enumeration_hex4_2634 : reassembles 9780 = true ∧ castsFifteens 9780 = true := by decide

/-- 2635: nibbles fold back to 9781; digit sum 16 ≡ 9781 (mod 15). -/
theorem enumeration_hex4_2635 : reassembles 9781 = true ∧ castsFifteens 9781 = true := by decide

/-- 2636: nibbles fold back to 9782; digit sum 17 ≡ 9782 (mod 15). -/
theorem enumeration_hex4_2636 : reassembles 9782 = true ∧ castsFifteens 9782 = true := by decide

/-- 2637: nibbles fold back to 9783; digit sum 18 ≡ 9783 (mod 15). -/
theorem enumeration_hex4_2637 : reassembles 9783 = true ∧ castsFifteens 9783 = true := by decide

/-- 2638: nibbles fold back to 9784; digit sum 19 ≡ 9784 (mod 15). -/
theorem enumeration_hex4_2638 : reassembles 9784 = true ∧ castsFifteens 9784 = true := by decide

/-- 2639: nibbles fold back to 9785; digit sum 20 ≡ 9785 (mod 15). -/
theorem enumeration_hex4_2639 : reassembles 9785 = true ∧ castsFifteens 9785 = true := by decide

/-- 263a: nibbles fold back to 9786; digit sum 21 ≡ 9786 (mod 15). -/
theorem enumeration_hex4_263a : reassembles 9786 = true ∧ castsFifteens 9786 = true := by decide

/-- 263b: nibbles fold back to 9787; digit sum 22 ≡ 9787 (mod 15). -/
theorem enumeration_hex4_263b : reassembles 9787 = true ∧ castsFifteens 9787 = true := by decide

/-- 263c: nibbles fold back to 9788; digit sum 23 ≡ 9788 (mod 15). -/
theorem enumeration_hex4_263c : reassembles 9788 = true ∧ castsFifteens 9788 = true := by decide

/-- 263d: nibbles fold back to 9789; digit sum 24 ≡ 9789 (mod 15). -/
theorem enumeration_hex4_263d : reassembles 9789 = true ∧ castsFifteens 9789 = true := by decide

/-- 263e: nibbles fold back to 9790; digit sum 25 ≡ 9790 (mod 15). -/
theorem enumeration_hex4_263e : reassembles 9790 = true ∧ castsFifteens 9790 = true := by decide

/-- 263f: nibbles fold back to 9791; digit sum 26 ≡ 9791 (mod 15). -/
theorem enumeration_hex4_263f : reassembles 9791 = true ∧ castsFifteens 9791 = true := by decide

/-- 2640: nibbles fold back to 9792; digit sum 12 ≡ 9792 (mod 15). -/
theorem enumeration_hex4_2640 : reassembles 9792 = true ∧ castsFifteens 9792 = true := by decide

/-- 2641: nibbles fold back to 9793; digit sum 13 ≡ 9793 (mod 15). -/
theorem enumeration_hex4_2641 : reassembles 9793 = true ∧ castsFifteens 9793 = true := by decide

/-- 2642: nibbles fold back to 9794; digit sum 14 ≡ 9794 (mod 15). -/
theorem enumeration_hex4_2642 : reassembles 9794 = true ∧ castsFifteens 9794 = true := by decide

/-- 2643: nibbles fold back to 9795; digit sum 15 ≡ 9795 (mod 15). -/
theorem enumeration_hex4_2643 : reassembles 9795 = true ∧ castsFifteens 9795 = true := by decide

/-- 2644: nibbles fold back to 9796; digit sum 16 ≡ 9796 (mod 15). -/
theorem enumeration_hex4_2644 : reassembles 9796 = true ∧ castsFifteens 9796 = true := by decide

/-- 2645: nibbles fold back to 9797; digit sum 17 ≡ 9797 (mod 15). -/
theorem enumeration_hex4_2645 : reassembles 9797 = true ∧ castsFifteens 9797 = true := by decide

/-- 2646: nibbles fold back to 9798; digit sum 18 ≡ 9798 (mod 15). -/
theorem enumeration_hex4_2646 : reassembles 9798 = true ∧ castsFifteens 9798 = true := by decide

/-- 2647: nibbles fold back to 9799; digit sum 19 ≡ 9799 (mod 15). -/
theorem enumeration_hex4_2647 : reassembles 9799 = true ∧ castsFifteens 9799 = true := by decide

/-- 2648: nibbles fold back to 9800; digit sum 20 ≡ 9800 (mod 15). -/
theorem enumeration_hex4_2648 : reassembles 9800 = true ∧ castsFifteens 9800 = true := by decide

/-- 2649: nibbles fold back to 9801; digit sum 21 ≡ 9801 (mod 15). -/
theorem enumeration_hex4_2649 : reassembles 9801 = true ∧ castsFifteens 9801 = true := by decide

/-- 264a: nibbles fold back to 9802; digit sum 22 ≡ 9802 (mod 15). -/
theorem enumeration_hex4_264a : reassembles 9802 = true ∧ castsFifteens 9802 = true := by decide

/-- 264b: nibbles fold back to 9803; digit sum 23 ≡ 9803 (mod 15). -/
theorem enumeration_hex4_264b : reassembles 9803 = true ∧ castsFifteens 9803 = true := by decide

/-- 264c: nibbles fold back to 9804; digit sum 24 ≡ 9804 (mod 15). -/
theorem enumeration_hex4_264c : reassembles 9804 = true ∧ castsFifteens 9804 = true := by decide

/-- 264d: nibbles fold back to 9805; digit sum 25 ≡ 9805 (mod 15). -/
theorem enumeration_hex4_264d : reassembles 9805 = true ∧ castsFifteens 9805 = true := by decide

/-- 264e: nibbles fold back to 9806; digit sum 26 ≡ 9806 (mod 15). -/
theorem enumeration_hex4_264e : reassembles 9806 = true ∧ castsFifteens 9806 = true := by decide

/-- 264f: nibbles fold back to 9807; digit sum 27 ≡ 9807 (mod 15). -/
theorem enumeration_hex4_264f : reassembles 9807 = true ∧ castsFifteens 9807 = true := by decide

/-- 2650: nibbles fold back to 9808; digit sum 13 ≡ 9808 (mod 15). -/
theorem enumeration_hex4_2650 : reassembles 9808 = true ∧ castsFifteens 9808 = true := by decide

/-- 2651: nibbles fold back to 9809; digit sum 14 ≡ 9809 (mod 15). -/
theorem enumeration_hex4_2651 : reassembles 9809 = true ∧ castsFifteens 9809 = true := by decide

/-- 2652: nibbles fold back to 9810; digit sum 15 ≡ 9810 (mod 15). -/
theorem enumeration_hex4_2652 : reassembles 9810 = true ∧ castsFifteens 9810 = true := by decide

/-- 2653: nibbles fold back to 9811; digit sum 16 ≡ 9811 (mod 15). -/
theorem enumeration_hex4_2653 : reassembles 9811 = true ∧ castsFifteens 9811 = true := by decide

/-- 2654: nibbles fold back to 9812; digit sum 17 ≡ 9812 (mod 15). -/
theorem enumeration_hex4_2654 : reassembles 9812 = true ∧ castsFifteens 9812 = true := by decide

/-- 2655: nibbles fold back to 9813; digit sum 18 ≡ 9813 (mod 15). -/
theorem enumeration_hex4_2655 : reassembles 9813 = true ∧ castsFifteens 9813 = true := by decide

/-- 2656: nibbles fold back to 9814; digit sum 19 ≡ 9814 (mod 15). -/
theorem enumeration_hex4_2656 : reassembles 9814 = true ∧ castsFifteens 9814 = true := by decide

/-- 2657: nibbles fold back to 9815; digit sum 20 ≡ 9815 (mod 15). -/
theorem enumeration_hex4_2657 : reassembles 9815 = true ∧ castsFifteens 9815 = true := by decide

/-- 2658: nibbles fold back to 9816; digit sum 21 ≡ 9816 (mod 15). -/
theorem enumeration_hex4_2658 : reassembles 9816 = true ∧ castsFifteens 9816 = true := by decide

/-- 2659: nibbles fold back to 9817; digit sum 22 ≡ 9817 (mod 15). -/
theorem enumeration_hex4_2659 : reassembles 9817 = true ∧ castsFifteens 9817 = true := by decide

/-- 265a: nibbles fold back to 9818; digit sum 23 ≡ 9818 (mod 15). -/
theorem enumeration_hex4_265a : reassembles 9818 = true ∧ castsFifteens 9818 = true := by decide

/-- 265b: nibbles fold back to 9819; digit sum 24 ≡ 9819 (mod 15). -/
theorem enumeration_hex4_265b : reassembles 9819 = true ∧ castsFifteens 9819 = true := by decide

/-- 265c: nibbles fold back to 9820; digit sum 25 ≡ 9820 (mod 15). -/
theorem enumeration_hex4_265c : reassembles 9820 = true ∧ castsFifteens 9820 = true := by decide

/-- 265d: nibbles fold back to 9821; digit sum 26 ≡ 9821 (mod 15). -/
theorem enumeration_hex4_265d : reassembles 9821 = true ∧ castsFifteens 9821 = true := by decide

/-- 265e: nibbles fold back to 9822; digit sum 27 ≡ 9822 (mod 15). -/
theorem enumeration_hex4_265e : reassembles 9822 = true ∧ castsFifteens 9822 = true := by decide

/-- 265f: nibbles fold back to 9823; digit sum 28 ≡ 9823 (mod 15). -/
theorem enumeration_hex4_265f : reassembles 9823 = true ∧ castsFifteens 9823 = true := by decide

/-- 2660: nibbles fold back to 9824; digit sum 14 ≡ 9824 (mod 15). -/
theorem enumeration_hex4_2660 : reassembles 9824 = true ∧ castsFifteens 9824 = true := by decide

/-- 2661: nibbles fold back to 9825; digit sum 15 ≡ 9825 (mod 15). -/
theorem enumeration_hex4_2661 : reassembles 9825 = true ∧ castsFifteens 9825 = true := by decide

/-- 2662: nibbles fold back to 9826; digit sum 16 ≡ 9826 (mod 15). -/
theorem enumeration_hex4_2662 : reassembles 9826 = true ∧ castsFifteens 9826 = true := by decide

/-- 2663: nibbles fold back to 9827; digit sum 17 ≡ 9827 (mod 15). -/
theorem enumeration_hex4_2663 : reassembles 9827 = true ∧ castsFifteens 9827 = true := by decide

/-- 2664: nibbles fold back to 9828; digit sum 18 ≡ 9828 (mod 15). -/
theorem enumeration_hex4_2664 : reassembles 9828 = true ∧ castsFifteens 9828 = true := by decide

/-- 2665: nibbles fold back to 9829; digit sum 19 ≡ 9829 (mod 15). -/
theorem enumeration_hex4_2665 : reassembles 9829 = true ∧ castsFifteens 9829 = true := by decide

/-- 2666: nibbles fold back to 9830; digit sum 20 ≡ 9830 (mod 15). -/
theorem enumeration_hex4_2666 : reassembles 9830 = true ∧ castsFifteens 9830 = true := by decide

/-- 2667: nibbles fold back to 9831; digit sum 21 ≡ 9831 (mod 15). -/
theorem enumeration_hex4_2667 : reassembles 9831 = true ∧ castsFifteens 9831 = true := by decide

/-- 2668: nibbles fold back to 9832; digit sum 22 ≡ 9832 (mod 15). -/
theorem enumeration_hex4_2668 : reassembles 9832 = true ∧ castsFifteens 9832 = true := by decide

/-- 2669: nibbles fold back to 9833; digit sum 23 ≡ 9833 (mod 15). -/
theorem enumeration_hex4_2669 : reassembles 9833 = true ∧ castsFifteens 9833 = true := by decide

/-- 266a: nibbles fold back to 9834; digit sum 24 ≡ 9834 (mod 15). -/
theorem enumeration_hex4_266a : reassembles 9834 = true ∧ castsFifteens 9834 = true := by decide

/-- 266b: nibbles fold back to 9835; digit sum 25 ≡ 9835 (mod 15). -/
theorem enumeration_hex4_266b : reassembles 9835 = true ∧ castsFifteens 9835 = true := by decide

/-- 266c: nibbles fold back to 9836; digit sum 26 ≡ 9836 (mod 15). -/
theorem enumeration_hex4_266c : reassembles 9836 = true ∧ castsFifteens 9836 = true := by decide

/-- 266d: nibbles fold back to 9837; digit sum 27 ≡ 9837 (mod 15). -/
theorem enumeration_hex4_266d : reassembles 9837 = true ∧ castsFifteens 9837 = true := by decide

/-- 266e: nibbles fold back to 9838; digit sum 28 ≡ 9838 (mod 15). -/
theorem enumeration_hex4_266e : reassembles 9838 = true ∧ castsFifteens 9838 = true := by decide

/-- 266f: nibbles fold back to 9839; digit sum 29 ≡ 9839 (mod 15). -/
theorem enumeration_hex4_266f : reassembles 9839 = true ∧ castsFifteens 9839 = true := by decide

/-- 2670: nibbles fold back to 9840; digit sum 15 ≡ 9840 (mod 15). -/
theorem enumeration_hex4_2670 : reassembles 9840 = true ∧ castsFifteens 9840 = true := by decide

/-- 2671: nibbles fold back to 9841; digit sum 16 ≡ 9841 (mod 15). -/
theorem enumeration_hex4_2671 : reassembles 9841 = true ∧ castsFifteens 9841 = true := by decide

/-- 2672: nibbles fold back to 9842; digit sum 17 ≡ 9842 (mod 15). -/
theorem enumeration_hex4_2672 : reassembles 9842 = true ∧ castsFifteens 9842 = true := by decide

/-- 2673: nibbles fold back to 9843; digit sum 18 ≡ 9843 (mod 15). -/
theorem enumeration_hex4_2673 : reassembles 9843 = true ∧ castsFifteens 9843 = true := by decide

/-- 2674: nibbles fold back to 9844; digit sum 19 ≡ 9844 (mod 15). -/
theorem enumeration_hex4_2674 : reassembles 9844 = true ∧ castsFifteens 9844 = true := by decide

/-- 2675: nibbles fold back to 9845; digit sum 20 ≡ 9845 (mod 15). -/
theorem enumeration_hex4_2675 : reassembles 9845 = true ∧ castsFifteens 9845 = true := by decide

/-- 2676: nibbles fold back to 9846; digit sum 21 ≡ 9846 (mod 15). -/
theorem enumeration_hex4_2676 : reassembles 9846 = true ∧ castsFifteens 9846 = true := by decide

/-- 2677: nibbles fold back to 9847; digit sum 22 ≡ 9847 (mod 15). -/
theorem enumeration_hex4_2677 : reassembles 9847 = true ∧ castsFifteens 9847 = true := by decide

/-- 2678: nibbles fold back to 9848; digit sum 23 ≡ 9848 (mod 15). -/
theorem enumeration_hex4_2678 : reassembles 9848 = true ∧ castsFifteens 9848 = true := by decide

/-- 2679: nibbles fold back to 9849; digit sum 24 ≡ 9849 (mod 15). -/
theorem enumeration_hex4_2679 : reassembles 9849 = true ∧ castsFifteens 9849 = true := by decide

/-- 267a: nibbles fold back to 9850; digit sum 25 ≡ 9850 (mod 15). -/
theorem enumeration_hex4_267a : reassembles 9850 = true ∧ castsFifteens 9850 = true := by decide

/-- 267b: nibbles fold back to 9851; digit sum 26 ≡ 9851 (mod 15). -/
theorem enumeration_hex4_267b : reassembles 9851 = true ∧ castsFifteens 9851 = true := by decide

/-- 267c: nibbles fold back to 9852; digit sum 27 ≡ 9852 (mod 15). -/
theorem enumeration_hex4_267c : reassembles 9852 = true ∧ castsFifteens 9852 = true := by decide

/-- 267d: nibbles fold back to 9853; digit sum 28 ≡ 9853 (mod 15). -/
theorem enumeration_hex4_267d : reassembles 9853 = true ∧ castsFifteens 9853 = true := by decide

/-- 267e: nibbles fold back to 9854; digit sum 29 ≡ 9854 (mod 15). -/
theorem enumeration_hex4_267e : reassembles 9854 = true ∧ castsFifteens 9854 = true := by decide

/-- 267f: nibbles fold back to 9855; digit sum 30 ≡ 9855 (mod 15). -/
theorem enumeration_hex4_267f : reassembles 9855 = true ∧ castsFifteens 9855 = true := by decide

/-- 2680: nibbles fold back to 9856; digit sum 16 ≡ 9856 (mod 15). -/
theorem enumeration_hex4_2680 : reassembles 9856 = true ∧ castsFifteens 9856 = true := by decide

/-- 2681: nibbles fold back to 9857; digit sum 17 ≡ 9857 (mod 15). -/
theorem enumeration_hex4_2681 : reassembles 9857 = true ∧ castsFifteens 9857 = true := by decide

/-- 2682: nibbles fold back to 9858; digit sum 18 ≡ 9858 (mod 15). -/
theorem enumeration_hex4_2682 : reassembles 9858 = true ∧ castsFifteens 9858 = true := by decide

/-- 2683: nibbles fold back to 9859; digit sum 19 ≡ 9859 (mod 15). -/
theorem enumeration_hex4_2683 : reassembles 9859 = true ∧ castsFifteens 9859 = true := by decide

/-- 2684: nibbles fold back to 9860; digit sum 20 ≡ 9860 (mod 15). -/
theorem enumeration_hex4_2684 : reassembles 9860 = true ∧ castsFifteens 9860 = true := by decide

/-- 2685: nibbles fold back to 9861; digit sum 21 ≡ 9861 (mod 15). -/
theorem enumeration_hex4_2685 : reassembles 9861 = true ∧ castsFifteens 9861 = true := by decide

/-- 2686: nibbles fold back to 9862; digit sum 22 ≡ 9862 (mod 15). -/
theorem enumeration_hex4_2686 : reassembles 9862 = true ∧ castsFifteens 9862 = true := by decide

/-- 2687: nibbles fold back to 9863; digit sum 23 ≡ 9863 (mod 15). -/
theorem enumeration_hex4_2687 : reassembles 9863 = true ∧ castsFifteens 9863 = true := by decide

/-- 2688: nibbles fold back to 9864; digit sum 24 ≡ 9864 (mod 15). -/
theorem enumeration_hex4_2688 : reassembles 9864 = true ∧ castsFifteens 9864 = true := by decide

/-- 2689: nibbles fold back to 9865; digit sum 25 ≡ 9865 (mod 15). -/
theorem enumeration_hex4_2689 : reassembles 9865 = true ∧ castsFifteens 9865 = true := by decide

/-- 268a: nibbles fold back to 9866; digit sum 26 ≡ 9866 (mod 15). -/
theorem enumeration_hex4_268a : reassembles 9866 = true ∧ castsFifteens 9866 = true := by decide

/-- 268b: nibbles fold back to 9867; digit sum 27 ≡ 9867 (mod 15). -/
theorem enumeration_hex4_268b : reassembles 9867 = true ∧ castsFifteens 9867 = true := by decide

/-- 268c: nibbles fold back to 9868; digit sum 28 ≡ 9868 (mod 15). -/
theorem enumeration_hex4_268c : reassembles 9868 = true ∧ castsFifteens 9868 = true := by decide

/-- 268d: nibbles fold back to 9869; digit sum 29 ≡ 9869 (mod 15). -/
theorem enumeration_hex4_268d : reassembles 9869 = true ∧ castsFifteens 9869 = true := by decide

/-- 268e: nibbles fold back to 9870; digit sum 30 ≡ 9870 (mod 15). -/
theorem enumeration_hex4_268e : reassembles 9870 = true ∧ castsFifteens 9870 = true := by decide

/-- 268f: nibbles fold back to 9871; digit sum 31 ≡ 9871 (mod 15). -/
theorem enumeration_hex4_268f : reassembles 9871 = true ∧ castsFifteens 9871 = true := by decide

/-- 2690: nibbles fold back to 9872; digit sum 17 ≡ 9872 (mod 15). -/
theorem enumeration_hex4_2690 : reassembles 9872 = true ∧ castsFifteens 9872 = true := by decide

/-- 2691: nibbles fold back to 9873; digit sum 18 ≡ 9873 (mod 15). -/
theorem enumeration_hex4_2691 : reassembles 9873 = true ∧ castsFifteens 9873 = true := by decide

/-- 2692: nibbles fold back to 9874; digit sum 19 ≡ 9874 (mod 15). -/
theorem enumeration_hex4_2692 : reassembles 9874 = true ∧ castsFifteens 9874 = true := by decide

/-- 2693: nibbles fold back to 9875; digit sum 20 ≡ 9875 (mod 15). -/
theorem enumeration_hex4_2693 : reassembles 9875 = true ∧ castsFifteens 9875 = true := by decide

/-- 2694: nibbles fold back to 9876; digit sum 21 ≡ 9876 (mod 15). -/
theorem enumeration_hex4_2694 : reassembles 9876 = true ∧ castsFifteens 9876 = true := by decide

/-- 2695: nibbles fold back to 9877; digit sum 22 ≡ 9877 (mod 15). -/
theorem enumeration_hex4_2695 : reassembles 9877 = true ∧ castsFifteens 9877 = true := by decide

/-- 2696: nibbles fold back to 9878; digit sum 23 ≡ 9878 (mod 15). -/
theorem enumeration_hex4_2696 : reassembles 9878 = true ∧ castsFifteens 9878 = true := by decide

/-- 2697: nibbles fold back to 9879; digit sum 24 ≡ 9879 (mod 15). -/
theorem enumeration_hex4_2697 : reassembles 9879 = true ∧ castsFifteens 9879 = true := by decide

/-- 2698: nibbles fold back to 9880; digit sum 25 ≡ 9880 (mod 15). -/
theorem enumeration_hex4_2698 : reassembles 9880 = true ∧ castsFifteens 9880 = true := by decide

/-- 2699: nibbles fold back to 9881; digit sum 26 ≡ 9881 (mod 15). -/
theorem enumeration_hex4_2699 : reassembles 9881 = true ∧ castsFifteens 9881 = true := by decide

/-- 269a: nibbles fold back to 9882; digit sum 27 ≡ 9882 (mod 15). -/
theorem enumeration_hex4_269a : reassembles 9882 = true ∧ castsFifteens 9882 = true := by decide

/-- 269b: nibbles fold back to 9883; digit sum 28 ≡ 9883 (mod 15). -/
theorem enumeration_hex4_269b : reassembles 9883 = true ∧ castsFifteens 9883 = true := by decide

/-- 269c: nibbles fold back to 9884; digit sum 29 ≡ 9884 (mod 15). -/
theorem enumeration_hex4_269c : reassembles 9884 = true ∧ castsFifteens 9884 = true := by decide

/-- 269d: nibbles fold back to 9885; digit sum 30 ≡ 9885 (mod 15). -/
theorem enumeration_hex4_269d : reassembles 9885 = true ∧ castsFifteens 9885 = true := by decide

/-- 269e: nibbles fold back to 9886; digit sum 31 ≡ 9886 (mod 15). -/
theorem enumeration_hex4_269e : reassembles 9886 = true ∧ castsFifteens 9886 = true := by decide

/-- 269f: nibbles fold back to 9887; digit sum 32 ≡ 9887 (mod 15). -/
theorem enumeration_hex4_269f : reassembles 9887 = true ∧ castsFifteens 9887 = true := by decide

/-- 26a0: nibbles fold back to 9888; digit sum 18 ≡ 9888 (mod 15). -/
theorem enumeration_hex4_26a0 : reassembles 9888 = true ∧ castsFifteens 9888 = true := by decide

/-- 26a1: nibbles fold back to 9889; digit sum 19 ≡ 9889 (mod 15). -/
theorem enumeration_hex4_26a1 : reassembles 9889 = true ∧ castsFifteens 9889 = true := by decide

/-- 26a2: nibbles fold back to 9890; digit sum 20 ≡ 9890 (mod 15). -/
theorem enumeration_hex4_26a2 : reassembles 9890 = true ∧ castsFifteens 9890 = true := by decide

/-- 26a3: nibbles fold back to 9891; digit sum 21 ≡ 9891 (mod 15). -/
theorem enumeration_hex4_26a3 : reassembles 9891 = true ∧ castsFifteens 9891 = true := by decide

/-- 26a4: nibbles fold back to 9892; digit sum 22 ≡ 9892 (mod 15). -/
theorem enumeration_hex4_26a4 : reassembles 9892 = true ∧ castsFifteens 9892 = true := by decide

/-- 26a5: nibbles fold back to 9893; digit sum 23 ≡ 9893 (mod 15). -/
theorem enumeration_hex4_26a5 : reassembles 9893 = true ∧ castsFifteens 9893 = true := by decide

/-- 26a6: nibbles fold back to 9894; digit sum 24 ≡ 9894 (mod 15). -/
theorem enumeration_hex4_26a6 : reassembles 9894 = true ∧ castsFifteens 9894 = true := by decide

/-- 26a7: nibbles fold back to 9895; digit sum 25 ≡ 9895 (mod 15). -/
theorem enumeration_hex4_26a7 : reassembles 9895 = true ∧ castsFifteens 9895 = true := by decide

/-- 26a8: nibbles fold back to 9896; digit sum 26 ≡ 9896 (mod 15). -/
theorem enumeration_hex4_26a8 : reassembles 9896 = true ∧ castsFifteens 9896 = true := by decide

/-- 26a9: nibbles fold back to 9897; digit sum 27 ≡ 9897 (mod 15). -/
theorem enumeration_hex4_26a9 : reassembles 9897 = true ∧ castsFifteens 9897 = true := by decide

/-- 26aa: nibbles fold back to 9898; digit sum 28 ≡ 9898 (mod 15). -/
theorem enumeration_hex4_26aa : reassembles 9898 = true ∧ castsFifteens 9898 = true := by decide

/-- 26ab: nibbles fold back to 9899; digit sum 29 ≡ 9899 (mod 15). -/
theorem enumeration_hex4_26ab : reassembles 9899 = true ∧ castsFifteens 9899 = true := by decide

/-- 26ac: nibbles fold back to 9900; digit sum 30 ≡ 9900 (mod 15). -/
theorem enumeration_hex4_26ac : reassembles 9900 = true ∧ castsFifteens 9900 = true := by decide

/-- 26ad: nibbles fold back to 9901; digit sum 31 ≡ 9901 (mod 15). -/
theorem enumeration_hex4_26ad : reassembles 9901 = true ∧ castsFifteens 9901 = true := by decide

/-- 26ae: nibbles fold back to 9902; digit sum 32 ≡ 9902 (mod 15). -/
theorem enumeration_hex4_26ae : reassembles 9902 = true ∧ castsFifteens 9902 = true := by decide

/-- 26af: nibbles fold back to 9903; digit sum 33 ≡ 9903 (mod 15). -/
theorem enumeration_hex4_26af : reassembles 9903 = true ∧ castsFifteens 9903 = true := by decide

/-- 26b0: nibbles fold back to 9904; digit sum 19 ≡ 9904 (mod 15). -/
theorem enumeration_hex4_26b0 : reassembles 9904 = true ∧ castsFifteens 9904 = true := by decide

/-- 26b1: nibbles fold back to 9905; digit sum 20 ≡ 9905 (mod 15). -/
theorem enumeration_hex4_26b1 : reassembles 9905 = true ∧ castsFifteens 9905 = true := by decide

/-- 26b2: nibbles fold back to 9906; digit sum 21 ≡ 9906 (mod 15). -/
theorem enumeration_hex4_26b2 : reassembles 9906 = true ∧ castsFifteens 9906 = true := by decide

/-- 26b3: nibbles fold back to 9907; digit sum 22 ≡ 9907 (mod 15). -/
theorem enumeration_hex4_26b3 : reassembles 9907 = true ∧ castsFifteens 9907 = true := by decide

/-- 26b4: nibbles fold back to 9908; digit sum 23 ≡ 9908 (mod 15). -/
theorem enumeration_hex4_26b4 : reassembles 9908 = true ∧ castsFifteens 9908 = true := by decide

/-- 26b5: nibbles fold back to 9909; digit sum 24 ≡ 9909 (mod 15). -/
theorem enumeration_hex4_26b5 : reassembles 9909 = true ∧ castsFifteens 9909 = true := by decide

/-- 26b6: nibbles fold back to 9910; digit sum 25 ≡ 9910 (mod 15). -/
theorem enumeration_hex4_26b6 : reassembles 9910 = true ∧ castsFifteens 9910 = true := by decide

/-- 26b7: nibbles fold back to 9911; digit sum 26 ≡ 9911 (mod 15). -/
theorem enumeration_hex4_26b7 : reassembles 9911 = true ∧ castsFifteens 9911 = true := by decide

/-- 26b8: nibbles fold back to 9912; digit sum 27 ≡ 9912 (mod 15). -/
theorem enumeration_hex4_26b8 : reassembles 9912 = true ∧ castsFifteens 9912 = true := by decide

/-- 26b9: nibbles fold back to 9913; digit sum 28 ≡ 9913 (mod 15). -/
theorem enumeration_hex4_26b9 : reassembles 9913 = true ∧ castsFifteens 9913 = true := by decide

/-- 26ba: nibbles fold back to 9914; digit sum 29 ≡ 9914 (mod 15). -/
theorem enumeration_hex4_26ba : reassembles 9914 = true ∧ castsFifteens 9914 = true := by decide

/-- 26bb: nibbles fold back to 9915; digit sum 30 ≡ 9915 (mod 15). -/
theorem enumeration_hex4_26bb : reassembles 9915 = true ∧ castsFifteens 9915 = true := by decide

/-- 26bc: nibbles fold back to 9916; digit sum 31 ≡ 9916 (mod 15). -/
theorem enumeration_hex4_26bc : reassembles 9916 = true ∧ castsFifteens 9916 = true := by decide

/-- 26bd: nibbles fold back to 9917; digit sum 32 ≡ 9917 (mod 15). -/
theorem enumeration_hex4_26bd : reassembles 9917 = true ∧ castsFifteens 9917 = true := by decide

/-- 26be: nibbles fold back to 9918; digit sum 33 ≡ 9918 (mod 15). -/
theorem enumeration_hex4_26be : reassembles 9918 = true ∧ castsFifteens 9918 = true := by decide

/-- 26bf: nibbles fold back to 9919; digit sum 34 ≡ 9919 (mod 15). -/
theorem enumeration_hex4_26bf : reassembles 9919 = true ∧ castsFifteens 9919 = true := by decide

/-- 26c0: nibbles fold back to 9920; digit sum 20 ≡ 9920 (mod 15). -/
theorem enumeration_hex4_26c0 : reassembles 9920 = true ∧ castsFifteens 9920 = true := by decide

/-- 26c1: nibbles fold back to 9921; digit sum 21 ≡ 9921 (mod 15). -/
theorem enumeration_hex4_26c1 : reassembles 9921 = true ∧ castsFifteens 9921 = true := by decide

/-- 26c2: nibbles fold back to 9922; digit sum 22 ≡ 9922 (mod 15). -/
theorem enumeration_hex4_26c2 : reassembles 9922 = true ∧ castsFifteens 9922 = true := by decide

/-- 26c3: nibbles fold back to 9923; digit sum 23 ≡ 9923 (mod 15). -/
theorem enumeration_hex4_26c3 : reassembles 9923 = true ∧ castsFifteens 9923 = true := by decide

/-- 26c4: nibbles fold back to 9924; digit sum 24 ≡ 9924 (mod 15). -/
theorem enumeration_hex4_26c4 : reassembles 9924 = true ∧ castsFifteens 9924 = true := by decide

/-- 26c5: nibbles fold back to 9925; digit sum 25 ≡ 9925 (mod 15). -/
theorem enumeration_hex4_26c5 : reassembles 9925 = true ∧ castsFifteens 9925 = true := by decide

/-- 26c6: nibbles fold back to 9926; digit sum 26 ≡ 9926 (mod 15). -/
theorem enumeration_hex4_26c6 : reassembles 9926 = true ∧ castsFifteens 9926 = true := by decide

/-- 26c7: nibbles fold back to 9927; digit sum 27 ≡ 9927 (mod 15). -/
theorem enumeration_hex4_26c7 : reassembles 9927 = true ∧ castsFifteens 9927 = true := by decide

/-- 26c8: nibbles fold back to 9928; digit sum 28 ≡ 9928 (mod 15). -/
theorem enumeration_hex4_26c8 : reassembles 9928 = true ∧ castsFifteens 9928 = true := by decide

/-- 26c9: nibbles fold back to 9929; digit sum 29 ≡ 9929 (mod 15). -/
theorem enumeration_hex4_26c9 : reassembles 9929 = true ∧ castsFifteens 9929 = true := by decide

/-- 26ca: nibbles fold back to 9930; digit sum 30 ≡ 9930 (mod 15). -/
theorem enumeration_hex4_26ca : reassembles 9930 = true ∧ castsFifteens 9930 = true := by decide

/-- 26cb: nibbles fold back to 9931; digit sum 31 ≡ 9931 (mod 15). -/
theorem enumeration_hex4_26cb : reassembles 9931 = true ∧ castsFifteens 9931 = true := by decide

/-- 26cc: nibbles fold back to 9932; digit sum 32 ≡ 9932 (mod 15). -/
theorem enumeration_hex4_26cc : reassembles 9932 = true ∧ castsFifteens 9932 = true := by decide

/-- 26cd: nibbles fold back to 9933; digit sum 33 ≡ 9933 (mod 15). -/
theorem enumeration_hex4_26cd : reassembles 9933 = true ∧ castsFifteens 9933 = true := by decide

/-- 26ce: nibbles fold back to 9934; digit sum 34 ≡ 9934 (mod 15). -/
theorem enumeration_hex4_26ce : reassembles 9934 = true ∧ castsFifteens 9934 = true := by decide

/-- 26cf: nibbles fold back to 9935; digit sum 35 ≡ 9935 (mod 15). -/
theorem enumeration_hex4_26cf : reassembles 9935 = true ∧ castsFifteens 9935 = true := by decide

/-- 26d0: nibbles fold back to 9936; digit sum 21 ≡ 9936 (mod 15). -/
theorem enumeration_hex4_26d0 : reassembles 9936 = true ∧ castsFifteens 9936 = true := by decide

/-- 26d1: nibbles fold back to 9937; digit sum 22 ≡ 9937 (mod 15). -/
theorem enumeration_hex4_26d1 : reassembles 9937 = true ∧ castsFifteens 9937 = true := by decide

/-- 26d2: nibbles fold back to 9938; digit sum 23 ≡ 9938 (mod 15). -/
theorem enumeration_hex4_26d2 : reassembles 9938 = true ∧ castsFifteens 9938 = true := by decide

/-- 26d3: nibbles fold back to 9939; digit sum 24 ≡ 9939 (mod 15). -/
theorem enumeration_hex4_26d3 : reassembles 9939 = true ∧ castsFifteens 9939 = true := by decide

/-- 26d4: nibbles fold back to 9940; digit sum 25 ≡ 9940 (mod 15). -/
theorem enumeration_hex4_26d4 : reassembles 9940 = true ∧ castsFifteens 9940 = true := by decide

/-- 26d5: nibbles fold back to 9941; digit sum 26 ≡ 9941 (mod 15). -/
theorem enumeration_hex4_26d5 : reassembles 9941 = true ∧ castsFifteens 9941 = true := by decide

/-- 26d6: nibbles fold back to 9942; digit sum 27 ≡ 9942 (mod 15). -/
theorem enumeration_hex4_26d6 : reassembles 9942 = true ∧ castsFifteens 9942 = true := by decide

/-- 26d7: nibbles fold back to 9943; digit sum 28 ≡ 9943 (mod 15). -/
theorem enumeration_hex4_26d7 : reassembles 9943 = true ∧ castsFifteens 9943 = true := by decide

/-- 26d8: nibbles fold back to 9944; digit sum 29 ≡ 9944 (mod 15). -/
theorem enumeration_hex4_26d8 : reassembles 9944 = true ∧ castsFifteens 9944 = true := by decide

/-- 26d9: nibbles fold back to 9945; digit sum 30 ≡ 9945 (mod 15). -/
theorem enumeration_hex4_26d9 : reassembles 9945 = true ∧ castsFifteens 9945 = true := by decide

/-- 26da: nibbles fold back to 9946; digit sum 31 ≡ 9946 (mod 15). -/
theorem enumeration_hex4_26da : reassembles 9946 = true ∧ castsFifteens 9946 = true := by decide

/-- 26db: nibbles fold back to 9947; digit sum 32 ≡ 9947 (mod 15). -/
theorem enumeration_hex4_26db : reassembles 9947 = true ∧ castsFifteens 9947 = true := by decide

/-- 26dc: nibbles fold back to 9948; digit sum 33 ≡ 9948 (mod 15). -/
theorem enumeration_hex4_26dc : reassembles 9948 = true ∧ castsFifteens 9948 = true := by decide

/-- 26dd: nibbles fold back to 9949; digit sum 34 ≡ 9949 (mod 15). -/
theorem enumeration_hex4_26dd : reassembles 9949 = true ∧ castsFifteens 9949 = true := by decide

/-- 26de: nibbles fold back to 9950; digit sum 35 ≡ 9950 (mod 15). -/
theorem enumeration_hex4_26de : reassembles 9950 = true ∧ castsFifteens 9950 = true := by decide

/-- 26df: nibbles fold back to 9951; digit sum 36 ≡ 9951 (mod 15). -/
theorem enumeration_hex4_26df : reassembles 9951 = true ∧ castsFifteens 9951 = true := by decide

/-- 26e0: nibbles fold back to 9952; digit sum 22 ≡ 9952 (mod 15). -/
theorem enumeration_hex4_26e0 : reassembles 9952 = true ∧ castsFifteens 9952 = true := by decide

/-- 26e1: nibbles fold back to 9953; digit sum 23 ≡ 9953 (mod 15). -/
theorem enumeration_hex4_26e1 : reassembles 9953 = true ∧ castsFifteens 9953 = true := by decide

/-- 26e2: nibbles fold back to 9954; digit sum 24 ≡ 9954 (mod 15). -/
theorem enumeration_hex4_26e2 : reassembles 9954 = true ∧ castsFifteens 9954 = true := by decide

/-- 26e3: nibbles fold back to 9955; digit sum 25 ≡ 9955 (mod 15). -/
theorem enumeration_hex4_26e3 : reassembles 9955 = true ∧ castsFifteens 9955 = true := by decide

/-- 26e4: nibbles fold back to 9956; digit sum 26 ≡ 9956 (mod 15). -/
theorem enumeration_hex4_26e4 : reassembles 9956 = true ∧ castsFifteens 9956 = true := by decide

/-- 26e5: nibbles fold back to 9957; digit sum 27 ≡ 9957 (mod 15). -/
theorem enumeration_hex4_26e5 : reassembles 9957 = true ∧ castsFifteens 9957 = true := by decide

/-- 26e6: nibbles fold back to 9958; digit sum 28 ≡ 9958 (mod 15). -/
theorem enumeration_hex4_26e6 : reassembles 9958 = true ∧ castsFifteens 9958 = true := by decide

/-- 26e7: nibbles fold back to 9959; digit sum 29 ≡ 9959 (mod 15). -/
theorem enumeration_hex4_26e7 : reassembles 9959 = true ∧ castsFifteens 9959 = true := by decide

/-- 26e8: nibbles fold back to 9960; digit sum 30 ≡ 9960 (mod 15). -/
theorem enumeration_hex4_26e8 : reassembles 9960 = true ∧ castsFifteens 9960 = true := by decide

/-- 26e9: nibbles fold back to 9961; digit sum 31 ≡ 9961 (mod 15). -/
theorem enumeration_hex4_26e9 : reassembles 9961 = true ∧ castsFifteens 9961 = true := by decide

/-- 26ea: nibbles fold back to 9962; digit sum 32 ≡ 9962 (mod 15). -/
theorem enumeration_hex4_26ea : reassembles 9962 = true ∧ castsFifteens 9962 = true := by decide

/-- 26eb: nibbles fold back to 9963; digit sum 33 ≡ 9963 (mod 15). -/
theorem enumeration_hex4_26eb : reassembles 9963 = true ∧ castsFifteens 9963 = true := by decide

/-- 26ec: nibbles fold back to 9964; digit sum 34 ≡ 9964 (mod 15). -/
theorem enumeration_hex4_26ec : reassembles 9964 = true ∧ castsFifteens 9964 = true := by decide

/-- 26ed: nibbles fold back to 9965; digit sum 35 ≡ 9965 (mod 15). -/
theorem enumeration_hex4_26ed : reassembles 9965 = true ∧ castsFifteens 9965 = true := by decide

/-- 26ee: nibbles fold back to 9966; digit sum 36 ≡ 9966 (mod 15). -/
theorem enumeration_hex4_26ee : reassembles 9966 = true ∧ castsFifteens 9966 = true := by decide

/-- 26ef: nibbles fold back to 9967; digit sum 37 ≡ 9967 (mod 15). -/
theorem enumeration_hex4_26ef : reassembles 9967 = true ∧ castsFifteens 9967 = true := by decide

/-- 26f0: nibbles fold back to 9968; digit sum 23 ≡ 9968 (mod 15). -/
theorem enumeration_hex4_26f0 : reassembles 9968 = true ∧ castsFifteens 9968 = true := by decide

/-- 26f1: nibbles fold back to 9969; digit sum 24 ≡ 9969 (mod 15). -/
theorem enumeration_hex4_26f1 : reassembles 9969 = true ∧ castsFifteens 9969 = true := by decide

/-- 26f2: nibbles fold back to 9970; digit sum 25 ≡ 9970 (mod 15). -/
theorem enumeration_hex4_26f2 : reassembles 9970 = true ∧ castsFifteens 9970 = true := by decide

/-- 26f3: nibbles fold back to 9971; digit sum 26 ≡ 9971 (mod 15). -/
theorem enumeration_hex4_26f3 : reassembles 9971 = true ∧ castsFifteens 9971 = true := by decide

/-- 26f4: nibbles fold back to 9972; digit sum 27 ≡ 9972 (mod 15). -/
theorem enumeration_hex4_26f4 : reassembles 9972 = true ∧ castsFifteens 9972 = true := by decide

/-- 26f5: nibbles fold back to 9973; digit sum 28 ≡ 9973 (mod 15). -/
theorem enumeration_hex4_26f5 : reassembles 9973 = true ∧ castsFifteens 9973 = true := by decide

/-- 26f6: nibbles fold back to 9974; digit sum 29 ≡ 9974 (mod 15). -/
theorem enumeration_hex4_26f6 : reassembles 9974 = true ∧ castsFifteens 9974 = true := by decide

/-- 26f7: nibbles fold back to 9975; digit sum 30 ≡ 9975 (mod 15). -/
theorem enumeration_hex4_26f7 : reassembles 9975 = true ∧ castsFifteens 9975 = true := by decide

/-- 26f8: nibbles fold back to 9976; digit sum 31 ≡ 9976 (mod 15). -/
theorem enumeration_hex4_26f8 : reassembles 9976 = true ∧ castsFifteens 9976 = true := by decide

/-- 26f9: nibbles fold back to 9977; digit sum 32 ≡ 9977 (mod 15). -/
theorem enumeration_hex4_26f9 : reassembles 9977 = true ∧ castsFifteens 9977 = true := by decide

/-- 26fa: nibbles fold back to 9978; digit sum 33 ≡ 9978 (mod 15). -/
theorem enumeration_hex4_26fa : reassembles 9978 = true ∧ castsFifteens 9978 = true := by decide

/-- 26fb: nibbles fold back to 9979; digit sum 34 ≡ 9979 (mod 15). -/
theorem enumeration_hex4_26fb : reassembles 9979 = true ∧ castsFifteens 9979 = true := by decide

/-- 26fc: nibbles fold back to 9980; digit sum 35 ≡ 9980 (mod 15). -/
theorem enumeration_hex4_26fc : reassembles 9980 = true ∧ castsFifteens 9980 = true := by decide

/-- 26fd: nibbles fold back to 9981; digit sum 36 ≡ 9981 (mod 15). -/
theorem enumeration_hex4_26fd : reassembles 9981 = true ∧ castsFifteens 9981 = true := by decide

/-- 26fe: nibbles fold back to 9982; digit sum 37 ≡ 9982 (mod 15). -/
theorem enumeration_hex4_26fe : reassembles 9982 = true ∧ castsFifteens 9982 = true := by decide

/-- 26ff: nibbles fold back to 9983; digit sum 38 ≡ 9983 (mod 15). -/
theorem enumeration_hex4_26ff : reassembles 9983 = true ∧ castsFifteens 9983 = true := by decide

/-- 2700: nibbles fold back to 9984; digit sum 9 ≡ 9984 (mod 15). -/
theorem enumeration_hex4_2700 : reassembles 9984 = true ∧ castsFifteens 9984 = true := by decide

/-- 2701: nibbles fold back to 9985; digit sum 10 ≡ 9985 (mod 15). -/
theorem enumeration_hex4_2701 : reassembles 9985 = true ∧ castsFifteens 9985 = true := by decide

/-- 2702: nibbles fold back to 9986; digit sum 11 ≡ 9986 (mod 15). -/
theorem enumeration_hex4_2702 : reassembles 9986 = true ∧ castsFifteens 9986 = true := by decide

/-- 2703: nibbles fold back to 9987; digit sum 12 ≡ 9987 (mod 15). -/
theorem enumeration_hex4_2703 : reassembles 9987 = true ∧ castsFifteens 9987 = true := by decide

/-- 2704: nibbles fold back to 9988; digit sum 13 ≡ 9988 (mod 15). -/
theorem enumeration_hex4_2704 : reassembles 9988 = true ∧ castsFifteens 9988 = true := by decide

/-- 2705: nibbles fold back to 9989; digit sum 14 ≡ 9989 (mod 15). -/
theorem enumeration_hex4_2705 : reassembles 9989 = true ∧ castsFifteens 9989 = true := by decide

/-- 2706: nibbles fold back to 9990; digit sum 15 ≡ 9990 (mod 15). -/
theorem enumeration_hex4_2706 : reassembles 9990 = true ∧ castsFifteens 9990 = true := by decide

/-- 2707: nibbles fold back to 9991; digit sum 16 ≡ 9991 (mod 15). -/
theorem enumeration_hex4_2707 : reassembles 9991 = true ∧ castsFifteens 9991 = true := by decide

/-- 2708: nibbles fold back to 9992; digit sum 17 ≡ 9992 (mod 15). -/
theorem enumeration_hex4_2708 : reassembles 9992 = true ∧ castsFifteens 9992 = true := by decide

/-- 2709: nibbles fold back to 9993; digit sum 18 ≡ 9993 (mod 15). -/
theorem enumeration_hex4_2709 : reassembles 9993 = true ∧ castsFifteens 9993 = true := by decide

/-- 270a: nibbles fold back to 9994; digit sum 19 ≡ 9994 (mod 15). -/
theorem enumeration_hex4_270a : reassembles 9994 = true ∧ castsFifteens 9994 = true := by decide

/-- 270b: nibbles fold back to 9995; digit sum 20 ≡ 9995 (mod 15). -/
theorem enumeration_hex4_270b : reassembles 9995 = true ∧ castsFifteens 9995 = true := by decide

/-- 270c: nibbles fold back to 9996; digit sum 21 ≡ 9996 (mod 15). -/
theorem enumeration_hex4_270c : reassembles 9996 = true ∧ castsFifteens 9996 = true := by decide

/-- 270d: nibbles fold back to 9997; digit sum 22 ≡ 9997 (mod 15). -/
theorem enumeration_hex4_270d : reassembles 9997 = true ∧ castsFifteens 9997 = true := by decide

/-- 270e: nibbles fold back to 9998; digit sum 23 ≡ 9998 (mod 15). -/
theorem enumeration_hex4_270e : reassembles 9998 = true ∧ castsFifteens 9998 = true := by decide

/-- 270f: nibbles fold back to 9999; digit sum 24 ≡ 9999 (mod 15). -/
theorem enumeration_hex4_270f : reassembles 9999 = true ∧ castsFifteens 9999 = true := by decide

/-- 2710: nibbles fold back to 10000; digit sum 10 ≡ 10000 (mod 15). -/
theorem enumeration_hex4_2710 : reassembles 10000 = true ∧ castsFifteens 10000 = true := by decide

/-- 2711: nibbles fold back to 10001; digit sum 11 ≡ 10001 (mod 15). -/
theorem enumeration_hex4_2711 : reassembles 10001 = true ∧ castsFifteens 10001 = true := by decide

/-- 2712: nibbles fold back to 10002; digit sum 12 ≡ 10002 (mod 15). -/
theorem enumeration_hex4_2712 : reassembles 10002 = true ∧ castsFifteens 10002 = true := by decide

/-- 2713: nibbles fold back to 10003; digit sum 13 ≡ 10003 (mod 15). -/
theorem enumeration_hex4_2713 : reassembles 10003 = true ∧ castsFifteens 10003 = true := by decide

/-- 2714: nibbles fold back to 10004; digit sum 14 ≡ 10004 (mod 15). -/
theorem enumeration_hex4_2714 : reassembles 10004 = true ∧ castsFifteens 10004 = true := by decide

/-- 2715: nibbles fold back to 10005; digit sum 15 ≡ 10005 (mod 15). -/
theorem enumeration_hex4_2715 : reassembles 10005 = true ∧ castsFifteens 10005 = true := by decide

/-- 2716: nibbles fold back to 10006; digit sum 16 ≡ 10006 (mod 15). -/
theorem enumeration_hex4_2716 : reassembles 10006 = true ∧ castsFifteens 10006 = true := by decide

/-- 2717: nibbles fold back to 10007; digit sum 17 ≡ 10007 (mod 15). -/
theorem enumeration_hex4_2717 : reassembles 10007 = true ∧ castsFifteens 10007 = true := by decide

/-- 2718: nibbles fold back to 10008; digit sum 18 ≡ 10008 (mod 15). -/
theorem enumeration_hex4_2718 : reassembles 10008 = true ∧ castsFifteens 10008 = true := by decide

/-- 2719: nibbles fold back to 10009; digit sum 19 ≡ 10009 (mod 15). -/
theorem enumeration_hex4_2719 : reassembles 10009 = true ∧ castsFifteens 10009 = true := by decide

/-- 271a: nibbles fold back to 10010; digit sum 20 ≡ 10010 (mod 15). -/
theorem enumeration_hex4_271a : reassembles 10010 = true ∧ castsFifteens 10010 = true := by decide

/-- 271b: nibbles fold back to 10011; digit sum 21 ≡ 10011 (mod 15). -/
theorem enumeration_hex4_271b : reassembles 10011 = true ∧ castsFifteens 10011 = true := by decide

/-- 271c: nibbles fold back to 10012; digit sum 22 ≡ 10012 (mod 15). -/
theorem enumeration_hex4_271c : reassembles 10012 = true ∧ castsFifteens 10012 = true := by decide

/-- 271d: nibbles fold back to 10013; digit sum 23 ≡ 10013 (mod 15). -/
theorem enumeration_hex4_271d : reassembles 10013 = true ∧ castsFifteens 10013 = true := by decide

/-- 271e: nibbles fold back to 10014; digit sum 24 ≡ 10014 (mod 15). -/
theorem enumeration_hex4_271e : reassembles 10014 = true ∧ castsFifteens 10014 = true := by decide

/-- 271f: nibbles fold back to 10015; digit sum 25 ≡ 10015 (mod 15). -/
theorem enumeration_hex4_271f : reassembles 10015 = true ∧ castsFifteens 10015 = true := by decide

/-- 2720: nibbles fold back to 10016; digit sum 11 ≡ 10016 (mod 15). -/
theorem enumeration_hex4_2720 : reassembles 10016 = true ∧ castsFifteens 10016 = true := by decide

/-- 2721: nibbles fold back to 10017; digit sum 12 ≡ 10017 (mod 15). -/
theorem enumeration_hex4_2721 : reassembles 10017 = true ∧ castsFifteens 10017 = true := by decide

/-- 2722: nibbles fold back to 10018; digit sum 13 ≡ 10018 (mod 15). -/
theorem enumeration_hex4_2722 : reassembles 10018 = true ∧ castsFifteens 10018 = true := by decide

/-- 2723: nibbles fold back to 10019; digit sum 14 ≡ 10019 (mod 15). -/
theorem enumeration_hex4_2723 : reassembles 10019 = true ∧ castsFifteens 10019 = true := by decide

/-- 2724: nibbles fold back to 10020; digit sum 15 ≡ 10020 (mod 15). -/
theorem enumeration_hex4_2724 : reassembles 10020 = true ∧ castsFifteens 10020 = true := by decide

/-- 2725: nibbles fold back to 10021; digit sum 16 ≡ 10021 (mod 15). -/
theorem enumeration_hex4_2725 : reassembles 10021 = true ∧ castsFifteens 10021 = true := by decide

/-- 2726: nibbles fold back to 10022; digit sum 17 ≡ 10022 (mod 15). -/
theorem enumeration_hex4_2726 : reassembles 10022 = true ∧ castsFifteens 10022 = true := by decide

/-- 2727: nibbles fold back to 10023; digit sum 18 ≡ 10023 (mod 15). -/
theorem enumeration_hex4_2727 : reassembles 10023 = true ∧ castsFifteens 10023 = true := by decide

/-- 2728: nibbles fold back to 10024; digit sum 19 ≡ 10024 (mod 15). -/
theorem enumeration_hex4_2728 : reassembles 10024 = true ∧ castsFifteens 10024 = true := by decide

/-- 2729: nibbles fold back to 10025; digit sum 20 ≡ 10025 (mod 15). -/
theorem enumeration_hex4_2729 : reassembles 10025 = true ∧ castsFifteens 10025 = true := by decide

/-- 272a: nibbles fold back to 10026; digit sum 21 ≡ 10026 (mod 15). -/
theorem enumeration_hex4_272a : reassembles 10026 = true ∧ castsFifteens 10026 = true := by decide

/-- 272b: nibbles fold back to 10027; digit sum 22 ≡ 10027 (mod 15). -/
theorem enumeration_hex4_272b : reassembles 10027 = true ∧ castsFifteens 10027 = true := by decide

/-- 272c: nibbles fold back to 10028; digit sum 23 ≡ 10028 (mod 15). -/
theorem enumeration_hex4_272c : reassembles 10028 = true ∧ castsFifteens 10028 = true := by decide

/-- 272d: nibbles fold back to 10029; digit sum 24 ≡ 10029 (mod 15). -/
theorem enumeration_hex4_272d : reassembles 10029 = true ∧ castsFifteens 10029 = true := by decide

/-- 272e: nibbles fold back to 10030; digit sum 25 ≡ 10030 (mod 15). -/
theorem enumeration_hex4_272e : reassembles 10030 = true ∧ castsFifteens 10030 = true := by decide

/-- 272f: nibbles fold back to 10031; digit sum 26 ≡ 10031 (mod 15). -/
theorem enumeration_hex4_272f : reassembles 10031 = true ∧ castsFifteens 10031 = true := by decide

/-- 2730: nibbles fold back to 10032; digit sum 12 ≡ 10032 (mod 15). -/
theorem enumeration_hex4_2730 : reassembles 10032 = true ∧ castsFifteens 10032 = true := by decide

/-- 2731: nibbles fold back to 10033; digit sum 13 ≡ 10033 (mod 15). -/
theorem enumeration_hex4_2731 : reassembles 10033 = true ∧ castsFifteens 10033 = true := by decide

/-- 2732: nibbles fold back to 10034; digit sum 14 ≡ 10034 (mod 15). -/
theorem enumeration_hex4_2732 : reassembles 10034 = true ∧ castsFifteens 10034 = true := by decide

/-- 2733: nibbles fold back to 10035; digit sum 15 ≡ 10035 (mod 15). -/
theorem enumeration_hex4_2733 : reassembles 10035 = true ∧ castsFifteens 10035 = true := by decide

/-- 2734: nibbles fold back to 10036; digit sum 16 ≡ 10036 (mod 15). -/
theorem enumeration_hex4_2734 : reassembles 10036 = true ∧ castsFifteens 10036 = true := by decide

/-- 2735: nibbles fold back to 10037; digit sum 17 ≡ 10037 (mod 15). -/
theorem enumeration_hex4_2735 : reassembles 10037 = true ∧ castsFifteens 10037 = true := by decide

/-- 2736: nibbles fold back to 10038; digit sum 18 ≡ 10038 (mod 15). -/
theorem enumeration_hex4_2736 : reassembles 10038 = true ∧ castsFifteens 10038 = true := by decide

/-- 2737: nibbles fold back to 10039; digit sum 19 ≡ 10039 (mod 15). -/
theorem enumeration_hex4_2737 : reassembles 10039 = true ∧ castsFifteens 10039 = true := by decide

/-- 2738: nibbles fold back to 10040; digit sum 20 ≡ 10040 (mod 15). -/
theorem enumeration_hex4_2738 : reassembles 10040 = true ∧ castsFifteens 10040 = true := by decide

/-- 2739: nibbles fold back to 10041; digit sum 21 ≡ 10041 (mod 15). -/
theorem enumeration_hex4_2739 : reassembles 10041 = true ∧ castsFifteens 10041 = true := by decide

/-- 273a: nibbles fold back to 10042; digit sum 22 ≡ 10042 (mod 15). -/
theorem enumeration_hex4_273a : reassembles 10042 = true ∧ castsFifteens 10042 = true := by decide

/-- 273b: nibbles fold back to 10043; digit sum 23 ≡ 10043 (mod 15). -/
theorem enumeration_hex4_273b : reassembles 10043 = true ∧ castsFifteens 10043 = true := by decide

/-- 273c: nibbles fold back to 10044; digit sum 24 ≡ 10044 (mod 15). -/
theorem enumeration_hex4_273c : reassembles 10044 = true ∧ castsFifteens 10044 = true := by decide

/-- 273d: nibbles fold back to 10045; digit sum 25 ≡ 10045 (mod 15). -/
theorem enumeration_hex4_273d : reassembles 10045 = true ∧ castsFifteens 10045 = true := by decide

/-- 273e: nibbles fold back to 10046; digit sum 26 ≡ 10046 (mod 15). -/
theorem enumeration_hex4_273e : reassembles 10046 = true ∧ castsFifteens 10046 = true := by decide

/-- 273f: nibbles fold back to 10047; digit sum 27 ≡ 10047 (mod 15). -/
theorem enumeration_hex4_273f : reassembles 10047 = true ∧ castsFifteens 10047 = true := by decide

/-- 2740: nibbles fold back to 10048; digit sum 13 ≡ 10048 (mod 15). -/
theorem enumeration_hex4_2740 : reassembles 10048 = true ∧ castsFifteens 10048 = true := by decide

/-- 2741: nibbles fold back to 10049; digit sum 14 ≡ 10049 (mod 15). -/
theorem enumeration_hex4_2741 : reassembles 10049 = true ∧ castsFifteens 10049 = true := by decide

/-- 2742: nibbles fold back to 10050; digit sum 15 ≡ 10050 (mod 15). -/
theorem enumeration_hex4_2742 : reassembles 10050 = true ∧ castsFifteens 10050 = true := by decide

/-- 2743: nibbles fold back to 10051; digit sum 16 ≡ 10051 (mod 15). -/
theorem enumeration_hex4_2743 : reassembles 10051 = true ∧ castsFifteens 10051 = true := by decide

/-- 2744: nibbles fold back to 10052; digit sum 17 ≡ 10052 (mod 15). -/
theorem enumeration_hex4_2744 : reassembles 10052 = true ∧ castsFifteens 10052 = true := by decide

/-- 2745: nibbles fold back to 10053; digit sum 18 ≡ 10053 (mod 15). -/
theorem enumeration_hex4_2745 : reassembles 10053 = true ∧ castsFifteens 10053 = true := by decide

/-- 2746: nibbles fold back to 10054; digit sum 19 ≡ 10054 (mod 15). -/
theorem enumeration_hex4_2746 : reassembles 10054 = true ∧ castsFifteens 10054 = true := by decide

/-- 2747: nibbles fold back to 10055; digit sum 20 ≡ 10055 (mod 15). -/
theorem enumeration_hex4_2747 : reassembles 10055 = true ∧ castsFifteens 10055 = true := by decide

/-- 2748: nibbles fold back to 10056; digit sum 21 ≡ 10056 (mod 15). -/
theorem enumeration_hex4_2748 : reassembles 10056 = true ∧ castsFifteens 10056 = true := by decide

/-- 2749: nibbles fold back to 10057; digit sum 22 ≡ 10057 (mod 15). -/
theorem enumeration_hex4_2749 : reassembles 10057 = true ∧ castsFifteens 10057 = true := by decide

/-- 274a: nibbles fold back to 10058; digit sum 23 ≡ 10058 (mod 15). -/
theorem enumeration_hex4_274a : reassembles 10058 = true ∧ castsFifteens 10058 = true := by decide

/-- 274b: nibbles fold back to 10059; digit sum 24 ≡ 10059 (mod 15). -/
theorem enumeration_hex4_274b : reassembles 10059 = true ∧ castsFifteens 10059 = true := by decide

/-- 274c: nibbles fold back to 10060; digit sum 25 ≡ 10060 (mod 15). -/
theorem enumeration_hex4_274c : reassembles 10060 = true ∧ castsFifteens 10060 = true := by decide

/-- 274d: nibbles fold back to 10061; digit sum 26 ≡ 10061 (mod 15). -/
theorem enumeration_hex4_274d : reassembles 10061 = true ∧ castsFifteens 10061 = true := by decide

/-- 274e: nibbles fold back to 10062; digit sum 27 ≡ 10062 (mod 15). -/
theorem enumeration_hex4_274e : reassembles 10062 = true ∧ castsFifteens 10062 = true := by decide

/-- 274f: nibbles fold back to 10063; digit sum 28 ≡ 10063 (mod 15). -/
theorem enumeration_hex4_274f : reassembles 10063 = true ∧ castsFifteens 10063 = true := by decide

/-- 2750: nibbles fold back to 10064; digit sum 14 ≡ 10064 (mod 15). -/
theorem enumeration_hex4_2750 : reassembles 10064 = true ∧ castsFifteens 10064 = true := by decide

/-- 2751: nibbles fold back to 10065; digit sum 15 ≡ 10065 (mod 15). -/
theorem enumeration_hex4_2751 : reassembles 10065 = true ∧ castsFifteens 10065 = true := by decide

/-- 2752: nibbles fold back to 10066; digit sum 16 ≡ 10066 (mod 15). -/
theorem enumeration_hex4_2752 : reassembles 10066 = true ∧ castsFifteens 10066 = true := by decide

/-- 2753: nibbles fold back to 10067; digit sum 17 ≡ 10067 (mod 15). -/
theorem enumeration_hex4_2753 : reassembles 10067 = true ∧ castsFifteens 10067 = true := by decide

/-- 2754: nibbles fold back to 10068; digit sum 18 ≡ 10068 (mod 15). -/
theorem enumeration_hex4_2754 : reassembles 10068 = true ∧ castsFifteens 10068 = true := by decide

/-- 2755: nibbles fold back to 10069; digit sum 19 ≡ 10069 (mod 15). -/
theorem enumeration_hex4_2755 : reassembles 10069 = true ∧ castsFifteens 10069 = true := by decide

/-- 2756: nibbles fold back to 10070; digit sum 20 ≡ 10070 (mod 15). -/
theorem enumeration_hex4_2756 : reassembles 10070 = true ∧ castsFifteens 10070 = true := by decide

/-- 2757: nibbles fold back to 10071; digit sum 21 ≡ 10071 (mod 15). -/
theorem enumeration_hex4_2757 : reassembles 10071 = true ∧ castsFifteens 10071 = true := by decide

/-- 2758: nibbles fold back to 10072; digit sum 22 ≡ 10072 (mod 15). -/
theorem enumeration_hex4_2758 : reassembles 10072 = true ∧ castsFifteens 10072 = true := by decide

/-- 2759: nibbles fold back to 10073; digit sum 23 ≡ 10073 (mod 15). -/
theorem enumeration_hex4_2759 : reassembles 10073 = true ∧ castsFifteens 10073 = true := by decide

/-- 275a: nibbles fold back to 10074; digit sum 24 ≡ 10074 (mod 15). -/
theorem enumeration_hex4_275a : reassembles 10074 = true ∧ castsFifteens 10074 = true := by decide

/-- 275b: nibbles fold back to 10075; digit sum 25 ≡ 10075 (mod 15). -/
theorem enumeration_hex4_275b : reassembles 10075 = true ∧ castsFifteens 10075 = true := by decide

/-- 275c: nibbles fold back to 10076; digit sum 26 ≡ 10076 (mod 15). -/
theorem enumeration_hex4_275c : reassembles 10076 = true ∧ castsFifteens 10076 = true := by decide

/-- 275d: nibbles fold back to 10077; digit sum 27 ≡ 10077 (mod 15). -/
theorem enumeration_hex4_275d : reassembles 10077 = true ∧ castsFifteens 10077 = true := by decide

/-- 275e: nibbles fold back to 10078; digit sum 28 ≡ 10078 (mod 15). -/
theorem enumeration_hex4_275e : reassembles 10078 = true ∧ castsFifteens 10078 = true := by decide

/-- 275f: nibbles fold back to 10079; digit sum 29 ≡ 10079 (mod 15). -/
theorem enumeration_hex4_275f : reassembles 10079 = true ∧ castsFifteens 10079 = true := by decide

/-- 2760: nibbles fold back to 10080; digit sum 15 ≡ 10080 (mod 15). -/
theorem enumeration_hex4_2760 : reassembles 10080 = true ∧ castsFifteens 10080 = true := by decide

/-- 2761: nibbles fold back to 10081; digit sum 16 ≡ 10081 (mod 15). -/
theorem enumeration_hex4_2761 : reassembles 10081 = true ∧ castsFifteens 10081 = true := by decide

/-- 2762: nibbles fold back to 10082; digit sum 17 ≡ 10082 (mod 15). -/
theorem enumeration_hex4_2762 : reassembles 10082 = true ∧ castsFifteens 10082 = true := by decide

/-- 2763: nibbles fold back to 10083; digit sum 18 ≡ 10083 (mod 15). -/
theorem enumeration_hex4_2763 : reassembles 10083 = true ∧ castsFifteens 10083 = true := by decide

/-- 2764: nibbles fold back to 10084; digit sum 19 ≡ 10084 (mod 15). -/
theorem enumeration_hex4_2764 : reassembles 10084 = true ∧ castsFifteens 10084 = true := by decide

/-- 2765: nibbles fold back to 10085; digit sum 20 ≡ 10085 (mod 15). -/
theorem enumeration_hex4_2765 : reassembles 10085 = true ∧ castsFifteens 10085 = true := by decide

/-- 2766: nibbles fold back to 10086; digit sum 21 ≡ 10086 (mod 15). -/
theorem enumeration_hex4_2766 : reassembles 10086 = true ∧ castsFifteens 10086 = true := by decide

/-- 2767: nibbles fold back to 10087; digit sum 22 ≡ 10087 (mod 15). -/
theorem enumeration_hex4_2767 : reassembles 10087 = true ∧ castsFifteens 10087 = true := by decide

/-- 2768: nibbles fold back to 10088; digit sum 23 ≡ 10088 (mod 15). -/
theorem enumeration_hex4_2768 : reassembles 10088 = true ∧ castsFifteens 10088 = true := by decide

/-- 2769: nibbles fold back to 10089; digit sum 24 ≡ 10089 (mod 15). -/
theorem enumeration_hex4_2769 : reassembles 10089 = true ∧ castsFifteens 10089 = true := by decide

/-- 276a: nibbles fold back to 10090; digit sum 25 ≡ 10090 (mod 15). -/
theorem enumeration_hex4_276a : reassembles 10090 = true ∧ castsFifteens 10090 = true := by decide

/-- 276b: nibbles fold back to 10091; digit sum 26 ≡ 10091 (mod 15). -/
theorem enumeration_hex4_276b : reassembles 10091 = true ∧ castsFifteens 10091 = true := by decide

/-- 276c: nibbles fold back to 10092; digit sum 27 ≡ 10092 (mod 15). -/
theorem enumeration_hex4_276c : reassembles 10092 = true ∧ castsFifteens 10092 = true := by decide

/-- 276d: nibbles fold back to 10093; digit sum 28 ≡ 10093 (mod 15). -/
theorem enumeration_hex4_276d : reassembles 10093 = true ∧ castsFifteens 10093 = true := by decide

/-- 276e: nibbles fold back to 10094; digit sum 29 ≡ 10094 (mod 15). -/
theorem enumeration_hex4_276e : reassembles 10094 = true ∧ castsFifteens 10094 = true := by decide

/-- 276f: nibbles fold back to 10095; digit sum 30 ≡ 10095 (mod 15). -/
theorem enumeration_hex4_276f : reassembles 10095 = true ∧ castsFifteens 10095 = true := by decide

/-- 2770: nibbles fold back to 10096; digit sum 16 ≡ 10096 (mod 15). -/
theorem enumeration_hex4_2770 : reassembles 10096 = true ∧ castsFifteens 10096 = true := by decide

/-- 2771: nibbles fold back to 10097; digit sum 17 ≡ 10097 (mod 15). -/
theorem enumeration_hex4_2771 : reassembles 10097 = true ∧ castsFifteens 10097 = true := by decide

/-- 2772: nibbles fold back to 10098; digit sum 18 ≡ 10098 (mod 15). -/
theorem enumeration_hex4_2772 : reassembles 10098 = true ∧ castsFifteens 10098 = true := by decide

/-- 2773: nibbles fold back to 10099; digit sum 19 ≡ 10099 (mod 15). -/
theorem enumeration_hex4_2773 : reassembles 10099 = true ∧ castsFifteens 10099 = true := by decide

/-- 2774: nibbles fold back to 10100; digit sum 20 ≡ 10100 (mod 15). -/
theorem enumeration_hex4_2774 : reassembles 10100 = true ∧ castsFifteens 10100 = true := by decide

/-- 2775: nibbles fold back to 10101; digit sum 21 ≡ 10101 (mod 15). -/
theorem enumeration_hex4_2775 : reassembles 10101 = true ∧ castsFifteens 10101 = true := by decide

/-- 2776: nibbles fold back to 10102; digit sum 22 ≡ 10102 (mod 15). -/
theorem enumeration_hex4_2776 : reassembles 10102 = true ∧ castsFifteens 10102 = true := by decide

/-- 2777: nibbles fold back to 10103; digit sum 23 ≡ 10103 (mod 15). -/
theorem enumeration_hex4_2777 : reassembles 10103 = true ∧ castsFifteens 10103 = true := by decide

/-- 2778: nibbles fold back to 10104; digit sum 24 ≡ 10104 (mod 15). -/
theorem enumeration_hex4_2778 : reassembles 10104 = true ∧ castsFifteens 10104 = true := by decide

/-- 2779: nibbles fold back to 10105; digit sum 25 ≡ 10105 (mod 15). -/
theorem enumeration_hex4_2779 : reassembles 10105 = true ∧ castsFifteens 10105 = true := by decide

/-- 277a: nibbles fold back to 10106; digit sum 26 ≡ 10106 (mod 15). -/
theorem enumeration_hex4_277a : reassembles 10106 = true ∧ castsFifteens 10106 = true := by decide

/-- 277b: nibbles fold back to 10107; digit sum 27 ≡ 10107 (mod 15). -/
theorem enumeration_hex4_277b : reassembles 10107 = true ∧ castsFifteens 10107 = true := by decide

/-- 277c: nibbles fold back to 10108; digit sum 28 ≡ 10108 (mod 15). -/
theorem enumeration_hex4_277c : reassembles 10108 = true ∧ castsFifteens 10108 = true := by decide

/-- 277d: nibbles fold back to 10109; digit sum 29 ≡ 10109 (mod 15). -/
theorem enumeration_hex4_277d : reassembles 10109 = true ∧ castsFifteens 10109 = true := by decide

/-- 277e: nibbles fold back to 10110; digit sum 30 ≡ 10110 (mod 15). -/
theorem enumeration_hex4_277e : reassembles 10110 = true ∧ castsFifteens 10110 = true := by decide

/-- 277f: nibbles fold back to 10111; digit sum 31 ≡ 10111 (mod 15). -/
theorem enumeration_hex4_277f : reassembles 10111 = true ∧ castsFifteens 10111 = true := by decide

/-- 2780: nibbles fold back to 10112; digit sum 17 ≡ 10112 (mod 15). -/
theorem enumeration_hex4_2780 : reassembles 10112 = true ∧ castsFifteens 10112 = true := by decide

/-- 2781: nibbles fold back to 10113; digit sum 18 ≡ 10113 (mod 15). -/
theorem enumeration_hex4_2781 : reassembles 10113 = true ∧ castsFifteens 10113 = true := by decide

/-- 2782: nibbles fold back to 10114; digit sum 19 ≡ 10114 (mod 15). -/
theorem enumeration_hex4_2782 : reassembles 10114 = true ∧ castsFifteens 10114 = true := by decide

/-- 2783: nibbles fold back to 10115; digit sum 20 ≡ 10115 (mod 15). -/
theorem enumeration_hex4_2783 : reassembles 10115 = true ∧ castsFifteens 10115 = true := by decide

/-- 2784: nibbles fold back to 10116; digit sum 21 ≡ 10116 (mod 15). -/
theorem enumeration_hex4_2784 : reassembles 10116 = true ∧ castsFifteens 10116 = true := by decide

/-- 2785: nibbles fold back to 10117; digit sum 22 ≡ 10117 (mod 15). -/
theorem enumeration_hex4_2785 : reassembles 10117 = true ∧ castsFifteens 10117 = true := by decide

/-- 2786: nibbles fold back to 10118; digit sum 23 ≡ 10118 (mod 15). -/
theorem enumeration_hex4_2786 : reassembles 10118 = true ∧ castsFifteens 10118 = true := by decide

/-- 2787: nibbles fold back to 10119; digit sum 24 ≡ 10119 (mod 15). -/
theorem enumeration_hex4_2787 : reassembles 10119 = true ∧ castsFifteens 10119 = true := by decide

/-- 2788: nibbles fold back to 10120; digit sum 25 ≡ 10120 (mod 15). -/
theorem enumeration_hex4_2788 : reassembles 10120 = true ∧ castsFifteens 10120 = true := by decide

/-- 2789: nibbles fold back to 10121; digit sum 26 ≡ 10121 (mod 15). -/
theorem enumeration_hex4_2789 : reassembles 10121 = true ∧ castsFifteens 10121 = true := by decide

/-- 278a: nibbles fold back to 10122; digit sum 27 ≡ 10122 (mod 15). -/
theorem enumeration_hex4_278a : reassembles 10122 = true ∧ castsFifteens 10122 = true := by decide

/-- 278b: nibbles fold back to 10123; digit sum 28 ≡ 10123 (mod 15). -/
theorem enumeration_hex4_278b : reassembles 10123 = true ∧ castsFifteens 10123 = true := by decide

/-- 278c: nibbles fold back to 10124; digit sum 29 ≡ 10124 (mod 15). -/
theorem enumeration_hex4_278c : reassembles 10124 = true ∧ castsFifteens 10124 = true := by decide

/-- 278d: nibbles fold back to 10125; digit sum 30 ≡ 10125 (mod 15). -/
theorem enumeration_hex4_278d : reassembles 10125 = true ∧ castsFifteens 10125 = true := by decide

/-- 278e: nibbles fold back to 10126; digit sum 31 ≡ 10126 (mod 15). -/
theorem enumeration_hex4_278e : reassembles 10126 = true ∧ castsFifteens 10126 = true := by decide

/-- 278f: nibbles fold back to 10127; digit sum 32 ≡ 10127 (mod 15). -/
theorem enumeration_hex4_278f : reassembles 10127 = true ∧ castsFifteens 10127 = true := by decide

/-- 2790: nibbles fold back to 10128; digit sum 18 ≡ 10128 (mod 15). -/
theorem enumeration_hex4_2790 : reassembles 10128 = true ∧ castsFifteens 10128 = true := by decide

/-- 2791: nibbles fold back to 10129; digit sum 19 ≡ 10129 (mod 15). -/
theorem enumeration_hex4_2791 : reassembles 10129 = true ∧ castsFifteens 10129 = true := by decide

/-- 2792: nibbles fold back to 10130; digit sum 20 ≡ 10130 (mod 15). -/
theorem enumeration_hex4_2792 : reassembles 10130 = true ∧ castsFifteens 10130 = true := by decide

/-- 2793: nibbles fold back to 10131; digit sum 21 ≡ 10131 (mod 15). -/
theorem enumeration_hex4_2793 : reassembles 10131 = true ∧ castsFifteens 10131 = true := by decide

/-- 2794: nibbles fold back to 10132; digit sum 22 ≡ 10132 (mod 15). -/
theorem enumeration_hex4_2794 : reassembles 10132 = true ∧ castsFifteens 10132 = true := by decide

/-- 2795: nibbles fold back to 10133; digit sum 23 ≡ 10133 (mod 15). -/
theorem enumeration_hex4_2795 : reassembles 10133 = true ∧ castsFifteens 10133 = true := by decide

/-- 2796: nibbles fold back to 10134; digit sum 24 ≡ 10134 (mod 15). -/
theorem enumeration_hex4_2796 : reassembles 10134 = true ∧ castsFifteens 10134 = true := by decide

/-- 2797: nibbles fold back to 10135; digit sum 25 ≡ 10135 (mod 15). -/
theorem enumeration_hex4_2797 : reassembles 10135 = true ∧ castsFifteens 10135 = true := by decide

/-- 2798: nibbles fold back to 10136; digit sum 26 ≡ 10136 (mod 15). -/
theorem enumeration_hex4_2798 : reassembles 10136 = true ∧ castsFifteens 10136 = true := by decide

/-- 2799: nibbles fold back to 10137; digit sum 27 ≡ 10137 (mod 15). -/
theorem enumeration_hex4_2799 : reassembles 10137 = true ∧ castsFifteens 10137 = true := by decide

/-- 279a: nibbles fold back to 10138; digit sum 28 ≡ 10138 (mod 15). -/
theorem enumeration_hex4_279a : reassembles 10138 = true ∧ castsFifteens 10138 = true := by decide

/-- 279b: nibbles fold back to 10139; digit sum 29 ≡ 10139 (mod 15). -/
theorem enumeration_hex4_279b : reassembles 10139 = true ∧ castsFifteens 10139 = true := by decide

/-- 279c: nibbles fold back to 10140; digit sum 30 ≡ 10140 (mod 15). -/
theorem enumeration_hex4_279c : reassembles 10140 = true ∧ castsFifteens 10140 = true := by decide

/-- 279d: nibbles fold back to 10141; digit sum 31 ≡ 10141 (mod 15). -/
theorem enumeration_hex4_279d : reassembles 10141 = true ∧ castsFifteens 10141 = true := by decide

/-- 279e: nibbles fold back to 10142; digit sum 32 ≡ 10142 (mod 15). -/
theorem enumeration_hex4_279e : reassembles 10142 = true ∧ castsFifteens 10142 = true := by decide

/-- 279f: nibbles fold back to 10143; digit sum 33 ≡ 10143 (mod 15). -/
theorem enumeration_hex4_279f : reassembles 10143 = true ∧ castsFifteens 10143 = true := by decide

/-- 27a0: nibbles fold back to 10144; digit sum 19 ≡ 10144 (mod 15). -/
theorem enumeration_hex4_27a0 : reassembles 10144 = true ∧ castsFifteens 10144 = true := by decide

/-- 27a1: nibbles fold back to 10145; digit sum 20 ≡ 10145 (mod 15). -/
theorem enumeration_hex4_27a1 : reassembles 10145 = true ∧ castsFifteens 10145 = true := by decide

/-- 27a2: nibbles fold back to 10146; digit sum 21 ≡ 10146 (mod 15). -/
theorem enumeration_hex4_27a2 : reassembles 10146 = true ∧ castsFifteens 10146 = true := by decide

/-- 27a3: nibbles fold back to 10147; digit sum 22 ≡ 10147 (mod 15). -/
theorem enumeration_hex4_27a3 : reassembles 10147 = true ∧ castsFifteens 10147 = true := by decide

/-- 27a4: nibbles fold back to 10148; digit sum 23 ≡ 10148 (mod 15). -/
theorem enumeration_hex4_27a4 : reassembles 10148 = true ∧ castsFifteens 10148 = true := by decide

/-- 27a5: nibbles fold back to 10149; digit sum 24 ≡ 10149 (mod 15). -/
theorem enumeration_hex4_27a5 : reassembles 10149 = true ∧ castsFifteens 10149 = true := by decide

/-- 27a6: nibbles fold back to 10150; digit sum 25 ≡ 10150 (mod 15). -/
theorem enumeration_hex4_27a6 : reassembles 10150 = true ∧ castsFifteens 10150 = true := by decide

/-- 27a7: nibbles fold back to 10151; digit sum 26 ≡ 10151 (mod 15). -/
theorem enumeration_hex4_27a7 : reassembles 10151 = true ∧ castsFifteens 10151 = true := by decide

/-- 27a8: nibbles fold back to 10152; digit sum 27 ≡ 10152 (mod 15). -/
theorem enumeration_hex4_27a8 : reassembles 10152 = true ∧ castsFifteens 10152 = true := by decide

/-- 27a9: nibbles fold back to 10153; digit sum 28 ≡ 10153 (mod 15). -/
theorem enumeration_hex4_27a9 : reassembles 10153 = true ∧ castsFifteens 10153 = true := by decide

/-- 27aa: nibbles fold back to 10154; digit sum 29 ≡ 10154 (mod 15). -/
theorem enumeration_hex4_27aa : reassembles 10154 = true ∧ castsFifteens 10154 = true := by decide

/-- 27ab: nibbles fold back to 10155; digit sum 30 ≡ 10155 (mod 15). -/
theorem enumeration_hex4_27ab : reassembles 10155 = true ∧ castsFifteens 10155 = true := by decide

/-- 27ac: nibbles fold back to 10156; digit sum 31 ≡ 10156 (mod 15). -/
theorem enumeration_hex4_27ac : reassembles 10156 = true ∧ castsFifteens 10156 = true := by decide

/-- 27ad: nibbles fold back to 10157; digit sum 32 ≡ 10157 (mod 15). -/
theorem enumeration_hex4_27ad : reassembles 10157 = true ∧ castsFifteens 10157 = true := by decide

/-- 27ae: nibbles fold back to 10158; digit sum 33 ≡ 10158 (mod 15). -/
theorem enumeration_hex4_27ae : reassembles 10158 = true ∧ castsFifteens 10158 = true := by decide

/-- 27af: nibbles fold back to 10159; digit sum 34 ≡ 10159 (mod 15). -/
theorem enumeration_hex4_27af : reassembles 10159 = true ∧ castsFifteens 10159 = true := by decide

/-- 27b0: nibbles fold back to 10160; digit sum 20 ≡ 10160 (mod 15). -/
theorem enumeration_hex4_27b0 : reassembles 10160 = true ∧ castsFifteens 10160 = true := by decide

/-- 27b1: nibbles fold back to 10161; digit sum 21 ≡ 10161 (mod 15). -/
theorem enumeration_hex4_27b1 : reassembles 10161 = true ∧ castsFifteens 10161 = true := by decide

/-- 27b2: nibbles fold back to 10162; digit sum 22 ≡ 10162 (mod 15). -/
theorem enumeration_hex4_27b2 : reassembles 10162 = true ∧ castsFifteens 10162 = true := by decide

/-- 27b3: nibbles fold back to 10163; digit sum 23 ≡ 10163 (mod 15). -/
theorem enumeration_hex4_27b3 : reassembles 10163 = true ∧ castsFifteens 10163 = true := by decide

/-- 27b4: nibbles fold back to 10164; digit sum 24 ≡ 10164 (mod 15). -/
theorem enumeration_hex4_27b4 : reassembles 10164 = true ∧ castsFifteens 10164 = true := by decide

/-- 27b5: nibbles fold back to 10165; digit sum 25 ≡ 10165 (mod 15). -/
theorem enumeration_hex4_27b5 : reassembles 10165 = true ∧ castsFifteens 10165 = true := by decide

/-- 27b6: nibbles fold back to 10166; digit sum 26 ≡ 10166 (mod 15). -/
theorem enumeration_hex4_27b6 : reassembles 10166 = true ∧ castsFifteens 10166 = true := by decide

/-- 27b7: nibbles fold back to 10167; digit sum 27 ≡ 10167 (mod 15). -/
theorem enumeration_hex4_27b7 : reassembles 10167 = true ∧ castsFifteens 10167 = true := by decide

/-- 27b8: nibbles fold back to 10168; digit sum 28 ≡ 10168 (mod 15). -/
theorem enumeration_hex4_27b8 : reassembles 10168 = true ∧ castsFifteens 10168 = true := by decide

/-- 27b9: nibbles fold back to 10169; digit sum 29 ≡ 10169 (mod 15). -/
theorem enumeration_hex4_27b9 : reassembles 10169 = true ∧ castsFifteens 10169 = true := by decide

/-- 27ba: nibbles fold back to 10170; digit sum 30 ≡ 10170 (mod 15). -/
theorem enumeration_hex4_27ba : reassembles 10170 = true ∧ castsFifteens 10170 = true := by decide

/-- 27bb: nibbles fold back to 10171; digit sum 31 ≡ 10171 (mod 15). -/
theorem enumeration_hex4_27bb : reassembles 10171 = true ∧ castsFifteens 10171 = true := by decide

/-- 27bc: nibbles fold back to 10172; digit sum 32 ≡ 10172 (mod 15). -/
theorem enumeration_hex4_27bc : reassembles 10172 = true ∧ castsFifteens 10172 = true := by decide

/-- 27bd: nibbles fold back to 10173; digit sum 33 ≡ 10173 (mod 15). -/
theorem enumeration_hex4_27bd : reassembles 10173 = true ∧ castsFifteens 10173 = true := by decide

/-- 27be: nibbles fold back to 10174; digit sum 34 ≡ 10174 (mod 15). -/
theorem enumeration_hex4_27be : reassembles 10174 = true ∧ castsFifteens 10174 = true := by decide

/-- 27bf: nibbles fold back to 10175; digit sum 35 ≡ 10175 (mod 15). -/
theorem enumeration_hex4_27bf : reassembles 10175 = true ∧ castsFifteens 10175 = true := by decide

/-- 27c0: nibbles fold back to 10176; digit sum 21 ≡ 10176 (mod 15). -/
theorem enumeration_hex4_27c0 : reassembles 10176 = true ∧ castsFifteens 10176 = true := by decide

/-- 27c1: nibbles fold back to 10177; digit sum 22 ≡ 10177 (mod 15). -/
theorem enumeration_hex4_27c1 : reassembles 10177 = true ∧ castsFifteens 10177 = true := by decide

/-- 27c2: nibbles fold back to 10178; digit sum 23 ≡ 10178 (mod 15). -/
theorem enumeration_hex4_27c2 : reassembles 10178 = true ∧ castsFifteens 10178 = true := by decide

/-- 27c3: nibbles fold back to 10179; digit sum 24 ≡ 10179 (mod 15). -/
theorem enumeration_hex4_27c3 : reassembles 10179 = true ∧ castsFifteens 10179 = true := by decide

/-- 27c4: nibbles fold back to 10180; digit sum 25 ≡ 10180 (mod 15). -/
theorem enumeration_hex4_27c4 : reassembles 10180 = true ∧ castsFifteens 10180 = true := by decide

/-- 27c5: nibbles fold back to 10181; digit sum 26 ≡ 10181 (mod 15). -/
theorem enumeration_hex4_27c5 : reassembles 10181 = true ∧ castsFifteens 10181 = true := by decide

/-- 27c6: nibbles fold back to 10182; digit sum 27 ≡ 10182 (mod 15). -/
theorem enumeration_hex4_27c6 : reassembles 10182 = true ∧ castsFifteens 10182 = true := by decide

/-- 27c7: nibbles fold back to 10183; digit sum 28 ≡ 10183 (mod 15). -/
theorem enumeration_hex4_27c7 : reassembles 10183 = true ∧ castsFifteens 10183 = true := by decide

/-- 27c8: nibbles fold back to 10184; digit sum 29 ≡ 10184 (mod 15). -/
theorem enumeration_hex4_27c8 : reassembles 10184 = true ∧ castsFifteens 10184 = true := by decide

/-- 27c9: nibbles fold back to 10185; digit sum 30 ≡ 10185 (mod 15). -/
theorem enumeration_hex4_27c9 : reassembles 10185 = true ∧ castsFifteens 10185 = true := by decide

/-- 27ca: nibbles fold back to 10186; digit sum 31 ≡ 10186 (mod 15). -/
theorem enumeration_hex4_27ca : reassembles 10186 = true ∧ castsFifteens 10186 = true := by decide

/-- 27cb: nibbles fold back to 10187; digit sum 32 ≡ 10187 (mod 15). -/
theorem enumeration_hex4_27cb : reassembles 10187 = true ∧ castsFifteens 10187 = true := by decide

/-- 27cc: nibbles fold back to 10188; digit sum 33 ≡ 10188 (mod 15). -/
theorem enumeration_hex4_27cc : reassembles 10188 = true ∧ castsFifteens 10188 = true := by decide

/-- 27cd: nibbles fold back to 10189; digit sum 34 ≡ 10189 (mod 15). -/
theorem enumeration_hex4_27cd : reassembles 10189 = true ∧ castsFifteens 10189 = true := by decide

/-- 27ce: nibbles fold back to 10190; digit sum 35 ≡ 10190 (mod 15). -/
theorem enumeration_hex4_27ce : reassembles 10190 = true ∧ castsFifteens 10190 = true := by decide

/-- 27cf: nibbles fold back to 10191; digit sum 36 ≡ 10191 (mod 15). -/
theorem enumeration_hex4_27cf : reassembles 10191 = true ∧ castsFifteens 10191 = true := by decide

/-- 27d0: nibbles fold back to 10192; digit sum 22 ≡ 10192 (mod 15). -/
theorem enumeration_hex4_27d0 : reassembles 10192 = true ∧ castsFifteens 10192 = true := by decide

/-- 27d1: nibbles fold back to 10193; digit sum 23 ≡ 10193 (mod 15). -/
theorem enumeration_hex4_27d1 : reassembles 10193 = true ∧ castsFifteens 10193 = true := by decide

/-- 27d2: nibbles fold back to 10194; digit sum 24 ≡ 10194 (mod 15). -/
theorem enumeration_hex4_27d2 : reassembles 10194 = true ∧ castsFifteens 10194 = true := by decide

/-- 27d3: nibbles fold back to 10195; digit sum 25 ≡ 10195 (mod 15). -/
theorem enumeration_hex4_27d3 : reassembles 10195 = true ∧ castsFifteens 10195 = true := by decide

/-- 27d4: nibbles fold back to 10196; digit sum 26 ≡ 10196 (mod 15). -/
theorem enumeration_hex4_27d4 : reassembles 10196 = true ∧ castsFifteens 10196 = true := by decide

/-- 27d5: nibbles fold back to 10197; digit sum 27 ≡ 10197 (mod 15). -/
theorem enumeration_hex4_27d5 : reassembles 10197 = true ∧ castsFifteens 10197 = true := by decide

/-- 27d6: nibbles fold back to 10198; digit sum 28 ≡ 10198 (mod 15). -/
theorem enumeration_hex4_27d6 : reassembles 10198 = true ∧ castsFifteens 10198 = true := by decide

/-- 27d7: nibbles fold back to 10199; digit sum 29 ≡ 10199 (mod 15). -/
theorem enumeration_hex4_27d7 : reassembles 10199 = true ∧ castsFifteens 10199 = true := by decide

/-- 27d8: nibbles fold back to 10200; digit sum 30 ≡ 10200 (mod 15). -/
theorem enumeration_hex4_27d8 : reassembles 10200 = true ∧ castsFifteens 10200 = true := by decide

/-- 27d9: nibbles fold back to 10201; digit sum 31 ≡ 10201 (mod 15). -/
theorem enumeration_hex4_27d9 : reassembles 10201 = true ∧ castsFifteens 10201 = true := by decide

/-- 27da: nibbles fold back to 10202; digit sum 32 ≡ 10202 (mod 15). -/
theorem enumeration_hex4_27da : reassembles 10202 = true ∧ castsFifteens 10202 = true := by decide

/-- 27db: nibbles fold back to 10203; digit sum 33 ≡ 10203 (mod 15). -/
theorem enumeration_hex4_27db : reassembles 10203 = true ∧ castsFifteens 10203 = true := by decide

/-- 27dc: nibbles fold back to 10204; digit sum 34 ≡ 10204 (mod 15). -/
theorem enumeration_hex4_27dc : reassembles 10204 = true ∧ castsFifteens 10204 = true := by decide

/-- 27dd: nibbles fold back to 10205; digit sum 35 ≡ 10205 (mod 15). -/
theorem enumeration_hex4_27dd : reassembles 10205 = true ∧ castsFifteens 10205 = true := by decide

/-- 27de: nibbles fold back to 10206; digit sum 36 ≡ 10206 (mod 15). -/
theorem enumeration_hex4_27de : reassembles 10206 = true ∧ castsFifteens 10206 = true := by decide

/-- 27df: nibbles fold back to 10207; digit sum 37 ≡ 10207 (mod 15). -/
theorem enumeration_hex4_27df : reassembles 10207 = true ∧ castsFifteens 10207 = true := by decide

/-- 27e0: nibbles fold back to 10208; digit sum 23 ≡ 10208 (mod 15). -/
theorem enumeration_hex4_27e0 : reassembles 10208 = true ∧ castsFifteens 10208 = true := by decide

/-- 27e1: nibbles fold back to 10209; digit sum 24 ≡ 10209 (mod 15). -/
theorem enumeration_hex4_27e1 : reassembles 10209 = true ∧ castsFifteens 10209 = true := by decide

/-- 27e2: nibbles fold back to 10210; digit sum 25 ≡ 10210 (mod 15). -/
theorem enumeration_hex4_27e2 : reassembles 10210 = true ∧ castsFifteens 10210 = true := by decide

/-- 27e3: nibbles fold back to 10211; digit sum 26 ≡ 10211 (mod 15). -/
theorem enumeration_hex4_27e3 : reassembles 10211 = true ∧ castsFifteens 10211 = true := by decide

/-- 27e4: nibbles fold back to 10212; digit sum 27 ≡ 10212 (mod 15). -/
theorem enumeration_hex4_27e4 : reassembles 10212 = true ∧ castsFifteens 10212 = true := by decide

/-- 27e5: nibbles fold back to 10213; digit sum 28 ≡ 10213 (mod 15). -/
theorem enumeration_hex4_27e5 : reassembles 10213 = true ∧ castsFifteens 10213 = true := by decide

/-- 27e6: nibbles fold back to 10214; digit sum 29 ≡ 10214 (mod 15). -/
theorem enumeration_hex4_27e6 : reassembles 10214 = true ∧ castsFifteens 10214 = true := by decide

/-- 27e7: nibbles fold back to 10215; digit sum 30 ≡ 10215 (mod 15). -/
theorem enumeration_hex4_27e7 : reassembles 10215 = true ∧ castsFifteens 10215 = true := by decide

/-- 27e8: nibbles fold back to 10216; digit sum 31 ≡ 10216 (mod 15). -/
theorem enumeration_hex4_27e8 : reassembles 10216 = true ∧ castsFifteens 10216 = true := by decide

/-- 27e9: nibbles fold back to 10217; digit sum 32 ≡ 10217 (mod 15). -/
theorem enumeration_hex4_27e9 : reassembles 10217 = true ∧ castsFifteens 10217 = true := by decide

/-- 27ea: nibbles fold back to 10218; digit sum 33 ≡ 10218 (mod 15). -/
theorem enumeration_hex4_27ea : reassembles 10218 = true ∧ castsFifteens 10218 = true := by decide

/-- 27eb: nibbles fold back to 10219; digit sum 34 ≡ 10219 (mod 15). -/
theorem enumeration_hex4_27eb : reassembles 10219 = true ∧ castsFifteens 10219 = true := by decide

/-- 27ec: nibbles fold back to 10220; digit sum 35 ≡ 10220 (mod 15). -/
theorem enumeration_hex4_27ec : reassembles 10220 = true ∧ castsFifteens 10220 = true := by decide

/-- 27ed: nibbles fold back to 10221; digit sum 36 ≡ 10221 (mod 15). -/
theorem enumeration_hex4_27ed : reassembles 10221 = true ∧ castsFifteens 10221 = true := by decide

/-- 27ee: nibbles fold back to 10222; digit sum 37 ≡ 10222 (mod 15). -/
theorem enumeration_hex4_27ee : reassembles 10222 = true ∧ castsFifteens 10222 = true := by decide

/-- 27ef: nibbles fold back to 10223; digit sum 38 ≡ 10223 (mod 15). -/
theorem enumeration_hex4_27ef : reassembles 10223 = true ∧ castsFifteens 10223 = true := by decide

/-- 27f0: nibbles fold back to 10224; digit sum 24 ≡ 10224 (mod 15). -/
theorem enumeration_hex4_27f0 : reassembles 10224 = true ∧ castsFifteens 10224 = true := by decide

/-- 27f1: nibbles fold back to 10225; digit sum 25 ≡ 10225 (mod 15). -/
theorem enumeration_hex4_27f1 : reassembles 10225 = true ∧ castsFifteens 10225 = true := by decide

/-- 27f2: nibbles fold back to 10226; digit sum 26 ≡ 10226 (mod 15). -/
theorem enumeration_hex4_27f2 : reassembles 10226 = true ∧ castsFifteens 10226 = true := by decide

/-- 27f3: nibbles fold back to 10227; digit sum 27 ≡ 10227 (mod 15). -/
theorem enumeration_hex4_27f3 : reassembles 10227 = true ∧ castsFifteens 10227 = true := by decide

/-- 27f4: nibbles fold back to 10228; digit sum 28 ≡ 10228 (mod 15). -/
theorem enumeration_hex4_27f4 : reassembles 10228 = true ∧ castsFifteens 10228 = true := by decide

/-- 27f5: nibbles fold back to 10229; digit sum 29 ≡ 10229 (mod 15). -/
theorem enumeration_hex4_27f5 : reassembles 10229 = true ∧ castsFifteens 10229 = true := by decide

/-- 27f6: nibbles fold back to 10230; digit sum 30 ≡ 10230 (mod 15). -/
theorem enumeration_hex4_27f6 : reassembles 10230 = true ∧ castsFifteens 10230 = true := by decide

/-- 27f7: nibbles fold back to 10231; digit sum 31 ≡ 10231 (mod 15). -/
theorem enumeration_hex4_27f7 : reassembles 10231 = true ∧ castsFifteens 10231 = true := by decide

/-- 27f8: nibbles fold back to 10232; digit sum 32 ≡ 10232 (mod 15). -/
theorem enumeration_hex4_27f8 : reassembles 10232 = true ∧ castsFifteens 10232 = true := by decide

/-- 27f9: nibbles fold back to 10233; digit sum 33 ≡ 10233 (mod 15). -/
theorem enumeration_hex4_27f9 : reassembles 10233 = true ∧ castsFifteens 10233 = true := by decide

/-- 27fa: nibbles fold back to 10234; digit sum 34 ≡ 10234 (mod 15). -/
theorem enumeration_hex4_27fa : reassembles 10234 = true ∧ castsFifteens 10234 = true := by decide

/-- 27fb: nibbles fold back to 10235; digit sum 35 ≡ 10235 (mod 15). -/
theorem enumeration_hex4_27fb : reassembles 10235 = true ∧ castsFifteens 10235 = true := by decide

/-- 27fc: nibbles fold back to 10236; digit sum 36 ≡ 10236 (mod 15). -/
theorem enumeration_hex4_27fc : reassembles 10236 = true ∧ castsFifteens 10236 = true := by decide

/-- 27fd: nibbles fold back to 10237; digit sum 37 ≡ 10237 (mod 15). -/
theorem enumeration_hex4_27fd : reassembles 10237 = true ∧ castsFifteens 10237 = true := by decide

/-- 27fe: nibbles fold back to 10238; digit sum 38 ≡ 10238 (mod 15). -/
theorem enumeration_hex4_27fe : reassembles 10238 = true ∧ castsFifteens 10238 = true := by decide

/-- 27ff: nibbles fold back to 10239; digit sum 39 ≡ 10239 (mod 15). -/
theorem enumeration_hex4_27ff : reassembles 10239 = true ∧ castsFifteens 10239 = true := by decide

/-- 2800: nibbles fold back to 10240; digit sum 10 ≡ 10240 (mod 15). -/
theorem enumeration_hex4_2800 : reassembles 10240 = true ∧ castsFifteens 10240 = true := by decide

/-- 2801: nibbles fold back to 10241; digit sum 11 ≡ 10241 (mod 15). -/
theorem enumeration_hex4_2801 : reassembles 10241 = true ∧ castsFifteens 10241 = true := by decide

/-- 2802: nibbles fold back to 10242; digit sum 12 ≡ 10242 (mod 15). -/
theorem enumeration_hex4_2802 : reassembles 10242 = true ∧ castsFifteens 10242 = true := by decide

/-- 2803: nibbles fold back to 10243; digit sum 13 ≡ 10243 (mod 15). -/
theorem enumeration_hex4_2803 : reassembles 10243 = true ∧ castsFifteens 10243 = true := by decide

/-- 2804: nibbles fold back to 10244; digit sum 14 ≡ 10244 (mod 15). -/
theorem enumeration_hex4_2804 : reassembles 10244 = true ∧ castsFifteens 10244 = true := by decide

/-- 2805: nibbles fold back to 10245; digit sum 15 ≡ 10245 (mod 15). -/
theorem enumeration_hex4_2805 : reassembles 10245 = true ∧ castsFifteens 10245 = true := by decide

/-- 2806: nibbles fold back to 10246; digit sum 16 ≡ 10246 (mod 15). -/
theorem enumeration_hex4_2806 : reassembles 10246 = true ∧ castsFifteens 10246 = true := by decide

/-- 2807: nibbles fold back to 10247; digit sum 17 ≡ 10247 (mod 15). -/
theorem enumeration_hex4_2807 : reassembles 10247 = true ∧ castsFifteens 10247 = true := by decide

/-- 2808: nibbles fold back to 10248; digit sum 18 ≡ 10248 (mod 15). -/
theorem enumeration_hex4_2808 : reassembles 10248 = true ∧ castsFifteens 10248 = true := by decide

/-- 2809: nibbles fold back to 10249; digit sum 19 ≡ 10249 (mod 15). -/
theorem enumeration_hex4_2809 : reassembles 10249 = true ∧ castsFifteens 10249 = true := by decide

/-- 280a: nibbles fold back to 10250; digit sum 20 ≡ 10250 (mod 15). -/
theorem enumeration_hex4_280a : reassembles 10250 = true ∧ castsFifteens 10250 = true := by decide

/-- 280b: nibbles fold back to 10251; digit sum 21 ≡ 10251 (mod 15). -/
theorem enumeration_hex4_280b : reassembles 10251 = true ∧ castsFifteens 10251 = true := by decide

/-- 280c: nibbles fold back to 10252; digit sum 22 ≡ 10252 (mod 15). -/
theorem enumeration_hex4_280c : reassembles 10252 = true ∧ castsFifteens 10252 = true := by decide

/-- 280d: nibbles fold back to 10253; digit sum 23 ≡ 10253 (mod 15). -/
theorem enumeration_hex4_280d : reassembles 10253 = true ∧ castsFifteens 10253 = true := by decide

/-- 280e: nibbles fold back to 10254; digit sum 24 ≡ 10254 (mod 15). -/
theorem enumeration_hex4_280e : reassembles 10254 = true ∧ castsFifteens 10254 = true := by decide

/-- 280f: nibbles fold back to 10255; digit sum 25 ≡ 10255 (mod 15). -/
theorem enumeration_hex4_280f : reassembles 10255 = true ∧ castsFifteens 10255 = true := by decide

/-- 2810: nibbles fold back to 10256; digit sum 11 ≡ 10256 (mod 15). -/
theorem enumeration_hex4_2810 : reassembles 10256 = true ∧ castsFifteens 10256 = true := by decide

/-- 2811: nibbles fold back to 10257; digit sum 12 ≡ 10257 (mod 15). -/
theorem enumeration_hex4_2811 : reassembles 10257 = true ∧ castsFifteens 10257 = true := by decide

/-- 2812: nibbles fold back to 10258; digit sum 13 ≡ 10258 (mod 15). -/
theorem enumeration_hex4_2812 : reassembles 10258 = true ∧ castsFifteens 10258 = true := by decide

/-- 2813: nibbles fold back to 10259; digit sum 14 ≡ 10259 (mod 15). -/
theorem enumeration_hex4_2813 : reassembles 10259 = true ∧ castsFifteens 10259 = true := by decide

/-- 2814: nibbles fold back to 10260; digit sum 15 ≡ 10260 (mod 15). -/
theorem enumeration_hex4_2814 : reassembles 10260 = true ∧ castsFifteens 10260 = true := by decide

/-- 2815: nibbles fold back to 10261; digit sum 16 ≡ 10261 (mod 15). -/
theorem enumeration_hex4_2815 : reassembles 10261 = true ∧ castsFifteens 10261 = true := by decide

/-- 2816: nibbles fold back to 10262; digit sum 17 ≡ 10262 (mod 15). -/
theorem enumeration_hex4_2816 : reassembles 10262 = true ∧ castsFifteens 10262 = true := by decide

/-- 2817: nibbles fold back to 10263; digit sum 18 ≡ 10263 (mod 15). -/
theorem enumeration_hex4_2817 : reassembles 10263 = true ∧ castsFifteens 10263 = true := by decide

/-- 2818: nibbles fold back to 10264; digit sum 19 ≡ 10264 (mod 15). -/
theorem enumeration_hex4_2818 : reassembles 10264 = true ∧ castsFifteens 10264 = true := by decide

/-- 2819: nibbles fold back to 10265; digit sum 20 ≡ 10265 (mod 15). -/
theorem enumeration_hex4_2819 : reassembles 10265 = true ∧ castsFifteens 10265 = true := by decide

/-- 281a: nibbles fold back to 10266; digit sum 21 ≡ 10266 (mod 15). -/
theorem enumeration_hex4_281a : reassembles 10266 = true ∧ castsFifteens 10266 = true := by decide

/-- 281b: nibbles fold back to 10267; digit sum 22 ≡ 10267 (mod 15). -/
theorem enumeration_hex4_281b : reassembles 10267 = true ∧ castsFifteens 10267 = true := by decide

/-- 281c: nibbles fold back to 10268; digit sum 23 ≡ 10268 (mod 15). -/
theorem enumeration_hex4_281c : reassembles 10268 = true ∧ castsFifteens 10268 = true := by decide

/-- 281d: nibbles fold back to 10269; digit sum 24 ≡ 10269 (mod 15). -/
theorem enumeration_hex4_281d : reassembles 10269 = true ∧ castsFifteens 10269 = true := by decide

/-- 281e: nibbles fold back to 10270; digit sum 25 ≡ 10270 (mod 15). -/
theorem enumeration_hex4_281e : reassembles 10270 = true ∧ castsFifteens 10270 = true := by decide

/-- 281f: nibbles fold back to 10271; digit sum 26 ≡ 10271 (mod 15). -/
theorem enumeration_hex4_281f : reassembles 10271 = true ∧ castsFifteens 10271 = true := by decide

/-- 2820: nibbles fold back to 10272; digit sum 12 ≡ 10272 (mod 15). -/
theorem enumeration_hex4_2820 : reassembles 10272 = true ∧ castsFifteens 10272 = true := by decide

/-- 2821: nibbles fold back to 10273; digit sum 13 ≡ 10273 (mod 15). -/
theorem enumeration_hex4_2821 : reassembles 10273 = true ∧ castsFifteens 10273 = true := by decide

/-- 2822: nibbles fold back to 10274; digit sum 14 ≡ 10274 (mod 15). -/
theorem enumeration_hex4_2822 : reassembles 10274 = true ∧ castsFifteens 10274 = true := by decide

/-- 2823: nibbles fold back to 10275; digit sum 15 ≡ 10275 (mod 15). -/
theorem enumeration_hex4_2823 : reassembles 10275 = true ∧ castsFifteens 10275 = true := by decide

/-- 2824: nibbles fold back to 10276; digit sum 16 ≡ 10276 (mod 15). -/
theorem enumeration_hex4_2824 : reassembles 10276 = true ∧ castsFifteens 10276 = true := by decide

/-- 2825: nibbles fold back to 10277; digit sum 17 ≡ 10277 (mod 15). -/
theorem enumeration_hex4_2825 : reassembles 10277 = true ∧ castsFifteens 10277 = true := by decide

/-- 2826: nibbles fold back to 10278; digit sum 18 ≡ 10278 (mod 15). -/
theorem enumeration_hex4_2826 : reassembles 10278 = true ∧ castsFifteens 10278 = true := by decide

/-- 2827: nibbles fold back to 10279; digit sum 19 ≡ 10279 (mod 15). -/
theorem enumeration_hex4_2827 : reassembles 10279 = true ∧ castsFifteens 10279 = true := by decide

/-- 2828: nibbles fold back to 10280; digit sum 20 ≡ 10280 (mod 15). -/
theorem enumeration_hex4_2828 : reassembles 10280 = true ∧ castsFifteens 10280 = true := by decide

/-- 2829: nibbles fold back to 10281; digit sum 21 ≡ 10281 (mod 15). -/
theorem enumeration_hex4_2829 : reassembles 10281 = true ∧ castsFifteens 10281 = true := by decide

/-- 282a: nibbles fold back to 10282; digit sum 22 ≡ 10282 (mod 15). -/
theorem enumeration_hex4_282a : reassembles 10282 = true ∧ castsFifteens 10282 = true := by decide

/-- 282b: nibbles fold back to 10283; digit sum 23 ≡ 10283 (mod 15). -/
theorem enumeration_hex4_282b : reassembles 10283 = true ∧ castsFifteens 10283 = true := by decide

/-- 282c: nibbles fold back to 10284; digit sum 24 ≡ 10284 (mod 15). -/
theorem enumeration_hex4_282c : reassembles 10284 = true ∧ castsFifteens 10284 = true := by decide

/-- 282d: nibbles fold back to 10285; digit sum 25 ≡ 10285 (mod 15). -/
theorem enumeration_hex4_282d : reassembles 10285 = true ∧ castsFifteens 10285 = true := by decide

/-- 282e: nibbles fold back to 10286; digit sum 26 ≡ 10286 (mod 15). -/
theorem enumeration_hex4_282e : reassembles 10286 = true ∧ castsFifteens 10286 = true := by decide

/-- 282f: nibbles fold back to 10287; digit sum 27 ≡ 10287 (mod 15). -/
theorem enumeration_hex4_282f : reassembles 10287 = true ∧ castsFifteens 10287 = true := by decide

/-- 2830: nibbles fold back to 10288; digit sum 13 ≡ 10288 (mod 15). -/
theorem enumeration_hex4_2830 : reassembles 10288 = true ∧ castsFifteens 10288 = true := by decide

/-- 2831: nibbles fold back to 10289; digit sum 14 ≡ 10289 (mod 15). -/
theorem enumeration_hex4_2831 : reassembles 10289 = true ∧ castsFifteens 10289 = true := by decide

/-- 2832: nibbles fold back to 10290; digit sum 15 ≡ 10290 (mod 15). -/
theorem enumeration_hex4_2832 : reassembles 10290 = true ∧ castsFifteens 10290 = true := by decide

/-- 2833: nibbles fold back to 10291; digit sum 16 ≡ 10291 (mod 15). -/
theorem enumeration_hex4_2833 : reassembles 10291 = true ∧ castsFifteens 10291 = true := by decide

/-- 2834: nibbles fold back to 10292; digit sum 17 ≡ 10292 (mod 15). -/
theorem enumeration_hex4_2834 : reassembles 10292 = true ∧ castsFifteens 10292 = true := by decide

/-- 2835: nibbles fold back to 10293; digit sum 18 ≡ 10293 (mod 15). -/
theorem enumeration_hex4_2835 : reassembles 10293 = true ∧ castsFifteens 10293 = true := by decide

/-- 2836: nibbles fold back to 10294; digit sum 19 ≡ 10294 (mod 15). -/
theorem enumeration_hex4_2836 : reassembles 10294 = true ∧ castsFifteens 10294 = true := by decide

/-- 2837: nibbles fold back to 10295; digit sum 20 ≡ 10295 (mod 15). -/
theorem enumeration_hex4_2837 : reassembles 10295 = true ∧ castsFifteens 10295 = true := by decide

/-- 2838: nibbles fold back to 10296; digit sum 21 ≡ 10296 (mod 15). -/
theorem enumeration_hex4_2838 : reassembles 10296 = true ∧ castsFifteens 10296 = true := by decide

/-- 2839: nibbles fold back to 10297; digit sum 22 ≡ 10297 (mod 15). -/
theorem enumeration_hex4_2839 : reassembles 10297 = true ∧ castsFifteens 10297 = true := by decide

/-- 283a: nibbles fold back to 10298; digit sum 23 ≡ 10298 (mod 15). -/
theorem enumeration_hex4_283a : reassembles 10298 = true ∧ castsFifteens 10298 = true := by decide

/-- 283b: nibbles fold back to 10299; digit sum 24 ≡ 10299 (mod 15). -/
theorem enumeration_hex4_283b : reassembles 10299 = true ∧ castsFifteens 10299 = true := by decide

/-- 283c: nibbles fold back to 10300; digit sum 25 ≡ 10300 (mod 15). -/
theorem enumeration_hex4_283c : reassembles 10300 = true ∧ castsFifteens 10300 = true := by decide

/-- 283d: nibbles fold back to 10301; digit sum 26 ≡ 10301 (mod 15). -/
theorem enumeration_hex4_283d : reassembles 10301 = true ∧ castsFifteens 10301 = true := by decide

/-- 283e: nibbles fold back to 10302; digit sum 27 ≡ 10302 (mod 15). -/
theorem enumeration_hex4_283e : reassembles 10302 = true ∧ castsFifteens 10302 = true := by decide

/-- 283f: nibbles fold back to 10303; digit sum 28 ≡ 10303 (mod 15). -/
theorem enumeration_hex4_283f : reassembles 10303 = true ∧ castsFifteens 10303 = true := by decide

/-- 2840: nibbles fold back to 10304; digit sum 14 ≡ 10304 (mod 15). -/
theorem enumeration_hex4_2840 : reassembles 10304 = true ∧ castsFifteens 10304 = true := by decide

/-- 2841: nibbles fold back to 10305; digit sum 15 ≡ 10305 (mod 15). -/
theorem enumeration_hex4_2841 : reassembles 10305 = true ∧ castsFifteens 10305 = true := by decide

/-- 2842: nibbles fold back to 10306; digit sum 16 ≡ 10306 (mod 15). -/
theorem enumeration_hex4_2842 : reassembles 10306 = true ∧ castsFifteens 10306 = true := by decide

/-- 2843: nibbles fold back to 10307; digit sum 17 ≡ 10307 (mod 15). -/
theorem enumeration_hex4_2843 : reassembles 10307 = true ∧ castsFifteens 10307 = true := by decide

/-- 2844: nibbles fold back to 10308; digit sum 18 ≡ 10308 (mod 15). -/
theorem enumeration_hex4_2844 : reassembles 10308 = true ∧ castsFifteens 10308 = true := by decide

/-- 2845: nibbles fold back to 10309; digit sum 19 ≡ 10309 (mod 15). -/
theorem enumeration_hex4_2845 : reassembles 10309 = true ∧ castsFifteens 10309 = true := by decide

/-- 2846: nibbles fold back to 10310; digit sum 20 ≡ 10310 (mod 15). -/
theorem enumeration_hex4_2846 : reassembles 10310 = true ∧ castsFifteens 10310 = true := by decide

/-- 2847: nibbles fold back to 10311; digit sum 21 ≡ 10311 (mod 15). -/
theorem enumeration_hex4_2847 : reassembles 10311 = true ∧ castsFifteens 10311 = true := by decide

/-- 2848: nibbles fold back to 10312; digit sum 22 ≡ 10312 (mod 15). -/
theorem enumeration_hex4_2848 : reassembles 10312 = true ∧ castsFifteens 10312 = true := by decide

/-- 2849: nibbles fold back to 10313; digit sum 23 ≡ 10313 (mod 15). -/
theorem enumeration_hex4_2849 : reassembles 10313 = true ∧ castsFifteens 10313 = true := by decide

/-- 284a: nibbles fold back to 10314; digit sum 24 ≡ 10314 (mod 15). -/
theorem enumeration_hex4_284a : reassembles 10314 = true ∧ castsFifteens 10314 = true := by decide

/-- 284b: nibbles fold back to 10315; digit sum 25 ≡ 10315 (mod 15). -/
theorem enumeration_hex4_284b : reassembles 10315 = true ∧ castsFifteens 10315 = true := by decide

/-- 284c: nibbles fold back to 10316; digit sum 26 ≡ 10316 (mod 15). -/
theorem enumeration_hex4_284c : reassembles 10316 = true ∧ castsFifteens 10316 = true := by decide

/-- 284d: nibbles fold back to 10317; digit sum 27 ≡ 10317 (mod 15). -/
theorem enumeration_hex4_284d : reassembles 10317 = true ∧ castsFifteens 10317 = true := by decide

/-- 284e: nibbles fold back to 10318; digit sum 28 ≡ 10318 (mod 15). -/
theorem enumeration_hex4_284e : reassembles 10318 = true ∧ castsFifteens 10318 = true := by decide

/-- 284f: nibbles fold back to 10319; digit sum 29 ≡ 10319 (mod 15). -/
theorem enumeration_hex4_284f : reassembles 10319 = true ∧ castsFifteens 10319 = true := by decide

/-- 2850: nibbles fold back to 10320; digit sum 15 ≡ 10320 (mod 15). -/
theorem enumeration_hex4_2850 : reassembles 10320 = true ∧ castsFifteens 10320 = true := by decide

/-- 2851: nibbles fold back to 10321; digit sum 16 ≡ 10321 (mod 15). -/
theorem enumeration_hex4_2851 : reassembles 10321 = true ∧ castsFifteens 10321 = true := by decide

/-- 2852: nibbles fold back to 10322; digit sum 17 ≡ 10322 (mod 15). -/
theorem enumeration_hex4_2852 : reassembles 10322 = true ∧ castsFifteens 10322 = true := by decide

/-- 2853: nibbles fold back to 10323; digit sum 18 ≡ 10323 (mod 15). -/
theorem enumeration_hex4_2853 : reassembles 10323 = true ∧ castsFifteens 10323 = true := by decide

/-- 2854: nibbles fold back to 10324; digit sum 19 ≡ 10324 (mod 15). -/
theorem enumeration_hex4_2854 : reassembles 10324 = true ∧ castsFifteens 10324 = true := by decide

/-- 2855: nibbles fold back to 10325; digit sum 20 ≡ 10325 (mod 15). -/
theorem enumeration_hex4_2855 : reassembles 10325 = true ∧ castsFifteens 10325 = true := by decide

/-- 2856: nibbles fold back to 10326; digit sum 21 ≡ 10326 (mod 15). -/
theorem enumeration_hex4_2856 : reassembles 10326 = true ∧ castsFifteens 10326 = true := by decide

/-- 2857: nibbles fold back to 10327; digit sum 22 ≡ 10327 (mod 15). -/
theorem enumeration_hex4_2857 : reassembles 10327 = true ∧ castsFifteens 10327 = true := by decide

/-- 2858: nibbles fold back to 10328; digit sum 23 ≡ 10328 (mod 15). -/
theorem enumeration_hex4_2858 : reassembles 10328 = true ∧ castsFifteens 10328 = true := by decide

/-- 2859: nibbles fold back to 10329; digit sum 24 ≡ 10329 (mod 15). -/
theorem enumeration_hex4_2859 : reassembles 10329 = true ∧ castsFifteens 10329 = true := by decide

/-- 285a: nibbles fold back to 10330; digit sum 25 ≡ 10330 (mod 15). -/
theorem enumeration_hex4_285a : reassembles 10330 = true ∧ castsFifteens 10330 = true := by decide

/-- 285b: nibbles fold back to 10331; digit sum 26 ≡ 10331 (mod 15). -/
theorem enumeration_hex4_285b : reassembles 10331 = true ∧ castsFifteens 10331 = true := by decide

/-- 285c: nibbles fold back to 10332; digit sum 27 ≡ 10332 (mod 15). -/
theorem enumeration_hex4_285c : reassembles 10332 = true ∧ castsFifteens 10332 = true := by decide

/-- 285d: nibbles fold back to 10333; digit sum 28 ≡ 10333 (mod 15). -/
theorem enumeration_hex4_285d : reassembles 10333 = true ∧ castsFifteens 10333 = true := by decide

/-- 285e: nibbles fold back to 10334; digit sum 29 ≡ 10334 (mod 15). -/
theorem enumeration_hex4_285e : reassembles 10334 = true ∧ castsFifteens 10334 = true := by decide

/-- 285f: nibbles fold back to 10335; digit sum 30 ≡ 10335 (mod 15). -/
theorem enumeration_hex4_285f : reassembles 10335 = true ∧ castsFifteens 10335 = true := by decide

/-- 2860: nibbles fold back to 10336; digit sum 16 ≡ 10336 (mod 15). -/
theorem enumeration_hex4_2860 : reassembles 10336 = true ∧ castsFifteens 10336 = true := by decide

/-- 2861: nibbles fold back to 10337; digit sum 17 ≡ 10337 (mod 15). -/
theorem enumeration_hex4_2861 : reassembles 10337 = true ∧ castsFifteens 10337 = true := by decide

/-- 2862: nibbles fold back to 10338; digit sum 18 ≡ 10338 (mod 15). -/
theorem enumeration_hex4_2862 : reassembles 10338 = true ∧ castsFifteens 10338 = true := by decide

/-- 2863: nibbles fold back to 10339; digit sum 19 ≡ 10339 (mod 15). -/
theorem enumeration_hex4_2863 : reassembles 10339 = true ∧ castsFifteens 10339 = true := by decide

/-- 2864: nibbles fold back to 10340; digit sum 20 ≡ 10340 (mod 15). -/
theorem enumeration_hex4_2864 : reassembles 10340 = true ∧ castsFifteens 10340 = true := by decide

/-- 2865: nibbles fold back to 10341; digit sum 21 ≡ 10341 (mod 15). -/
theorem enumeration_hex4_2865 : reassembles 10341 = true ∧ castsFifteens 10341 = true := by decide

/-- 2866: nibbles fold back to 10342; digit sum 22 ≡ 10342 (mod 15). -/
theorem enumeration_hex4_2866 : reassembles 10342 = true ∧ castsFifteens 10342 = true := by decide

/-- 2867: nibbles fold back to 10343; digit sum 23 ≡ 10343 (mod 15). -/
theorem enumeration_hex4_2867 : reassembles 10343 = true ∧ castsFifteens 10343 = true := by decide

/-- 2868: nibbles fold back to 10344; digit sum 24 ≡ 10344 (mod 15). -/
theorem enumeration_hex4_2868 : reassembles 10344 = true ∧ castsFifteens 10344 = true := by decide

/-- 2869: nibbles fold back to 10345; digit sum 25 ≡ 10345 (mod 15). -/
theorem enumeration_hex4_2869 : reassembles 10345 = true ∧ castsFifteens 10345 = true := by decide

/-- 286a: nibbles fold back to 10346; digit sum 26 ≡ 10346 (mod 15). -/
theorem enumeration_hex4_286a : reassembles 10346 = true ∧ castsFifteens 10346 = true := by decide

/-- 286b: nibbles fold back to 10347; digit sum 27 ≡ 10347 (mod 15). -/
theorem enumeration_hex4_286b : reassembles 10347 = true ∧ castsFifteens 10347 = true := by decide

/-- 286c: nibbles fold back to 10348; digit sum 28 ≡ 10348 (mod 15). -/
theorem enumeration_hex4_286c : reassembles 10348 = true ∧ castsFifteens 10348 = true := by decide

/-- 286d: nibbles fold back to 10349; digit sum 29 ≡ 10349 (mod 15). -/
theorem enumeration_hex4_286d : reassembles 10349 = true ∧ castsFifteens 10349 = true := by decide

/-- 286e: nibbles fold back to 10350; digit sum 30 ≡ 10350 (mod 15). -/
theorem enumeration_hex4_286e : reassembles 10350 = true ∧ castsFifteens 10350 = true := by decide

/-- 286f: nibbles fold back to 10351; digit sum 31 ≡ 10351 (mod 15). -/
theorem enumeration_hex4_286f : reassembles 10351 = true ∧ castsFifteens 10351 = true := by decide

/-- 2870: nibbles fold back to 10352; digit sum 17 ≡ 10352 (mod 15). -/
theorem enumeration_hex4_2870 : reassembles 10352 = true ∧ castsFifteens 10352 = true := by decide

/-- 2871: nibbles fold back to 10353; digit sum 18 ≡ 10353 (mod 15). -/
theorem enumeration_hex4_2871 : reassembles 10353 = true ∧ castsFifteens 10353 = true := by decide

/-- 2872: nibbles fold back to 10354; digit sum 19 ≡ 10354 (mod 15). -/
theorem enumeration_hex4_2872 : reassembles 10354 = true ∧ castsFifteens 10354 = true := by decide

/-- 2873: nibbles fold back to 10355; digit sum 20 ≡ 10355 (mod 15). -/
theorem enumeration_hex4_2873 : reassembles 10355 = true ∧ castsFifteens 10355 = true := by decide

/-- 2874: nibbles fold back to 10356; digit sum 21 ≡ 10356 (mod 15). -/
theorem enumeration_hex4_2874 : reassembles 10356 = true ∧ castsFifteens 10356 = true := by decide

/-- 2875: nibbles fold back to 10357; digit sum 22 ≡ 10357 (mod 15). -/
theorem enumeration_hex4_2875 : reassembles 10357 = true ∧ castsFifteens 10357 = true := by decide

/-- 2876: nibbles fold back to 10358; digit sum 23 ≡ 10358 (mod 15). -/
theorem enumeration_hex4_2876 : reassembles 10358 = true ∧ castsFifteens 10358 = true := by decide

/-- 2877: nibbles fold back to 10359; digit sum 24 ≡ 10359 (mod 15). -/
theorem enumeration_hex4_2877 : reassembles 10359 = true ∧ castsFifteens 10359 = true := by decide

/-- 2878: nibbles fold back to 10360; digit sum 25 ≡ 10360 (mod 15). -/
theorem enumeration_hex4_2878 : reassembles 10360 = true ∧ castsFifteens 10360 = true := by decide

/-- 2879: nibbles fold back to 10361; digit sum 26 ≡ 10361 (mod 15). -/
theorem enumeration_hex4_2879 : reassembles 10361 = true ∧ castsFifteens 10361 = true := by decide

/-- 287a: nibbles fold back to 10362; digit sum 27 ≡ 10362 (mod 15). -/
theorem enumeration_hex4_287a : reassembles 10362 = true ∧ castsFifteens 10362 = true := by decide

/-- 287b: nibbles fold back to 10363; digit sum 28 ≡ 10363 (mod 15). -/
theorem enumeration_hex4_287b : reassembles 10363 = true ∧ castsFifteens 10363 = true := by decide

/-- 287c: nibbles fold back to 10364; digit sum 29 ≡ 10364 (mod 15). -/
theorem enumeration_hex4_287c : reassembles 10364 = true ∧ castsFifteens 10364 = true := by decide

/-- 287d: nibbles fold back to 10365; digit sum 30 ≡ 10365 (mod 15). -/
theorem enumeration_hex4_287d : reassembles 10365 = true ∧ castsFifteens 10365 = true := by decide

/-- 287e: nibbles fold back to 10366; digit sum 31 ≡ 10366 (mod 15). -/
theorem enumeration_hex4_287e : reassembles 10366 = true ∧ castsFifteens 10366 = true := by decide

/-- 287f: nibbles fold back to 10367; digit sum 32 ≡ 10367 (mod 15). -/
theorem enumeration_hex4_287f : reassembles 10367 = true ∧ castsFifteens 10367 = true := by decide

/-- 2880: nibbles fold back to 10368; digit sum 18 ≡ 10368 (mod 15). -/
theorem enumeration_hex4_2880 : reassembles 10368 = true ∧ castsFifteens 10368 = true := by decide

/-- 2881: nibbles fold back to 10369; digit sum 19 ≡ 10369 (mod 15). -/
theorem enumeration_hex4_2881 : reassembles 10369 = true ∧ castsFifteens 10369 = true := by decide

/-- 2882: nibbles fold back to 10370; digit sum 20 ≡ 10370 (mod 15). -/
theorem enumeration_hex4_2882 : reassembles 10370 = true ∧ castsFifteens 10370 = true := by decide

/-- 2883: nibbles fold back to 10371; digit sum 21 ≡ 10371 (mod 15). -/
theorem enumeration_hex4_2883 : reassembles 10371 = true ∧ castsFifteens 10371 = true := by decide

/-- 2884: nibbles fold back to 10372; digit sum 22 ≡ 10372 (mod 15). -/
theorem enumeration_hex4_2884 : reassembles 10372 = true ∧ castsFifteens 10372 = true := by decide

/-- 2885: nibbles fold back to 10373; digit sum 23 ≡ 10373 (mod 15). -/
theorem enumeration_hex4_2885 : reassembles 10373 = true ∧ castsFifteens 10373 = true := by decide

/-- 2886: nibbles fold back to 10374; digit sum 24 ≡ 10374 (mod 15). -/
theorem enumeration_hex4_2886 : reassembles 10374 = true ∧ castsFifteens 10374 = true := by decide

/-- 2887: nibbles fold back to 10375; digit sum 25 ≡ 10375 (mod 15). -/
theorem enumeration_hex4_2887 : reassembles 10375 = true ∧ castsFifteens 10375 = true := by decide

/-- 2888: nibbles fold back to 10376; digit sum 26 ≡ 10376 (mod 15). -/
theorem enumeration_hex4_2888 : reassembles 10376 = true ∧ castsFifteens 10376 = true := by decide

/-- 2889: nibbles fold back to 10377; digit sum 27 ≡ 10377 (mod 15). -/
theorem enumeration_hex4_2889 : reassembles 10377 = true ∧ castsFifteens 10377 = true := by decide

/-- 288a: nibbles fold back to 10378; digit sum 28 ≡ 10378 (mod 15). -/
theorem enumeration_hex4_288a : reassembles 10378 = true ∧ castsFifteens 10378 = true := by decide

/-- 288b: nibbles fold back to 10379; digit sum 29 ≡ 10379 (mod 15). -/
theorem enumeration_hex4_288b : reassembles 10379 = true ∧ castsFifteens 10379 = true := by decide

/-- 288c: nibbles fold back to 10380; digit sum 30 ≡ 10380 (mod 15). -/
theorem enumeration_hex4_288c : reassembles 10380 = true ∧ castsFifteens 10380 = true := by decide

/-- 288d: nibbles fold back to 10381; digit sum 31 ≡ 10381 (mod 15). -/
theorem enumeration_hex4_288d : reassembles 10381 = true ∧ castsFifteens 10381 = true := by decide

/-- 288e: nibbles fold back to 10382; digit sum 32 ≡ 10382 (mod 15). -/
theorem enumeration_hex4_288e : reassembles 10382 = true ∧ castsFifteens 10382 = true := by decide

/-- 288f: nibbles fold back to 10383; digit sum 33 ≡ 10383 (mod 15). -/
theorem enumeration_hex4_288f : reassembles 10383 = true ∧ castsFifteens 10383 = true := by decide

/-- 2890: nibbles fold back to 10384; digit sum 19 ≡ 10384 (mod 15). -/
theorem enumeration_hex4_2890 : reassembles 10384 = true ∧ castsFifteens 10384 = true := by decide

/-- 2891: nibbles fold back to 10385; digit sum 20 ≡ 10385 (mod 15). -/
theorem enumeration_hex4_2891 : reassembles 10385 = true ∧ castsFifteens 10385 = true := by decide

/-- 2892: nibbles fold back to 10386; digit sum 21 ≡ 10386 (mod 15). -/
theorem enumeration_hex4_2892 : reassembles 10386 = true ∧ castsFifteens 10386 = true := by decide

/-- 2893: nibbles fold back to 10387; digit sum 22 ≡ 10387 (mod 15). -/
theorem enumeration_hex4_2893 : reassembles 10387 = true ∧ castsFifteens 10387 = true := by decide

/-- 2894: nibbles fold back to 10388; digit sum 23 ≡ 10388 (mod 15). -/
theorem enumeration_hex4_2894 : reassembles 10388 = true ∧ castsFifteens 10388 = true := by decide

/-- 2895: nibbles fold back to 10389; digit sum 24 ≡ 10389 (mod 15). -/
theorem enumeration_hex4_2895 : reassembles 10389 = true ∧ castsFifteens 10389 = true := by decide

/-- 2896: nibbles fold back to 10390; digit sum 25 ≡ 10390 (mod 15). -/
theorem enumeration_hex4_2896 : reassembles 10390 = true ∧ castsFifteens 10390 = true := by decide

/-- 2897: nibbles fold back to 10391; digit sum 26 ≡ 10391 (mod 15). -/
theorem enumeration_hex4_2897 : reassembles 10391 = true ∧ castsFifteens 10391 = true := by decide

/-- 2898: nibbles fold back to 10392; digit sum 27 ≡ 10392 (mod 15). -/
theorem enumeration_hex4_2898 : reassembles 10392 = true ∧ castsFifteens 10392 = true := by decide

/-- 2899: nibbles fold back to 10393; digit sum 28 ≡ 10393 (mod 15). -/
theorem enumeration_hex4_2899 : reassembles 10393 = true ∧ castsFifteens 10393 = true := by decide

/-- 289a: nibbles fold back to 10394; digit sum 29 ≡ 10394 (mod 15). -/
theorem enumeration_hex4_289a : reassembles 10394 = true ∧ castsFifteens 10394 = true := by decide

/-- 289b: nibbles fold back to 10395; digit sum 30 ≡ 10395 (mod 15). -/
theorem enumeration_hex4_289b : reassembles 10395 = true ∧ castsFifteens 10395 = true := by decide

/-- 289c: nibbles fold back to 10396; digit sum 31 ≡ 10396 (mod 15). -/
theorem enumeration_hex4_289c : reassembles 10396 = true ∧ castsFifteens 10396 = true := by decide

/-- 289d: nibbles fold back to 10397; digit sum 32 ≡ 10397 (mod 15). -/
theorem enumeration_hex4_289d : reassembles 10397 = true ∧ castsFifteens 10397 = true := by decide

/-- 289e: nibbles fold back to 10398; digit sum 33 ≡ 10398 (mod 15). -/
theorem enumeration_hex4_289e : reassembles 10398 = true ∧ castsFifteens 10398 = true := by decide

/-- 289f: nibbles fold back to 10399; digit sum 34 ≡ 10399 (mod 15). -/
theorem enumeration_hex4_289f : reassembles 10399 = true ∧ castsFifteens 10399 = true := by decide

/-- 28a0: nibbles fold back to 10400; digit sum 20 ≡ 10400 (mod 15). -/
theorem enumeration_hex4_28a0 : reassembles 10400 = true ∧ castsFifteens 10400 = true := by decide

/-- 28a1: nibbles fold back to 10401; digit sum 21 ≡ 10401 (mod 15). -/
theorem enumeration_hex4_28a1 : reassembles 10401 = true ∧ castsFifteens 10401 = true := by decide

/-- 28a2: nibbles fold back to 10402; digit sum 22 ≡ 10402 (mod 15). -/
theorem enumeration_hex4_28a2 : reassembles 10402 = true ∧ castsFifteens 10402 = true := by decide

/-- 28a3: nibbles fold back to 10403; digit sum 23 ≡ 10403 (mod 15). -/
theorem enumeration_hex4_28a3 : reassembles 10403 = true ∧ castsFifteens 10403 = true := by decide

/-- 28a4: nibbles fold back to 10404; digit sum 24 ≡ 10404 (mod 15). -/
theorem enumeration_hex4_28a4 : reassembles 10404 = true ∧ castsFifteens 10404 = true := by decide

/-- 28a5: nibbles fold back to 10405; digit sum 25 ≡ 10405 (mod 15). -/
theorem enumeration_hex4_28a5 : reassembles 10405 = true ∧ castsFifteens 10405 = true := by decide

/-- 28a6: nibbles fold back to 10406; digit sum 26 ≡ 10406 (mod 15). -/
theorem enumeration_hex4_28a6 : reassembles 10406 = true ∧ castsFifteens 10406 = true := by decide

/-- 28a7: nibbles fold back to 10407; digit sum 27 ≡ 10407 (mod 15). -/
theorem enumeration_hex4_28a7 : reassembles 10407 = true ∧ castsFifteens 10407 = true := by decide

/-- 28a8: nibbles fold back to 10408; digit sum 28 ≡ 10408 (mod 15). -/
theorem enumeration_hex4_28a8 : reassembles 10408 = true ∧ castsFifteens 10408 = true := by decide

/-- 28a9: nibbles fold back to 10409; digit sum 29 ≡ 10409 (mod 15). -/
theorem enumeration_hex4_28a9 : reassembles 10409 = true ∧ castsFifteens 10409 = true := by decide

/-- 28aa: nibbles fold back to 10410; digit sum 30 ≡ 10410 (mod 15). -/
theorem enumeration_hex4_28aa : reassembles 10410 = true ∧ castsFifteens 10410 = true := by decide

/-- 28ab: nibbles fold back to 10411; digit sum 31 ≡ 10411 (mod 15). -/
theorem enumeration_hex4_28ab : reassembles 10411 = true ∧ castsFifteens 10411 = true := by decide

/-- 28ac: nibbles fold back to 10412; digit sum 32 ≡ 10412 (mod 15). -/
theorem enumeration_hex4_28ac : reassembles 10412 = true ∧ castsFifteens 10412 = true := by decide

/-- 28ad: nibbles fold back to 10413; digit sum 33 ≡ 10413 (mod 15). -/
theorem enumeration_hex4_28ad : reassembles 10413 = true ∧ castsFifteens 10413 = true := by decide

/-- 28ae: nibbles fold back to 10414; digit sum 34 ≡ 10414 (mod 15). -/
theorem enumeration_hex4_28ae : reassembles 10414 = true ∧ castsFifteens 10414 = true := by decide

/-- 28af: nibbles fold back to 10415; digit sum 35 ≡ 10415 (mod 15). -/
theorem enumeration_hex4_28af : reassembles 10415 = true ∧ castsFifteens 10415 = true := by decide

/-- 28b0: nibbles fold back to 10416; digit sum 21 ≡ 10416 (mod 15). -/
theorem enumeration_hex4_28b0 : reassembles 10416 = true ∧ castsFifteens 10416 = true := by decide

/-- 28b1: nibbles fold back to 10417; digit sum 22 ≡ 10417 (mod 15). -/
theorem enumeration_hex4_28b1 : reassembles 10417 = true ∧ castsFifteens 10417 = true := by decide

/-- 28b2: nibbles fold back to 10418; digit sum 23 ≡ 10418 (mod 15). -/
theorem enumeration_hex4_28b2 : reassembles 10418 = true ∧ castsFifteens 10418 = true := by decide

/-- 28b3: nibbles fold back to 10419; digit sum 24 ≡ 10419 (mod 15). -/
theorem enumeration_hex4_28b3 : reassembles 10419 = true ∧ castsFifteens 10419 = true := by decide

/-- 28b4: nibbles fold back to 10420; digit sum 25 ≡ 10420 (mod 15). -/
theorem enumeration_hex4_28b4 : reassembles 10420 = true ∧ castsFifteens 10420 = true := by decide

/-- 28b5: nibbles fold back to 10421; digit sum 26 ≡ 10421 (mod 15). -/
theorem enumeration_hex4_28b5 : reassembles 10421 = true ∧ castsFifteens 10421 = true := by decide

/-- 28b6: nibbles fold back to 10422; digit sum 27 ≡ 10422 (mod 15). -/
theorem enumeration_hex4_28b6 : reassembles 10422 = true ∧ castsFifteens 10422 = true := by decide

/-- 28b7: nibbles fold back to 10423; digit sum 28 ≡ 10423 (mod 15). -/
theorem enumeration_hex4_28b7 : reassembles 10423 = true ∧ castsFifteens 10423 = true := by decide

/-- 28b8: nibbles fold back to 10424; digit sum 29 ≡ 10424 (mod 15). -/
theorem enumeration_hex4_28b8 : reassembles 10424 = true ∧ castsFifteens 10424 = true := by decide

/-- 28b9: nibbles fold back to 10425; digit sum 30 ≡ 10425 (mod 15). -/
theorem enumeration_hex4_28b9 : reassembles 10425 = true ∧ castsFifteens 10425 = true := by decide

/-- 28ba: nibbles fold back to 10426; digit sum 31 ≡ 10426 (mod 15). -/
theorem enumeration_hex4_28ba : reassembles 10426 = true ∧ castsFifteens 10426 = true := by decide

/-- 28bb: nibbles fold back to 10427; digit sum 32 ≡ 10427 (mod 15). -/
theorem enumeration_hex4_28bb : reassembles 10427 = true ∧ castsFifteens 10427 = true := by decide

/-- 28bc: nibbles fold back to 10428; digit sum 33 ≡ 10428 (mod 15). -/
theorem enumeration_hex4_28bc : reassembles 10428 = true ∧ castsFifteens 10428 = true := by decide

/-- 28bd: nibbles fold back to 10429; digit sum 34 ≡ 10429 (mod 15). -/
theorem enumeration_hex4_28bd : reassembles 10429 = true ∧ castsFifteens 10429 = true := by decide

/-- 28be: nibbles fold back to 10430; digit sum 35 ≡ 10430 (mod 15). -/
theorem enumeration_hex4_28be : reassembles 10430 = true ∧ castsFifteens 10430 = true := by decide

/-- 28bf: nibbles fold back to 10431; digit sum 36 ≡ 10431 (mod 15). -/
theorem enumeration_hex4_28bf : reassembles 10431 = true ∧ castsFifteens 10431 = true := by decide

/-- 28c0: nibbles fold back to 10432; digit sum 22 ≡ 10432 (mod 15). -/
theorem enumeration_hex4_28c0 : reassembles 10432 = true ∧ castsFifteens 10432 = true := by decide

/-- 28c1: nibbles fold back to 10433; digit sum 23 ≡ 10433 (mod 15). -/
theorem enumeration_hex4_28c1 : reassembles 10433 = true ∧ castsFifteens 10433 = true := by decide

/-- 28c2: nibbles fold back to 10434; digit sum 24 ≡ 10434 (mod 15). -/
theorem enumeration_hex4_28c2 : reassembles 10434 = true ∧ castsFifteens 10434 = true := by decide

/-- 28c3: nibbles fold back to 10435; digit sum 25 ≡ 10435 (mod 15). -/
theorem enumeration_hex4_28c3 : reassembles 10435 = true ∧ castsFifteens 10435 = true := by decide

/-- 28c4: nibbles fold back to 10436; digit sum 26 ≡ 10436 (mod 15). -/
theorem enumeration_hex4_28c4 : reassembles 10436 = true ∧ castsFifteens 10436 = true := by decide

/-- 28c5: nibbles fold back to 10437; digit sum 27 ≡ 10437 (mod 15). -/
theorem enumeration_hex4_28c5 : reassembles 10437 = true ∧ castsFifteens 10437 = true := by decide

/-- 28c6: nibbles fold back to 10438; digit sum 28 ≡ 10438 (mod 15). -/
theorem enumeration_hex4_28c6 : reassembles 10438 = true ∧ castsFifteens 10438 = true := by decide

/-- 28c7: nibbles fold back to 10439; digit sum 29 ≡ 10439 (mod 15). -/
theorem enumeration_hex4_28c7 : reassembles 10439 = true ∧ castsFifteens 10439 = true := by decide

/-- 28c8: nibbles fold back to 10440; digit sum 30 ≡ 10440 (mod 15). -/
theorem enumeration_hex4_28c8 : reassembles 10440 = true ∧ castsFifteens 10440 = true := by decide

/-- 28c9: nibbles fold back to 10441; digit sum 31 ≡ 10441 (mod 15). -/
theorem enumeration_hex4_28c9 : reassembles 10441 = true ∧ castsFifteens 10441 = true := by decide

/-- 28ca: nibbles fold back to 10442; digit sum 32 ≡ 10442 (mod 15). -/
theorem enumeration_hex4_28ca : reassembles 10442 = true ∧ castsFifteens 10442 = true := by decide

/-- 28cb: nibbles fold back to 10443; digit sum 33 ≡ 10443 (mod 15). -/
theorem enumeration_hex4_28cb : reassembles 10443 = true ∧ castsFifteens 10443 = true := by decide

/-- 28cc: nibbles fold back to 10444; digit sum 34 ≡ 10444 (mod 15). -/
theorem enumeration_hex4_28cc : reassembles 10444 = true ∧ castsFifteens 10444 = true := by decide

/-- 28cd: nibbles fold back to 10445; digit sum 35 ≡ 10445 (mod 15). -/
theorem enumeration_hex4_28cd : reassembles 10445 = true ∧ castsFifteens 10445 = true := by decide

/-- 28ce: nibbles fold back to 10446; digit sum 36 ≡ 10446 (mod 15). -/
theorem enumeration_hex4_28ce : reassembles 10446 = true ∧ castsFifteens 10446 = true := by decide

/-- 28cf: nibbles fold back to 10447; digit sum 37 ≡ 10447 (mod 15). -/
theorem enumeration_hex4_28cf : reassembles 10447 = true ∧ castsFifteens 10447 = true := by decide

/-- 28d0: nibbles fold back to 10448; digit sum 23 ≡ 10448 (mod 15). -/
theorem enumeration_hex4_28d0 : reassembles 10448 = true ∧ castsFifteens 10448 = true := by decide

/-- 28d1: nibbles fold back to 10449; digit sum 24 ≡ 10449 (mod 15). -/
theorem enumeration_hex4_28d1 : reassembles 10449 = true ∧ castsFifteens 10449 = true := by decide

/-- 28d2: nibbles fold back to 10450; digit sum 25 ≡ 10450 (mod 15). -/
theorem enumeration_hex4_28d2 : reassembles 10450 = true ∧ castsFifteens 10450 = true := by decide

/-- 28d3: nibbles fold back to 10451; digit sum 26 ≡ 10451 (mod 15). -/
theorem enumeration_hex4_28d3 : reassembles 10451 = true ∧ castsFifteens 10451 = true := by decide

/-- 28d4: nibbles fold back to 10452; digit sum 27 ≡ 10452 (mod 15). -/
theorem enumeration_hex4_28d4 : reassembles 10452 = true ∧ castsFifteens 10452 = true := by decide

/-- 28d5: nibbles fold back to 10453; digit sum 28 ≡ 10453 (mod 15). -/
theorem enumeration_hex4_28d5 : reassembles 10453 = true ∧ castsFifteens 10453 = true := by decide

/-- 28d6: nibbles fold back to 10454; digit sum 29 ≡ 10454 (mod 15). -/
theorem enumeration_hex4_28d6 : reassembles 10454 = true ∧ castsFifteens 10454 = true := by decide

/-- 28d7: nibbles fold back to 10455; digit sum 30 ≡ 10455 (mod 15). -/
theorem enumeration_hex4_28d7 : reassembles 10455 = true ∧ castsFifteens 10455 = true := by decide

/-- 28d8: nibbles fold back to 10456; digit sum 31 ≡ 10456 (mod 15). -/
theorem enumeration_hex4_28d8 : reassembles 10456 = true ∧ castsFifteens 10456 = true := by decide

/-- 28d9: nibbles fold back to 10457; digit sum 32 ≡ 10457 (mod 15). -/
theorem enumeration_hex4_28d9 : reassembles 10457 = true ∧ castsFifteens 10457 = true := by decide

/-- 28da: nibbles fold back to 10458; digit sum 33 ≡ 10458 (mod 15). -/
theorem enumeration_hex4_28da : reassembles 10458 = true ∧ castsFifteens 10458 = true := by decide

/-- 28db: nibbles fold back to 10459; digit sum 34 ≡ 10459 (mod 15). -/
theorem enumeration_hex4_28db : reassembles 10459 = true ∧ castsFifteens 10459 = true := by decide

/-- 28dc: nibbles fold back to 10460; digit sum 35 ≡ 10460 (mod 15). -/
theorem enumeration_hex4_28dc : reassembles 10460 = true ∧ castsFifteens 10460 = true := by decide

/-- 28dd: nibbles fold back to 10461; digit sum 36 ≡ 10461 (mod 15). -/
theorem enumeration_hex4_28dd : reassembles 10461 = true ∧ castsFifteens 10461 = true := by decide

/-- 28de: nibbles fold back to 10462; digit sum 37 ≡ 10462 (mod 15). -/
theorem enumeration_hex4_28de : reassembles 10462 = true ∧ castsFifteens 10462 = true := by decide

/-- 28df: nibbles fold back to 10463; digit sum 38 ≡ 10463 (mod 15). -/
theorem enumeration_hex4_28df : reassembles 10463 = true ∧ castsFifteens 10463 = true := by decide

/-- 28e0: nibbles fold back to 10464; digit sum 24 ≡ 10464 (mod 15). -/
theorem enumeration_hex4_28e0 : reassembles 10464 = true ∧ castsFifteens 10464 = true := by decide

/-- 28e1: nibbles fold back to 10465; digit sum 25 ≡ 10465 (mod 15). -/
theorem enumeration_hex4_28e1 : reassembles 10465 = true ∧ castsFifteens 10465 = true := by decide

/-- 28e2: nibbles fold back to 10466; digit sum 26 ≡ 10466 (mod 15). -/
theorem enumeration_hex4_28e2 : reassembles 10466 = true ∧ castsFifteens 10466 = true := by decide

/-- 28e3: nibbles fold back to 10467; digit sum 27 ≡ 10467 (mod 15). -/
theorem enumeration_hex4_28e3 : reassembles 10467 = true ∧ castsFifteens 10467 = true := by decide

/-- 28e4: nibbles fold back to 10468; digit sum 28 ≡ 10468 (mod 15). -/
theorem enumeration_hex4_28e4 : reassembles 10468 = true ∧ castsFifteens 10468 = true := by decide

/-- 28e5: nibbles fold back to 10469; digit sum 29 ≡ 10469 (mod 15). -/
theorem enumeration_hex4_28e5 : reassembles 10469 = true ∧ castsFifteens 10469 = true := by decide

/-- 28e6: nibbles fold back to 10470; digit sum 30 ≡ 10470 (mod 15). -/
theorem enumeration_hex4_28e6 : reassembles 10470 = true ∧ castsFifteens 10470 = true := by decide

/-- 28e7: nibbles fold back to 10471; digit sum 31 ≡ 10471 (mod 15). -/
theorem enumeration_hex4_28e7 : reassembles 10471 = true ∧ castsFifteens 10471 = true := by decide

/-- 28e8: nibbles fold back to 10472; digit sum 32 ≡ 10472 (mod 15). -/
theorem enumeration_hex4_28e8 : reassembles 10472 = true ∧ castsFifteens 10472 = true := by decide

/-- 28e9: nibbles fold back to 10473; digit sum 33 ≡ 10473 (mod 15). -/
theorem enumeration_hex4_28e9 : reassembles 10473 = true ∧ castsFifteens 10473 = true := by decide

/-- 28ea: nibbles fold back to 10474; digit sum 34 ≡ 10474 (mod 15). -/
theorem enumeration_hex4_28ea : reassembles 10474 = true ∧ castsFifteens 10474 = true := by decide

/-- 28eb: nibbles fold back to 10475; digit sum 35 ≡ 10475 (mod 15). -/
theorem enumeration_hex4_28eb : reassembles 10475 = true ∧ castsFifteens 10475 = true := by decide

/-- 28ec: nibbles fold back to 10476; digit sum 36 ≡ 10476 (mod 15). -/
theorem enumeration_hex4_28ec : reassembles 10476 = true ∧ castsFifteens 10476 = true := by decide

/-- 28ed: nibbles fold back to 10477; digit sum 37 ≡ 10477 (mod 15). -/
theorem enumeration_hex4_28ed : reassembles 10477 = true ∧ castsFifteens 10477 = true := by decide

/-- 28ee: nibbles fold back to 10478; digit sum 38 ≡ 10478 (mod 15). -/
theorem enumeration_hex4_28ee : reassembles 10478 = true ∧ castsFifteens 10478 = true := by decide

/-- 28ef: nibbles fold back to 10479; digit sum 39 ≡ 10479 (mod 15). -/
theorem enumeration_hex4_28ef : reassembles 10479 = true ∧ castsFifteens 10479 = true := by decide

/-- 28f0: nibbles fold back to 10480; digit sum 25 ≡ 10480 (mod 15). -/
theorem enumeration_hex4_28f0 : reassembles 10480 = true ∧ castsFifteens 10480 = true := by decide

/-- 28f1: nibbles fold back to 10481; digit sum 26 ≡ 10481 (mod 15). -/
theorem enumeration_hex4_28f1 : reassembles 10481 = true ∧ castsFifteens 10481 = true := by decide

/-- 28f2: nibbles fold back to 10482; digit sum 27 ≡ 10482 (mod 15). -/
theorem enumeration_hex4_28f2 : reassembles 10482 = true ∧ castsFifteens 10482 = true := by decide

/-- 28f3: nibbles fold back to 10483; digit sum 28 ≡ 10483 (mod 15). -/
theorem enumeration_hex4_28f3 : reassembles 10483 = true ∧ castsFifteens 10483 = true := by decide

/-- 28f4: nibbles fold back to 10484; digit sum 29 ≡ 10484 (mod 15). -/
theorem enumeration_hex4_28f4 : reassembles 10484 = true ∧ castsFifteens 10484 = true := by decide

/-- 28f5: nibbles fold back to 10485; digit sum 30 ≡ 10485 (mod 15). -/
theorem enumeration_hex4_28f5 : reassembles 10485 = true ∧ castsFifteens 10485 = true := by decide

/-- 28f6: nibbles fold back to 10486; digit sum 31 ≡ 10486 (mod 15). -/
theorem enumeration_hex4_28f6 : reassembles 10486 = true ∧ castsFifteens 10486 = true := by decide

/-- 28f7: nibbles fold back to 10487; digit sum 32 ≡ 10487 (mod 15). -/
theorem enumeration_hex4_28f7 : reassembles 10487 = true ∧ castsFifteens 10487 = true := by decide

/-- 28f8: nibbles fold back to 10488; digit sum 33 ≡ 10488 (mod 15). -/
theorem enumeration_hex4_28f8 : reassembles 10488 = true ∧ castsFifteens 10488 = true := by decide

/-- 28f9: nibbles fold back to 10489; digit sum 34 ≡ 10489 (mod 15). -/
theorem enumeration_hex4_28f9 : reassembles 10489 = true ∧ castsFifteens 10489 = true := by decide

/-- 28fa: nibbles fold back to 10490; digit sum 35 ≡ 10490 (mod 15). -/
theorem enumeration_hex4_28fa : reassembles 10490 = true ∧ castsFifteens 10490 = true := by decide

/-- 28fb: nibbles fold back to 10491; digit sum 36 ≡ 10491 (mod 15). -/
theorem enumeration_hex4_28fb : reassembles 10491 = true ∧ castsFifteens 10491 = true := by decide

/-- 28fc: nibbles fold back to 10492; digit sum 37 ≡ 10492 (mod 15). -/
theorem enumeration_hex4_28fc : reassembles 10492 = true ∧ castsFifteens 10492 = true := by decide

/-- 28fd: nibbles fold back to 10493; digit sum 38 ≡ 10493 (mod 15). -/
theorem enumeration_hex4_28fd : reassembles 10493 = true ∧ castsFifteens 10493 = true := by decide

/-- 28fe: nibbles fold back to 10494; digit sum 39 ≡ 10494 (mod 15). -/
theorem enumeration_hex4_28fe : reassembles 10494 = true ∧ castsFifteens 10494 = true := by decide

/-- 28ff: nibbles fold back to 10495; digit sum 40 ≡ 10495 (mod 15). -/
theorem enumeration_hex4_28ff : reassembles 10495 = true ∧ castsFifteens 10495 = true := by decide

/-- 2900: nibbles fold back to 10496; digit sum 11 ≡ 10496 (mod 15). -/
theorem enumeration_hex4_2900 : reassembles 10496 = true ∧ castsFifteens 10496 = true := by decide

/-- 2901: nibbles fold back to 10497; digit sum 12 ≡ 10497 (mod 15). -/
theorem enumeration_hex4_2901 : reassembles 10497 = true ∧ castsFifteens 10497 = true := by decide

/-- 2902: nibbles fold back to 10498; digit sum 13 ≡ 10498 (mod 15). -/
theorem enumeration_hex4_2902 : reassembles 10498 = true ∧ castsFifteens 10498 = true := by decide

/-- 2903: nibbles fold back to 10499; digit sum 14 ≡ 10499 (mod 15). -/
theorem enumeration_hex4_2903 : reassembles 10499 = true ∧ castsFifteens 10499 = true := by decide

/-- 2904: nibbles fold back to 10500; digit sum 15 ≡ 10500 (mod 15). -/
theorem enumeration_hex4_2904 : reassembles 10500 = true ∧ castsFifteens 10500 = true := by decide

/-- 2905: nibbles fold back to 10501; digit sum 16 ≡ 10501 (mod 15). -/
theorem enumeration_hex4_2905 : reassembles 10501 = true ∧ castsFifteens 10501 = true := by decide

/-- 2906: nibbles fold back to 10502; digit sum 17 ≡ 10502 (mod 15). -/
theorem enumeration_hex4_2906 : reassembles 10502 = true ∧ castsFifteens 10502 = true := by decide

/-- 2907: nibbles fold back to 10503; digit sum 18 ≡ 10503 (mod 15). -/
theorem enumeration_hex4_2907 : reassembles 10503 = true ∧ castsFifteens 10503 = true := by decide

/-- 2908: nibbles fold back to 10504; digit sum 19 ≡ 10504 (mod 15). -/
theorem enumeration_hex4_2908 : reassembles 10504 = true ∧ castsFifteens 10504 = true := by decide

/-- 2909: nibbles fold back to 10505; digit sum 20 ≡ 10505 (mod 15). -/
theorem enumeration_hex4_2909 : reassembles 10505 = true ∧ castsFifteens 10505 = true := by decide

/-- 290a: nibbles fold back to 10506; digit sum 21 ≡ 10506 (mod 15). -/
theorem enumeration_hex4_290a : reassembles 10506 = true ∧ castsFifteens 10506 = true := by decide

/-- 290b: nibbles fold back to 10507; digit sum 22 ≡ 10507 (mod 15). -/
theorem enumeration_hex4_290b : reassembles 10507 = true ∧ castsFifteens 10507 = true := by decide

/-- 290c: nibbles fold back to 10508; digit sum 23 ≡ 10508 (mod 15). -/
theorem enumeration_hex4_290c : reassembles 10508 = true ∧ castsFifteens 10508 = true := by decide

/-- 290d: nibbles fold back to 10509; digit sum 24 ≡ 10509 (mod 15). -/
theorem enumeration_hex4_290d : reassembles 10509 = true ∧ castsFifteens 10509 = true := by decide

/-- 290e: nibbles fold back to 10510; digit sum 25 ≡ 10510 (mod 15). -/
theorem enumeration_hex4_290e : reassembles 10510 = true ∧ castsFifteens 10510 = true := by decide

/-- 290f: nibbles fold back to 10511; digit sum 26 ≡ 10511 (mod 15). -/
theorem enumeration_hex4_290f : reassembles 10511 = true ∧ castsFifteens 10511 = true := by decide

/-- 2910: nibbles fold back to 10512; digit sum 12 ≡ 10512 (mod 15). -/
theorem enumeration_hex4_2910 : reassembles 10512 = true ∧ castsFifteens 10512 = true := by decide

/-- 2911: nibbles fold back to 10513; digit sum 13 ≡ 10513 (mod 15). -/
theorem enumeration_hex4_2911 : reassembles 10513 = true ∧ castsFifteens 10513 = true := by decide

/-- 2912: nibbles fold back to 10514; digit sum 14 ≡ 10514 (mod 15). -/
theorem enumeration_hex4_2912 : reassembles 10514 = true ∧ castsFifteens 10514 = true := by decide

/-- 2913: nibbles fold back to 10515; digit sum 15 ≡ 10515 (mod 15). -/
theorem enumeration_hex4_2913 : reassembles 10515 = true ∧ castsFifteens 10515 = true := by decide

/-- 2914: nibbles fold back to 10516; digit sum 16 ≡ 10516 (mod 15). -/
theorem enumeration_hex4_2914 : reassembles 10516 = true ∧ castsFifteens 10516 = true := by decide

/-- 2915: nibbles fold back to 10517; digit sum 17 ≡ 10517 (mod 15). -/
theorem enumeration_hex4_2915 : reassembles 10517 = true ∧ castsFifteens 10517 = true := by decide

/-- 2916: nibbles fold back to 10518; digit sum 18 ≡ 10518 (mod 15). -/
theorem enumeration_hex4_2916 : reassembles 10518 = true ∧ castsFifteens 10518 = true := by decide

/-- 2917: nibbles fold back to 10519; digit sum 19 ≡ 10519 (mod 15). -/
theorem enumeration_hex4_2917 : reassembles 10519 = true ∧ castsFifteens 10519 = true := by decide

/-- 2918: nibbles fold back to 10520; digit sum 20 ≡ 10520 (mod 15). -/
theorem enumeration_hex4_2918 : reassembles 10520 = true ∧ castsFifteens 10520 = true := by decide

/-- 2919: nibbles fold back to 10521; digit sum 21 ≡ 10521 (mod 15). -/
theorem enumeration_hex4_2919 : reassembles 10521 = true ∧ castsFifteens 10521 = true := by decide

/-- 291a: nibbles fold back to 10522; digit sum 22 ≡ 10522 (mod 15). -/
theorem enumeration_hex4_291a : reassembles 10522 = true ∧ castsFifteens 10522 = true := by decide

/-- 291b: nibbles fold back to 10523; digit sum 23 ≡ 10523 (mod 15). -/
theorem enumeration_hex4_291b : reassembles 10523 = true ∧ castsFifteens 10523 = true := by decide

/-- 291c: nibbles fold back to 10524; digit sum 24 ≡ 10524 (mod 15). -/
theorem enumeration_hex4_291c : reassembles 10524 = true ∧ castsFifteens 10524 = true := by decide

/-- 291d: nibbles fold back to 10525; digit sum 25 ≡ 10525 (mod 15). -/
theorem enumeration_hex4_291d : reassembles 10525 = true ∧ castsFifteens 10525 = true := by decide

/-- 291e: nibbles fold back to 10526; digit sum 26 ≡ 10526 (mod 15). -/
theorem enumeration_hex4_291e : reassembles 10526 = true ∧ castsFifteens 10526 = true := by decide

/-- 291f: nibbles fold back to 10527; digit sum 27 ≡ 10527 (mod 15). -/
theorem enumeration_hex4_291f : reassembles 10527 = true ∧ castsFifteens 10527 = true := by decide

/-- 2920: nibbles fold back to 10528; digit sum 13 ≡ 10528 (mod 15). -/
theorem enumeration_hex4_2920 : reassembles 10528 = true ∧ castsFifteens 10528 = true := by decide

/-- 2921: nibbles fold back to 10529; digit sum 14 ≡ 10529 (mod 15). -/
theorem enumeration_hex4_2921 : reassembles 10529 = true ∧ castsFifteens 10529 = true := by decide

/-- 2922: nibbles fold back to 10530; digit sum 15 ≡ 10530 (mod 15). -/
theorem enumeration_hex4_2922 : reassembles 10530 = true ∧ castsFifteens 10530 = true := by decide

/-- 2923: nibbles fold back to 10531; digit sum 16 ≡ 10531 (mod 15). -/
theorem enumeration_hex4_2923 : reassembles 10531 = true ∧ castsFifteens 10531 = true := by decide

/-- 2924: nibbles fold back to 10532; digit sum 17 ≡ 10532 (mod 15). -/
theorem enumeration_hex4_2924 : reassembles 10532 = true ∧ castsFifteens 10532 = true := by decide

/-- 2925: nibbles fold back to 10533; digit sum 18 ≡ 10533 (mod 15). -/
theorem enumeration_hex4_2925 : reassembles 10533 = true ∧ castsFifteens 10533 = true := by decide

/-- 2926: nibbles fold back to 10534; digit sum 19 ≡ 10534 (mod 15). -/
theorem enumeration_hex4_2926 : reassembles 10534 = true ∧ castsFifteens 10534 = true := by decide

/-- 2927: nibbles fold back to 10535; digit sum 20 ≡ 10535 (mod 15). -/
theorem enumeration_hex4_2927 : reassembles 10535 = true ∧ castsFifteens 10535 = true := by decide

/-- 2928: nibbles fold back to 10536; digit sum 21 ≡ 10536 (mod 15). -/
theorem enumeration_hex4_2928 : reassembles 10536 = true ∧ castsFifteens 10536 = true := by decide

/-- 2929: nibbles fold back to 10537; digit sum 22 ≡ 10537 (mod 15). -/
theorem enumeration_hex4_2929 : reassembles 10537 = true ∧ castsFifteens 10537 = true := by decide

/-- 292a: nibbles fold back to 10538; digit sum 23 ≡ 10538 (mod 15). -/
theorem enumeration_hex4_292a : reassembles 10538 = true ∧ castsFifteens 10538 = true := by decide

/-- 292b: nibbles fold back to 10539; digit sum 24 ≡ 10539 (mod 15). -/
theorem enumeration_hex4_292b : reassembles 10539 = true ∧ castsFifteens 10539 = true := by decide

/-- 292c: nibbles fold back to 10540; digit sum 25 ≡ 10540 (mod 15). -/
theorem enumeration_hex4_292c : reassembles 10540 = true ∧ castsFifteens 10540 = true := by decide

/-- 292d: nibbles fold back to 10541; digit sum 26 ≡ 10541 (mod 15). -/
theorem enumeration_hex4_292d : reassembles 10541 = true ∧ castsFifteens 10541 = true := by decide

/-- 292e: nibbles fold back to 10542; digit sum 27 ≡ 10542 (mod 15). -/
theorem enumeration_hex4_292e : reassembles 10542 = true ∧ castsFifteens 10542 = true := by decide

/-- 292f: nibbles fold back to 10543; digit sum 28 ≡ 10543 (mod 15). -/
theorem enumeration_hex4_292f : reassembles 10543 = true ∧ castsFifteens 10543 = true := by decide

/-- 2930: nibbles fold back to 10544; digit sum 14 ≡ 10544 (mod 15). -/
theorem enumeration_hex4_2930 : reassembles 10544 = true ∧ castsFifteens 10544 = true := by decide

/-- 2931: nibbles fold back to 10545; digit sum 15 ≡ 10545 (mod 15). -/
theorem enumeration_hex4_2931 : reassembles 10545 = true ∧ castsFifteens 10545 = true := by decide

/-- 2932: nibbles fold back to 10546; digit sum 16 ≡ 10546 (mod 15). -/
theorem enumeration_hex4_2932 : reassembles 10546 = true ∧ castsFifteens 10546 = true := by decide

/-- 2933: nibbles fold back to 10547; digit sum 17 ≡ 10547 (mod 15). -/
theorem enumeration_hex4_2933 : reassembles 10547 = true ∧ castsFifteens 10547 = true := by decide

/-- 2934: nibbles fold back to 10548; digit sum 18 ≡ 10548 (mod 15). -/
theorem enumeration_hex4_2934 : reassembles 10548 = true ∧ castsFifteens 10548 = true := by decide

/-- 2935: nibbles fold back to 10549; digit sum 19 ≡ 10549 (mod 15). -/
theorem enumeration_hex4_2935 : reassembles 10549 = true ∧ castsFifteens 10549 = true := by decide

/-- 2936: nibbles fold back to 10550; digit sum 20 ≡ 10550 (mod 15). -/
theorem enumeration_hex4_2936 : reassembles 10550 = true ∧ castsFifteens 10550 = true := by decide

/-- 2937: nibbles fold back to 10551; digit sum 21 ≡ 10551 (mod 15). -/
theorem enumeration_hex4_2937 : reassembles 10551 = true ∧ castsFifteens 10551 = true := by decide

/-- 2938: nibbles fold back to 10552; digit sum 22 ≡ 10552 (mod 15). -/
theorem enumeration_hex4_2938 : reassembles 10552 = true ∧ castsFifteens 10552 = true := by decide

/-- 2939: nibbles fold back to 10553; digit sum 23 ≡ 10553 (mod 15). -/
theorem enumeration_hex4_2939 : reassembles 10553 = true ∧ castsFifteens 10553 = true := by decide

/-- 293a: nibbles fold back to 10554; digit sum 24 ≡ 10554 (mod 15). -/
theorem enumeration_hex4_293a : reassembles 10554 = true ∧ castsFifteens 10554 = true := by decide

/-- 293b: nibbles fold back to 10555; digit sum 25 ≡ 10555 (mod 15). -/
theorem enumeration_hex4_293b : reassembles 10555 = true ∧ castsFifteens 10555 = true := by decide

/-- 293c: nibbles fold back to 10556; digit sum 26 ≡ 10556 (mod 15). -/
theorem enumeration_hex4_293c : reassembles 10556 = true ∧ castsFifteens 10556 = true := by decide

/-- 293d: nibbles fold back to 10557; digit sum 27 ≡ 10557 (mod 15). -/
theorem enumeration_hex4_293d : reassembles 10557 = true ∧ castsFifteens 10557 = true := by decide

/-- 293e: nibbles fold back to 10558; digit sum 28 ≡ 10558 (mod 15). -/
theorem enumeration_hex4_293e : reassembles 10558 = true ∧ castsFifteens 10558 = true := by decide

/-- 293f: nibbles fold back to 10559; digit sum 29 ≡ 10559 (mod 15). -/
theorem enumeration_hex4_293f : reassembles 10559 = true ∧ castsFifteens 10559 = true := by decide

/-- 2940: nibbles fold back to 10560; digit sum 15 ≡ 10560 (mod 15). -/
theorem enumeration_hex4_2940 : reassembles 10560 = true ∧ castsFifteens 10560 = true := by decide

/-- 2941: nibbles fold back to 10561; digit sum 16 ≡ 10561 (mod 15). -/
theorem enumeration_hex4_2941 : reassembles 10561 = true ∧ castsFifteens 10561 = true := by decide

/-- 2942: nibbles fold back to 10562; digit sum 17 ≡ 10562 (mod 15). -/
theorem enumeration_hex4_2942 : reassembles 10562 = true ∧ castsFifteens 10562 = true := by decide

/-- 2943: nibbles fold back to 10563; digit sum 18 ≡ 10563 (mod 15). -/
theorem enumeration_hex4_2943 : reassembles 10563 = true ∧ castsFifteens 10563 = true := by decide

/-- 2944: nibbles fold back to 10564; digit sum 19 ≡ 10564 (mod 15). -/
theorem enumeration_hex4_2944 : reassembles 10564 = true ∧ castsFifteens 10564 = true := by decide

/-- 2945: nibbles fold back to 10565; digit sum 20 ≡ 10565 (mod 15). -/
theorem enumeration_hex4_2945 : reassembles 10565 = true ∧ castsFifteens 10565 = true := by decide

/-- 2946: nibbles fold back to 10566; digit sum 21 ≡ 10566 (mod 15). -/
theorem enumeration_hex4_2946 : reassembles 10566 = true ∧ castsFifteens 10566 = true := by decide

/-- 2947: nibbles fold back to 10567; digit sum 22 ≡ 10567 (mod 15). -/
theorem enumeration_hex4_2947 : reassembles 10567 = true ∧ castsFifteens 10567 = true := by decide

/-- 2948: nibbles fold back to 10568; digit sum 23 ≡ 10568 (mod 15). -/
theorem enumeration_hex4_2948 : reassembles 10568 = true ∧ castsFifteens 10568 = true := by decide

/-- 2949: nibbles fold back to 10569; digit sum 24 ≡ 10569 (mod 15). -/
theorem enumeration_hex4_2949 : reassembles 10569 = true ∧ castsFifteens 10569 = true := by decide

/-- 294a: nibbles fold back to 10570; digit sum 25 ≡ 10570 (mod 15). -/
theorem enumeration_hex4_294a : reassembles 10570 = true ∧ castsFifteens 10570 = true := by decide

/-- 294b: nibbles fold back to 10571; digit sum 26 ≡ 10571 (mod 15). -/
theorem enumeration_hex4_294b : reassembles 10571 = true ∧ castsFifteens 10571 = true := by decide

/-- 294c: nibbles fold back to 10572; digit sum 27 ≡ 10572 (mod 15). -/
theorem enumeration_hex4_294c : reassembles 10572 = true ∧ castsFifteens 10572 = true := by decide

/-- 294d: nibbles fold back to 10573; digit sum 28 ≡ 10573 (mod 15). -/
theorem enumeration_hex4_294d : reassembles 10573 = true ∧ castsFifteens 10573 = true := by decide

/-- 294e: nibbles fold back to 10574; digit sum 29 ≡ 10574 (mod 15). -/
theorem enumeration_hex4_294e : reassembles 10574 = true ∧ castsFifteens 10574 = true := by decide

/-- 294f: nibbles fold back to 10575; digit sum 30 ≡ 10575 (mod 15). -/
theorem enumeration_hex4_294f : reassembles 10575 = true ∧ castsFifteens 10575 = true := by decide

/-- 2950: nibbles fold back to 10576; digit sum 16 ≡ 10576 (mod 15). -/
theorem enumeration_hex4_2950 : reassembles 10576 = true ∧ castsFifteens 10576 = true := by decide

/-- 2951: nibbles fold back to 10577; digit sum 17 ≡ 10577 (mod 15). -/
theorem enumeration_hex4_2951 : reassembles 10577 = true ∧ castsFifteens 10577 = true := by decide

/-- 2952: nibbles fold back to 10578; digit sum 18 ≡ 10578 (mod 15). -/
theorem enumeration_hex4_2952 : reassembles 10578 = true ∧ castsFifteens 10578 = true := by decide

/-- 2953: nibbles fold back to 10579; digit sum 19 ≡ 10579 (mod 15). -/
theorem enumeration_hex4_2953 : reassembles 10579 = true ∧ castsFifteens 10579 = true := by decide

/-- 2954: nibbles fold back to 10580; digit sum 20 ≡ 10580 (mod 15). -/
theorem enumeration_hex4_2954 : reassembles 10580 = true ∧ castsFifteens 10580 = true := by decide

/-- 2955: nibbles fold back to 10581; digit sum 21 ≡ 10581 (mod 15). -/
theorem enumeration_hex4_2955 : reassembles 10581 = true ∧ castsFifteens 10581 = true := by decide

/-- 2956: nibbles fold back to 10582; digit sum 22 ≡ 10582 (mod 15). -/
theorem enumeration_hex4_2956 : reassembles 10582 = true ∧ castsFifteens 10582 = true := by decide

/-- 2957: nibbles fold back to 10583; digit sum 23 ≡ 10583 (mod 15). -/
theorem enumeration_hex4_2957 : reassembles 10583 = true ∧ castsFifteens 10583 = true := by decide

/-- 2958: nibbles fold back to 10584; digit sum 24 ≡ 10584 (mod 15). -/
theorem enumeration_hex4_2958 : reassembles 10584 = true ∧ castsFifteens 10584 = true := by decide

/-- 2959: nibbles fold back to 10585; digit sum 25 ≡ 10585 (mod 15). -/
theorem enumeration_hex4_2959 : reassembles 10585 = true ∧ castsFifteens 10585 = true := by decide

/-- 295a: nibbles fold back to 10586; digit sum 26 ≡ 10586 (mod 15). -/
theorem enumeration_hex4_295a : reassembles 10586 = true ∧ castsFifteens 10586 = true := by decide

/-- 295b: nibbles fold back to 10587; digit sum 27 ≡ 10587 (mod 15). -/
theorem enumeration_hex4_295b : reassembles 10587 = true ∧ castsFifteens 10587 = true := by decide

/-- 295c: nibbles fold back to 10588; digit sum 28 ≡ 10588 (mod 15). -/
theorem enumeration_hex4_295c : reassembles 10588 = true ∧ castsFifteens 10588 = true := by decide

/-- 295d: nibbles fold back to 10589; digit sum 29 ≡ 10589 (mod 15). -/
theorem enumeration_hex4_295d : reassembles 10589 = true ∧ castsFifteens 10589 = true := by decide

/-- 295e: nibbles fold back to 10590; digit sum 30 ≡ 10590 (mod 15). -/
theorem enumeration_hex4_295e : reassembles 10590 = true ∧ castsFifteens 10590 = true := by decide

/-- 295f: nibbles fold back to 10591; digit sum 31 ≡ 10591 (mod 15). -/
theorem enumeration_hex4_295f : reassembles 10591 = true ∧ castsFifteens 10591 = true := by decide

/-- 2960: nibbles fold back to 10592; digit sum 17 ≡ 10592 (mod 15). -/
theorem enumeration_hex4_2960 : reassembles 10592 = true ∧ castsFifteens 10592 = true := by decide

/-- 2961: nibbles fold back to 10593; digit sum 18 ≡ 10593 (mod 15). -/
theorem enumeration_hex4_2961 : reassembles 10593 = true ∧ castsFifteens 10593 = true := by decide

/-- 2962: nibbles fold back to 10594; digit sum 19 ≡ 10594 (mod 15). -/
theorem enumeration_hex4_2962 : reassembles 10594 = true ∧ castsFifteens 10594 = true := by decide

/-- 2963: nibbles fold back to 10595; digit sum 20 ≡ 10595 (mod 15). -/
theorem enumeration_hex4_2963 : reassembles 10595 = true ∧ castsFifteens 10595 = true := by decide

/-- 2964: nibbles fold back to 10596; digit sum 21 ≡ 10596 (mod 15). -/
theorem enumeration_hex4_2964 : reassembles 10596 = true ∧ castsFifteens 10596 = true := by decide

/-- 2965: nibbles fold back to 10597; digit sum 22 ≡ 10597 (mod 15). -/
theorem enumeration_hex4_2965 : reassembles 10597 = true ∧ castsFifteens 10597 = true := by decide

/-- 2966: nibbles fold back to 10598; digit sum 23 ≡ 10598 (mod 15). -/
theorem enumeration_hex4_2966 : reassembles 10598 = true ∧ castsFifteens 10598 = true := by decide

/-- 2967: nibbles fold back to 10599; digit sum 24 ≡ 10599 (mod 15). -/
theorem enumeration_hex4_2967 : reassembles 10599 = true ∧ castsFifteens 10599 = true := by decide

/-- 2968: nibbles fold back to 10600; digit sum 25 ≡ 10600 (mod 15). -/
theorem enumeration_hex4_2968 : reassembles 10600 = true ∧ castsFifteens 10600 = true := by decide

/-- 2969: nibbles fold back to 10601; digit sum 26 ≡ 10601 (mod 15). -/
theorem enumeration_hex4_2969 : reassembles 10601 = true ∧ castsFifteens 10601 = true := by decide

/-- 296a: nibbles fold back to 10602; digit sum 27 ≡ 10602 (mod 15). -/
theorem enumeration_hex4_296a : reassembles 10602 = true ∧ castsFifteens 10602 = true := by decide

/-- 296b: nibbles fold back to 10603; digit sum 28 ≡ 10603 (mod 15). -/
theorem enumeration_hex4_296b : reassembles 10603 = true ∧ castsFifteens 10603 = true := by decide

/-- 296c: nibbles fold back to 10604; digit sum 29 ≡ 10604 (mod 15). -/
theorem enumeration_hex4_296c : reassembles 10604 = true ∧ castsFifteens 10604 = true := by decide

/-- 296d: nibbles fold back to 10605; digit sum 30 ≡ 10605 (mod 15). -/
theorem enumeration_hex4_296d : reassembles 10605 = true ∧ castsFifteens 10605 = true := by decide

/-- 296e: nibbles fold back to 10606; digit sum 31 ≡ 10606 (mod 15). -/
theorem enumeration_hex4_296e : reassembles 10606 = true ∧ castsFifteens 10606 = true := by decide

/-- 296f: nibbles fold back to 10607; digit sum 32 ≡ 10607 (mod 15). -/
theorem enumeration_hex4_296f : reassembles 10607 = true ∧ castsFifteens 10607 = true := by decide

/-- 2970: nibbles fold back to 10608; digit sum 18 ≡ 10608 (mod 15). -/
theorem enumeration_hex4_2970 : reassembles 10608 = true ∧ castsFifteens 10608 = true := by decide

/-- 2971: nibbles fold back to 10609; digit sum 19 ≡ 10609 (mod 15). -/
theorem enumeration_hex4_2971 : reassembles 10609 = true ∧ castsFifteens 10609 = true := by decide

/-- 2972: nibbles fold back to 10610; digit sum 20 ≡ 10610 (mod 15). -/
theorem enumeration_hex4_2972 : reassembles 10610 = true ∧ castsFifteens 10610 = true := by decide

/-- 2973: nibbles fold back to 10611; digit sum 21 ≡ 10611 (mod 15). -/
theorem enumeration_hex4_2973 : reassembles 10611 = true ∧ castsFifteens 10611 = true := by decide

/-- 2974: nibbles fold back to 10612; digit sum 22 ≡ 10612 (mod 15). -/
theorem enumeration_hex4_2974 : reassembles 10612 = true ∧ castsFifteens 10612 = true := by decide

/-- 2975: nibbles fold back to 10613; digit sum 23 ≡ 10613 (mod 15). -/
theorem enumeration_hex4_2975 : reassembles 10613 = true ∧ castsFifteens 10613 = true := by decide

/-- 2976: nibbles fold back to 10614; digit sum 24 ≡ 10614 (mod 15). -/
theorem enumeration_hex4_2976 : reassembles 10614 = true ∧ castsFifteens 10614 = true := by decide

/-- 2977: nibbles fold back to 10615; digit sum 25 ≡ 10615 (mod 15). -/
theorem enumeration_hex4_2977 : reassembles 10615 = true ∧ castsFifteens 10615 = true := by decide

/-- 2978: nibbles fold back to 10616; digit sum 26 ≡ 10616 (mod 15). -/
theorem enumeration_hex4_2978 : reassembles 10616 = true ∧ castsFifteens 10616 = true := by decide

/-- 2979: nibbles fold back to 10617; digit sum 27 ≡ 10617 (mod 15). -/
theorem enumeration_hex4_2979 : reassembles 10617 = true ∧ castsFifteens 10617 = true := by decide

/-- 297a: nibbles fold back to 10618; digit sum 28 ≡ 10618 (mod 15). -/
theorem enumeration_hex4_297a : reassembles 10618 = true ∧ castsFifteens 10618 = true := by decide

/-- 297b: nibbles fold back to 10619; digit sum 29 ≡ 10619 (mod 15). -/
theorem enumeration_hex4_297b : reassembles 10619 = true ∧ castsFifteens 10619 = true := by decide

/-- 297c: nibbles fold back to 10620; digit sum 30 ≡ 10620 (mod 15). -/
theorem enumeration_hex4_297c : reassembles 10620 = true ∧ castsFifteens 10620 = true := by decide

/-- 297d: nibbles fold back to 10621; digit sum 31 ≡ 10621 (mod 15). -/
theorem enumeration_hex4_297d : reassembles 10621 = true ∧ castsFifteens 10621 = true := by decide

/-- 297e: nibbles fold back to 10622; digit sum 32 ≡ 10622 (mod 15). -/
theorem enumeration_hex4_297e : reassembles 10622 = true ∧ castsFifteens 10622 = true := by decide

/-- 297f: nibbles fold back to 10623; digit sum 33 ≡ 10623 (mod 15). -/
theorem enumeration_hex4_297f : reassembles 10623 = true ∧ castsFifteens 10623 = true := by decide

/-- 2980: nibbles fold back to 10624; digit sum 19 ≡ 10624 (mod 15). -/
theorem enumeration_hex4_2980 : reassembles 10624 = true ∧ castsFifteens 10624 = true := by decide

/-- 2981: nibbles fold back to 10625; digit sum 20 ≡ 10625 (mod 15). -/
theorem enumeration_hex4_2981 : reassembles 10625 = true ∧ castsFifteens 10625 = true := by decide

/-- 2982: nibbles fold back to 10626; digit sum 21 ≡ 10626 (mod 15). -/
theorem enumeration_hex4_2982 : reassembles 10626 = true ∧ castsFifteens 10626 = true := by decide

/-- 2983: nibbles fold back to 10627; digit sum 22 ≡ 10627 (mod 15). -/
theorem enumeration_hex4_2983 : reassembles 10627 = true ∧ castsFifteens 10627 = true := by decide

/-- 2984: nibbles fold back to 10628; digit sum 23 ≡ 10628 (mod 15). -/
theorem enumeration_hex4_2984 : reassembles 10628 = true ∧ castsFifteens 10628 = true := by decide

/-- 2985: nibbles fold back to 10629; digit sum 24 ≡ 10629 (mod 15). -/
theorem enumeration_hex4_2985 : reassembles 10629 = true ∧ castsFifteens 10629 = true := by decide

/-- 2986: nibbles fold back to 10630; digit sum 25 ≡ 10630 (mod 15). -/
theorem enumeration_hex4_2986 : reassembles 10630 = true ∧ castsFifteens 10630 = true := by decide

/-- 2987: nibbles fold back to 10631; digit sum 26 ≡ 10631 (mod 15). -/
theorem enumeration_hex4_2987 : reassembles 10631 = true ∧ castsFifteens 10631 = true := by decide

/-- 2988: nibbles fold back to 10632; digit sum 27 ≡ 10632 (mod 15). -/
theorem enumeration_hex4_2988 : reassembles 10632 = true ∧ castsFifteens 10632 = true := by decide

/-- 2989: nibbles fold back to 10633; digit sum 28 ≡ 10633 (mod 15). -/
theorem enumeration_hex4_2989 : reassembles 10633 = true ∧ castsFifteens 10633 = true := by decide

/-- 298a: nibbles fold back to 10634; digit sum 29 ≡ 10634 (mod 15). -/
theorem enumeration_hex4_298a : reassembles 10634 = true ∧ castsFifteens 10634 = true := by decide

/-- 298b: nibbles fold back to 10635; digit sum 30 ≡ 10635 (mod 15). -/
theorem enumeration_hex4_298b : reassembles 10635 = true ∧ castsFifteens 10635 = true := by decide

/-- 298c: nibbles fold back to 10636; digit sum 31 ≡ 10636 (mod 15). -/
theorem enumeration_hex4_298c : reassembles 10636 = true ∧ castsFifteens 10636 = true := by decide

/-- 298d: nibbles fold back to 10637; digit sum 32 ≡ 10637 (mod 15). -/
theorem enumeration_hex4_298d : reassembles 10637 = true ∧ castsFifteens 10637 = true := by decide

/-- 298e: nibbles fold back to 10638; digit sum 33 ≡ 10638 (mod 15). -/
theorem enumeration_hex4_298e : reassembles 10638 = true ∧ castsFifteens 10638 = true := by decide

/-- 298f: nibbles fold back to 10639; digit sum 34 ≡ 10639 (mod 15). -/
theorem enumeration_hex4_298f : reassembles 10639 = true ∧ castsFifteens 10639 = true := by decide

/-- 2990: nibbles fold back to 10640; digit sum 20 ≡ 10640 (mod 15). -/
theorem enumeration_hex4_2990 : reassembles 10640 = true ∧ castsFifteens 10640 = true := by decide

/-- 2991: nibbles fold back to 10641; digit sum 21 ≡ 10641 (mod 15). -/
theorem enumeration_hex4_2991 : reassembles 10641 = true ∧ castsFifteens 10641 = true := by decide

/-- 2992: nibbles fold back to 10642; digit sum 22 ≡ 10642 (mod 15). -/
theorem enumeration_hex4_2992 : reassembles 10642 = true ∧ castsFifteens 10642 = true := by decide

/-- 2993: nibbles fold back to 10643; digit sum 23 ≡ 10643 (mod 15). -/
theorem enumeration_hex4_2993 : reassembles 10643 = true ∧ castsFifteens 10643 = true := by decide

/-- 2994: nibbles fold back to 10644; digit sum 24 ≡ 10644 (mod 15). -/
theorem enumeration_hex4_2994 : reassembles 10644 = true ∧ castsFifteens 10644 = true := by decide

/-- 2995: nibbles fold back to 10645; digit sum 25 ≡ 10645 (mod 15). -/
theorem enumeration_hex4_2995 : reassembles 10645 = true ∧ castsFifteens 10645 = true := by decide

/-- 2996: nibbles fold back to 10646; digit sum 26 ≡ 10646 (mod 15). -/
theorem enumeration_hex4_2996 : reassembles 10646 = true ∧ castsFifteens 10646 = true := by decide

/-- 2997: nibbles fold back to 10647; digit sum 27 ≡ 10647 (mod 15). -/
theorem enumeration_hex4_2997 : reassembles 10647 = true ∧ castsFifteens 10647 = true := by decide

/-- 2998: nibbles fold back to 10648; digit sum 28 ≡ 10648 (mod 15). -/
theorem enumeration_hex4_2998 : reassembles 10648 = true ∧ castsFifteens 10648 = true := by decide

/-- 2999: nibbles fold back to 10649; digit sum 29 ≡ 10649 (mod 15). -/
theorem enumeration_hex4_2999 : reassembles 10649 = true ∧ castsFifteens 10649 = true := by decide

/-- 299a: nibbles fold back to 10650; digit sum 30 ≡ 10650 (mod 15). -/
theorem enumeration_hex4_299a : reassembles 10650 = true ∧ castsFifteens 10650 = true := by decide

/-- 299b: nibbles fold back to 10651; digit sum 31 ≡ 10651 (mod 15). -/
theorem enumeration_hex4_299b : reassembles 10651 = true ∧ castsFifteens 10651 = true := by decide

/-- 299c: nibbles fold back to 10652; digit sum 32 ≡ 10652 (mod 15). -/
theorem enumeration_hex4_299c : reassembles 10652 = true ∧ castsFifteens 10652 = true := by decide

/-- 299d: nibbles fold back to 10653; digit sum 33 ≡ 10653 (mod 15). -/
theorem enumeration_hex4_299d : reassembles 10653 = true ∧ castsFifteens 10653 = true := by decide

/-- 299e: nibbles fold back to 10654; digit sum 34 ≡ 10654 (mod 15). -/
theorem enumeration_hex4_299e : reassembles 10654 = true ∧ castsFifteens 10654 = true := by decide

/-- 299f: nibbles fold back to 10655; digit sum 35 ≡ 10655 (mod 15). -/
theorem enumeration_hex4_299f : reassembles 10655 = true ∧ castsFifteens 10655 = true := by decide

/-- 29a0: nibbles fold back to 10656; digit sum 21 ≡ 10656 (mod 15). -/
theorem enumeration_hex4_29a0 : reassembles 10656 = true ∧ castsFifteens 10656 = true := by decide

/-- 29a1: nibbles fold back to 10657; digit sum 22 ≡ 10657 (mod 15). -/
theorem enumeration_hex4_29a1 : reassembles 10657 = true ∧ castsFifteens 10657 = true := by decide

/-- 29a2: nibbles fold back to 10658; digit sum 23 ≡ 10658 (mod 15). -/
theorem enumeration_hex4_29a2 : reassembles 10658 = true ∧ castsFifteens 10658 = true := by decide

/-- 29a3: nibbles fold back to 10659; digit sum 24 ≡ 10659 (mod 15). -/
theorem enumeration_hex4_29a3 : reassembles 10659 = true ∧ castsFifteens 10659 = true := by decide

/-- 29a4: nibbles fold back to 10660; digit sum 25 ≡ 10660 (mod 15). -/
theorem enumeration_hex4_29a4 : reassembles 10660 = true ∧ castsFifteens 10660 = true := by decide

/-- 29a5: nibbles fold back to 10661; digit sum 26 ≡ 10661 (mod 15). -/
theorem enumeration_hex4_29a5 : reassembles 10661 = true ∧ castsFifteens 10661 = true := by decide

/-- 29a6: nibbles fold back to 10662; digit sum 27 ≡ 10662 (mod 15). -/
theorem enumeration_hex4_29a6 : reassembles 10662 = true ∧ castsFifteens 10662 = true := by decide

/-- 29a7: nibbles fold back to 10663; digit sum 28 ≡ 10663 (mod 15). -/
theorem enumeration_hex4_29a7 : reassembles 10663 = true ∧ castsFifteens 10663 = true := by decide

/-- 29a8: nibbles fold back to 10664; digit sum 29 ≡ 10664 (mod 15). -/
theorem enumeration_hex4_29a8 : reassembles 10664 = true ∧ castsFifteens 10664 = true := by decide

/-- 29a9: nibbles fold back to 10665; digit sum 30 ≡ 10665 (mod 15). -/
theorem enumeration_hex4_29a9 : reassembles 10665 = true ∧ castsFifteens 10665 = true := by decide

/-- 29aa: nibbles fold back to 10666; digit sum 31 ≡ 10666 (mod 15). -/
theorem enumeration_hex4_29aa : reassembles 10666 = true ∧ castsFifteens 10666 = true := by decide

/-- 29ab: nibbles fold back to 10667; digit sum 32 ≡ 10667 (mod 15). -/
theorem enumeration_hex4_29ab : reassembles 10667 = true ∧ castsFifteens 10667 = true := by decide

/-- 29ac: nibbles fold back to 10668; digit sum 33 ≡ 10668 (mod 15). -/
theorem enumeration_hex4_29ac : reassembles 10668 = true ∧ castsFifteens 10668 = true := by decide

/-- 29ad: nibbles fold back to 10669; digit sum 34 ≡ 10669 (mod 15). -/
theorem enumeration_hex4_29ad : reassembles 10669 = true ∧ castsFifteens 10669 = true := by decide

/-- 29ae: nibbles fold back to 10670; digit sum 35 ≡ 10670 (mod 15). -/
theorem enumeration_hex4_29ae : reassembles 10670 = true ∧ castsFifteens 10670 = true := by decide

/-- 29af: nibbles fold back to 10671; digit sum 36 ≡ 10671 (mod 15). -/
theorem enumeration_hex4_29af : reassembles 10671 = true ∧ castsFifteens 10671 = true := by decide

/-- 29b0: nibbles fold back to 10672; digit sum 22 ≡ 10672 (mod 15). -/
theorem enumeration_hex4_29b0 : reassembles 10672 = true ∧ castsFifteens 10672 = true := by decide

/-- 29b1: nibbles fold back to 10673; digit sum 23 ≡ 10673 (mod 15). -/
theorem enumeration_hex4_29b1 : reassembles 10673 = true ∧ castsFifteens 10673 = true := by decide

/-- 29b2: nibbles fold back to 10674; digit sum 24 ≡ 10674 (mod 15). -/
theorem enumeration_hex4_29b2 : reassembles 10674 = true ∧ castsFifteens 10674 = true := by decide

/-- 29b3: nibbles fold back to 10675; digit sum 25 ≡ 10675 (mod 15). -/
theorem enumeration_hex4_29b3 : reassembles 10675 = true ∧ castsFifteens 10675 = true := by decide

/-- 29b4: nibbles fold back to 10676; digit sum 26 ≡ 10676 (mod 15). -/
theorem enumeration_hex4_29b4 : reassembles 10676 = true ∧ castsFifteens 10676 = true := by decide

/-- 29b5: nibbles fold back to 10677; digit sum 27 ≡ 10677 (mod 15). -/
theorem enumeration_hex4_29b5 : reassembles 10677 = true ∧ castsFifteens 10677 = true := by decide

/-- 29b6: nibbles fold back to 10678; digit sum 28 ≡ 10678 (mod 15). -/
theorem enumeration_hex4_29b6 : reassembles 10678 = true ∧ castsFifteens 10678 = true := by decide

/-- 29b7: nibbles fold back to 10679; digit sum 29 ≡ 10679 (mod 15). -/
theorem enumeration_hex4_29b7 : reassembles 10679 = true ∧ castsFifteens 10679 = true := by decide

/-- 29b8: nibbles fold back to 10680; digit sum 30 ≡ 10680 (mod 15). -/
theorem enumeration_hex4_29b8 : reassembles 10680 = true ∧ castsFifteens 10680 = true := by decide

/-- 29b9: nibbles fold back to 10681; digit sum 31 ≡ 10681 (mod 15). -/
theorem enumeration_hex4_29b9 : reassembles 10681 = true ∧ castsFifteens 10681 = true := by decide

/-- 29ba: nibbles fold back to 10682; digit sum 32 ≡ 10682 (mod 15). -/
theorem enumeration_hex4_29ba : reassembles 10682 = true ∧ castsFifteens 10682 = true := by decide

/-- 29bb: nibbles fold back to 10683; digit sum 33 ≡ 10683 (mod 15). -/
theorem enumeration_hex4_29bb : reassembles 10683 = true ∧ castsFifteens 10683 = true := by decide

/-- 29bc: nibbles fold back to 10684; digit sum 34 ≡ 10684 (mod 15). -/
theorem enumeration_hex4_29bc : reassembles 10684 = true ∧ castsFifteens 10684 = true := by decide

/-- 29bd: nibbles fold back to 10685; digit sum 35 ≡ 10685 (mod 15). -/
theorem enumeration_hex4_29bd : reassembles 10685 = true ∧ castsFifteens 10685 = true := by decide

/-- 29be: nibbles fold back to 10686; digit sum 36 ≡ 10686 (mod 15). -/
theorem enumeration_hex4_29be : reassembles 10686 = true ∧ castsFifteens 10686 = true := by decide

/-- 29bf: nibbles fold back to 10687; digit sum 37 ≡ 10687 (mod 15). -/
theorem enumeration_hex4_29bf : reassembles 10687 = true ∧ castsFifteens 10687 = true := by decide

/-- 29c0: nibbles fold back to 10688; digit sum 23 ≡ 10688 (mod 15). -/
theorem enumeration_hex4_29c0 : reassembles 10688 = true ∧ castsFifteens 10688 = true := by decide

/-- 29c1: nibbles fold back to 10689; digit sum 24 ≡ 10689 (mod 15). -/
theorem enumeration_hex4_29c1 : reassembles 10689 = true ∧ castsFifteens 10689 = true := by decide

/-- 29c2: nibbles fold back to 10690; digit sum 25 ≡ 10690 (mod 15). -/
theorem enumeration_hex4_29c2 : reassembles 10690 = true ∧ castsFifteens 10690 = true := by decide

/-- 29c3: nibbles fold back to 10691; digit sum 26 ≡ 10691 (mod 15). -/
theorem enumeration_hex4_29c3 : reassembles 10691 = true ∧ castsFifteens 10691 = true := by decide

/-- 29c4: nibbles fold back to 10692; digit sum 27 ≡ 10692 (mod 15). -/
theorem enumeration_hex4_29c4 : reassembles 10692 = true ∧ castsFifteens 10692 = true := by decide

/-- 29c5: nibbles fold back to 10693; digit sum 28 ≡ 10693 (mod 15). -/
theorem enumeration_hex4_29c5 : reassembles 10693 = true ∧ castsFifteens 10693 = true := by decide

/-- 29c6: nibbles fold back to 10694; digit sum 29 ≡ 10694 (mod 15). -/
theorem enumeration_hex4_29c6 : reassembles 10694 = true ∧ castsFifteens 10694 = true := by decide

/-- 29c7: nibbles fold back to 10695; digit sum 30 ≡ 10695 (mod 15). -/
theorem enumeration_hex4_29c7 : reassembles 10695 = true ∧ castsFifteens 10695 = true := by decide

/-- 29c8: nibbles fold back to 10696; digit sum 31 ≡ 10696 (mod 15). -/
theorem enumeration_hex4_29c8 : reassembles 10696 = true ∧ castsFifteens 10696 = true := by decide

/-- 29c9: nibbles fold back to 10697; digit sum 32 ≡ 10697 (mod 15). -/
theorem enumeration_hex4_29c9 : reassembles 10697 = true ∧ castsFifteens 10697 = true := by decide

/-- 29ca: nibbles fold back to 10698; digit sum 33 ≡ 10698 (mod 15). -/
theorem enumeration_hex4_29ca : reassembles 10698 = true ∧ castsFifteens 10698 = true := by decide

/-- 29cb: nibbles fold back to 10699; digit sum 34 ≡ 10699 (mod 15). -/
theorem enumeration_hex4_29cb : reassembles 10699 = true ∧ castsFifteens 10699 = true := by decide

/-- 29cc: nibbles fold back to 10700; digit sum 35 ≡ 10700 (mod 15). -/
theorem enumeration_hex4_29cc : reassembles 10700 = true ∧ castsFifteens 10700 = true := by decide

/-- 29cd: nibbles fold back to 10701; digit sum 36 ≡ 10701 (mod 15). -/
theorem enumeration_hex4_29cd : reassembles 10701 = true ∧ castsFifteens 10701 = true := by decide

/-- 29ce: nibbles fold back to 10702; digit sum 37 ≡ 10702 (mod 15). -/
theorem enumeration_hex4_29ce : reassembles 10702 = true ∧ castsFifteens 10702 = true := by decide

/-- 29cf: nibbles fold back to 10703; digit sum 38 ≡ 10703 (mod 15). -/
theorem enumeration_hex4_29cf : reassembles 10703 = true ∧ castsFifteens 10703 = true := by decide

/-- 29d0: nibbles fold back to 10704; digit sum 24 ≡ 10704 (mod 15). -/
theorem enumeration_hex4_29d0 : reassembles 10704 = true ∧ castsFifteens 10704 = true := by decide

/-- 29d1: nibbles fold back to 10705; digit sum 25 ≡ 10705 (mod 15). -/
theorem enumeration_hex4_29d1 : reassembles 10705 = true ∧ castsFifteens 10705 = true := by decide

/-- 29d2: nibbles fold back to 10706; digit sum 26 ≡ 10706 (mod 15). -/
theorem enumeration_hex4_29d2 : reassembles 10706 = true ∧ castsFifteens 10706 = true := by decide

/-- 29d3: nibbles fold back to 10707; digit sum 27 ≡ 10707 (mod 15). -/
theorem enumeration_hex4_29d3 : reassembles 10707 = true ∧ castsFifteens 10707 = true := by decide

/-- 29d4: nibbles fold back to 10708; digit sum 28 ≡ 10708 (mod 15). -/
theorem enumeration_hex4_29d4 : reassembles 10708 = true ∧ castsFifteens 10708 = true := by decide

/-- 29d5: nibbles fold back to 10709; digit sum 29 ≡ 10709 (mod 15). -/
theorem enumeration_hex4_29d5 : reassembles 10709 = true ∧ castsFifteens 10709 = true := by decide

/-- 29d6: nibbles fold back to 10710; digit sum 30 ≡ 10710 (mod 15). -/
theorem enumeration_hex4_29d6 : reassembles 10710 = true ∧ castsFifteens 10710 = true := by decide

/-- 29d7: nibbles fold back to 10711; digit sum 31 ≡ 10711 (mod 15). -/
theorem enumeration_hex4_29d7 : reassembles 10711 = true ∧ castsFifteens 10711 = true := by decide

/-- 29d8: nibbles fold back to 10712; digit sum 32 ≡ 10712 (mod 15). -/
theorem enumeration_hex4_29d8 : reassembles 10712 = true ∧ castsFifteens 10712 = true := by decide

/-- 29d9: nibbles fold back to 10713; digit sum 33 ≡ 10713 (mod 15). -/
theorem enumeration_hex4_29d9 : reassembles 10713 = true ∧ castsFifteens 10713 = true := by decide

/-- 29da: nibbles fold back to 10714; digit sum 34 ≡ 10714 (mod 15). -/
theorem enumeration_hex4_29da : reassembles 10714 = true ∧ castsFifteens 10714 = true := by decide

/-- 29db: nibbles fold back to 10715; digit sum 35 ≡ 10715 (mod 15). -/
theorem enumeration_hex4_29db : reassembles 10715 = true ∧ castsFifteens 10715 = true := by decide

/-- 29dc: nibbles fold back to 10716; digit sum 36 ≡ 10716 (mod 15). -/
theorem enumeration_hex4_29dc : reassembles 10716 = true ∧ castsFifteens 10716 = true := by decide

/-- 29dd: nibbles fold back to 10717; digit sum 37 ≡ 10717 (mod 15). -/
theorem enumeration_hex4_29dd : reassembles 10717 = true ∧ castsFifteens 10717 = true := by decide

/-- 29de: nibbles fold back to 10718; digit sum 38 ≡ 10718 (mod 15). -/
theorem enumeration_hex4_29de : reassembles 10718 = true ∧ castsFifteens 10718 = true := by decide

/-- 29df: nibbles fold back to 10719; digit sum 39 ≡ 10719 (mod 15). -/
theorem enumeration_hex4_29df : reassembles 10719 = true ∧ castsFifteens 10719 = true := by decide

/-- 29e0: nibbles fold back to 10720; digit sum 25 ≡ 10720 (mod 15). -/
theorem enumeration_hex4_29e0 : reassembles 10720 = true ∧ castsFifteens 10720 = true := by decide

/-- 29e1: nibbles fold back to 10721; digit sum 26 ≡ 10721 (mod 15). -/
theorem enumeration_hex4_29e1 : reassembles 10721 = true ∧ castsFifteens 10721 = true := by decide

/-- 29e2: nibbles fold back to 10722; digit sum 27 ≡ 10722 (mod 15). -/
theorem enumeration_hex4_29e2 : reassembles 10722 = true ∧ castsFifteens 10722 = true := by decide

/-- 29e3: nibbles fold back to 10723; digit sum 28 ≡ 10723 (mod 15). -/
theorem enumeration_hex4_29e3 : reassembles 10723 = true ∧ castsFifteens 10723 = true := by decide

/-- 29e4: nibbles fold back to 10724; digit sum 29 ≡ 10724 (mod 15). -/
theorem enumeration_hex4_29e4 : reassembles 10724 = true ∧ castsFifteens 10724 = true := by decide

/-- 29e5: nibbles fold back to 10725; digit sum 30 ≡ 10725 (mod 15). -/
theorem enumeration_hex4_29e5 : reassembles 10725 = true ∧ castsFifteens 10725 = true := by decide

/-- 29e6: nibbles fold back to 10726; digit sum 31 ≡ 10726 (mod 15). -/
theorem enumeration_hex4_29e6 : reassembles 10726 = true ∧ castsFifteens 10726 = true := by decide

/-- 29e7: nibbles fold back to 10727; digit sum 32 ≡ 10727 (mod 15). -/
theorem enumeration_hex4_29e7 : reassembles 10727 = true ∧ castsFifteens 10727 = true := by decide

/-- 29e8: nibbles fold back to 10728; digit sum 33 ≡ 10728 (mod 15). -/
theorem enumeration_hex4_29e8 : reassembles 10728 = true ∧ castsFifteens 10728 = true := by decide

/-- 29e9: nibbles fold back to 10729; digit sum 34 ≡ 10729 (mod 15). -/
theorem enumeration_hex4_29e9 : reassembles 10729 = true ∧ castsFifteens 10729 = true := by decide

/-- 29ea: nibbles fold back to 10730; digit sum 35 ≡ 10730 (mod 15). -/
theorem enumeration_hex4_29ea : reassembles 10730 = true ∧ castsFifteens 10730 = true := by decide

/-- 29eb: nibbles fold back to 10731; digit sum 36 ≡ 10731 (mod 15). -/
theorem enumeration_hex4_29eb : reassembles 10731 = true ∧ castsFifteens 10731 = true := by decide

/-- 29ec: nibbles fold back to 10732; digit sum 37 ≡ 10732 (mod 15). -/
theorem enumeration_hex4_29ec : reassembles 10732 = true ∧ castsFifteens 10732 = true := by decide

/-- 29ed: nibbles fold back to 10733; digit sum 38 ≡ 10733 (mod 15). -/
theorem enumeration_hex4_29ed : reassembles 10733 = true ∧ castsFifteens 10733 = true := by decide

/-- 29ee: nibbles fold back to 10734; digit sum 39 ≡ 10734 (mod 15). -/
theorem enumeration_hex4_29ee : reassembles 10734 = true ∧ castsFifteens 10734 = true := by decide

/-- 29ef: nibbles fold back to 10735; digit sum 40 ≡ 10735 (mod 15). -/
theorem enumeration_hex4_29ef : reassembles 10735 = true ∧ castsFifteens 10735 = true := by decide

/-- 29f0: nibbles fold back to 10736; digit sum 26 ≡ 10736 (mod 15). -/
theorem enumeration_hex4_29f0 : reassembles 10736 = true ∧ castsFifteens 10736 = true := by decide

/-- 29f1: nibbles fold back to 10737; digit sum 27 ≡ 10737 (mod 15). -/
theorem enumeration_hex4_29f1 : reassembles 10737 = true ∧ castsFifteens 10737 = true := by decide

/-- 29f2: nibbles fold back to 10738; digit sum 28 ≡ 10738 (mod 15). -/
theorem enumeration_hex4_29f2 : reassembles 10738 = true ∧ castsFifteens 10738 = true := by decide

/-- 29f3: nibbles fold back to 10739; digit sum 29 ≡ 10739 (mod 15). -/
theorem enumeration_hex4_29f3 : reassembles 10739 = true ∧ castsFifteens 10739 = true := by decide

/-- 29f4: nibbles fold back to 10740; digit sum 30 ≡ 10740 (mod 15). -/
theorem enumeration_hex4_29f4 : reassembles 10740 = true ∧ castsFifteens 10740 = true := by decide

/-- 29f5: nibbles fold back to 10741; digit sum 31 ≡ 10741 (mod 15). -/
theorem enumeration_hex4_29f5 : reassembles 10741 = true ∧ castsFifteens 10741 = true := by decide

/-- 29f6: nibbles fold back to 10742; digit sum 32 ≡ 10742 (mod 15). -/
theorem enumeration_hex4_29f6 : reassembles 10742 = true ∧ castsFifteens 10742 = true := by decide

/-- 29f7: nibbles fold back to 10743; digit sum 33 ≡ 10743 (mod 15). -/
theorem enumeration_hex4_29f7 : reassembles 10743 = true ∧ castsFifteens 10743 = true := by decide

/-- 29f8: nibbles fold back to 10744; digit sum 34 ≡ 10744 (mod 15). -/
theorem enumeration_hex4_29f8 : reassembles 10744 = true ∧ castsFifteens 10744 = true := by decide

/-- 29f9: nibbles fold back to 10745; digit sum 35 ≡ 10745 (mod 15). -/
theorem enumeration_hex4_29f9 : reassembles 10745 = true ∧ castsFifteens 10745 = true := by decide

/-- 29fa: nibbles fold back to 10746; digit sum 36 ≡ 10746 (mod 15). -/
theorem enumeration_hex4_29fa : reassembles 10746 = true ∧ castsFifteens 10746 = true := by decide

/-- 29fb: nibbles fold back to 10747; digit sum 37 ≡ 10747 (mod 15). -/
theorem enumeration_hex4_29fb : reassembles 10747 = true ∧ castsFifteens 10747 = true := by decide

/-- 29fc: nibbles fold back to 10748; digit sum 38 ≡ 10748 (mod 15). -/
theorem enumeration_hex4_29fc : reassembles 10748 = true ∧ castsFifteens 10748 = true := by decide

/-- 29fd: nibbles fold back to 10749; digit sum 39 ≡ 10749 (mod 15). -/
theorem enumeration_hex4_29fd : reassembles 10749 = true ∧ castsFifteens 10749 = true := by decide

/-- 29fe: nibbles fold back to 10750; digit sum 40 ≡ 10750 (mod 15). -/
theorem enumeration_hex4_29fe : reassembles 10750 = true ∧ castsFifteens 10750 = true := by decide

/-- 29ff: nibbles fold back to 10751; digit sum 41 ≡ 10751 (mod 15). -/
theorem enumeration_hex4_29ff : reassembles 10751 = true ∧ castsFifteens 10751 = true := by decide

/-- 2a00: nibbles fold back to 10752; digit sum 12 ≡ 10752 (mod 15). -/
theorem enumeration_hex4_2a00 : reassembles 10752 = true ∧ castsFifteens 10752 = true := by decide

/-- 2a01: nibbles fold back to 10753; digit sum 13 ≡ 10753 (mod 15). -/
theorem enumeration_hex4_2a01 : reassembles 10753 = true ∧ castsFifteens 10753 = true := by decide

/-- 2a02: nibbles fold back to 10754; digit sum 14 ≡ 10754 (mod 15). -/
theorem enumeration_hex4_2a02 : reassembles 10754 = true ∧ castsFifteens 10754 = true := by decide

/-- 2a03: nibbles fold back to 10755; digit sum 15 ≡ 10755 (mod 15). -/
theorem enumeration_hex4_2a03 : reassembles 10755 = true ∧ castsFifteens 10755 = true := by decide

/-- 2a04: nibbles fold back to 10756; digit sum 16 ≡ 10756 (mod 15). -/
theorem enumeration_hex4_2a04 : reassembles 10756 = true ∧ castsFifteens 10756 = true := by decide

/-- 2a05: nibbles fold back to 10757; digit sum 17 ≡ 10757 (mod 15). -/
theorem enumeration_hex4_2a05 : reassembles 10757 = true ∧ castsFifteens 10757 = true := by decide

/-- 2a06: nibbles fold back to 10758; digit sum 18 ≡ 10758 (mod 15). -/
theorem enumeration_hex4_2a06 : reassembles 10758 = true ∧ castsFifteens 10758 = true := by decide

/-- 2a07: nibbles fold back to 10759; digit sum 19 ≡ 10759 (mod 15). -/
theorem enumeration_hex4_2a07 : reassembles 10759 = true ∧ castsFifteens 10759 = true := by decide

/-- 2a08: nibbles fold back to 10760; digit sum 20 ≡ 10760 (mod 15). -/
theorem enumeration_hex4_2a08 : reassembles 10760 = true ∧ castsFifteens 10760 = true := by decide

/-- 2a09: nibbles fold back to 10761; digit sum 21 ≡ 10761 (mod 15). -/
theorem enumeration_hex4_2a09 : reassembles 10761 = true ∧ castsFifteens 10761 = true := by decide

/-- 2a0a: nibbles fold back to 10762; digit sum 22 ≡ 10762 (mod 15). -/
theorem enumeration_hex4_2a0a : reassembles 10762 = true ∧ castsFifteens 10762 = true := by decide

/-- 2a0b: nibbles fold back to 10763; digit sum 23 ≡ 10763 (mod 15). -/
theorem enumeration_hex4_2a0b : reassembles 10763 = true ∧ castsFifteens 10763 = true := by decide

/-- 2a0c: nibbles fold back to 10764; digit sum 24 ≡ 10764 (mod 15). -/
theorem enumeration_hex4_2a0c : reassembles 10764 = true ∧ castsFifteens 10764 = true := by decide

/-- 2a0d: nibbles fold back to 10765; digit sum 25 ≡ 10765 (mod 15). -/
theorem enumeration_hex4_2a0d : reassembles 10765 = true ∧ castsFifteens 10765 = true := by decide

/-- 2a0e: nibbles fold back to 10766; digit sum 26 ≡ 10766 (mod 15). -/
theorem enumeration_hex4_2a0e : reassembles 10766 = true ∧ castsFifteens 10766 = true := by decide

/-- 2a0f: nibbles fold back to 10767; digit sum 27 ≡ 10767 (mod 15). -/
theorem enumeration_hex4_2a0f : reassembles 10767 = true ∧ castsFifteens 10767 = true := by decide

/-- 2a10: nibbles fold back to 10768; digit sum 13 ≡ 10768 (mod 15). -/
theorem enumeration_hex4_2a10 : reassembles 10768 = true ∧ castsFifteens 10768 = true := by decide

/-- 2a11: nibbles fold back to 10769; digit sum 14 ≡ 10769 (mod 15). -/
theorem enumeration_hex4_2a11 : reassembles 10769 = true ∧ castsFifteens 10769 = true := by decide

/-- 2a12: nibbles fold back to 10770; digit sum 15 ≡ 10770 (mod 15). -/
theorem enumeration_hex4_2a12 : reassembles 10770 = true ∧ castsFifteens 10770 = true := by decide

/-- 2a13: nibbles fold back to 10771; digit sum 16 ≡ 10771 (mod 15). -/
theorem enumeration_hex4_2a13 : reassembles 10771 = true ∧ castsFifteens 10771 = true := by decide

/-- 2a14: nibbles fold back to 10772; digit sum 17 ≡ 10772 (mod 15). -/
theorem enumeration_hex4_2a14 : reassembles 10772 = true ∧ castsFifteens 10772 = true := by decide

/-- 2a15: nibbles fold back to 10773; digit sum 18 ≡ 10773 (mod 15). -/
theorem enumeration_hex4_2a15 : reassembles 10773 = true ∧ castsFifteens 10773 = true := by decide

/-- 2a16: nibbles fold back to 10774; digit sum 19 ≡ 10774 (mod 15). -/
theorem enumeration_hex4_2a16 : reassembles 10774 = true ∧ castsFifteens 10774 = true := by decide

/-- 2a17: nibbles fold back to 10775; digit sum 20 ≡ 10775 (mod 15). -/
theorem enumeration_hex4_2a17 : reassembles 10775 = true ∧ castsFifteens 10775 = true := by decide

/-- 2a18: nibbles fold back to 10776; digit sum 21 ≡ 10776 (mod 15). -/
theorem enumeration_hex4_2a18 : reassembles 10776 = true ∧ castsFifteens 10776 = true := by decide

/-- 2a19: nibbles fold back to 10777; digit sum 22 ≡ 10777 (mod 15). -/
theorem enumeration_hex4_2a19 : reassembles 10777 = true ∧ castsFifteens 10777 = true := by decide

/-- 2a1a: nibbles fold back to 10778; digit sum 23 ≡ 10778 (mod 15). -/
theorem enumeration_hex4_2a1a : reassembles 10778 = true ∧ castsFifteens 10778 = true := by decide

/-- 2a1b: nibbles fold back to 10779; digit sum 24 ≡ 10779 (mod 15). -/
theorem enumeration_hex4_2a1b : reassembles 10779 = true ∧ castsFifteens 10779 = true := by decide

/-- 2a1c: nibbles fold back to 10780; digit sum 25 ≡ 10780 (mod 15). -/
theorem enumeration_hex4_2a1c : reassembles 10780 = true ∧ castsFifteens 10780 = true := by decide

/-- 2a1d: nibbles fold back to 10781; digit sum 26 ≡ 10781 (mod 15). -/
theorem enumeration_hex4_2a1d : reassembles 10781 = true ∧ castsFifteens 10781 = true := by decide

/-- 2a1e: nibbles fold back to 10782; digit sum 27 ≡ 10782 (mod 15). -/
theorem enumeration_hex4_2a1e : reassembles 10782 = true ∧ castsFifteens 10782 = true := by decide

/-- 2a1f: nibbles fold back to 10783; digit sum 28 ≡ 10783 (mod 15). -/
theorem enumeration_hex4_2a1f : reassembles 10783 = true ∧ castsFifteens 10783 = true := by decide

/-- 2a20: nibbles fold back to 10784; digit sum 14 ≡ 10784 (mod 15). -/
theorem enumeration_hex4_2a20 : reassembles 10784 = true ∧ castsFifteens 10784 = true := by decide

/-- 2a21: nibbles fold back to 10785; digit sum 15 ≡ 10785 (mod 15). -/
theorem enumeration_hex4_2a21 : reassembles 10785 = true ∧ castsFifteens 10785 = true := by decide

/-- 2a22: nibbles fold back to 10786; digit sum 16 ≡ 10786 (mod 15). -/
theorem enumeration_hex4_2a22 : reassembles 10786 = true ∧ castsFifteens 10786 = true := by decide

/-- 2a23: nibbles fold back to 10787; digit sum 17 ≡ 10787 (mod 15). -/
theorem enumeration_hex4_2a23 : reassembles 10787 = true ∧ castsFifteens 10787 = true := by decide

/-- 2a24: nibbles fold back to 10788; digit sum 18 ≡ 10788 (mod 15). -/
theorem enumeration_hex4_2a24 : reassembles 10788 = true ∧ castsFifteens 10788 = true := by decide

/-- 2a25: nibbles fold back to 10789; digit sum 19 ≡ 10789 (mod 15). -/
theorem enumeration_hex4_2a25 : reassembles 10789 = true ∧ castsFifteens 10789 = true := by decide

/-- 2a26: nibbles fold back to 10790; digit sum 20 ≡ 10790 (mod 15). -/
theorem enumeration_hex4_2a26 : reassembles 10790 = true ∧ castsFifteens 10790 = true := by decide

/-- 2a27: nibbles fold back to 10791; digit sum 21 ≡ 10791 (mod 15). -/
theorem enumeration_hex4_2a27 : reassembles 10791 = true ∧ castsFifteens 10791 = true := by decide

/-- 2a28: nibbles fold back to 10792; digit sum 22 ≡ 10792 (mod 15). -/
theorem enumeration_hex4_2a28 : reassembles 10792 = true ∧ castsFifteens 10792 = true := by decide

/-- 2a29: nibbles fold back to 10793; digit sum 23 ≡ 10793 (mod 15). -/
theorem enumeration_hex4_2a29 : reassembles 10793 = true ∧ castsFifteens 10793 = true := by decide

/-- 2a2a: nibbles fold back to 10794; digit sum 24 ≡ 10794 (mod 15). -/
theorem enumeration_hex4_2a2a : reassembles 10794 = true ∧ castsFifteens 10794 = true := by decide

/-- 2a2b: nibbles fold back to 10795; digit sum 25 ≡ 10795 (mod 15). -/
theorem enumeration_hex4_2a2b : reassembles 10795 = true ∧ castsFifteens 10795 = true := by decide

/-- 2a2c: nibbles fold back to 10796; digit sum 26 ≡ 10796 (mod 15). -/
theorem enumeration_hex4_2a2c : reassembles 10796 = true ∧ castsFifteens 10796 = true := by decide

/-- 2a2d: nibbles fold back to 10797; digit sum 27 ≡ 10797 (mod 15). -/
theorem enumeration_hex4_2a2d : reassembles 10797 = true ∧ castsFifteens 10797 = true := by decide

/-- 2a2e: nibbles fold back to 10798; digit sum 28 ≡ 10798 (mod 15). -/
theorem enumeration_hex4_2a2e : reassembles 10798 = true ∧ castsFifteens 10798 = true := by decide

/-- 2a2f: nibbles fold back to 10799; digit sum 29 ≡ 10799 (mod 15). -/
theorem enumeration_hex4_2a2f : reassembles 10799 = true ∧ castsFifteens 10799 = true := by decide

/-- 2a30: nibbles fold back to 10800; digit sum 15 ≡ 10800 (mod 15). -/
theorem enumeration_hex4_2a30 : reassembles 10800 = true ∧ castsFifteens 10800 = true := by decide

/-- 2a31: nibbles fold back to 10801; digit sum 16 ≡ 10801 (mod 15). -/
theorem enumeration_hex4_2a31 : reassembles 10801 = true ∧ castsFifteens 10801 = true := by decide

/-- 2a32: nibbles fold back to 10802; digit sum 17 ≡ 10802 (mod 15). -/
theorem enumeration_hex4_2a32 : reassembles 10802 = true ∧ castsFifteens 10802 = true := by decide

/-- 2a33: nibbles fold back to 10803; digit sum 18 ≡ 10803 (mod 15). -/
theorem enumeration_hex4_2a33 : reassembles 10803 = true ∧ castsFifteens 10803 = true := by decide

/-- 2a34: nibbles fold back to 10804; digit sum 19 ≡ 10804 (mod 15). -/
theorem enumeration_hex4_2a34 : reassembles 10804 = true ∧ castsFifteens 10804 = true := by decide

/-- 2a35: nibbles fold back to 10805; digit sum 20 ≡ 10805 (mod 15). -/
theorem enumeration_hex4_2a35 : reassembles 10805 = true ∧ castsFifteens 10805 = true := by decide

/-- 2a36: nibbles fold back to 10806; digit sum 21 ≡ 10806 (mod 15). -/
theorem enumeration_hex4_2a36 : reassembles 10806 = true ∧ castsFifteens 10806 = true := by decide

/-- 2a37: nibbles fold back to 10807; digit sum 22 ≡ 10807 (mod 15). -/
theorem enumeration_hex4_2a37 : reassembles 10807 = true ∧ castsFifteens 10807 = true := by decide

/-- 2a38: nibbles fold back to 10808; digit sum 23 ≡ 10808 (mod 15). -/
theorem enumeration_hex4_2a38 : reassembles 10808 = true ∧ castsFifteens 10808 = true := by decide

/-- 2a39: nibbles fold back to 10809; digit sum 24 ≡ 10809 (mod 15). -/
theorem enumeration_hex4_2a39 : reassembles 10809 = true ∧ castsFifteens 10809 = true := by decide

/-- 2a3a: nibbles fold back to 10810; digit sum 25 ≡ 10810 (mod 15). -/
theorem enumeration_hex4_2a3a : reassembles 10810 = true ∧ castsFifteens 10810 = true := by decide

/-- 2a3b: nibbles fold back to 10811; digit sum 26 ≡ 10811 (mod 15). -/
theorem enumeration_hex4_2a3b : reassembles 10811 = true ∧ castsFifteens 10811 = true := by decide

/-- 2a3c: nibbles fold back to 10812; digit sum 27 ≡ 10812 (mod 15). -/
theorem enumeration_hex4_2a3c : reassembles 10812 = true ∧ castsFifteens 10812 = true := by decide

/-- 2a3d: nibbles fold back to 10813; digit sum 28 ≡ 10813 (mod 15). -/
theorem enumeration_hex4_2a3d : reassembles 10813 = true ∧ castsFifteens 10813 = true := by decide

/-- 2a3e: nibbles fold back to 10814; digit sum 29 ≡ 10814 (mod 15). -/
theorem enumeration_hex4_2a3e : reassembles 10814 = true ∧ castsFifteens 10814 = true := by decide

/-- 2a3f: nibbles fold back to 10815; digit sum 30 ≡ 10815 (mod 15). -/
theorem enumeration_hex4_2a3f : reassembles 10815 = true ∧ castsFifteens 10815 = true := by decide

/-- 2a40: nibbles fold back to 10816; digit sum 16 ≡ 10816 (mod 15). -/
theorem enumeration_hex4_2a40 : reassembles 10816 = true ∧ castsFifteens 10816 = true := by decide

/-- 2a41: nibbles fold back to 10817; digit sum 17 ≡ 10817 (mod 15). -/
theorem enumeration_hex4_2a41 : reassembles 10817 = true ∧ castsFifteens 10817 = true := by decide

/-- 2a42: nibbles fold back to 10818; digit sum 18 ≡ 10818 (mod 15). -/
theorem enumeration_hex4_2a42 : reassembles 10818 = true ∧ castsFifteens 10818 = true := by decide

/-- 2a43: nibbles fold back to 10819; digit sum 19 ≡ 10819 (mod 15). -/
theorem enumeration_hex4_2a43 : reassembles 10819 = true ∧ castsFifteens 10819 = true := by decide

/-- 2a44: nibbles fold back to 10820; digit sum 20 ≡ 10820 (mod 15). -/
theorem enumeration_hex4_2a44 : reassembles 10820 = true ∧ castsFifteens 10820 = true := by decide

/-- 2a45: nibbles fold back to 10821; digit sum 21 ≡ 10821 (mod 15). -/
theorem enumeration_hex4_2a45 : reassembles 10821 = true ∧ castsFifteens 10821 = true := by decide

/-- 2a46: nibbles fold back to 10822; digit sum 22 ≡ 10822 (mod 15). -/
theorem enumeration_hex4_2a46 : reassembles 10822 = true ∧ castsFifteens 10822 = true := by decide

/-- 2a47: nibbles fold back to 10823; digit sum 23 ≡ 10823 (mod 15). -/
theorem enumeration_hex4_2a47 : reassembles 10823 = true ∧ castsFifteens 10823 = true := by decide

/-- 2a48: nibbles fold back to 10824; digit sum 24 ≡ 10824 (mod 15). -/
theorem enumeration_hex4_2a48 : reassembles 10824 = true ∧ castsFifteens 10824 = true := by decide

/-- 2a49: nibbles fold back to 10825; digit sum 25 ≡ 10825 (mod 15). -/
theorem enumeration_hex4_2a49 : reassembles 10825 = true ∧ castsFifteens 10825 = true := by decide

/-- 2a4a: nibbles fold back to 10826; digit sum 26 ≡ 10826 (mod 15). -/
theorem enumeration_hex4_2a4a : reassembles 10826 = true ∧ castsFifteens 10826 = true := by decide

/-- 2a4b: nibbles fold back to 10827; digit sum 27 ≡ 10827 (mod 15). -/
theorem enumeration_hex4_2a4b : reassembles 10827 = true ∧ castsFifteens 10827 = true := by decide

/-- 2a4c: nibbles fold back to 10828; digit sum 28 ≡ 10828 (mod 15). -/
theorem enumeration_hex4_2a4c : reassembles 10828 = true ∧ castsFifteens 10828 = true := by decide

/-- 2a4d: nibbles fold back to 10829; digit sum 29 ≡ 10829 (mod 15). -/
theorem enumeration_hex4_2a4d : reassembles 10829 = true ∧ castsFifteens 10829 = true := by decide

/-- 2a4e: nibbles fold back to 10830; digit sum 30 ≡ 10830 (mod 15). -/
theorem enumeration_hex4_2a4e : reassembles 10830 = true ∧ castsFifteens 10830 = true := by decide

/-- 2a4f: nibbles fold back to 10831; digit sum 31 ≡ 10831 (mod 15). -/
theorem enumeration_hex4_2a4f : reassembles 10831 = true ∧ castsFifteens 10831 = true := by decide

/-- 2a50: nibbles fold back to 10832; digit sum 17 ≡ 10832 (mod 15). -/
theorem enumeration_hex4_2a50 : reassembles 10832 = true ∧ castsFifteens 10832 = true := by decide

/-- 2a51: nibbles fold back to 10833; digit sum 18 ≡ 10833 (mod 15). -/
theorem enumeration_hex4_2a51 : reassembles 10833 = true ∧ castsFifteens 10833 = true := by decide

/-- 2a52: nibbles fold back to 10834; digit sum 19 ≡ 10834 (mod 15). -/
theorem enumeration_hex4_2a52 : reassembles 10834 = true ∧ castsFifteens 10834 = true := by decide

/-- 2a53: nibbles fold back to 10835; digit sum 20 ≡ 10835 (mod 15). -/
theorem enumeration_hex4_2a53 : reassembles 10835 = true ∧ castsFifteens 10835 = true := by decide

/-- 2a54: nibbles fold back to 10836; digit sum 21 ≡ 10836 (mod 15). -/
theorem enumeration_hex4_2a54 : reassembles 10836 = true ∧ castsFifteens 10836 = true := by decide

/-- 2a55: nibbles fold back to 10837; digit sum 22 ≡ 10837 (mod 15). -/
theorem enumeration_hex4_2a55 : reassembles 10837 = true ∧ castsFifteens 10837 = true := by decide

/-- 2a56: nibbles fold back to 10838; digit sum 23 ≡ 10838 (mod 15). -/
theorem enumeration_hex4_2a56 : reassembles 10838 = true ∧ castsFifteens 10838 = true := by decide

/-- 2a57: nibbles fold back to 10839; digit sum 24 ≡ 10839 (mod 15). -/
theorem enumeration_hex4_2a57 : reassembles 10839 = true ∧ castsFifteens 10839 = true := by decide

/-- 2a58: nibbles fold back to 10840; digit sum 25 ≡ 10840 (mod 15). -/
theorem enumeration_hex4_2a58 : reassembles 10840 = true ∧ castsFifteens 10840 = true := by decide

/-- 2a59: nibbles fold back to 10841; digit sum 26 ≡ 10841 (mod 15). -/
theorem enumeration_hex4_2a59 : reassembles 10841 = true ∧ castsFifteens 10841 = true := by decide

/-- 2a5a: nibbles fold back to 10842; digit sum 27 ≡ 10842 (mod 15). -/
theorem enumeration_hex4_2a5a : reassembles 10842 = true ∧ castsFifteens 10842 = true := by decide

/-- 2a5b: nibbles fold back to 10843; digit sum 28 ≡ 10843 (mod 15). -/
theorem enumeration_hex4_2a5b : reassembles 10843 = true ∧ castsFifteens 10843 = true := by decide

/-- 2a5c: nibbles fold back to 10844; digit sum 29 ≡ 10844 (mod 15). -/
theorem enumeration_hex4_2a5c : reassembles 10844 = true ∧ castsFifteens 10844 = true := by decide

/-- 2a5d: nibbles fold back to 10845; digit sum 30 ≡ 10845 (mod 15). -/
theorem enumeration_hex4_2a5d : reassembles 10845 = true ∧ castsFifteens 10845 = true := by decide

/-- 2a5e: nibbles fold back to 10846; digit sum 31 ≡ 10846 (mod 15). -/
theorem enumeration_hex4_2a5e : reassembles 10846 = true ∧ castsFifteens 10846 = true := by decide

/-- 2a5f: nibbles fold back to 10847; digit sum 32 ≡ 10847 (mod 15). -/
theorem enumeration_hex4_2a5f : reassembles 10847 = true ∧ castsFifteens 10847 = true := by decide

/-- 2a60: nibbles fold back to 10848; digit sum 18 ≡ 10848 (mod 15). -/
theorem enumeration_hex4_2a60 : reassembles 10848 = true ∧ castsFifteens 10848 = true := by decide

/-- 2a61: nibbles fold back to 10849; digit sum 19 ≡ 10849 (mod 15). -/
theorem enumeration_hex4_2a61 : reassembles 10849 = true ∧ castsFifteens 10849 = true := by decide

/-- 2a62: nibbles fold back to 10850; digit sum 20 ≡ 10850 (mod 15). -/
theorem enumeration_hex4_2a62 : reassembles 10850 = true ∧ castsFifteens 10850 = true := by decide

/-- 2a63: nibbles fold back to 10851; digit sum 21 ≡ 10851 (mod 15). -/
theorem enumeration_hex4_2a63 : reassembles 10851 = true ∧ castsFifteens 10851 = true := by decide

/-- 2a64: nibbles fold back to 10852; digit sum 22 ≡ 10852 (mod 15). -/
theorem enumeration_hex4_2a64 : reassembles 10852 = true ∧ castsFifteens 10852 = true := by decide

/-- 2a65: nibbles fold back to 10853; digit sum 23 ≡ 10853 (mod 15). -/
theorem enumeration_hex4_2a65 : reassembles 10853 = true ∧ castsFifteens 10853 = true := by decide

/-- 2a66: nibbles fold back to 10854; digit sum 24 ≡ 10854 (mod 15). -/
theorem enumeration_hex4_2a66 : reassembles 10854 = true ∧ castsFifteens 10854 = true := by decide

/-- 2a67: nibbles fold back to 10855; digit sum 25 ≡ 10855 (mod 15). -/
theorem enumeration_hex4_2a67 : reassembles 10855 = true ∧ castsFifteens 10855 = true := by decide

/-- 2a68: nibbles fold back to 10856; digit sum 26 ≡ 10856 (mod 15). -/
theorem enumeration_hex4_2a68 : reassembles 10856 = true ∧ castsFifteens 10856 = true := by decide

/-- 2a69: nibbles fold back to 10857; digit sum 27 ≡ 10857 (mod 15). -/
theorem enumeration_hex4_2a69 : reassembles 10857 = true ∧ castsFifteens 10857 = true := by decide

/-- 2a6a: nibbles fold back to 10858; digit sum 28 ≡ 10858 (mod 15). -/
theorem enumeration_hex4_2a6a : reassembles 10858 = true ∧ castsFifteens 10858 = true := by decide

/-- 2a6b: nibbles fold back to 10859; digit sum 29 ≡ 10859 (mod 15). -/
theorem enumeration_hex4_2a6b : reassembles 10859 = true ∧ castsFifteens 10859 = true := by decide

/-- 2a6c: nibbles fold back to 10860; digit sum 30 ≡ 10860 (mod 15). -/
theorem enumeration_hex4_2a6c : reassembles 10860 = true ∧ castsFifteens 10860 = true := by decide

/-- 2a6d: nibbles fold back to 10861; digit sum 31 ≡ 10861 (mod 15). -/
theorem enumeration_hex4_2a6d : reassembles 10861 = true ∧ castsFifteens 10861 = true := by decide

/-- 2a6e: nibbles fold back to 10862; digit sum 32 ≡ 10862 (mod 15). -/
theorem enumeration_hex4_2a6e : reassembles 10862 = true ∧ castsFifteens 10862 = true := by decide

/-- 2a6f: nibbles fold back to 10863; digit sum 33 ≡ 10863 (mod 15). -/
theorem enumeration_hex4_2a6f : reassembles 10863 = true ∧ castsFifteens 10863 = true := by decide

/-- 2a70: nibbles fold back to 10864; digit sum 19 ≡ 10864 (mod 15). -/
theorem enumeration_hex4_2a70 : reassembles 10864 = true ∧ castsFifteens 10864 = true := by decide

/-- 2a71: nibbles fold back to 10865; digit sum 20 ≡ 10865 (mod 15). -/
theorem enumeration_hex4_2a71 : reassembles 10865 = true ∧ castsFifteens 10865 = true := by decide

/-- 2a72: nibbles fold back to 10866; digit sum 21 ≡ 10866 (mod 15). -/
theorem enumeration_hex4_2a72 : reassembles 10866 = true ∧ castsFifteens 10866 = true := by decide

/-- 2a73: nibbles fold back to 10867; digit sum 22 ≡ 10867 (mod 15). -/
theorem enumeration_hex4_2a73 : reassembles 10867 = true ∧ castsFifteens 10867 = true := by decide

/-- 2a74: nibbles fold back to 10868; digit sum 23 ≡ 10868 (mod 15). -/
theorem enumeration_hex4_2a74 : reassembles 10868 = true ∧ castsFifteens 10868 = true := by decide

/-- 2a75: nibbles fold back to 10869; digit sum 24 ≡ 10869 (mod 15). -/
theorem enumeration_hex4_2a75 : reassembles 10869 = true ∧ castsFifteens 10869 = true := by decide

/-- 2a76: nibbles fold back to 10870; digit sum 25 ≡ 10870 (mod 15). -/
theorem enumeration_hex4_2a76 : reassembles 10870 = true ∧ castsFifteens 10870 = true := by decide

/-- 2a77: nibbles fold back to 10871; digit sum 26 ≡ 10871 (mod 15). -/
theorem enumeration_hex4_2a77 : reassembles 10871 = true ∧ castsFifteens 10871 = true := by decide

/-- 2a78: nibbles fold back to 10872; digit sum 27 ≡ 10872 (mod 15). -/
theorem enumeration_hex4_2a78 : reassembles 10872 = true ∧ castsFifteens 10872 = true := by decide

/-- 2a79: nibbles fold back to 10873; digit sum 28 ≡ 10873 (mod 15). -/
theorem enumeration_hex4_2a79 : reassembles 10873 = true ∧ castsFifteens 10873 = true := by decide

/-- 2a7a: nibbles fold back to 10874; digit sum 29 ≡ 10874 (mod 15). -/
theorem enumeration_hex4_2a7a : reassembles 10874 = true ∧ castsFifteens 10874 = true := by decide

/-- 2a7b: nibbles fold back to 10875; digit sum 30 ≡ 10875 (mod 15). -/
theorem enumeration_hex4_2a7b : reassembles 10875 = true ∧ castsFifteens 10875 = true := by decide

/-- 2a7c: nibbles fold back to 10876; digit sum 31 ≡ 10876 (mod 15). -/
theorem enumeration_hex4_2a7c : reassembles 10876 = true ∧ castsFifteens 10876 = true := by decide

/-- 2a7d: nibbles fold back to 10877; digit sum 32 ≡ 10877 (mod 15). -/
theorem enumeration_hex4_2a7d : reassembles 10877 = true ∧ castsFifteens 10877 = true := by decide

/-- 2a7e: nibbles fold back to 10878; digit sum 33 ≡ 10878 (mod 15). -/
theorem enumeration_hex4_2a7e : reassembles 10878 = true ∧ castsFifteens 10878 = true := by decide

/-- 2a7f: nibbles fold back to 10879; digit sum 34 ≡ 10879 (mod 15). -/
theorem enumeration_hex4_2a7f : reassembles 10879 = true ∧ castsFifteens 10879 = true := by decide

/-- 2a80: nibbles fold back to 10880; digit sum 20 ≡ 10880 (mod 15). -/
theorem enumeration_hex4_2a80 : reassembles 10880 = true ∧ castsFifteens 10880 = true := by decide

/-- 2a81: nibbles fold back to 10881; digit sum 21 ≡ 10881 (mod 15). -/
theorem enumeration_hex4_2a81 : reassembles 10881 = true ∧ castsFifteens 10881 = true := by decide

/-- 2a82: nibbles fold back to 10882; digit sum 22 ≡ 10882 (mod 15). -/
theorem enumeration_hex4_2a82 : reassembles 10882 = true ∧ castsFifteens 10882 = true := by decide

/-- 2a83: nibbles fold back to 10883; digit sum 23 ≡ 10883 (mod 15). -/
theorem enumeration_hex4_2a83 : reassembles 10883 = true ∧ castsFifteens 10883 = true := by decide

/-- 2a84: nibbles fold back to 10884; digit sum 24 ≡ 10884 (mod 15). -/
theorem enumeration_hex4_2a84 : reassembles 10884 = true ∧ castsFifteens 10884 = true := by decide

/-- 2a85: nibbles fold back to 10885; digit sum 25 ≡ 10885 (mod 15). -/
theorem enumeration_hex4_2a85 : reassembles 10885 = true ∧ castsFifteens 10885 = true := by decide

/-- 2a86: nibbles fold back to 10886; digit sum 26 ≡ 10886 (mod 15). -/
theorem enumeration_hex4_2a86 : reassembles 10886 = true ∧ castsFifteens 10886 = true := by decide

/-- 2a87: nibbles fold back to 10887; digit sum 27 ≡ 10887 (mod 15). -/
theorem enumeration_hex4_2a87 : reassembles 10887 = true ∧ castsFifteens 10887 = true := by decide

/-- 2a88: nibbles fold back to 10888; digit sum 28 ≡ 10888 (mod 15). -/
theorem enumeration_hex4_2a88 : reassembles 10888 = true ∧ castsFifteens 10888 = true := by decide

/-- 2a89: nibbles fold back to 10889; digit sum 29 ≡ 10889 (mod 15). -/
theorem enumeration_hex4_2a89 : reassembles 10889 = true ∧ castsFifteens 10889 = true := by decide

/-- 2a8a: nibbles fold back to 10890; digit sum 30 ≡ 10890 (mod 15). -/
theorem enumeration_hex4_2a8a : reassembles 10890 = true ∧ castsFifteens 10890 = true := by decide

/-- 2a8b: nibbles fold back to 10891; digit sum 31 ≡ 10891 (mod 15). -/
theorem enumeration_hex4_2a8b : reassembles 10891 = true ∧ castsFifteens 10891 = true := by decide

/-- 2a8c: nibbles fold back to 10892; digit sum 32 ≡ 10892 (mod 15). -/
theorem enumeration_hex4_2a8c : reassembles 10892 = true ∧ castsFifteens 10892 = true := by decide

/-- 2a8d: nibbles fold back to 10893; digit sum 33 ≡ 10893 (mod 15). -/
theorem enumeration_hex4_2a8d : reassembles 10893 = true ∧ castsFifteens 10893 = true := by decide

/-- 2a8e: nibbles fold back to 10894; digit sum 34 ≡ 10894 (mod 15). -/
theorem enumeration_hex4_2a8e : reassembles 10894 = true ∧ castsFifteens 10894 = true := by decide

/-- 2a8f: nibbles fold back to 10895; digit sum 35 ≡ 10895 (mod 15). -/
theorem enumeration_hex4_2a8f : reassembles 10895 = true ∧ castsFifteens 10895 = true := by decide

/-- 2a90: nibbles fold back to 10896; digit sum 21 ≡ 10896 (mod 15). -/
theorem enumeration_hex4_2a90 : reassembles 10896 = true ∧ castsFifteens 10896 = true := by decide

/-- 2a91: nibbles fold back to 10897; digit sum 22 ≡ 10897 (mod 15). -/
theorem enumeration_hex4_2a91 : reassembles 10897 = true ∧ castsFifteens 10897 = true := by decide

/-- 2a92: nibbles fold back to 10898; digit sum 23 ≡ 10898 (mod 15). -/
theorem enumeration_hex4_2a92 : reassembles 10898 = true ∧ castsFifteens 10898 = true := by decide

/-- 2a93: nibbles fold back to 10899; digit sum 24 ≡ 10899 (mod 15). -/
theorem enumeration_hex4_2a93 : reassembles 10899 = true ∧ castsFifteens 10899 = true := by decide

/-- 2a94: nibbles fold back to 10900; digit sum 25 ≡ 10900 (mod 15). -/
theorem enumeration_hex4_2a94 : reassembles 10900 = true ∧ castsFifteens 10900 = true := by decide

/-- 2a95: nibbles fold back to 10901; digit sum 26 ≡ 10901 (mod 15). -/
theorem enumeration_hex4_2a95 : reassembles 10901 = true ∧ castsFifteens 10901 = true := by decide

/-- 2a96: nibbles fold back to 10902; digit sum 27 ≡ 10902 (mod 15). -/
theorem enumeration_hex4_2a96 : reassembles 10902 = true ∧ castsFifteens 10902 = true := by decide

/-- 2a97: nibbles fold back to 10903; digit sum 28 ≡ 10903 (mod 15). -/
theorem enumeration_hex4_2a97 : reassembles 10903 = true ∧ castsFifteens 10903 = true := by decide

/-- 2a98: nibbles fold back to 10904; digit sum 29 ≡ 10904 (mod 15). -/
theorem enumeration_hex4_2a98 : reassembles 10904 = true ∧ castsFifteens 10904 = true := by decide

/-- 2a99: nibbles fold back to 10905; digit sum 30 ≡ 10905 (mod 15). -/
theorem enumeration_hex4_2a99 : reassembles 10905 = true ∧ castsFifteens 10905 = true := by decide

/-- 2a9a: nibbles fold back to 10906; digit sum 31 ≡ 10906 (mod 15). -/
theorem enumeration_hex4_2a9a : reassembles 10906 = true ∧ castsFifteens 10906 = true := by decide

/-- 2a9b: nibbles fold back to 10907; digit sum 32 ≡ 10907 (mod 15). -/
theorem enumeration_hex4_2a9b : reassembles 10907 = true ∧ castsFifteens 10907 = true := by decide

/-- 2a9c: nibbles fold back to 10908; digit sum 33 ≡ 10908 (mod 15). -/
theorem enumeration_hex4_2a9c : reassembles 10908 = true ∧ castsFifteens 10908 = true := by decide

/-- 2a9d: nibbles fold back to 10909; digit sum 34 ≡ 10909 (mod 15). -/
theorem enumeration_hex4_2a9d : reassembles 10909 = true ∧ castsFifteens 10909 = true := by decide

/-- 2a9e: nibbles fold back to 10910; digit sum 35 ≡ 10910 (mod 15). -/
theorem enumeration_hex4_2a9e : reassembles 10910 = true ∧ castsFifteens 10910 = true := by decide

/-- 2a9f: nibbles fold back to 10911; digit sum 36 ≡ 10911 (mod 15). -/
theorem enumeration_hex4_2a9f : reassembles 10911 = true ∧ castsFifteens 10911 = true := by decide

/-- 2aa0: nibbles fold back to 10912; digit sum 22 ≡ 10912 (mod 15). -/
theorem enumeration_hex4_2aa0 : reassembles 10912 = true ∧ castsFifteens 10912 = true := by decide

/-- 2aa1: nibbles fold back to 10913; digit sum 23 ≡ 10913 (mod 15). -/
theorem enumeration_hex4_2aa1 : reassembles 10913 = true ∧ castsFifteens 10913 = true := by decide

/-- 2aa2: nibbles fold back to 10914; digit sum 24 ≡ 10914 (mod 15). -/
theorem enumeration_hex4_2aa2 : reassembles 10914 = true ∧ castsFifteens 10914 = true := by decide

/-- 2aa3: nibbles fold back to 10915; digit sum 25 ≡ 10915 (mod 15). -/
theorem enumeration_hex4_2aa3 : reassembles 10915 = true ∧ castsFifteens 10915 = true := by decide

/-- 2aa4: nibbles fold back to 10916; digit sum 26 ≡ 10916 (mod 15). -/
theorem enumeration_hex4_2aa4 : reassembles 10916 = true ∧ castsFifteens 10916 = true := by decide

/-- 2aa5: nibbles fold back to 10917; digit sum 27 ≡ 10917 (mod 15). -/
theorem enumeration_hex4_2aa5 : reassembles 10917 = true ∧ castsFifteens 10917 = true := by decide

/-- 2aa6: nibbles fold back to 10918; digit sum 28 ≡ 10918 (mod 15). -/
theorem enumeration_hex4_2aa6 : reassembles 10918 = true ∧ castsFifteens 10918 = true := by decide

/-- 2aa7: nibbles fold back to 10919; digit sum 29 ≡ 10919 (mod 15). -/
theorem enumeration_hex4_2aa7 : reassembles 10919 = true ∧ castsFifteens 10919 = true := by decide

/-- 2aa8: nibbles fold back to 10920; digit sum 30 ≡ 10920 (mod 15). -/
theorem enumeration_hex4_2aa8 : reassembles 10920 = true ∧ castsFifteens 10920 = true := by decide

/-- 2aa9: nibbles fold back to 10921; digit sum 31 ≡ 10921 (mod 15). -/
theorem enumeration_hex4_2aa9 : reassembles 10921 = true ∧ castsFifteens 10921 = true := by decide

/-- 2aaa: nibbles fold back to 10922; digit sum 32 ≡ 10922 (mod 15). -/
theorem enumeration_hex4_2aaa : reassembles 10922 = true ∧ castsFifteens 10922 = true := by decide

/-- 2aab: nibbles fold back to 10923; digit sum 33 ≡ 10923 (mod 15). -/
theorem enumeration_hex4_2aab : reassembles 10923 = true ∧ castsFifteens 10923 = true := by decide

/-- 2aac: nibbles fold back to 10924; digit sum 34 ≡ 10924 (mod 15). -/
theorem enumeration_hex4_2aac : reassembles 10924 = true ∧ castsFifteens 10924 = true := by decide

/-- 2aad: nibbles fold back to 10925; digit sum 35 ≡ 10925 (mod 15). -/
theorem enumeration_hex4_2aad : reassembles 10925 = true ∧ castsFifteens 10925 = true := by decide

/-- 2aae: nibbles fold back to 10926; digit sum 36 ≡ 10926 (mod 15). -/
theorem enumeration_hex4_2aae : reassembles 10926 = true ∧ castsFifteens 10926 = true := by decide

/-- 2aaf: nibbles fold back to 10927; digit sum 37 ≡ 10927 (mod 15). -/
theorem enumeration_hex4_2aaf : reassembles 10927 = true ∧ castsFifteens 10927 = true := by decide

/-- 2ab0: nibbles fold back to 10928; digit sum 23 ≡ 10928 (mod 15). -/
theorem enumeration_hex4_2ab0 : reassembles 10928 = true ∧ castsFifteens 10928 = true := by decide

/-- 2ab1: nibbles fold back to 10929; digit sum 24 ≡ 10929 (mod 15). -/
theorem enumeration_hex4_2ab1 : reassembles 10929 = true ∧ castsFifteens 10929 = true := by decide

/-- 2ab2: nibbles fold back to 10930; digit sum 25 ≡ 10930 (mod 15). -/
theorem enumeration_hex4_2ab2 : reassembles 10930 = true ∧ castsFifteens 10930 = true := by decide

/-- 2ab3: nibbles fold back to 10931; digit sum 26 ≡ 10931 (mod 15). -/
theorem enumeration_hex4_2ab3 : reassembles 10931 = true ∧ castsFifteens 10931 = true := by decide

/-- 2ab4: nibbles fold back to 10932; digit sum 27 ≡ 10932 (mod 15). -/
theorem enumeration_hex4_2ab4 : reassembles 10932 = true ∧ castsFifteens 10932 = true := by decide

/-- 2ab5: nibbles fold back to 10933; digit sum 28 ≡ 10933 (mod 15). -/
theorem enumeration_hex4_2ab5 : reassembles 10933 = true ∧ castsFifteens 10933 = true := by decide

/-- 2ab6: nibbles fold back to 10934; digit sum 29 ≡ 10934 (mod 15). -/
theorem enumeration_hex4_2ab6 : reassembles 10934 = true ∧ castsFifteens 10934 = true := by decide

/-- 2ab7: nibbles fold back to 10935; digit sum 30 ≡ 10935 (mod 15). -/
theorem enumeration_hex4_2ab7 : reassembles 10935 = true ∧ castsFifteens 10935 = true := by decide

/-- 2ab8: nibbles fold back to 10936; digit sum 31 ≡ 10936 (mod 15). -/
theorem enumeration_hex4_2ab8 : reassembles 10936 = true ∧ castsFifteens 10936 = true := by decide

/-- 2ab9: nibbles fold back to 10937; digit sum 32 ≡ 10937 (mod 15). -/
theorem enumeration_hex4_2ab9 : reassembles 10937 = true ∧ castsFifteens 10937 = true := by decide

/-- 2aba: nibbles fold back to 10938; digit sum 33 ≡ 10938 (mod 15). -/
theorem enumeration_hex4_2aba : reassembles 10938 = true ∧ castsFifteens 10938 = true := by decide

/-- 2abb: nibbles fold back to 10939; digit sum 34 ≡ 10939 (mod 15). -/
theorem enumeration_hex4_2abb : reassembles 10939 = true ∧ castsFifteens 10939 = true := by decide

/-- 2abc: nibbles fold back to 10940; digit sum 35 ≡ 10940 (mod 15). -/
theorem enumeration_hex4_2abc : reassembles 10940 = true ∧ castsFifteens 10940 = true := by decide

/-- 2abd: nibbles fold back to 10941; digit sum 36 ≡ 10941 (mod 15). -/
theorem enumeration_hex4_2abd : reassembles 10941 = true ∧ castsFifteens 10941 = true := by decide

/-- 2abe: nibbles fold back to 10942; digit sum 37 ≡ 10942 (mod 15). -/
theorem enumeration_hex4_2abe : reassembles 10942 = true ∧ castsFifteens 10942 = true := by decide

/-- 2abf: nibbles fold back to 10943; digit sum 38 ≡ 10943 (mod 15). -/
theorem enumeration_hex4_2abf : reassembles 10943 = true ∧ castsFifteens 10943 = true := by decide

/-- 2ac0: nibbles fold back to 10944; digit sum 24 ≡ 10944 (mod 15). -/
theorem enumeration_hex4_2ac0 : reassembles 10944 = true ∧ castsFifteens 10944 = true := by decide

/-- 2ac1: nibbles fold back to 10945; digit sum 25 ≡ 10945 (mod 15). -/
theorem enumeration_hex4_2ac1 : reassembles 10945 = true ∧ castsFifteens 10945 = true := by decide

/-- 2ac2: nibbles fold back to 10946; digit sum 26 ≡ 10946 (mod 15). -/
theorem enumeration_hex4_2ac2 : reassembles 10946 = true ∧ castsFifteens 10946 = true := by decide

/-- 2ac3: nibbles fold back to 10947; digit sum 27 ≡ 10947 (mod 15). -/
theorem enumeration_hex4_2ac3 : reassembles 10947 = true ∧ castsFifteens 10947 = true := by decide

/-- 2ac4: nibbles fold back to 10948; digit sum 28 ≡ 10948 (mod 15). -/
theorem enumeration_hex4_2ac4 : reassembles 10948 = true ∧ castsFifteens 10948 = true := by decide

/-- 2ac5: nibbles fold back to 10949; digit sum 29 ≡ 10949 (mod 15). -/
theorem enumeration_hex4_2ac5 : reassembles 10949 = true ∧ castsFifteens 10949 = true := by decide

/-- 2ac6: nibbles fold back to 10950; digit sum 30 ≡ 10950 (mod 15). -/
theorem enumeration_hex4_2ac6 : reassembles 10950 = true ∧ castsFifteens 10950 = true := by decide

/-- 2ac7: nibbles fold back to 10951; digit sum 31 ≡ 10951 (mod 15). -/
theorem enumeration_hex4_2ac7 : reassembles 10951 = true ∧ castsFifteens 10951 = true := by decide

/-- 2ac8: nibbles fold back to 10952; digit sum 32 ≡ 10952 (mod 15). -/
theorem enumeration_hex4_2ac8 : reassembles 10952 = true ∧ castsFifteens 10952 = true := by decide

/-- 2ac9: nibbles fold back to 10953; digit sum 33 ≡ 10953 (mod 15). -/
theorem enumeration_hex4_2ac9 : reassembles 10953 = true ∧ castsFifteens 10953 = true := by decide

/-- 2aca: nibbles fold back to 10954; digit sum 34 ≡ 10954 (mod 15). -/
theorem enumeration_hex4_2aca : reassembles 10954 = true ∧ castsFifteens 10954 = true := by decide

/-- 2acb: nibbles fold back to 10955; digit sum 35 ≡ 10955 (mod 15). -/
theorem enumeration_hex4_2acb : reassembles 10955 = true ∧ castsFifteens 10955 = true := by decide

/-- 2acc: nibbles fold back to 10956; digit sum 36 ≡ 10956 (mod 15). -/
theorem enumeration_hex4_2acc : reassembles 10956 = true ∧ castsFifteens 10956 = true := by decide

/-- 2acd: nibbles fold back to 10957; digit sum 37 ≡ 10957 (mod 15). -/
theorem enumeration_hex4_2acd : reassembles 10957 = true ∧ castsFifteens 10957 = true := by decide

/-- 2ace: nibbles fold back to 10958; digit sum 38 ≡ 10958 (mod 15). -/
theorem enumeration_hex4_2ace : reassembles 10958 = true ∧ castsFifteens 10958 = true := by decide

/-- 2acf: nibbles fold back to 10959; digit sum 39 ≡ 10959 (mod 15). -/
theorem enumeration_hex4_2acf : reassembles 10959 = true ∧ castsFifteens 10959 = true := by decide

/-- 2ad0: nibbles fold back to 10960; digit sum 25 ≡ 10960 (mod 15). -/
theorem enumeration_hex4_2ad0 : reassembles 10960 = true ∧ castsFifteens 10960 = true := by decide

/-- 2ad1: nibbles fold back to 10961; digit sum 26 ≡ 10961 (mod 15). -/
theorem enumeration_hex4_2ad1 : reassembles 10961 = true ∧ castsFifteens 10961 = true := by decide

/-- 2ad2: nibbles fold back to 10962; digit sum 27 ≡ 10962 (mod 15). -/
theorem enumeration_hex4_2ad2 : reassembles 10962 = true ∧ castsFifteens 10962 = true := by decide

/-- 2ad3: nibbles fold back to 10963; digit sum 28 ≡ 10963 (mod 15). -/
theorem enumeration_hex4_2ad3 : reassembles 10963 = true ∧ castsFifteens 10963 = true := by decide

/-- 2ad4: nibbles fold back to 10964; digit sum 29 ≡ 10964 (mod 15). -/
theorem enumeration_hex4_2ad4 : reassembles 10964 = true ∧ castsFifteens 10964 = true := by decide

/-- 2ad5: nibbles fold back to 10965; digit sum 30 ≡ 10965 (mod 15). -/
theorem enumeration_hex4_2ad5 : reassembles 10965 = true ∧ castsFifteens 10965 = true := by decide

/-- 2ad6: nibbles fold back to 10966; digit sum 31 ≡ 10966 (mod 15). -/
theorem enumeration_hex4_2ad6 : reassembles 10966 = true ∧ castsFifteens 10966 = true := by decide

/-- 2ad7: nibbles fold back to 10967; digit sum 32 ≡ 10967 (mod 15). -/
theorem enumeration_hex4_2ad7 : reassembles 10967 = true ∧ castsFifteens 10967 = true := by decide

/-- 2ad8: nibbles fold back to 10968; digit sum 33 ≡ 10968 (mod 15). -/
theorem enumeration_hex4_2ad8 : reassembles 10968 = true ∧ castsFifteens 10968 = true := by decide

/-- 2ad9: nibbles fold back to 10969; digit sum 34 ≡ 10969 (mod 15). -/
theorem enumeration_hex4_2ad9 : reassembles 10969 = true ∧ castsFifteens 10969 = true := by decide

/-- 2ada: nibbles fold back to 10970; digit sum 35 ≡ 10970 (mod 15). -/
theorem enumeration_hex4_2ada : reassembles 10970 = true ∧ castsFifteens 10970 = true := by decide

/-- 2adb: nibbles fold back to 10971; digit sum 36 ≡ 10971 (mod 15). -/
theorem enumeration_hex4_2adb : reassembles 10971 = true ∧ castsFifteens 10971 = true := by decide

/-- 2adc: nibbles fold back to 10972; digit sum 37 ≡ 10972 (mod 15). -/
theorem enumeration_hex4_2adc : reassembles 10972 = true ∧ castsFifteens 10972 = true := by decide

/-- 2add: nibbles fold back to 10973; digit sum 38 ≡ 10973 (mod 15). -/
theorem enumeration_hex4_2add : reassembles 10973 = true ∧ castsFifteens 10973 = true := by decide

/-- 2ade: nibbles fold back to 10974; digit sum 39 ≡ 10974 (mod 15). -/
theorem enumeration_hex4_2ade : reassembles 10974 = true ∧ castsFifteens 10974 = true := by decide

/-- 2adf: nibbles fold back to 10975; digit sum 40 ≡ 10975 (mod 15). -/
theorem enumeration_hex4_2adf : reassembles 10975 = true ∧ castsFifteens 10975 = true := by decide

/-- 2ae0: nibbles fold back to 10976; digit sum 26 ≡ 10976 (mod 15). -/
theorem enumeration_hex4_2ae0 : reassembles 10976 = true ∧ castsFifteens 10976 = true := by decide

/-- 2ae1: nibbles fold back to 10977; digit sum 27 ≡ 10977 (mod 15). -/
theorem enumeration_hex4_2ae1 : reassembles 10977 = true ∧ castsFifteens 10977 = true := by decide

/-- 2ae2: nibbles fold back to 10978; digit sum 28 ≡ 10978 (mod 15). -/
theorem enumeration_hex4_2ae2 : reassembles 10978 = true ∧ castsFifteens 10978 = true := by decide

/-- 2ae3: nibbles fold back to 10979; digit sum 29 ≡ 10979 (mod 15). -/
theorem enumeration_hex4_2ae3 : reassembles 10979 = true ∧ castsFifteens 10979 = true := by decide

/-- 2ae4: nibbles fold back to 10980; digit sum 30 ≡ 10980 (mod 15). -/
theorem enumeration_hex4_2ae4 : reassembles 10980 = true ∧ castsFifteens 10980 = true := by decide

/-- 2ae5: nibbles fold back to 10981; digit sum 31 ≡ 10981 (mod 15). -/
theorem enumeration_hex4_2ae5 : reassembles 10981 = true ∧ castsFifteens 10981 = true := by decide

/-- 2ae6: nibbles fold back to 10982; digit sum 32 ≡ 10982 (mod 15). -/
theorem enumeration_hex4_2ae6 : reassembles 10982 = true ∧ castsFifteens 10982 = true := by decide

/-- 2ae7: nibbles fold back to 10983; digit sum 33 ≡ 10983 (mod 15). -/
theorem enumeration_hex4_2ae7 : reassembles 10983 = true ∧ castsFifteens 10983 = true := by decide

/-- 2ae8: nibbles fold back to 10984; digit sum 34 ≡ 10984 (mod 15). -/
theorem enumeration_hex4_2ae8 : reassembles 10984 = true ∧ castsFifteens 10984 = true := by decide

/-- 2ae9: nibbles fold back to 10985; digit sum 35 ≡ 10985 (mod 15). -/
theorem enumeration_hex4_2ae9 : reassembles 10985 = true ∧ castsFifteens 10985 = true := by decide

/-- 2aea: nibbles fold back to 10986; digit sum 36 ≡ 10986 (mod 15). -/
theorem enumeration_hex4_2aea : reassembles 10986 = true ∧ castsFifteens 10986 = true := by decide

/-- 2aeb: nibbles fold back to 10987; digit sum 37 ≡ 10987 (mod 15). -/
theorem enumeration_hex4_2aeb : reassembles 10987 = true ∧ castsFifteens 10987 = true := by decide

/-- 2aec: nibbles fold back to 10988; digit sum 38 ≡ 10988 (mod 15). -/
theorem enumeration_hex4_2aec : reassembles 10988 = true ∧ castsFifteens 10988 = true := by decide

/-- 2aed: nibbles fold back to 10989; digit sum 39 ≡ 10989 (mod 15). -/
theorem enumeration_hex4_2aed : reassembles 10989 = true ∧ castsFifteens 10989 = true := by decide

/-- 2aee: nibbles fold back to 10990; digit sum 40 ≡ 10990 (mod 15). -/
theorem enumeration_hex4_2aee : reassembles 10990 = true ∧ castsFifteens 10990 = true := by decide

/-- 2aef: nibbles fold back to 10991; digit sum 41 ≡ 10991 (mod 15). -/
theorem enumeration_hex4_2aef : reassembles 10991 = true ∧ castsFifteens 10991 = true := by decide

/-- 2af0: nibbles fold back to 10992; digit sum 27 ≡ 10992 (mod 15). -/
theorem enumeration_hex4_2af0 : reassembles 10992 = true ∧ castsFifteens 10992 = true := by decide

/-- 2af1: nibbles fold back to 10993; digit sum 28 ≡ 10993 (mod 15). -/
theorem enumeration_hex4_2af1 : reassembles 10993 = true ∧ castsFifteens 10993 = true := by decide

/-- 2af2: nibbles fold back to 10994; digit sum 29 ≡ 10994 (mod 15). -/
theorem enumeration_hex4_2af2 : reassembles 10994 = true ∧ castsFifteens 10994 = true := by decide

/-- 2af3: nibbles fold back to 10995; digit sum 30 ≡ 10995 (mod 15). -/
theorem enumeration_hex4_2af3 : reassembles 10995 = true ∧ castsFifteens 10995 = true := by decide

/-- 2af4: nibbles fold back to 10996; digit sum 31 ≡ 10996 (mod 15). -/
theorem enumeration_hex4_2af4 : reassembles 10996 = true ∧ castsFifteens 10996 = true := by decide

/-- 2af5: nibbles fold back to 10997; digit sum 32 ≡ 10997 (mod 15). -/
theorem enumeration_hex4_2af5 : reassembles 10997 = true ∧ castsFifteens 10997 = true := by decide

/-- 2af6: nibbles fold back to 10998; digit sum 33 ≡ 10998 (mod 15). -/
theorem enumeration_hex4_2af6 : reassembles 10998 = true ∧ castsFifteens 10998 = true := by decide

/-- 2af7: nibbles fold back to 10999; digit sum 34 ≡ 10999 (mod 15). -/
theorem enumeration_hex4_2af7 : reassembles 10999 = true ∧ castsFifteens 10999 = true := by decide

/-- 2af8: nibbles fold back to 11000; digit sum 35 ≡ 11000 (mod 15). -/
theorem enumeration_hex4_2af8 : reassembles 11000 = true ∧ castsFifteens 11000 = true := by decide

/-- 2af9: nibbles fold back to 11001; digit sum 36 ≡ 11001 (mod 15). -/
theorem enumeration_hex4_2af9 : reassembles 11001 = true ∧ castsFifteens 11001 = true := by decide

/-- 2afa: nibbles fold back to 11002; digit sum 37 ≡ 11002 (mod 15). -/
theorem enumeration_hex4_2afa : reassembles 11002 = true ∧ castsFifteens 11002 = true := by decide

/-- 2afb: nibbles fold back to 11003; digit sum 38 ≡ 11003 (mod 15). -/
theorem enumeration_hex4_2afb : reassembles 11003 = true ∧ castsFifteens 11003 = true := by decide

/-- 2afc: nibbles fold back to 11004; digit sum 39 ≡ 11004 (mod 15). -/
theorem enumeration_hex4_2afc : reassembles 11004 = true ∧ castsFifteens 11004 = true := by decide

/-- 2afd: nibbles fold back to 11005; digit sum 40 ≡ 11005 (mod 15). -/
theorem enumeration_hex4_2afd : reassembles 11005 = true ∧ castsFifteens 11005 = true := by decide

/-- 2afe: nibbles fold back to 11006; digit sum 41 ≡ 11006 (mod 15). -/
theorem enumeration_hex4_2afe : reassembles 11006 = true ∧ castsFifteens 11006 = true := by decide

/-- 2aff: nibbles fold back to 11007; digit sum 42 ≡ 11007 (mod 15). -/
theorem enumeration_hex4_2aff : reassembles 11007 = true ∧ castsFifteens 11007 = true := by decide

/-- 2b00: nibbles fold back to 11008; digit sum 13 ≡ 11008 (mod 15). -/
theorem enumeration_hex4_2b00 : reassembles 11008 = true ∧ castsFifteens 11008 = true := by decide

/-- 2b01: nibbles fold back to 11009; digit sum 14 ≡ 11009 (mod 15). -/
theorem enumeration_hex4_2b01 : reassembles 11009 = true ∧ castsFifteens 11009 = true := by decide

/-- 2b02: nibbles fold back to 11010; digit sum 15 ≡ 11010 (mod 15). -/
theorem enumeration_hex4_2b02 : reassembles 11010 = true ∧ castsFifteens 11010 = true := by decide

/-- 2b03: nibbles fold back to 11011; digit sum 16 ≡ 11011 (mod 15). -/
theorem enumeration_hex4_2b03 : reassembles 11011 = true ∧ castsFifteens 11011 = true := by decide

/-- 2b04: nibbles fold back to 11012; digit sum 17 ≡ 11012 (mod 15). -/
theorem enumeration_hex4_2b04 : reassembles 11012 = true ∧ castsFifteens 11012 = true := by decide

/-- 2b05: nibbles fold back to 11013; digit sum 18 ≡ 11013 (mod 15). -/
theorem enumeration_hex4_2b05 : reassembles 11013 = true ∧ castsFifteens 11013 = true := by decide

/-- 2b06: nibbles fold back to 11014; digit sum 19 ≡ 11014 (mod 15). -/
theorem enumeration_hex4_2b06 : reassembles 11014 = true ∧ castsFifteens 11014 = true := by decide

/-- 2b07: nibbles fold back to 11015; digit sum 20 ≡ 11015 (mod 15). -/
theorem enumeration_hex4_2b07 : reassembles 11015 = true ∧ castsFifteens 11015 = true := by decide

/-- 2b08: nibbles fold back to 11016; digit sum 21 ≡ 11016 (mod 15). -/
theorem enumeration_hex4_2b08 : reassembles 11016 = true ∧ castsFifteens 11016 = true := by decide

/-- 2b09: nibbles fold back to 11017; digit sum 22 ≡ 11017 (mod 15). -/
theorem enumeration_hex4_2b09 : reassembles 11017 = true ∧ castsFifteens 11017 = true := by decide

/-- 2b0a: nibbles fold back to 11018; digit sum 23 ≡ 11018 (mod 15). -/
theorem enumeration_hex4_2b0a : reassembles 11018 = true ∧ castsFifteens 11018 = true := by decide

/-- 2b0b: nibbles fold back to 11019; digit sum 24 ≡ 11019 (mod 15). -/
theorem enumeration_hex4_2b0b : reassembles 11019 = true ∧ castsFifteens 11019 = true := by decide

/-- 2b0c: nibbles fold back to 11020; digit sum 25 ≡ 11020 (mod 15). -/
theorem enumeration_hex4_2b0c : reassembles 11020 = true ∧ castsFifteens 11020 = true := by decide

/-- 2b0d: nibbles fold back to 11021; digit sum 26 ≡ 11021 (mod 15). -/
theorem enumeration_hex4_2b0d : reassembles 11021 = true ∧ castsFifteens 11021 = true := by decide

/-- 2b0e: nibbles fold back to 11022; digit sum 27 ≡ 11022 (mod 15). -/
theorem enumeration_hex4_2b0e : reassembles 11022 = true ∧ castsFifteens 11022 = true := by decide

/-- 2b0f: nibbles fold back to 11023; digit sum 28 ≡ 11023 (mod 15). -/
theorem enumeration_hex4_2b0f : reassembles 11023 = true ∧ castsFifteens 11023 = true := by decide

/-- 2b10: nibbles fold back to 11024; digit sum 14 ≡ 11024 (mod 15). -/
theorem enumeration_hex4_2b10 : reassembles 11024 = true ∧ castsFifteens 11024 = true := by decide

/-- 2b11: nibbles fold back to 11025; digit sum 15 ≡ 11025 (mod 15). -/
theorem enumeration_hex4_2b11 : reassembles 11025 = true ∧ castsFifteens 11025 = true := by decide

/-- 2b12: nibbles fold back to 11026; digit sum 16 ≡ 11026 (mod 15). -/
theorem enumeration_hex4_2b12 : reassembles 11026 = true ∧ castsFifteens 11026 = true := by decide

/-- 2b13: nibbles fold back to 11027; digit sum 17 ≡ 11027 (mod 15). -/
theorem enumeration_hex4_2b13 : reassembles 11027 = true ∧ castsFifteens 11027 = true := by decide

/-- 2b14: nibbles fold back to 11028; digit sum 18 ≡ 11028 (mod 15). -/
theorem enumeration_hex4_2b14 : reassembles 11028 = true ∧ castsFifteens 11028 = true := by decide

/-- 2b15: nibbles fold back to 11029; digit sum 19 ≡ 11029 (mod 15). -/
theorem enumeration_hex4_2b15 : reassembles 11029 = true ∧ castsFifteens 11029 = true := by decide

/-- 2b16: nibbles fold back to 11030; digit sum 20 ≡ 11030 (mod 15). -/
theorem enumeration_hex4_2b16 : reassembles 11030 = true ∧ castsFifteens 11030 = true := by decide

/-- 2b17: nibbles fold back to 11031; digit sum 21 ≡ 11031 (mod 15). -/
theorem enumeration_hex4_2b17 : reassembles 11031 = true ∧ castsFifteens 11031 = true := by decide

/-- 2b18: nibbles fold back to 11032; digit sum 22 ≡ 11032 (mod 15). -/
theorem enumeration_hex4_2b18 : reassembles 11032 = true ∧ castsFifteens 11032 = true := by decide

/-- 2b19: nibbles fold back to 11033; digit sum 23 ≡ 11033 (mod 15). -/
theorem enumeration_hex4_2b19 : reassembles 11033 = true ∧ castsFifteens 11033 = true := by decide

/-- 2b1a: nibbles fold back to 11034; digit sum 24 ≡ 11034 (mod 15). -/
theorem enumeration_hex4_2b1a : reassembles 11034 = true ∧ castsFifteens 11034 = true := by decide

/-- 2b1b: nibbles fold back to 11035; digit sum 25 ≡ 11035 (mod 15). -/
theorem enumeration_hex4_2b1b : reassembles 11035 = true ∧ castsFifteens 11035 = true := by decide

/-- 2b1c: nibbles fold back to 11036; digit sum 26 ≡ 11036 (mod 15). -/
theorem enumeration_hex4_2b1c : reassembles 11036 = true ∧ castsFifteens 11036 = true := by decide

/-- 2b1d: nibbles fold back to 11037; digit sum 27 ≡ 11037 (mod 15). -/
theorem enumeration_hex4_2b1d : reassembles 11037 = true ∧ castsFifteens 11037 = true := by decide

/-- 2b1e: nibbles fold back to 11038; digit sum 28 ≡ 11038 (mod 15). -/
theorem enumeration_hex4_2b1e : reassembles 11038 = true ∧ castsFifteens 11038 = true := by decide

/-- 2b1f: nibbles fold back to 11039; digit sum 29 ≡ 11039 (mod 15). -/
theorem enumeration_hex4_2b1f : reassembles 11039 = true ∧ castsFifteens 11039 = true := by decide

/-- 2b20: nibbles fold back to 11040; digit sum 15 ≡ 11040 (mod 15). -/
theorem enumeration_hex4_2b20 : reassembles 11040 = true ∧ castsFifteens 11040 = true := by decide

/-- 2b21: nibbles fold back to 11041; digit sum 16 ≡ 11041 (mod 15). -/
theorem enumeration_hex4_2b21 : reassembles 11041 = true ∧ castsFifteens 11041 = true := by decide

/-- 2b22: nibbles fold back to 11042; digit sum 17 ≡ 11042 (mod 15). -/
theorem enumeration_hex4_2b22 : reassembles 11042 = true ∧ castsFifteens 11042 = true := by decide

/-- 2b23: nibbles fold back to 11043; digit sum 18 ≡ 11043 (mod 15). -/
theorem enumeration_hex4_2b23 : reassembles 11043 = true ∧ castsFifteens 11043 = true := by decide

/-- 2b24: nibbles fold back to 11044; digit sum 19 ≡ 11044 (mod 15). -/
theorem enumeration_hex4_2b24 : reassembles 11044 = true ∧ castsFifteens 11044 = true := by decide

/-- 2b25: nibbles fold back to 11045; digit sum 20 ≡ 11045 (mod 15). -/
theorem enumeration_hex4_2b25 : reassembles 11045 = true ∧ castsFifteens 11045 = true := by decide

/-- 2b26: nibbles fold back to 11046; digit sum 21 ≡ 11046 (mod 15). -/
theorem enumeration_hex4_2b26 : reassembles 11046 = true ∧ castsFifteens 11046 = true := by decide

/-- 2b27: nibbles fold back to 11047; digit sum 22 ≡ 11047 (mod 15). -/
theorem enumeration_hex4_2b27 : reassembles 11047 = true ∧ castsFifteens 11047 = true := by decide

/-- 2b28: nibbles fold back to 11048; digit sum 23 ≡ 11048 (mod 15). -/
theorem enumeration_hex4_2b28 : reassembles 11048 = true ∧ castsFifteens 11048 = true := by decide

/-- 2b29: nibbles fold back to 11049; digit sum 24 ≡ 11049 (mod 15). -/
theorem enumeration_hex4_2b29 : reassembles 11049 = true ∧ castsFifteens 11049 = true := by decide

/-- 2b2a: nibbles fold back to 11050; digit sum 25 ≡ 11050 (mod 15). -/
theorem enumeration_hex4_2b2a : reassembles 11050 = true ∧ castsFifteens 11050 = true := by decide

/-- 2b2b: nibbles fold back to 11051; digit sum 26 ≡ 11051 (mod 15). -/
theorem enumeration_hex4_2b2b : reassembles 11051 = true ∧ castsFifteens 11051 = true := by decide

/-- 2b2c: nibbles fold back to 11052; digit sum 27 ≡ 11052 (mod 15). -/
theorem enumeration_hex4_2b2c : reassembles 11052 = true ∧ castsFifteens 11052 = true := by decide

/-- 2b2d: nibbles fold back to 11053; digit sum 28 ≡ 11053 (mod 15). -/
theorem enumeration_hex4_2b2d : reassembles 11053 = true ∧ castsFifteens 11053 = true := by decide

/-- 2b2e: nibbles fold back to 11054; digit sum 29 ≡ 11054 (mod 15). -/
theorem enumeration_hex4_2b2e : reassembles 11054 = true ∧ castsFifteens 11054 = true := by decide

/-- 2b2f: nibbles fold back to 11055; digit sum 30 ≡ 11055 (mod 15). -/
theorem enumeration_hex4_2b2f : reassembles 11055 = true ∧ castsFifteens 11055 = true := by decide

/-- 2b30: nibbles fold back to 11056; digit sum 16 ≡ 11056 (mod 15). -/
theorem enumeration_hex4_2b30 : reassembles 11056 = true ∧ castsFifteens 11056 = true := by decide

/-- 2b31: nibbles fold back to 11057; digit sum 17 ≡ 11057 (mod 15). -/
theorem enumeration_hex4_2b31 : reassembles 11057 = true ∧ castsFifteens 11057 = true := by decide

/-- 2b32: nibbles fold back to 11058; digit sum 18 ≡ 11058 (mod 15). -/
theorem enumeration_hex4_2b32 : reassembles 11058 = true ∧ castsFifteens 11058 = true := by decide

/-- 2b33: nibbles fold back to 11059; digit sum 19 ≡ 11059 (mod 15). -/
theorem enumeration_hex4_2b33 : reassembles 11059 = true ∧ castsFifteens 11059 = true := by decide

/-- 2b34: nibbles fold back to 11060; digit sum 20 ≡ 11060 (mod 15). -/
theorem enumeration_hex4_2b34 : reassembles 11060 = true ∧ castsFifteens 11060 = true := by decide

/-- 2b35: nibbles fold back to 11061; digit sum 21 ≡ 11061 (mod 15). -/
theorem enumeration_hex4_2b35 : reassembles 11061 = true ∧ castsFifteens 11061 = true := by decide

/-- 2b36: nibbles fold back to 11062; digit sum 22 ≡ 11062 (mod 15). -/
theorem enumeration_hex4_2b36 : reassembles 11062 = true ∧ castsFifteens 11062 = true := by decide

/-- 2b37: nibbles fold back to 11063; digit sum 23 ≡ 11063 (mod 15). -/
theorem enumeration_hex4_2b37 : reassembles 11063 = true ∧ castsFifteens 11063 = true := by decide

/-- 2b38: nibbles fold back to 11064; digit sum 24 ≡ 11064 (mod 15). -/
theorem enumeration_hex4_2b38 : reassembles 11064 = true ∧ castsFifteens 11064 = true := by decide

/-- 2b39: nibbles fold back to 11065; digit sum 25 ≡ 11065 (mod 15). -/
theorem enumeration_hex4_2b39 : reassembles 11065 = true ∧ castsFifteens 11065 = true := by decide

/-- 2b3a: nibbles fold back to 11066; digit sum 26 ≡ 11066 (mod 15). -/
theorem enumeration_hex4_2b3a : reassembles 11066 = true ∧ castsFifteens 11066 = true := by decide

/-- 2b3b: nibbles fold back to 11067; digit sum 27 ≡ 11067 (mod 15). -/
theorem enumeration_hex4_2b3b : reassembles 11067 = true ∧ castsFifteens 11067 = true := by decide

/-- 2b3c: nibbles fold back to 11068; digit sum 28 ≡ 11068 (mod 15). -/
theorem enumeration_hex4_2b3c : reassembles 11068 = true ∧ castsFifteens 11068 = true := by decide

/-- 2b3d: nibbles fold back to 11069; digit sum 29 ≡ 11069 (mod 15). -/
theorem enumeration_hex4_2b3d : reassembles 11069 = true ∧ castsFifteens 11069 = true := by decide

/-- 2b3e: nibbles fold back to 11070; digit sum 30 ≡ 11070 (mod 15). -/
theorem enumeration_hex4_2b3e : reassembles 11070 = true ∧ castsFifteens 11070 = true := by decide

/-- 2b3f: nibbles fold back to 11071; digit sum 31 ≡ 11071 (mod 15). -/
theorem enumeration_hex4_2b3f : reassembles 11071 = true ∧ castsFifteens 11071 = true := by decide

/-- 2b40: nibbles fold back to 11072; digit sum 17 ≡ 11072 (mod 15). -/
theorem enumeration_hex4_2b40 : reassembles 11072 = true ∧ castsFifteens 11072 = true := by decide

/-- 2b41: nibbles fold back to 11073; digit sum 18 ≡ 11073 (mod 15). -/
theorem enumeration_hex4_2b41 : reassembles 11073 = true ∧ castsFifteens 11073 = true := by decide

/-- 2b42: nibbles fold back to 11074; digit sum 19 ≡ 11074 (mod 15). -/
theorem enumeration_hex4_2b42 : reassembles 11074 = true ∧ castsFifteens 11074 = true := by decide

/-- 2b43: nibbles fold back to 11075; digit sum 20 ≡ 11075 (mod 15). -/
theorem enumeration_hex4_2b43 : reassembles 11075 = true ∧ castsFifteens 11075 = true := by decide

/-- 2b44: nibbles fold back to 11076; digit sum 21 ≡ 11076 (mod 15). -/
theorem enumeration_hex4_2b44 : reassembles 11076 = true ∧ castsFifteens 11076 = true := by decide

/-- 2b45: nibbles fold back to 11077; digit sum 22 ≡ 11077 (mod 15). -/
theorem enumeration_hex4_2b45 : reassembles 11077 = true ∧ castsFifteens 11077 = true := by decide

/-- 2b46: nibbles fold back to 11078; digit sum 23 ≡ 11078 (mod 15). -/
theorem enumeration_hex4_2b46 : reassembles 11078 = true ∧ castsFifteens 11078 = true := by decide

/-- 2b47: nibbles fold back to 11079; digit sum 24 ≡ 11079 (mod 15). -/
theorem enumeration_hex4_2b47 : reassembles 11079 = true ∧ castsFifteens 11079 = true := by decide

/-- 2b48: nibbles fold back to 11080; digit sum 25 ≡ 11080 (mod 15). -/
theorem enumeration_hex4_2b48 : reassembles 11080 = true ∧ castsFifteens 11080 = true := by decide

/-- 2b49: nibbles fold back to 11081; digit sum 26 ≡ 11081 (mod 15). -/
theorem enumeration_hex4_2b49 : reassembles 11081 = true ∧ castsFifteens 11081 = true := by decide

/-- 2b4a: nibbles fold back to 11082; digit sum 27 ≡ 11082 (mod 15). -/
theorem enumeration_hex4_2b4a : reassembles 11082 = true ∧ castsFifteens 11082 = true := by decide

/-- 2b4b: nibbles fold back to 11083; digit sum 28 ≡ 11083 (mod 15). -/
theorem enumeration_hex4_2b4b : reassembles 11083 = true ∧ castsFifteens 11083 = true := by decide

/-- 2b4c: nibbles fold back to 11084; digit sum 29 ≡ 11084 (mod 15). -/
theorem enumeration_hex4_2b4c : reassembles 11084 = true ∧ castsFifteens 11084 = true := by decide

/-- 2b4d: nibbles fold back to 11085; digit sum 30 ≡ 11085 (mod 15). -/
theorem enumeration_hex4_2b4d : reassembles 11085 = true ∧ castsFifteens 11085 = true := by decide

/-- 2b4e: nibbles fold back to 11086; digit sum 31 ≡ 11086 (mod 15). -/
theorem enumeration_hex4_2b4e : reassembles 11086 = true ∧ castsFifteens 11086 = true := by decide

/-- 2b4f: nibbles fold back to 11087; digit sum 32 ≡ 11087 (mod 15). -/
theorem enumeration_hex4_2b4f : reassembles 11087 = true ∧ castsFifteens 11087 = true := by decide

/-- 2b50: nibbles fold back to 11088; digit sum 18 ≡ 11088 (mod 15). -/
theorem enumeration_hex4_2b50 : reassembles 11088 = true ∧ castsFifteens 11088 = true := by decide

/-- 2b51: nibbles fold back to 11089; digit sum 19 ≡ 11089 (mod 15). -/
theorem enumeration_hex4_2b51 : reassembles 11089 = true ∧ castsFifteens 11089 = true := by decide

/-- 2b52: nibbles fold back to 11090; digit sum 20 ≡ 11090 (mod 15). -/
theorem enumeration_hex4_2b52 : reassembles 11090 = true ∧ castsFifteens 11090 = true := by decide

/-- 2b53: nibbles fold back to 11091; digit sum 21 ≡ 11091 (mod 15). -/
theorem enumeration_hex4_2b53 : reassembles 11091 = true ∧ castsFifteens 11091 = true := by decide

/-- 2b54: nibbles fold back to 11092; digit sum 22 ≡ 11092 (mod 15). -/
theorem enumeration_hex4_2b54 : reassembles 11092 = true ∧ castsFifteens 11092 = true := by decide

/-- 2b55: nibbles fold back to 11093; digit sum 23 ≡ 11093 (mod 15). -/
theorem enumeration_hex4_2b55 : reassembles 11093 = true ∧ castsFifteens 11093 = true := by decide

/-- 2b56: nibbles fold back to 11094; digit sum 24 ≡ 11094 (mod 15). -/
theorem enumeration_hex4_2b56 : reassembles 11094 = true ∧ castsFifteens 11094 = true := by decide

/-- 2b57: nibbles fold back to 11095; digit sum 25 ≡ 11095 (mod 15). -/
theorem enumeration_hex4_2b57 : reassembles 11095 = true ∧ castsFifteens 11095 = true := by decide

/-- 2b58: nibbles fold back to 11096; digit sum 26 ≡ 11096 (mod 15). -/
theorem enumeration_hex4_2b58 : reassembles 11096 = true ∧ castsFifteens 11096 = true := by decide

/-- 2b59: nibbles fold back to 11097; digit sum 27 ≡ 11097 (mod 15). -/
theorem enumeration_hex4_2b59 : reassembles 11097 = true ∧ castsFifteens 11097 = true := by decide

/-- 2b5a: nibbles fold back to 11098; digit sum 28 ≡ 11098 (mod 15). -/
theorem enumeration_hex4_2b5a : reassembles 11098 = true ∧ castsFifteens 11098 = true := by decide

/-- 2b5b: nibbles fold back to 11099; digit sum 29 ≡ 11099 (mod 15). -/
theorem enumeration_hex4_2b5b : reassembles 11099 = true ∧ castsFifteens 11099 = true := by decide

/-- 2b5c: nibbles fold back to 11100; digit sum 30 ≡ 11100 (mod 15). -/
theorem enumeration_hex4_2b5c : reassembles 11100 = true ∧ castsFifteens 11100 = true := by decide

/-- 2b5d: nibbles fold back to 11101; digit sum 31 ≡ 11101 (mod 15). -/
theorem enumeration_hex4_2b5d : reassembles 11101 = true ∧ castsFifteens 11101 = true := by decide

/-- 2b5e: nibbles fold back to 11102; digit sum 32 ≡ 11102 (mod 15). -/
theorem enumeration_hex4_2b5e : reassembles 11102 = true ∧ castsFifteens 11102 = true := by decide

/-- 2b5f: nibbles fold back to 11103; digit sum 33 ≡ 11103 (mod 15). -/
theorem enumeration_hex4_2b5f : reassembles 11103 = true ∧ castsFifteens 11103 = true := by decide

/-- 2b60: nibbles fold back to 11104; digit sum 19 ≡ 11104 (mod 15). -/
theorem enumeration_hex4_2b60 : reassembles 11104 = true ∧ castsFifteens 11104 = true := by decide

/-- 2b61: nibbles fold back to 11105; digit sum 20 ≡ 11105 (mod 15). -/
theorem enumeration_hex4_2b61 : reassembles 11105 = true ∧ castsFifteens 11105 = true := by decide

/-- 2b62: nibbles fold back to 11106; digit sum 21 ≡ 11106 (mod 15). -/
theorem enumeration_hex4_2b62 : reassembles 11106 = true ∧ castsFifteens 11106 = true := by decide

/-- 2b63: nibbles fold back to 11107; digit sum 22 ≡ 11107 (mod 15). -/
theorem enumeration_hex4_2b63 : reassembles 11107 = true ∧ castsFifteens 11107 = true := by decide

/-- 2b64: nibbles fold back to 11108; digit sum 23 ≡ 11108 (mod 15). -/
theorem enumeration_hex4_2b64 : reassembles 11108 = true ∧ castsFifteens 11108 = true := by decide

/-- 2b65: nibbles fold back to 11109; digit sum 24 ≡ 11109 (mod 15). -/
theorem enumeration_hex4_2b65 : reassembles 11109 = true ∧ castsFifteens 11109 = true := by decide

/-- 2b66: nibbles fold back to 11110; digit sum 25 ≡ 11110 (mod 15). -/
theorem enumeration_hex4_2b66 : reassembles 11110 = true ∧ castsFifteens 11110 = true := by decide

/-- 2b67: nibbles fold back to 11111; digit sum 26 ≡ 11111 (mod 15). -/
theorem enumeration_hex4_2b67 : reassembles 11111 = true ∧ castsFifteens 11111 = true := by decide

/-- 2b68: nibbles fold back to 11112; digit sum 27 ≡ 11112 (mod 15). -/
theorem enumeration_hex4_2b68 : reassembles 11112 = true ∧ castsFifteens 11112 = true := by decide

/-- 2b69: nibbles fold back to 11113; digit sum 28 ≡ 11113 (mod 15). -/
theorem enumeration_hex4_2b69 : reassembles 11113 = true ∧ castsFifteens 11113 = true := by decide

/-- 2b6a: nibbles fold back to 11114; digit sum 29 ≡ 11114 (mod 15). -/
theorem enumeration_hex4_2b6a : reassembles 11114 = true ∧ castsFifteens 11114 = true := by decide

/-- 2b6b: nibbles fold back to 11115; digit sum 30 ≡ 11115 (mod 15). -/
theorem enumeration_hex4_2b6b : reassembles 11115 = true ∧ castsFifteens 11115 = true := by decide

/-- 2b6c: nibbles fold back to 11116; digit sum 31 ≡ 11116 (mod 15). -/
theorem enumeration_hex4_2b6c : reassembles 11116 = true ∧ castsFifteens 11116 = true := by decide

/-- 2b6d: nibbles fold back to 11117; digit sum 32 ≡ 11117 (mod 15). -/
theorem enumeration_hex4_2b6d : reassembles 11117 = true ∧ castsFifteens 11117 = true := by decide

/-- 2b6e: nibbles fold back to 11118; digit sum 33 ≡ 11118 (mod 15). -/
theorem enumeration_hex4_2b6e : reassembles 11118 = true ∧ castsFifteens 11118 = true := by decide

/-- 2b6f: nibbles fold back to 11119; digit sum 34 ≡ 11119 (mod 15). -/
theorem enumeration_hex4_2b6f : reassembles 11119 = true ∧ castsFifteens 11119 = true := by decide

/-- 2b70: nibbles fold back to 11120; digit sum 20 ≡ 11120 (mod 15). -/
theorem enumeration_hex4_2b70 : reassembles 11120 = true ∧ castsFifteens 11120 = true := by decide

/-- 2b71: nibbles fold back to 11121; digit sum 21 ≡ 11121 (mod 15). -/
theorem enumeration_hex4_2b71 : reassembles 11121 = true ∧ castsFifteens 11121 = true := by decide

/-- 2b72: nibbles fold back to 11122; digit sum 22 ≡ 11122 (mod 15). -/
theorem enumeration_hex4_2b72 : reassembles 11122 = true ∧ castsFifteens 11122 = true := by decide

/-- 2b73: nibbles fold back to 11123; digit sum 23 ≡ 11123 (mod 15). -/
theorem enumeration_hex4_2b73 : reassembles 11123 = true ∧ castsFifteens 11123 = true := by decide

/-- 2b74: nibbles fold back to 11124; digit sum 24 ≡ 11124 (mod 15). -/
theorem enumeration_hex4_2b74 : reassembles 11124 = true ∧ castsFifteens 11124 = true := by decide

/-- 2b75: nibbles fold back to 11125; digit sum 25 ≡ 11125 (mod 15). -/
theorem enumeration_hex4_2b75 : reassembles 11125 = true ∧ castsFifteens 11125 = true := by decide

/-- 2b76: nibbles fold back to 11126; digit sum 26 ≡ 11126 (mod 15). -/
theorem enumeration_hex4_2b76 : reassembles 11126 = true ∧ castsFifteens 11126 = true := by decide

/-- 2b77: nibbles fold back to 11127; digit sum 27 ≡ 11127 (mod 15). -/
theorem enumeration_hex4_2b77 : reassembles 11127 = true ∧ castsFifteens 11127 = true := by decide

/-- 2b78: nibbles fold back to 11128; digit sum 28 ≡ 11128 (mod 15). -/
theorem enumeration_hex4_2b78 : reassembles 11128 = true ∧ castsFifteens 11128 = true := by decide

/-- 2b79: nibbles fold back to 11129; digit sum 29 ≡ 11129 (mod 15). -/
theorem enumeration_hex4_2b79 : reassembles 11129 = true ∧ castsFifteens 11129 = true := by decide

/-- 2b7a: nibbles fold back to 11130; digit sum 30 ≡ 11130 (mod 15). -/
theorem enumeration_hex4_2b7a : reassembles 11130 = true ∧ castsFifteens 11130 = true := by decide

/-- 2b7b: nibbles fold back to 11131; digit sum 31 ≡ 11131 (mod 15). -/
theorem enumeration_hex4_2b7b : reassembles 11131 = true ∧ castsFifteens 11131 = true := by decide

/-- 2b7c: nibbles fold back to 11132; digit sum 32 ≡ 11132 (mod 15). -/
theorem enumeration_hex4_2b7c : reassembles 11132 = true ∧ castsFifteens 11132 = true := by decide

/-- 2b7d: nibbles fold back to 11133; digit sum 33 ≡ 11133 (mod 15). -/
theorem enumeration_hex4_2b7d : reassembles 11133 = true ∧ castsFifteens 11133 = true := by decide

/-- 2b7e: nibbles fold back to 11134; digit sum 34 ≡ 11134 (mod 15). -/
theorem enumeration_hex4_2b7e : reassembles 11134 = true ∧ castsFifteens 11134 = true := by decide

/-- 2b7f: nibbles fold back to 11135; digit sum 35 ≡ 11135 (mod 15). -/
theorem enumeration_hex4_2b7f : reassembles 11135 = true ∧ castsFifteens 11135 = true := by decide

/-- 2b80: nibbles fold back to 11136; digit sum 21 ≡ 11136 (mod 15). -/
theorem enumeration_hex4_2b80 : reassembles 11136 = true ∧ castsFifteens 11136 = true := by decide

/-- 2b81: nibbles fold back to 11137; digit sum 22 ≡ 11137 (mod 15). -/
theorem enumeration_hex4_2b81 : reassembles 11137 = true ∧ castsFifteens 11137 = true := by decide

/-- 2b82: nibbles fold back to 11138; digit sum 23 ≡ 11138 (mod 15). -/
theorem enumeration_hex4_2b82 : reassembles 11138 = true ∧ castsFifteens 11138 = true := by decide

/-- 2b83: nibbles fold back to 11139; digit sum 24 ≡ 11139 (mod 15). -/
theorem enumeration_hex4_2b83 : reassembles 11139 = true ∧ castsFifteens 11139 = true := by decide

/-- 2b84: nibbles fold back to 11140; digit sum 25 ≡ 11140 (mod 15). -/
theorem enumeration_hex4_2b84 : reassembles 11140 = true ∧ castsFifteens 11140 = true := by decide

/-- 2b85: nibbles fold back to 11141; digit sum 26 ≡ 11141 (mod 15). -/
theorem enumeration_hex4_2b85 : reassembles 11141 = true ∧ castsFifteens 11141 = true := by decide

/-- 2b86: nibbles fold back to 11142; digit sum 27 ≡ 11142 (mod 15). -/
theorem enumeration_hex4_2b86 : reassembles 11142 = true ∧ castsFifteens 11142 = true := by decide

/-- 2b87: nibbles fold back to 11143; digit sum 28 ≡ 11143 (mod 15). -/
theorem enumeration_hex4_2b87 : reassembles 11143 = true ∧ castsFifteens 11143 = true := by decide

/-- 2b88: nibbles fold back to 11144; digit sum 29 ≡ 11144 (mod 15). -/
theorem enumeration_hex4_2b88 : reassembles 11144 = true ∧ castsFifteens 11144 = true := by decide

/-- 2b89: nibbles fold back to 11145; digit sum 30 ≡ 11145 (mod 15). -/
theorem enumeration_hex4_2b89 : reassembles 11145 = true ∧ castsFifteens 11145 = true := by decide

/-- 2b8a: nibbles fold back to 11146; digit sum 31 ≡ 11146 (mod 15). -/
theorem enumeration_hex4_2b8a : reassembles 11146 = true ∧ castsFifteens 11146 = true := by decide

/-- 2b8b: nibbles fold back to 11147; digit sum 32 ≡ 11147 (mod 15). -/
theorem enumeration_hex4_2b8b : reassembles 11147 = true ∧ castsFifteens 11147 = true := by decide

/-- 2b8c: nibbles fold back to 11148; digit sum 33 ≡ 11148 (mod 15). -/
theorem enumeration_hex4_2b8c : reassembles 11148 = true ∧ castsFifteens 11148 = true := by decide

/-- 2b8d: nibbles fold back to 11149; digit sum 34 ≡ 11149 (mod 15). -/
theorem enumeration_hex4_2b8d : reassembles 11149 = true ∧ castsFifteens 11149 = true := by decide

/-- 2b8e: nibbles fold back to 11150; digit sum 35 ≡ 11150 (mod 15). -/
theorem enumeration_hex4_2b8e : reassembles 11150 = true ∧ castsFifteens 11150 = true := by decide

/-- 2b8f: nibbles fold back to 11151; digit sum 36 ≡ 11151 (mod 15). -/
theorem enumeration_hex4_2b8f : reassembles 11151 = true ∧ castsFifteens 11151 = true := by decide

/-- 2b90: nibbles fold back to 11152; digit sum 22 ≡ 11152 (mod 15). -/
theorem enumeration_hex4_2b90 : reassembles 11152 = true ∧ castsFifteens 11152 = true := by decide

/-- 2b91: nibbles fold back to 11153; digit sum 23 ≡ 11153 (mod 15). -/
theorem enumeration_hex4_2b91 : reassembles 11153 = true ∧ castsFifteens 11153 = true := by decide

/-- 2b92: nibbles fold back to 11154; digit sum 24 ≡ 11154 (mod 15). -/
theorem enumeration_hex4_2b92 : reassembles 11154 = true ∧ castsFifteens 11154 = true := by decide

/-- 2b93: nibbles fold back to 11155; digit sum 25 ≡ 11155 (mod 15). -/
theorem enumeration_hex4_2b93 : reassembles 11155 = true ∧ castsFifteens 11155 = true := by decide

/-- 2b94: nibbles fold back to 11156; digit sum 26 ≡ 11156 (mod 15). -/
theorem enumeration_hex4_2b94 : reassembles 11156 = true ∧ castsFifteens 11156 = true := by decide

/-- 2b95: nibbles fold back to 11157; digit sum 27 ≡ 11157 (mod 15). -/
theorem enumeration_hex4_2b95 : reassembles 11157 = true ∧ castsFifteens 11157 = true := by decide

/-- 2b96: nibbles fold back to 11158; digit sum 28 ≡ 11158 (mod 15). -/
theorem enumeration_hex4_2b96 : reassembles 11158 = true ∧ castsFifteens 11158 = true := by decide

/-- 2b97: nibbles fold back to 11159; digit sum 29 ≡ 11159 (mod 15). -/
theorem enumeration_hex4_2b97 : reassembles 11159 = true ∧ castsFifteens 11159 = true := by decide

/-- 2b98: nibbles fold back to 11160; digit sum 30 ≡ 11160 (mod 15). -/
theorem enumeration_hex4_2b98 : reassembles 11160 = true ∧ castsFifteens 11160 = true := by decide

/-- 2b99: nibbles fold back to 11161; digit sum 31 ≡ 11161 (mod 15). -/
theorem enumeration_hex4_2b99 : reassembles 11161 = true ∧ castsFifteens 11161 = true := by decide

/-- 2b9a: nibbles fold back to 11162; digit sum 32 ≡ 11162 (mod 15). -/
theorem enumeration_hex4_2b9a : reassembles 11162 = true ∧ castsFifteens 11162 = true := by decide

/-- 2b9b: nibbles fold back to 11163; digit sum 33 ≡ 11163 (mod 15). -/
theorem enumeration_hex4_2b9b : reassembles 11163 = true ∧ castsFifteens 11163 = true := by decide

/-- 2b9c: nibbles fold back to 11164; digit sum 34 ≡ 11164 (mod 15). -/
theorem enumeration_hex4_2b9c : reassembles 11164 = true ∧ castsFifteens 11164 = true := by decide

/-- 2b9d: nibbles fold back to 11165; digit sum 35 ≡ 11165 (mod 15). -/
theorem enumeration_hex4_2b9d : reassembles 11165 = true ∧ castsFifteens 11165 = true := by decide

/-- 2b9e: nibbles fold back to 11166; digit sum 36 ≡ 11166 (mod 15). -/
theorem enumeration_hex4_2b9e : reassembles 11166 = true ∧ castsFifteens 11166 = true := by decide

/-- 2b9f: nibbles fold back to 11167; digit sum 37 ≡ 11167 (mod 15). -/
theorem enumeration_hex4_2b9f : reassembles 11167 = true ∧ castsFifteens 11167 = true := by decide

/-- 2ba0: nibbles fold back to 11168; digit sum 23 ≡ 11168 (mod 15). -/
theorem enumeration_hex4_2ba0 : reassembles 11168 = true ∧ castsFifteens 11168 = true := by decide

/-- 2ba1: nibbles fold back to 11169; digit sum 24 ≡ 11169 (mod 15). -/
theorem enumeration_hex4_2ba1 : reassembles 11169 = true ∧ castsFifteens 11169 = true := by decide

/-- 2ba2: nibbles fold back to 11170; digit sum 25 ≡ 11170 (mod 15). -/
theorem enumeration_hex4_2ba2 : reassembles 11170 = true ∧ castsFifteens 11170 = true := by decide

/-- 2ba3: nibbles fold back to 11171; digit sum 26 ≡ 11171 (mod 15). -/
theorem enumeration_hex4_2ba3 : reassembles 11171 = true ∧ castsFifteens 11171 = true := by decide

/-- 2ba4: nibbles fold back to 11172; digit sum 27 ≡ 11172 (mod 15). -/
theorem enumeration_hex4_2ba4 : reassembles 11172 = true ∧ castsFifteens 11172 = true := by decide

/-- 2ba5: nibbles fold back to 11173; digit sum 28 ≡ 11173 (mod 15). -/
theorem enumeration_hex4_2ba5 : reassembles 11173 = true ∧ castsFifteens 11173 = true := by decide

/-- 2ba6: nibbles fold back to 11174; digit sum 29 ≡ 11174 (mod 15). -/
theorem enumeration_hex4_2ba6 : reassembles 11174 = true ∧ castsFifteens 11174 = true := by decide

/-- 2ba7: nibbles fold back to 11175; digit sum 30 ≡ 11175 (mod 15). -/
theorem enumeration_hex4_2ba7 : reassembles 11175 = true ∧ castsFifteens 11175 = true := by decide

/-- 2ba8: nibbles fold back to 11176; digit sum 31 ≡ 11176 (mod 15). -/
theorem enumeration_hex4_2ba8 : reassembles 11176 = true ∧ castsFifteens 11176 = true := by decide

/-- 2ba9: nibbles fold back to 11177; digit sum 32 ≡ 11177 (mod 15). -/
theorem enumeration_hex4_2ba9 : reassembles 11177 = true ∧ castsFifteens 11177 = true := by decide

/-- 2baa: nibbles fold back to 11178; digit sum 33 ≡ 11178 (mod 15). -/
theorem enumeration_hex4_2baa : reassembles 11178 = true ∧ castsFifteens 11178 = true := by decide

/-- 2bab: nibbles fold back to 11179; digit sum 34 ≡ 11179 (mod 15). -/
theorem enumeration_hex4_2bab : reassembles 11179 = true ∧ castsFifteens 11179 = true := by decide

/-- 2bac: nibbles fold back to 11180; digit sum 35 ≡ 11180 (mod 15). -/
theorem enumeration_hex4_2bac : reassembles 11180 = true ∧ castsFifteens 11180 = true := by decide

/-- 2bad: nibbles fold back to 11181; digit sum 36 ≡ 11181 (mod 15). -/
theorem enumeration_hex4_2bad : reassembles 11181 = true ∧ castsFifteens 11181 = true := by decide

/-- 2bae: nibbles fold back to 11182; digit sum 37 ≡ 11182 (mod 15). -/
theorem enumeration_hex4_2bae : reassembles 11182 = true ∧ castsFifteens 11182 = true := by decide

/-- 2baf: nibbles fold back to 11183; digit sum 38 ≡ 11183 (mod 15). -/
theorem enumeration_hex4_2baf : reassembles 11183 = true ∧ castsFifteens 11183 = true := by decide

/-- 2bb0: nibbles fold back to 11184; digit sum 24 ≡ 11184 (mod 15). -/
theorem enumeration_hex4_2bb0 : reassembles 11184 = true ∧ castsFifteens 11184 = true := by decide

/-- 2bb1: nibbles fold back to 11185; digit sum 25 ≡ 11185 (mod 15). -/
theorem enumeration_hex4_2bb1 : reassembles 11185 = true ∧ castsFifteens 11185 = true := by decide

/-- 2bb2: nibbles fold back to 11186; digit sum 26 ≡ 11186 (mod 15). -/
theorem enumeration_hex4_2bb2 : reassembles 11186 = true ∧ castsFifteens 11186 = true := by decide

/-- 2bb3: nibbles fold back to 11187; digit sum 27 ≡ 11187 (mod 15). -/
theorem enumeration_hex4_2bb3 : reassembles 11187 = true ∧ castsFifteens 11187 = true := by decide

/-- 2bb4: nibbles fold back to 11188; digit sum 28 ≡ 11188 (mod 15). -/
theorem enumeration_hex4_2bb4 : reassembles 11188 = true ∧ castsFifteens 11188 = true := by decide

/-- 2bb5: nibbles fold back to 11189; digit sum 29 ≡ 11189 (mod 15). -/
theorem enumeration_hex4_2bb5 : reassembles 11189 = true ∧ castsFifteens 11189 = true := by decide

/-- 2bb6: nibbles fold back to 11190; digit sum 30 ≡ 11190 (mod 15). -/
theorem enumeration_hex4_2bb6 : reassembles 11190 = true ∧ castsFifteens 11190 = true := by decide

/-- 2bb7: nibbles fold back to 11191; digit sum 31 ≡ 11191 (mod 15). -/
theorem enumeration_hex4_2bb7 : reassembles 11191 = true ∧ castsFifteens 11191 = true := by decide

/-- 2bb8: nibbles fold back to 11192; digit sum 32 ≡ 11192 (mod 15). -/
theorem enumeration_hex4_2bb8 : reassembles 11192 = true ∧ castsFifteens 11192 = true := by decide

/-- 2bb9: nibbles fold back to 11193; digit sum 33 ≡ 11193 (mod 15). -/
theorem enumeration_hex4_2bb9 : reassembles 11193 = true ∧ castsFifteens 11193 = true := by decide

/-- 2bba: nibbles fold back to 11194; digit sum 34 ≡ 11194 (mod 15). -/
theorem enumeration_hex4_2bba : reassembles 11194 = true ∧ castsFifteens 11194 = true := by decide

/-- 2bbb: nibbles fold back to 11195; digit sum 35 ≡ 11195 (mod 15). -/
theorem enumeration_hex4_2bbb : reassembles 11195 = true ∧ castsFifteens 11195 = true := by decide

/-- 2bbc: nibbles fold back to 11196; digit sum 36 ≡ 11196 (mod 15). -/
theorem enumeration_hex4_2bbc : reassembles 11196 = true ∧ castsFifteens 11196 = true := by decide

/-- 2bbd: nibbles fold back to 11197; digit sum 37 ≡ 11197 (mod 15). -/
theorem enumeration_hex4_2bbd : reassembles 11197 = true ∧ castsFifteens 11197 = true := by decide

/-- 2bbe: nibbles fold back to 11198; digit sum 38 ≡ 11198 (mod 15). -/
theorem enumeration_hex4_2bbe : reassembles 11198 = true ∧ castsFifteens 11198 = true := by decide

/-- 2bbf: nibbles fold back to 11199; digit sum 39 ≡ 11199 (mod 15). -/
theorem enumeration_hex4_2bbf : reassembles 11199 = true ∧ castsFifteens 11199 = true := by decide

/-- 2bc0: nibbles fold back to 11200; digit sum 25 ≡ 11200 (mod 15). -/
theorem enumeration_hex4_2bc0 : reassembles 11200 = true ∧ castsFifteens 11200 = true := by decide

/-- 2bc1: nibbles fold back to 11201; digit sum 26 ≡ 11201 (mod 15). -/
theorem enumeration_hex4_2bc1 : reassembles 11201 = true ∧ castsFifteens 11201 = true := by decide

/-- 2bc2: nibbles fold back to 11202; digit sum 27 ≡ 11202 (mod 15). -/
theorem enumeration_hex4_2bc2 : reassembles 11202 = true ∧ castsFifteens 11202 = true := by decide

/-- 2bc3: nibbles fold back to 11203; digit sum 28 ≡ 11203 (mod 15). -/
theorem enumeration_hex4_2bc3 : reassembles 11203 = true ∧ castsFifteens 11203 = true := by decide

/-- 2bc4: nibbles fold back to 11204; digit sum 29 ≡ 11204 (mod 15). -/
theorem enumeration_hex4_2bc4 : reassembles 11204 = true ∧ castsFifteens 11204 = true := by decide

/-- 2bc5: nibbles fold back to 11205; digit sum 30 ≡ 11205 (mod 15). -/
theorem enumeration_hex4_2bc5 : reassembles 11205 = true ∧ castsFifteens 11205 = true := by decide

/-- 2bc6: nibbles fold back to 11206; digit sum 31 ≡ 11206 (mod 15). -/
theorem enumeration_hex4_2bc6 : reassembles 11206 = true ∧ castsFifteens 11206 = true := by decide

/-- 2bc7: nibbles fold back to 11207; digit sum 32 ≡ 11207 (mod 15). -/
theorem enumeration_hex4_2bc7 : reassembles 11207 = true ∧ castsFifteens 11207 = true := by decide

/-- 2bc8: nibbles fold back to 11208; digit sum 33 ≡ 11208 (mod 15). -/
theorem enumeration_hex4_2bc8 : reassembles 11208 = true ∧ castsFifteens 11208 = true := by decide

/-- 2bc9: nibbles fold back to 11209; digit sum 34 ≡ 11209 (mod 15). -/
theorem enumeration_hex4_2bc9 : reassembles 11209 = true ∧ castsFifteens 11209 = true := by decide

/-- 2bca: nibbles fold back to 11210; digit sum 35 ≡ 11210 (mod 15). -/
theorem enumeration_hex4_2bca : reassembles 11210 = true ∧ castsFifteens 11210 = true := by decide

/-- 2bcb: nibbles fold back to 11211; digit sum 36 ≡ 11211 (mod 15). -/
theorem enumeration_hex4_2bcb : reassembles 11211 = true ∧ castsFifteens 11211 = true := by decide

/-- 2bcc: nibbles fold back to 11212; digit sum 37 ≡ 11212 (mod 15). -/
theorem enumeration_hex4_2bcc : reassembles 11212 = true ∧ castsFifteens 11212 = true := by decide

/-- 2bcd: nibbles fold back to 11213; digit sum 38 ≡ 11213 (mod 15). -/
theorem enumeration_hex4_2bcd : reassembles 11213 = true ∧ castsFifteens 11213 = true := by decide

/-- 2bce: nibbles fold back to 11214; digit sum 39 ≡ 11214 (mod 15). -/
theorem enumeration_hex4_2bce : reassembles 11214 = true ∧ castsFifteens 11214 = true := by decide

/-- 2bcf: nibbles fold back to 11215; digit sum 40 ≡ 11215 (mod 15). -/
theorem enumeration_hex4_2bcf : reassembles 11215 = true ∧ castsFifteens 11215 = true := by decide

/-- 2bd0: nibbles fold back to 11216; digit sum 26 ≡ 11216 (mod 15). -/
theorem enumeration_hex4_2bd0 : reassembles 11216 = true ∧ castsFifteens 11216 = true := by decide

/-- 2bd1: nibbles fold back to 11217; digit sum 27 ≡ 11217 (mod 15). -/
theorem enumeration_hex4_2bd1 : reassembles 11217 = true ∧ castsFifteens 11217 = true := by decide

/-- 2bd2: nibbles fold back to 11218; digit sum 28 ≡ 11218 (mod 15). -/
theorem enumeration_hex4_2bd2 : reassembles 11218 = true ∧ castsFifteens 11218 = true := by decide

/-- 2bd3: nibbles fold back to 11219; digit sum 29 ≡ 11219 (mod 15). -/
theorem enumeration_hex4_2bd3 : reassembles 11219 = true ∧ castsFifteens 11219 = true := by decide

/-- 2bd4: nibbles fold back to 11220; digit sum 30 ≡ 11220 (mod 15). -/
theorem enumeration_hex4_2bd4 : reassembles 11220 = true ∧ castsFifteens 11220 = true := by decide

/-- 2bd5: nibbles fold back to 11221; digit sum 31 ≡ 11221 (mod 15). -/
theorem enumeration_hex4_2bd5 : reassembles 11221 = true ∧ castsFifteens 11221 = true := by decide

/-- 2bd6: nibbles fold back to 11222; digit sum 32 ≡ 11222 (mod 15). -/
theorem enumeration_hex4_2bd6 : reassembles 11222 = true ∧ castsFifteens 11222 = true := by decide

/-- 2bd7: nibbles fold back to 11223; digit sum 33 ≡ 11223 (mod 15). -/
theorem enumeration_hex4_2bd7 : reassembles 11223 = true ∧ castsFifteens 11223 = true := by decide

/-- 2bd8: nibbles fold back to 11224; digit sum 34 ≡ 11224 (mod 15). -/
theorem enumeration_hex4_2bd8 : reassembles 11224 = true ∧ castsFifteens 11224 = true := by decide

/-- 2bd9: nibbles fold back to 11225; digit sum 35 ≡ 11225 (mod 15). -/
theorem enumeration_hex4_2bd9 : reassembles 11225 = true ∧ castsFifteens 11225 = true := by decide

/-- 2bda: nibbles fold back to 11226; digit sum 36 ≡ 11226 (mod 15). -/
theorem enumeration_hex4_2bda : reassembles 11226 = true ∧ castsFifteens 11226 = true := by decide

/-- 2bdb: nibbles fold back to 11227; digit sum 37 ≡ 11227 (mod 15). -/
theorem enumeration_hex4_2bdb : reassembles 11227 = true ∧ castsFifteens 11227 = true := by decide

/-- 2bdc: nibbles fold back to 11228; digit sum 38 ≡ 11228 (mod 15). -/
theorem enumeration_hex4_2bdc : reassembles 11228 = true ∧ castsFifteens 11228 = true := by decide

/-- 2bdd: nibbles fold back to 11229; digit sum 39 ≡ 11229 (mod 15). -/
theorem enumeration_hex4_2bdd : reassembles 11229 = true ∧ castsFifteens 11229 = true := by decide

/-- 2bde: nibbles fold back to 11230; digit sum 40 ≡ 11230 (mod 15). -/
theorem enumeration_hex4_2bde : reassembles 11230 = true ∧ castsFifteens 11230 = true := by decide

/-- 2bdf: nibbles fold back to 11231; digit sum 41 ≡ 11231 (mod 15). -/
theorem enumeration_hex4_2bdf : reassembles 11231 = true ∧ castsFifteens 11231 = true := by decide

/-- 2be0: nibbles fold back to 11232; digit sum 27 ≡ 11232 (mod 15). -/
theorem enumeration_hex4_2be0 : reassembles 11232 = true ∧ castsFifteens 11232 = true := by decide

/-- 2be1: nibbles fold back to 11233; digit sum 28 ≡ 11233 (mod 15). -/
theorem enumeration_hex4_2be1 : reassembles 11233 = true ∧ castsFifteens 11233 = true := by decide

/-- 2be2: nibbles fold back to 11234; digit sum 29 ≡ 11234 (mod 15). -/
theorem enumeration_hex4_2be2 : reassembles 11234 = true ∧ castsFifteens 11234 = true := by decide

/-- 2be3: nibbles fold back to 11235; digit sum 30 ≡ 11235 (mod 15). -/
theorem enumeration_hex4_2be3 : reassembles 11235 = true ∧ castsFifteens 11235 = true := by decide

/-- 2be4: nibbles fold back to 11236; digit sum 31 ≡ 11236 (mod 15). -/
theorem enumeration_hex4_2be4 : reassembles 11236 = true ∧ castsFifteens 11236 = true := by decide

/-- 2be5: nibbles fold back to 11237; digit sum 32 ≡ 11237 (mod 15). -/
theorem enumeration_hex4_2be5 : reassembles 11237 = true ∧ castsFifteens 11237 = true := by decide

/-- 2be6: nibbles fold back to 11238; digit sum 33 ≡ 11238 (mod 15). -/
theorem enumeration_hex4_2be6 : reassembles 11238 = true ∧ castsFifteens 11238 = true := by decide

/-- 2be7: nibbles fold back to 11239; digit sum 34 ≡ 11239 (mod 15). -/
theorem enumeration_hex4_2be7 : reassembles 11239 = true ∧ castsFifteens 11239 = true := by decide

/-- 2be8: nibbles fold back to 11240; digit sum 35 ≡ 11240 (mod 15). -/
theorem enumeration_hex4_2be8 : reassembles 11240 = true ∧ castsFifteens 11240 = true := by decide

/-- 2be9: nibbles fold back to 11241; digit sum 36 ≡ 11241 (mod 15). -/
theorem enumeration_hex4_2be9 : reassembles 11241 = true ∧ castsFifteens 11241 = true := by decide

/-- 2bea: nibbles fold back to 11242; digit sum 37 ≡ 11242 (mod 15). -/
theorem enumeration_hex4_2bea : reassembles 11242 = true ∧ castsFifteens 11242 = true := by decide

/-- 2beb: nibbles fold back to 11243; digit sum 38 ≡ 11243 (mod 15). -/
theorem enumeration_hex4_2beb : reassembles 11243 = true ∧ castsFifteens 11243 = true := by decide

/-- 2bec: nibbles fold back to 11244; digit sum 39 ≡ 11244 (mod 15). -/
theorem enumeration_hex4_2bec : reassembles 11244 = true ∧ castsFifteens 11244 = true := by decide

/-- 2bed: nibbles fold back to 11245; digit sum 40 ≡ 11245 (mod 15). -/
theorem enumeration_hex4_2bed : reassembles 11245 = true ∧ castsFifteens 11245 = true := by decide

/-- 2bee: nibbles fold back to 11246; digit sum 41 ≡ 11246 (mod 15). -/
theorem enumeration_hex4_2bee : reassembles 11246 = true ∧ castsFifteens 11246 = true := by decide

/-- 2bef: nibbles fold back to 11247; digit sum 42 ≡ 11247 (mod 15). -/
theorem enumeration_hex4_2bef : reassembles 11247 = true ∧ castsFifteens 11247 = true := by decide

/-- 2bf0: nibbles fold back to 11248; digit sum 28 ≡ 11248 (mod 15). -/
theorem enumeration_hex4_2bf0 : reassembles 11248 = true ∧ castsFifteens 11248 = true := by decide

/-- 2bf1: nibbles fold back to 11249; digit sum 29 ≡ 11249 (mod 15). -/
theorem enumeration_hex4_2bf1 : reassembles 11249 = true ∧ castsFifteens 11249 = true := by decide

/-- 2bf2: nibbles fold back to 11250; digit sum 30 ≡ 11250 (mod 15). -/
theorem enumeration_hex4_2bf2 : reassembles 11250 = true ∧ castsFifteens 11250 = true := by decide

/-- 2bf3: nibbles fold back to 11251; digit sum 31 ≡ 11251 (mod 15). -/
theorem enumeration_hex4_2bf3 : reassembles 11251 = true ∧ castsFifteens 11251 = true := by decide

/-- 2bf4: nibbles fold back to 11252; digit sum 32 ≡ 11252 (mod 15). -/
theorem enumeration_hex4_2bf4 : reassembles 11252 = true ∧ castsFifteens 11252 = true := by decide

/-- 2bf5: nibbles fold back to 11253; digit sum 33 ≡ 11253 (mod 15). -/
theorem enumeration_hex4_2bf5 : reassembles 11253 = true ∧ castsFifteens 11253 = true := by decide

/-- 2bf6: nibbles fold back to 11254; digit sum 34 ≡ 11254 (mod 15). -/
theorem enumeration_hex4_2bf6 : reassembles 11254 = true ∧ castsFifteens 11254 = true := by decide

/-- 2bf7: nibbles fold back to 11255; digit sum 35 ≡ 11255 (mod 15). -/
theorem enumeration_hex4_2bf7 : reassembles 11255 = true ∧ castsFifteens 11255 = true := by decide

/-- 2bf8: nibbles fold back to 11256; digit sum 36 ≡ 11256 (mod 15). -/
theorem enumeration_hex4_2bf8 : reassembles 11256 = true ∧ castsFifteens 11256 = true := by decide

/-- 2bf9: nibbles fold back to 11257; digit sum 37 ≡ 11257 (mod 15). -/
theorem enumeration_hex4_2bf9 : reassembles 11257 = true ∧ castsFifteens 11257 = true := by decide

/-- 2bfa: nibbles fold back to 11258; digit sum 38 ≡ 11258 (mod 15). -/
theorem enumeration_hex4_2bfa : reassembles 11258 = true ∧ castsFifteens 11258 = true := by decide

/-- 2bfb: nibbles fold back to 11259; digit sum 39 ≡ 11259 (mod 15). -/
theorem enumeration_hex4_2bfb : reassembles 11259 = true ∧ castsFifteens 11259 = true := by decide

/-- 2bfc: nibbles fold back to 11260; digit sum 40 ≡ 11260 (mod 15). -/
theorem enumeration_hex4_2bfc : reassembles 11260 = true ∧ castsFifteens 11260 = true := by decide

/-- 2bfd: nibbles fold back to 11261; digit sum 41 ≡ 11261 (mod 15). -/
theorem enumeration_hex4_2bfd : reassembles 11261 = true ∧ castsFifteens 11261 = true := by decide

/-- 2bfe: nibbles fold back to 11262; digit sum 42 ≡ 11262 (mod 15). -/
theorem enumeration_hex4_2bfe : reassembles 11262 = true ∧ castsFifteens 11262 = true := by decide

/-- 2bff: nibbles fold back to 11263; digit sum 43 ≡ 11263 (mod 15). -/
theorem enumeration_hex4_2bff : reassembles 11263 = true ∧ castsFifteens 11263 = true := by decide

/-- 2c00: nibbles fold back to 11264; digit sum 14 ≡ 11264 (mod 15). -/
theorem enumeration_hex4_2c00 : reassembles 11264 = true ∧ castsFifteens 11264 = true := by decide

/-- 2c01: nibbles fold back to 11265; digit sum 15 ≡ 11265 (mod 15). -/
theorem enumeration_hex4_2c01 : reassembles 11265 = true ∧ castsFifteens 11265 = true := by decide

/-- 2c02: nibbles fold back to 11266; digit sum 16 ≡ 11266 (mod 15). -/
theorem enumeration_hex4_2c02 : reassembles 11266 = true ∧ castsFifteens 11266 = true := by decide

/-- 2c03: nibbles fold back to 11267; digit sum 17 ≡ 11267 (mod 15). -/
theorem enumeration_hex4_2c03 : reassembles 11267 = true ∧ castsFifteens 11267 = true := by decide

/-- 2c04: nibbles fold back to 11268; digit sum 18 ≡ 11268 (mod 15). -/
theorem enumeration_hex4_2c04 : reassembles 11268 = true ∧ castsFifteens 11268 = true := by decide

/-- 2c05: nibbles fold back to 11269; digit sum 19 ≡ 11269 (mod 15). -/
theorem enumeration_hex4_2c05 : reassembles 11269 = true ∧ castsFifteens 11269 = true := by decide

/-- 2c06: nibbles fold back to 11270; digit sum 20 ≡ 11270 (mod 15). -/
theorem enumeration_hex4_2c06 : reassembles 11270 = true ∧ castsFifteens 11270 = true := by decide

/-- 2c07: nibbles fold back to 11271; digit sum 21 ≡ 11271 (mod 15). -/
theorem enumeration_hex4_2c07 : reassembles 11271 = true ∧ castsFifteens 11271 = true := by decide

/-- 2c08: nibbles fold back to 11272; digit sum 22 ≡ 11272 (mod 15). -/
theorem enumeration_hex4_2c08 : reassembles 11272 = true ∧ castsFifteens 11272 = true := by decide

/-- 2c09: nibbles fold back to 11273; digit sum 23 ≡ 11273 (mod 15). -/
theorem enumeration_hex4_2c09 : reassembles 11273 = true ∧ castsFifteens 11273 = true := by decide

/-- 2c0a: nibbles fold back to 11274; digit sum 24 ≡ 11274 (mod 15). -/
theorem enumeration_hex4_2c0a : reassembles 11274 = true ∧ castsFifteens 11274 = true := by decide

/-- 2c0b: nibbles fold back to 11275; digit sum 25 ≡ 11275 (mod 15). -/
theorem enumeration_hex4_2c0b : reassembles 11275 = true ∧ castsFifteens 11275 = true := by decide

/-- 2c0c: nibbles fold back to 11276; digit sum 26 ≡ 11276 (mod 15). -/
theorem enumeration_hex4_2c0c : reassembles 11276 = true ∧ castsFifteens 11276 = true := by decide

/-- 2c0d: nibbles fold back to 11277; digit sum 27 ≡ 11277 (mod 15). -/
theorem enumeration_hex4_2c0d : reassembles 11277 = true ∧ castsFifteens 11277 = true := by decide

/-- 2c0e: nibbles fold back to 11278; digit sum 28 ≡ 11278 (mod 15). -/
theorem enumeration_hex4_2c0e : reassembles 11278 = true ∧ castsFifteens 11278 = true := by decide

/-- 2c0f: nibbles fold back to 11279; digit sum 29 ≡ 11279 (mod 15). -/
theorem enumeration_hex4_2c0f : reassembles 11279 = true ∧ castsFifteens 11279 = true := by decide

/-- 2c10: nibbles fold back to 11280; digit sum 15 ≡ 11280 (mod 15). -/
theorem enumeration_hex4_2c10 : reassembles 11280 = true ∧ castsFifteens 11280 = true := by decide

/-- 2c11: nibbles fold back to 11281; digit sum 16 ≡ 11281 (mod 15). -/
theorem enumeration_hex4_2c11 : reassembles 11281 = true ∧ castsFifteens 11281 = true := by decide

/-- 2c12: nibbles fold back to 11282; digit sum 17 ≡ 11282 (mod 15). -/
theorem enumeration_hex4_2c12 : reassembles 11282 = true ∧ castsFifteens 11282 = true := by decide

/-- 2c13: nibbles fold back to 11283; digit sum 18 ≡ 11283 (mod 15). -/
theorem enumeration_hex4_2c13 : reassembles 11283 = true ∧ castsFifteens 11283 = true := by decide

/-- 2c14: nibbles fold back to 11284; digit sum 19 ≡ 11284 (mod 15). -/
theorem enumeration_hex4_2c14 : reassembles 11284 = true ∧ castsFifteens 11284 = true := by decide

/-- 2c15: nibbles fold back to 11285; digit sum 20 ≡ 11285 (mod 15). -/
theorem enumeration_hex4_2c15 : reassembles 11285 = true ∧ castsFifteens 11285 = true := by decide

/-- 2c16: nibbles fold back to 11286; digit sum 21 ≡ 11286 (mod 15). -/
theorem enumeration_hex4_2c16 : reassembles 11286 = true ∧ castsFifteens 11286 = true := by decide

/-- 2c17: nibbles fold back to 11287; digit sum 22 ≡ 11287 (mod 15). -/
theorem enumeration_hex4_2c17 : reassembles 11287 = true ∧ castsFifteens 11287 = true := by decide

/-- 2c18: nibbles fold back to 11288; digit sum 23 ≡ 11288 (mod 15). -/
theorem enumeration_hex4_2c18 : reassembles 11288 = true ∧ castsFifteens 11288 = true := by decide

/-- 2c19: nibbles fold back to 11289; digit sum 24 ≡ 11289 (mod 15). -/
theorem enumeration_hex4_2c19 : reassembles 11289 = true ∧ castsFifteens 11289 = true := by decide

/-- 2c1a: nibbles fold back to 11290; digit sum 25 ≡ 11290 (mod 15). -/
theorem enumeration_hex4_2c1a : reassembles 11290 = true ∧ castsFifteens 11290 = true := by decide

/-- 2c1b: nibbles fold back to 11291; digit sum 26 ≡ 11291 (mod 15). -/
theorem enumeration_hex4_2c1b : reassembles 11291 = true ∧ castsFifteens 11291 = true := by decide

/-- 2c1c: nibbles fold back to 11292; digit sum 27 ≡ 11292 (mod 15). -/
theorem enumeration_hex4_2c1c : reassembles 11292 = true ∧ castsFifteens 11292 = true := by decide

/-- 2c1d: nibbles fold back to 11293; digit sum 28 ≡ 11293 (mod 15). -/
theorem enumeration_hex4_2c1d : reassembles 11293 = true ∧ castsFifteens 11293 = true := by decide

/-- 2c1e: nibbles fold back to 11294; digit sum 29 ≡ 11294 (mod 15). -/
theorem enumeration_hex4_2c1e : reassembles 11294 = true ∧ castsFifteens 11294 = true := by decide

/-- 2c1f: nibbles fold back to 11295; digit sum 30 ≡ 11295 (mod 15). -/
theorem enumeration_hex4_2c1f : reassembles 11295 = true ∧ castsFifteens 11295 = true := by decide

/-- 2c20: nibbles fold back to 11296; digit sum 16 ≡ 11296 (mod 15). -/
theorem enumeration_hex4_2c20 : reassembles 11296 = true ∧ castsFifteens 11296 = true := by decide

/-- 2c21: nibbles fold back to 11297; digit sum 17 ≡ 11297 (mod 15). -/
theorem enumeration_hex4_2c21 : reassembles 11297 = true ∧ castsFifteens 11297 = true := by decide

/-- 2c22: nibbles fold back to 11298; digit sum 18 ≡ 11298 (mod 15). -/
theorem enumeration_hex4_2c22 : reassembles 11298 = true ∧ castsFifteens 11298 = true := by decide

/-- 2c23: nibbles fold back to 11299; digit sum 19 ≡ 11299 (mod 15). -/
theorem enumeration_hex4_2c23 : reassembles 11299 = true ∧ castsFifteens 11299 = true := by decide

/-- 2c24: nibbles fold back to 11300; digit sum 20 ≡ 11300 (mod 15). -/
theorem enumeration_hex4_2c24 : reassembles 11300 = true ∧ castsFifteens 11300 = true := by decide

/-- 2c25: nibbles fold back to 11301; digit sum 21 ≡ 11301 (mod 15). -/
theorem enumeration_hex4_2c25 : reassembles 11301 = true ∧ castsFifteens 11301 = true := by decide

/-- 2c26: nibbles fold back to 11302; digit sum 22 ≡ 11302 (mod 15). -/
theorem enumeration_hex4_2c26 : reassembles 11302 = true ∧ castsFifteens 11302 = true := by decide

/-- 2c27: nibbles fold back to 11303; digit sum 23 ≡ 11303 (mod 15). -/
theorem enumeration_hex4_2c27 : reassembles 11303 = true ∧ castsFifteens 11303 = true := by decide

/-- 2c28: nibbles fold back to 11304; digit sum 24 ≡ 11304 (mod 15). -/
theorem enumeration_hex4_2c28 : reassembles 11304 = true ∧ castsFifteens 11304 = true := by decide

/-- 2c29: nibbles fold back to 11305; digit sum 25 ≡ 11305 (mod 15). -/
theorem enumeration_hex4_2c29 : reassembles 11305 = true ∧ castsFifteens 11305 = true := by decide

/-- 2c2a: nibbles fold back to 11306; digit sum 26 ≡ 11306 (mod 15). -/
theorem enumeration_hex4_2c2a : reassembles 11306 = true ∧ castsFifteens 11306 = true := by decide

/-- 2c2b: nibbles fold back to 11307; digit sum 27 ≡ 11307 (mod 15). -/
theorem enumeration_hex4_2c2b : reassembles 11307 = true ∧ castsFifteens 11307 = true := by decide

/-- 2c2c: nibbles fold back to 11308; digit sum 28 ≡ 11308 (mod 15). -/
theorem enumeration_hex4_2c2c : reassembles 11308 = true ∧ castsFifteens 11308 = true := by decide

/-- 2c2d: nibbles fold back to 11309; digit sum 29 ≡ 11309 (mod 15). -/
theorem enumeration_hex4_2c2d : reassembles 11309 = true ∧ castsFifteens 11309 = true := by decide

/-- 2c2e: nibbles fold back to 11310; digit sum 30 ≡ 11310 (mod 15). -/
theorem enumeration_hex4_2c2e : reassembles 11310 = true ∧ castsFifteens 11310 = true := by decide

/-- 2c2f: nibbles fold back to 11311; digit sum 31 ≡ 11311 (mod 15). -/
theorem enumeration_hex4_2c2f : reassembles 11311 = true ∧ castsFifteens 11311 = true := by decide

/-- 2c30: nibbles fold back to 11312; digit sum 17 ≡ 11312 (mod 15). -/
theorem enumeration_hex4_2c30 : reassembles 11312 = true ∧ castsFifteens 11312 = true := by decide

/-- 2c31: nibbles fold back to 11313; digit sum 18 ≡ 11313 (mod 15). -/
theorem enumeration_hex4_2c31 : reassembles 11313 = true ∧ castsFifteens 11313 = true := by decide

/-- 2c32: nibbles fold back to 11314; digit sum 19 ≡ 11314 (mod 15). -/
theorem enumeration_hex4_2c32 : reassembles 11314 = true ∧ castsFifteens 11314 = true := by decide

/-- 2c33: nibbles fold back to 11315; digit sum 20 ≡ 11315 (mod 15). -/
theorem enumeration_hex4_2c33 : reassembles 11315 = true ∧ castsFifteens 11315 = true := by decide

/-- 2c34: nibbles fold back to 11316; digit sum 21 ≡ 11316 (mod 15). -/
theorem enumeration_hex4_2c34 : reassembles 11316 = true ∧ castsFifteens 11316 = true := by decide

/-- 2c35: nibbles fold back to 11317; digit sum 22 ≡ 11317 (mod 15). -/
theorem enumeration_hex4_2c35 : reassembles 11317 = true ∧ castsFifteens 11317 = true := by decide

/-- 2c36: nibbles fold back to 11318; digit sum 23 ≡ 11318 (mod 15). -/
theorem enumeration_hex4_2c36 : reassembles 11318 = true ∧ castsFifteens 11318 = true := by decide

/-- 2c37: nibbles fold back to 11319; digit sum 24 ≡ 11319 (mod 15). -/
theorem enumeration_hex4_2c37 : reassembles 11319 = true ∧ castsFifteens 11319 = true := by decide

/-- 2c38: nibbles fold back to 11320; digit sum 25 ≡ 11320 (mod 15). -/
theorem enumeration_hex4_2c38 : reassembles 11320 = true ∧ castsFifteens 11320 = true := by decide

/-- 2c39: nibbles fold back to 11321; digit sum 26 ≡ 11321 (mod 15). -/
theorem enumeration_hex4_2c39 : reassembles 11321 = true ∧ castsFifteens 11321 = true := by decide

/-- 2c3a: nibbles fold back to 11322; digit sum 27 ≡ 11322 (mod 15). -/
theorem enumeration_hex4_2c3a : reassembles 11322 = true ∧ castsFifteens 11322 = true := by decide

/-- 2c3b: nibbles fold back to 11323; digit sum 28 ≡ 11323 (mod 15). -/
theorem enumeration_hex4_2c3b : reassembles 11323 = true ∧ castsFifteens 11323 = true := by decide

/-- 2c3c: nibbles fold back to 11324; digit sum 29 ≡ 11324 (mod 15). -/
theorem enumeration_hex4_2c3c : reassembles 11324 = true ∧ castsFifteens 11324 = true := by decide

/-- 2c3d: nibbles fold back to 11325; digit sum 30 ≡ 11325 (mod 15). -/
theorem enumeration_hex4_2c3d : reassembles 11325 = true ∧ castsFifteens 11325 = true := by decide

/-- 2c3e: nibbles fold back to 11326; digit sum 31 ≡ 11326 (mod 15). -/
theorem enumeration_hex4_2c3e : reassembles 11326 = true ∧ castsFifteens 11326 = true := by decide

/-- 2c3f: nibbles fold back to 11327; digit sum 32 ≡ 11327 (mod 15). -/
theorem enumeration_hex4_2c3f : reassembles 11327 = true ∧ castsFifteens 11327 = true := by decide

/-- 2c40: nibbles fold back to 11328; digit sum 18 ≡ 11328 (mod 15). -/
theorem enumeration_hex4_2c40 : reassembles 11328 = true ∧ castsFifteens 11328 = true := by decide

/-- 2c41: nibbles fold back to 11329; digit sum 19 ≡ 11329 (mod 15). -/
theorem enumeration_hex4_2c41 : reassembles 11329 = true ∧ castsFifteens 11329 = true := by decide

/-- 2c42: nibbles fold back to 11330; digit sum 20 ≡ 11330 (mod 15). -/
theorem enumeration_hex4_2c42 : reassembles 11330 = true ∧ castsFifteens 11330 = true := by decide

/-- 2c43: nibbles fold back to 11331; digit sum 21 ≡ 11331 (mod 15). -/
theorem enumeration_hex4_2c43 : reassembles 11331 = true ∧ castsFifteens 11331 = true := by decide

/-- 2c44: nibbles fold back to 11332; digit sum 22 ≡ 11332 (mod 15). -/
theorem enumeration_hex4_2c44 : reassembles 11332 = true ∧ castsFifteens 11332 = true := by decide

/-- 2c45: nibbles fold back to 11333; digit sum 23 ≡ 11333 (mod 15). -/
theorem enumeration_hex4_2c45 : reassembles 11333 = true ∧ castsFifteens 11333 = true := by decide

/-- 2c46: nibbles fold back to 11334; digit sum 24 ≡ 11334 (mod 15). -/
theorem enumeration_hex4_2c46 : reassembles 11334 = true ∧ castsFifteens 11334 = true := by decide

/-- 2c47: nibbles fold back to 11335; digit sum 25 ≡ 11335 (mod 15). -/
theorem enumeration_hex4_2c47 : reassembles 11335 = true ∧ castsFifteens 11335 = true := by decide

/-- 2c48: nibbles fold back to 11336; digit sum 26 ≡ 11336 (mod 15). -/
theorem enumeration_hex4_2c48 : reassembles 11336 = true ∧ castsFifteens 11336 = true := by decide

/-- 2c49: nibbles fold back to 11337; digit sum 27 ≡ 11337 (mod 15). -/
theorem enumeration_hex4_2c49 : reassembles 11337 = true ∧ castsFifteens 11337 = true := by decide

/-- 2c4a: nibbles fold back to 11338; digit sum 28 ≡ 11338 (mod 15). -/
theorem enumeration_hex4_2c4a : reassembles 11338 = true ∧ castsFifteens 11338 = true := by decide

/-- 2c4b: nibbles fold back to 11339; digit sum 29 ≡ 11339 (mod 15). -/
theorem enumeration_hex4_2c4b : reassembles 11339 = true ∧ castsFifteens 11339 = true := by decide

/-- 2c4c: nibbles fold back to 11340; digit sum 30 ≡ 11340 (mod 15). -/
theorem enumeration_hex4_2c4c : reassembles 11340 = true ∧ castsFifteens 11340 = true := by decide

/-- 2c4d: nibbles fold back to 11341; digit sum 31 ≡ 11341 (mod 15). -/
theorem enumeration_hex4_2c4d : reassembles 11341 = true ∧ castsFifteens 11341 = true := by decide

/-- 2c4e: nibbles fold back to 11342; digit sum 32 ≡ 11342 (mod 15). -/
theorem enumeration_hex4_2c4e : reassembles 11342 = true ∧ castsFifteens 11342 = true := by decide

/-- 2c4f: nibbles fold back to 11343; digit sum 33 ≡ 11343 (mod 15). -/
theorem enumeration_hex4_2c4f : reassembles 11343 = true ∧ castsFifteens 11343 = true := by decide

/-- 2c50: nibbles fold back to 11344; digit sum 19 ≡ 11344 (mod 15). -/
theorem enumeration_hex4_2c50 : reassembles 11344 = true ∧ castsFifteens 11344 = true := by decide

/-- 2c51: nibbles fold back to 11345; digit sum 20 ≡ 11345 (mod 15). -/
theorem enumeration_hex4_2c51 : reassembles 11345 = true ∧ castsFifteens 11345 = true := by decide

/-- 2c52: nibbles fold back to 11346; digit sum 21 ≡ 11346 (mod 15). -/
theorem enumeration_hex4_2c52 : reassembles 11346 = true ∧ castsFifteens 11346 = true := by decide

/-- 2c53: nibbles fold back to 11347; digit sum 22 ≡ 11347 (mod 15). -/
theorem enumeration_hex4_2c53 : reassembles 11347 = true ∧ castsFifteens 11347 = true := by decide

/-- 2c54: nibbles fold back to 11348; digit sum 23 ≡ 11348 (mod 15). -/
theorem enumeration_hex4_2c54 : reassembles 11348 = true ∧ castsFifteens 11348 = true := by decide

/-- 2c55: nibbles fold back to 11349; digit sum 24 ≡ 11349 (mod 15). -/
theorem enumeration_hex4_2c55 : reassembles 11349 = true ∧ castsFifteens 11349 = true := by decide

/-- 2c56: nibbles fold back to 11350; digit sum 25 ≡ 11350 (mod 15). -/
theorem enumeration_hex4_2c56 : reassembles 11350 = true ∧ castsFifteens 11350 = true := by decide

/-- 2c57: nibbles fold back to 11351; digit sum 26 ≡ 11351 (mod 15). -/
theorem enumeration_hex4_2c57 : reassembles 11351 = true ∧ castsFifteens 11351 = true := by decide

/-- 2c58: nibbles fold back to 11352; digit sum 27 ≡ 11352 (mod 15). -/
theorem enumeration_hex4_2c58 : reassembles 11352 = true ∧ castsFifteens 11352 = true := by decide

/-- 2c59: nibbles fold back to 11353; digit sum 28 ≡ 11353 (mod 15). -/
theorem enumeration_hex4_2c59 : reassembles 11353 = true ∧ castsFifteens 11353 = true := by decide

/-- 2c5a: nibbles fold back to 11354; digit sum 29 ≡ 11354 (mod 15). -/
theorem enumeration_hex4_2c5a : reassembles 11354 = true ∧ castsFifteens 11354 = true := by decide

/-- 2c5b: nibbles fold back to 11355; digit sum 30 ≡ 11355 (mod 15). -/
theorem enumeration_hex4_2c5b : reassembles 11355 = true ∧ castsFifteens 11355 = true := by decide

/-- 2c5c: nibbles fold back to 11356; digit sum 31 ≡ 11356 (mod 15). -/
theorem enumeration_hex4_2c5c : reassembles 11356 = true ∧ castsFifteens 11356 = true := by decide

/-- 2c5d: nibbles fold back to 11357; digit sum 32 ≡ 11357 (mod 15). -/
theorem enumeration_hex4_2c5d : reassembles 11357 = true ∧ castsFifteens 11357 = true := by decide

/-- 2c5e: nibbles fold back to 11358; digit sum 33 ≡ 11358 (mod 15). -/
theorem enumeration_hex4_2c5e : reassembles 11358 = true ∧ castsFifteens 11358 = true := by decide

/-- 2c5f: nibbles fold back to 11359; digit sum 34 ≡ 11359 (mod 15). -/
theorem enumeration_hex4_2c5f : reassembles 11359 = true ∧ castsFifteens 11359 = true := by decide

/-- 2c60: nibbles fold back to 11360; digit sum 20 ≡ 11360 (mod 15). -/
theorem enumeration_hex4_2c60 : reassembles 11360 = true ∧ castsFifteens 11360 = true := by decide

/-- 2c61: nibbles fold back to 11361; digit sum 21 ≡ 11361 (mod 15). -/
theorem enumeration_hex4_2c61 : reassembles 11361 = true ∧ castsFifteens 11361 = true := by decide

/-- 2c62: nibbles fold back to 11362; digit sum 22 ≡ 11362 (mod 15). -/
theorem enumeration_hex4_2c62 : reassembles 11362 = true ∧ castsFifteens 11362 = true := by decide

/-- 2c63: nibbles fold back to 11363; digit sum 23 ≡ 11363 (mod 15). -/
theorem enumeration_hex4_2c63 : reassembles 11363 = true ∧ castsFifteens 11363 = true := by decide

/-- 2c64: nibbles fold back to 11364; digit sum 24 ≡ 11364 (mod 15). -/
theorem enumeration_hex4_2c64 : reassembles 11364 = true ∧ castsFifteens 11364 = true := by decide

/-- 2c65: nibbles fold back to 11365; digit sum 25 ≡ 11365 (mod 15). -/
theorem enumeration_hex4_2c65 : reassembles 11365 = true ∧ castsFifteens 11365 = true := by decide

/-- 2c66: nibbles fold back to 11366; digit sum 26 ≡ 11366 (mod 15). -/
theorem enumeration_hex4_2c66 : reassembles 11366 = true ∧ castsFifteens 11366 = true := by decide

/-- 2c67: nibbles fold back to 11367; digit sum 27 ≡ 11367 (mod 15). -/
theorem enumeration_hex4_2c67 : reassembles 11367 = true ∧ castsFifteens 11367 = true := by decide

/-- 2c68: nibbles fold back to 11368; digit sum 28 ≡ 11368 (mod 15). -/
theorem enumeration_hex4_2c68 : reassembles 11368 = true ∧ castsFifteens 11368 = true := by decide

/-- 2c69: nibbles fold back to 11369; digit sum 29 ≡ 11369 (mod 15). -/
theorem enumeration_hex4_2c69 : reassembles 11369 = true ∧ castsFifteens 11369 = true := by decide

/-- 2c6a: nibbles fold back to 11370; digit sum 30 ≡ 11370 (mod 15). -/
theorem enumeration_hex4_2c6a : reassembles 11370 = true ∧ castsFifteens 11370 = true := by decide

/-- 2c6b: nibbles fold back to 11371; digit sum 31 ≡ 11371 (mod 15). -/
theorem enumeration_hex4_2c6b : reassembles 11371 = true ∧ castsFifteens 11371 = true := by decide

/-- 2c6c: nibbles fold back to 11372; digit sum 32 ≡ 11372 (mod 15). -/
theorem enumeration_hex4_2c6c : reassembles 11372 = true ∧ castsFifteens 11372 = true := by decide

/-- 2c6d: nibbles fold back to 11373; digit sum 33 ≡ 11373 (mod 15). -/
theorem enumeration_hex4_2c6d : reassembles 11373 = true ∧ castsFifteens 11373 = true := by decide

/-- 2c6e: nibbles fold back to 11374; digit sum 34 ≡ 11374 (mod 15). -/
theorem enumeration_hex4_2c6e : reassembles 11374 = true ∧ castsFifteens 11374 = true := by decide

/-- 2c6f: nibbles fold back to 11375; digit sum 35 ≡ 11375 (mod 15). -/
theorem enumeration_hex4_2c6f : reassembles 11375 = true ∧ castsFifteens 11375 = true := by decide

/-- 2c70: nibbles fold back to 11376; digit sum 21 ≡ 11376 (mod 15). -/
theorem enumeration_hex4_2c70 : reassembles 11376 = true ∧ castsFifteens 11376 = true := by decide

/-- 2c71: nibbles fold back to 11377; digit sum 22 ≡ 11377 (mod 15). -/
theorem enumeration_hex4_2c71 : reassembles 11377 = true ∧ castsFifteens 11377 = true := by decide

/-- 2c72: nibbles fold back to 11378; digit sum 23 ≡ 11378 (mod 15). -/
theorem enumeration_hex4_2c72 : reassembles 11378 = true ∧ castsFifteens 11378 = true := by decide

/-- 2c73: nibbles fold back to 11379; digit sum 24 ≡ 11379 (mod 15). -/
theorem enumeration_hex4_2c73 : reassembles 11379 = true ∧ castsFifteens 11379 = true := by decide

/-- 2c74: nibbles fold back to 11380; digit sum 25 ≡ 11380 (mod 15). -/
theorem enumeration_hex4_2c74 : reassembles 11380 = true ∧ castsFifteens 11380 = true := by decide

/-- 2c75: nibbles fold back to 11381; digit sum 26 ≡ 11381 (mod 15). -/
theorem enumeration_hex4_2c75 : reassembles 11381 = true ∧ castsFifteens 11381 = true := by decide

/-- 2c76: nibbles fold back to 11382; digit sum 27 ≡ 11382 (mod 15). -/
theorem enumeration_hex4_2c76 : reassembles 11382 = true ∧ castsFifteens 11382 = true := by decide

/-- 2c77: nibbles fold back to 11383; digit sum 28 ≡ 11383 (mod 15). -/
theorem enumeration_hex4_2c77 : reassembles 11383 = true ∧ castsFifteens 11383 = true := by decide

/-- 2c78: nibbles fold back to 11384; digit sum 29 ≡ 11384 (mod 15). -/
theorem enumeration_hex4_2c78 : reassembles 11384 = true ∧ castsFifteens 11384 = true := by decide

/-- 2c79: nibbles fold back to 11385; digit sum 30 ≡ 11385 (mod 15). -/
theorem enumeration_hex4_2c79 : reassembles 11385 = true ∧ castsFifteens 11385 = true := by decide

/-- 2c7a: nibbles fold back to 11386; digit sum 31 ≡ 11386 (mod 15). -/
theorem enumeration_hex4_2c7a : reassembles 11386 = true ∧ castsFifteens 11386 = true := by decide

/-- 2c7b: nibbles fold back to 11387; digit sum 32 ≡ 11387 (mod 15). -/
theorem enumeration_hex4_2c7b : reassembles 11387 = true ∧ castsFifteens 11387 = true := by decide

/-- 2c7c: nibbles fold back to 11388; digit sum 33 ≡ 11388 (mod 15). -/
theorem enumeration_hex4_2c7c : reassembles 11388 = true ∧ castsFifteens 11388 = true := by decide

/-- 2c7d: nibbles fold back to 11389; digit sum 34 ≡ 11389 (mod 15). -/
theorem enumeration_hex4_2c7d : reassembles 11389 = true ∧ castsFifteens 11389 = true := by decide

/-- 2c7e: nibbles fold back to 11390; digit sum 35 ≡ 11390 (mod 15). -/
theorem enumeration_hex4_2c7e : reassembles 11390 = true ∧ castsFifteens 11390 = true := by decide

/-- 2c7f: nibbles fold back to 11391; digit sum 36 ≡ 11391 (mod 15). -/
theorem enumeration_hex4_2c7f : reassembles 11391 = true ∧ castsFifteens 11391 = true := by decide

/-- 2c80: nibbles fold back to 11392; digit sum 22 ≡ 11392 (mod 15). -/
theorem enumeration_hex4_2c80 : reassembles 11392 = true ∧ castsFifteens 11392 = true := by decide

/-- 2c81: nibbles fold back to 11393; digit sum 23 ≡ 11393 (mod 15). -/
theorem enumeration_hex4_2c81 : reassembles 11393 = true ∧ castsFifteens 11393 = true := by decide

/-- 2c82: nibbles fold back to 11394; digit sum 24 ≡ 11394 (mod 15). -/
theorem enumeration_hex4_2c82 : reassembles 11394 = true ∧ castsFifteens 11394 = true := by decide

/-- 2c83: nibbles fold back to 11395; digit sum 25 ≡ 11395 (mod 15). -/
theorem enumeration_hex4_2c83 : reassembles 11395 = true ∧ castsFifteens 11395 = true := by decide

/-- 2c84: nibbles fold back to 11396; digit sum 26 ≡ 11396 (mod 15). -/
theorem enumeration_hex4_2c84 : reassembles 11396 = true ∧ castsFifteens 11396 = true := by decide

/-- 2c85: nibbles fold back to 11397; digit sum 27 ≡ 11397 (mod 15). -/
theorem enumeration_hex4_2c85 : reassembles 11397 = true ∧ castsFifteens 11397 = true := by decide

/-- 2c86: nibbles fold back to 11398; digit sum 28 ≡ 11398 (mod 15). -/
theorem enumeration_hex4_2c86 : reassembles 11398 = true ∧ castsFifteens 11398 = true := by decide

/-- 2c87: nibbles fold back to 11399; digit sum 29 ≡ 11399 (mod 15). -/
theorem enumeration_hex4_2c87 : reassembles 11399 = true ∧ castsFifteens 11399 = true := by decide

/-- 2c88: nibbles fold back to 11400; digit sum 30 ≡ 11400 (mod 15). -/
theorem enumeration_hex4_2c88 : reassembles 11400 = true ∧ castsFifteens 11400 = true := by decide

/-- 2c89: nibbles fold back to 11401; digit sum 31 ≡ 11401 (mod 15). -/
theorem enumeration_hex4_2c89 : reassembles 11401 = true ∧ castsFifteens 11401 = true := by decide

/-- 2c8a: nibbles fold back to 11402; digit sum 32 ≡ 11402 (mod 15). -/
theorem enumeration_hex4_2c8a : reassembles 11402 = true ∧ castsFifteens 11402 = true := by decide

/-- 2c8b: nibbles fold back to 11403; digit sum 33 ≡ 11403 (mod 15). -/
theorem enumeration_hex4_2c8b : reassembles 11403 = true ∧ castsFifteens 11403 = true := by decide

/-- 2c8c: nibbles fold back to 11404; digit sum 34 ≡ 11404 (mod 15). -/
theorem enumeration_hex4_2c8c : reassembles 11404 = true ∧ castsFifteens 11404 = true := by decide

/-- 2c8d: nibbles fold back to 11405; digit sum 35 ≡ 11405 (mod 15). -/
theorem enumeration_hex4_2c8d : reassembles 11405 = true ∧ castsFifteens 11405 = true := by decide

/-- 2c8e: nibbles fold back to 11406; digit sum 36 ≡ 11406 (mod 15). -/
theorem enumeration_hex4_2c8e : reassembles 11406 = true ∧ castsFifteens 11406 = true := by decide

/-- 2c8f: nibbles fold back to 11407; digit sum 37 ≡ 11407 (mod 15). -/
theorem enumeration_hex4_2c8f : reassembles 11407 = true ∧ castsFifteens 11407 = true := by decide

/-- 2c90: nibbles fold back to 11408; digit sum 23 ≡ 11408 (mod 15). -/
theorem enumeration_hex4_2c90 : reassembles 11408 = true ∧ castsFifteens 11408 = true := by decide

/-- 2c91: nibbles fold back to 11409; digit sum 24 ≡ 11409 (mod 15). -/
theorem enumeration_hex4_2c91 : reassembles 11409 = true ∧ castsFifteens 11409 = true := by decide

/-- 2c92: nibbles fold back to 11410; digit sum 25 ≡ 11410 (mod 15). -/
theorem enumeration_hex4_2c92 : reassembles 11410 = true ∧ castsFifteens 11410 = true := by decide

/-- 2c93: nibbles fold back to 11411; digit sum 26 ≡ 11411 (mod 15). -/
theorem enumeration_hex4_2c93 : reassembles 11411 = true ∧ castsFifteens 11411 = true := by decide

/-- 2c94: nibbles fold back to 11412; digit sum 27 ≡ 11412 (mod 15). -/
theorem enumeration_hex4_2c94 : reassembles 11412 = true ∧ castsFifteens 11412 = true := by decide

/-- 2c95: nibbles fold back to 11413; digit sum 28 ≡ 11413 (mod 15). -/
theorem enumeration_hex4_2c95 : reassembles 11413 = true ∧ castsFifteens 11413 = true := by decide

/-- 2c96: nibbles fold back to 11414; digit sum 29 ≡ 11414 (mod 15). -/
theorem enumeration_hex4_2c96 : reassembles 11414 = true ∧ castsFifteens 11414 = true := by decide

/-- 2c97: nibbles fold back to 11415; digit sum 30 ≡ 11415 (mod 15). -/
theorem enumeration_hex4_2c97 : reassembles 11415 = true ∧ castsFifteens 11415 = true := by decide

/-- 2c98: nibbles fold back to 11416; digit sum 31 ≡ 11416 (mod 15). -/
theorem enumeration_hex4_2c98 : reassembles 11416 = true ∧ castsFifteens 11416 = true := by decide

/-- 2c99: nibbles fold back to 11417; digit sum 32 ≡ 11417 (mod 15). -/
theorem enumeration_hex4_2c99 : reassembles 11417 = true ∧ castsFifteens 11417 = true := by decide

/-- 2c9a: nibbles fold back to 11418; digit sum 33 ≡ 11418 (mod 15). -/
theorem enumeration_hex4_2c9a : reassembles 11418 = true ∧ castsFifteens 11418 = true := by decide

/-- 2c9b: nibbles fold back to 11419; digit sum 34 ≡ 11419 (mod 15). -/
theorem enumeration_hex4_2c9b : reassembles 11419 = true ∧ castsFifteens 11419 = true := by decide

/-- 2c9c: nibbles fold back to 11420; digit sum 35 ≡ 11420 (mod 15). -/
theorem enumeration_hex4_2c9c : reassembles 11420 = true ∧ castsFifteens 11420 = true := by decide

/-- 2c9d: nibbles fold back to 11421; digit sum 36 ≡ 11421 (mod 15). -/
theorem enumeration_hex4_2c9d : reassembles 11421 = true ∧ castsFifteens 11421 = true := by decide

/-- 2c9e: nibbles fold back to 11422; digit sum 37 ≡ 11422 (mod 15). -/
theorem enumeration_hex4_2c9e : reassembles 11422 = true ∧ castsFifteens 11422 = true := by decide

/-- 2c9f: nibbles fold back to 11423; digit sum 38 ≡ 11423 (mod 15). -/
theorem enumeration_hex4_2c9f : reassembles 11423 = true ∧ castsFifteens 11423 = true := by decide

/-- 2ca0: nibbles fold back to 11424; digit sum 24 ≡ 11424 (mod 15). -/
theorem enumeration_hex4_2ca0 : reassembles 11424 = true ∧ castsFifteens 11424 = true := by decide

/-- 2ca1: nibbles fold back to 11425; digit sum 25 ≡ 11425 (mod 15). -/
theorem enumeration_hex4_2ca1 : reassembles 11425 = true ∧ castsFifteens 11425 = true := by decide

/-- 2ca2: nibbles fold back to 11426; digit sum 26 ≡ 11426 (mod 15). -/
theorem enumeration_hex4_2ca2 : reassembles 11426 = true ∧ castsFifteens 11426 = true := by decide

/-- 2ca3: nibbles fold back to 11427; digit sum 27 ≡ 11427 (mod 15). -/
theorem enumeration_hex4_2ca3 : reassembles 11427 = true ∧ castsFifteens 11427 = true := by decide

/-- 2ca4: nibbles fold back to 11428; digit sum 28 ≡ 11428 (mod 15). -/
theorem enumeration_hex4_2ca4 : reassembles 11428 = true ∧ castsFifteens 11428 = true := by decide

/-- 2ca5: nibbles fold back to 11429; digit sum 29 ≡ 11429 (mod 15). -/
theorem enumeration_hex4_2ca5 : reassembles 11429 = true ∧ castsFifteens 11429 = true := by decide

/-- 2ca6: nibbles fold back to 11430; digit sum 30 ≡ 11430 (mod 15). -/
theorem enumeration_hex4_2ca6 : reassembles 11430 = true ∧ castsFifteens 11430 = true := by decide

/-- 2ca7: nibbles fold back to 11431; digit sum 31 ≡ 11431 (mod 15). -/
theorem enumeration_hex4_2ca7 : reassembles 11431 = true ∧ castsFifteens 11431 = true := by decide

/-- 2ca8: nibbles fold back to 11432; digit sum 32 ≡ 11432 (mod 15). -/
theorem enumeration_hex4_2ca8 : reassembles 11432 = true ∧ castsFifteens 11432 = true := by decide

/-- 2ca9: nibbles fold back to 11433; digit sum 33 ≡ 11433 (mod 15). -/
theorem enumeration_hex4_2ca9 : reassembles 11433 = true ∧ castsFifteens 11433 = true := by decide

/-- 2caa: nibbles fold back to 11434; digit sum 34 ≡ 11434 (mod 15). -/
theorem enumeration_hex4_2caa : reassembles 11434 = true ∧ castsFifteens 11434 = true := by decide

/-- 2cab: nibbles fold back to 11435; digit sum 35 ≡ 11435 (mod 15). -/
theorem enumeration_hex4_2cab : reassembles 11435 = true ∧ castsFifteens 11435 = true := by decide

/-- 2cac: nibbles fold back to 11436; digit sum 36 ≡ 11436 (mod 15). -/
theorem enumeration_hex4_2cac : reassembles 11436 = true ∧ castsFifteens 11436 = true := by decide

/-- 2cad: nibbles fold back to 11437; digit sum 37 ≡ 11437 (mod 15). -/
theorem enumeration_hex4_2cad : reassembles 11437 = true ∧ castsFifteens 11437 = true := by decide

/-- 2cae: nibbles fold back to 11438; digit sum 38 ≡ 11438 (mod 15). -/
theorem enumeration_hex4_2cae : reassembles 11438 = true ∧ castsFifteens 11438 = true := by decide

/-- 2caf: nibbles fold back to 11439; digit sum 39 ≡ 11439 (mod 15). -/
theorem enumeration_hex4_2caf : reassembles 11439 = true ∧ castsFifteens 11439 = true := by decide

/-- 2cb0: nibbles fold back to 11440; digit sum 25 ≡ 11440 (mod 15). -/
theorem enumeration_hex4_2cb0 : reassembles 11440 = true ∧ castsFifteens 11440 = true := by decide

/-- 2cb1: nibbles fold back to 11441; digit sum 26 ≡ 11441 (mod 15). -/
theorem enumeration_hex4_2cb1 : reassembles 11441 = true ∧ castsFifteens 11441 = true := by decide

/-- 2cb2: nibbles fold back to 11442; digit sum 27 ≡ 11442 (mod 15). -/
theorem enumeration_hex4_2cb2 : reassembles 11442 = true ∧ castsFifteens 11442 = true := by decide

/-- 2cb3: nibbles fold back to 11443; digit sum 28 ≡ 11443 (mod 15). -/
theorem enumeration_hex4_2cb3 : reassembles 11443 = true ∧ castsFifteens 11443 = true := by decide

/-- 2cb4: nibbles fold back to 11444; digit sum 29 ≡ 11444 (mod 15). -/
theorem enumeration_hex4_2cb4 : reassembles 11444 = true ∧ castsFifteens 11444 = true := by decide

/-- 2cb5: nibbles fold back to 11445; digit sum 30 ≡ 11445 (mod 15). -/
theorem enumeration_hex4_2cb5 : reassembles 11445 = true ∧ castsFifteens 11445 = true := by decide

/-- 2cb6: nibbles fold back to 11446; digit sum 31 ≡ 11446 (mod 15). -/
theorem enumeration_hex4_2cb6 : reassembles 11446 = true ∧ castsFifteens 11446 = true := by decide

/-- 2cb7: nibbles fold back to 11447; digit sum 32 ≡ 11447 (mod 15). -/
theorem enumeration_hex4_2cb7 : reassembles 11447 = true ∧ castsFifteens 11447 = true := by decide

/-- 2cb8: nibbles fold back to 11448; digit sum 33 ≡ 11448 (mod 15). -/
theorem enumeration_hex4_2cb8 : reassembles 11448 = true ∧ castsFifteens 11448 = true := by decide

/-- 2cb9: nibbles fold back to 11449; digit sum 34 ≡ 11449 (mod 15). -/
theorem enumeration_hex4_2cb9 : reassembles 11449 = true ∧ castsFifteens 11449 = true := by decide

/-- 2cba: nibbles fold back to 11450; digit sum 35 ≡ 11450 (mod 15). -/
theorem enumeration_hex4_2cba : reassembles 11450 = true ∧ castsFifteens 11450 = true := by decide

/-- 2cbb: nibbles fold back to 11451; digit sum 36 ≡ 11451 (mod 15). -/
theorem enumeration_hex4_2cbb : reassembles 11451 = true ∧ castsFifteens 11451 = true := by decide

/-- 2cbc: nibbles fold back to 11452; digit sum 37 ≡ 11452 (mod 15). -/
theorem enumeration_hex4_2cbc : reassembles 11452 = true ∧ castsFifteens 11452 = true := by decide

/-- 2cbd: nibbles fold back to 11453; digit sum 38 ≡ 11453 (mod 15). -/
theorem enumeration_hex4_2cbd : reassembles 11453 = true ∧ castsFifteens 11453 = true := by decide

/-- 2cbe: nibbles fold back to 11454; digit sum 39 ≡ 11454 (mod 15). -/
theorem enumeration_hex4_2cbe : reassembles 11454 = true ∧ castsFifteens 11454 = true := by decide

/-- 2cbf: nibbles fold back to 11455; digit sum 40 ≡ 11455 (mod 15). -/
theorem enumeration_hex4_2cbf : reassembles 11455 = true ∧ castsFifteens 11455 = true := by decide

/-- 2cc0: nibbles fold back to 11456; digit sum 26 ≡ 11456 (mod 15). -/
theorem enumeration_hex4_2cc0 : reassembles 11456 = true ∧ castsFifteens 11456 = true := by decide

/-- 2cc1: nibbles fold back to 11457; digit sum 27 ≡ 11457 (mod 15). -/
theorem enumeration_hex4_2cc1 : reassembles 11457 = true ∧ castsFifteens 11457 = true := by decide

/-- 2cc2: nibbles fold back to 11458; digit sum 28 ≡ 11458 (mod 15). -/
theorem enumeration_hex4_2cc2 : reassembles 11458 = true ∧ castsFifteens 11458 = true := by decide

/-- 2cc3: nibbles fold back to 11459; digit sum 29 ≡ 11459 (mod 15). -/
theorem enumeration_hex4_2cc3 : reassembles 11459 = true ∧ castsFifteens 11459 = true := by decide

/-- 2cc4: nibbles fold back to 11460; digit sum 30 ≡ 11460 (mod 15). -/
theorem enumeration_hex4_2cc4 : reassembles 11460 = true ∧ castsFifteens 11460 = true := by decide

/-- 2cc5: nibbles fold back to 11461; digit sum 31 ≡ 11461 (mod 15). -/
theorem enumeration_hex4_2cc5 : reassembles 11461 = true ∧ castsFifteens 11461 = true := by decide

/-- 2cc6: nibbles fold back to 11462; digit sum 32 ≡ 11462 (mod 15). -/
theorem enumeration_hex4_2cc6 : reassembles 11462 = true ∧ castsFifteens 11462 = true := by decide

/-- 2cc7: nibbles fold back to 11463; digit sum 33 ≡ 11463 (mod 15). -/
theorem enumeration_hex4_2cc7 : reassembles 11463 = true ∧ castsFifteens 11463 = true := by decide

/-- 2cc8: nibbles fold back to 11464; digit sum 34 ≡ 11464 (mod 15). -/
theorem enumeration_hex4_2cc8 : reassembles 11464 = true ∧ castsFifteens 11464 = true := by decide

/-- 2cc9: nibbles fold back to 11465; digit sum 35 ≡ 11465 (mod 15). -/
theorem enumeration_hex4_2cc9 : reassembles 11465 = true ∧ castsFifteens 11465 = true := by decide

/-- 2cca: nibbles fold back to 11466; digit sum 36 ≡ 11466 (mod 15). -/
theorem enumeration_hex4_2cca : reassembles 11466 = true ∧ castsFifteens 11466 = true := by decide

/-- 2ccb: nibbles fold back to 11467; digit sum 37 ≡ 11467 (mod 15). -/
theorem enumeration_hex4_2ccb : reassembles 11467 = true ∧ castsFifteens 11467 = true := by decide

/-- 2ccc: nibbles fold back to 11468; digit sum 38 ≡ 11468 (mod 15). -/
theorem enumeration_hex4_2ccc : reassembles 11468 = true ∧ castsFifteens 11468 = true := by decide

/-- 2ccd: nibbles fold back to 11469; digit sum 39 ≡ 11469 (mod 15). -/
theorem enumeration_hex4_2ccd : reassembles 11469 = true ∧ castsFifteens 11469 = true := by decide

/-- 2cce: nibbles fold back to 11470; digit sum 40 ≡ 11470 (mod 15). -/
theorem enumeration_hex4_2cce : reassembles 11470 = true ∧ castsFifteens 11470 = true := by decide

/-- 2ccf: nibbles fold back to 11471; digit sum 41 ≡ 11471 (mod 15). -/
theorem enumeration_hex4_2ccf : reassembles 11471 = true ∧ castsFifteens 11471 = true := by decide

/-- 2cd0: nibbles fold back to 11472; digit sum 27 ≡ 11472 (mod 15). -/
theorem enumeration_hex4_2cd0 : reassembles 11472 = true ∧ castsFifteens 11472 = true := by decide

/-- 2cd1: nibbles fold back to 11473; digit sum 28 ≡ 11473 (mod 15). -/
theorem enumeration_hex4_2cd1 : reassembles 11473 = true ∧ castsFifteens 11473 = true := by decide

/-- 2cd2: nibbles fold back to 11474; digit sum 29 ≡ 11474 (mod 15). -/
theorem enumeration_hex4_2cd2 : reassembles 11474 = true ∧ castsFifteens 11474 = true := by decide

/-- 2cd3: nibbles fold back to 11475; digit sum 30 ≡ 11475 (mod 15). -/
theorem enumeration_hex4_2cd3 : reassembles 11475 = true ∧ castsFifteens 11475 = true := by decide

/-- 2cd4: nibbles fold back to 11476; digit sum 31 ≡ 11476 (mod 15). -/
theorem enumeration_hex4_2cd4 : reassembles 11476 = true ∧ castsFifteens 11476 = true := by decide

/-- 2cd5: nibbles fold back to 11477; digit sum 32 ≡ 11477 (mod 15). -/
theorem enumeration_hex4_2cd5 : reassembles 11477 = true ∧ castsFifteens 11477 = true := by decide

/-- 2cd6: nibbles fold back to 11478; digit sum 33 ≡ 11478 (mod 15). -/
theorem enumeration_hex4_2cd6 : reassembles 11478 = true ∧ castsFifteens 11478 = true := by decide

/-- 2cd7: nibbles fold back to 11479; digit sum 34 ≡ 11479 (mod 15). -/
theorem enumeration_hex4_2cd7 : reassembles 11479 = true ∧ castsFifteens 11479 = true := by decide

/-- 2cd8: nibbles fold back to 11480; digit sum 35 ≡ 11480 (mod 15). -/
theorem enumeration_hex4_2cd8 : reassembles 11480 = true ∧ castsFifteens 11480 = true := by decide

/-- 2cd9: nibbles fold back to 11481; digit sum 36 ≡ 11481 (mod 15). -/
theorem enumeration_hex4_2cd9 : reassembles 11481 = true ∧ castsFifteens 11481 = true := by decide

/-- 2cda: nibbles fold back to 11482; digit sum 37 ≡ 11482 (mod 15). -/
theorem enumeration_hex4_2cda : reassembles 11482 = true ∧ castsFifteens 11482 = true := by decide

/-- 2cdb: nibbles fold back to 11483; digit sum 38 ≡ 11483 (mod 15). -/
theorem enumeration_hex4_2cdb : reassembles 11483 = true ∧ castsFifteens 11483 = true := by decide

/-- 2cdc: nibbles fold back to 11484; digit sum 39 ≡ 11484 (mod 15). -/
theorem enumeration_hex4_2cdc : reassembles 11484 = true ∧ castsFifteens 11484 = true := by decide

/-- 2cdd: nibbles fold back to 11485; digit sum 40 ≡ 11485 (mod 15). -/
theorem enumeration_hex4_2cdd : reassembles 11485 = true ∧ castsFifteens 11485 = true := by decide

/-- 2cde: nibbles fold back to 11486; digit sum 41 ≡ 11486 (mod 15). -/
theorem enumeration_hex4_2cde : reassembles 11486 = true ∧ castsFifteens 11486 = true := by decide

/-- 2cdf: nibbles fold back to 11487; digit sum 42 ≡ 11487 (mod 15). -/
theorem enumeration_hex4_2cdf : reassembles 11487 = true ∧ castsFifteens 11487 = true := by decide

/-- 2ce0: nibbles fold back to 11488; digit sum 28 ≡ 11488 (mod 15). -/
theorem enumeration_hex4_2ce0 : reassembles 11488 = true ∧ castsFifteens 11488 = true := by decide

/-- 2ce1: nibbles fold back to 11489; digit sum 29 ≡ 11489 (mod 15). -/
theorem enumeration_hex4_2ce1 : reassembles 11489 = true ∧ castsFifteens 11489 = true := by decide

/-- 2ce2: nibbles fold back to 11490; digit sum 30 ≡ 11490 (mod 15). -/
theorem enumeration_hex4_2ce2 : reassembles 11490 = true ∧ castsFifteens 11490 = true := by decide

/-- 2ce3: nibbles fold back to 11491; digit sum 31 ≡ 11491 (mod 15). -/
theorem enumeration_hex4_2ce3 : reassembles 11491 = true ∧ castsFifteens 11491 = true := by decide

/-- 2ce4: nibbles fold back to 11492; digit sum 32 ≡ 11492 (mod 15). -/
theorem enumeration_hex4_2ce4 : reassembles 11492 = true ∧ castsFifteens 11492 = true := by decide

/-- 2ce5: nibbles fold back to 11493; digit sum 33 ≡ 11493 (mod 15). -/
theorem enumeration_hex4_2ce5 : reassembles 11493 = true ∧ castsFifteens 11493 = true := by decide

/-- 2ce6: nibbles fold back to 11494; digit sum 34 ≡ 11494 (mod 15). -/
theorem enumeration_hex4_2ce6 : reassembles 11494 = true ∧ castsFifteens 11494 = true := by decide

/-- 2ce7: nibbles fold back to 11495; digit sum 35 ≡ 11495 (mod 15). -/
theorem enumeration_hex4_2ce7 : reassembles 11495 = true ∧ castsFifteens 11495 = true := by decide

/-- 2ce8: nibbles fold back to 11496; digit sum 36 ≡ 11496 (mod 15). -/
theorem enumeration_hex4_2ce8 : reassembles 11496 = true ∧ castsFifteens 11496 = true := by decide

/-- 2ce9: nibbles fold back to 11497; digit sum 37 ≡ 11497 (mod 15). -/
theorem enumeration_hex4_2ce9 : reassembles 11497 = true ∧ castsFifteens 11497 = true := by decide

/-- 2cea: nibbles fold back to 11498; digit sum 38 ≡ 11498 (mod 15). -/
theorem enumeration_hex4_2cea : reassembles 11498 = true ∧ castsFifteens 11498 = true := by decide

/-- 2ceb: nibbles fold back to 11499; digit sum 39 ≡ 11499 (mod 15). -/
theorem enumeration_hex4_2ceb : reassembles 11499 = true ∧ castsFifteens 11499 = true := by decide

/-- 2cec: nibbles fold back to 11500; digit sum 40 ≡ 11500 (mod 15). -/
theorem enumeration_hex4_2cec : reassembles 11500 = true ∧ castsFifteens 11500 = true := by decide

/-- 2ced: nibbles fold back to 11501; digit sum 41 ≡ 11501 (mod 15). -/
theorem enumeration_hex4_2ced : reassembles 11501 = true ∧ castsFifteens 11501 = true := by decide

/-- 2cee: nibbles fold back to 11502; digit sum 42 ≡ 11502 (mod 15). -/
theorem enumeration_hex4_2cee : reassembles 11502 = true ∧ castsFifteens 11502 = true := by decide

/-- 2cef: nibbles fold back to 11503; digit sum 43 ≡ 11503 (mod 15). -/
theorem enumeration_hex4_2cef : reassembles 11503 = true ∧ castsFifteens 11503 = true := by decide

/-- 2cf0: nibbles fold back to 11504; digit sum 29 ≡ 11504 (mod 15). -/
theorem enumeration_hex4_2cf0 : reassembles 11504 = true ∧ castsFifteens 11504 = true := by decide

/-- 2cf1: nibbles fold back to 11505; digit sum 30 ≡ 11505 (mod 15). -/
theorem enumeration_hex4_2cf1 : reassembles 11505 = true ∧ castsFifteens 11505 = true := by decide

/-- 2cf2: nibbles fold back to 11506; digit sum 31 ≡ 11506 (mod 15). -/
theorem enumeration_hex4_2cf2 : reassembles 11506 = true ∧ castsFifteens 11506 = true := by decide

/-- 2cf3: nibbles fold back to 11507; digit sum 32 ≡ 11507 (mod 15). -/
theorem enumeration_hex4_2cf3 : reassembles 11507 = true ∧ castsFifteens 11507 = true := by decide

/-- 2cf4: nibbles fold back to 11508; digit sum 33 ≡ 11508 (mod 15). -/
theorem enumeration_hex4_2cf4 : reassembles 11508 = true ∧ castsFifteens 11508 = true := by decide

/-- 2cf5: nibbles fold back to 11509; digit sum 34 ≡ 11509 (mod 15). -/
theorem enumeration_hex4_2cf5 : reassembles 11509 = true ∧ castsFifteens 11509 = true := by decide

/-- 2cf6: nibbles fold back to 11510; digit sum 35 ≡ 11510 (mod 15). -/
theorem enumeration_hex4_2cf6 : reassembles 11510 = true ∧ castsFifteens 11510 = true := by decide

/-- 2cf7: nibbles fold back to 11511; digit sum 36 ≡ 11511 (mod 15). -/
theorem enumeration_hex4_2cf7 : reassembles 11511 = true ∧ castsFifteens 11511 = true := by decide

/-- 2cf8: nibbles fold back to 11512; digit sum 37 ≡ 11512 (mod 15). -/
theorem enumeration_hex4_2cf8 : reassembles 11512 = true ∧ castsFifteens 11512 = true := by decide

/-- 2cf9: nibbles fold back to 11513; digit sum 38 ≡ 11513 (mod 15). -/
theorem enumeration_hex4_2cf9 : reassembles 11513 = true ∧ castsFifteens 11513 = true := by decide

/-- 2cfa: nibbles fold back to 11514; digit sum 39 ≡ 11514 (mod 15). -/
theorem enumeration_hex4_2cfa : reassembles 11514 = true ∧ castsFifteens 11514 = true := by decide

/-- 2cfb: nibbles fold back to 11515; digit sum 40 ≡ 11515 (mod 15). -/
theorem enumeration_hex4_2cfb : reassembles 11515 = true ∧ castsFifteens 11515 = true := by decide

/-- 2cfc: nibbles fold back to 11516; digit sum 41 ≡ 11516 (mod 15). -/
theorem enumeration_hex4_2cfc : reassembles 11516 = true ∧ castsFifteens 11516 = true := by decide

/-- 2cfd: nibbles fold back to 11517; digit sum 42 ≡ 11517 (mod 15). -/
theorem enumeration_hex4_2cfd : reassembles 11517 = true ∧ castsFifteens 11517 = true := by decide

/-- 2cfe: nibbles fold back to 11518; digit sum 43 ≡ 11518 (mod 15). -/
theorem enumeration_hex4_2cfe : reassembles 11518 = true ∧ castsFifteens 11518 = true := by decide

/-- 2cff: nibbles fold back to 11519; digit sum 44 ≡ 11519 (mod 15). -/
theorem enumeration_hex4_2cff : reassembles 11519 = true ∧ castsFifteens 11519 = true := by decide

/-- 2d00: nibbles fold back to 11520; digit sum 15 ≡ 11520 (mod 15). -/
theorem enumeration_hex4_2d00 : reassembles 11520 = true ∧ castsFifteens 11520 = true := by decide

/-- 2d01: nibbles fold back to 11521; digit sum 16 ≡ 11521 (mod 15). -/
theorem enumeration_hex4_2d01 : reassembles 11521 = true ∧ castsFifteens 11521 = true := by decide

/-- 2d02: nibbles fold back to 11522; digit sum 17 ≡ 11522 (mod 15). -/
theorem enumeration_hex4_2d02 : reassembles 11522 = true ∧ castsFifteens 11522 = true := by decide

/-- 2d03: nibbles fold back to 11523; digit sum 18 ≡ 11523 (mod 15). -/
theorem enumeration_hex4_2d03 : reassembles 11523 = true ∧ castsFifteens 11523 = true := by decide

/-- 2d04: nibbles fold back to 11524; digit sum 19 ≡ 11524 (mod 15). -/
theorem enumeration_hex4_2d04 : reassembles 11524 = true ∧ castsFifteens 11524 = true := by decide

/-- 2d05: nibbles fold back to 11525; digit sum 20 ≡ 11525 (mod 15). -/
theorem enumeration_hex4_2d05 : reassembles 11525 = true ∧ castsFifteens 11525 = true := by decide

/-- 2d06: nibbles fold back to 11526; digit sum 21 ≡ 11526 (mod 15). -/
theorem enumeration_hex4_2d06 : reassembles 11526 = true ∧ castsFifteens 11526 = true := by decide

/-- 2d07: nibbles fold back to 11527; digit sum 22 ≡ 11527 (mod 15). -/
theorem enumeration_hex4_2d07 : reassembles 11527 = true ∧ castsFifteens 11527 = true := by decide

/-- 2d08: nibbles fold back to 11528; digit sum 23 ≡ 11528 (mod 15). -/
theorem enumeration_hex4_2d08 : reassembles 11528 = true ∧ castsFifteens 11528 = true := by decide

/-- 2d09: nibbles fold back to 11529; digit sum 24 ≡ 11529 (mod 15). -/
theorem enumeration_hex4_2d09 : reassembles 11529 = true ∧ castsFifteens 11529 = true := by decide

/-- 2d0a: nibbles fold back to 11530; digit sum 25 ≡ 11530 (mod 15). -/
theorem enumeration_hex4_2d0a : reassembles 11530 = true ∧ castsFifteens 11530 = true := by decide

/-- 2d0b: nibbles fold back to 11531; digit sum 26 ≡ 11531 (mod 15). -/
theorem enumeration_hex4_2d0b : reassembles 11531 = true ∧ castsFifteens 11531 = true := by decide

/-- 2d0c: nibbles fold back to 11532; digit sum 27 ≡ 11532 (mod 15). -/
theorem enumeration_hex4_2d0c : reassembles 11532 = true ∧ castsFifteens 11532 = true := by decide

/-- 2d0d: nibbles fold back to 11533; digit sum 28 ≡ 11533 (mod 15). -/
theorem enumeration_hex4_2d0d : reassembles 11533 = true ∧ castsFifteens 11533 = true := by decide

/-- 2d0e: nibbles fold back to 11534; digit sum 29 ≡ 11534 (mod 15). -/
theorem enumeration_hex4_2d0e : reassembles 11534 = true ∧ castsFifteens 11534 = true := by decide

/-- 2d0f: nibbles fold back to 11535; digit sum 30 ≡ 11535 (mod 15). -/
theorem enumeration_hex4_2d0f : reassembles 11535 = true ∧ castsFifteens 11535 = true := by decide

/-- 2d10: nibbles fold back to 11536; digit sum 16 ≡ 11536 (mod 15). -/
theorem enumeration_hex4_2d10 : reassembles 11536 = true ∧ castsFifteens 11536 = true := by decide

/-- 2d11: nibbles fold back to 11537; digit sum 17 ≡ 11537 (mod 15). -/
theorem enumeration_hex4_2d11 : reassembles 11537 = true ∧ castsFifteens 11537 = true := by decide

/-- 2d12: nibbles fold back to 11538; digit sum 18 ≡ 11538 (mod 15). -/
theorem enumeration_hex4_2d12 : reassembles 11538 = true ∧ castsFifteens 11538 = true := by decide

/-- 2d13: nibbles fold back to 11539; digit sum 19 ≡ 11539 (mod 15). -/
theorem enumeration_hex4_2d13 : reassembles 11539 = true ∧ castsFifteens 11539 = true := by decide

/-- 2d14: nibbles fold back to 11540; digit sum 20 ≡ 11540 (mod 15). -/
theorem enumeration_hex4_2d14 : reassembles 11540 = true ∧ castsFifteens 11540 = true := by decide

/-- 2d15: nibbles fold back to 11541; digit sum 21 ≡ 11541 (mod 15). -/
theorem enumeration_hex4_2d15 : reassembles 11541 = true ∧ castsFifteens 11541 = true := by decide

/-- 2d16: nibbles fold back to 11542; digit sum 22 ≡ 11542 (mod 15). -/
theorem enumeration_hex4_2d16 : reassembles 11542 = true ∧ castsFifteens 11542 = true := by decide

/-- 2d17: nibbles fold back to 11543; digit sum 23 ≡ 11543 (mod 15). -/
theorem enumeration_hex4_2d17 : reassembles 11543 = true ∧ castsFifteens 11543 = true := by decide

/-- 2d18: nibbles fold back to 11544; digit sum 24 ≡ 11544 (mod 15). -/
theorem enumeration_hex4_2d18 : reassembles 11544 = true ∧ castsFifteens 11544 = true := by decide

/-- 2d19: nibbles fold back to 11545; digit sum 25 ≡ 11545 (mod 15). -/
theorem enumeration_hex4_2d19 : reassembles 11545 = true ∧ castsFifteens 11545 = true := by decide

/-- 2d1a: nibbles fold back to 11546; digit sum 26 ≡ 11546 (mod 15). -/
theorem enumeration_hex4_2d1a : reassembles 11546 = true ∧ castsFifteens 11546 = true := by decide

/-- 2d1b: nibbles fold back to 11547; digit sum 27 ≡ 11547 (mod 15). -/
theorem enumeration_hex4_2d1b : reassembles 11547 = true ∧ castsFifteens 11547 = true := by decide

/-- 2d1c: nibbles fold back to 11548; digit sum 28 ≡ 11548 (mod 15). -/
theorem enumeration_hex4_2d1c : reassembles 11548 = true ∧ castsFifteens 11548 = true := by decide

/-- 2d1d: nibbles fold back to 11549; digit sum 29 ≡ 11549 (mod 15). -/
theorem enumeration_hex4_2d1d : reassembles 11549 = true ∧ castsFifteens 11549 = true := by decide

/-- 2d1e: nibbles fold back to 11550; digit sum 30 ≡ 11550 (mod 15). -/
theorem enumeration_hex4_2d1e : reassembles 11550 = true ∧ castsFifteens 11550 = true := by decide

/-- 2d1f: nibbles fold back to 11551; digit sum 31 ≡ 11551 (mod 15). -/
theorem enumeration_hex4_2d1f : reassembles 11551 = true ∧ castsFifteens 11551 = true := by decide

/-- 2d20: nibbles fold back to 11552; digit sum 17 ≡ 11552 (mod 15). -/
theorem enumeration_hex4_2d20 : reassembles 11552 = true ∧ castsFifteens 11552 = true := by decide

/-- 2d21: nibbles fold back to 11553; digit sum 18 ≡ 11553 (mod 15). -/
theorem enumeration_hex4_2d21 : reassembles 11553 = true ∧ castsFifteens 11553 = true := by decide

/-- 2d22: nibbles fold back to 11554; digit sum 19 ≡ 11554 (mod 15). -/
theorem enumeration_hex4_2d22 : reassembles 11554 = true ∧ castsFifteens 11554 = true := by decide

/-- 2d23: nibbles fold back to 11555; digit sum 20 ≡ 11555 (mod 15). -/
theorem enumeration_hex4_2d23 : reassembles 11555 = true ∧ castsFifteens 11555 = true := by decide

/-- 2d24: nibbles fold back to 11556; digit sum 21 ≡ 11556 (mod 15). -/
theorem enumeration_hex4_2d24 : reassembles 11556 = true ∧ castsFifteens 11556 = true := by decide

/-- 2d25: nibbles fold back to 11557; digit sum 22 ≡ 11557 (mod 15). -/
theorem enumeration_hex4_2d25 : reassembles 11557 = true ∧ castsFifteens 11557 = true := by decide

/-- 2d26: nibbles fold back to 11558; digit sum 23 ≡ 11558 (mod 15). -/
theorem enumeration_hex4_2d26 : reassembles 11558 = true ∧ castsFifteens 11558 = true := by decide

/-- 2d27: nibbles fold back to 11559; digit sum 24 ≡ 11559 (mod 15). -/
theorem enumeration_hex4_2d27 : reassembles 11559 = true ∧ castsFifteens 11559 = true := by decide

/-- 2d28: nibbles fold back to 11560; digit sum 25 ≡ 11560 (mod 15). -/
theorem enumeration_hex4_2d28 : reassembles 11560 = true ∧ castsFifteens 11560 = true := by decide

/-- 2d29: nibbles fold back to 11561; digit sum 26 ≡ 11561 (mod 15). -/
theorem enumeration_hex4_2d29 : reassembles 11561 = true ∧ castsFifteens 11561 = true := by decide

/-- 2d2a: nibbles fold back to 11562; digit sum 27 ≡ 11562 (mod 15). -/
theorem enumeration_hex4_2d2a : reassembles 11562 = true ∧ castsFifteens 11562 = true := by decide

/-- 2d2b: nibbles fold back to 11563; digit sum 28 ≡ 11563 (mod 15). -/
theorem enumeration_hex4_2d2b : reassembles 11563 = true ∧ castsFifteens 11563 = true := by decide

/-- 2d2c: nibbles fold back to 11564; digit sum 29 ≡ 11564 (mod 15). -/
theorem enumeration_hex4_2d2c : reassembles 11564 = true ∧ castsFifteens 11564 = true := by decide

/-- 2d2d: nibbles fold back to 11565; digit sum 30 ≡ 11565 (mod 15). -/
theorem enumeration_hex4_2d2d : reassembles 11565 = true ∧ castsFifteens 11565 = true := by decide

/-- 2d2e: nibbles fold back to 11566; digit sum 31 ≡ 11566 (mod 15). -/
theorem enumeration_hex4_2d2e : reassembles 11566 = true ∧ castsFifteens 11566 = true := by decide

/-- 2d2f: nibbles fold back to 11567; digit sum 32 ≡ 11567 (mod 15). -/
theorem enumeration_hex4_2d2f : reassembles 11567 = true ∧ castsFifteens 11567 = true := by decide

/-- 2d30: nibbles fold back to 11568; digit sum 18 ≡ 11568 (mod 15). -/
theorem enumeration_hex4_2d30 : reassembles 11568 = true ∧ castsFifteens 11568 = true := by decide

/-- 2d31: nibbles fold back to 11569; digit sum 19 ≡ 11569 (mod 15). -/
theorem enumeration_hex4_2d31 : reassembles 11569 = true ∧ castsFifteens 11569 = true := by decide

/-- 2d32: nibbles fold back to 11570; digit sum 20 ≡ 11570 (mod 15). -/
theorem enumeration_hex4_2d32 : reassembles 11570 = true ∧ castsFifteens 11570 = true := by decide

/-- 2d33: nibbles fold back to 11571; digit sum 21 ≡ 11571 (mod 15). -/
theorem enumeration_hex4_2d33 : reassembles 11571 = true ∧ castsFifteens 11571 = true := by decide

/-- 2d34: nibbles fold back to 11572; digit sum 22 ≡ 11572 (mod 15). -/
theorem enumeration_hex4_2d34 : reassembles 11572 = true ∧ castsFifteens 11572 = true := by decide

/-- 2d35: nibbles fold back to 11573; digit sum 23 ≡ 11573 (mod 15). -/
theorem enumeration_hex4_2d35 : reassembles 11573 = true ∧ castsFifteens 11573 = true := by decide

/-- 2d36: nibbles fold back to 11574; digit sum 24 ≡ 11574 (mod 15). -/
theorem enumeration_hex4_2d36 : reassembles 11574 = true ∧ castsFifteens 11574 = true := by decide

/-- 2d37: nibbles fold back to 11575; digit sum 25 ≡ 11575 (mod 15). -/
theorem enumeration_hex4_2d37 : reassembles 11575 = true ∧ castsFifteens 11575 = true := by decide

/-- 2d38: nibbles fold back to 11576; digit sum 26 ≡ 11576 (mod 15). -/
theorem enumeration_hex4_2d38 : reassembles 11576 = true ∧ castsFifteens 11576 = true := by decide

/-- 2d39: nibbles fold back to 11577; digit sum 27 ≡ 11577 (mod 15). -/
theorem enumeration_hex4_2d39 : reassembles 11577 = true ∧ castsFifteens 11577 = true := by decide

/-- 2d3a: nibbles fold back to 11578; digit sum 28 ≡ 11578 (mod 15). -/
theorem enumeration_hex4_2d3a : reassembles 11578 = true ∧ castsFifteens 11578 = true := by decide

/-- 2d3b: nibbles fold back to 11579; digit sum 29 ≡ 11579 (mod 15). -/
theorem enumeration_hex4_2d3b : reassembles 11579 = true ∧ castsFifteens 11579 = true := by decide

/-- 2d3c: nibbles fold back to 11580; digit sum 30 ≡ 11580 (mod 15). -/
theorem enumeration_hex4_2d3c : reassembles 11580 = true ∧ castsFifteens 11580 = true := by decide

/-- 2d3d: nibbles fold back to 11581; digit sum 31 ≡ 11581 (mod 15). -/
theorem enumeration_hex4_2d3d : reassembles 11581 = true ∧ castsFifteens 11581 = true := by decide

/-- 2d3e: nibbles fold back to 11582; digit sum 32 ≡ 11582 (mod 15). -/
theorem enumeration_hex4_2d3e : reassembles 11582 = true ∧ castsFifteens 11582 = true := by decide

/-- 2d3f: nibbles fold back to 11583; digit sum 33 ≡ 11583 (mod 15). -/
theorem enumeration_hex4_2d3f : reassembles 11583 = true ∧ castsFifteens 11583 = true := by decide

/-- 2d40: nibbles fold back to 11584; digit sum 19 ≡ 11584 (mod 15). -/
theorem enumeration_hex4_2d40 : reassembles 11584 = true ∧ castsFifteens 11584 = true := by decide

/-- 2d41: nibbles fold back to 11585; digit sum 20 ≡ 11585 (mod 15). -/
theorem enumeration_hex4_2d41 : reassembles 11585 = true ∧ castsFifteens 11585 = true := by decide

/-- 2d42: nibbles fold back to 11586; digit sum 21 ≡ 11586 (mod 15). -/
theorem enumeration_hex4_2d42 : reassembles 11586 = true ∧ castsFifteens 11586 = true := by decide

/-- 2d43: nibbles fold back to 11587; digit sum 22 ≡ 11587 (mod 15). -/
theorem enumeration_hex4_2d43 : reassembles 11587 = true ∧ castsFifteens 11587 = true := by decide

/-- 2d44: nibbles fold back to 11588; digit sum 23 ≡ 11588 (mod 15). -/
theorem enumeration_hex4_2d44 : reassembles 11588 = true ∧ castsFifteens 11588 = true := by decide

/-- 2d45: nibbles fold back to 11589; digit sum 24 ≡ 11589 (mod 15). -/
theorem enumeration_hex4_2d45 : reassembles 11589 = true ∧ castsFifteens 11589 = true := by decide

/-- 2d46: nibbles fold back to 11590; digit sum 25 ≡ 11590 (mod 15). -/
theorem enumeration_hex4_2d46 : reassembles 11590 = true ∧ castsFifteens 11590 = true := by decide

/-- 2d47: nibbles fold back to 11591; digit sum 26 ≡ 11591 (mod 15). -/
theorem enumeration_hex4_2d47 : reassembles 11591 = true ∧ castsFifteens 11591 = true := by decide

/-- 2d48: nibbles fold back to 11592; digit sum 27 ≡ 11592 (mod 15). -/
theorem enumeration_hex4_2d48 : reassembles 11592 = true ∧ castsFifteens 11592 = true := by decide

/-- 2d49: nibbles fold back to 11593; digit sum 28 ≡ 11593 (mod 15). -/
theorem enumeration_hex4_2d49 : reassembles 11593 = true ∧ castsFifteens 11593 = true := by decide

/-- 2d4a: nibbles fold back to 11594; digit sum 29 ≡ 11594 (mod 15). -/
theorem enumeration_hex4_2d4a : reassembles 11594 = true ∧ castsFifteens 11594 = true := by decide

/-- 2d4b: nibbles fold back to 11595; digit sum 30 ≡ 11595 (mod 15). -/
theorem enumeration_hex4_2d4b : reassembles 11595 = true ∧ castsFifteens 11595 = true := by decide

/-- 2d4c: nibbles fold back to 11596; digit sum 31 ≡ 11596 (mod 15). -/
theorem enumeration_hex4_2d4c : reassembles 11596 = true ∧ castsFifteens 11596 = true := by decide

/-- 2d4d: nibbles fold back to 11597; digit sum 32 ≡ 11597 (mod 15). -/
theorem enumeration_hex4_2d4d : reassembles 11597 = true ∧ castsFifteens 11597 = true := by decide

/-- 2d4e: nibbles fold back to 11598; digit sum 33 ≡ 11598 (mod 15). -/
theorem enumeration_hex4_2d4e : reassembles 11598 = true ∧ castsFifteens 11598 = true := by decide

/-- 2d4f: nibbles fold back to 11599; digit sum 34 ≡ 11599 (mod 15). -/
theorem enumeration_hex4_2d4f : reassembles 11599 = true ∧ castsFifteens 11599 = true := by decide

/-- 2d50: nibbles fold back to 11600; digit sum 20 ≡ 11600 (mod 15). -/
theorem enumeration_hex4_2d50 : reassembles 11600 = true ∧ castsFifteens 11600 = true := by decide

/-- 2d51: nibbles fold back to 11601; digit sum 21 ≡ 11601 (mod 15). -/
theorem enumeration_hex4_2d51 : reassembles 11601 = true ∧ castsFifteens 11601 = true := by decide

/-- 2d52: nibbles fold back to 11602; digit sum 22 ≡ 11602 (mod 15). -/
theorem enumeration_hex4_2d52 : reassembles 11602 = true ∧ castsFifteens 11602 = true := by decide

/-- 2d53: nibbles fold back to 11603; digit sum 23 ≡ 11603 (mod 15). -/
theorem enumeration_hex4_2d53 : reassembles 11603 = true ∧ castsFifteens 11603 = true := by decide

/-- 2d54: nibbles fold back to 11604; digit sum 24 ≡ 11604 (mod 15). -/
theorem enumeration_hex4_2d54 : reassembles 11604 = true ∧ castsFifteens 11604 = true := by decide

/-- 2d55: nibbles fold back to 11605; digit sum 25 ≡ 11605 (mod 15). -/
theorem enumeration_hex4_2d55 : reassembles 11605 = true ∧ castsFifteens 11605 = true := by decide

/-- 2d56: nibbles fold back to 11606; digit sum 26 ≡ 11606 (mod 15). -/
theorem enumeration_hex4_2d56 : reassembles 11606 = true ∧ castsFifteens 11606 = true := by decide

/-- 2d57: nibbles fold back to 11607; digit sum 27 ≡ 11607 (mod 15). -/
theorem enumeration_hex4_2d57 : reassembles 11607 = true ∧ castsFifteens 11607 = true := by decide

/-- 2d58: nibbles fold back to 11608; digit sum 28 ≡ 11608 (mod 15). -/
theorem enumeration_hex4_2d58 : reassembles 11608 = true ∧ castsFifteens 11608 = true := by decide

/-- 2d59: nibbles fold back to 11609; digit sum 29 ≡ 11609 (mod 15). -/
theorem enumeration_hex4_2d59 : reassembles 11609 = true ∧ castsFifteens 11609 = true := by decide

/-- 2d5a: nibbles fold back to 11610; digit sum 30 ≡ 11610 (mod 15). -/
theorem enumeration_hex4_2d5a : reassembles 11610 = true ∧ castsFifteens 11610 = true := by decide

/-- 2d5b: nibbles fold back to 11611; digit sum 31 ≡ 11611 (mod 15). -/
theorem enumeration_hex4_2d5b : reassembles 11611 = true ∧ castsFifteens 11611 = true := by decide

/-- 2d5c: nibbles fold back to 11612; digit sum 32 ≡ 11612 (mod 15). -/
theorem enumeration_hex4_2d5c : reassembles 11612 = true ∧ castsFifteens 11612 = true := by decide

/-- 2d5d: nibbles fold back to 11613; digit sum 33 ≡ 11613 (mod 15). -/
theorem enumeration_hex4_2d5d : reassembles 11613 = true ∧ castsFifteens 11613 = true := by decide

/-- 2d5e: nibbles fold back to 11614; digit sum 34 ≡ 11614 (mod 15). -/
theorem enumeration_hex4_2d5e : reassembles 11614 = true ∧ castsFifteens 11614 = true := by decide

/-- 2d5f: nibbles fold back to 11615; digit sum 35 ≡ 11615 (mod 15). -/
theorem enumeration_hex4_2d5f : reassembles 11615 = true ∧ castsFifteens 11615 = true := by decide

/-- 2d60: nibbles fold back to 11616; digit sum 21 ≡ 11616 (mod 15). -/
theorem enumeration_hex4_2d60 : reassembles 11616 = true ∧ castsFifteens 11616 = true := by decide

/-- 2d61: nibbles fold back to 11617; digit sum 22 ≡ 11617 (mod 15). -/
theorem enumeration_hex4_2d61 : reassembles 11617 = true ∧ castsFifteens 11617 = true := by decide

/-- 2d62: nibbles fold back to 11618; digit sum 23 ≡ 11618 (mod 15). -/
theorem enumeration_hex4_2d62 : reassembles 11618 = true ∧ castsFifteens 11618 = true := by decide

/-- 2d63: nibbles fold back to 11619; digit sum 24 ≡ 11619 (mod 15). -/
theorem enumeration_hex4_2d63 : reassembles 11619 = true ∧ castsFifteens 11619 = true := by decide

/-- 2d64: nibbles fold back to 11620; digit sum 25 ≡ 11620 (mod 15). -/
theorem enumeration_hex4_2d64 : reassembles 11620 = true ∧ castsFifteens 11620 = true := by decide

/-- 2d65: nibbles fold back to 11621; digit sum 26 ≡ 11621 (mod 15). -/
theorem enumeration_hex4_2d65 : reassembles 11621 = true ∧ castsFifteens 11621 = true := by decide

/-- 2d66: nibbles fold back to 11622; digit sum 27 ≡ 11622 (mod 15). -/
theorem enumeration_hex4_2d66 : reassembles 11622 = true ∧ castsFifteens 11622 = true := by decide

/-- 2d67: nibbles fold back to 11623; digit sum 28 ≡ 11623 (mod 15). -/
theorem enumeration_hex4_2d67 : reassembles 11623 = true ∧ castsFifteens 11623 = true := by decide

/-- 2d68: nibbles fold back to 11624; digit sum 29 ≡ 11624 (mod 15). -/
theorem enumeration_hex4_2d68 : reassembles 11624 = true ∧ castsFifteens 11624 = true := by decide

/-- 2d69: nibbles fold back to 11625; digit sum 30 ≡ 11625 (mod 15). -/
theorem enumeration_hex4_2d69 : reassembles 11625 = true ∧ castsFifteens 11625 = true := by decide

/-- 2d6a: nibbles fold back to 11626; digit sum 31 ≡ 11626 (mod 15). -/
theorem enumeration_hex4_2d6a : reassembles 11626 = true ∧ castsFifteens 11626 = true := by decide

/-- 2d6b: nibbles fold back to 11627; digit sum 32 ≡ 11627 (mod 15). -/
theorem enumeration_hex4_2d6b : reassembles 11627 = true ∧ castsFifteens 11627 = true := by decide

/-- 2d6c: nibbles fold back to 11628; digit sum 33 ≡ 11628 (mod 15). -/
theorem enumeration_hex4_2d6c : reassembles 11628 = true ∧ castsFifteens 11628 = true := by decide

/-- 2d6d: nibbles fold back to 11629; digit sum 34 ≡ 11629 (mod 15). -/
theorem enumeration_hex4_2d6d : reassembles 11629 = true ∧ castsFifteens 11629 = true := by decide

/-- 2d6e: nibbles fold back to 11630; digit sum 35 ≡ 11630 (mod 15). -/
theorem enumeration_hex4_2d6e : reassembles 11630 = true ∧ castsFifteens 11630 = true := by decide

/-- 2d6f: nibbles fold back to 11631; digit sum 36 ≡ 11631 (mod 15). -/
theorem enumeration_hex4_2d6f : reassembles 11631 = true ∧ castsFifteens 11631 = true := by decide

/-- 2d70: nibbles fold back to 11632; digit sum 22 ≡ 11632 (mod 15). -/
theorem enumeration_hex4_2d70 : reassembles 11632 = true ∧ castsFifteens 11632 = true := by decide

/-- 2d71: nibbles fold back to 11633; digit sum 23 ≡ 11633 (mod 15). -/
theorem enumeration_hex4_2d71 : reassembles 11633 = true ∧ castsFifteens 11633 = true := by decide

/-- 2d72: nibbles fold back to 11634; digit sum 24 ≡ 11634 (mod 15). -/
theorem enumeration_hex4_2d72 : reassembles 11634 = true ∧ castsFifteens 11634 = true := by decide

/-- 2d73: nibbles fold back to 11635; digit sum 25 ≡ 11635 (mod 15). -/
theorem enumeration_hex4_2d73 : reassembles 11635 = true ∧ castsFifteens 11635 = true := by decide

/-- 2d74: nibbles fold back to 11636; digit sum 26 ≡ 11636 (mod 15). -/
theorem enumeration_hex4_2d74 : reassembles 11636 = true ∧ castsFifteens 11636 = true := by decide

/-- 2d75: nibbles fold back to 11637; digit sum 27 ≡ 11637 (mod 15). -/
theorem enumeration_hex4_2d75 : reassembles 11637 = true ∧ castsFifteens 11637 = true := by decide

/-- 2d76: nibbles fold back to 11638; digit sum 28 ≡ 11638 (mod 15). -/
theorem enumeration_hex4_2d76 : reassembles 11638 = true ∧ castsFifteens 11638 = true := by decide

/-- 2d77: nibbles fold back to 11639; digit sum 29 ≡ 11639 (mod 15). -/
theorem enumeration_hex4_2d77 : reassembles 11639 = true ∧ castsFifteens 11639 = true := by decide

/-- 2d78: nibbles fold back to 11640; digit sum 30 ≡ 11640 (mod 15). -/
theorem enumeration_hex4_2d78 : reassembles 11640 = true ∧ castsFifteens 11640 = true := by decide

/-- 2d79: nibbles fold back to 11641; digit sum 31 ≡ 11641 (mod 15). -/
theorem enumeration_hex4_2d79 : reassembles 11641 = true ∧ castsFifteens 11641 = true := by decide

/-- 2d7a: nibbles fold back to 11642; digit sum 32 ≡ 11642 (mod 15). -/
theorem enumeration_hex4_2d7a : reassembles 11642 = true ∧ castsFifteens 11642 = true := by decide

/-- 2d7b: nibbles fold back to 11643; digit sum 33 ≡ 11643 (mod 15). -/
theorem enumeration_hex4_2d7b : reassembles 11643 = true ∧ castsFifteens 11643 = true := by decide

/-- 2d7c: nibbles fold back to 11644; digit sum 34 ≡ 11644 (mod 15). -/
theorem enumeration_hex4_2d7c : reassembles 11644 = true ∧ castsFifteens 11644 = true := by decide

/-- 2d7d: nibbles fold back to 11645; digit sum 35 ≡ 11645 (mod 15). -/
theorem enumeration_hex4_2d7d : reassembles 11645 = true ∧ castsFifteens 11645 = true := by decide

/-- 2d7e: nibbles fold back to 11646; digit sum 36 ≡ 11646 (mod 15). -/
theorem enumeration_hex4_2d7e : reassembles 11646 = true ∧ castsFifteens 11646 = true := by decide

/-- 2d7f: nibbles fold back to 11647; digit sum 37 ≡ 11647 (mod 15). -/
theorem enumeration_hex4_2d7f : reassembles 11647 = true ∧ castsFifteens 11647 = true := by decide

/-- 2d80: nibbles fold back to 11648; digit sum 23 ≡ 11648 (mod 15). -/
theorem enumeration_hex4_2d80 : reassembles 11648 = true ∧ castsFifteens 11648 = true := by decide

/-- 2d81: nibbles fold back to 11649; digit sum 24 ≡ 11649 (mod 15). -/
theorem enumeration_hex4_2d81 : reassembles 11649 = true ∧ castsFifteens 11649 = true := by decide

/-- 2d82: nibbles fold back to 11650; digit sum 25 ≡ 11650 (mod 15). -/
theorem enumeration_hex4_2d82 : reassembles 11650 = true ∧ castsFifteens 11650 = true := by decide

/-- 2d83: nibbles fold back to 11651; digit sum 26 ≡ 11651 (mod 15). -/
theorem enumeration_hex4_2d83 : reassembles 11651 = true ∧ castsFifteens 11651 = true := by decide

/-- 2d84: nibbles fold back to 11652; digit sum 27 ≡ 11652 (mod 15). -/
theorem enumeration_hex4_2d84 : reassembles 11652 = true ∧ castsFifteens 11652 = true := by decide

/-- 2d85: nibbles fold back to 11653; digit sum 28 ≡ 11653 (mod 15). -/
theorem enumeration_hex4_2d85 : reassembles 11653 = true ∧ castsFifteens 11653 = true := by decide

/-- 2d86: nibbles fold back to 11654; digit sum 29 ≡ 11654 (mod 15). -/
theorem enumeration_hex4_2d86 : reassembles 11654 = true ∧ castsFifteens 11654 = true := by decide

/-- 2d87: nibbles fold back to 11655; digit sum 30 ≡ 11655 (mod 15). -/
theorem enumeration_hex4_2d87 : reassembles 11655 = true ∧ castsFifteens 11655 = true := by decide

/-- 2d88: nibbles fold back to 11656; digit sum 31 ≡ 11656 (mod 15). -/
theorem enumeration_hex4_2d88 : reassembles 11656 = true ∧ castsFifteens 11656 = true := by decide

/-- 2d89: nibbles fold back to 11657; digit sum 32 ≡ 11657 (mod 15). -/
theorem enumeration_hex4_2d89 : reassembles 11657 = true ∧ castsFifteens 11657 = true := by decide

/-- 2d8a: nibbles fold back to 11658; digit sum 33 ≡ 11658 (mod 15). -/
theorem enumeration_hex4_2d8a : reassembles 11658 = true ∧ castsFifteens 11658 = true := by decide

/-- 2d8b: nibbles fold back to 11659; digit sum 34 ≡ 11659 (mod 15). -/
theorem enumeration_hex4_2d8b : reassembles 11659 = true ∧ castsFifteens 11659 = true := by decide

/-- 2d8c: nibbles fold back to 11660; digit sum 35 ≡ 11660 (mod 15). -/
theorem enumeration_hex4_2d8c : reassembles 11660 = true ∧ castsFifteens 11660 = true := by decide

/-- 2d8d: nibbles fold back to 11661; digit sum 36 ≡ 11661 (mod 15). -/
theorem enumeration_hex4_2d8d : reassembles 11661 = true ∧ castsFifteens 11661 = true := by decide

/-- 2d8e: nibbles fold back to 11662; digit sum 37 ≡ 11662 (mod 15). -/
theorem enumeration_hex4_2d8e : reassembles 11662 = true ∧ castsFifteens 11662 = true := by decide

/-- 2d8f: nibbles fold back to 11663; digit sum 38 ≡ 11663 (mod 15). -/
theorem enumeration_hex4_2d8f : reassembles 11663 = true ∧ castsFifteens 11663 = true := by decide

/-- 2d90: nibbles fold back to 11664; digit sum 24 ≡ 11664 (mod 15). -/
theorem enumeration_hex4_2d90 : reassembles 11664 = true ∧ castsFifteens 11664 = true := by decide

/-- 2d91: nibbles fold back to 11665; digit sum 25 ≡ 11665 (mod 15). -/
theorem enumeration_hex4_2d91 : reassembles 11665 = true ∧ castsFifteens 11665 = true := by decide

/-- 2d92: nibbles fold back to 11666; digit sum 26 ≡ 11666 (mod 15). -/
theorem enumeration_hex4_2d92 : reassembles 11666 = true ∧ castsFifteens 11666 = true := by decide

/-- 2d93: nibbles fold back to 11667; digit sum 27 ≡ 11667 (mod 15). -/
theorem enumeration_hex4_2d93 : reassembles 11667 = true ∧ castsFifteens 11667 = true := by decide

/-- 2d94: nibbles fold back to 11668; digit sum 28 ≡ 11668 (mod 15). -/
theorem enumeration_hex4_2d94 : reassembles 11668 = true ∧ castsFifteens 11668 = true := by decide

/-- 2d95: nibbles fold back to 11669; digit sum 29 ≡ 11669 (mod 15). -/
theorem enumeration_hex4_2d95 : reassembles 11669 = true ∧ castsFifteens 11669 = true := by decide

/-- 2d96: nibbles fold back to 11670; digit sum 30 ≡ 11670 (mod 15). -/
theorem enumeration_hex4_2d96 : reassembles 11670 = true ∧ castsFifteens 11670 = true := by decide

/-- 2d97: nibbles fold back to 11671; digit sum 31 ≡ 11671 (mod 15). -/
theorem enumeration_hex4_2d97 : reassembles 11671 = true ∧ castsFifteens 11671 = true := by decide

/-- 2d98: nibbles fold back to 11672; digit sum 32 ≡ 11672 (mod 15). -/
theorem enumeration_hex4_2d98 : reassembles 11672 = true ∧ castsFifteens 11672 = true := by decide

/-- 2d99: nibbles fold back to 11673; digit sum 33 ≡ 11673 (mod 15). -/
theorem enumeration_hex4_2d99 : reassembles 11673 = true ∧ castsFifteens 11673 = true := by decide

/-- 2d9a: nibbles fold back to 11674; digit sum 34 ≡ 11674 (mod 15). -/
theorem enumeration_hex4_2d9a : reassembles 11674 = true ∧ castsFifteens 11674 = true := by decide

/-- 2d9b: nibbles fold back to 11675; digit sum 35 ≡ 11675 (mod 15). -/
theorem enumeration_hex4_2d9b : reassembles 11675 = true ∧ castsFifteens 11675 = true := by decide

/-- 2d9c: nibbles fold back to 11676; digit sum 36 ≡ 11676 (mod 15). -/
theorem enumeration_hex4_2d9c : reassembles 11676 = true ∧ castsFifteens 11676 = true := by decide

/-- 2d9d: nibbles fold back to 11677; digit sum 37 ≡ 11677 (mod 15). -/
theorem enumeration_hex4_2d9d : reassembles 11677 = true ∧ castsFifteens 11677 = true := by decide

/-- 2d9e: nibbles fold back to 11678; digit sum 38 ≡ 11678 (mod 15). -/
theorem enumeration_hex4_2d9e : reassembles 11678 = true ∧ castsFifteens 11678 = true := by decide

/-- 2d9f: nibbles fold back to 11679; digit sum 39 ≡ 11679 (mod 15). -/
theorem enumeration_hex4_2d9f : reassembles 11679 = true ∧ castsFifteens 11679 = true := by decide

/-- 2da0: nibbles fold back to 11680; digit sum 25 ≡ 11680 (mod 15). -/
theorem enumeration_hex4_2da0 : reassembles 11680 = true ∧ castsFifteens 11680 = true := by decide

/-- 2da1: nibbles fold back to 11681; digit sum 26 ≡ 11681 (mod 15). -/
theorem enumeration_hex4_2da1 : reassembles 11681 = true ∧ castsFifteens 11681 = true := by decide

/-- 2da2: nibbles fold back to 11682; digit sum 27 ≡ 11682 (mod 15). -/
theorem enumeration_hex4_2da2 : reassembles 11682 = true ∧ castsFifteens 11682 = true := by decide

/-- 2da3: nibbles fold back to 11683; digit sum 28 ≡ 11683 (mod 15). -/
theorem enumeration_hex4_2da3 : reassembles 11683 = true ∧ castsFifteens 11683 = true := by decide

/-- 2da4: nibbles fold back to 11684; digit sum 29 ≡ 11684 (mod 15). -/
theorem enumeration_hex4_2da4 : reassembles 11684 = true ∧ castsFifteens 11684 = true := by decide

/-- 2da5: nibbles fold back to 11685; digit sum 30 ≡ 11685 (mod 15). -/
theorem enumeration_hex4_2da5 : reassembles 11685 = true ∧ castsFifteens 11685 = true := by decide

/-- 2da6: nibbles fold back to 11686; digit sum 31 ≡ 11686 (mod 15). -/
theorem enumeration_hex4_2da6 : reassembles 11686 = true ∧ castsFifteens 11686 = true := by decide

/-- 2da7: nibbles fold back to 11687; digit sum 32 ≡ 11687 (mod 15). -/
theorem enumeration_hex4_2da7 : reassembles 11687 = true ∧ castsFifteens 11687 = true := by decide

/-- 2da8: nibbles fold back to 11688; digit sum 33 ≡ 11688 (mod 15). -/
theorem enumeration_hex4_2da8 : reassembles 11688 = true ∧ castsFifteens 11688 = true := by decide

/-- 2da9: nibbles fold back to 11689; digit sum 34 ≡ 11689 (mod 15). -/
theorem enumeration_hex4_2da9 : reassembles 11689 = true ∧ castsFifteens 11689 = true := by decide

/-- 2daa: nibbles fold back to 11690; digit sum 35 ≡ 11690 (mod 15). -/
theorem enumeration_hex4_2daa : reassembles 11690 = true ∧ castsFifteens 11690 = true := by decide

/-- 2dab: nibbles fold back to 11691; digit sum 36 ≡ 11691 (mod 15). -/
theorem enumeration_hex4_2dab : reassembles 11691 = true ∧ castsFifteens 11691 = true := by decide

/-- 2dac: nibbles fold back to 11692; digit sum 37 ≡ 11692 (mod 15). -/
theorem enumeration_hex4_2dac : reassembles 11692 = true ∧ castsFifteens 11692 = true := by decide

/-- 2dad: nibbles fold back to 11693; digit sum 38 ≡ 11693 (mod 15). -/
theorem enumeration_hex4_2dad : reassembles 11693 = true ∧ castsFifteens 11693 = true := by decide

/-- 2dae: nibbles fold back to 11694; digit sum 39 ≡ 11694 (mod 15). -/
theorem enumeration_hex4_2dae : reassembles 11694 = true ∧ castsFifteens 11694 = true := by decide

/-- 2daf: nibbles fold back to 11695; digit sum 40 ≡ 11695 (mod 15). -/
theorem enumeration_hex4_2daf : reassembles 11695 = true ∧ castsFifteens 11695 = true := by decide

/-- 2db0: nibbles fold back to 11696; digit sum 26 ≡ 11696 (mod 15). -/
theorem enumeration_hex4_2db0 : reassembles 11696 = true ∧ castsFifteens 11696 = true := by decide

/-- 2db1: nibbles fold back to 11697; digit sum 27 ≡ 11697 (mod 15). -/
theorem enumeration_hex4_2db1 : reassembles 11697 = true ∧ castsFifteens 11697 = true := by decide

/-- 2db2: nibbles fold back to 11698; digit sum 28 ≡ 11698 (mod 15). -/
theorem enumeration_hex4_2db2 : reassembles 11698 = true ∧ castsFifteens 11698 = true := by decide

/-- 2db3: nibbles fold back to 11699; digit sum 29 ≡ 11699 (mod 15). -/
theorem enumeration_hex4_2db3 : reassembles 11699 = true ∧ castsFifteens 11699 = true := by decide

/-- 2db4: nibbles fold back to 11700; digit sum 30 ≡ 11700 (mod 15). -/
theorem enumeration_hex4_2db4 : reassembles 11700 = true ∧ castsFifteens 11700 = true := by decide

/-- 2db5: nibbles fold back to 11701; digit sum 31 ≡ 11701 (mod 15). -/
theorem enumeration_hex4_2db5 : reassembles 11701 = true ∧ castsFifteens 11701 = true := by decide

/-- 2db6: nibbles fold back to 11702; digit sum 32 ≡ 11702 (mod 15). -/
theorem enumeration_hex4_2db6 : reassembles 11702 = true ∧ castsFifteens 11702 = true := by decide

/-- 2db7: nibbles fold back to 11703; digit sum 33 ≡ 11703 (mod 15). -/
theorem enumeration_hex4_2db7 : reassembles 11703 = true ∧ castsFifteens 11703 = true := by decide

/-- 2db8: nibbles fold back to 11704; digit sum 34 ≡ 11704 (mod 15). -/
theorem enumeration_hex4_2db8 : reassembles 11704 = true ∧ castsFifteens 11704 = true := by decide

/-- 2db9: nibbles fold back to 11705; digit sum 35 ≡ 11705 (mod 15). -/
theorem enumeration_hex4_2db9 : reassembles 11705 = true ∧ castsFifteens 11705 = true := by decide

/-- 2dba: nibbles fold back to 11706; digit sum 36 ≡ 11706 (mod 15). -/
theorem enumeration_hex4_2dba : reassembles 11706 = true ∧ castsFifteens 11706 = true := by decide

/-- 2dbb: nibbles fold back to 11707; digit sum 37 ≡ 11707 (mod 15). -/
theorem enumeration_hex4_2dbb : reassembles 11707 = true ∧ castsFifteens 11707 = true := by decide

/-- 2dbc: nibbles fold back to 11708; digit sum 38 ≡ 11708 (mod 15). -/
theorem enumeration_hex4_2dbc : reassembles 11708 = true ∧ castsFifteens 11708 = true := by decide

/-- 2dbd: nibbles fold back to 11709; digit sum 39 ≡ 11709 (mod 15). -/
theorem enumeration_hex4_2dbd : reassembles 11709 = true ∧ castsFifteens 11709 = true := by decide

/-- 2dbe: nibbles fold back to 11710; digit sum 40 ≡ 11710 (mod 15). -/
theorem enumeration_hex4_2dbe : reassembles 11710 = true ∧ castsFifteens 11710 = true := by decide

/-- 2dbf: nibbles fold back to 11711; digit sum 41 ≡ 11711 (mod 15). -/
theorem enumeration_hex4_2dbf : reassembles 11711 = true ∧ castsFifteens 11711 = true := by decide

/-- 2dc0: nibbles fold back to 11712; digit sum 27 ≡ 11712 (mod 15). -/
theorem enumeration_hex4_2dc0 : reassembles 11712 = true ∧ castsFifteens 11712 = true := by decide

/-- 2dc1: nibbles fold back to 11713; digit sum 28 ≡ 11713 (mod 15). -/
theorem enumeration_hex4_2dc1 : reassembles 11713 = true ∧ castsFifteens 11713 = true := by decide

/-- 2dc2: nibbles fold back to 11714; digit sum 29 ≡ 11714 (mod 15). -/
theorem enumeration_hex4_2dc2 : reassembles 11714 = true ∧ castsFifteens 11714 = true := by decide

/-- 2dc3: nibbles fold back to 11715; digit sum 30 ≡ 11715 (mod 15). -/
theorem enumeration_hex4_2dc3 : reassembles 11715 = true ∧ castsFifteens 11715 = true := by decide

/-- 2dc4: nibbles fold back to 11716; digit sum 31 ≡ 11716 (mod 15). -/
theorem enumeration_hex4_2dc4 : reassembles 11716 = true ∧ castsFifteens 11716 = true := by decide

/-- 2dc5: nibbles fold back to 11717; digit sum 32 ≡ 11717 (mod 15). -/
theorem enumeration_hex4_2dc5 : reassembles 11717 = true ∧ castsFifteens 11717 = true := by decide

/-- 2dc6: nibbles fold back to 11718; digit sum 33 ≡ 11718 (mod 15). -/
theorem enumeration_hex4_2dc6 : reassembles 11718 = true ∧ castsFifteens 11718 = true := by decide

/-- 2dc7: nibbles fold back to 11719; digit sum 34 ≡ 11719 (mod 15). -/
theorem enumeration_hex4_2dc7 : reassembles 11719 = true ∧ castsFifteens 11719 = true := by decide

/-- 2dc8: nibbles fold back to 11720; digit sum 35 ≡ 11720 (mod 15). -/
theorem enumeration_hex4_2dc8 : reassembles 11720 = true ∧ castsFifteens 11720 = true := by decide

/-- 2dc9: nibbles fold back to 11721; digit sum 36 ≡ 11721 (mod 15). -/
theorem enumeration_hex4_2dc9 : reassembles 11721 = true ∧ castsFifteens 11721 = true := by decide

/-- 2dca: nibbles fold back to 11722; digit sum 37 ≡ 11722 (mod 15). -/
theorem enumeration_hex4_2dca : reassembles 11722 = true ∧ castsFifteens 11722 = true := by decide

/-- 2dcb: nibbles fold back to 11723; digit sum 38 ≡ 11723 (mod 15). -/
theorem enumeration_hex4_2dcb : reassembles 11723 = true ∧ castsFifteens 11723 = true := by decide

/-- 2dcc: nibbles fold back to 11724; digit sum 39 ≡ 11724 (mod 15). -/
theorem enumeration_hex4_2dcc : reassembles 11724 = true ∧ castsFifteens 11724 = true := by decide

/-- 2dcd: nibbles fold back to 11725; digit sum 40 ≡ 11725 (mod 15). -/
theorem enumeration_hex4_2dcd : reassembles 11725 = true ∧ castsFifteens 11725 = true := by decide

/-- 2dce: nibbles fold back to 11726; digit sum 41 ≡ 11726 (mod 15). -/
theorem enumeration_hex4_2dce : reassembles 11726 = true ∧ castsFifteens 11726 = true := by decide

/-- 2dcf: nibbles fold back to 11727; digit sum 42 ≡ 11727 (mod 15). -/
theorem enumeration_hex4_2dcf : reassembles 11727 = true ∧ castsFifteens 11727 = true := by decide

/-- 2dd0: nibbles fold back to 11728; digit sum 28 ≡ 11728 (mod 15). -/
theorem enumeration_hex4_2dd0 : reassembles 11728 = true ∧ castsFifteens 11728 = true := by decide

/-- 2dd1: nibbles fold back to 11729; digit sum 29 ≡ 11729 (mod 15). -/
theorem enumeration_hex4_2dd1 : reassembles 11729 = true ∧ castsFifteens 11729 = true := by decide

/-- 2dd2: nibbles fold back to 11730; digit sum 30 ≡ 11730 (mod 15). -/
theorem enumeration_hex4_2dd2 : reassembles 11730 = true ∧ castsFifteens 11730 = true := by decide

/-- 2dd3: nibbles fold back to 11731; digit sum 31 ≡ 11731 (mod 15). -/
theorem enumeration_hex4_2dd3 : reassembles 11731 = true ∧ castsFifteens 11731 = true := by decide

/-- 2dd4: nibbles fold back to 11732; digit sum 32 ≡ 11732 (mod 15). -/
theorem enumeration_hex4_2dd4 : reassembles 11732 = true ∧ castsFifteens 11732 = true := by decide

/-- 2dd5: nibbles fold back to 11733; digit sum 33 ≡ 11733 (mod 15). -/
theorem enumeration_hex4_2dd5 : reassembles 11733 = true ∧ castsFifteens 11733 = true := by decide

/-- 2dd6: nibbles fold back to 11734; digit sum 34 ≡ 11734 (mod 15). -/
theorem enumeration_hex4_2dd6 : reassembles 11734 = true ∧ castsFifteens 11734 = true := by decide

/-- 2dd7: nibbles fold back to 11735; digit sum 35 ≡ 11735 (mod 15). -/
theorem enumeration_hex4_2dd7 : reassembles 11735 = true ∧ castsFifteens 11735 = true := by decide

/-- 2dd8: nibbles fold back to 11736; digit sum 36 ≡ 11736 (mod 15). -/
theorem enumeration_hex4_2dd8 : reassembles 11736 = true ∧ castsFifteens 11736 = true := by decide

/-- 2dd9: nibbles fold back to 11737; digit sum 37 ≡ 11737 (mod 15). -/
theorem enumeration_hex4_2dd9 : reassembles 11737 = true ∧ castsFifteens 11737 = true := by decide

/-- 2dda: nibbles fold back to 11738; digit sum 38 ≡ 11738 (mod 15). -/
theorem enumeration_hex4_2dda : reassembles 11738 = true ∧ castsFifteens 11738 = true := by decide

/-- 2ddb: nibbles fold back to 11739; digit sum 39 ≡ 11739 (mod 15). -/
theorem enumeration_hex4_2ddb : reassembles 11739 = true ∧ castsFifteens 11739 = true := by decide

/-- 2ddc: nibbles fold back to 11740; digit sum 40 ≡ 11740 (mod 15). -/
theorem enumeration_hex4_2ddc : reassembles 11740 = true ∧ castsFifteens 11740 = true := by decide

/-- 2ddd: nibbles fold back to 11741; digit sum 41 ≡ 11741 (mod 15). -/
theorem enumeration_hex4_2ddd : reassembles 11741 = true ∧ castsFifteens 11741 = true := by decide

/-- 2dde: nibbles fold back to 11742; digit sum 42 ≡ 11742 (mod 15). -/
theorem enumeration_hex4_2dde : reassembles 11742 = true ∧ castsFifteens 11742 = true := by decide

/-- 2ddf: nibbles fold back to 11743; digit sum 43 ≡ 11743 (mod 15). -/
theorem enumeration_hex4_2ddf : reassembles 11743 = true ∧ castsFifteens 11743 = true := by decide

/-- 2de0: nibbles fold back to 11744; digit sum 29 ≡ 11744 (mod 15). -/
theorem enumeration_hex4_2de0 : reassembles 11744 = true ∧ castsFifteens 11744 = true := by decide

/-- 2de1: nibbles fold back to 11745; digit sum 30 ≡ 11745 (mod 15). -/
theorem enumeration_hex4_2de1 : reassembles 11745 = true ∧ castsFifteens 11745 = true := by decide

/-- 2de2: nibbles fold back to 11746; digit sum 31 ≡ 11746 (mod 15). -/
theorem enumeration_hex4_2de2 : reassembles 11746 = true ∧ castsFifteens 11746 = true := by decide

/-- 2de3: nibbles fold back to 11747; digit sum 32 ≡ 11747 (mod 15). -/
theorem enumeration_hex4_2de3 : reassembles 11747 = true ∧ castsFifteens 11747 = true := by decide

/-- 2de4: nibbles fold back to 11748; digit sum 33 ≡ 11748 (mod 15). -/
theorem enumeration_hex4_2de4 : reassembles 11748 = true ∧ castsFifteens 11748 = true := by decide

/-- 2de5: nibbles fold back to 11749; digit sum 34 ≡ 11749 (mod 15). -/
theorem enumeration_hex4_2de5 : reassembles 11749 = true ∧ castsFifteens 11749 = true := by decide

/-- 2de6: nibbles fold back to 11750; digit sum 35 ≡ 11750 (mod 15). -/
theorem enumeration_hex4_2de6 : reassembles 11750 = true ∧ castsFifteens 11750 = true := by decide

/-- 2de7: nibbles fold back to 11751; digit sum 36 ≡ 11751 (mod 15). -/
theorem enumeration_hex4_2de7 : reassembles 11751 = true ∧ castsFifteens 11751 = true := by decide

/-- 2de8: nibbles fold back to 11752; digit sum 37 ≡ 11752 (mod 15). -/
theorem enumeration_hex4_2de8 : reassembles 11752 = true ∧ castsFifteens 11752 = true := by decide

/-- 2de9: nibbles fold back to 11753; digit sum 38 ≡ 11753 (mod 15). -/
theorem enumeration_hex4_2de9 : reassembles 11753 = true ∧ castsFifteens 11753 = true := by decide

/-- 2dea: nibbles fold back to 11754; digit sum 39 ≡ 11754 (mod 15). -/
theorem enumeration_hex4_2dea : reassembles 11754 = true ∧ castsFifteens 11754 = true := by decide

/-- 2deb: nibbles fold back to 11755; digit sum 40 ≡ 11755 (mod 15). -/
theorem enumeration_hex4_2deb : reassembles 11755 = true ∧ castsFifteens 11755 = true := by decide

/-- 2dec: nibbles fold back to 11756; digit sum 41 ≡ 11756 (mod 15). -/
theorem enumeration_hex4_2dec : reassembles 11756 = true ∧ castsFifteens 11756 = true := by decide

/-- 2ded: nibbles fold back to 11757; digit sum 42 ≡ 11757 (mod 15). -/
theorem enumeration_hex4_2ded : reassembles 11757 = true ∧ castsFifteens 11757 = true := by decide

/-- 2dee: nibbles fold back to 11758; digit sum 43 ≡ 11758 (mod 15). -/
theorem enumeration_hex4_2dee : reassembles 11758 = true ∧ castsFifteens 11758 = true := by decide

/-- 2def: nibbles fold back to 11759; digit sum 44 ≡ 11759 (mod 15). -/
theorem enumeration_hex4_2def : reassembles 11759 = true ∧ castsFifteens 11759 = true := by decide

/-- 2df0: nibbles fold back to 11760; digit sum 30 ≡ 11760 (mod 15). -/
theorem enumeration_hex4_2df0 : reassembles 11760 = true ∧ castsFifteens 11760 = true := by decide

/-- 2df1: nibbles fold back to 11761; digit sum 31 ≡ 11761 (mod 15). -/
theorem enumeration_hex4_2df1 : reassembles 11761 = true ∧ castsFifteens 11761 = true := by decide

/-- 2df2: nibbles fold back to 11762; digit sum 32 ≡ 11762 (mod 15). -/
theorem enumeration_hex4_2df2 : reassembles 11762 = true ∧ castsFifteens 11762 = true := by decide

/-- 2df3: nibbles fold back to 11763; digit sum 33 ≡ 11763 (mod 15). -/
theorem enumeration_hex4_2df3 : reassembles 11763 = true ∧ castsFifteens 11763 = true := by decide

/-- 2df4: nibbles fold back to 11764; digit sum 34 ≡ 11764 (mod 15). -/
theorem enumeration_hex4_2df4 : reassembles 11764 = true ∧ castsFifteens 11764 = true := by decide

/-- 2df5: nibbles fold back to 11765; digit sum 35 ≡ 11765 (mod 15). -/
theorem enumeration_hex4_2df5 : reassembles 11765 = true ∧ castsFifteens 11765 = true := by decide

/-- 2df6: nibbles fold back to 11766; digit sum 36 ≡ 11766 (mod 15). -/
theorem enumeration_hex4_2df6 : reassembles 11766 = true ∧ castsFifteens 11766 = true := by decide

/-- 2df7: nibbles fold back to 11767; digit sum 37 ≡ 11767 (mod 15). -/
theorem enumeration_hex4_2df7 : reassembles 11767 = true ∧ castsFifteens 11767 = true := by decide

/-- 2df8: nibbles fold back to 11768; digit sum 38 ≡ 11768 (mod 15). -/
theorem enumeration_hex4_2df8 : reassembles 11768 = true ∧ castsFifteens 11768 = true := by decide

/-- 2df9: nibbles fold back to 11769; digit sum 39 ≡ 11769 (mod 15). -/
theorem enumeration_hex4_2df9 : reassembles 11769 = true ∧ castsFifteens 11769 = true := by decide

/-- 2dfa: nibbles fold back to 11770; digit sum 40 ≡ 11770 (mod 15). -/
theorem enumeration_hex4_2dfa : reassembles 11770 = true ∧ castsFifteens 11770 = true := by decide

/-- 2dfb: nibbles fold back to 11771; digit sum 41 ≡ 11771 (mod 15). -/
theorem enumeration_hex4_2dfb : reassembles 11771 = true ∧ castsFifteens 11771 = true := by decide

/-- 2dfc: nibbles fold back to 11772; digit sum 42 ≡ 11772 (mod 15). -/
theorem enumeration_hex4_2dfc : reassembles 11772 = true ∧ castsFifteens 11772 = true := by decide

/-- 2dfd: nibbles fold back to 11773; digit sum 43 ≡ 11773 (mod 15). -/
theorem enumeration_hex4_2dfd : reassembles 11773 = true ∧ castsFifteens 11773 = true := by decide

/-- 2dfe: nibbles fold back to 11774; digit sum 44 ≡ 11774 (mod 15). -/
theorem enumeration_hex4_2dfe : reassembles 11774 = true ∧ castsFifteens 11774 = true := by decide

/-- 2dff: nibbles fold back to 11775; digit sum 45 ≡ 11775 (mod 15). -/
theorem enumeration_hex4_2dff : reassembles 11775 = true ∧ castsFifteens 11775 = true := by decide

/-- 2e00: nibbles fold back to 11776; digit sum 16 ≡ 11776 (mod 15). -/
theorem enumeration_hex4_2e00 : reassembles 11776 = true ∧ castsFifteens 11776 = true := by decide

/-- 2e01: nibbles fold back to 11777; digit sum 17 ≡ 11777 (mod 15). -/
theorem enumeration_hex4_2e01 : reassembles 11777 = true ∧ castsFifteens 11777 = true := by decide

/-- 2e02: nibbles fold back to 11778; digit sum 18 ≡ 11778 (mod 15). -/
theorem enumeration_hex4_2e02 : reassembles 11778 = true ∧ castsFifteens 11778 = true := by decide

/-- 2e03: nibbles fold back to 11779; digit sum 19 ≡ 11779 (mod 15). -/
theorem enumeration_hex4_2e03 : reassembles 11779 = true ∧ castsFifteens 11779 = true := by decide

/-- 2e04: nibbles fold back to 11780; digit sum 20 ≡ 11780 (mod 15). -/
theorem enumeration_hex4_2e04 : reassembles 11780 = true ∧ castsFifteens 11780 = true := by decide

/-- 2e05: nibbles fold back to 11781; digit sum 21 ≡ 11781 (mod 15). -/
theorem enumeration_hex4_2e05 : reassembles 11781 = true ∧ castsFifteens 11781 = true := by decide

/-- 2e06: nibbles fold back to 11782; digit sum 22 ≡ 11782 (mod 15). -/
theorem enumeration_hex4_2e06 : reassembles 11782 = true ∧ castsFifteens 11782 = true := by decide

/-- 2e07: nibbles fold back to 11783; digit sum 23 ≡ 11783 (mod 15). -/
theorem enumeration_hex4_2e07 : reassembles 11783 = true ∧ castsFifteens 11783 = true := by decide

/-- 2e08: nibbles fold back to 11784; digit sum 24 ≡ 11784 (mod 15). -/
theorem enumeration_hex4_2e08 : reassembles 11784 = true ∧ castsFifteens 11784 = true := by decide

/-- 2e09: nibbles fold back to 11785; digit sum 25 ≡ 11785 (mod 15). -/
theorem enumeration_hex4_2e09 : reassembles 11785 = true ∧ castsFifteens 11785 = true := by decide

/-- 2e0a: nibbles fold back to 11786; digit sum 26 ≡ 11786 (mod 15). -/
theorem enumeration_hex4_2e0a : reassembles 11786 = true ∧ castsFifteens 11786 = true := by decide

/-- 2e0b: nibbles fold back to 11787; digit sum 27 ≡ 11787 (mod 15). -/
theorem enumeration_hex4_2e0b : reassembles 11787 = true ∧ castsFifteens 11787 = true := by decide

/-- 2e0c: nibbles fold back to 11788; digit sum 28 ≡ 11788 (mod 15). -/
theorem enumeration_hex4_2e0c : reassembles 11788 = true ∧ castsFifteens 11788 = true := by decide

/-- 2e0d: nibbles fold back to 11789; digit sum 29 ≡ 11789 (mod 15). -/
theorem enumeration_hex4_2e0d : reassembles 11789 = true ∧ castsFifteens 11789 = true := by decide

/-- 2e0e: nibbles fold back to 11790; digit sum 30 ≡ 11790 (mod 15). -/
theorem enumeration_hex4_2e0e : reassembles 11790 = true ∧ castsFifteens 11790 = true := by decide

/-- 2e0f: nibbles fold back to 11791; digit sum 31 ≡ 11791 (mod 15). -/
theorem enumeration_hex4_2e0f : reassembles 11791 = true ∧ castsFifteens 11791 = true := by decide

/-- 2e10: nibbles fold back to 11792; digit sum 17 ≡ 11792 (mod 15). -/
theorem enumeration_hex4_2e10 : reassembles 11792 = true ∧ castsFifteens 11792 = true := by decide

/-- 2e11: nibbles fold back to 11793; digit sum 18 ≡ 11793 (mod 15). -/
theorem enumeration_hex4_2e11 : reassembles 11793 = true ∧ castsFifteens 11793 = true := by decide

/-- 2e12: nibbles fold back to 11794; digit sum 19 ≡ 11794 (mod 15). -/
theorem enumeration_hex4_2e12 : reassembles 11794 = true ∧ castsFifteens 11794 = true := by decide

/-- 2e13: nibbles fold back to 11795; digit sum 20 ≡ 11795 (mod 15). -/
theorem enumeration_hex4_2e13 : reassembles 11795 = true ∧ castsFifteens 11795 = true := by decide

/-- 2e14: nibbles fold back to 11796; digit sum 21 ≡ 11796 (mod 15). -/
theorem enumeration_hex4_2e14 : reassembles 11796 = true ∧ castsFifteens 11796 = true := by decide

/-- 2e15: nibbles fold back to 11797; digit sum 22 ≡ 11797 (mod 15). -/
theorem enumeration_hex4_2e15 : reassembles 11797 = true ∧ castsFifteens 11797 = true := by decide

/-- 2e16: nibbles fold back to 11798; digit sum 23 ≡ 11798 (mod 15). -/
theorem enumeration_hex4_2e16 : reassembles 11798 = true ∧ castsFifteens 11798 = true := by decide

/-- 2e17: nibbles fold back to 11799; digit sum 24 ≡ 11799 (mod 15). -/
theorem enumeration_hex4_2e17 : reassembles 11799 = true ∧ castsFifteens 11799 = true := by decide

/-- 2e18: nibbles fold back to 11800; digit sum 25 ≡ 11800 (mod 15). -/
theorem enumeration_hex4_2e18 : reassembles 11800 = true ∧ castsFifteens 11800 = true := by decide

/-- 2e19: nibbles fold back to 11801; digit sum 26 ≡ 11801 (mod 15). -/
theorem enumeration_hex4_2e19 : reassembles 11801 = true ∧ castsFifteens 11801 = true := by decide

/-- 2e1a: nibbles fold back to 11802; digit sum 27 ≡ 11802 (mod 15). -/
theorem enumeration_hex4_2e1a : reassembles 11802 = true ∧ castsFifteens 11802 = true := by decide

/-- 2e1b: nibbles fold back to 11803; digit sum 28 ≡ 11803 (mod 15). -/
theorem enumeration_hex4_2e1b : reassembles 11803 = true ∧ castsFifteens 11803 = true := by decide

/-- 2e1c: nibbles fold back to 11804; digit sum 29 ≡ 11804 (mod 15). -/
theorem enumeration_hex4_2e1c : reassembles 11804 = true ∧ castsFifteens 11804 = true := by decide

/-- 2e1d: nibbles fold back to 11805; digit sum 30 ≡ 11805 (mod 15). -/
theorem enumeration_hex4_2e1d : reassembles 11805 = true ∧ castsFifteens 11805 = true := by decide

/-- 2e1e: nibbles fold back to 11806; digit sum 31 ≡ 11806 (mod 15). -/
theorem enumeration_hex4_2e1e : reassembles 11806 = true ∧ castsFifteens 11806 = true := by decide

/-- 2e1f: nibbles fold back to 11807; digit sum 32 ≡ 11807 (mod 15). -/
theorem enumeration_hex4_2e1f : reassembles 11807 = true ∧ castsFifteens 11807 = true := by decide

/-- 2e20: nibbles fold back to 11808; digit sum 18 ≡ 11808 (mod 15). -/
theorem enumeration_hex4_2e20 : reassembles 11808 = true ∧ castsFifteens 11808 = true := by decide

/-- 2e21: nibbles fold back to 11809; digit sum 19 ≡ 11809 (mod 15). -/
theorem enumeration_hex4_2e21 : reassembles 11809 = true ∧ castsFifteens 11809 = true := by decide

/-- 2e22: nibbles fold back to 11810; digit sum 20 ≡ 11810 (mod 15). -/
theorem enumeration_hex4_2e22 : reassembles 11810 = true ∧ castsFifteens 11810 = true := by decide

/-- 2e23: nibbles fold back to 11811; digit sum 21 ≡ 11811 (mod 15). -/
theorem enumeration_hex4_2e23 : reassembles 11811 = true ∧ castsFifteens 11811 = true := by decide

/-- 2e24: nibbles fold back to 11812; digit sum 22 ≡ 11812 (mod 15). -/
theorem enumeration_hex4_2e24 : reassembles 11812 = true ∧ castsFifteens 11812 = true := by decide

/-- 2e25: nibbles fold back to 11813; digit sum 23 ≡ 11813 (mod 15). -/
theorem enumeration_hex4_2e25 : reassembles 11813 = true ∧ castsFifteens 11813 = true := by decide

/-- 2e26: nibbles fold back to 11814; digit sum 24 ≡ 11814 (mod 15). -/
theorem enumeration_hex4_2e26 : reassembles 11814 = true ∧ castsFifteens 11814 = true := by decide

/-- 2e27: nibbles fold back to 11815; digit sum 25 ≡ 11815 (mod 15). -/
theorem enumeration_hex4_2e27 : reassembles 11815 = true ∧ castsFifteens 11815 = true := by decide

/-- 2e28: nibbles fold back to 11816; digit sum 26 ≡ 11816 (mod 15). -/
theorem enumeration_hex4_2e28 : reassembles 11816 = true ∧ castsFifteens 11816 = true := by decide

/-- 2e29: nibbles fold back to 11817; digit sum 27 ≡ 11817 (mod 15). -/
theorem enumeration_hex4_2e29 : reassembles 11817 = true ∧ castsFifteens 11817 = true := by decide

/-- 2e2a: nibbles fold back to 11818; digit sum 28 ≡ 11818 (mod 15). -/
theorem enumeration_hex4_2e2a : reassembles 11818 = true ∧ castsFifteens 11818 = true := by decide

/-- 2e2b: nibbles fold back to 11819; digit sum 29 ≡ 11819 (mod 15). -/
theorem enumeration_hex4_2e2b : reassembles 11819 = true ∧ castsFifteens 11819 = true := by decide

/-- 2e2c: nibbles fold back to 11820; digit sum 30 ≡ 11820 (mod 15). -/
theorem enumeration_hex4_2e2c : reassembles 11820 = true ∧ castsFifteens 11820 = true := by decide

/-- 2e2d: nibbles fold back to 11821; digit sum 31 ≡ 11821 (mod 15). -/
theorem enumeration_hex4_2e2d : reassembles 11821 = true ∧ castsFifteens 11821 = true := by decide

/-- 2e2e: nibbles fold back to 11822; digit sum 32 ≡ 11822 (mod 15). -/
theorem enumeration_hex4_2e2e : reassembles 11822 = true ∧ castsFifteens 11822 = true := by decide

/-- 2e2f: nibbles fold back to 11823; digit sum 33 ≡ 11823 (mod 15). -/
theorem enumeration_hex4_2e2f : reassembles 11823 = true ∧ castsFifteens 11823 = true := by decide

/-- 2e30: nibbles fold back to 11824; digit sum 19 ≡ 11824 (mod 15). -/
theorem enumeration_hex4_2e30 : reassembles 11824 = true ∧ castsFifteens 11824 = true := by decide

/-- 2e31: nibbles fold back to 11825; digit sum 20 ≡ 11825 (mod 15). -/
theorem enumeration_hex4_2e31 : reassembles 11825 = true ∧ castsFifteens 11825 = true := by decide

/-- 2e32: nibbles fold back to 11826; digit sum 21 ≡ 11826 (mod 15). -/
theorem enumeration_hex4_2e32 : reassembles 11826 = true ∧ castsFifteens 11826 = true := by decide

/-- 2e33: nibbles fold back to 11827; digit sum 22 ≡ 11827 (mod 15). -/
theorem enumeration_hex4_2e33 : reassembles 11827 = true ∧ castsFifteens 11827 = true := by decide

/-- 2e34: nibbles fold back to 11828; digit sum 23 ≡ 11828 (mod 15). -/
theorem enumeration_hex4_2e34 : reassembles 11828 = true ∧ castsFifteens 11828 = true := by decide

/-- 2e35: nibbles fold back to 11829; digit sum 24 ≡ 11829 (mod 15). -/
theorem enumeration_hex4_2e35 : reassembles 11829 = true ∧ castsFifteens 11829 = true := by decide

/-- 2e36: nibbles fold back to 11830; digit sum 25 ≡ 11830 (mod 15). -/
theorem enumeration_hex4_2e36 : reassembles 11830 = true ∧ castsFifteens 11830 = true := by decide

/-- 2e37: nibbles fold back to 11831; digit sum 26 ≡ 11831 (mod 15). -/
theorem enumeration_hex4_2e37 : reassembles 11831 = true ∧ castsFifteens 11831 = true := by decide

/-- 2e38: nibbles fold back to 11832; digit sum 27 ≡ 11832 (mod 15). -/
theorem enumeration_hex4_2e38 : reassembles 11832 = true ∧ castsFifteens 11832 = true := by decide

/-- 2e39: nibbles fold back to 11833; digit sum 28 ≡ 11833 (mod 15). -/
theorem enumeration_hex4_2e39 : reassembles 11833 = true ∧ castsFifteens 11833 = true := by decide

/-- 2e3a: nibbles fold back to 11834; digit sum 29 ≡ 11834 (mod 15). -/
theorem enumeration_hex4_2e3a : reassembles 11834 = true ∧ castsFifteens 11834 = true := by decide

/-- 2e3b: nibbles fold back to 11835; digit sum 30 ≡ 11835 (mod 15). -/
theorem enumeration_hex4_2e3b : reassembles 11835 = true ∧ castsFifteens 11835 = true := by decide

/-- 2e3c: nibbles fold back to 11836; digit sum 31 ≡ 11836 (mod 15). -/
theorem enumeration_hex4_2e3c : reassembles 11836 = true ∧ castsFifteens 11836 = true := by decide

/-- 2e3d: nibbles fold back to 11837; digit sum 32 ≡ 11837 (mod 15). -/
theorem enumeration_hex4_2e3d : reassembles 11837 = true ∧ castsFifteens 11837 = true := by decide

/-- 2e3e: nibbles fold back to 11838; digit sum 33 ≡ 11838 (mod 15). -/
theorem enumeration_hex4_2e3e : reassembles 11838 = true ∧ castsFifteens 11838 = true := by decide

/-- 2e3f: nibbles fold back to 11839; digit sum 34 ≡ 11839 (mod 15). -/
theorem enumeration_hex4_2e3f : reassembles 11839 = true ∧ castsFifteens 11839 = true := by decide

/-- 2e40: nibbles fold back to 11840; digit sum 20 ≡ 11840 (mod 15). -/
theorem enumeration_hex4_2e40 : reassembles 11840 = true ∧ castsFifteens 11840 = true := by decide

/-- 2e41: nibbles fold back to 11841; digit sum 21 ≡ 11841 (mod 15). -/
theorem enumeration_hex4_2e41 : reassembles 11841 = true ∧ castsFifteens 11841 = true := by decide

/-- 2e42: nibbles fold back to 11842; digit sum 22 ≡ 11842 (mod 15). -/
theorem enumeration_hex4_2e42 : reassembles 11842 = true ∧ castsFifteens 11842 = true := by decide

/-- 2e43: nibbles fold back to 11843; digit sum 23 ≡ 11843 (mod 15). -/
theorem enumeration_hex4_2e43 : reassembles 11843 = true ∧ castsFifteens 11843 = true := by decide

/-- 2e44: nibbles fold back to 11844; digit sum 24 ≡ 11844 (mod 15). -/
theorem enumeration_hex4_2e44 : reassembles 11844 = true ∧ castsFifteens 11844 = true := by decide

/-- 2e45: nibbles fold back to 11845; digit sum 25 ≡ 11845 (mod 15). -/
theorem enumeration_hex4_2e45 : reassembles 11845 = true ∧ castsFifteens 11845 = true := by decide

/-- 2e46: nibbles fold back to 11846; digit sum 26 ≡ 11846 (mod 15). -/
theorem enumeration_hex4_2e46 : reassembles 11846 = true ∧ castsFifteens 11846 = true := by decide

/-- 2e47: nibbles fold back to 11847; digit sum 27 ≡ 11847 (mod 15). -/
theorem enumeration_hex4_2e47 : reassembles 11847 = true ∧ castsFifteens 11847 = true := by decide

/-- 2e48: nibbles fold back to 11848; digit sum 28 ≡ 11848 (mod 15). -/
theorem enumeration_hex4_2e48 : reassembles 11848 = true ∧ castsFifteens 11848 = true := by decide

/-- 2e49: nibbles fold back to 11849; digit sum 29 ≡ 11849 (mod 15). -/
theorem enumeration_hex4_2e49 : reassembles 11849 = true ∧ castsFifteens 11849 = true := by decide

/-- 2e4a: nibbles fold back to 11850; digit sum 30 ≡ 11850 (mod 15). -/
theorem enumeration_hex4_2e4a : reassembles 11850 = true ∧ castsFifteens 11850 = true := by decide

/-- 2e4b: nibbles fold back to 11851; digit sum 31 ≡ 11851 (mod 15). -/
theorem enumeration_hex4_2e4b : reassembles 11851 = true ∧ castsFifteens 11851 = true := by decide

/-- 2e4c: nibbles fold back to 11852; digit sum 32 ≡ 11852 (mod 15). -/
theorem enumeration_hex4_2e4c : reassembles 11852 = true ∧ castsFifteens 11852 = true := by decide

/-- 2e4d: nibbles fold back to 11853; digit sum 33 ≡ 11853 (mod 15). -/
theorem enumeration_hex4_2e4d : reassembles 11853 = true ∧ castsFifteens 11853 = true := by decide

/-- 2e4e: nibbles fold back to 11854; digit sum 34 ≡ 11854 (mod 15). -/
theorem enumeration_hex4_2e4e : reassembles 11854 = true ∧ castsFifteens 11854 = true := by decide

/-- 2e4f: nibbles fold back to 11855; digit sum 35 ≡ 11855 (mod 15). -/
theorem enumeration_hex4_2e4f : reassembles 11855 = true ∧ castsFifteens 11855 = true := by decide

/-- 2e50: nibbles fold back to 11856; digit sum 21 ≡ 11856 (mod 15). -/
theorem enumeration_hex4_2e50 : reassembles 11856 = true ∧ castsFifteens 11856 = true := by decide

/-- 2e51: nibbles fold back to 11857; digit sum 22 ≡ 11857 (mod 15). -/
theorem enumeration_hex4_2e51 : reassembles 11857 = true ∧ castsFifteens 11857 = true := by decide

/-- 2e52: nibbles fold back to 11858; digit sum 23 ≡ 11858 (mod 15). -/
theorem enumeration_hex4_2e52 : reassembles 11858 = true ∧ castsFifteens 11858 = true := by decide

/-- 2e53: nibbles fold back to 11859; digit sum 24 ≡ 11859 (mod 15). -/
theorem enumeration_hex4_2e53 : reassembles 11859 = true ∧ castsFifteens 11859 = true := by decide

/-- 2e54: nibbles fold back to 11860; digit sum 25 ≡ 11860 (mod 15). -/
theorem enumeration_hex4_2e54 : reassembles 11860 = true ∧ castsFifteens 11860 = true := by decide

/-- 2e55: nibbles fold back to 11861; digit sum 26 ≡ 11861 (mod 15). -/
theorem enumeration_hex4_2e55 : reassembles 11861 = true ∧ castsFifteens 11861 = true := by decide

/-- 2e56: nibbles fold back to 11862; digit sum 27 ≡ 11862 (mod 15). -/
theorem enumeration_hex4_2e56 : reassembles 11862 = true ∧ castsFifteens 11862 = true := by decide

/-- 2e57: nibbles fold back to 11863; digit sum 28 ≡ 11863 (mod 15). -/
theorem enumeration_hex4_2e57 : reassembles 11863 = true ∧ castsFifteens 11863 = true := by decide

/-- 2e58: nibbles fold back to 11864; digit sum 29 ≡ 11864 (mod 15). -/
theorem enumeration_hex4_2e58 : reassembles 11864 = true ∧ castsFifteens 11864 = true := by decide

/-- 2e59: nibbles fold back to 11865; digit sum 30 ≡ 11865 (mod 15). -/
theorem enumeration_hex4_2e59 : reassembles 11865 = true ∧ castsFifteens 11865 = true := by decide

/-- 2e5a: nibbles fold back to 11866; digit sum 31 ≡ 11866 (mod 15). -/
theorem enumeration_hex4_2e5a : reassembles 11866 = true ∧ castsFifteens 11866 = true := by decide

/-- 2e5b: nibbles fold back to 11867; digit sum 32 ≡ 11867 (mod 15). -/
theorem enumeration_hex4_2e5b : reassembles 11867 = true ∧ castsFifteens 11867 = true := by decide

/-- 2e5c: nibbles fold back to 11868; digit sum 33 ≡ 11868 (mod 15). -/
theorem enumeration_hex4_2e5c : reassembles 11868 = true ∧ castsFifteens 11868 = true := by decide

/-- 2e5d: nibbles fold back to 11869; digit sum 34 ≡ 11869 (mod 15). -/
theorem enumeration_hex4_2e5d : reassembles 11869 = true ∧ castsFifteens 11869 = true := by decide

/-- 2e5e: nibbles fold back to 11870; digit sum 35 ≡ 11870 (mod 15). -/
theorem enumeration_hex4_2e5e : reassembles 11870 = true ∧ castsFifteens 11870 = true := by decide

/-- 2e5f: nibbles fold back to 11871; digit sum 36 ≡ 11871 (mod 15). -/
theorem enumeration_hex4_2e5f : reassembles 11871 = true ∧ castsFifteens 11871 = true := by decide

/-- 2e60: nibbles fold back to 11872; digit sum 22 ≡ 11872 (mod 15). -/
theorem enumeration_hex4_2e60 : reassembles 11872 = true ∧ castsFifteens 11872 = true := by decide

/-- 2e61: nibbles fold back to 11873; digit sum 23 ≡ 11873 (mod 15). -/
theorem enumeration_hex4_2e61 : reassembles 11873 = true ∧ castsFifteens 11873 = true := by decide

/-- 2e62: nibbles fold back to 11874; digit sum 24 ≡ 11874 (mod 15). -/
theorem enumeration_hex4_2e62 : reassembles 11874 = true ∧ castsFifteens 11874 = true := by decide

/-- 2e63: nibbles fold back to 11875; digit sum 25 ≡ 11875 (mod 15). -/
theorem enumeration_hex4_2e63 : reassembles 11875 = true ∧ castsFifteens 11875 = true := by decide

/-- 2e64: nibbles fold back to 11876; digit sum 26 ≡ 11876 (mod 15). -/
theorem enumeration_hex4_2e64 : reassembles 11876 = true ∧ castsFifteens 11876 = true := by decide

/-- 2e65: nibbles fold back to 11877; digit sum 27 ≡ 11877 (mod 15). -/
theorem enumeration_hex4_2e65 : reassembles 11877 = true ∧ castsFifteens 11877 = true := by decide

/-- 2e66: nibbles fold back to 11878; digit sum 28 ≡ 11878 (mod 15). -/
theorem enumeration_hex4_2e66 : reassembles 11878 = true ∧ castsFifteens 11878 = true := by decide

/-- 2e67: nibbles fold back to 11879; digit sum 29 ≡ 11879 (mod 15). -/
theorem enumeration_hex4_2e67 : reassembles 11879 = true ∧ castsFifteens 11879 = true := by decide

/-- 2e68: nibbles fold back to 11880; digit sum 30 ≡ 11880 (mod 15). -/
theorem enumeration_hex4_2e68 : reassembles 11880 = true ∧ castsFifteens 11880 = true := by decide

/-- 2e69: nibbles fold back to 11881; digit sum 31 ≡ 11881 (mod 15). -/
theorem enumeration_hex4_2e69 : reassembles 11881 = true ∧ castsFifteens 11881 = true := by decide

/-- 2e6a: nibbles fold back to 11882; digit sum 32 ≡ 11882 (mod 15). -/
theorem enumeration_hex4_2e6a : reassembles 11882 = true ∧ castsFifteens 11882 = true := by decide

/-- 2e6b: nibbles fold back to 11883; digit sum 33 ≡ 11883 (mod 15). -/
theorem enumeration_hex4_2e6b : reassembles 11883 = true ∧ castsFifteens 11883 = true := by decide

/-- 2e6c: nibbles fold back to 11884; digit sum 34 ≡ 11884 (mod 15). -/
theorem enumeration_hex4_2e6c : reassembles 11884 = true ∧ castsFifteens 11884 = true := by decide

/-- 2e6d: nibbles fold back to 11885; digit sum 35 ≡ 11885 (mod 15). -/
theorem enumeration_hex4_2e6d : reassembles 11885 = true ∧ castsFifteens 11885 = true := by decide

/-- 2e6e: nibbles fold back to 11886; digit sum 36 ≡ 11886 (mod 15). -/
theorem enumeration_hex4_2e6e : reassembles 11886 = true ∧ castsFifteens 11886 = true := by decide

/-- 2e6f: nibbles fold back to 11887; digit sum 37 ≡ 11887 (mod 15). -/
theorem enumeration_hex4_2e6f : reassembles 11887 = true ∧ castsFifteens 11887 = true := by decide

/-- 2e70: nibbles fold back to 11888; digit sum 23 ≡ 11888 (mod 15). -/
theorem enumeration_hex4_2e70 : reassembles 11888 = true ∧ castsFifteens 11888 = true := by decide

/-- 2e71: nibbles fold back to 11889; digit sum 24 ≡ 11889 (mod 15). -/
theorem enumeration_hex4_2e71 : reassembles 11889 = true ∧ castsFifteens 11889 = true := by decide

/-- 2e72: nibbles fold back to 11890; digit sum 25 ≡ 11890 (mod 15). -/
theorem enumeration_hex4_2e72 : reassembles 11890 = true ∧ castsFifteens 11890 = true := by decide

/-- 2e73: nibbles fold back to 11891; digit sum 26 ≡ 11891 (mod 15). -/
theorem enumeration_hex4_2e73 : reassembles 11891 = true ∧ castsFifteens 11891 = true := by decide

/-- 2e74: nibbles fold back to 11892; digit sum 27 ≡ 11892 (mod 15). -/
theorem enumeration_hex4_2e74 : reassembles 11892 = true ∧ castsFifteens 11892 = true := by decide

/-- 2e75: nibbles fold back to 11893; digit sum 28 ≡ 11893 (mod 15). -/
theorem enumeration_hex4_2e75 : reassembles 11893 = true ∧ castsFifteens 11893 = true := by decide

/-- 2e76: nibbles fold back to 11894; digit sum 29 ≡ 11894 (mod 15). -/
theorem enumeration_hex4_2e76 : reassembles 11894 = true ∧ castsFifteens 11894 = true := by decide

/-- 2e77: nibbles fold back to 11895; digit sum 30 ≡ 11895 (mod 15). -/
theorem enumeration_hex4_2e77 : reassembles 11895 = true ∧ castsFifteens 11895 = true := by decide

/-- 2e78: nibbles fold back to 11896; digit sum 31 ≡ 11896 (mod 15). -/
theorem enumeration_hex4_2e78 : reassembles 11896 = true ∧ castsFifteens 11896 = true := by decide

/-- 2e79: nibbles fold back to 11897; digit sum 32 ≡ 11897 (mod 15). -/
theorem enumeration_hex4_2e79 : reassembles 11897 = true ∧ castsFifteens 11897 = true := by decide

/-- 2e7a: nibbles fold back to 11898; digit sum 33 ≡ 11898 (mod 15). -/
theorem enumeration_hex4_2e7a : reassembles 11898 = true ∧ castsFifteens 11898 = true := by decide

/-- 2e7b: nibbles fold back to 11899; digit sum 34 ≡ 11899 (mod 15). -/
theorem enumeration_hex4_2e7b : reassembles 11899 = true ∧ castsFifteens 11899 = true := by decide

/-- 2e7c: nibbles fold back to 11900; digit sum 35 ≡ 11900 (mod 15). -/
theorem enumeration_hex4_2e7c : reassembles 11900 = true ∧ castsFifteens 11900 = true := by decide

/-- 2e7d: nibbles fold back to 11901; digit sum 36 ≡ 11901 (mod 15). -/
theorem enumeration_hex4_2e7d : reassembles 11901 = true ∧ castsFifteens 11901 = true := by decide

/-- 2e7e: nibbles fold back to 11902; digit sum 37 ≡ 11902 (mod 15). -/
theorem enumeration_hex4_2e7e : reassembles 11902 = true ∧ castsFifteens 11902 = true := by decide

/-- 2e7f: nibbles fold back to 11903; digit sum 38 ≡ 11903 (mod 15). -/
theorem enumeration_hex4_2e7f : reassembles 11903 = true ∧ castsFifteens 11903 = true := by decide

/-- 2e80: nibbles fold back to 11904; digit sum 24 ≡ 11904 (mod 15). -/
theorem enumeration_hex4_2e80 : reassembles 11904 = true ∧ castsFifteens 11904 = true := by decide

/-- 2e81: nibbles fold back to 11905; digit sum 25 ≡ 11905 (mod 15). -/
theorem enumeration_hex4_2e81 : reassembles 11905 = true ∧ castsFifteens 11905 = true := by decide

/-- 2e82: nibbles fold back to 11906; digit sum 26 ≡ 11906 (mod 15). -/
theorem enumeration_hex4_2e82 : reassembles 11906 = true ∧ castsFifteens 11906 = true := by decide

/-- 2e83: nibbles fold back to 11907; digit sum 27 ≡ 11907 (mod 15). -/
theorem enumeration_hex4_2e83 : reassembles 11907 = true ∧ castsFifteens 11907 = true := by decide

/-- 2e84: nibbles fold back to 11908; digit sum 28 ≡ 11908 (mod 15). -/
theorem enumeration_hex4_2e84 : reassembles 11908 = true ∧ castsFifteens 11908 = true := by decide

/-- 2e85: nibbles fold back to 11909; digit sum 29 ≡ 11909 (mod 15). -/
theorem enumeration_hex4_2e85 : reassembles 11909 = true ∧ castsFifteens 11909 = true := by decide

/-- 2e86: nibbles fold back to 11910; digit sum 30 ≡ 11910 (mod 15). -/
theorem enumeration_hex4_2e86 : reassembles 11910 = true ∧ castsFifteens 11910 = true := by decide

/-- 2e87: nibbles fold back to 11911; digit sum 31 ≡ 11911 (mod 15). -/
theorem enumeration_hex4_2e87 : reassembles 11911 = true ∧ castsFifteens 11911 = true := by decide

/-- 2e88: nibbles fold back to 11912; digit sum 32 ≡ 11912 (mod 15). -/
theorem enumeration_hex4_2e88 : reassembles 11912 = true ∧ castsFifteens 11912 = true := by decide

/-- 2e89: nibbles fold back to 11913; digit sum 33 ≡ 11913 (mod 15). -/
theorem enumeration_hex4_2e89 : reassembles 11913 = true ∧ castsFifteens 11913 = true := by decide

/-- 2e8a: nibbles fold back to 11914; digit sum 34 ≡ 11914 (mod 15). -/
theorem enumeration_hex4_2e8a : reassembles 11914 = true ∧ castsFifteens 11914 = true := by decide

/-- 2e8b: nibbles fold back to 11915; digit sum 35 ≡ 11915 (mod 15). -/
theorem enumeration_hex4_2e8b : reassembles 11915 = true ∧ castsFifteens 11915 = true := by decide

/-- 2e8c: nibbles fold back to 11916; digit sum 36 ≡ 11916 (mod 15). -/
theorem enumeration_hex4_2e8c : reassembles 11916 = true ∧ castsFifteens 11916 = true := by decide

/-- 2e8d: nibbles fold back to 11917; digit sum 37 ≡ 11917 (mod 15). -/
theorem enumeration_hex4_2e8d : reassembles 11917 = true ∧ castsFifteens 11917 = true := by decide

/-- 2e8e: nibbles fold back to 11918; digit sum 38 ≡ 11918 (mod 15). -/
theorem enumeration_hex4_2e8e : reassembles 11918 = true ∧ castsFifteens 11918 = true := by decide

/-- 2e8f: nibbles fold back to 11919; digit sum 39 ≡ 11919 (mod 15). -/
theorem enumeration_hex4_2e8f : reassembles 11919 = true ∧ castsFifteens 11919 = true := by decide

/-- 2e90: nibbles fold back to 11920; digit sum 25 ≡ 11920 (mod 15). -/
theorem enumeration_hex4_2e90 : reassembles 11920 = true ∧ castsFifteens 11920 = true := by decide

/-- 2e91: nibbles fold back to 11921; digit sum 26 ≡ 11921 (mod 15). -/
theorem enumeration_hex4_2e91 : reassembles 11921 = true ∧ castsFifteens 11921 = true := by decide

/-- 2e92: nibbles fold back to 11922; digit sum 27 ≡ 11922 (mod 15). -/
theorem enumeration_hex4_2e92 : reassembles 11922 = true ∧ castsFifteens 11922 = true := by decide

/-- 2e93: nibbles fold back to 11923; digit sum 28 ≡ 11923 (mod 15). -/
theorem enumeration_hex4_2e93 : reassembles 11923 = true ∧ castsFifteens 11923 = true := by decide

/-- 2e94: nibbles fold back to 11924; digit sum 29 ≡ 11924 (mod 15). -/
theorem enumeration_hex4_2e94 : reassembles 11924 = true ∧ castsFifteens 11924 = true := by decide

/-- 2e95: nibbles fold back to 11925; digit sum 30 ≡ 11925 (mod 15). -/
theorem enumeration_hex4_2e95 : reassembles 11925 = true ∧ castsFifteens 11925 = true := by decide

/-- 2e96: nibbles fold back to 11926; digit sum 31 ≡ 11926 (mod 15). -/
theorem enumeration_hex4_2e96 : reassembles 11926 = true ∧ castsFifteens 11926 = true := by decide

/-- 2e97: nibbles fold back to 11927; digit sum 32 ≡ 11927 (mod 15). -/
theorem enumeration_hex4_2e97 : reassembles 11927 = true ∧ castsFifteens 11927 = true := by decide

/-- 2e98: nibbles fold back to 11928; digit sum 33 ≡ 11928 (mod 15). -/
theorem enumeration_hex4_2e98 : reassembles 11928 = true ∧ castsFifteens 11928 = true := by decide

/-- 2e99: nibbles fold back to 11929; digit sum 34 ≡ 11929 (mod 15). -/
theorem enumeration_hex4_2e99 : reassembles 11929 = true ∧ castsFifteens 11929 = true := by decide

/-- 2e9a: nibbles fold back to 11930; digit sum 35 ≡ 11930 (mod 15). -/
theorem enumeration_hex4_2e9a : reassembles 11930 = true ∧ castsFifteens 11930 = true := by decide

/-- 2e9b: nibbles fold back to 11931; digit sum 36 ≡ 11931 (mod 15). -/
theorem enumeration_hex4_2e9b : reassembles 11931 = true ∧ castsFifteens 11931 = true := by decide

/-- 2e9c: nibbles fold back to 11932; digit sum 37 ≡ 11932 (mod 15). -/
theorem enumeration_hex4_2e9c : reassembles 11932 = true ∧ castsFifteens 11932 = true := by decide

/-- 2e9d: nibbles fold back to 11933; digit sum 38 ≡ 11933 (mod 15). -/
theorem enumeration_hex4_2e9d : reassembles 11933 = true ∧ castsFifteens 11933 = true := by decide

/-- 2e9e: nibbles fold back to 11934; digit sum 39 ≡ 11934 (mod 15). -/
theorem enumeration_hex4_2e9e : reassembles 11934 = true ∧ castsFifteens 11934 = true := by decide

/-- 2e9f: nibbles fold back to 11935; digit sum 40 ≡ 11935 (mod 15). -/
theorem enumeration_hex4_2e9f : reassembles 11935 = true ∧ castsFifteens 11935 = true := by decide

/-- 2ea0: nibbles fold back to 11936; digit sum 26 ≡ 11936 (mod 15). -/
theorem enumeration_hex4_2ea0 : reassembles 11936 = true ∧ castsFifteens 11936 = true := by decide

/-- 2ea1: nibbles fold back to 11937; digit sum 27 ≡ 11937 (mod 15). -/
theorem enumeration_hex4_2ea1 : reassembles 11937 = true ∧ castsFifteens 11937 = true := by decide

/-- 2ea2: nibbles fold back to 11938; digit sum 28 ≡ 11938 (mod 15). -/
theorem enumeration_hex4_2ea2 : reassembles 11938 = true ∧ castsFifteens 11938 = true := by decide

/-- 2ea3: nibbles fold back to 11939; digit sum 29 ≡ 11939 (mod 15). -/
theorem enumeration_hex4_2ea3 : reassembles 11939 = true ∧ castsFifteens 11939 = true := by decide

/-- 2ea4: nibbles fold back to 11940; digit sum 30 ≡ 11940 (mod 15). -/
theorem enumeration_hex4_2ea4 : reassembles 11940 = true ∧ castsFifteens 11940 = true := by decide

/-- 2ea5: nibbles fold back to 11941; digit sum 31 ≡ 11941 (mod 15). -/
theorem enumeration_hex4_2ea5 : reassembles 11941 = true ∧ castsFifteens 11941 = true := by decide

/-- 2ea6: nibbles fold back to 11942; digit sum 32 ≡ 11942 (mod 15). -/
theorem enumeration_hex4_2ea6 : reassembles 11942 = true ∧ castsFifteens 11942 = true := by decide

/-- 2ea7: nibbles fold back to 11943; digit sum 33 ≡ 11943 (mod 15). -/
theorem enumeration_hex4_2ea7 : reassembles 11943 = true ∧ castsFifteens 11943 = true := by decide

/-- 2ea8: nibbles fold back to 11944; digit sum 34 ≡ 11944 (mod 15). -/
theorem enumeration_hex4_2ea8 : reassembles 11944 = true ∧ castsFifteens 11944 = true := by decide

/-- 2ea9: nibbles fold back to 11945; digit sum 35 ≡ 11945 (mod 15). -/
theorem enumeration_hex4_2ea9 : reassembles 11945 = true ∧ castsFifteens 11945 = true := by decide

/-- 2eaa: nibbles fold back to 11946; digit sum 36 ≡ 11946 (mod 15). -/
theorem enumeration_hex4_2eaa : reassembles 11946 = true ∧ castsFifteens 11946 = true := by decide

/-- 2eab: nibbles fold back to 11947; digit sum 37 ≡ 11947 (mod 15). -/
theorem enumeration_hex4_2eab : reassembles 11947 = true ∧ castsFifteens 11947 = true := by decide

/-- 2eac: nibbles fold back to 11948; digit sum 38 ≡ 11948 (mod 15). -/
theorem enumeration_hex4_2eac : reassembles 11948 = true ∧ castsFifteens 11948 = true := by decide

/-- 2ead: nibbles fold back to 11949; digit sum 39 ≡ 11949 (mod 15). -/
theorem enumeration_hex4_2ead : reassembles 11949 = true ∧ castsFifteens 11949 = true := by decide

/-- 2eae: nibbles fold back to 11950; digit sum 40 ≡ 11950 (mod 15). -/
theorem enumeration_hex4_2eae : reassembles 11950 = true ∧ castsFifteens 11950 = true := by decide

/-- 2eaf: nibbles fold back to 11951; digit sum 41 ≡ 11951 (mod 15). -/
theorem enumeration_hex4_2eaf : reassembles 11951 = true ∧ castsFifteens 11951 = true := by decide

/-- 2eb0: nibbles fold back to 11952; digit sum 27 ≡ 11952 (mod 15). -/
theorem enumeration_hex4_2eb0 : reassembles 11952 = true ∧ castsFifteens 11952 = true := by decide

/-- 2eb1: nibbles fold back to 11953; digit sum 28 ≡ 11953 (mod 15). -/
theorem enumeration_hex4_2eb1 : reassembles 11953 = true ∧ castsFifteens 11953 = true := by decide

/-- 2eb2: nibbles fold back to 11954; digit sum 29 ≡ 11954 (mod 15). -/
theorem enumeration_hex4_2eb2 : reassembles 11954 = true ∧ castsFifteens 11954 = true := by decide

/-- 2eb3: nibbles fold back to 11955; digit sum 30 ≡ 11955 (mod 15). -/
theorem enumeration_hex4_2eb3 : reassembles 11955 = true ∧ castsFifteens 11955 = true := by decide

/-- 2eb4: nibbles fold back to 11956; digit sum 31 ≡ 11956 (mod 15). -/
theorem enumeration_hex4_2eb4 : reassembles 11956 = true ∧ castsFifteens 11956 = true := by decide

/-- 2eb5: nibbles fold back to 11957; digit sum 32 ≡ 11957 (mod 15). -/
theorem enumeration_hex4_2eb5 : reassembles 11957 = true ∧ castsFifteens 11957 = true := by decide

/-- 2eb6: nibbles fold back to 11958; digit sum 33 ≡ 11958 (mod 15). -/
theorem enumeration_hex4_2eb6 : reassembles 11958 = true ∧ castsFifteens 11958 = true := by decide

/-- 2eb7: nibbles fold back to 11959; digit sum 34 ≡ 11959 (mod 15). -/
theorem enumeration_hex4_2eb7 : reassembles 11959 = true ∧ castsFifteens 11959 = true := by decide

/-- 2eb8: nibbles fold back to 11960; digit sum 35 ≡ 11960 (mod 15). -/
theorem enumeration_hex4_2eb8 : reassembles 11960 = true ∧ castsFifteens 11960 = true := by decide

/-- 2eb9: nibbles fold back to 11961; digit sum 36 ≡ 11961 (mod 15). -/
theorem enumeration_hex4_2eb9 : reassembles 11961 = true ∧ castsFifteens 11961 = true := by decide

/-- 2eba: nibbles fold back to 11962; digit sum 37 ≡ 11962 (mod 15). -/
theorem enumeration_hex4_2eba : reassembles 11962 = true ∧ castsFifteens 11962 = true := by decide

/-- 2ebb: nibbles fold back to 11963; digit sum 38 ≡ 11963 (mod 15). -/
theorem enumeration_hex4_2ebb : reassembles 11963 = true ∧ castsFifteens 11963 = true := by decide

/-- 2ebc: nibbles fold back to 11964; digit sum 39 ≡ 11964 (mod 15). -/
theorem enumeration_hex4_2ebc : reassembles 11964 = true ∧ castsFifteens 11964 = true := by decide

/-- 2ebd: nibbles fold back to 11965; digit sum 40 ≡ 11965 (mod 15). -/
theorem enumeration_hex4_2ebd : reassembles 11965 = true ∧ castsFifteens 11965 = true := by decide

/-- 2ebe: nibbles fold back to 11966; digit sum 41 ≡ 11966 (mod 15). -/
theorem enumeration_hex4_2ebe : reassembles 11966 = true ∧ castsFifteens 11966 = true := by decide

/-- 2ebf: nibbles fold back to 11967; digit sum 42 ≡ 11967 (mod 15). -/
theorem enumeration_hex4_2ebf : reassembles 11967 = true ∧ castsFifteens 11967 = true := by decide

/-- 2ec0: nibbles fold back to 11968; digit sum 28 ≡ 11968 (mod 15). -/
theorem enumeration_hex4_2ec0 : reassembles 11968 = true ∧ castsFifteens 11968 = true := by decide

/-- 2ec1: nibbles fold back to 11969; digit sum 29 ≡ 11969 (mod 15). -/
theorem enumeration_hex4_2ec1 : reassembles 11969 = true ∧ castsFifteens 11969 = true := by decide

/-- 2ec2: nibbles fold back to 11970; digit sum 30 ≡ 11970 (mod 15). -/
theorem enumeration_hex4_2ec2 : reassembles 11970 = true ∧ castsFifteens 11970 = true := by decide

/-- 2ec3: nibbles fold back to 11971; digit sum 31 ≡ 11971 (mod 15). -/
theorem enumeration_hex4_2ec3 : reassembles 11971 = true ∧ castsFifteens 11971 = true := by decide

/-- 2ec4: nibbles fold back to 11972; digit sum 32 ≡ 11972 (mod 15). -/
theorem enumeration_hex4_2ec4 : reassembles 11972 = true ∧ castsFifteens 11972 = true := by decide

/-- 2ec5: nibbles fold back to 11973; digit sum 33 ≡ 11973 (mod 15). -/
theorem enumeration_hex4_2ec5 : reassembles 11973 = true ∧ castsFifteens 11973 = true := by decide

/-- 2ec6: nibbles fold back to 11974; digit sum 34 ≡ 11974 (mod 15). -/
theorem enumeration_hex4_2ec6 : reassembles 11974 = true ∧ castsFifteens 11974 = true := by decide

/-- 2ec7: nibbles fold back to 11975; digit sum 35 ≡ 11975 (mod 15). -/
theorem enumeration_hex4_2ec7 : reassembles 11975 = true ∧ castsFifteens 11975 = true := by decide

/-- 2ec8: nibbles fold back to 11976; digit sum 36 ≡ 11976 (mod 15). -/
theorem enumeration_hex4_2ec8 : reassembles 11976 = true ∧ castsFifteens 11976 = true := by decide

/-- 2ec9: nibbles fold back to 11977; digit sum 37 ≡ 11977 (mod 15). -/
theorem enumeration_hex4_2ec9 : reassembles 11977 = true ∧ castsFifteens 11977 = true := by decide

/-- 2eca: nibbles fold back to 11978; digit sum 38 ≡ 11978 (mod 15). -/
theorem enumeration_hex4_2eca : reassembles 11978 = true ∧ castsFifteens 11978 = true := by decide

/-- 2ecb: nibbles fold back to 11979; digit sum 39 ≡ 11979 (mod 15). -/
theorem enumeration_hex4_2ecb : reassembles 11979 = true ∧ castsFifteens 11979 = true := by decide

/-- 2ecc: nibbles fold back to 11980; digit sum 40 ≡ 11980 (mod 15). -/
theorem enumeration_hex4_2ecc : reassembles 11980 = true ∧ castsFifteens 11980 = true := by decide

/-- 2ecd: nibbles fold back to 11981; digit sum 41 ≡ 11981 (mod 15). -/
theorem enumeration_hex4_2ecd : reassembles 11981 = true ∧ castsFifteens 11981 = true := by decide

/-- 2ece: nibbles fold back to 11982; digit sum 42 ≡ 11982 (mod 15). -/
theorem enumeration_hex4_2ece : reassembles 11982 = true ∧ castsFifteens 11982 = true := by decide

/-- 2ecf: nibbles fold back to 11983; digit sum 43 ≡ 11983 (mod 15). -/
theorem enumeration_hex4_2ecf : reassembles 11983 = true ∧ castsFifteens 11983 = true := by decide

/-- 2ed0: nibbles fold back to 11984; digit sum 29 ≡ 11984 (mod 15). -/
theorem enumeration_hex4_2ed0 : reassembles 11984 = true ∧ castsFifteens 11984 = true := by decide

/-- 2ed1: nibbles fold back to 11985; digit sum 30 ≡ 11985 (mod 15). -/
theorem enumeration_hex4_2ed1 : reassembles 11985 = true ∧ castsFifteens 11985 = true := by decide

/-- 2ed2: nibbles fold back to 11986; digit sum 31 ≡ 11986 (mod 15). -/
theorem enumeration_hex4_2ed2 : reassembles 11986 = true ∧ castsFifteens 11986 = true := by decide

/-- 2ed3: nibbles fold back to 11987; digit sum 32 ≡ 11987 (mod 15). -/
theorem enumeration_hex4_2ed3 : reassembles 11987 = true ∧ castsFifteens 11987 = true := by decide

/-- 2ed4: nibbles fold back to 11988; digit sum 33 ≡ 11988 (mod 15). -/
theorem enumeration_hex4_2ed4 : reassembles 11988 = true ∧ castsFifteens 11988 = true := by decide

/-- 2ed5: nibbles fold back to 11989; digit sum 34 ≡ 11989 (mod 15). -/
theorem enumeration_hex4_2ed5 : reassembles 11989 = true ∧ castsFifteens 11989 = true := by decide

/-- 2ed6: nibbles fold back to 11990; digit sum 35 ≡ 11990 (mod 15). -/
theorem enumeration_hex4_2ed6 : reassembles 11990 = true ∧ castsFifteens 11990 = true := by decide

/-- 2ed7: nibbles fold back to 11991; digit sum 36 ≡ 11991 (mod 15). -/
theorem enumeration_hex4_2ed7 : reassembles 11991 = true ∧ castsFifteens 11991 = true := by decide

/-- 2ed8: nibbles fold back to 11992; digit sum 37 ≡ 11992 (mod 15). -/
theorem enumeration_hex4_2ed8 : reassembles 11992 = true ∧ castsFifteens 11992 = true := by decide

/-- 2ed9: nibbles fold back to 11993; digit sum 38 ≡ 11993 (mod 15). -/
theorem enumeration_hex4_2ed9 : reassembles 11993 = true ∧ castsFifteens 11993 = true := by decide

/-- 2eda: nibbles fold back to 11994; digit sum 39 ≡ 11994 (mod 15). -/
theorem enumeration_hex4_2eda : reassembles 11994 = true ∧ castsFifteens 11994 = true := by decide

/-- 2edb: nibbles fold back to 11995; digit sum 40 ≡ 11995 (mod 15). -/
theorem enumeration_hex4_2edb : reassembles 11995 = true ∧ castsFifteens 11995 = true := by decide

/-- 2edc: nibbles fold back to 11996; digit sum 41 ≡ 11996 (mod 15). -/
theorem enumeration_hex4_2edc : reassembles 11996 = true ∧ castsFifteens 11996 = true := by decide

/-- 2edd: nibbles fold back to 11997; digit sum 42 ≡ 11997 (mod 15). -/
theorem enumeration_hex4_2edd : reassembles 11997 = true ∧ castsFifteens 11997 = true := by decide

/-- 2ede: nibbles fold back to 11998; digit sum 43 ≡ 11998 (mod 15). -/
theorem enumeration_hex4_2ede : reassembles 11998 = true ∧ castsFifteens 11998 = true := by decide

/-- 2edf: nibbles fold back to 11999; digit sum 44 ≡ 11999 (mod 15). -/
theorem enumeration_hex4_2edf : reassembles 11999 = true ∧ castsFifteens 11999 = true := by decide

/-- 2ee0: nibbles fold back to 12000; digit sum 30 ≡ 12000 (mod 15). -/
theorem enumeration_hex4_2ee0 : reassembles 12000 = true ∧ castsFifteens 12000 = true := by decide

/-- 2ee1: nibbles fold back to 12001; digit sum 31 ≡ 12001 (mod 15). -/
theorem enumeration_hex4_2ee1 : reassembles 12001 = true ∧ castsFifteens 12001 = true := by decide

/-- 2ee2: nibbles fold back to 12002; digit sum 32 ≡ 12002 (mod 15). -/
theorem enumeration_hex4_2ee2 : reassembles 12002 = true ∧ castsFifteens 12002 = true := by decide

/-- 2ee3: nibbles fold back to 12003; digit sum 33 ≡ 12003 (mod 15). -/
theorem enumeration_hex4_2ee3 : reassembles 12003 = true ∧ castsFifteens 12003 = true := by decide

/-- 2ee4: nibbles fold back to 12004; digit sum 34 ≡ 12004 (mod 15). -/
theorem enumeration_hex4_2ee4 : reassembles 12004 = true ∧ castsFifteens 12004 = true := by decide

/-- 2ee5: nibbles fold back to 12005; digit sum 35 ≡ 12005 (mod 15). -/
theorem enumeration_hex4_2ee5 : reassembles 12005 = true ∧ castsFifteens 12005 = true := by decide

/-- 2ee6: nibbles fold back to 12006; digit sum 36 ≡ 12006 (mod 15). -/
theorem enumeration_hex4_2ee6 : reassembles 12006 = true ∧ castsFifteens 12006 = true := by decide

/-- 2ee7: nibbles fold back to 12007; digit sum 37 ≡ 12007 (mod 15). -/
theorem enumeration_hex4_2ee7 : reassembles 12007 = true ∧ castsFifteens 12007 = true := by decide

/-- 2ee8: nibbles fold back to 12008; digit sum 38 ≡ 12008 (mod 15). -/
theorem enumeration_hex4_2ee8 : reassembles 12008 = true ∧ castsFifteens 12008 = true := by decide

/-- 2ee9: nibbles fold back to 12009; digit sum 39 ≡ 12009 (mod 15). -/
theorem enumeration_hex4_2ee9 : reassembles 12009 = true ∧ castsFifteens 12009 = true := by decide

/-- 2eea: nibbles fold back to 12010; digit sum 40 ≡ 12010 (mod 15). -/
theorem enumeration_hex4_2eea : reassembles 12010 = true ∧ castsFifteens 12010 = true := by decide

/-- 2eeb: nibbles fold back to 12011; digit sum 41 ≡ 12011 (mod 15). -/
theorem enumeration_hex4_2eeb : reassembles 12011 = true ∧ castsFifteens 12011 = true := by decide

/-- 2eec: nibbles fold back to 12012; digit sum 42 ≡ 12012 (mod 15). -/
theorem enumeration_hex4_2eec : reassembles 12012 = true ∧ castsFifteens 12012 = true := by decide

/-- 2eed: nibbles fold back to 12013; digit sum 43 ≡ 12013 (mod 15). -/
theorem enumeration_hex4_2eed : reassembles 12013 = true ∧ castsFifteens 12013 = true := by decide

/-- 2eee: nibbles fold back to 12014; digit sum 44 ≡ 12014 (mod 15). -/
theorem enumeration_hex4_2eee : reassembles 12014 = true ∧ castsFifteens 12014 = true := by decide

/-- 2eef: nibbles fold back to 12015; digit sum 45 ≡ 12015 (mod 15). -/
theorem enumeration_hex4_2eef : reassembles 12015 = true ∧ castsFifteens 12015 = true := by decide

/-- 2ef0: nibbles fold back to 12016; digit sum 31 ≡ 12016 (mod 15). -/
theorem enumeration_hex4_2ef0 : reassembles 12016 = true ∧ castsFifteens 12016 = true := by decide

/-- 2ef1: nibbles fold back to 12017; digit sum 32 ≡ 12017 (mod 15). -/
theorem enumeration_hex4_2ef1 : reassembles 12017 = true ∧ castsFifteens 12017 = true := by decide

/-- 2ef2: nibbles fold back to 12018; digit sum 33 ≡ 12018 (mod 15). -/
theorem enumeration_hex4_2ef2 : reassembles 12018 = true ∧ castsFifteens 12018 = true := by decide

/-- 2ef3: nibbles fold back to 12019; digit sum 34 ≡ 12019 (mod 15). -/
theorem enumeration_hex4_2ef3 : reassembles 12019 = true ∧ castsFifteens 12019 = true := by decide

/-- 2ef4: nibbles fold back to 12020; digit sum 35 ≡ 12020 (mod 15). -/
theorem enumeration_hex4_2ef4 : reassembles 12020 = true ∧ castsFifteens 12020 = true := by decide

/-- 2ef5: nibbles fold back to 12021; digit sum 36 ≡ 12021 (mod 15). -/
theorem enumeration_hex4_2ef5 : reassembles 12021 = true ∧ castsFifteens 12021 = true := by decide

/-- 2ef6: nibbles fold back to 12022; digit sum 37 ≡ 12022 (mod 15). -/
theorem enumeration_hex4_2ef6 : reassembles 12022 = true ∧ castsFifteens 12022 = true := by decide

/-- 2ef7: nibbles fold back to 12023; digit sum 38 ≡ 12023 (mod 15). -/
theorem enumeration_hex4_2ef7 : reassembles 12023 = true ∧ castsFifteens 12023 = true := by decide

/-- 2ef8: nibbles fold back to 12024; digit sum 39 ≡ 12024 (mod 15). -/
theorem enumeration_hex4_2ef8 : reassembles 12024 = true ∧ castsFifteens 12024 = true := by decide

/-- 2ef9: nibbles fold back to 12025; digit sum 40 ≡ 12025 (mod 15). -/
theorem enumeration_hex4_2ef9 : reassembles 12025 = true ∧ castsFifteens 12025 = true := by decide

/-- 2efa: nibbles fold back to 12026; digit sum 41 ≡ 12026 (mod 15). -/
theorem enumeration_hex4_2efa : reassembles 12026 = true ∧ castsFifteens 12026 = true := by decide

/-- 2efb: nibbles fold back to 12027; digit sum 42 ≡ 12027 (mod 15). -/
theorem enumeration_hex4_2efb : reassembles 12027 = true ∧ castsFifteens 12027 = true := by decide

/-- 2efc: nibbles fold back to 12028; digit sum 43 ≡ 12028 (mod 15). -/
theorem enumeration_hex4_2efc : reassembles 12028 = true ∧ castsFifteens 12028 = true := by decide

/-- 2efd: nibbles fold back to 12029; digit sum 44 ≡ 12029 (mod 15). -/
theorem enumeration_hex4_2efd : reassembles 12029 = true ∧ castsFifteens 12029 = true := by decide

/-- 2efe: nibbles fold back to 12030; digit sum 45 ≡ 12030 (mod 15). -/
theorem enumeration_hex4_2efe : reassembles 12030 = true ∧ castsFifteens 12030 = true := by decide

/-- 2eff: nibbles fold back to 12031; digit sum 46 ≡ 12031 (mod 15). -/
theorem enumeration_hex4_2eff : reassembles 12031 = true ∧ castsFifteens 12031 = true := by decide

/-- 2f00: nibbles fold back to 12032; digit sum 17 ≡ 12032 (mod 15). -/
theorem enumeration_hex4_2f00 : reassembles 12032 = true ∧ castsFifteens 12032 = true := by decide

/-- 2f01: nibbles fold back to 12033; digit sum 18 ≡ 12033 (mod 15). -/
theorem enumeration_hex4_2f01 : reassembles 12033 = true ∧ castsFifteens 12033 = true := by decide

/-- 2f02: nibbles fold back to 12034; digit sum 19 ≡ 12034 (mod 15). -/
theorem enumeration_hex4_2f02 : reassembles 12034 = true ∧ castsFifteens 12034 = true := by decide

/-- 2f03: nibbles fold back to 12035; digit sum 20 ≡ 12035 (mod 15). -/
theorem enumeration_hex4_2f03 : reassembles 12035 = true ∧ castsFifteens 12035 = true := by decide

/-- 2f04: nibbles fold back to 12036; digit sum 21 ≡ 12036 (mod 15). -/
theorem enumeration_hex4_2f04 : reassembles 12036 = true ∧ castsFifteens 12036 = true := by decide

/-- 2f05: nibbles fold back to 12037; digit sum 22 ≡ 12037 (mod 15). -/
theorem enumeration_hex4_2f05 : reassembles 12037 = true ∧ castsFifteens 12037 = true := by decide

/-- 2f06: nibbles fold back to 12038; digit sum 23 ≡ 12038 (mod 15). -/
theorem enumeration_hex4_2f06 : reassembles 12038 = true ∧ castsFifteens 12038 = true := by decide

/-- 2f07: nibbles fold back to 12039; digit sum 24 ≡ 12039 (mod 15). -/
theorem enumeration_hex4_2f07 : reassembles 12039 = true ∧ castsFifteens 12039 = true := by decide

/-- 2f08: nibbles fold back to 12040; digit sum 25 ≡ 12040 (mod 15). -/
theorem enumeration_hex4_2f08 : reassembles 12040 = true ∧ castsFifteens 12040 = true := by decide

/-- 2f09: nibbles fold back to 12041; digit sum 26 ≡ 12041 (mod 15). -/
theorem enumeration_hex4_2f09 : reassembles 12041 = true ∧ castsFifteens 12041 = true := by decide

/-- 2f0a: nibbles fold back to 12042; digit sum 27 ≡ 12042 (mod 15). -/
theorem enumeration_hex4_2f0a : reassembles 12042 = true ∧ castsFifteens 12042 = true := by decide

/-- 2f0b: nibbles fold back to 12043; digit sum 28 ≡ 12043 (mod 15). -/
theorem enumeration_hex4_2f0b : reassembles 12043 = true ∧ castsFifteens 12043 = true := by decide

/-- 2f0c: nibbles fold back to 12044; digit sum 29 ≡ 12044 (mod 15). -/
theorem enumeration_hex4_2f0c : reassembles 12044 = true ∧ castsFifteens 12044 = true := by decide

/-- 2f0d: nibbles fold back to 12045; digit sum 30 ≡ 12045 (mod 15). -/
theorem enumeration_hex4_2f0d : reassembles 12045 = true ∧ castsFifteens 12045 = true := by decide

/-- 2f0e: nibbles fold back to 12046; digit sum 31 ≡ 12046 (mod 15). -/
theorem enumeration_hex4_2f0e : reassembles 12046 = true ∧ castsFifteens 12046 = true := by decide

/-- 2f0f: nibbles fold back to 12047; digit sum 32 ≡ 12047 (mod 15). -/
theorem enumeration_hex4_2f0f : reassembles 12047 = true ∧ castsFifteens 12047 = true := by decide

/-- 2f10: nibbles fold back to 12048; digit sum 18 ≡ 12048 (mod 15). -/
theorem enumeration_hex4_2f10 : reassembles 12048 = true ∧ castsFifteens 12048 = true := by decide

/-- 2f11: nibbles fold back to 12049; digit sum 19 ≡ 12049 (mod 15). -/
theorem enumeration_hex4_2f11 : reassembles 12049 = true ∧ castsFifteens 12049 = true := by decide

/-- 2f12: nibbles fold back to 12050; digit sum 20 ≡ 12050 (mod 15). -/
theorem enumeration_hex4_2f12 : reassembles 12050 = true ∧ castsFifteens 12050 = true := by decide

/-- 2f13: nibbles fold back to 12051; digit sum 21 ≡ 12051 (mod 15). -/
theorem enumeration_hex4_2f13 : reassembles 12051 = true ∧ castsFifteens 12051 = true := by decide

/-- 2f14: nibbles fold back to 12052; digit sum 22 ≡ 12052 (mod 15). -/
theorem enumeration_hex4_2f14 : reassembles 12052 = true ∧ castsFifteens 12052 = true := by decide

/-- 2f15: nibbles fold back to 12053; digit sum 23 ≡ 12053 (mod 15). -/
theorem enumeration_hex4_2f15 : reassembles 12053 = true ∧ castsFifteens 12053 = true := by decide

/-- 2f16: nibbles fold back to 12054; digit sum 24 ≡ 12054 (mod 15). -/
theorem enumeration_hex4_2f16 : reassembles 12054 = true ∧ castsFifteens 12054 = true := by decide

/-- 2f17: nibbles fold back to 12055; digit sum 25 ≡ 12055 (mod 15). -/
theorem enumeration_hex4_2f17 : reassembles 12055 = true ∧ castsFifteens 12055 = true := by decide

/-- 2f18: nibbles fold back to 12056; digit sum 26 ≡ 12056 (mod 15). -/
theorem enumeration_hex4_2f18 : reassembles 12056 = true ∧ castsFifteens 12056 = true := by decide

/-- 2f19: nibbles fold back to 12057; digit sum 27 ≡ 12057 (mod 15). -/
theorem enumeration_hex4_2f19 : reassembles 12057 = true ∧ castsFifteens 12057 = true := by decide

/-- 2f1a: nibbles fold back to 12058; digit sum 28 ≡ 12058 (mod 15). -/
theorem enumeration_hex4_2f1a : reassembles 12058 = true ∧ castsFifteens 12058 = true := by decide

/-- 2f1b: nibbles fold back to 12059; digit sum 29 ≡ 12059 (mod 15). -/
theorem enumeration_hex4_2f1b : reassembles 12059 = true ∧ castsFifteens 12059 = true := by decide

/-- 2f1c: nibbles fold back to 12060; digit sum 30 ≡ 12060 (mod 15). -/
theorem enumeration_hex4_2f1c : reassembles 12060 = true ∧ castsFifteens 12060 = true := by decide

/-- 2f1d: nibbles fold back to 12061; digit sum 31 ≡ 12061 (mod 15). -/
theorem enumeration_hex4_2f1d : reassembles 12061 = true ∧ castsFifteens 12061 = true := by decide

/-- 2f1e: nibbles fold back to 12062; digit sum 32 ≡ 12062 (mod 15). -/
theorem enumeration_hex4_2f1e : reassembles 12062 = true ∧ castsFifteens 12062 = true := by decide

/-- 2f1f: nibbles fold back to 12063; digit sum 33 ≡ 12063 (mod 15). -/
theorem enumeration_hex4_2f1f : reassembles 12063 = true ∧ castsFifteens 12063 = true := by decide

/-- 2f20: nibbles fold back to 12064; digit sum 19 ≡ 12064 (mod 15). -/
theorem enumeration_hex4_2f20 : reassembles 12064 = true ∧ castsFifteens 12064 = true := by decide

/-- 2f21: nibbles fold back to 12065; digit sum 20 ≡ 12065 (mod 15). -/
theorem enumeration_hex4_2f21 : reassembles 12065 = true ∧ castsFifteens 12065 = true := by decide

/-- 2f22: nibbles fold back to 12066; digit sum 21 ≡ 12066 (mod 15). -/
theorem enumeration_hex4_2f22 : reassembles 12066 = true ∧ castsFifteens 12066 = true := by decide

/-- 2f23: nibbles fold back to 12067; digit sum 22 ≡ 12067 (mod 15). -/
theorem enumeration_hex4_2f23 : reassembles 12067 = true ∧ castsFifteens 12067 = true := by decide

/-- 2f24: nibbles fold back to 12068; digit sum 23 ≡ 12068 (mod 15). -/
theorem enumeration_hex4_2f24 : reassembles 12068 = true ∧ castsFifteens 12068 = true := by decide

/-- 2f25: nibbles fold back to 12069; digit sum 24 ≡ 12069 (mod 15). -/
theorem enumeration_hex4_2f25 : reassembles 12069 = true ∧ castsFifteens 12069 = true := by decide

/-- 2f26: nibbles fold back to 12070; digit sum 25 ≡ 12070 (mod 15). -/
theorem enumeration_hex4_2f26 : reassembles 12070 = true ∧ castsFifteens 12070 = true := by decide

/-- 2f27: nibbles fold back to 12071; digit sum 26 ≡ 12071 (mod 15). -/
theorem enumeration_hex4_2f27 : reassembles 12071 = true ∧ castsFifteens 12071 = true := by decide

/-- 2f28: nibbles fold back to 12072; digit sum 27 ≡ 12072 (mod 15). -/
theorem enumeration_hex4_2f28 : reassembles 12072 = true ∧ castsFifteens 12072 = true := by decide

/-- 2f29: nibbles fold back to 12073; digit sum 28 ≡ 12073 (mod 15). -/
theorem enumeration_hex4_2f29 : reassembles 12073 = true ∧ castsFifteens 12073 = true := by decide

/-- 2f2a: nibbles fold back to 12074; digit sum 29 ≡ 12074 (mod 15). -/
theorem enumeration_hex4_2f2a : reassembles 12074 = true ∧ castsFifteens 12074 = true := by decide

/-- 2f2b: nibbles fold back to 12075; digit sum 30 ≡ 12075 (mod 15). -/
theorem enumeration_hex4_2f2b : reassembles 12075 = true ∧ castsFifteens 12075 = true := by decide

/-- 2f2c: nibbles fold back to 12076; digit sum 31 ≡ 12076 (mod 15). -/
theorem enumeration_hex4_2f2c : reassembles 12076 = true ∧ castsFifteens 12076 = true := by decide

/-- 2f2d: nibbles fold back to 12077; digit sum 32 ≡ 12077 (mod 15). -/
theorem enumeration_hex4_2f2d : reassembles 12077 = true ∧ castsFifteens 12077 = true := by decide

/-- 2f2e: nibbles fold back to 12078; digit sum 33 ≡ 12078 (mod 15). -/
theorem enumeration_hex4_2f2e : reassembles 12078 = true ∧ castsFifteens 12078 = true := by decide

/-- 2f2f: nibbles fold back to 12079; digit sum 34 ≡ 12079 (mod 15). -/
theorem enumeration_hex4_2f2f : reassembles 12079 = true ∧ castsFifteens 12079 = true := by decide

/-- 2f30: nibbles fold back to 12080; digit sum 20 ≡ 12080 (mod 15). -/
theorem enumeration_hex4_2f30 : reassembles 12080 = true ∧ castsFifteens 12080 = true := by decide

/-- 2f31: nibbles fold back to 12081; digit sum 21 ≡ 12081 (mod 15). -/
theorem enumeration_hex4_2f31 : reassembles 12081 = true ∧ castsFifteens 12081 = true := by decide

/-- 2f32: nibbles fold back to 12082; digit sum 22 ≡ 12082 (mod 15). -/
theorem enumeration_hex4_2f32 : reassembles 12082 = true ∧ castsFifteens 12082 = true := by decide

/-- 2f33: nibbles fold back to 12083; digit sum 23 ≡ 12083 (mod 15). -/
theorem enumeration_hex4_2f33 : reassembles 12083 = true ∧ castsFifteens 12083 = true := by decide

/-- 2f34: nibbles fold back to 12084; digit sum 24 ≡ 12084 (mod 15). -/
theorem enumeration_hex4_2f34 : reassembles 12084 = true ∧ castsFifteens 12084 = true := by decide

/-- 2f35: nibbles fold back to 12085; digit sum 25 ≡ 12085 (mod 15). -/
theorem enumeration_hex4_2f35 : reassembles 12085 = true ∧ castsFifteens 12085 = true := by decide

/-- 2f36: nibbles fold back to 12086; digit sum 26 ≡ 12086 (mod 15). -/
theorem enumeration_hex4_2f36 : reassembles 12086 = true ∧ castsFifteens 12086 = true := by decide

/-- 2f37: nibbles fold back to 12087; digit sum 27 ≡ 12087 (mod 15). -/
theorem enumeration_hex4_2f37 : reassembles 12087 = true ∧ castsFifteens 12087 = true := by decide

/-- 2f38: nibbles fold back to 12088; digit sum 28 ≡ 12088 (mod 15). -/
theorem enumeration_hex4_2f38 : reassembles 12088 = true ∧ castsFifteens 12088 = true := by decide

/-- 2f39: nibbles fold back to 12089; digit sum 29 ≡ 12089 (mod 15). -/
theorem enumeration_hex4_2f39 : reassembles 12089 = true ∧ castsFifteens 12089 = true := by decide

/-- 2f3a: nibbles fold back to 12090; digit sum 30 ≡ 12090 (mod 15). -/
theorem enumeration_hex4_2f3a : reassembles 12090 = true ∧ castsFifteens 12090 = true := by decide

/-- 2f3b: nibbles fold back to 12091; digit sum 31 ≡ 12091 (mod 15). -/
theorem enumeration_hex4_2f3b : reassembles 12091 = true ∧ castsFifteens 12091 = true := by decide

/-- 2f3c: nibbles fold back to 12092; digit sum 32 ≡ 12092 (mod 15). -/
theorem enumeration_hex4_2f3c : reassembles 12092 = true ∧ castsFifteens 12092 = true := by decide

/-- 2f3d: nibbles fold back to 12093; digit sum 33 ≡ 12093 (mod 15). -/
theorem enumeration_hex4_2f3d : reassembles 12093 = true ∧ castsFifteens 12093 = true := by decide

/-- 2f3e: nibbles fold back to 12094; digit sum 34 ≡ 12094 (mod 15). -/
theorem enumeration_hex4_2f3e : reassembles 12094 = true ∧ castsFifteens 12094 = true := by decide

/-- 2f3f: nibbles fold back to 12095; digit sum 35 ≡ 12095 (mod 15). -/
theorem enumeration_hex4_2f3f : reassembles 12095 = true ∧ castsFifteens 12095 = true := by decide

/-- 2f40: nibbles fold back to 12096; digit sum 21 ≡ 12096 (mod 15). -/
theorem enumeration_hex4_2f40 : reassembles 12096 = true ∧ castsFifteens 12096 = true := by decide

/-- 2f41: nibbles fold back to 12097; digit sum 22 ≡ 12097 (mod 15). -/
theorem enumeration_hex4_2f41 : reassembles 12097 = true ∧ castsFifteens 12097 = true := by decide

/-- 2f42: nibbles fold back to 12098; digit sum 23 ≡ 12098 (mod 15). -/
theorem enumeration_hex4_2f42 : reassembles 12098 = true ∧ castsFifteens 12098 = true := by decide

/-- 2f43: nibbles fold back to 12099; digit sum 24 ≡ 12099 (mod 15). -/
theorem enumeration_hex4_2f43 : reassembles 12099 = true ∧ castsFifteens 12099 = true := by decide

/-- 2f44: nibbles fold back to 12100; digit sum 25 ≡ 12100 (mod 15). -/
theorem enumeration_hex4_2f44 : reassembles 12100 = true ∧ castsFifteens 12100 = true := by decide

/-- 2f45: nibbles fold back to 12101; digit sum 26 ≡ 12101 (mod 15). -/
theorem enumeration_hex4_2f45 : reassembles 12101 = true ∧ castsFifteens 12101 = true := by decide

/-- 2f46: nibbles fold back to 12102; digit sum 27 ≡ 12102 (mod 15). -/
theorem enumeration_hex4_2f46 : reassembles 12102 = true ∧ castsFifteens 12102 = true := by decide

/-- 2f47: nibbles fold back to 12103; digit sum 28 ≡ 12103 (mod 15). -/
theorem enumeration_hex4_2f47 : reassembles 12103 = true ∧ castsFifteens 12103 = true := by decide

/-- 2f48: nibbles fold back to 12104; digit sum 29 ≡ 12104 (mod 15). -/
theorem enumeration_hex4_2f48 : reassembles 12104 = true ∧ castsFifteens 12104 = true := by decide

/-- 2f49: nibbles fold back to 12105; digit sum 30 ≡ 12105 (mod 15). -/
theorem enumeration_hex4_2f49 : reassembles 12105 = true ∧ castsFifteens 12105 = true := by decide

/-- 2f4a: nibbles fold back to 12106; digit sum 31 ≡ 12106 (mod 15). -/
theorem enumeration_hex4_2f4a : reassembles 12106 = true ∧ castsFifteens 12106 = true := by decide

/-- 2f4b: nibbles fold back to 12107; digit sum 32 ≡ 12107 (mod 15). -/
theorem enumeration_hex4_2f4b : reassembles 12107 = true ∧ castsFifteens 12107 = true := by decide

/-- 2f4c: nibbles fold back to 12108; digit sum 33 ≡ 12108 (mod 15). -/
theorem enumeration_hex4_2f4c : reassembles 12108 = true ∧ castsFifteens 12108 = true := by decide

/-- 2f4d: nibbles fold back to 12109; digit sum 34 ≡ 12109 (mod 15). -/
theorem enumeration_hex4_2f4d : reassembles 12109 = true ∧ castsFifteens 12109 = true := by decide

/-- 2f4e: nibbles fold back to 12110; digit sum 35 ≡ 12110 (mod 15). -/
theorem enumeration_hex4_2f4e : reassembles 12110 = true ∧ castsFifteens 12110 = true := by decide

/-- 2f4f: nibbles fold back to 12111; digit sum 36 ≡ 12111 (mod 15). -/
theorem enumeration_hex4_2f4f : reassembles 12111 = true ∧ castsFifteens 12111 = true := by decide

/-- 2f50: nibbles fold back to 12112; digit sum 22 ≡ 12112 (mod 15). -/
theorem enumeration_hex4_2f50 : reassembles 12112 = true ∧ castsFifteens 12112 = true := by decide

/-- 2f51: nibbles fold back to 12113; digit sum 23 ≡ 12113 (mod 15). -/
theorem enumeration_hex4_2f51 : reassembles 12113 = true ∧ castsFifteens 12113 = true := by decide

/-- 2f52: nibbles fold back to 12114; digit sum 24 ≡ 12114 (mod 15). -/
theorem enumeration_hex4_2f52 : reassembles 12114 = true ∧ castsFifteens 12114 = true := by decide

/-- 2f53: nibbles fold back to 12115; digit sum 25 ≡ 12115 (mod 15). -/
theorem enumeration_hex4_2f53 : reassembles 12115 = true ∧ castsFifteens 12115 = true := by decide

/-- 2f54: nibbles fold back to 12116; digit sum 26 ≡ 12116 (mod 15). -/
theorem enumeration_hex4_2f54 : reassembles 12116 = true ∧ castsFifteens 12116 = true := by decide

/-- 2f55: nibbles fold back to 12117; digit sum 27 ≡ 12117 (mod 15). -/
theorem enumeration_hex4_2f55 : reassembles 12117 = true ∧ castsFifteens 12117 = true := by decide

/-- 2f56: nibbles fold back to 12118; digit sum 28 ≡ 12118 (mod 15). -/
theorem enumeration_hex4_2f56 : reassembles 12118 = true ∧ castsFifteens 12118 = true := by decide

/-- 2f57: nibbles fold back to 12119; digit sum 29 ≡ 12119 (mod 15). -/
theorem enumeration_hex4_2f57 : reassembles 12119 = true ∧ castsFifteens 12119 = true := by decide

/-- 2f58: nibbles fold back to 12120; digit sum 30 ≡ 12120 (mod 15). -/
theorem enumeration_hex4_2f58 : reassembles 12120 = true ∧ castsFifteens 12120 = true := by decide

/-- 2f59: nibbles fold back to 12121; digit sum 31 ≡ 12121 (mod 15). -/
theorem enumeration_hex4_2f59 : reassembles 12121 = true ∧ castsFifteens 12121 = true := by decide

/-- 2f5a: nibbles fold back to 12122; digit sum 32 ≡ 12122 (mod 15). -/
theorem enumeration_hex4_2f5a : reassembles 12122 = true ∧ castsFifteens 12122 = true := by decide

/-- 2f5b: nibbles fold back to 12123; digit sum 33 ≡ 12123 (mod 15). -/
theorem enumeration_hex4_2f5b : reassembles 12123 = true ∧ castsFifteens 12123 = true := by decide

/-- 2f5c: nibbles fold back to 12124; digit sum 34 ≡ 12124 (mod 15). -/
theorem enumeration_hex4_2f5c : reassembles 12124 = true ∧ castsFifteens 12124 = true := by decide

/-- 2f5d: nibbles fold back to 12125; digit sum 35 ≡ 12125 (mod 15). -/
theorem enumeration_hex4_2f5d : reassembles 12125 = true ∧ castsFifteens 12125 = true := by decide

/-- 2f5e: nibbles fold back to 12126; digit sum 36 ≡ 12126 (mod 15). -/
theorem enumeration_hex4_2f5e : reassembles 12126 = true ∧ castsFifteens 12126 = true := by decide

/-- 2f5f: nibbles fold back to 12127; digit sum 37 ≡ 12127 (mod 15). -/
theorem enumeration_hex4_2f5f : reassembles 12127 = true ∧ castsFifteens 12127 = true := by decide

/-- 2f60: nibbles fold back to 12128; digit sum 23 ≡ 12128 (mod 15). -/
theorem enumeration_hex4_2f60 : reassembles 12128 = true ∧ castsFifteens 12128 = true := by decide

/-- 2f61: nibbles fold back to 12129; digit sum 24 ≡ 12129 (mod 15). -/
theorem enumeration_hex4_2f61 : reassembles 12129 = true ∧ castsFifteens 12129 = true := by decide

/-- 2f62: nibbles fold back to 12130; digit sum 25 ≡ 12130 (mod 15). -/
theorem enumeration_hex4_2f62 : reassembles 12130 = true ∧ castsFifteens 12130 = true := by decide

/-- 2f63: nibbles fold back to 12131; digit sum 26 ≡ 12131 (mod 15). -/
theorem enumeration_hex4_2f63 : reassembles 12131 = true ∧ castsFifteens 12131 = true := by decide

/-- 2f64: nibbles fold back to 12132; digit sum 27 ≡ 12132 (mod 15). -/
theorem enumeration_hex4_2f64 : reassembles 12132 = true ∧ castsFifteens 12132 = true := by decide

/-- 2f65: nibbles fold back to 12133; digit sum 28 ≡ 12133 (mod 15). -/
theorem enumeration_hex4_2f65 : reassembles 12133 = true ∧ castsFifteens 12133 = true := by decide

/-- 2f66: nibbles fold back to 12134; digit sum 29 ≡ 12134 (mod 15). -/
theorem enumeration_hex4_2f66 : reassembles 12134 = true ∧ castsFifteens 12134 = true := by decide

/-- 2f67: nibbles fold back to 12135; digit sum 30 ≡ 12135 (mod 15). -/
theorem enumeration_hex4_2f67 : reassembles 12135 = true ∧ castsFifteens 12135 = true := by decide

/-- 2f68: nibbles fold back to 12136; digit sum 31 ≡ 12136 (mod 15). -/
theorem enumeration_hex4_2f68 : reassembles 12136 = true ∧ castsFifteens 12136 = true := by decide

/-- 2f69: nibbles fold back to 12137; digit sum 32 ≡ 12137 (mod 15). -/
theorem enumeration_hex4_2f69 : reassembles 12137 = true ∧ castsFifteens 12137 = true := by decide

/-- 2f6a: nibbles fold back to 12138; digit sum 33 ≡ 12138 (mod 15). -/
theorem enumeration_hex4_2f6a : reassembles 12138 = true ∧ castsFifteens 12138 = true := by decide

/-- 2f6b: nibbles fold back to 12139; digit sum 34 ≡ 12139 (mod 15). -/
theorem enumeration_hex4_2f6b : reassembles 12139 = true ∧ castsFifteens 12139 = true := by decide

/-- 2f6c: nibbles fold back to 12140; digit sum 35 ≡ 12140 (mod 15). -/
theorem enumeration_hex4_2f6c : reassembles 12140 = true ∧ castsFifteens 12140 = true := by decide

/-- 2f6d: nibbles fold back to 12141; digit sum 36 ≡ 12141 (mod 15). -/
theorem enumeration_hex4_2f6d : reassembles 12141 = true ∧ castsFifteens 12141 = true := by decide

/-- 2f6e: nibbles fold back to 12142; digit sum 37 ≡ 12142 (mod 15). -/
theorem enumeration_hex4_2f6e : reassembles 12142 = true ∧ castsFifteens 12142 = true := by decide

/-- 2f6f: nibbles fold back to 12143; digit sum 38 ≡ 12143 (mod 15). -/
theorem enumeration_hex4_2f6f : reassembles 12143 = true ∧ castsFifteens 12143 = true := by decide

/-- 2f70: nibbles fold back to 12144; digit sum 24 ≡ 12144 (mod 15). -/
theorem enumeration_hex4_2f70 : reassembles 12144 = true ∧ castsFifteens 12144 = true := by decide

/-- 2f71: nibbles fold back to 12145; digit sum 25 ≡ 12145 (mod 15). -/
theorem enumeration_hex4_2f71 : reassembles 12145 = true ∧ castsFifteens 12145 = true := by decide

/-- 2f72: nibbles fold back to 12146; digit sum 26 ≡ 12146 (mod 15). -/
theorem enumeration_hex4_2f72 : reassembles 12146 = true ∧ castsFifteens 12146 = true := by decide

/-- 2f73: nibbles fold back to 12147; digit sum 27 ≡ 12147 (mod 15). -/
theorem enumeration_hex4_2f73 : reassembles 12147 = true ∧ castsFifteens 12147 = true := by decide

/-- 2f74: nibbles fold back to 12148; digit sum 28 ≡ 12148 (mod 15). -/
theorem enumeration_hex4_2f74 : reassembles 12148 = true ∧ castsFifteens 12148 = true := by decide

/-- 2f75: nibbles fold back to 12149; digit sum 29 ≡ 12149 (mod 15). -/
theorem enumeration_hex4_2f75 : reassembles 12149 = true ∧ castsFifteens 12149 = true := by decide

/-- 2f76: nibbles fold back to 12150; digit sum 30 ≡ 12150 (mod 15). -/
theorem enumeration_hex4_2f76 : reassembles 12150 = true ∧ castsFifteens 12150 = true := by decide

/-- 2f77: nibbles fold back to 12151; digit sum 31 ≡ 12151 (mod 15). -/
theorem enumeration_hex4_2f77 : reassembles 12151 = true ∧ castsFifteens 12151 = true := by decide

/-- 2f78: nibbles fold back to 12152; digit sum 32 ≡ 12152 (mod 15). -/
theorem enumeration_hex4_2f78 : reassembles 12152 = true ∧ castsFifteens 12152 = true := by decide

/-- 2f79: nibbles fold back to 12153; digit sum 33 ≡ 12153 (mod 15). -/
theorem enumeration_hex4_2f79 : reassembles 12153 = true ∧ castsFifteens 12153 = true := by decide

/-- 2f7a: nibbles fold back to 12154; digit sum 34 ≡ 12154 (mod 15). -/
theorem enumeration_hex4_2f7a : reassembles 12154 = true ∧ castsFifteens 12154 = true := by decide

/-- 2f7b: nibbles fold back to 12155; digit sum 35 ≡ 12155 (mod 15). -/
theorem enumeration_hex4_2f7b : reassembles 12155 = true ∧ castsFifteens 12155 = true := by decide

/-- 2f7c: nibbles fold back to 12156; digit sum 36 ≡ 12156 (mod 15). -/
theorem enumeration_hex4_2f7c : reassembles 12156 = true ∧ castsFifteens 12156 = true := by decide

/-- 2f7d: nibbles fold back to 12157; digit sum 37 ≡ 12157 (mod 15). -/
theorem enumeration_hex4_2f7d : reassembles 12157 = true ∧ castsFifteens 12157 = true := by decide

/-- 2f7e: nibbles fold back to 12158; digit sum 38 ≡ 12158 (mod 15). -/
theorem enumeration_hex4_2f7e : reassembles 12158 = true ∧ castsFifteens 12158 = true := by decide

/-- 2f7f: nibbles fold back to 12159; digit sum 39 ≡ 12159 (mod 15). -/
theorem enumeration_hex4_2f7f : reassembles 12159 = true ∧ castsFifteens 12159 = true := by decide

/-- 2f80: nibbles fold back to 12160; digit sum 25 ≡ 12160 (mod 15). -/
theorem enumeration_hex4_2f80 : reassembles 12160 = true ∧ castsFifteens 12160 = true := by decide

/-- 2f81: nibbles fold back to 12161; digit sum 26 ≡ 12161 (mod 15). -/
theorem enumeration_hex4_2f81 : reassembles 12161 = true ∧ castsFifteens 12161 = true := by decide

/-- 2f82: nibbles fold back to 12162; digit sum 27 ≡ 12162 (mod 15). -/
theorem enumeration_hex4_2f82 : reassembles 12162 = true ∧ castsFifteens 12162 = true := by decide

/-- 2f83: nibbles fold back to 12163; digit sum 28 ≡ 12163 (mod 15). -/
theorem enumeration_hex4_2f83 : reassembles 12163 = true ∧ castsFifteens 12163 = true := by decide

/-- 2f84: nibbles fold back to 12164; digit sum 29 ≡ 12164 (mod 15). -/
theorem enumeration_hex4_2f84 : reassembles 12164 = true ∧ castsFifteens 12164 = true := by decide

/-- 2f85: nibbles fold back to 12165; digit sum 30 ≡ 12165 (mod 15). -/
theorem enumeration_hex4_2f85 : reassembles 12165 = true ∧ castsFifteens 12165 = true := by decide

/-- 2f86: nibbles fold back to 12166; digit sum 31 ≡ 12166 (mod 15). -/
theorem enumeration_hex4_2f86 : reassembles 12166 = true ∧ castsFifteens 12166 = true := by decide

/-- 2f87: nibbles fold back to 12167; digit sum 32 ≡ 12167 (mod 15). -/
theorem enumeration_hex4_2f87 : reassembles 12167 = true ∧ castsFifteens 12167 = true := by decide

/-- 2f88: nibbles fold back to 12168; digit sum 33 ≡ 12168 (mod 15). -/
theorem enumeration_hex4_2f88 : reassembles 12168 = true ∧ castsFifteens 12168 = true := by decide

/-- 2f89: nibbles fold back to 12169; digit sum 34 ≡ 12169 (mod 15). -/
theorem enumeration_hex4_2f89 : reassembles 12169 = true ∧ castsFifteens 12169 = true := by decide

/-- 2f8a: nibbles fold back to 12170; digit sum 35 ≡ 12170 (mod 15). -/
theorem enumeration_hex4_2f8a : reassembles 12170 = true ∧ castsFifteens 12170 = true := by decide

/-- 2f8b: nibbles fold back to 12171; digit sum 36 ≡ 12171 (mod 15). -/
theorem enumeration_hex4_2f8b : reassembles 12171 = true ∧ castsFifteens 12171 = true := by decide

/-- 2f8c: nibbles fold back to 12172; digit sum 37 ≡ 12172 (mod 15). -/
theorem enumeration_hex4_2f8c : reassembles 12172 = true ∧ castsFifteens 12172 = true := by decide

/-- 2f8d: nibbles fold back to 12173; digit sum 38 ≡ 12173 (mod 15). -/
theorem enumeration_hex4_2f8d : reassembles 12173 = true ∧ castsFifteens 12173 = true := by decide

/-- 2f8e: nibbles fold back to 12174; digit sum 39 ≡ 12174 (mod 15). -/
theorem enumeration_hex4_2f8e : reassembles 12174 = true ∧ castsFifteens 12174 = true := by decide

/-- 2f8f: nibbles fold back to 12175; digit sum 40 ≡ 12175 (mod 15). -/
theorem enumeration_hex4_2f8f : reassembles 12175 = true ∧ castsFifteens 12175 = true := by decide

/-- 2f90: nibbles fold back to 12176; digit sum 26 ≡ 12176 (mod 15). -/
theorem enumeration_hex4_2f90 : reassembles 12176 = true ∧ castsFifteens 12176 = true := by decide

/-- 2f91: nibbles fold back to 12177; digit sum 27 ≡ 12177 (mod 15). -/
theorem enumeration_hex4_2f91 : reassembles 12177 = true ∧ castsFifteens 12177 = true := by decide

/-- 2f92: nibbles fold back to 12178; digit sum 28 ≡ 12178 (mod 15). -/
theorem enumeration_hex4_2f92 : reassembles 12178 = true ∧ castsFifteens 12178 = true := by decide

/-- 2f93: nibbles fold back to 12179; digit sum 29 ≡ 12179 (mod 15). -/
theorem enumeration_hex4_2f93 : reassembles 12179 = true ∧ castsFifteens 12179 = true := by decide

/-- 2f94: nibbles fold back to 12180; digit sum 30 ≡ 12180 (mod 15). -/
theorem enumeration_hex4_2f94 : reassembles 12180 = true ∧ castsFifteens 12180 = true := by decide

/-- 2f95: nibbles fold back to 12181; digit sum 31 ≡ 12181 (mod 15). -/
theorem enumeration_hex4_2f95 : reassembles 12181 = true ∧ castsFifteens 12181 = true := by decide

/-- 2f96: nibbles fold back to 12182; digit sum 32 ≡ 12182 (mod 15). -/
theorem enumeration_hex4_2f96 : reassembles 12182 = true ∧ castsFifteens 12182 = true := by decide

/-- 2f97: nibbles fold back to 12183; digit sum 33 ≡ 12183 (mod 15). -/
theorem enumeration_hex4_2f97 : reassembles 12183 = true ∧ castsFifteens 12183 = true := by decide

/-- 2f98: nibbles fold back to 12184; digit sum 34 ≡ 12184 (mod 15). -/
theorem enumeration_hex4_2f98 : reassembles 12184 = true ∧ castsFifteens 12184 = true := by decide

/-- 2f99: nibbles fold back to 12185; digit sum 35 ≡ 12185 (mod 15). -/
theorem enumeration_hex4_2f99 : reassembles 12185 = true ∧ castsFifteens 12185 = true := by decide

/-- 2f9a: nibbles fold back to 12186; digit sum 36 ≡ 12186 (mod 15). -/
theorem enumeration_hex4_2f9a : reassembles 12186 = true ∧ castsFifteens 12186 = true := by decide

/-- 2f9b: nibbles fold back to 12187; digit sum 37 ≡ 12187 (mod 15). -/
theorem enumeration_hex4_2f9b : reassembles 12187 = true ∧ castsFifteens 12187 = true := by decide

/-- 2f9c: nibbles fold back to 12188; digit sum 38 ≡ 12188 (mod 15). -/
theorem enumeration_hex4_2f9c : reassembles 12188 = true ∧ castsFifteens 12188 = true := by decide

/-- 2f9d: nibbles fold back to 12189; digit sum 39 ≡ 12189 (mod 15). -/
theorem enumeration_hex4_2f9d : reassembles 12189 = true ∧ castsFifteens 12189 = true := by decide

/-- 2f9e: nibbles fold back to 12190; digit sum 40 ≡ 12190 (mod 15). -/
theorem enumeration_hex4_2f9e : reassembles 12190 = true ∧ castsFifteens 12190 = true := by decide

/-- 2f9f: nibbles fold back to 12191; digit sum 41 ≡ 12191 (mod 15). -/
theorem enumeration_hex4_2f9f : reassembles 12191 = true ∧ castsFifteens 12191 = true := by decide

/-- 2fa0: nibbles fold back to 12192; digit sum 27 ≡ 12192 (mod 15). -/
theorem enumeration_hex4_2fa0 : reassembles 12192 = true ∧ castsFifteens 12192 = true := by decide

/-- 2fa1: nibbles fold back to 12193; digit sum 28 ≡ 12193 (mod 15). -/
theorem enumeration_hex4_2fa1 : reassembles 12193 = true ∧ castsFifteens 12193 = true := by decide

/-- 2fa2: nibbles fold back to 12194; digit sum 29 ≡ 12194 (mod 15). -/
theorem enumeration_hex4_2fa2 : reassembles 12194 = true ∧ castsFifteens 12194 = true := by decide

/-- 2fa3: nibbles fold back to 12195; digit sum 30 ≡ 12195 (mod 15). -/
theorem enumeration_hex4_2fa3 : reassembles 12195 = true ∧ castsFifteens 12195 = true := by decide

/-- 2fa4: nibbles fold back to 12196; digit sum 31 ≡ 12196 (mod 15). -/
theorem enumeration_hex4_2fa4 : reassembles 12196 = true ∧ castsFifteens 12196 = true := by decide

/-- 2fa5: nibbles fold back to 12197; digit sum 32 ≡ 12197 (mod 15). -/
theorem enumeration_hex4_2fa5 : reassembles 12197 = true ∧ castsFifteens 12197 = true := by decide

/-- 2fa6: nibbles fold back to 12198; digit sum 33 ≡ 12198 (mod 15). -/
theorem enumeration_hex4_2fa6 : reassembles 12198 = true ∧ castsFifteens 12198 = true := by decide

/-- 2fa7: nibbles fold back to 12199; digit sum 34 ≡ 12199 (mod 15). -/
theorem enumeration_hex4_2fa7 : reassembles 12199 = true ∧ castsFifteens 12199 = true := by decide

/-- 2fa8: nibbles fold back to 12200; digit sum 35 ≡ 12200 (mod 15). -/
theorem enumeration_hex4_2fa8 : reassembles 12200 = true ∧ castsFifteens 12200 = true := by decide

/-- 2fa9: nibbles fold back to 12201; digit sum 36 ≡ 12201 (mod 15). -/
theorem enumeration_hex4_2fa9 : reassembles 12201 = true ∧ castsFifteens 12201 = true := by decide

/-- 2faa: nibbles fold back to 12202; digit sum 37 ≡ 12202 (mod 15). -/
theorem enumeration_hex4_2faa : reassembles 12202 = true ∧ castsFifteens 12202 = true := by decide

/-- 2fab: nibbles fold back to 12203; digit sum 38 ≡ 12203 (mod 15). -/
theorem enumeration_hex4_2fab : reassembles 12203 = true ∧ castsFifteens 12203 = true := by decide

/-- 2fac: nibbles fold back to 12204; digit sum 39 ≡ 12204 (mod 15). -/
theorem enumeration_hex4_2fac : reassembles 12204 = true ∧ castsFifteens 12204 = true := by decide

/-- 2fad: nibbles fold back to 12205; digit sum 40 ≡ 12205 (mod 15). -/
theorem enumeration_hex4_2fad : reassembles 12205 = true ∧ castsFifteens 12205 = true := by decide

/-- 2fae: nibbles fold back to 12206; digit sum 41 ≡ 12206 (mod 15). -/
theorem enumeration_hex4_2fae : reassembles 12206 = true ∧ castsFifteens 12206 = true := by decide

/-- 2faf: nibbles fold back to 12207; digit sum 42 ≡ 12207 (mod 15). -/
theorem enumeration_hex4_2faf : reassembles 12207 = true ∧ castsFifteens 12207 = true := by decide

/-- 2fb0: nibbles fold back to 12208; digit sum 28 ≡ 12208 (mod 15). -/
theorem enumeration_hex4_2fb0 : reassembles 12208 = true ∧ castsFifteens 12208 = true := by decide

/-- 2fb1: nibbles fold back to 12209; digit sum 29 ≡ 12209 (mod 15). -/
theorem enumeration_hex4_2fb1 : reassembles 12209 = true ∧ castsFifteens 12209 = true := by decide

/-- 2fb2: nibbles fold back to 12210; digit sum 30 ≡ 12210 (mod 15). -/
theorem enumeration_hex4_2fb2 : reassembles 12210 = true ∧ castsFifteens 12210 = true := by decide

/-- 2fb3: nibbles fold back to 12211; digit sum 31 ≡ 12211 (mod 15). -/
theorem enumeration_hex4_2fb3 : reassembles 12211 = true ∧ castsFifteens 12211 = true := by decide

/-- 2fb4: nibbles fold back to 12212; digit sum 32 ≡ 12212 (mod 15). -/
theorem enumeration_hex4_2fb4 : reassembles 12212 = true ∧ castsFifteens 12212 = true := by decide

/-- 2fb5: nibbles fold back to 12213; digit sum 33 ≡ 12213 (mod 15). -/
theorem enumeration_hex4_2fb5 : reassembles 12213 = true ∧ castsFifteens 12213 = true := by decide

/-- 2fb6: nibbles fold back to 12214; digit sum 34 ≡ 12214 (mod 15). -/
theorem enumeration_hex4_2fb6 : reassembles 12214 = true ∧ castsFifteens 12214 = true := by decide

/-- 2fb7: nibbles fold back to 12215; digit sum 35 ≡ 12215 (mod 15). -/
theorem enumeration_hex4_2fb7 : reassembles 12215 = true ∧ castsFifteens 12215 = true := by decide

/-- 2fb8: nibbles fold back to 12216; digit sum 36 ≡ 12216 (mod 15). -/
theorem enumeration_hex4_2fb8 : reassembles 12216 = true ∧ castsFifteens 12216 = true := by decide

/-- 2fb9: nibbles fold back to 12217; digit sum 37 ≡ 12217 (mod 15). -/
theorem enumeration_hex4_2fb9 : reassembles 12217 = true ∧ castsFifteens 12217 = true := by decide

/-- 2fba: nibbles fold back to 12218; digit sum 38 ≡ 12218 (mod 15). -/
theorem enumeration_hex4_2fba : reassembles 12218 = true ∧ castsFifteens 12218 = true := by decide

/-- 2fbb: nibbles fold back to 12219; digit sum 39 ≡ 12219 (mod 15). -/
theorem enumeration_hex4_2fbb : reassembles 12219 = true ∧ castsFifteens 12219 = true := by decide

/-- 2fbc: nibbles fold back to 12220; digit sum 40 ≡ 12220 (mod 15). -/
theorem enumeration_hex4_2fbc : reassembles 12220 = true ∧ castsFifteens 12220 = true := by decide

/-- 2fbd: nibbles fold back to 12221; digit sum 41 ≡ 12221 (mod 15). -/
theorem enumeration_hex4_2fbd : reassembles 12221 = true ∧ castsFifteens 12221 = true := by decide

/-- 2fbe: nibbles fold back to 12222; digit sum 42 ≡ 12222 (mod 15). -/
theorem enumeration_hex4_2fbe : reassembles 12222 = true ∧ castsFifteens 12222 = true := by decide

/-- 2fbf: nibbles fold back to 12223; digit sum 43 ≡ 12223 (mod 15). -/
theorem enumeration_hex4_2fbf : reassembles 12223 = true ∧ castsFifteens 12223 = true := by decide

/-- 2fc0: nibbles fold back to 12224; digit sum 29 ≡ 12224 (mod 15). -/
theorem enumeration_hex4_2fc0 : reassembles 12224 = true ∧ castsFifteens 12224 = true := by decide

/-- 2fc1: nibbles fold back to 12225; digit sum 30 ≡ 12225 (mod 15). -/
theorem enumeration_hex4_2fc1 : reassembles 12225 = true ∧ castsFifteens 12225 = true := by decide

/-- 2fc2: nibbles fold back to 12226; digit sum 31 ≡ 12226 (mod 15). -/
theorem enumeration_hex4_2fc2 : reassembles 12226 = true ∧ castsFifteens 12226 = true := by decide

/-- 2fc3: nibbles fold back to 12227; digit sum 32 ≡ 12227 (mod 15). -/
theorem enumeration_hex4_2fc3 : reassembles 12227 = true ∧ castsFifteens 12227 = true := by decide

/-- 2fc4: nibbles fold back to 12228; digit sum 33 ≡ 12228 (mod 15). -/
theorem enumeration_hex4_2fc4 : reassembles 12228 = true ∧ castsFifteens 12228 = true := by decide

/-- 2fc5: nibbles fold back to 12229; digit sum 34 ≡ 12229 (mod 15). -/
theorem enumeration_hex4_2fc5 : reassembles 12229 = true ∧ castsFifteens 12229 = true := by decide

/-- 2fc6: nibbles fold back to 12230; digit sum 35 ≡ 12230 (mod 15). -/
theorem enumeration_hex4_2fc6 : reassembles 12230 = true ∧ castsFifteens 12230 = true := by decide

/-- 2fc7: nibbles fold back to 12231; digit sum 36 ≡ 12231 (mod 15). -/
theorem enumeration_hex4_2fc7 : reassembles 12231 = true ∧ castsFifteens 12231 = true := by decide

/-- 2fc8: nibbles fold back to 12232; digit sum 37 ≡ 12232 (mod 15). -/
theorem enumeration_hex4_2fc8 : reassembles 12232 = true ∧ castsFifteens 12232 = true := by decide

/-- 2fc9: nibbles fold back to 12233; digit sum 38 ≡ 12233 (mod 15). -/
theorem enumeration_hex4_2fc9 : reassembles 12233 = true ∧ castsFifteens 12233 = true := by decide

/-- 2fca: nibbles fold back to 12234; digit sum 39 ≡ 12234 (mod 15). -/
theorem enumeration_hex4_2fca : reassembles 12234 = true ∧ castsFifteens 12234 = true := by decide

/-- 2fcb: nibbles fold back to 12235; digit sum 40 ≡ 12235 (mod 15). -/
theorem enumeration_hex4_2fcb : reassembles 12235 = true ∧ castsFifteens 12235 = true := by decide

/-- 2fcc: nibbles fold back to 12236; digit sum 41 ≡ 12236 (mod 15). -/
theorem enumeration_hex4_2fcc : reassembles 12236 = true ∧ castsFifteens 12236 = true := by decide

/-- 2fcd: nibbles fold back to 12237; digit sum 42 ≡ 12237 (mod 15). -/
theorem enumeration_hex4_2fcd : reassembles 12237 = true ∧ castsFifteens 12237 = true := by decide

/-- 2fce: nibbles fold back to 12238; digit sum 43 ≡ 12238 (mod 15). -/
theorem enumeration_hex4_2fce : reassembles 12238 = true ∧ castsFifteens 12238 = true := by decide

/-- 2fcf: nibbles fold back to 12239; digit sum 44 ≡ 12239 (mod 15). -/
theorem enumeration_hex4_2fcf : reassembles 12239 = true ∧ castsFifteens 12239 = true := by decide

/-- 2fd0: nibbles fold back to 12240; digit sum 30 ≡ 12240 (mod 15). -/
theorem enumeration_hex4_2fd0 : reassembles 12240 = true ∧ castsFifteens 12240 = true := by decide

/-- 2fd1: nibbles fold back to 12241; digit sum 31 ≡ 12241 (mod 15). -/
theorem enumeration_hex4_2fd1 : reassembles 12241 = true ∧ castsFifteens 12241 = true := by decide

/-- 2fd2: nibbles fold back to 12242; digit sum 32 ≡ 12242 (mod 15). -/
theorem enumeration_hex4_2fd2 : reassembles 12242 = true ∧ castsFifteens 12242 = true := by decide

/-- 2fd3: nibbles fold back to 12243; digit sum 33 ≡ 12243 (mod 15). -/
theorem enumeration_hex4_2fd3 : reassembles 12243 = true ∧ castsFifteens 12243 = true := by decide

/-- 2fd4: nibbles fold back to 12244; digit sum 34 ≡ 12244 (mod 15). -/
theorem enumeration_hex4_2fd4 : reassembles 12244 = true ∧ castsFifteens 12244 = true := by decide

/-- 2fd5: nibbles fold back to 12245; digit sum 35 ≡ 12245 (mod 15). -/
theorem enumeration_hex4_2fd5 : reassembles 12245 = true ∧ castsFifteens 12245 = true := by decide

/-- 2fd6: nibbles fold back to 12246; digit sum 36 ≡ 12246 (mod 15). -/
theorem enumeration_hex4_2fd6 : reassembles 12246 = true ∧ castsFifteens 12246 = true := by decide

/-- 2fd7: nibbles fold back to 12247; digit sum 37 ≡ 12247 (mod 15). -/
theorem enumeration_hex4_2fd7 : reassembles 12247 = true ∧ castsFifteens 12247 = true := by decide

/-- 2fd8: nibbles fold back to 12248; digit sum 38 ≡ 12248 (mod 15). -/
theorem enumeration_hex4_2fd8 : reassembles 12248 = true ∧ castsFifteens 12248 = true := by decide

/-- 2fd9: nibbles fold back to 12249; digit sum 39 ≡ 12249 (mod 15). -/
theorem enumeration_hex4_2fd9 : reassembles 12249 = true ∧ castsFifteens 12249 = true := by decide

/-- 2fda: nibbles fold back to 12250; digit sum 40 ≡ 12250 (mod 15). -/
theorem enumeration_hex4_2fda : reassembles 12250 = true ∧ castsFifteens 12250 = true := by decide

/-- 2fdb: nibbles fold back to 12251; digit sum 41 ≡ 12251 (mod 15). -/
theorem enumeration_hex4_2fdb : reassembles 12251 = true ∧ castsFifteens 12251 = true := by decide

/-- 2fdc: nibbles fold back to 12252; digit sum 42 ≡ 12252 (mod 15). -/
theorem enumeration_hex4_2fdc : reassembles 12252 = true ∧ castsFifteens 12252 = true := by decide

/-- 2fdd: nibbles fold back to 12253; digit sum 43 ≡ 12253 (mod 15). -/
theorem enumeration_hex4_2fdd : reassembles 12253 = true ∧ castsFifteens 12253 = true := by decide

/-- 2fde: nibbles fold back to 12254; digit sum 44 ≡ 12254 (mod 15). -/
theorem enumeration_hex4_2fde : reassembles 12254 = true ∧ castsFifteens 12254 = true := by decide

/-- 2fdf: nibbles fold back to 12255; digit sum 45 ≡ 12255 (mod 15). -/
theorem enumeration_hex4_2fdf : reassembles 12255 = true ∧ castsFifteens 12255 = true := by decide

/-- 2fe0: nibbles fold back to 12256; digit sum 31 ≡ 12256 (mod 15). -/
theorem enumeration_hex4_2fe0 : reassembles 12256 = true ∧ castsFifteens 12256 = true := by decide

/-- 2fe1: nibbles fold back to 12257; digit sum 32 ≡ 12257 (mod 15). -/
theorem enumeration_hex4_2fe1 : reassembles 12257 = true ∧ castsFifteens 12257 = true := by decide

/-- 2fe2: nibbles fold back to 12258; digit sum 33 ≡ 12258 (mod 15). -/
theorem enumeration_hex4_2fe2 : reassembles 12258 = true ∧ castsFifteens 12258 = true := by decide

/-- 2fe3: nibbles fold back to 12259; digit sum 34 ≡ 12259 (mod 15). -/
theorem enumeration_hex4_2fe3 : reassembles 12259 = true ∧ castsFifteens 12259 = true := by decide

/-- 2fe4: nibbles fold back to 12260; digit sum 35 ≡ 12260 (mod 15). -/
theorem enumeration_hex4_2fe4 : reassembles 12260 = true ∧ castsFifteens 12260 = true := by decide

/-- 2fe5: nibbles fold back to 12261; digit sum 36 ≡ 12261 (mod 15). -/
theorem enumeration_hex4_2fe5 : reassembles 12261 = true ∧ castsFifteens 12261 = true := by decide

/-- 2fe6: nibbles fold back to 12262; digit sum 37 ≡ 12262 (mod 15). -/
theorem enumeration_hex4_2fe6 : reassembles 12262 = true ∧ castsFifteens 12262 = true := by decide

/-- 2fe7: nibbles fold back to 12263; digit sum 38 ≡ 12263 (mod 15). -/
theorem enumeration_hex4_2fe7 : reassembles 12263 = true ∧ castsFifteens 12263 = true := by decide

/-- 2fe8: nibbles fold back to 12264; digit sum 39 ≡ 12264 (mod 15). -/
theorem enumeration_hex4_2fe8 : reassembles 12264 = true ∧ castsFifteens 12264 = true := by decide

/-- 2fe9: nibbles fold back to 12265; digit sum 40 ≡ 12265 (mod 15). -/
theorem enumeration_hex4_2fe9 : reassembles 12265 = true ∧ castsFifteens 12265 = true := by decide

/-- 2fea: nibbles fold back to 12266; digit sum 41 ≡ 12266 (mod 15). -/
theorem enumeration_hex4_2fea : reassembles 12266 = true ∧ castsFifteens 12266 = true := by decide

/-- 2feb: nibbles fold back to 12267; digit sum 42 ≡ 12267 (mod 15). -/
theorem enumeration_hex4_2feb : reassembles 12267 = true ∧ castsFifteens 12267 = true := by decide

/-- 2fec: nibbles fold back to 12268; digit sum 43 ≡ 12268 (mod 15). -/
theorem enumeration_hex4_2fec : reassembles 12268 = true ∧ castsFifteens 12268 = true := by decide

/-- 2fed: nibbles fold back to 12269; digit sum 44 ≡ 12269 (mod 15). -/
theorem enumeration_hex4_2fed : reassembles 12269 = true ∧ castsFifteens 12269 = true := by decide

/-- 2fee: nibbles fold back to 12270; digit sum 45 ≡ 12270 (mod 15). -/
theorem enumeration_hex4_2fee : reassembles 12270 = true ∧ castsFifteens 12270 = true := by decide

/-- 2fef: nibbles fold back to 12271; digit sum 46 ≡ 12271 (mod 15). -/
theorem enumeration_hex4_2fef : reassembles 12271 = true ∧ castsFifteens 12271 = true := by decide

/-- 2ff0: nibbles fold back to 12272; digit sum 32 ≡ 12272 (mod 15). -/
theorem enumeration_hex4_2ff0 : reassembles 12272 = true ∧ castsFifteens 12272 = true := by decide

/-- 2ff1: nibbles fold back to 12273; digit sum 33 ≡ 12273 (mod 15). -/
theorem enumeration_hex4_2ff1 : reassembles 12273 = true ∧ castsFifteens 12273 = true := by decide

/-- 2ff2: nibbles fold back to 12274; digit sum 34 ≡ 12274 (mod 15). -/
theorem enumeration_hex4_2ff2 : reassembles 12274 = true ∧ castsFifteens 12274 = true := by decide

/-- 2ff3: nibbles fold back to 12275; digit sum 35 ≡ 12275 (mod 15). -/
theorem enumeration_hex4_2ff3 : reassembles 12275 = true ∧ castsFifteens 12275 = true := by decide

/-- 2ff4: nibbles fold back to 12276; digit sum 36 ≡ 12276 (mod 15). -/
theorem enumeration_hex4_2ff4 : reassembles 12276 = true ∧ castsFifteens 12276 = true := by decide

/-- 2ff5: nibbles fold back to 12277; digit sum 37 ≡ 12277 (mod 15). -/
theorem enumeration_hex4_2ff5 : reassembles 12277 = true ∧ castsFifteens 12277 = true := by decide

/-- 2ff6: nibbles fold back to 12278; digit sum 38 ≡ 12278 (mod 15). -/
theorem enumeration_hex4_2ff6 : reassembles 12278 = true ∧ castsFifteens 12278 = true := by decide

/-- 2ff7: nibbles fold back to 12279; digit sum 39 ≡ 12279 (mod 15). -/
theorem enumeration_hex4_2ff7 : reassembles 12279 = true ∧ castsFifteens 12279 = true := by decide

/-- 2ff8: nibbles fold back to 12280; digit sum 40 ≡ 12280 (mod 15). -/
theorem enumeration_hex4_2ff8 : reassembles 12280 = true ∧ castsFifteens 12280 = true := by decide

/-- 2ff9: nibbles fold back to 12281; digit sum 41 ≡ 12281 (mod 15). -/
theorem enumeration_hex4_2ff9 : reassembles 12281 = true ∧ castsFifteens 12281 = true := by decide

/-- 2ffa: nibbles fold back to 12282; digit sum 42 ≡ 12282 (mod 15). -/
theorem enumeration_hex4_2ffa : reassembles 12282 = true ∧ castsFifteens 12282 = true := by decide

/-- 2ffb: nibbles fold back to 12283; digit sum 43 ≡ 12283 (mod 15). -/
theorem enumeration_hex4_2ffb : reassembles 12283 = true ∧ castsFifteens 12283 = true := by decide

/-- 2ffc: nibbles fold back to 12284; digit sum 44 ≡ 12284 (mod 15). -/
theorem enumeration_hex4_2ffc : reassembles 12284 = true ∧ castsFifteens 12284 = true := by decide

/-- 2ffd: nibbles fold back to 12285; digit sum 45 ≡ 12285 (mod 15). -/
theorem enumeration_hex4_2ffd : reassembles 12285 = true ∧ castsFifteens 12285 = true := by decide

/-- 2ffe: nibbles fold back to 12286; digit sum 46 ≡ 12286 (mod 15). -/
theorem enumeration_hex4_2ffe : reassembles 12286 = true ∧ castsFifteens 12286 = true := by decide

/-- 2fff: nibbles fold back to 12287; digit sum 47 ≡ 12287 (mod 15). -/
theorem enumeration_hex4_2fff : reassembles 12287 = true ∧ castsFifteens 12287 = true := by decide
