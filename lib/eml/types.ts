export type EMLNode =
  | { kind: "const"; value: number }
  | { kind: "var"; name: string }
  | { kind: "eml"; left: EMLNode; right: EMLNode };

export interface EvalContext {
  env?: Record<string, number>;
}
