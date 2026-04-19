"use client";

import { useMemo, useState } from "react";
import { Eraser, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TreeView } from "@/components/eml/tree-view";
import { parse, EMLParseError } from "@/lib/eml/parser";
import { evaluate, EMLEvalError } from "@/lib/eml/evaluate";
import { treeDepth, treeSize, leafCount } from "@/lib/eml/depth";
import { formatNumber } from "@/lib/utils";

interface Example {
  label: string;
  expr: string;
  note: string;
}

const EXAMPLES: Example[] = [
  { label: "e", expr: "eml(1, 1)", note: "Euler's number: exp(1) − ln(1) = e" },
  { label: "exp(x)", expr: "eml(x, 1)", note: "The single-node exponential" },
  { label: "0", expr: "eml(1, eml(eml(1, 1), 1))", note: "Zero isn't free — depth 3" },
  { label: "exp(e)", expr: "eml(eml(1, 1), 1)", note: "Nested: exp applied to e" },
  {
    label: "ln(x)",
    expr: "eml(1, eml(eml(1, x), 1))",
    note: "Classic depth-3 tree from the paper",
  },
  {
    label: "identity",
    expr: "eml(1, eml(eml(1, eml(x, 1)), 1))",
    note: "ln(exp(x)) = x — four nested eml calls",
  },
];

export function PlaygroundClient() {
  const [expr, setExpr] = useState("eml(1, 1)");
  const [xValue, setXValue] = useState(1);

  const parsed = useMemo(() => {
    try {
      const tree = parse(expr);
      return { ok: true as const, tree };
    } catch (err) {
      if (err instanceof EMLParseError) {
        return { ok: false as const, error: err.message };
      }
      return { ok: false as const, error: String(err) };
    }
  }, [expr]);

  const hasVar = useMemo(() => {
    if (!parsed.ok) return false;
    let has = false;
    const walk = (n: import("@/lib/eml/types").EMLNode) => {
      if (n.kind === "var") has = true;
      else if (n.kind === "eml") {
        walk(n.left);
        walk(n.right);
      }
    };
    walk(parsed.tree);
    return has;
  }, [parsed]);

  const evaluation = useMemo(() => {
    if (!parsed.ok) return null;
    try {
      const v = evaluate(parsed.tree, { env: { x: xValue } });
      return { ok: true as const, value: v };
    } catch (err) {
      if (err instanceof EMLEvalError) {
        return { ok: false as const, error: err.message };
      }
      return { ok: false as const, error: String(err) };
    }
  }, [parsed, xValue]);

  const metrics = useMemo(() => {
    if (!parsed.ok) return null;
    return {
      depth: treeDepth(parsed.tree),
      size: treeSize(parsed.tree),
      leaves: leafCount(parsed.tree),
    };
  }, [parsed]);

  const insertAtCursor = (snippet: string) => {
    setExpr((prev) => {
      if (!prev.trim()) return snippet;
      return prev + snippet;
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        {/* Expression input */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Expression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              placeholder="eml(1, 1)"
              className="font-mono text-base"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => insertAtCursor("eml(, )")}>
                <Plus className="h-3 w-3" /> eml( , )
              </Button>
              <Button size="sm" variant="outline" onClick={() => insertAtCursor("1")}>
                1
              </Button>
              <Button size="sm" variant="outline" onClick={() => insertAtCursor("x")}>
                x
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setExpr("")}>
                <Eraser className="h-3 w-3" /> Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!parsed.ok ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                Parse error — {parsed.error}
              </div>
            ) : !evaluation?.ok ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {evaluation?.error ?? "Evaluation error"}
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-semibold tabular-nums">
                  {formatNumber(evaluation.value)}
                </span>
                <span className="text-xs text-muted-foreground">numeric value</span>
              </div>
            )}
            {hasVar && (
              <div className="flex items-center gap-3 pt-1">
                <label className="text-sm text-muted-foreground">x =</label>
                <Input
                  type="number"
                  step="0.1"
                  value={xValue}
                  onChange={(e) => setXValue(Number(e.target.value) || 0)}
                  className="h-8 w-28 font-mono text-sm"
                />
                <input
                  type="range"
                  min={-5}
                  max={5}
                  step={0.1}
                  value={xValue}
                  onChange={(e) => setXValue(Number(e.target.value))}
                  className="flex-1 accent-[hsl(var(--primary))]"
                />
              </div>
            )}
            {metrics && (
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="muted">depth {metrics.depth}</Badge>
                <Badge variant="muted">size {metrics.size}</Badge>
                <Badge variant="muted">{metrics.leaves} leaves</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tree */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tree</CardTitle>
          </CardHeader>
          <CardContent>
            {parsed.ok ? (
              <TreeView tree={parsed.tree} env={hasVar ? { x: xValue } : undefined} />
            ) : (
              <div className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                Fix the expression to see the tree.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Examples sidebar */}
      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Try these
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => setExpr(ex.expr)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold">{ex.label}</span>
                  <Badge variant="muted" className="text-[10px]">
                    insert
                  </Badge>
                </div>
                <code className="mt-1 block truncate text-xs text-muted-foreground">{ex.expr}</code>
                <p className="mt-1 text-xs text-muted-foreground">{ex.note}</p>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-mono text-foreground">eml(x, y) = exp(x) − ln(y)</span>
            </p>
            <p>
              Only two primitives are allowed: the operator{" "}
              <span className="font-mono text-foreground">eml</span> and the constant{" "}
              <span className="font-mono text-foreground">1</span>. Every valid expression is a binary
              tree matching the grammar:
            </p>
            <pre className="rounded-md bg-muted p-2 text-xs">S → 1 | eml(S, S)</pre>
            <p>Variables like <span className="font-mono text-foreground">x</span> are allowed here so you can watch parametric trees update.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
