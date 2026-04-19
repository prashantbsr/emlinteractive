import type { EMLNode, EvalContext } from "./types";
import { evaluate } from "./evaluate";

export interface TraceStep {
  path: string;
  node: EMLNode;
  value: number;
  description: string;
  depth: number;
}

export function trace(node: EMLNode, ctx: EvalContext = {}): TraceStep[] {
  const steps: TraceStep[] = [];
  walk(node, ctx, "0", 0, steps);
  return steps;
}

function walk(
  node: EMLNode,
  ctx: EvalContext,
  path: string,
  depth: number,
  out: TraceStep[]
) {
  if (node.kind === "eml") {
    walk(node.left, ctx, path + ".L", depth + 1, out);
    walk(node.right, ctx, path + ".R", depth + 1, out);
    const left = evaluate(node.left, ctx);
    const right = evaluate(node.right, ctx);
    const value = Math.exp(left) - Math.log(right);
    out.push({
      path,
      node,
      value,
      depth,
      description: `exp(${round(left)}) − ln(${round(right)}) = ${round(value)}`,
    });
  } else if (node.kind === "const") {
    out.push({
      path,
      node,
      value: node.value,
      depth,
      description: `const ${node.value}`,
    });
  } else {
    const v = evaluate(node, ctx);
    out.push({
      path,
      node,
      value: v,
      depth,
      description: `${node.name} = ${round(v)}`,
    });
  }
}

function round(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  if (Math.abs(n) < 1e-10) return "0";
  return Number(n.toFixed(6)).toString();
}
