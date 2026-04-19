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

export const articles: Article[] = [];
