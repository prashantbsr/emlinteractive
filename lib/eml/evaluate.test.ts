import { describe, it, expect } from "vitest";
import { evaluate, approxEqual, EMLEvalError } from "./evaluate";
import { eml, one, variable } from "./types";

describe("evaluate", () => {
  it("returns constant", () => {
    expect(evaluate(one())).toBe(1);
  });

  it("eml(1,1) = e", () => {
    const v = evaluate(eml(one(), one()));
    expect(approxEqual(v, Math.E)).toBe(true);
  });

  it("eml(0,1) = exp(0) - ln(1) = 1", () => {
    const tree = eml({ kind: "const", value: 0 }, one());
    expect(evaluate(tree)).toBe(1);
  });

  it("eml(x, 1) = exp(x)", () => {
    const tree = eml(variable("x"), one());
    const v = evaluate(tree, { env: { x: 2 } });
    expect(approxEqual(v, Math.exp(2))).toBe(true);
  });

  it("throws on unbound variable", () => {
    expect(() => evaluate(variable("z"))).toThrow(EMLEvalError);
  });

  it("ln(z) via tree: eml(1, eml(eml(1, z), 1))", () => {
    const z = 5;
    const tree = eml(
      one(),
      eml(eml(one(), variable("z")), one())
    );
    const v = evaluate(tree, { env: { z } });
    expect(approxEqual(v, Math.log(z))).toBe(true);
  });

  it("identity: ln(exp(x)) = x", () => {
    const tree = eml(
      one(),
      eml(eml(one(), eml(variable("x"), one())), one())
    );
    for (const x of [1.3, 2.7, 10]) {
      expect(approxEqual(evaluate(tree, { env: { x } }), x, 1e-9)).toBe(true);
    }
  });

  it("zero constant: eml(1, eml(eml(1,1), 1)) = 0", () => {
    const tree = eml(one(), eml(eml(one(), one()), one()));
    expect(approxEqual(evaluate(tree), 0, 1e-9)).toBe(true);
  });
});
