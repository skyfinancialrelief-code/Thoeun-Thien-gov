import { ClaimItem } from '../types';

export const CLAIMS_MATRIX_DATA: ClaimItem[] = [
  {
    id: "CLM-001",
    claimTitle: "Cryptographic Hash Chaining Verification",
    previousText: "The state hash chain is unbreakably chained across execution blocks.",
    correctedText: "SHA-256 commitments form a deterministic tamper-evident chain. Cryptographic assurance remains subject to the security assumptions of SHA-256 and the deployment’s storage and anchoring controls.",
    category: "Cryptographic Security",
    status: "RECTIFIED",
    evidence: "Verified via Test Vectors. Validates strict precursor hash verification without making imprecise non-mathematical absolute claims.",
    technicalNote: "Precision update committed in CLAIMS-MATRIX.md (commit 00764ef). Replaced informal language with formal cryptographic hash linkage terminology."
  },
  {
    id: "CLM-002",
    claimTitle: "VEK Canonical JSON Profile",
    previousText: "RFC 8785 implementation performing recursive key sorting.",
    correctedText: "VEK Canonical JSON Profile with deterministic key ordering, UTF-8 encoding, integer-only schema fields, and rejection of noncanonical values.",
    category: "JSON Canonicalization",
    status: "RECTIFIED",
    evidence: "Verified via Canonicalization Rejection & Transition Test Vectors.",
    technicalNote: "Precision update committed in CLAIMS-MATRIX.md (commit 00764ef). Replaced full RFC 8785 claims with exact VEK profile constraints."
  },
  {
    id: "CLM-003",
    claimTitle: "Engine Execution Architecture",
    previousText: "Multi-language native execution engine supporting TypeScript, Rust, and WebAssembly.",
    correctedText: "Core evaluation-ready reference implementation is implemented and fully verified (33/33 vectors) in TypeScript. Rust and WebAssembly modules are honestly classified as ADAPTER ONLY wrappers for host integration rather than standalone parallel execution engines.",
    category: "Multi-Language Architecture",
    status: "RECTIFIED",
    evidence: "Verified in Engine Status Matrix. TypeScript engine passes all 33 test vectors; Rust/WASM adapters pass through host calls to verified TS bindings.",
    technicalNote: "Accurate architectural disclosure preventing misleading multi-language runtime claims."
  },
  {
    id: "CLM-004",
    claimTitle: "Evaluation Licensing & Data Rights Scope",
    previousText: "Open Source MIT License distribution.",
    correctedText: "License and Data Rights: Government rights in software, documentation, technical data, and evaluation artifacts are determined solely by the final written order and incorporated license. No additional rights are granted by this webpage. Guts Deterministic Technology LLC retains all preexisting intellectual-property and patent rights.",
    category: "Performance & Scope",
    status: "RECTIFIED",
    evidence: "LICENSE file updated in repository root. Explicitly reserves commercial patent rights while granting evaluation rights to government evaluators.",
    technicalNote: "Ensures government evaluators have clear legal terms under incorporated license agreement."
  },
  {
    id: "CLM-005",
    claimTitle: "Schema Bounds Enforcement",
    correctedText: "Enforces deterministic string, array, and nested object depth constraints prior to cryptographic hashing.",
    category: "Cryptographic Security",
    status: "VERIFIED",
    evidence: "U64 Boundary test vectors confirm immediate payload rejection upon exceeding depth/length bounds.",
    technicalNote: "Prevents hash collision and memory exhaust vectors during canonical payload processing."
  },
  {
    id: "CLM-006",
    claimTitle: "Deterministic State Transition Invariants",
    correctedText: "33 deterministic vectors: 10 successful transitions, 10 typed halts, 8 U64 boundary cases, and 5 canonicalization rejection cases.",
    category: "Performance & Scope",
    status: "VERIFIED",
    evidence: "100% pass rate (33/33) on reference TypeScript engine harness.",
    technicalNote: "Guarantees state replay resistance and state machine invariant verification."
  }
];
