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
const lnTree: EMLNode = eml(ONE(), eml(eml(ONE(), X()), ONE()));
const identityTree: EMLNode = eml(ONE(), eml(eml(ONE(), eml(X(), ONE())), ONE()));

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
  {
    slug: "ln",
    name: "ln",
    displayName: "Natural logarithm",
    symbol: "ln(x)",
    formula: "eml(1, eml(eml(1, x), 1))",
    latex: "\\ln(x)",
    depth: 3,
    arity: 1,
    tree: lnTree,
    variables: ["x"],
    domain: "x ∈ ℝ⁺",
    sampleInputs: { x: Math.E },
    category: "transcendental",
    description:
      "The natural log reassembles itself in three nested EML calls — a clean contrast to exp's single-node form.",
    derivation: [
      "Let a = eml(1, x) = e − ln(x).",
      "Let b = eml(a, 1) = exp(a) − 0 = exp(e − ln(x)).",
      "Then eml(1, b) = e − ln(b) = e − (e − ln(x)) = ln(x).",
    ],
  },
  {
    slug: "identity",
    name: "id",
    displayName: "Identity function",
    symbol: "x",
    formula: "eml(1, eml(eml(1, eml(x, 1)), 1))",
    latex: "x",
    depth: 4,
    arity: 1,
    tree: identityTree,
    variables: ["x"],
    domain: "x ∈ ℝ⁺",
    sampleInputs: { x: 2.5 },
    category: "unary",
    description:
      "Even the identity function f(x) = x takes non-trivial nesting in pure EML: ln(exp(x)) = x.",
    derivation: [
      "Substitute z = exp(x) = eml(x, 1) into the ln(z) tree.",
      "ln(exp(x)) = x by the fundamental log–exp identity.",
      "Result: a depth-4 tree whose value equals x for any x.",
    ],
  },
];

// Table 4 reference values from the paper — exact depths for the symbolic record.
export const referenceDepths: Record<string, number> = {
  exp: 1,
  e: 1,
  negate: 2,
  reciprocal: 2,
  ln: 3,
  subtract: 4,
  add: 5,
  divide: 7,
  multiply: 8,
};
