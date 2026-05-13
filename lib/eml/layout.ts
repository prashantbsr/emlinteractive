import type { EMLNode } from "./types";

export interface LaidOutNode {
  id: string;
  node: EMLNode;
  x: number;
  y: number;
  depth: number;
  parentId: string | null;
}

interface LayoutOptions {
  nodeWidth: number;
  nodeHeight: number;
  hGap: number;
  vGap: number;
  /**
   * Optional override for constant-leaf width. Const nodes carry a single
   * literal (always `1` in the EML grammar) and look better rendered as a
   * snug square, so callers can pass a smaller width here without shrinking
   * eml / var nodes.
   */
  constNodeWidth?: number;
  /**
   * Length of each leg of the right-angle step edge connecting a const
   * leaf to its parent. The const is offset by this distance both
   * horizontally (outside the parent's side handle) and vertically
   * (above the parent's top edge), so the L-shaped edge has matching
   * arms. Defaults to the minimum that keeps the const clear of the
   * parent's body plus a small margin.
   */
  constLegLength?: number;
}

const DEFAULT_OPTS: LayoutOptions = {
  nodeWidth: 92,
  nodeHeight: 44,
  hGap: 24,
  vGap: 60,
};

interface Measured {
  id: string;
  node: EMLNode;
  depth: number;
  width: number;
  parentId: string | null;
  children: Measured[];
}

function widthFor(node: EMLNode, opts: LayoutOptions): number {
  if (node.kind === "const" && opts.constNodeWidth !== undefined) {
    return opts.constNodeWidth;
  }
  return opts.nodeWidth;
}

function measure(
  node: EMLNode,
  depth: number,
  pathId: string,
  parentId: string | null,
  opts: LayoutOptions
): Measured {
  if (node.kind !== "eml") {
    return {
      id: pathId,
      node,
      depth,
      width: widthFor(node, opts),
      parentId,
      children: [],
    };
  }
  const left = measure(node.left, depth + 1, pathId + "L", pathId, opts);
  const right = measure(node.right, depth + 1, pathId + "R", pathId, opts);
  const childrenWidth = left.width + right.width + opts.hGap;
  return {
    id: pathId,
    node,
    depth,
    width: Math.max(opts.nodeWidth, childrenWidth),
    parentId,
    children: [left, right],
  };
}

interface PlaceResult {
  rightEdge: number;
  centerX: number;
}

function place(
  m: Measured,
  xOffset: number,
  opts: LayoutOptions,
  out: LaidOutNode[]
): PlaceResult {
  const y = m.depth * opts.vGap;
  if (m.children.length === 0) {
    const centerX = xOffset + m.width / 2;
    out.push({
      id: m.id,
      node: m.node,
      x: centerX,
      y,
      depth: m.depth,
      parentId: m.parentId,
    });
    return { rightEdge: xOffset + m.width, centerX };
  }
  const [left, right] = m.children;
  const leftPlaced = place(left, xOffset, opts, out);
  const rightStart = leftPlaced.rightEdge + opts.hGap;
  const rightPlaced = place(right, rightStart, opts, out);
  // Parent sits at the midpoint of the children's *centers* (not their
  // extents) so a thin const leaf next to a wide subtree still produces a
  // balanced V — both edges slope the same amount instead of one tracking
  // diagonally across the whole subtree.
  const centerX = (leftPlaced.centerX + rightPlaced.centerX) / 2;
  out.push({
    id: m.id,
    node: m.node,
    x: centerX,
    y,
    depth: m.depth,
    parentId: m.parentId,
  });
  return { rightEdge: rightPlaced.rightEdge, centerX };
}

export function layoutTree(
  root: EMLNode,
  partial: Partial<LayoutOptions> = {}
): LaidOutNode[] {
  const opts = { ...DEFAULT_OPTS, ...partial };
  const m = measure(root, 0, "0", null, opts);
  const out: LaidOutNode[] = [];
  place(m, 0, opts, out);

  // Re-anchor every const "1" leaf so the leaf-to-parent edge becomes a
  // right-angled step with two equal-length arms. legLength is the
  // shared length of both arms (one horizontal, one vertical). The
  // const sits exactly legLength past the parent's side handle
  // horizontally, and exactly legLength above the parent's side handle
  // vertically, so a `step` edge from const's bottom-handle into
  // parent's side-handle traces a clean L with matching arms.
  const constSize = opts.constNodeWidth ?? opts.nodeWidth;
  const minLeg = Math.max(constSize / 2, opts.nodeHeight / 2) + 8;
  const legLength = opts.constLegLength ?? minLeg;
  const horizontalOffset = opts.nodeWidth / 2 + legLength;
  const byId = new Map(out.map((n) => [n.id, n]));
  for (const n of out) {
    if (n.node.kind !== "const" || !n.parentId) continue;
    const parent = byId.get(n.parentId);
    if (!parent) continue;
    const isLeftChild = n.id.endsWith("L");
    n.x = parent.x + (isLeftChild ? -horizontalOffset : horizontalOffset);
    n.y = parent.y + constSize / 2 + legLength;
  }

  return out;
}

export function layoutBounds(nodes: LaidOutNode[]) {
  if (nodes.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    if (n.x < minX) minX = n.x;
    if (n.x > maxX) maxX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.y > maxY) maxY = n.y;
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
