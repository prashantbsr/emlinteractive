import type { EMLNode } from "./types";
import { eml, one, variable } from "./types";

const ONE = (): EMLNode => one();
const X = (): EMLNode => variable("x");
const Y = (): EMLNode => variable("y");

// === Atomic constants and unary builders ===

export const E_TREE: EMLNode = eml(ONE(), ONE());

export const ZERO_TREE: EMLNode = eml(ONE(), eml(eml(ONE(), ONE()), ONE()));

// Shift constant K = exp(e) = e^e ≈ 15.154.
// Tree: eml(eml(1,1),1), depth 2.
// Used to bootstrap negation/addition into "first-arg-positive" SUB territory.
// Capped at this size because the EML evaluator passes the right child of
// every eml node through Math.log(Math.exp(·)); any value > ~709 overflows
// Math.exp to Infinity. K = e^e is the largest pure-eml-of-1 constant below
// that ceiling (the next level, exp(exp(e)) ≈ 3.8M, would overflow when used
// as the right argument of an outer SUB).
export const K_TREE: EMLNode = eml(eml(ONE(), ONE()), ONE());

export const K_VALUE = Math.exp(Math.E); // ≈ 15.154

export function buildExp(arg: EMLNode): EMLNode {
  return eml(arg, ONE());
}

export function buildLn(arg: EMLNode): EMLNode {
  return eml(ONE(), eml(eml(ONE(), arg), ONE()));
}

// SUB(a, b) = a - b, requires a > 0 (so ln(a) is real).
// = eml(LN(a), EXP(b)) = exp(ln(a)) - ln(exp(b)) = a - b.
export function buildSub(a: EMLNode, b: EMLNode): EMLNode {
  return eml(buildLn(a), buildExp(b));
}

// NEG(x) = -x via shift trick: (K - x) - K.
// Domain: x < K (~3.8M); both nested SUBs have positive first arg.
export function buildNeg(x: EMLNode): EMLNode {
  return buildSub(buildSub(K_TREE, x), K_TREE);
}

// ADD(a, b) = a + b via shift trick:
//   ((K - NEG(a)) - NEG(b)) - K  =  (K + a + b) - K  =  a + b.
// Each intermediate is positive when |a|, |b|, |a+b| < K.
export function buildAdd(a: EMLNode, b: EMLNode): EMLNode {
  return buildSub(
    buildSub(buildSub(K_TREE, buildNeg(a)), buildNeg(b)),
    K_TREE
  );
}

// MUL(a, b) = a * b for a > 0, b > 0
//   = exp(ln(a) + ln(b))
export function buildMul(a: EMLNode, b: EMLNode): EMLNode {
  return buildExp(buildAdd(buildLn(a), buildLn(b)));
}

// RECIP(x) = 1/x for x > 0
//   = exp(-ln(x))
export function buildRecip(x: EMLNode): EMLNode {
  return buildExp(buildNeg(buildLn(x)));
}

// DIV(a, b) = a / b for a > 0, b > 0
//   = a * (1/b)
export function buildDiv(a: EMLNode, b: EMLNode): EMLNode {
  return buildMul(a, buildRecip(b));
}

// SQUARE(x) = x * x for x > 0
export function buildSquare(x: EMLNode): EMLNode {
  return buildMul(x, x);
}

// CUBE(x) = x * x * x for x > 0
export function buildCube(x: EMLNode): EMLNode {
  return buildMul(x, buildMul(x, x));
}

// SQRT(x) for x > 0, using shift trick on ln(x) so it works for any x > 0:
//   sqrt(x) = exp( ln(x) / 2 )
//          = exp( (ln(x) + K)/2 - K/2 )
// (ln(x) + K) > 0 for any x > exp(-K) ≈ 0, and K/2 > 0, so MULs and SUBs stay valid.
export function buildSqrt(x: EMLNode): EMLNode {
  const TWO = buildAdd(ONE(), ONE());
  const HALF = buildRecip(TWO);
  const lnxPlusK = buildAdd(buildLn(x), K_TREE);
  const halfShifted = buildMul(lnxPlusK, HALF);
  const halfK = buildMul(K_TREE, HALF);
  return buildExp(buildSub(halfShifted, halfK));
}

// === Operator templates with x, y variable slots ===
// For unary ops, use variable "x". For binary, "x" and "y".

export interface CalcOpSpec {
  id: string;
  label: string;
  arity: 0 | 1 | 2;
  tree: EMLNode;
  // domain check on numeric inputs, returns null if OK, else error message
  guard?: (env: Record<string, number>) => string | null;
  // human-readable identity used by the UI
  formula: string;
}

const positive = (key: string) => (env: Record<string, number>) =>
  env[key] > 0 ? null : `${key} must be > 0`;

const positives = (...keys: string[]) =>
  (env: Record<string, number>) => {
    for (const k of keys) {
      if (!(env[k] > 0)) return `${k} must be > 0`;
    }
    return null;
  };

const inShiftRange = (...keys: string[]) =>
  (env: Record<string, number>) => {
    for (const k of keys) {
      if (Math.abs(env[k]) >= K_VALUE) {
        return `|${k}| must be < e^e ≈ 15.15 (shift constant K)`;
      }
    }
    return null;
  };

export const CALC_OPS: Record<string, CalcOpSpec> = {
  e: {
    id: "e",
    label: "e",
    arity: 0,
    tree: E_TREE,
    formula: "eml(1, 1)",
  },
  zero: {
    id: "zero",
    label: "0",
    arity: 0,
    tree: ZERO_TREE,
    formula: "eml(1, eml(eml(1, 1), 1))",
  },
  exp: {
    id: "exp",
    label: "exp(x)",
    arity: 1,
    tree: buildExp(X()),
    formula: "eml(x, 1)",
  },
  ln: {
    id: "ln",
    label: "ln(x)",
    arity: 1,
    tree: buildLn(X()),
    guard: positive("x"),
    formula: "eml(1, eml(eml(1, x), 1))",
  },
  neg: {
    id: "neg",
    label: "-x",
    arity: 1,
    tree: buildNeg(X()),
    guard: inShiftRange("x"),
    formula: "(K - x) - K, with K = exp(e) = e^e ≈ 15.15",
  },
  recip: {
    id: "recip",
    label: "1/x",
    arity: 1,
    tree: buildRecip(X()),
    guard: positive("x"),
    formula: "exp(-ln(x))",
  },
  square: {
    id: "square",
    label: "x²",
    arity: 1,
    tree: buildSquare(X()),
    guard: positive("x"),
    formula: "exp(ln(x) + ln(x))",
  },
  cube: {
    id: "cube",
    label: "x³",
    arity: 1,
    tree: buildCube(X()),
    guard: positive("x"),
    formula: "exp(ln(x) + ln(x) + ln(x))",
  },
  sqrt: {
    id: "sqrt",
    label: "√x",
    arity: 1,
    tree: buildSqrt(X()),
    guard: positive("x"),
    formula: "exp((ln(x) + K)/2 - K/2)",
  },
  add: {
    id: "add",
    label: "x + y",
    arity: 2,
    tree: buildAdd(X(), Y()),
    guard: (env) => {
      if (Math.abs(env.x) >= K_VALUE) return `|x| must be < ${K_VALUE.toFixed(2)}`;
      if (Math.abs(env.y) >= K_VALUE) return `|y| must be < ${K_VALUE.toFixed(2)}`;
      if (Math.abs(env.x + env.y) >= K_VALUE) {
        return `|x+y| must be < ${K_VALUE.toFixed(2)} (shift range)`;
      }
      return null;
    },
    formula: "((K - (-x)) - (-y)) - K",
  },
  sub: {
    id: "sub",
    label: "x - y",
    arity: 2,
    tree: buildSub(X(), Y()),
    guard: positive("x"),
    formula: "exp(ln(x)) - ln(exp(y))",
  },
  mul: {
    id: "mul",
    label: "x × y",
    arity: 2,
    tree: buildMul(X(), Y()),
    guard: positives("x", "y"),
    formula: "exp(ln(x) + ln(y))",
  },
  div: {
    id: "div",
    label: "x ÷ y",
    arity: 2,
    tree: buildDiv(X(), Y()),
    guard: positives("x", "y"),
    formula: "exp(ln(x) + ln(1/y))",
  },
};

// Generalized binary ops that use shift tricks to handle negatives.
// These wrap MUL/DIV with NEG to emulate sign handling at the EML-tree level
// (i.e., still pure eml + 1, just composed differently per sign quadrant).
// For simplicity in v1, the calculator UI computes signs in JS and dispatches
// to the appropriate positive-domain tree above; the underlying tree shown to
// the user is the canonical positive-domain construction.

// Helper used by tests and the UI: list of all op ids in canonical order
export const CALC_OP_IDS = [
  "add",
  "sub",
  "mul",
  "div",
  "neg",
  "recip",
  "square",
  "cube",
  "sqrt",
  "exp",
  "ln",
  "e",
  "zero",
] as const;

export type CalcOpId = (typeof CALC_OP_IDS)[number];
