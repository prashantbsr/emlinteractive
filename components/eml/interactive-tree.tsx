"use client";

import { memo, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";

import type { EMLNode } from "@/lib/eml/types";
import { evaluate } from "@/lib/eml/evaluate";
import { layoutTree } from "@/lib/eml/layout";
import { treeSize } from "@/lib/eml/depth";
import { formatNumber, cn } from "@/lib/utils";

interface InteractiveTreeProps {
  tree: EMLNode;
  env?: Record<string, number>;
  className?: string;
  /**
   * Minimum canvas height (px). The canvas grows past this for deeper
   * trees and shrinks on narrow viewports, so the prop is a floor, not
   * a hard size.
   */
  height?: number;
}

// EML expansions balloon fast — multiplication is ~50 nodes, addition is
// ~150, sqrt is ~250. Density tiers below shrink the per-node footprint
// and tighten gaps as the count grows, so a 250-node tree still fits a
// phone screen at a readable zoom. Every tier keeps the formula visible.

type Density = "spacious" | "regular" | "compact" | "tiny";

interface DensitySpec {
  tier: Density;
  nodeW: number;
  nodeH: number;
  hGap: number;
  vGap: number;
  /** Square side length for const-leaf nodes (the only literal is `1`). */
  constSize: number;
  px: string;
  py: string;
  headerSize: string;
  formulaSize: string;
  valueSize: string;
  leafCaptionSize: string;
  leafValueSize: string;
  leafNameSize: string;
  constValueSize: string;
  handleSize: string;
}

// hGap and vGap are tight on purpose — sibling subtrees stay close so
// edges read near-vertical, and vGap is just a hair larger than nodeH so
// the diagonal stretch between depths stays short.
const DENSITY: Record<Density, DensitySpec> = {
  spacious: {
    tier: "spacious",
    nodeW: 220,
    nodeH: 96,
    hGap: 14,
    vGap: 112,
    constSize: 56,
    px: "px-3",
    py: "py-2",
    headerSize: "text-[10px]",
    formulaSize: "text-[11px]",
    valueSize: "text-sm",
    leafCaptionSize: "text-[10px]",
    leafValueSize: "text-[11px]",
    leafNameSize: "text-lg",
    constValueSize: "text-xl",
    handleSize: "!h-2 !w-2",
  },
  regular: {
    tier: "regular",
    nodeW: 184,
    nodeH: 84,
    hGap: 12,
    vGap: 100,
    constSize: 48,
    px: "px-2.5",
    py: "py-1.5",
    headerSize: "text-[10px]",
    formulaSize: "text-[10px]",
    valueSize: "text-xs",
    leafCaptionSize: "text-[10px]",
    leafValueSize: "text-[10px]",
    leafNameSize: "text-base",
    constValueSize: "text-lg",
    handleSize: "!h-1.5 !w-1.5",
  },
  compact: {
    tier: "compact",
    nodeW: 150,
    nodeH: 70,
    hGap: 8,
    vGap: 84,
    constSize: 40,
    px: "px-2",
    py: "py-1",
    headerSize: "text-[9px]",
    formulaSize: "text-[9px]",
    valueSize: "text-[11px]",
    leafCaptionSize: "text-[9px]",
    leafValueSize: "text-[9px]",
    leafNameSize: "text-sm",
    constValueSize: "text-base",
    handleSize: "!h-1.5 !w-1.5",
  },
  tiny: {
    tier: "tiny",
    nodeW: 124,
    nodeH: 60,
    hGap: 6,
    vGap: 70,
    constSize: 32,
    px: "px-1.5",
    py: "py-1",
    headerSize: "text-[8px]",
    formulaSize: "text-[8px]",
    valueSize: "text-[10px]",
    leafCaptionSize: "text-[8px]",
    leafValueSize: "text-[8px]",
    leafNameSize: "text-xs",
    constValueSize: "text-sm",
    handleSize: "!h-1 !w-1",
  },
};

function densityFor(nodeCount: number, viewportW: number): Density {
  const small = viewportW < 640;
  if (small) {
    if (nodeCount > 80) return "tiny";
    if (nodeCount > 30) return "compact";
    if (nodeCount > 10) return "regular";
    return "spacious";
  }
  if (nodeCount > 180) return "tiny";
  if (nodeCount > 70) return "compact";
  if (nodeCount > 25) return "regular";
  return "spacious";
}

function useViewportWidth(): number {
  const [w, setW] = useState<number>(() =>
    typeof window === "undefined" ? 1024 : window.innerWidth
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setW(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return w;
}

interface EmlData {
  kind: "eml";
  step: number;
  leftValue: number;
  rightValue: number;
  value: number;
  path: string;
  isResult: boolean;
  selected: boolean;
  density: DensitySpec;
  onSelect: (path: string) => void;
}
interface ConstData {
  kind: "const";
  value: number;
  path: string;
  selected: boolean;
  density: DensitySpec;
  onSelect: (path: string) => void;
}
interface VarData {
  kind: "var";
  name: string;
  value: number;
  path: string;
  selected: boolean;
  density: DensitySpec;
  onSelect: (path: string) => void;
}

type EmlNodeRecord = Omit<EmlData, "selected" | "onSelect" | "density">;
type ConstNodeRecord = Omit<ConstData, "selected" | "onSelect" | "density">;
type VarNodeRecord = Omit<VarData, "selected" | "onSelect" | "density">;
type NodeRecord = EmlNodeRecord | ConstNodeRecord | VarNodeRecord;

export interface TraceEntry {
  step: number;
  path: string;
  description: string;
  value: number;
}

function buildRecords(
  root: EMLNode,
  env: Record<string, number>
): { byPath: Map<string, NodeRecord>; trace: TraceEntry[] } {
  const byPath = new Map<string, NodeRecord>();
  const trace: TraceEntry[] = [];
  let step = 0;
  const walk = (n: EMLNode, path: string) => {
    if (n.kind === "eml") {
      walk(n.left, path + "L");
      walk(n.right, path + "R");
      let lval = NaN;
      let rval = NaN;
      let value = NaN;
      try {
        lval = evaluate(n.left, { env });
        rval = evaluate(n.right, { env });
        value = Math.exp(lval) - Math.log(rval);
      } catch {
        /* leave as NaN */
      }
      step += 1;
      const rec: EmlNodeRecord = {
        kind: "eml",
        step,
        leftValue: lval,
        rightValue: rval,
        value,
        path,
        isResult: path === "0",
      };
      byPath.set(path, rec);
      trace.push({
        step,
        path,
        description: `exp(${formatNumber(lval, 4)}) − ln(${formatNumber(rval, 4)})`,
        value,
      });
    } else if (n.kind === "const") {
      byPath.set(path, { kind: "const", value: n.value, path });
    } else {
      const v = env[n.name] ?? NaN;
      byPath.set(path, { kind: "var", name: n.name, value: v, path });
    }
  };
  walk(root, "0");
  return { byPath, trace };
}

function descendantPaths(byPath: Map<string, NodeRecord>, root: string): Set<string> {
  const out = new Set<string>();
  for (const p of byPath.keys()) {
    if (p === root || p.startsWith(root + "L") || p.startsWith(root + "R")) {
      out.add(p);
    }
  }
  return out;
}

// Bright, light-colored nodes float over the black canvas. The result
// node uses a saturated emerald fill so it reads as "the answer," input
// leaves get a sky glow, and every eml step keeps its formula visible
// at every density tier.

const INPUT_GLOW =
  "shadow-[0_0_22px_-2px_rgba(56,189,248,0.65),0_0_48px_-10px_rgba(56,189,248,0.55)]";

const EmlFlowNode = memo(function EmlFlowNode({ data }: NodeProps<EmlData>) {
  const result = data.isResult;
  const d = data.density;
  return (
    <div
      onClick={() => data.onSelect(data.path)}
      style={{ width: d.nodeW, height: d.nodeH }}
      className={cn(
        "cursor-pointer rounded-md border font-mono transition-colors",
        d.px,
        d.py,
        result
          ? cn(
              "border-emerald-700 bg-emerald-500 text-white",
              data.selected && "ring-2 ring-emerald-300/70"
            )
          : cn(
              "border-slate-300 bg-slate-50 text-slate-900 shadow-[0_2px_6px_rgba(0,0,0,0.35)]",
              data.selected
                ? "border-sky-400 bg-sky-50 ring-2 ring-sky-400/50"
                : "hover:border-slate-400"
            )
      )}
    >
      {/* Top handles for non-const children — edges route vertically
          across the row gap, source-Bottom meeting target-Top. */}
      <Handle
        id="LT"
        type="target"
        position={Position.Top}
        style={{ left: "28%" }}
        className={cn(
          d.handleSize,
          "!border-0",
          result ? "!bg-emerald-800" : "!bg-slate-400"
        )}
      />
      <Handle
        id="RT"
        type="target"
        position={Position.Top}
        style={{ left: "72%" }}
        className={cn(
          d.handleSize,
          "!border-0",
          result ? "!bg-emerald-800" : "!bg-slate-400"
        )}
      />
      {/* Side handles for const-leaf children — const sits beside the
          parent at a fixed offset and the `step` edge traces an L with
          two equal-length arms into these side handles. */}
      <Handle
        id="LS"
        type="target"
        position={Position.Left}
        className={cn(
          d.handleSize,
          "!border-0",
          result ? "!bg-emerald-800" : "!bg-slate-400"
        )}
      />
      <Handle
        id="RS"
        type="target"
        position={Position.Right}
        className={cn(
          d.handleSize,
          "!border-0",
          result ? "!bg-emerald-800" : "!bg-slate-400"
        )}
      />
      <div
        className={cn(
          "flex items-center justify-between uppercase tracking-wide",
          d.headerSize,
          result ? "text-emerald-50" : "text-slate-500"
        )}
      >
        <span>{result ? "result" : `step ${data.step}`}</span>
        <span className="font-sans normal-case">eml</span>
      </div>
      <div
        className={cn(
          "mt-0.5 truncate",
          d.formulaSize,
          result ? "text-emerald-50" : "text-slate-600"
        )}
      >
        exp(
        <span
          className={cn("font-medium", result ? "text-white" : "text-slate-900")}
        >
          {formatNumber(data.leftValue, 4)}
        </span>
        ) − ln(
        <span
          className={cn("font-medium", result ? "text-white" : "text-slate-900")}
        >
          {formatNumber(data.rightValue, 4)}
        </span>
        )
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span
          className={cn(
            d.headerSize,
            result ? "text-emerald-50" : "text-slate-500"
          )}
        >
          =
        </span>
        <span
          className={cn(
            "font-semibold tabular-nums",
            d.valueSize,
            result ? "text-white" : "text-slate-900"
          )}
        >
          {formatNumber(data.value, 6)}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className={cn(
          d.handleSize,
          "!border-0",
          result ? "!bg-emerald-800" : "!bg-slate-400"
        )}
      />
    </div>
  );
});

const ConstFlowNode = memo(function ConstFlowNode({ data }: NodeProps<ConstData>) {
  const d = data.density;
  return (
    <div
      onClick={() => data.onSelect(data.path)}
      style={{ width: d.constSize, height: d.constSize }}
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-md border bg-amber-50 font-mono text-amber-900 transition-colors",
        data.selected
          ? "border-amber-500 ring-2 ring-amber-400/60"
          : "border-amber-300 hover:border-amber-400"
      )}
    >
      <span className={cn("font-bold tabular-nums", d.constValueSize)}>
        {data.value}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className={cn(d.handleSize, "!border-0 !bg-amber-500")}
      />
    </div>
  );
});

const VarFlowNode = memo(function VarFlowNode({ data }: NodeProps<VarData>) {
  const d = data.density;
  return (
    <div
      onClick={() => data.onSelect(data.path)}
      style={{ width: d.nodeW, height: d.nodeH }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-md border bg-sky-50 font-mono text-sky-950 transition-colors",
        INPUT_GLOW,
        d.px,
        d.py,
        data.selected
          ? "border-sky-500 ring-2 ring-sky-400/70"
          : "border-sky-300 hover:border-sky-400"
      )}
    >
      <span className={cn("uppercase tracking-wide text-sky-700", d.leafCaptionSize)}>
        input
      </span>
      <span className={cn("font-semibold text-sky-900", d.leafNameSize)}>
        {data.name}
      </span>
      <span className={cn("tabular-nums text-sky-800", d.leafValueSize)}>
        = {formatNumber(data.value, 6)}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className={cn(d.handleSize, "!border-0 !bg-sky-500")}
      />
    </div>
  );
});

const nodeTypes = {
  eml: EmlFlowNode,
  const: ConstFlowNode,
  var: VarFlowNode,
};

export function InteractiveTree({ tree, env, className, height }: InteractiveTreeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const viewportW = useViewportWidth();

  const { byPath, trace, nodes, edges, density, autoHeight, totalNodes } = useMemo(() => {
    const e = env ?? {};
    const { byPath, trace } = buildRecords(tree, e);

    const totalNodes = treeSize(tree);
    const density = DENSITY[densityFor(totalNodes, viewportW)];

    const laid = layoutTree(tree, {
      nodeWidth: density.nodeW,
      nodeHeight: density.nodeH,
      hGap: density.hGap,
      vGap: density.vGap,
      constNodeWidth: density.constSize,
    });

    const maxY = laid.reduce((m, l) => (l.y > m ? l.y : m), 0);
    const depthLevels = density.vGap > 0 ? Math.round(maxY / density.vGap) + 1 : 1;

    // Adaptive height: deep trees get more vertical room (capped per
    // viewport so the panel never devours the page).
    const small = viewportW < 640;
    const baseHeight = small ? 380 : 480;
    const perDepth = small ? 18 : 22;
    const maxHeight = small ? 580 : 780;
    const minHeight = height ?? baseHeight;
    const autoHeight = Math.min(
      maxHeight,
      Math.max(minHeight, baseHeight + depthLevels * perDepth)
    );

    const flowNodes: Node[] = laid.map((l) => {
      const rec = byPath.get(l.id)!;
      const flippedY = maxY - l.y;
      // Const leaves are smaller squares; everything else uses the full
      // node footprint. Offset by the right half-size so React Flow gets
      // the top-left corner from the layout's centerpoint.
      const isConst = rec.kind === "const";
      const w = isConst ? density.constSize : density.nodeW;
      const h = isConst ? density.constSize : density.nodeH;
      const common = {
        id: l.id,
        position: { x: l.x - w / 2, y: flippedY - h / 2 },
        draggable: false,
      };
      if (rec.kind === "eml") return { ...common, type: "eml", data: rec };
      if (rec.kind === "const") return { ...common, type: "const", data: rec };
      return { ...common, type: "var", data: rec };
    });

    const flowEdges: Edge[] = laid
      .filter((l) => l.parentId)
      .map((l) => {
        const isLeft = l.id.endsWith("L");
        const isConstSource = l.node.kind === "const";
        // Const leaves are re-anchored beside the parent at a fixed
        // legLength offset, so a `step` edge from const's bottom into
        // the parent's side handle (LS/RS) traces a clean right-angled
        // L with two equal-length arms. Eml/var children sit in the
        // row above and route to the parent's top handles (LT/RT) via
        // smoothstep, with source-Bottom and target-Top facing each
        // other directly — the curve stays inside the gap between
        // rows and the `measure` algorithm guarantees disjoint X
        // extents for sibling subtrees, so no edge crosses a node.
        const targetHandle = isConstSource
          ? isLeft
            ? "LS"
            : "RS"
          : isLeft
            ? "LT"
            : "RT";
        return {
          id: `${l.parentId}->${l.id}`,
          source: l.id,
          target: l.parentId!,
          targetHandle,
          type: isConstSource ? "step" : "smoothstep",
          label: isLeft ? "L" : "R",
          labelStyle: {
            fontSize: density.tier === "tiny" ? 8 : 10,
            fontFamily: "ui-monospace, monospace",
            fill: "rgb(226 232 240)",
          },
          labelBgStyle: { fill: "rgb(15 23 42)" },
          labelBgPadding: [3, 1] as [number, number],
          style: { stroke: "rgb(148 163 184)", strokeWidth: 1.25 },
        };
      });

    return {
      byPath,
      trace,
      nodes: flowNodes,
      edges: flowEdges,
      density,
      autoHeight,
      totalNodes,
    };
  }, [tree, env, viewportW, height]);

  const highlightSet = useMemo(
    () => (selected ? descendantPaths(byPath, selected) : null),
    [byPath, selected]
  );

  const enrichedNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          density,
          selected: highlightSet ? highlightSet.has(n.id) : false,
          onSelect: (path: string) =>
            setSelected((prev) => (prev === path ? null : path)),
        },
      })),
    [nodes, highlightSet, density]
  );

  const enrichedEdges = useMemo(
    () =>
      edges.map((e) => {
        const active = highlightSet ? highlightSet.has(e.source) : false;
        return {
          ...e,
          animated: active,
          style: {
            ...e.style,
            stroke: active ? "rgb(56 189 248)" : "rgb(148 163 184)",
            strokeWidth: active ? 1.9 : 1.25,
            opacity: highlightSet && !active ? 0.3 : 1,
          },
        };
      }),
    [edges, highlightSet]
  );

  const selectedRec = selected ? byPath.get(selected) : null;

  // MiniMap eats screen real estate on phones; only show it on tablets+
  // and only when the tree is large enough to actually benefit.
  const showMinimap = viewportW >= 640 && totalNodes > 12;
  const minimapWidth = viewportW < 1024 ? 110 : 160;
  const minimapHeight = viewportW < 1024 ? 70 : 100;

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className="eml-tree-canvas overflow-hidden rounded-md border border-slate-800 bg-black"
        style={{ height: autoHeight }}
      >
        <ReactFlow
          nodes={enrichedNodes}
          edges={enrichedEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: density.tier === "tiny" ? 0.08 : 0.16 }}
          minZoom={0.08}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnScroll
          onlyRenderVisibleElements={totalNodes > 80}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="rgb(30 41 59)" />
          <Controls
            showInteractive={false}
            className="!shadow-none [&>button]:!border-slate-700 [&>button]:!bg-slate-900 [&>button]:!text-slate-200 [&>button:hover]:!bg-slate-800"
          />
          {showMinimap && (
            <MiniMap
              pannable
              zoomable
              maskColor="rgba(0, 0, 0, 0.7)"
              style={{
                background: "rgb(15 23 42)",
                borderColor: "rgb(30 41 59)",
                width: minimapWidth,
                height: minimapHeight,
              }}
              nodeColor={(n) => {
                if (n.type === "eml") {
                  const dx = n.data as EmlData | undefined;
                  return dx?.isResult ? "rgb(52 211 153)" : "rgb(241 245 249)";
                }
                if (n.type === "var") return "rgb(125 211 252)";
                if (n.type === "const") return "rgb(252 211 77)";
                return "rgb(226 232 240)";
              }}
              nodeStrokeColor={(n) => {
                if (n.type === "eml") {
                  const dx = n.data as EmlData | undefined;
                  return dx?.isResult ? "rgb(167 243 208)" : "rgb(148 163 184)";
                }
                if (n.type === "var") return "rgb(186 230 253)";
                if (n.type === "const") return "rgb(253 230 138)";
                return "rgb(148 163 184)";
              }}
            />
          )}
        </ReactFlow>
      </div>

      <SelectedInspector record={selectedRec} />

      <TracePanel trace={trace} selected={selected} onSelect={setSelected} />
    </div>
  );
}

function SelectedInspector({ record }: { record: NodeRecord | null | undefined }) {
  if (!record) {
    return (
      <p className="text-[11px] text-muted-foreground">
        Click any node to inspect what flows through it and highlight its subtree.
      </p>
    );
  }
  if (record.kind === "const") {
    return (
      <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-xs">
        <div className="font-mono uppercase tracking-wide text-muted-foreground">
          constant leaf
        </div>
        <p className="mt-1">
          A literal{" "}
          <span className="font-mono font-semibold text-foreground">{record.value}</span>. This is
          the only non-input primitive the EML grammar admits.
        </p>
      </div>
    );
  }
  if (record.kind === "var") {
    return (
      <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-xs">
        <div className="font-mono uppercase tracking-wide text-muted-foreground">input leaf</div>
        <p className="mt-1">
          Variable <span className="font-mono font-semibold text-foreground">{record.name}</span>{" "}
          bound to{" "}
          <span className="font-mono font-semibold text-foreground">
            {formatNumber(record.value)}
          </span>{" "}
          from the calculator display.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-1 rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-xs">
      <div className="flex items-center justify-between font-mono uppercase tracking-wide text-muted-foreground">
        <span>step {record.step}</span>
        <span>eml(left, right)</span>
      </div>
      <div className="font-mono text-[13px] leading-relaxed text-foreground">
        eml({formatNumber(record.leftValue, 6)}, {formatNumber(record.rightValue, 6)}) = exp(
        {formatNumber(record.leftValue, 6)}) − ln({formatNumber(record.rightValue, 6)}) ={" "}
        {formatNumber(Math.exp(record.leftValue), 6)} −{" "}
        {formatNumber(Math.log(record.rightValue), 6)} ={" "}
        <span className="font-semibold">{formatNumber(record.value, 6)}</span>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Subtree leading to this node is highlighted in the graph.
      </p>
    </div>
  );
}

function TracePanel({
  trace,
  selected,
  onSelect,
}: {
  trace: TraceEntry[];
  selected: string | null;
  onSelect: (path: string | null) => void;
}) {
  if (trace.length === 0) {
    return null;
  }
  return (
    <details className="rounded-md border border-border bg-muted/20" open={trace.length <= 6}>
      <summary className="cursor-pointer select-none px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        evaluation order ({trace.length} eml steps)
      </summary>
      <ol className="max-h-64 space-y-1 overflow-auto border-t border-border px-3 py-2 font-mono text-[11px]">
        {trace.map((t) => (
          <li key={t.path}>
            <button
              onClick={() => onSelect(selected === t.path ? null : t.path)}
              className={cn(
                "flex w-full items-baseline gap-2 rounded px-2 py-1 text-left transition-colors hover:bg-accent",
                selected === t.path && "bg-primary/10 text-foreground"
              )}
            >
              <span className="w-8 shrink-0 text-muted-foreground">#{t.step}</span>
              <span className="flex-1 truncate text-foreground/80">{t.description}</span>
              <span className="shrink-0 font-semibold tabular-nums text-foreground">
                = {formatNumber(t.value, 4)}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </details>
  );
}
