import { describe, it, expect } from "vitest";
import { parse, EMLParseError } from "./parser";
import { serialize } from "./serialize";
import { evaluate, approxEqual } from "./evaluate";

describe("parser", () => {
  it("parses a number", () => {
    expect(parse("1")).toEqual({ kind: "const", value: 1 });
  });

  it("parses an identifier as variable", () => {
    expect(parse("x")).toEqual({ kind: "var", name: "x" });
  });

  it("parses eml(1, 1)", () => {
    const tree = parse("eml(1, 1)");
    expect(evaluate(tree)).toBeCloseTo(Math.E);
  });

  it("parses nested eml", () => {
    const tree = parse("eml(1, eml(eml(1, 1), 1))");
    expect(approxEqual(evaluate(tree), 0, 1e-9)).toBe(true);
  });

  it("round-trip via serialize", () => {
    const source = "eml(1, eml(eml(1, x), 1))";
    const tree = parse(source);
    expect(serialize(tree).replace(/\s+/g, "")).toBe(source.replace(/\s+/g, ""));
  });

  it("throws on garbage input", () => {
    expect(() => parse("eml(1,")).toThrow(EMLParseError);
    expect(() => parse("@#$")).toThrow(EMLParseError);
  });
});
