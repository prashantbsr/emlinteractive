import type { EMLNode } from "./types";
import { eml, one, variable } from "./types";

const ONE = (): EMLNode => one();

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
