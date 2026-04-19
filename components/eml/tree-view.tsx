"use client";

import { useMemo } from "react";
import type { EMLNode, EvalContext } from "@/lib/eml/types";
import { evaluate } from "@/lib/eml/evaluate";
import { layoutBounds, layoutTree, type LaidOutNode } from "@/lib/eml/layout";
import { cn, formatNumber } from "@/lib/utils";

interface TreeViewProps {
  tree: EMLNode;
  env?: Record<string, number>;
  highlightPath?: string | null;
  onNodeClick?: (id: string) => void;
  className?: string;
  showValues?: boolean;
}

const NODE_W = 92;
const NODE_H = 44;
const MARGIN = 32;

export function TreeView({
  tree,
  env,
  highlightPath,
  onNodeClick,
  className,
  showValues = true,
}: TreeViewProps) {
  const { nodes, edges, viewBox } = useMemo(() => {
    const laidOut = layoutTree(tree, { nodeWidth: NODE_W, nodeHeight: NODE_H });
    const ctx: EvalContext = { env };
    const valueByPath = new Map<string, number>();
    const labelByNode = (n: LaidOutNode): string => {
      if (n.node.kind === "const") return String(n.node.value);
      if (n.node.kind === "var") return n.node.name;
      return "eml";
    };
    if (showValues) {
      for (const laid of laidOut) {
        try {
          valueByPath.set(laid.id, evaluate(laid.node, ctx));
        } catch {
          valueByPath.set(laid.id, NaN);
        }
      }
    }

    const lookup = new Map(laidOut.map((n) => [n.id, n]));
    const edges = laidOut
      .filter((n) => n.parentId)
      .map((n) => {
        const parent = lookup.get(n.parentId!)!;
        return {
          id: `${parent.id}->${n.id}`,
          from: parent,
          to: n,
        };
      });

    const bounds = layoutBounds(laidOut);
    const viewBox = {
      x: bounds.minX - NODE_W / 2 - MARGIN,
      y: bounds.minY - NODE_H / 2 - MARGIN,
      w: bounds.width + NODE_W + MARGIN * 2,
      h: bounds.height + NODE_H + MARGIN * 2,
    };

    return {
      nodes: laidOut.map((n) => ({
        ...n,
        label: labelByNode(n),
        value: valueByPath.get(n.id),
      })),
      edges,
      viewBox,
    };
  }, [tree, env, showValues]);

  return (
    <div className={cn("w-full overflow-auto rounded-lg border border-border bg-muted/20 p-2", className)}>
      <svg
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ minHeight: 220, maxHeight: 520 }}
      >
        <g>
          {edges.map((e) => (
            <line
              key={e.id}
              x1={e.from.x}
              y1={e.from.y + NODE_H / 2}
              x2={e.to.x}
              y2={e.to.y - NODE_H / 2}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.7}
            />
          ))}
        </g>
        <g>
          {nodes.map((n) => {
            const isHighlight = highlightPath === n.id;
            const isOp = n.node.kind === "eml";
            const fill = isHighlight
              ? "hsl(var(--primary))"
              : isOp
                ? "hsl(var(--card))"
                : "hsl(var(--accent))";
            const textFill = isHighlight
              ? "hsl(var(--primary-foreground))"
              : isOp
                ? "hsl(var(--foreground))"
                : "hsl(var(--accent-foreground))";
            const stroke = isHighlight ? "hsl(var(--primary))" : "hsl(var(--border))";
            return (
              <g
                key={n.id}
                transform={`translate(${n.x - NODE_W / 2}, ${n.y - NODE_H / 2})`}
                onClick={() => onNodeClick?.(n.id)}
                className={onNodeClick ? "cursor-pointer" : undefined}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={1.5}
                />
                <text
                  x={NODE_W / 2}
                  y={NODE_H / 2 - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize={13}
                  fontWeight={600}
                  fill={textFill}
                >
                  {n.label}
                </text>
                {showValues && n.value !== undefined && (
                  <text
                    x={NODE_W / 2}
                    y={NODE_H - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="ui-monospace, monospace"
                    fontSize={9}
                    fill={textFill}
                    opacity={0.75}
                  >
                    {formatNumber(n.value, 4)}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
