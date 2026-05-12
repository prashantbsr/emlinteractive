import type { EMLNode } from "./types";

export function serialize(node: EMLNode): string {
  switch (node.kind) {
    case "const":
      return String(node.value);
    case "var":
      return node.name;
    case "eml":
      return `eml(${serialize(node.left)}, ${serialize(node.right)})`;
  }
}
