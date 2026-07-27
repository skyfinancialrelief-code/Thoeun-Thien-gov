import { Deliverable } from '../types';

const COMMON_DATA_RIGHTS = "License and Data Rights: Government rights in software, documentation, technical data, and evaluation artifacts are determined solely by the final written order and incorporated license. No additional rights are granted by this webpage. Guts Deterministic Technology LLC retains all preexisting intellectual-property and patent rights.";

export const DELIVERABLES_DATA: Deliverable[] = [
  {
    id: 1,
    title: "VEK-7 Conformance Demonstrator Engine v0.1.0",
    subtitle: "TypeScript Core Engine Source & Runtime Distribution",
    summary: "Evaluation-ready TypeScript reference implementation with source code, build scripts, and deterministic test harnesses.",
    scope: [
      "TypeScript v5.8+ full source distribution with zero external runtime telemetry",
      "Deterministic evaluation harness for immediate local execution",
      "Pre-packaged verification scripts for offline air-gapped evaluation",
      "Comprehensive TypeScript interfaces and build manifest"
    ],
    acceptanceCriteria: "Successful offline compilation and clean execution of standard demonstration script on Node.js runtime without external network calls.",
    dataRights: COMMON_DATA_RIGHTS
  },
  {
    id: 2,
    title: "33 Verified Conformance Test Vector Suite",
    subtitle: "Automated Verification Test Matrix & Log Generator",
    summary: "33 deterministic vectors: 10 successful transitions, 10 typed halts, 8 U64 boundary cases, and 5 canonicalization rejection cases with JSON log exports.",
    scope: [
      "10 Successful state transition vectors",
      "10 Typed halt error handling vectors",
      "8 U64 boundary constraint validation vectors",
      "5 Canonicalization rejection test vectors",
      "Automated execution summary logger emitting structured JSON and CLI reports"
    ],
    acceptanceCriteria: "100% pass rate (33/33) on the TypeScript engine harness with reproducible SHA-256 state hashes.",
    dataRights: COMMON_DATA_RIGHTS
  },
  {
    id: 3,
    title: "Updated Claims Matrix & Technical Audit Report",
    subtitle: "Rectified Cryptographic & Architectural Claims (CLAIMS-MATRIX.md)",
    summary: "Formal engineering dossier clarifying state hash chaining, VEK Canonical JSON Profile, and adapter-only engine boundaries (reflecting commit 00764ef updates).",
    scope: [
      "SHA-256 commitments form a deterministic tamper-evident chain. Cryptographic assurance remains subject to the security assumptions of SHA-256 and the deployment’s storage and anchoring controls.",
      "VEK Canonical JSON Profile with deterministic key ordering, UTF-8 encoding, integer-only schema fields, and rejection of noncanonical values.",
      "Engine boundary disclosures classifying Rust & WASM modules as ADAPTER ONLY",
      "Security boundary documentation and threat model assumptions"
    ],
    acceptanceCriteria: "Documented alignment between code behavior and claims matrix line items with explicit revision history.",
    dataRights: COMMON_DATA_RIGHTS
  },
  {
    id: 4,
    title: "Rust & WASM Adapter Technical Specification",
    subtitle: "Honest Binding Architecture & Host Integration Guide",
    summary: "Detailed technical documentation specifying the FFI interface and WASM binding layers, explicitly clarifying adapter-only status to prevent architectural misinterpretation.",
    scope: [
      "WASM / Rust FFI bridge specifications for web and native host integration",
      "Host-to-TypeScript engine proxy boundary documentation",
      "Memory management and buffer marshalling safety standards",
      "Benchmarking methodology comparing native TS execution vs adapter invocation overhead"
    ],
    acceptanceCriteria: "Clear architectural diagrams and binding code proving non-duplication of engine logic.",
    dataRights: COMMON_DATA_RIGHTS
  },
  {
    id: 5,
    title: "Government Evaluation License & Patent Reservation Dossier",
    subtitle: "Proprietary License Terms & Government Rights Agreement",
    summary: "Formal legal terms establishing the Proprietary Evaluation License, patent reservation boundaries, and government evaluation usage permissions.",
    scope: [
      "Proprietary Evaluation License agreement granting internal agency testing rights",
      "Explicit Patent Rights Reservation preserving intellectual property boundaries",
      "Commercial software and commercial-service classification information for contracting-officer review"
    ],
    acceptanceCriteria: "Fully executed license agreement signed by vendor authority for government record.",
    dataRights: COMMON_DATA_RIGHTS
  },
  {
    id: 6,
    title: "Procurement & FAR/DFARS Compliance Summary",
    subtitle: "Contracting Officer Fact Sheet & Tradewinds Awardable Packet",
    summary: "Procurement-support packet prepared for review by an authorized purchaser or contracting activity, including CAGE/UEI verification, fixed-price quote, Tradewinds awardable reference numbers, and micro-purchase evaluation guidance.",
    scope: [
      "UEI (FQJUJKVKSAS3) and CAGE Code (1ZMG9) active SAM.gov status summary",
      "Fixed-price $14,500 evaluation quotation with itemized deliverable breakdown",
      "Proposed fixed-price evaluation: $14,500. The purchasing office determines whether the acquisition qualifies for micro-purchase procedures and which acquisition method applies.",
      "Tradewinds Awardable marketplace evidence, including the official marketplace video title, direct marketplace link, and any notice supplied by Tradewinds."
    ],
    acceptanceCriteria: "Procurement-support packet prepared for review by an authorized purchaser or contracting activity.",
    dataRights: COMMON_DATA_RIGHTS
  }
];
