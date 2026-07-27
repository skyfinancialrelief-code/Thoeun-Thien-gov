export interface FpgaPackageInfo {
  title: string;
  version: string;
  archiveFilename: string;
  archiveSha256: string;
  targetFpga: string;
  matrixDimensions: string;
  synthesisStats: {
    lut4s: string;
    carryCells: string;
    sequentialCells: string;
    yosysStatus: string;
  };
  verificationResults: string[];
  includedArtifacts: {
    name: string;
    description: string;
  }[];
  boundaryNotices: {
    title: string;
    detail: string;
  }[];
}

export const FPGA_PACKAGE_DATA: FpgaPackageInfo = {
  title: "Q-VEK / 3240 Icestudio FPGA Hardware Evaluation Package",
  version: "0.1.0",
  archiveFilename: "QVEK_3240_Icestudio_FPGA_Evaluation_v0.1.0.zip",
  archiveSha256: "2b52fb0ca39c5456160176e27068ff08bbd8766b5e25a1c160208932a509937c",
  targetFpga: "iCE40 UP5K-class FPGA (e.g., iCE40UP5K-SG48)",
  matrixDimensions: "32 Governed State Bits × 40 Deterministic Rules",
  synthesisStats: {
    lut4s: "3,490 LUT4s",
    carryCells: "438 Carry Cells",
    sequentialCells: "~1,790 Sequential Cells",
    yosysStatus: "Zero reported structural problems (Pass)"
  },
  verificationResults: [
    "Yosys structural check: Zero reported structural problems",
    "iCE40 synthesis: 3,490 LUT4s, 438 carry cells, ~1,790 sequential cells",
    "Reference SHA-256 vector: PASSED",
    "ZIP integrity & Icestudio JSON structure: PASSED",
    "Archive SHA-256 Digest: 2b52fb0ca39c5456160176e27068ff08bbd8766b5e25a1c160208932a509937c"
  ],
  includedArtifacts: [
    { name: "Icestudio 1.2 Project", description: "Visual block diagram project file (.ice wrapper) following version-1.2 format." },
    { name: "Synthesizable Verilog FCEP Controller", description: "Hardware-level Formal Constraint Enforcement Processor module." },
    { name: "Iterative SHA-256 Proof Engine", description: "Hardware SHA-256 state hashing and proof chaining pipeline." },
    { name: "32×40 Rule Evaluation Matrix", description: "32 governed state bits dynamically validated against 40 rule vectors." },
    { name: "Sticky Fail-Closed HALT Logic", description: "Hardware state isolation preventing unverified state emission upon fault." },
    { name: "Identity Guard & Parity Checks", description: "64-bit comparison token guard and bus parity integrity checks." },
    { name: "Testbenches & Reference Vectors", description: "Verilog simulation testbenches and golden SHA-256 test vectors." },
    { name: "SystemVerilog Formal Targets", description: "Formal assertion property targets for SymbiYosys / formal verification." },
    { name: "Yosys Synthesis Netlist & Report", description: "Complete gate-level synthesis report and resource utilization breakdown." },
    { name: "SHA-256 Package Manifest", description: "Cryptographic SHA-256 checksum list for all packaged source files." }
  ],
  boundaryNotices: [
    {
      title: "3240 Architecture Scope",
      detail: "“3240” is explicitly defined as 32 governed state bits evaluated by 40 rules."
    },
    {
      title: "Identity Comparison Token",
      detail: "The 64-bit identity input is a comparison token, not a digital-signature verifier."
    },
    {
      title: "Verification Boundary Status",
      detail: "Formal properties are supplied, but completed machine-checked proofs, hardware-in-the-loop (HIL) testing, and independent hardware certification remain pending."
    },
    {
      title: "I/O Serialization Requirement",
      detail: "The logical 256-bit proof output should be serialized over SPI or UART for a physical target board."
    },
    {
      title: "FPGA Target Device Class",
      detail: "The design targets an UP5K-class FPGA (iCE40UP5K); it is too large for typical HX1K devices."
    },
    {
      title: "Icestudio Workflow Tooling",
      detail: "The .ice wrapper follows Icestudio's documented version-1.2 project format and open FPGA toolchain workflow."
    }
  ]
};
