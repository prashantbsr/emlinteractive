"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TreeView } from "@/components/eml/tree-view";
import { MathBlock } from "@/components/eml/math";
import { type EMLFunctionSpec, referenceValue } from "@/lib/eml/library";
import { evaluate } from "@/lib/eml/evaluate";
import { trace } from "@/lib/eml/trace";
import { formatNumber } from "@/lib/utils";

interface Props {
  fn: EMLFunctionSpec;
}

export function FunctionDetailClient({ fn }: Props) {
  const [x, setX] = useState<number>(fn.sampleInputs.x ?? 1);
  const hasX = fn.variables.includes("x");
  const env = hasX ? { x } : undefined;

  const result = useMemo(() => {
    try {
      return { ok: true as const, value: evaluate(fn.tree, { env }) };
    } catch (e) {
      return { ok: false as const, error: String(e) };
    }
  }, [fn.tree, env]);

  const steps = useMemo(() => {
    try {
      return trace(fn.tree, { env });
    } catch {
      return [];
    }
  }, [fn.tree, env]);

  const [highlight, setHighlight] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {fn.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {fn.displayName}{" "}
            <span className="font-mono text-muted-foreground">· {fn.symbol}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{fn.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline">depth {fn.depth}</Badge>
          <span className="text-xs text-muted-foreground">Domain: {fn.domain}</span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Definition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MathBlock>{fn.latex + " \\ = \\ " + toLatex(fn.formula)}</MathBlock>
            <div className="rounded-md border border-border bg-muted/40 p-3">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                Formula
              </p>
              <code className="font-mono text-sm">{fn.formula}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-base">Evaluate</CardTitle>
            {hasX && (
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">x =</label>
                <Input
                  type="number"
                  step="0.1"
                  value={x}
                  onChange={(e) => setX(Number(e.target.value) || 0)}
                  className="h-8 w-24 font-mono text-sm"
                />
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!result.ok ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {result.error}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-semibold tabular-nums">
                    {formatNumber(result.value)}
                  </span>
                  {hasX && (
                    <span className="text-xs text-muted-foreground">
                      at x = {x}
                    </span>
                  )}
                </div>
                {hasX && (
                  <p className="text-xs text-muted-foreground">
                    Reference: {fn.symbol.replace("x", String(x))} ≈{" "}
                    {formatNumber(referenceValue(fn.slug, env ?? {}))}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">EML tree</CardTitle>
        </CardHeader>
        <CardContent>
          <TreeView
            tree={fn.tree}
            env={env}
            highlightPath={highlight}
            onNodeClick={(id) => setHighlight((prev) => (prev === id ? null : id))}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Click a node to highlight it. Each node shows its computed value below the label.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Step-through evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            {steps.map((step, i) => (
              <li
                key={step.path}
                className="flex items-start gap-3 rounded-md border border-border bg-background px-3 py-2 hover:border-primary/40 hover:bg-accent/40 cursor-pointer"
                onMouseEnter={() => setHighlight(step.path)}
                onMouseLeave={() => setHighlight(null)}
              >
                <span className="mt-0.5 w-6 shrink-0 text-xs text-muted-foreground">
                  {i + 1}.
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  depth {step.depth}
                </span>
                <span className="font-mono">{step.description}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Derivation</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            {fn.derivation.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-6 shrink-0 text-xs text-muted-foreground">
                  {i + 1}.
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function toLatex(formula: string): string {
  return `\\texttt{${formula.replace(/_/g, "\\_")}}`;
}
