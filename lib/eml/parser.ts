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

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "lparen", pos: i });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen", pos: i });
      i++;
      continue;
    }
    if (ch === ",") {
      tokens.push({ type: "comma", pos: i });
      i++;
      continue;
    }
    if (ch === "-" || ch === "\u2212") {
      tokens.push({ type: "minus", pos: i });
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < input.length && /[0-9.eE+-]/.test(input[j])) {
        if ((input[j] === "+" || input[j] === "-") && j > i && !/[eE]/.test(input[j - 1])) {
          break;
        }
        j++;
      }
      const slice = input.slice(i, j);
      const num = Number(slice);
      if (Number.isNaN(num)) {
        throw new EMLParseError(`Invalid number '${slice}'`, i);
      }
      tokens.push({ type: "number", value: num, pos: i });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < input.length && /[A-Za-z0-9_]/.test(input[j])) j++;
      tokens.push({ type: "ident", value: input.slice(i, j), pos: i });
      i = j;
      continue;
    }
    throw new EMLParseError(`Unexpected character '${ch}'`, i);
  }
  return tokens;
}

export function parse(input: string): EMLNode {
  const tokens = tokenize(input);
  if (tokens.length === 0) throw new EMLParseError("Empty input", 0);
  throw new EMLParseError("parser incomplete", 0);
}
