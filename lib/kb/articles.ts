export type ArticleCategory = "paper" | "glossary" | "faq" | "math" | "about";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  tags: string[];
  searchText: string;
}

export const categoryLabel: Record<ArticleCategory, string> = {
  paper: "Paper",
  glossary: "Glossary",
  faq: "FAQ",
  math: "Math Background",
  about: "About",
};

export const articles: Article[] = [
  {
    slug: "intro",
    title: "Start here: what is EML?",
    category: "paper",
    summary:
      "A one-page orientation: the paper's claim, why it matters, and what you can do with this app.",
    tags: ["overview", "intro"],
    searchText:
      "EML operator exp ln single binary operator elementary functions NAND gate Sheffer stroke",
  },
  {
    slug: "paper-overview",
    title: "Paper overview, section by section",
    category: "paper",
    summary:
      "Walkthrough of the paper's structure: reduction, master formula, compiler, circuits, open questions.",
    tags: ["paper", "odrzywolek"],
    searchText:
      "paper sections abstract reduction master formula compiler analog circuit open questions",
  },
  {
    slug: "reduction-journey",
    title: "The reduction: 36 → 2",
    category: "paper",
    summary:
      "How the paper collapses a scientific calculator (36 primitives) down to EML + the constant 1.",
    tags: ["reduction", "calc3", "calc2", "calc1", "calc0"],
    searchText:
      "reduction Calc 3 Calc 2 Calc 1 Calc 0 primitives scientific calculator 36 6 4 3 2",
  },
  {
    slug: "depth-table",
    title: "Complexity depths of elementary functions",
    category: "paper",
    summary:
      "The tree depths from Table 4: exp (1) is shallowest, multiplication (8) is deepest of the basics.",
    tags: ["depth", "complexity", "table"],
    searchText: "depth table complexity exp 1 ln 3 multiplication 8 division 7",
  },
];
