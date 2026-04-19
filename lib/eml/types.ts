export type EMLNode =
  | { kind: "const"; value: number }
  | { kind: "var"; name: string }
  | { kind: "eml"; left: EMLNode; right: EMLNode };

export interface EvalContext {
  env?: Record<string, number>;
}

export const one = (): EMLNode => ({ kind: "const", value: 1 });
export const variable = (name: string): EMLNode => ({ kind: "var", name });
export const eml = (left: EMLNode, right: EMLNode): EMLNode => ({
  kind: "eml",
  left,
  right,
});
