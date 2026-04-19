import type { EMLNode } from "./types";

export interface EMLFunctionSpec {
  slug: string;
  name: string;
  displayName: string;
  symbol: string;
  formula: string;
  latex: string;
  depth: number;
  arity: 0 | 1 | 2;
  tree: EMLNode;
  variables: string[];
  domain: string;
  sampleInputs: Record<string, number>;
  description: string;
  derivation: string[];
  category: "constant" | "unary" | "binary" | "transcendental";
}

export const library: EMLFunctionSpec[] = [];
