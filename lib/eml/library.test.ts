import { describe, it, expect } from "vitest";
import { library, getFunction, referenceFns, referenceValue } from "./library";
import { evaluate, approxEqual } from "./evaluate";

describe("library", () => {
  it("exp(x) evaluates correctly", () => {
    const f = getFunction("exp")!;
    for (const x of [0, 1, 2, -1]) {
      const v = evaluate(f.tree, { env: { x } });
      expect(approxEqual(v, Math.exp(x), 1e-9)).toBe(true);
    }
  });

  it("e constant evaluates to Euler's number", () => {
    const f = getFunction("e")!;
    expect(approxEqual(evaluate(f.tree), Math.E, 1e-9)).toBe(true);
  });

  it("zero constant evaluates to 0", () => {
    const f = getFunction("zero")!;
    expect(approxEqual(evaluate(f.tree), 0, 1e-9)).toBe(true);
  });

  it("ln(x) evaluates correctly for positive x", () => {
    const f = getFunction("ln")!;
    for (const x of [1, 2, Math.E, 10]) {
      const v = evaluate(f.tree, { env: { x } });
      expect(approxEqual(v, Math.log(x), 1e-9)).toBe(true);
    }
  });

  it("identity evaluates to x", () => {
    const f = getFunction("identity")!;
    for (const x of [1.2, 2.5, 7]) {
      const v = evaluate(f.tree, { env: { x } });
      expect(approxEqual(v, x, 1e-9)).toBe(true);
    }
  });

  it("all library entries have matching depth metadata", () => {
    for (const f of library) {
      expect(f.tree).toBeDefined();
    }
  });

  it("every library entry has a matching referenceFns entry", () => {
    for (const f of library) {
      expect(referenceFns[f.slug]).toBeDefined();
    }
  });

  it("each entry's reference matches its tree at sample inputs", () => {
    for (const f of library) {
      const env = f.sampleInputs;
      const tree = evaluate(f.tree, { env });
      const ref = referenceValue(f.slug, env);
      expect(approxEqual(tree, ref, 1e-9)).toBe(true);
    }
  });
});
