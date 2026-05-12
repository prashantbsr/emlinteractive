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
  {
    slug: "sheffer-stroke",
    title: "Sheffer stroke",
    category: "glossary",
    summary:
      "A single operator that is enough to express all operations in a system. NAND for Boolean. EML for continuous.",
    tags: ["sheffer", "nand", "primitive"],
    searchText:
      "Sheffer stroke NAND single operator functional completeness universal",
  },
  {
    slug: "elementary-function",
    title: "Elementary function",
    category: "glossary",
    summary:
      "The class of functions built from rational operations, exponentials, logarithms, and trigonometric functions.",
    tags: ["elementary", "function"],
    searchText:
      "elementary function exp log trig polynomial rational closed form",
  },
  {
    slug: "binary-tree",
    title: "Binary tree (in EML)",
    category: "glossary",
    summary: "Every EML expression is a binary tree whose leaves are 1 and whose internal nodes are eml.",
    tags: ["tree", "grammar"],
    searchText: "binary tree grammar leaves internal nodes depth size",
  },
  {
    slug: "transcendental",
    title: "Transcendental constant",
    category: "glossary",
    summary:
      "A number that is not the root of any non-zero polynomial with integer coefficients. π and e are transcendental.",
    tags: ["transcendental", "pi", "e"],
    searchText:
      "transcendental pi e constant irrational algebraic polynomial root",
  },
  {
    slug: "symbolic-regression",
    title: "Symbolic regression",
    category: "glossary",
    summary:
      "Finding a closed-form formula that fits data. The paper uses EML as the search space.",
    tags: ["regression", "ml"],
    searchText:
      "symbolic regression formula discovery data fitting machine learning",
  },
  {
    slug: "faq-why-matters",
    title: "Why does this matter for CS students?",
    category: "faq",
    summary:
      "Four reasons to care: universality, compilers, symbolic regression, and the analogy with Boolean logic.",
    tags: ["motivation", "cs"],
    searchText: "why matter CS students application motivation use case",
  },
  {
    slug: "faq-practical",
    title: "Is EML practical to use?",
    category: "faq",
    summary:
      "Short answer: not as a replacement calculator, but as a theoretical object and a compiler target, yes.",
    tags: ["practical", "compiler"],
    searchText: "practical use compiler target theoretical calculator replacement",
  },
  {
    slug: "math-exp-ln",
    title: "exp and ln: the two halves of eml",
    category: "math",
    summary:
      "Refresher on exp and ln, their key identities power every derivation in this paper.",
    tags: ["exp", "ln", "background"],
    searchText: "exp ln exponential logarithm identity natural base e",
  },
  {
    slug: "math-eulers-formula",
    title: "Euler's formula and why EML needs complex arithmetic",
    category: "math",
    summary:
      "To reach sin, cos, and π, EML temporarily goes through complex numbers via e^(ix) = cos x + i sin x.",
    tags: ["euler", "complex", "trig"],
    searchText: "Euler formula complex numbers trigonometric sine cosine imaginary unit",
  },
  {
    slug: "about",
    title: "About EMLinteractive",
    category: "about",
    summary:
      "Who this app is for, what v1 covers, and what's coming next.",
    tags: ["about", "roadmap"],
    searchText: "about project roadmap v1 v2 credits",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function groupByCategory(): Record<ArticleCategory, Article[]> {
  const out: Record<ArticleCategory, Article[]> = {
    paper: [],
    glossary: [],
    faq: [],
    math: [],
    about: [],
  };
  for (const a of articles) out[a.category].push(a);
  return out;
}
