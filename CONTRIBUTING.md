# Contributing to EMLinteractive

Thanks for your interest in contributing! EMLinteractive is a learning playground for the EML operator from [Odrzywołek's paper](https://arxiv.org/html/2603.21852v2). PRs and issues are very welcome.

## Where help is most useful

- **Shorter EML decompositions.** If you have a verified EML tree for a function in `lib/eml/library.ts` that's smaller than what's there (lower depth or fewer leaves), open a PR with the tree and a one-line note on how it was derived.
- **Knowledge base articles.** New MDX articles in `content/knowledge-base/` are easy to land. Keep them tight and cite the paper section where relevant.
- **Visualizations.** Better tree-rendering, trace step-through, or interactive demos in `components/eml/`.
- **Bug reports.** If a calculator answer disagrees with a real scientific calculator (within reasonable floating-point bounds), file an issue with the input and the EML tree it produced.

## Development setup

```bash
git clone https://github.com/prashantbsr/emlinteractive.git
cd emlinteractive
nvm use            # Node 20 (see .nvmrc)
npm install
npm run dev        # http://localhost:3000
```

Required tools: Node 20+, npm.

## Project structure

The high-level shape and domain concepts are documented in [README.md](README.md). Briefly:

- `lib/eml/` — pure TypeScript engine (parser, evaluator, library, traces). No React deps.
- `app/` — Next.js App Router routes. MDX-powered knowledge base lives in `content/knowledge-base/`.
- `components/` — UI: shadcn/ui primitives plus EML-specific components (calculator pad, tree view, math).

## Before you open a PR

Run all four of these — CI runs the same checks:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint via next lint
npm test            # Vitest, single run
npm run build       # Next.js production build
```

For changes touching `lib/eml/library.ts` or any verified decomposition: please add or update tests in `lib/eml/library.test.ts` so the tree is verified against the JS `Math` reference for several sample inputs.

## Adding a verified EML decomposition

A "verified" decomposition means: there is a concrete `EMLNode` tree in `lib/eml/library.ts` and a test in `lib/eml/library.test.ts` that confirms the tree evaluates to the same value as the JavaScript `Math` reference (within `1e-9`) on a handful of sample inputs.

When adding one:

1. Add the tree, a `referenceFn`, and a `referenceCodeLength` (K = 2·leaves − 1) to `lib/eml/library.ts`.
2. Add an entry to the `library` array with `slug`, `displayName`, `formula`, `latex`, `derivation` notes, etc.
3. Add a test in `lib/eml/library.test.ts`.
4. (Optional) Add a short MDX article in `content/knowledge-base/` walking through the derivation.

## Style

- TypeScript strict mode, no `any` unless genuinely necessary.
- Two-space indentation, double quotes, semicolons (matches existing style and `.editorconfig`).
- Keep `lib/eml/` free of React imports — it's the pure-domain layer.
- Tailwind for styling. Prefer existing shadcn/ui primitives over rolling your own.

## Code of conduct

By participating, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions

Open a [Discussion](https://github.com/prashantbsr/emlinteractive/discussions) or an issue with the `question` label.
