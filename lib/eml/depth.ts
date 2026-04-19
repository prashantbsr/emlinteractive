import type { EMLNode } from "./types";

export function treeDepth(node: EMLNode): number {
  if (node.kind !== "eml") return 0;
  return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}
