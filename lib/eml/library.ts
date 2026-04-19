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

const expTree: EMLNode = eml(X(), ONE());
const eConst: EMLNode = eml(ONE(), ONE());
const zeroConst: EMLNode = eml(ONE(), eml(eml(ONE(), ONE()), ONE()));

export const library: EMLFunctionSpec[] = [
  {
    slug: "exp",
    name: "exp",
    displayName: "Exponential",
    symbol: "exp(x)",
    formula: "eml(x, 1)",
    latex: "e^{x}",
    depth: 1,
    arity: 1,
    tree: expTree,
    variables: ["x"],
    domain: "x ∈ ℝ",
    sampleInputs: { x: 1 },
    category: "transcendental",
    description:
      "The exponential function — the simplest function to build in EML. A single node does it.",
    derivation: [
      "Start from the definition: eml(x, y) = exp(x) − ln(y).",
      "Plug in y = 1: eml(x, 1) = exp(x) − ln(1).",
      "Since ln(1) = 0: eml(x, 1) = exp(x).",
      "Depth 1 — this is the shallowest non-trivial EML tree.",
    ],
  },
  {
    slug: "e",
    name: "e",
    displayName: "Euler's constant e",
    symbol: "e",
    formula: "eml(1, 1)",
    latex: "e",
    depth: 1,
    arity: 0,
    tree: eConst,
    variables: [],
    domain: "—",
    sampleInputs: {},
    category: "constant",
    description:
      "Euler's number appears immediately: eml(1, 1) = exp(1) − ln(1) = e − 0 = e.",
    derivation: [
      "Substitute x = 1, y = 1 in eml(x, y) = exp(x) − ln(y).",
      "exp(1) = e, ln(1) = 0.",
      "Therefore eml(1, 1) = e.",
    ],
  },
  {
    slug: "zero",
    name: "zero",
    displayName: "Constant 0",
    symbol: "0",
    formula: "eml(1, eml(eml(1, 1), 1))",
    latex: "0",
    depth: 3,
    arity: 0,
    tree: zeroConst,
    variables: [],
    domain: "—",
    sampleInputs: {},
    category: "constant",
    description:
      "Zero isn't a primitive in EML — it takes depth 3 to build. This is surprising and fundamental to how EML reshapes what 'simple' means.",
    derivation: [
      "Goal: produce 0.",
      "Inner: eml(1, 1) = e.",
      "Next: eml(e, 1) = exp(e) − ln(1) = exp(e).",
      "Outer: eml(1, exp(e)) = exp(1) − ln(exp(e)) = e − e = 0.",
    ],
  },
];
