# EMLinteractive

[![CI](https://github.com/prashantbsr/emlinteractive/actions/workflows/ci.yml/badge.svg)](https://github.com/prashantbsr/emlinteractive/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node ≥ 20](https://img.shields.io/badge/node-%E2%89%A520-339933.svg)](.nvmrc)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org)

An interactive learning playground for the **EML operator**: a single binary primitive that, paired with the constant `1`, can generate every elementary mathematical function. Based on [Odrzywołek's 2026 paper, *All Elementary Functions from a Single Operator*](https://arxiv.org/html/2603.21852v2).

**Live demo:** [prashantbsr.github.io/emlinteractive](https://prashantbsr.github.io/emlinteractive)

---

## Why this exists

i was just curious when i came across this paper — after all, it's something like NAND for mathematics. out of curiosity i researched more about it and ended up few-shotting a basic webapp describing a few ideas explored by an LLM, plus a playground.

i had this intuition that maybe a new ISA and chip design could be developed using this. but it also has problems of its own. i also got to know about the potential of this paper in tracing during LLM development for some things, but it's also like walking through quicksand. maybe in the near future some missing piece will be added to this paper, and whole new possibilities and innovation will arise. but it's all a big maybe — because here we are not talking about some patch in a software. we are talking about the very foundations of the most complex tech pieces ever built. even if we get to build something efficient, it will be a long long time till it gets accepted somewhere.

```
eml(x, y) = exp(x) − ln(y)
```

That, plus `1`, is the entire alphabet. Trees of `eml` calls reproduce exp, ln, e, identity, +, −, ×, ÷, and the rest of a scientific calculator. Same flavor of result as **NAND completeness** for Boolean logic, lifted to continuous mathematics.

## What's in the app

- **/** Long-form notes: intuition, the NAND analogy, worked decompositions, use cases, the chip-design discussion (see below), open problems.
- **/playground** Two interactive panels:
  1. **Calculator**: a working scientific calculator whose every operation is a pure EML tree (you can inspect the tree behind any answer).
  2. **REPL**: write raw EML expressions, watch the tree assemble and evaluate live.
- **/gallery** Catalog of verified EML decompositions for the core functions (`exp`, `e`, `0`, `ln`, identity, …) with derivations and tree diagrams.
- **/kb** Knowledge base: MDX articles explaining the paper, EML semantics, depth metrics, and so on.

## Could we just build a chip on it?

This is the question this project keeps coming back to. The short version:

1. **Is an EML-only calculator more efficient than a conventional one?** Almost certainly not. NAND wins on hardware because NAND itself is cheap (~4 transistors) *and* expansion is bounded. EML loses on both counts: one EML node = `exp + ln + sub` ≈ 30–60 cycles, and a multiply is depth 8, giving ~100× slowdown and orders of magnitude more area than a conventional MUL. Plus stacked transcendentals destroy numerical precision.

2. **Does redesigning the whole chip + ISA rescue it?** Still no. What you'd be building is a flavor of **One Instruction Set Computer** (OISC). SUBLEQ, TTA, LNS chips have all been built and are 10×–1000× slower than conventional CPUs on real workloads. The bottleneck isn't ISA/HW impedance mismatch; it's the *physics of the primitive*. `exp` and `ln` to 53-bit precision are mathematically more work than `add`. No silicon arrangement gets you under `(exp + ln + sub) > add`. Co-design gains (simpler decode, no structural hazards) are ~10–20%; you can't close a 100× hole with 20% gains.

3. **Clean-slate lesson.** Every clean-slate architecture in the last 30 years (Itanium, Transmeta, the Mill, RISC-V, Apple Silicon, Tenstorrent) still uses ADD/SUB/MUL/FMA as primitives. The clean-slate *winners* (TPU, GPU) added **more specialization**, not less. Modern efficiency is in the opposite direction of EML.

4. **Where EML-native hardware could actually win.** Two niches: (a) **analog / log-domain circuits** where the transistor I-V curve is literally exponential and `exp`/`ln` are free at the device boundary (translinear circuits, Gilbert cells); (b) **workloads dominated by transcendentals already** (Bayesian inference, attention, log-sum-exp variants).

The honest framing: *completeness is about what's expressible; efficiency is about expansion factor × primitive cost*. EML wins the first decisively, loses the second decisively. Beautiful theory; not a chip.

The full discussion is on the home page (`/`) under "Could we build a chip on it?".

## Project shape

```
app/                  Next.js App Router routes
  page.tsx              Landing essay (incl. ISA discussion)
  playground/           Calculator + REPL
  gallery/              Function catalog
  kb/                   MDX knowledge base
lib/eml/              Core EML engine (no React deps)
  types.ts              EMLNode discriminated union
  parser.ts             Tokenizer + recursive-descent parser
  evaluate.ts           Tree evaluator
  serialize.ts          Tree → string
  depth.ts              Depth / size / leaf metrics
  trace.ts              Step-through evaluation traces
  library.ts            Verified function decompositions
  calculator.ts         Pure-EML trees for calculator ops
components/           UI (shadcn/ui + custom)
content/              MDX content for /kb
```

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest (single run)
npm run test:watch   # Vitest watch mode
```

Tests live alongside source in `lib/**/*.test.ts` and run in Node (not jsdom).

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript, ESLint, Vitest
- Tailwind CSS 3 + shadcn/ui (new-york style, dark default)
- KaTeX for math, ReactFlow for trees, Framer Motion, Zustand
- MDX via `@next/mdx`

## Status

v0.2. Core engine + REPL + gallery are stable. Calculator ships purely-EML trees for `+`, `−`, `×`, `÷`, `−x`, `1/x`, `x²`, `√x`, `exp`, `ln`, `e`, `0`. Verified decompositions in `lib/eml/library.ts` cover `exp`, `e`, `0`, `ln`, `identity`. The deeper Table-4 functions (multiply at depth 8, divide at depth 7, etc.) are constructed compositionally in the calculator using a shift-trick (correct but not minimal-depth); minimal-depth verified trees are a v2 target.

## Contributing

PRs welcome — especially shorter EML decompositions, better visualisations, and knowledge-base articles. See [CONTRIBUTING.md](CONTRIBUTING.md) for the development setup and pre-PR checks, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the community standards we follow. To report a security issue privately, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE).

## Reference

- Odrzywołek, A. (2026). *All Elementary Functions from a Single Operator.* arXiv:2603.21852v2.
