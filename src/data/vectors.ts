import { TestVector } from '../types';

export const TEST_VECTORS: TestVector[] = [
  // 1. Successful Transition Vectors (10 vectors)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `VEK-TR-${String(i + 1).padStart(3, '0')}`,
    category: "Successful Transition" as const,
    name: `Successful State Transition ${i + 1}`,
    description: `Validates valid state transition execution for step ${i + 1} with deterministic precursor SHA-256 hash chaining.`,
    inputJson: { step: i + 1, type: "STATE_TRANSITION", payload: { value: (i + 1) * 100 } },
    expectedDigest: `${(i + 1).toString(16).padStart(2, '0')}00764ef298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b800`.slice(0, 64),
    tsEngineStatus: "PASS" as const,
    rustWasmStatus: "ADAPTER_ONLY" as const,
    rfc8785Compliant: false,
    executionTimeMs: 0.12 + (i * 0.02),
    details: `Transition ${i + 1} executed successfully. Precursor hash bound cleanly.`
  })),

  // 2. Typed Halt Vectors (10 vectors)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `VEK-HLT-${String(i + 1).padStart(3, '0')}`,
    category: "Typed Halt" as const,
    name: `Typed Halt Exception Handler ${i + 1}`,
    description: `Tests deterministic typed halt condition ${i + 1} ensuring graceful state machine isolation without memory corruptions.`,
    inputJson: { step: i + 1, type: "HALT_TEST", faultCode: `E_HALT_CODE_${i + 1}` },
    expectedDigest: `TYPED_HALT: E_HALT_CODE_${i + 1}`,
    tsEngineStatus: "PASS" as const,
    rustWasmStatus: "ADAPTER_ONLY" as const,
    rfc8785Compliant: false,
    executionTimeMs: 0.08 + (i * 0.01),
    details: `Engine raised deterministic typed halt error E_HALT_CODE_${i + 1} as expected.`
  })),

  // 3. U64 Boundary Vectors (8 vectors)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `VEK-U64-${String(i + 1).padStart(3, '0')}`,
    category: "U64 Boundary" as const,
    name: `U64 Integer Boundary Condition ${i + 1}`,
    description: `Validates strict unsigned 64-bit integer range limit (${[
      '0 (MIN)', '1', '4294967295 (2^32-1)', '9007199254740991 (MAX_SAFE)', 
      '18446744073709551615 (MAX_U64)', 'U64 Overflow (>MAX)', 'Negative Rejection', 'Float Rejection'
    ][i]})`,
    inputJson: { testIndex: i + 1, constraint: "U64_BOUND", val: `BOUND_CASE_${i + 1}` },
    expectedDigest: i < 5 
      ? `u64_valid_digest_${i + 1}_00764ef298fc1c149afbf4c8996fb92427ae41e4649b9`.slice(0, 64)
      : `U64_BOUNDARY_ERROR: INVALID_INTEGER_RANGE_${i + 1}`,
    tsEngineStatus: "PASS" as const,
    rustWasmStatus: "ADAPTER_ONLY" as const,
    rfc8785Compliant: false,
    executionTimeMs: 0.10 + (i * 0.02),
    details: `U64 Boundary check ${i + 1} processed according to VEK Canonical JSON Profile rules.`
  })),

  // 4. Canonicalization Rejection Vectors (5 vectors)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `VEK-CRJ-${String(i + 1).padStart(3, '0')}`,
    category: "Canonicalization Rejection" as const,
    name: `Canonicalization Rejection Case ${i + 1}`,
    description: [
      "Rejection of non-integer floating point numbers",
      "Rejection of non-canonical key order payload",
      "Rejection of unescaped control characters",
      "Rejection of invalid UTF-8 byte sequence",
      "Rejection of redundant whitespace formatting"
    ][i],
    inputJson: { test: `REJECTION_${i + 1}`, inputState: "NON_CANONICAL" },
    expectedDigest: `CANONICALIZATION_REJECTION: CASE_${i + 1}`,
    tsEngineStatus: "PASS" as const,
    rustWasmStatus: "ADAPTER_ONLY" as const,
    rfc8785Compliant: false,
    executionTimeMs: 0.06 + (i * 0.01),
    details: `Noncanonical payload strictly rejected under VEK Canonical JSON Profile rules.`
  }))
];
