export type AppRoute = 'micro-purchase' | 'tradewinds' | 'dashboard' | 'vectors' | 'claims' | 'deliverables' | 'license' | 'fpga';

export interface TestVector {
  id: string;
  category: 'Successful Transition' | 'Typed Halt' | 'U64 Boundary' | 'Canonicalization Rejection' | 'Canonicalization' | 'Hash Chain' | 'Schema Bounds' | 'State Transition' | 'Epoch Proof' | 'Zero Knowledge';
  name: string;
  description: string;
  inputJson: Record<string, any>;
  expectedDigest: string;
  tsEngineStatus: 'PASS' | 'FAIL';
  rustWasmStatus: 'ADAPTER_ONLY' | 'NOT_IMPLEMENTED';
  rfc8785Compliant: boolean;
  executionTimeMs: number;
  details: string;
}

export interface ClaimItem {
  id: string;
  claimTitle: string;
  previousText?: string;
  correctedText: string;
  category: 'Cryptographic Security' | 'JSON Canonicalization' | 'Multi-Language Architecture' | 'Performance & Scope';
  status: 'VERIFIED' | 'RECTIFIED' | 'ADAPTER_ONLY';
  evidence: string;
  technicalNote: string;
}

export interface Deliverable {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  scope: string[];
  acceptanceCriteria: string;
  dataRights: string;
}

export interface PriceAllocation {
  deliverableId: number;
  itemTitle: string;
  amount: string;
}

export interface VendorInfo {
  companyName: string;
  legalEntityName: string;
  packageTitle: string;
  packageVersion: string;
  fixedPrice: string;
  priceNote: string;
  uei: string;
  cage: string;
  tradewindsStatus: string;
  tradewindsNote: string;
  contactEmail: string;
  pocName: string;
  quoteExpiration: string;
  deliverySchedule: string;
  paymentMethod: string;
  supportPeriod: string;
  sourceCodeProtection: string;
  packageExclusions: string;
  priceAllocations: PriceAllocation[];
}

export interface QuoteRequest {
  agency: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  notes: string;
}
