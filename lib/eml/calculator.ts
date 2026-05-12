import type { EMLNode } from "./types";
import { eml, one, variable } from "./types";

const ONE = (): EMLNode => one();

// === Atomic constants and unary builders ===

export const E_TREE: EMLNode = eml(ONE(), ONE());

export const ZERO_TREE: EMLNode = eml(ONE(), eml(eml(ONE(), ONE()), ONE()));

export function buildExp(arg: EMLNode): EMLNode {
  return eml(arg, ONE());
}

export function buildLn(arg: EMLNode): EMLNode {
  return eml(ONE(), eml(eml(ONE(), arg), ONE()));
}
