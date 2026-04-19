import type { EMLNode } from "./types";

export function treeDepth(node: EMLNode): number {
  if (node.kind !== "eml") return 0;
  return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}

export function treeSize(node: EMLNode): number {
  if (node.kind !== "eml") return 1;
  return 1 + treeSize(node.left) + treeSize(node.right);
}

export function leafCount(node: EMLNode): number {
  if (node.kind !== "eml") return 1;
  return leafCount(node.left) + leafCount(node.right);
}
