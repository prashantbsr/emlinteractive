import type { EMLNode } from "./types";

export class EMLParseError extends Error {
  constructor(message: string, public readonly position: number) {
    super(`${message} (at position ${position})`);
    this.name = "EMLParseError";
  }
}

type Token =
  | { type: "ident"; value: string; pos: number }
  | { type: "number"; value: number; pos: number }
  | { type: "lparen"; pos: number }
  | { type: "rparen"; pos: number }
  | { type: "comma"; pos: number }
  | { type: "minus"; pos: number };

export function parse(_input: string): EMLNode {
  throw new EMLParseError("parse() not yet implemented", 0);
}
