"use client";

import { useMemo } from "react";
import { evaluate } from "@/lib/eml/evaluate";
import { formatNumber } from "@/lib/utils";
import type { EMLNode } from "@/lib/eml/types";

interface CalculatorPlotProps {
  opId: string;
  tree: EMLNode;
  env: Record<string, number>;
  result: number;
  arity: 0 | 1 | 2;
}

// Plot domain per op, chosen to stay inside the EML guard while still showing
// the interesting shape of the curve. For binary ops we vary x with y held at
// the last evaluated value, so the visible window is shifted accordingly.
const PLOT_DOMAIN: Record<string, [number, number]> = {
  exp: [-3, 3],
  ln: [0.05, 10],
  sqrt: [0.01, 16],
  square: [0.1, 5],
  cube: [0.1, 4],
  recip: [0.1, 5],
  neg: [-14, 14],
  add: [-7, 7],
  sub: [0.1, 12],
  mul: [0.1, 5],
  div: [0.1, 5],
};

const W = 420;
const H = 220;
const PAD_L = 36;
const PAD_R = 14;
const PAD_T = 14;
const PAD_B = 26;

interface SamplePoint {
  x: number;
  y: number;
}

export function CalculatorPlot({ opId, tree, env, result, arity }: CalculatorPlotProps) {
  const plot = useMemo(() => {
    if (arity === 0) return null;
    const range = PLOT_DOMAIN[opId];
    if (!range) return null;

    let [xmin, xmax] = range;
    // Shift the window so the current evaluation point is comfortably visible
    // for binary ops where y was customised.
    const focus = env.x;
    if (Number.isFinite(focus)) {
      const span = xmax - xmin;
      if (focus < xmin || focus > xmax) {
        const c = focus;
        xmin = c - span / 2;
        xmax = c + span / 2;
      }
    }

    const N = 140;
    const pts: SamplePoint[] = [];
    let yMin = Infinity;
    let yMax = -Infinity;
    for (let i = 0; i <= N; i++) {
      const x = xmin + ((xmax - xmin) * i) / N;
      const sampleEnv = { ...env, x };
      try {
        const y = evaluate(tree, { env: sampleEnv });
        if (Number.isFinite(y) && Math.abs(y) < 1e6) {
          pts.push({ x, y });
          if (y < yMin) yMin = y;
          if (y > yMax) yMax = y;
        }
      } catch {
        // skip domain failures
      }
    }
    if (pts.length < 2) return null;

    // include the current evaluation point in the y range so the dot lands
    if (Number.isFinite(result)) {
      if (result < yMin) yMin = result;
      if (result > yMax) yMax = result;
    }

    // tiny padding so the curve isn't flush with the edges
    const yPad = (yMax - yMin) * 0.08 || 1;
    yMin -= yPad;
    yMax += yPad;

    return { pts, xmin, xmax, ymin: yMin, ymax: yMax };
  }, [opId, tree, env, result, arity]);

  if (arity === 0) {
    return (
      <div className="flex h-[220px] flex-col items-center justify-center rounded-md border border-dashed border-border text-center">
        <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          constant
        </div>
        <div className="mt-1 font-mono text-2xl font-semibold tabular-nums">
          {formatNumber(result)}
        </div>
        <p className="mt-2 max-w-[18rem] text-xs text-muted-foreground">
          Pure-eml constants have no input, so there's nothing to vary on the x-axis.
        </p>
      </div>
    );
  }

  if (!plot) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-md border border-dashed border-border text-center text-xs text-muted-foreground">
        No samples could be evaluated in the plot window.
      </div>
    );
  }

  const { pts, xmin, xmax, ymin, ymax } = plot;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const mapX = (x: number) => PAD_L + ((x - xmin) / (xmax - xmin)) * innerW;
  const mapY = (y: number) => PAD_T + (1 - (y - ymin) / (ymax - ymin)) * innerH;

  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${mapX(p.x).toFixed(2)},${mapY(p.y).toFixed(2)}`)
    .join(" ");

  const showZeroX = xmin < 0 && xmax > 0;
  const showZeroY = ymin < 0 && ymax > 0;

  const xTicks = niceTicks(xmin, xmax);
  const yTicks = niceTicks(ymin, ymax);

  const cx = mapX(env.x);
  const cy = mapY(result);
  const inView =
    env.x >= xmin && env.x <= xmax && result >= ymin && result <= ymax;

  const yLabel =
    arity === 2
      ? `f(x, y=${formatNumber(env.y ?? 0)})`
      : "f(x)";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>{yLabel}</span>
        <span>x ∈ [{formatNumber(xmin)}, {formatNumber(xmax)}]</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full rounded-md border border-border bg-muted/20"
        role="img"
        aria-label={`Plot of ${opId}`}
      >
        {/* grid */}
        {yTicks.map((t) => (
          <line
            key={`gy-${t}`}
            x1={PAD_L}
            x2={W - PAD_R}
            y1={mapY(t)}
            y2={mapY(t)}
            stroke="hsl(var(--border))"
            strokeWidth={0.5}
            strokeDasharray="2 3"
          />
        ))}
        {xTicks.map((t) => (
          <line
            key={`gx-${t}`}
            y1={PAD_T}
            y2={H - PAD_B}
            x1={mapX(t)}
            x2={mapX(t)}
            stroke="hsl(var(--border))"
            strokeWidth={0.5}
            strokeDasharray="2 3"
          />
        ))}

        {/* axes */}
        {showZeroY && (
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={mapY(0)}
            y2={mapY(0)}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={0.75}
          />
        )}
        {showZeroX && (
          <line
            y1={PAD_T}
            y2={H - PAD_B}
            x1={mapX(0)}
            x2={mapX(0)}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={0.75}
          />
        )}

        {/* curve */}
        <path
          d={path}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* current point */}
        {inView && (
          <>
            <line
              x1={cx}
              x2={cx}
              y1={mapY(0) || PAD_T}
              y2={cy}
              stroke="hsl(var(--primary))"
              strokeOpacity={0.35}
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <circle
              cx={cx}
              cy={cy}
              r={4.5}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={1.5}
            />
          </>
        )}

        {/* tick labels */}
        {xTicks.map((t) => (
          <text
            key={`xl-${t}`}
            x={mapX(t)}
            y={H - 8}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={9}
            fontFamily="ui-monospace, monospace"
          >
            {formatTick(t)}
          </text>
        ))}
        {yTicks.map((t) => (
          <text
            key={`yl-${t}`}
            x={PAD_L - 4}
            y={mapY(t) + 3}
            textAnchor="end"
            className="fill-muted-foreground"
            fontSize={9}
            fontFamily="ui-monospace, monospace"
          >
            {formatTick(t)}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span>
          <span className="text-foreground">x</span> = {formatNumber(env.x)}
        </span>
        {arity === 2 && (
          <span>
            <span className="text-foreground">y</span> = {formatNumber(env.y ?? 0)}
          </span>
        )}
        <span>
          <span className="text-foreground">f</span> = {formatNumber(result)}
        </span>
      </div>
    </div>
  );
}

function formatTick(t: number): string {
  if (t === 0) return "0";
  if (Math.abs(t) >= 1000 || Math.abs(t) < 0.01) return t.toExponential(0);
  return Number(t.toFixed(2)).toString();
}

// Return ~5 nicely rounded tick values inside [min, max].
function niceTicks(min: number, max: number): number[] {
  const span = max - min;
  if (span <= 0 || !Number.isFinite(span)) return [];
  const raw = span / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  let step: number;
  if (norm < 1.5) step = 1 * mag;
  else if (norm < 3) step = 2 * mag;
  else if (norm < 7) step = 5 * mag;
  else step = 10 * mag;
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 0.001; v += step) {
    ticks.push(Number(v.toFixed(10)));
  }
  return ticks;
}
