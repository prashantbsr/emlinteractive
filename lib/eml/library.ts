import type { EMLNode } from "./types";
import { eml, one, variable } from "./types";

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

export const referenceFns: Record<string, (env: Record<string, number>) => number> = {
  exp: (env) => Math.exp(env.x),
  e: () => Math.E,
  zero: () => 0,
  ln: (env) => Math.log(env.x),
  identity: (env) => env.x,
};

export function referenceValue(slug: string, env: Record<string, number>): number {
  const fn = referenceFns[slug];
  return fn ? fn(env) : NaN;
}

const X = (): EMLNode => variable("x");
const ONE = (): EMLNode => one();

export const library: EMLFunctionSpec[] = [];
