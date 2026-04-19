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
      width: opts.nodeWidth,
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

function place(
  m: Measured,
  xOffset: number,
  opts: LayoutOptions,
  out: LaidOutNode[]
): number {
  const y = m.depth * opts.vGap;
  if (m.children.length === 0) {
    out.push({
      id: m.id,
      node: m.node,
      x: xOffset + opts.nodeWidth / 2,
      y,
      depth: m.depth,
      parentId: m.parentId,
    });
    return xOffset + opts.nodeWidth;
  }
  const [left, right] = m.children;
  const leftEnd = place(left, xOffset, opts, out);
  const rightStart = leftEnd + opts.hGap;
  const rightEnd = place(right, rightStart, opts, out);
  const centerX = (xOffset + rightEnd) / 2;
  out.push({
    id: m.id,
    node: m.node,
    x: centerX,
    y,
    depth: m.depth,
    parentId: m.parentId,
  });
  return rightEnd;
}

export function layoutTree(
  root: EMLNode,
  partial: Partial<LayoutOptions> = {}
): LaidOutNode[] {
  const opts = { ...DEFAULT_OPTS, ...partial };
  const m = measure(root, 0, "0", null, opts);
  const out: LaidOutNode[] = [];
  place(m, 0, opts, out);
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
