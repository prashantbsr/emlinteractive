import type { EMLNode } from "./types";

export function serialize(node: EMLNode): string {
  switch (node.kind) {
    case "const":
      return Number.isInteger(node.value) ? String(node.value) : String(node.value);
    case "var":
      return node.name;
    case "eml":
      return `eml(${serialize(node.left)}, ${serialize(node.right)})`;
  }
}
