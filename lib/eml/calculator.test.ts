import { describe, expect, it } from "vitest";
import { evaluate } from "./evaluate";
import { CALC_OPS } from "./calculator";

const tol = 1e-6;

function close(a: number, b: number, t = tol) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;
  return Math.abs(a - b) <= t * Math.max(1, Math.abs(a), Math.abs(b));
}

describe("calculator: constants", () => {
  it("e tree evaluates to Math.E", () => {
    const v = evaluate(CALC_OPS.e.tree);
    expect(close(v, Math.E)).toBe(true);
  });

  it("zero tree evaluates to 0", () => {
    const v = evaluate(CALC_OPS.zero.tree);
    expect(close(v, 0, 1e-10)).toBe(true);
  });
});

describe("calculator: unary positive-domain ops", () => {
  const xs = [0.5, 1, 1.5, 2, 3, 7.7];
  const xsInShift = [0.5, 1, 1.5, 2, 3, 7.7];

  it("exp matches Math.exp", () => {
    for (const x of xs) {
      expect(close(evaluate(CALC_OPS.exp.tree, { env: { x } }), Math.exp(x))).toBe(true);
    }
  });

  it("ln matches Math.log for x > 0", () => {
    for (const x of xs) {
      expect(close(evaluate(CALC_OPS.ln.tree, { env: { x } }), Math.log(x))).toBe(true);
    }
  });

  it("recip matches 1/x for x > 0 (in shift range)", () => {
    for (const x of xsInShift) {
      expect(close(evaluate(CALC_OPS.recip.tree, { env: { x } }), 1 / x, 1e-6)).toBe(true);
    }
  });

  it("square matches x*x for x > 0 (in shift range)", () => {
    for (const x of xsInShift) {
      expect(close(evaluate(CALC_OPS.square.tree, { env: { x } }), x * x, 1e-6)).toBe(true);
    }
  });

  it("cube matches x*x*x for x > 0 (in shift range)", () => {
    for (const x of [0.5, 1, 1.5, 2]) {
      expect(close(evaluate(CALC_OPS.cube.tree, { env: { x } }), x * x * x, 1e-6)).toBe(true);
    }
  });

  it("sqrt matches Math.sqrt for x > 0 (in shift range)", () => {
    for (const x of xsInShift) {
      expect(close(evaluate(CALC_OPS.sqrt.tree, { env: { x } }), Math.sqrt(x), 1e-6)).toBe(true);
    }
  });
});

describe("calculator: negate via shift trick", () => {
  it("neg matches -x for reals inside the shift range (|x| < e^e)", () => {
    for (const x of [-14, -10, -1, 0, 1, 10, 14]) {
      expect(close(evaluate(CALC_OPS.neg.tree, { env: { x } }), -x, 1e-6)).toBe(true);
    }
  });
});

describe("calculator: binary ops", () => {
  it("add matches x + y inside the shift range", () => {
    const cases: [number, number][] = [
      [1, 2],
      [3.5, -1.5],
      [-7, -3],
      [10, 4],
      [0.1, 0.2],
    ];
    for (const [x, y] of cases) {
      expect(close(evaluate(CALC_OPS.add.tree, { env: { x, y } }), x + y, 1e-6)).toBe(true);
    }
  });

  it("sub matches x - y for x > 0", () => {
    const cases: [number, number][] = [
      [5, 3],
      [10, 12],
      [1, -4],
      [100, 99.5],
    ];
    for (const [x, y] of cases) {
      expect(close(evaluate(CALC_OPS.sub.tree, { env: { x, y } }), x - y)).toBe(true);
    }
  });

  it("mul matches x * y for x > 0, y > 0 in range", () => {
    const cases: [number, number][] = [
      [2, 3],
      [1.5, 4],
      [10, 0.1],
      [7, 1.5],
    ];
    for (const [x, y] of cases) {
      expect(close(evaluate(CALC_OPS.mul.tree, { env: { x, y } }), x * y, 1e-6)).toBe(true);
    }
  });

  it("div matches x / y for x > 0, y > 0 in range", () => {
    const cases: [number, number][] = [
      [10, 2],
      [1, 3],
      [4, 7],
      [9, 4],
    ];
    for (const [x, y] of cases) {
      expect(close(evaluate(CALC_OPS.div.tree, { env: { x, y } }), x / y, 1e-6)).toBe(true);
    }
  });
});

describe("calculator: tree structural integrity", () => {
  it("every op tree references only eml, const(1), and the documented variables", () => {
    type Node = { kind: string; value?: number; name?: string; left?: Node; right?: Node };
    function check(n: Node, allowed: Set<string>): void {
      if (n.kind === "const") {
        expect(n.value).toBe(1);
        return;
      }
      if (n.kind === "var") {
        expect(allowed.has(n.name as string)).toBe(true);
        return;
      }
      check(n.left as Node, allowed);
      check(n.right as Node, allowed);
    }
    for (const op of Object.values(CALC_OPS)) {
      const allowed = new Set<string>(
        op.arity === 0 ? [] : op.arity === 1 ? ["x"] : ["x", "y"]
      );
      check(op.tree as unknown as Node, allowed);
    }
  });
});
