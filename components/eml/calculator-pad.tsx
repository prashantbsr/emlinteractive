"use client";

import { useMemo, useState } from "react";
import { Calculator as CalcIcon, Eraser, GitBranch, Network, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveTree } from "@/components/eml/interactive-tree";
import { MathInline } from "@/components/eml/math";
import { CALC_OPS, K_VALUE } from "@/lib/eml/calculator";
import { evaluate } from "@/lib/eml/evaluate";
import { serialize } from "@/lib/eml/serialize";
import { treeDepth, treeSize } from "@/lib/eml/depth";
import { formatNumber, cn } from "@/lib/utils";
import type { EMLNode } from "@/lib/eml/types";

type BinaryOp = "add" | "sub" | "mul" | "div";

interface LastEval {
  opId: string;
  tree: EMLNode;
  env: Record<string, number>;
  result: number;
  expression: string;
  expressionTex: string;
  arity: 0 | 1 | 2;
}

type TemplateBase = {
  id: string;
  name: string;
  nameTex: string;
  // optional plain-text tail rendered next to the TeX name, e.g. "(shifted)".
  nameSuffix?: string;
  desc: string;
  descTex?: string;
};

type Template =
  | (TemplateBase & { kind: "const"; opId: string })
  | (TemplateBase & { kind: "unary"; opId: string; x: number })
  | (TemplateBase & {
      kind: "binary";
      opId: BinaryOp;
      x: number;
      y: number;
    });

const TEMPLATES: Template[] = [
  {
    id: "exp1",
    name: "exp(1) = e",
    nameTex: String.raw`\exp(1) = e`,
    desc: "Single-node exponential at 1",
    kind: "unary",
    opId: "exp",
    x: 1,
  },
  {
    id: "lne",
    name: "ln(e) = 1",
    nameTex: String.raw`\ln(e) = 1`,
    desc: "Inverse of exp, evaluated at e",
    kind: "unary",
    opId: "ln",
    x: Math.E,
  },
  {
    id: "sqrt16",
    name: "√16 = 4",
    nameTex: String.raw`\sqrt{16} = 4`,
    desc: "Square root via shifted half-mean",
    kind: "unary",
    opId: "sqrt",
    x: 16,
  },
  {
    id: "sqr5",
    name: "5² = 25",
    nameTex: String.raw`5^{2} = 25`,
    desc: "Square via exp(2·ln x)",
    descTex: String.raw`\text{Square via } \exp(2 \cdot \ln x)`,
    kind: "unary",
    opId: "square",
    x: 5,
  },
  {
    id: "recip4",
    name: "1 ÷ 4 = 0.25",
    nameTex: String.raw`\dfrac{1}{4} = 0.25`,
    desc: "Reciprocal via exp(−ln x)",
    descTex: String.raw`\text{Reciprocal via } \exp(-\ln x)`,
    kind: "unary",
    opId: "recip",
    x: 4,
  },
  {
    id: "neg7",
    name: "−7 (shifted)",
    nameTex: String.raw`-7`,
    nameSuffix: "(shifted)",
    desc: "Negation via K = exp(e) trick",
    descTex: String.raw`\text{Negation via } K = e^{e} \text{ trick}`,
    kind: "unary",
    opId: "neg",
    x: 7,
  },
  {
    id: "mul23",
    name: "2 × 3 = 6",
    nameTex: String.raw`2 \times 3 = 6`,
    desc: "Multiply via exp(ln x + ln y)",
    descTex: String.raw`\text{Multiply via } \exp(\ln x + \ln y)`,
    kind: "binary",
    opId: "mul",
    x: 2,
    y: 3,
  },
  {
    id: "div104",
    name: "10 ÷ 4 = 2.5",
    nameTex: String.raw`10 \div 4 = 2.5`,
    desc: "Divide via multiply + reciprocal",
    kind: "binary",
    opId: "div",
    x: 10,
    y: 4,
  },
  {
    id: "add34",
    name: "3 + 4 = 7",
    nameTex: String.raw`3 + 4 = 7`,
    desc: "Sum via three shifted SUBs",
    kind: "binary",
    opId: "add",
    x: 3,
    y: 4,
  },
  {
    id: "sub82",
    name: "8 − 2 = 6",
    nameTex: String.raw`8 - 2 = 6`,
    desc: "Bedrock SUB primitive a − b",
    descTex: String.raw`\text{Bedrock SUB primitive } a - b`,
    kind: "binary",
    opId: "sub",
    x: 8,
    y: 2,
  },
  {
    id: "e",
    name: "e",
    nameTex: String.raw`e`,
    desc: "Euler's constant from eml(1, 1)",
    descTex: String.raw`\text{Euler's constant from } \operatorname{eml}(1,\, 1)`,
    kind: "const",
    opId: "e",
  },
  {
    id: "zero",
    name: "0 (depth 3)",
    nameTex: String.raw`0`,
    nameSuffix: "(depth 3)",
    desc: "Zero is not free, it's a tree",
    kind: "const",
    opId: "zero",
  },
];

const OP_SYMBOL: Record<BinaryOp, string> = {
  add: "+",
  sub: "−",
  mul: "×",
  div: "÷",
};

const OP_SYMBOL_TEX: Record<BinaryOp, string> = {
  add: "+",
  sub: "-",
  mul: String.raw`\times`,
  div: String.raw`\div`,
};

function compute(
  opId: string,
  env: Record<string, number>
): { ok: true; value: number } | { ok: false; error: string } {
  const op = CALC_OPS[opId];
  if (!op) return { ok: false, error: `Unknown op '${opId}'` };
  const guard = op.guard?.(env);
  if (guard) return { ok: false, error: guard };
  try {
    const v = evaluate(op.tree, { env });
    if (Number.isNaN(v)) return { ok: false, error: "NaN, domain issue" };
    if (!Number.isFinite(v)) return { ok: false, error: "overflow" };
    return { ok: true, value: v };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export function CalculatorPad() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<BinaryOp | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState<LastEval | null>(null);

  const currentNumber = Number(display);

  const inputDigit = (d: string) => {
    setError(null);
    if (waitingForOperand) {
      setDisplay(d);
      setWaitingForOperand(false);
      return;
    }
    setDisplay((prev) => (prev === "0" ? d : prev + d));
  };

  const inputDecimal = () => {
    setError(null);
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    setDisplay((prev) => (prev.includes(".") ? prev : prev + "."));
  };

  const allClear = () => {
    setDisplay("0");
    setPrevious(null);
    setPendingOp(null);
    setWaitingForOperand(false);
    setError(null);
    setLast(null);
  };

  const setBinaryOp = (op: BinaryOp) => {
    setError(null);
    if (previous !== null && pendingOp && !waitingForOperand) {
      // chain: evaluate previous pending op first
      const env = { x: previous, y: currentNumber };
      const r = compute(pendingOp, env);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      const opSpec = CALC_OPS[pendingOp];
      setLast({
        opId: pendingOp,
        tree: opSpec.tree,
        env,
        result: r.value,
        expression: `${formatNumber(previous)} ${OP_SYMBOL[pendingOp]} ${formatNumber(currentNumber)}`,
        expressionTex: `${toTexNumber(previous)} ${OP_SYMBOL_TEX[pendingOp]} ${toTexNumber(currentNumber)}`,
        arity: 2,
      });
      setDisplay(String(r.value));
      setPrevious(r.value);
    } else {
      setPrevious(currentNumber);
    }
    setPendingOp(op);
    setWaitingForOperand(true);
  };

  const equals = () => {
    if (previous === null || pendingOp === null) return;
    setError(null);
    const env = { x: previous, y: currentNumber };
    const r = compute(pendingOp, env);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    const opSpec = CALC_OPS[pendingOp];
    setLast({
      opId: pendingOp,
      tree: opSpec.tree,
      env,
      result: r.value,
      expression: `${formatNumber(previous)} ${OP_SYMBOL[pendingOp]} ${formatNumber(currentNumber)}`,
      expressionTex: `${toTexNumber(previous)} ${OP_SYMBOL_TEX[pendingOp]} ${toTexNumber(currentNumber)}`,
      arity: 2,
    });
    setDisplay(String(r.value));
    setPrevious(null);
    setPendingOp(null);
    setWaitingForOperand(true);
  };

  const applyUnary = (opId: string, label: string) => {
    setError(null);
    const env = { x: currentNumber };
    const r = compute(opId, env);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    const opSpec = CALC_OPS[opId];
    setLast({
      opId,
      tree: opSpec.tree,
      env,
      result: r.value,
      expression: `${label}(${formatNumber(currentNumber)})`,
      expressionTex: substituteTexLabel(opSpec.labelTex, env),
      arity: 1,
    });
    setDisplay(String(r.value));
    setWaitingForOperand(true);
  };

  const insertConstant = (opId: string) => {
    setError(null);
    const opSpec = CALC_OPS[opId];
    const v = evaluate(opSpec.tree);
    setLast({
      opId,
      tree: opSpec.tree,
      env: {},
      result: v,
      expression: opSpec.label,
      expressionTex: opSpec.labelTex,
      arity: 0,
    });
    setDisplay(String(v));
    setWaitingForOperand(true);
  };

  const runTemplate = (t: Template) => {
    setError(null);
    setPrevious(null);
    setPendingOp(null);
    const opSpec = CALC_OPS[t.opId];
    if (!opSpec) return;
    if (t.kind === "const") {
      const v = evaluate(opSpec.tree);
      setLast({
        opId: t.opId,
        tree: opSpec.tree,
        env: {},
        result: v,
        expression: opSpec.label,
        expressionTex: opSpec.labelTex,
        arity: 0,
      });
      setDisplay(String(v));
      setWaitingForOperand(true);
      return;
    }
    const env: Record<string, number> =
      t.kind === "unary" ? { x: t.x } : { x: t.x, y: t.y };
    const r = compute(t.opId, env);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    const expression =
      t.kind === "unary"
        ? substituteLabel(opSpec.label, { x: t.x })
        : `${formatNumber(t.x)} ${OP_SYMBOL[t.opId]} ${formatNumber(t.y)}`;
    const expressionTex =
      t.kind === "unary"
        ? substituteTexLabel(opSpec.labelTex, { x: t.x })
        : `${toTexNumber(t.x)} ${OP_SYMBOL_TEX[t.opId]} ${toTexNumber(t.y)}`;
    setLast({
      opId: t.opId,
      tree: opSpec.tree,
      env,
      result: r.value,
      expression,
      expressionTex,
      arity: t.kind === "unary" ? 1 : 2,
    });
    setDisplay(String(r.value));
    setWaitingForOperand(true);
  };

  const treeStats = useMemo(() => {
    if (!last) return null;
    return {
      depth: treeDepth(last.tree),
      size: treeSize(last.tree),
      serialized: serialize(last.tree),
    };
  }, [last]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      {/* Calculator pad */}
      <Card className="self-start">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalcIcon className="h-4 w-4 text-primary" />
            EML Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Display */}
          <div className="rounded-md border border-border bg-muted/40 p-3 text-right">
            <div className="flex min-h-[18px] justify-end text-xs text-muted-foreground">
              {previous !== null && pendingOp ? (
                <MathInline>
                  {waitingForOperand
                    ? `${toTexNumber(previous)} \\; ${OP_SYMBOL_TEX[pendingOp]}`
                    : `${toTexNumber(previous)} \\; ${OP_SYMBOL_TEX[pendingOp]} \\; ${toTexNumber(currentNumber)}`}
                </MathInline>
              ) : last ? (
                <MathInline>{last.expressionTex}</MathInline>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
            <div
              className={cn(
                "mt-1 truncate font-mono text-3xl font-semibold tabular-nums",
                error ? "text-destructive" : "text-foreground"
              )}
              title={display}
            >
              {error ? "Err" : formatNumber(Number(display))}
            </div>
            {error && (
              <div className="mt-1 truncate text-xs text-destructive" title={error}>
                {error}
              </div>
            )}
          </div>

          {/* Scientific row */}
          <div className="grid grid-cols-4 gap-2">
            <PadButton variant="science" onClick={() => applyUnary("square", "x²")}>x²</PadButton>
            <PadButton variant="science" onClick={() => applyUnary("cube", "x³")}>x³</PadButton>
            <PadButton variant="science" onClick={() => applyUnary("sqrt", "√")}>√x</PadButton>
            <PadButton variant="science" onClick={() => applyUnary("recip", "1/x")}>1/x</PadButton>
            <PadButton variant="science" onClick={() => applyUnary("exp", "exp")}>exp</PadButton>
            <PadButton variant="science" onClick={() => applyUnary("ln", "ln")}>ln</PadButton>
            <PadButton variant="science" onClick={() => insertConstant("e")}>e</PadButton>
            <PadButton variant="science" onClick={() => insertConstant("zero")}>0₍ₑₘₗ₎</PadButton>
          </div>

          {/* Number + op grid */}
          <div className="grid grid-cols-4 gap-2">
            <PadButton variant="util" onClick={allClear}>
              <Eraser className="h-3.5 w-3.5" /> AC
            </PadButton>
            <PadButton variant="util" onClick={() => {
              if (waitingForOperand || display === "0") return;
              setDisplay((prev) => {
                if (prev.length === 1 || (prev.length === 2 && prev.startsWith("-"))) return "0";
                return prev.slice(0, -1);
              });
            }}>⌫</PadButton>
            <PadButton variant="util" onClick={() => applyUnary("neg", "−")}>±</PadButton>
            <PadButton variant="op" onClick={() => setBinaryOp("div")}>÷</PadButton>

            <PadButton onClick={() => inputDigit("7")}>7</PadButton>
            <PadButton onClick={() => inputDigit("8")}>8</PadButton>
            <PadButton onClick={() => inputDigit("9")}>9</PadButton>
            <PadButton variant="op" onClick={() => setBinaryOp("mul")}>×</PadButton>

            <PadButton onClick={() => inputDigit("4")}>4</PadButton>
            <PadButton onClick={() => inputDigit("5")}>5</PadButton>
            <PadButton onClick={() => inputDigit("6")}>6</PadButton>
            <PadButton variant="op" onClick={() => setBinaryOp("sub")}>−</PadButton>

            <PadButton onClick={() => inputDigit("1")}>1</PadButton>
            <PadButton onClick={() => inputDigit("2")}>2</PadButton>
            <PadButton onClick={() => inputDigit("3")}>3</PadButton>
            <PadButton variant="op" onClick={() => setBinaryOp("add")}>+</PadButton>

            <PadButton onClick={() => inputDigit("0")} className="col-span-2">0</PadButton>
            <PadButton onClick={inputDecimal}>.</PadButton>
            <PadButton variant="equals" onClick={equals}>=</PadButton>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Every operation routes through a pure-EML tree. Inputs are
            substituted into <MathInline>{String.raw`x`}</MathInline>,{" "}
            <MathInline>{String.raw`y`}</MathInline> leaves of the
            operator's tree; the value you see is what{" "}
            <MathInline>
              {String.raw`\operatorname{eml}(x,\, y) = \exp(x) - \ln(y)`}
            </MathInline>{" "}
            nestings actually compute. Domain limit:{" "}
            <MathInline>
              {`|\\text{input}| < e^{e} \\approx ${K_VALUE.toFixed(2)}`}
            </MathInline>{" "}
            for shifted ops (+, −x, ±). Multiplicative ops require positive
            inputs.
          </p>
        </CardContent>
      </Card>

      {/* Right panel: templates, under-the-hood, graph */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs text-muted-foreground">
              One-click calculations that load straight into the display and the EML graph.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => runTemplate(t)}
                  className={cn(
                    "rounded-md border border-border bg-background px-2.5 py-2 text-left text-xs transition-colors hover:border-primary/50 hover:bg-accent",
                    last?.opId === t.opId &&
                      ((t.kind === "const" && last.arity === 0) ||
                        (t.kind === "unary" && last.env.x === t.x) ||
                        (t.kind === "binary" && last.env.x === t.x && last.env.y === t.y)) &&
                      "border-primary/60 bg-accent"
                  )}
                >
                  <div className="flex flex-wrap items-baseline gap-1 font-semibold text-foreground">
                    <MathInline>{t.nameTex}</MathInline>
                    {t.nameSuffix && (
                      <span className="text-[11px] font-normal text-muted-foreground">
                        {t.nameSuffix}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {t.descTex ? <MathInline>{t.descTex}</MathInline> : t.desc}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GitBranch className="h-4 w-4 text-primary" />
              EML graph
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!last ? (
              <div className="flex h-[480px] items-center justify-center rounded-md border border-dashed border-slate-800 bg-black text-center text-sm text-slate-400">
                Press a calculator button to render the EML tree behind the result.
              </div>
            ) : (
              <>
                <InteractiveTree
                  key={last.opId + "::" + Object.values(last.env).join(",")}
                  tree={last.tree}
                  env={last.env}
                  height={480}
                />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Every internal node is an{" "}
                  <MathInline>
                    {String.raw`\operatorname{eml}(L,\, R) = \exp(L) - \ln(R)`}
                  </MathInline>{" "}
                  call. Leaves are either the constant{" "}
                  <MathInline>{String.raw`1`}</MathInline> or the inputs{" "}
                  <MathInline>{String.raw`x`}</MathInline>
                  {last.arity === 2 && (
                    <>
                      , <MathInline>{String.raw`y`}</MathInline>
                    </>
                  )}
                  . Drag to pan, scroll to zoom, click a node to highlight the subtree that fed
                  into it.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Network className="h-4 w-4 text-primary" />
              Under the hood
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!last ? (
              <p className="text-sm text-muted-foreground">
                Press a calculator button to see the EML composition behind the answer.
              </p>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    expression
                  </div>
                  <div className="text-base">
                    <MathInline>{last.expressionTex}</MathInline>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    operator (variable form)
                  </div>
                  <div className="text-sm">
                    <MathInline>{CALC_OPS[last.opId].labelTex}</MathInline>
                  </div>
                  <div className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                    <MathInline>{CALC_OPS[last.opId].formulaTex}</MathInline>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    full eml expansion
                  </div>
                  <code className="block max-h-32 overflow-auto break-all rounded-md bg-muted p-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                    {treeStats?.serialized}
                  </code>
                </div>
                <div className="flex flex-wrap gap-2">
                  {treeStats && (
                    <>
                      <Badge variant="muted">depth {treeStats.depth}</Badge>
                      <Badge variant="muted">size {treeStats.size}</Badge>
                    </>
                  )}
                  {Object.entries(last.env).map(([k, v]) => (
                    <Badge key={k} variant="muted">
                      <MathInline>{`${k} = ${toTexNumber(v)}`}</MathInline>
                    </Badge>
                  ))}
                  <Badge variant="default">
                    <MathInline>{`= ${toTexNumber(last.result)}`}</MathInline>
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">How the trees are built</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              The bedrock primitive is{" "}
              <MathInline>
                {String.raw`\operatorname{SUB}(a,\, b) = \operatorname{eml}\bigl(\operatorname{LN}(a),\, \operatorname{EXP}(b)\bigr) = a - b`}
              </MathInline>{" "}
              (needs <MathInline>{String.raw`a > 0`}</MathInline>). Every other op
              composes from this:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-xs">
              <li>
                <MathInline>{String.raw`-x \;=\; (K - x) - K,\ \ K = e^{e}`}</MathInline>
              </li>
              <li>
                <MathInline>{String.raw`x + y \;=\; \bigl((K - (-x)) - (-y)\bigr) - K`}</MathInline>
              </li>
              <li>
                <MathInline>{String.raw`x \cdot y \;=\; \exp\bigl(\ln x + \ln y\bigr)`}</MathInline>
              </li>
              <li>
                <MathInline>{String.raw`\dfrac{1}{x} \;=\; \exp(-\ln x)`}</MathInline>
              </li>
              <li>
                <MathInline>{String.raw`x \div y \;=\; x \cdot \dfrac{1}{y}`}</MathInline>
              </li>
              <li>
                <MathInline>{String.raw`\sqrt{x} \;=\; \exp\!\left(\dfrac{\ln x + K}{2} - \dfrac{K}{2}\right)`}</MathInline>
              </li>
            </ul>
            <p className="text-xs">
              Depths balloon, multiply alone is a tree with hundreds of nodes,
              but every leaf is either{" "}
              <MathInline>{String.raw`1`}</MathInline> or one of your
              inputs. There are no other primitives.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function substituteLabel(label: string, env: Record<string, number>): string {
  let out = label;
  for (const [k, v] of Object.entries(env)) {
    out = out.replace(new RegExp(`(?<![a-zA-Z])${k}(?![a-zA-Z])`, "g"), formatNumber(v));
  }
  return out;
}

// Same substitution as `substituteLabel`, but written so the numeric form is
// safe to drop into a LaTeX string: `−∞` becomes `-\infty`, the Unicode minus
// in negative numbers stays as a hyphen, etc.
function substituteTexLabel(labelTex: string, env: Record<string, number>): string {
  let out = labelTex;
  for (const [k, v] of Object.entries(env)) {
    out = out.replace(
      new RegExp(`(?<![a-zA-Z\\\\])${k}(?![a-zA-Z])`, "g"),
      toTexNumber(v)
    );
  }
  return out;
}

function toTexNumber(value: number): string {
  if (Number.isNaN(value)) return String.raw`\mathrm{NaN}`;
  if (!Number.isFinite(value)) return value > 0 ? String.raw`\infty` : String.raw`-\infty`;
  const formatted = formatNumber(value);
  // Convert scientific notation (`1.2345e-5`) into LaTeX form, and normalize
  // the Unicode minus sign that `formatNumber` emits for negative infinity.
  const normalized = formatted.replace(/−/g, "-");
  const sci = normalized.match(/^(-?\d+(?:\.\d+)?)e([+-]?\d+)$/);
  if (sci) {
    const [, mantissa, exp] = sci;
    return `${mantissa} \\times 10^{${Number(exp)}}`;
  }
  return normalized;
}

function PadButton({
  children,
  onClick,
  variant = "digit",
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "digit" | "op" | "equals" | "util" | "science";
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "h-12 font-mono text-base",
        variant === "digit" && "bg-card text-foreground hover:bg-accent border border-border",
        variant === "op" && "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30",
        variant === "equals" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "util" && "bg-muted text-muted-foreground hover:bg-accent border border-border text-xs",
        variant === "science" && "bg-card text-foreground/80 hover:bg-accent border border-border text-xs",
        className
      )}
      variant="ghost"
    >
      {children}
    </Button>
  );
}
