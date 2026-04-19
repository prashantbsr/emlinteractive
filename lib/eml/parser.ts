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
        // Stop on + / - if not part of exponent
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
  let pos = 0;

  function peek(): Token | undefined {
    return tokens[pos];
  }
  function consume(): Token {
    const t = tokens[pos++];
    if (!t) throw new EMLParseError("Unexpected end of input", input.length);
    return t;
  }
  function expect(type: Token["type"]): Token {
    const t = consume();
    if (t.type !== type) {
      throw new EMLParseError(`Expected ${type} but got ${t.type}`, t.pos);
    }
    return t;
  }

  function parseExpr(): EMLNode {
    const t = peek();
    if (!t) throw new EMLParseError("Unexpected end of input", input.length);

    if (t.type === "number") {
      consume();
      return { kind: "const", value: t.value };
    }
    if (t.type === "minus") {
      consume();
      const next = consume();
      if (next.type !== "number") {
        throw new EMLParseError("Expected number after '-'", next.pos);
      }
      return { kind: "const", value: -next.value };
    }
    if (t.type === "ident") {
      consume();
      if (t.value === "eml") {
        expect("lparen");
        const left = parseExpr();
        expect("comma");
        const right = parseExpr();
        expect("rparen");
        return { kind: "eml", left, right };
      }
      // treat other identifiers as variables (e.g. x, y)
      return { kind: "var", name: t.value };
    }
    throw new EMLParseError(`Unexpected token '${t.type}'`, t.pos);
  }

  const result = parseExpr();
  if (pos < tokens.length) {
    const extra = tokens[pos];
    throw new EMLParseError(`Unexpected token '${extra.type}'`, extra.pos);
  }
  return result;
}
