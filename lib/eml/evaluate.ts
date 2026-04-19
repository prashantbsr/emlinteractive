import type { EMLNode, EvalContext } from "./types";

export class EMLEvalError extends Error {
  constructor(message: string, public readonly node?: EMLNode) {
    super(message);
    this.name = "EMLEvalError";
  }
}

export function evaluate(node: EMLNode, ctx: EvalContext = {}): number {
  switch (node.kind) {
    case "const":
      return node.value;
    case "var": {
      const value = ctx.env?.[node.name];
      if (value === undefined) {
        throw new EMLEvalError(`Unbound variable '${node.name}'`, node);
      }
      return value;
    }
    case "eml": {
      const a = evaluate(node.left, ctx);
      const b = evaluate(node.right, ctx);
      return Math.exp(a) - Math.log(b);
    }
  }
}
