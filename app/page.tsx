import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Toc, type TocEntry } from "@/components/landing/toc";

const toc: TocEntry[] = [
  { id: "overview", label: "Overview", level: 2 },
  { id: "intuition", label: "Plain-English intuition", level: 2 },
  { id: "nand-analogy", label: "The NAND analogy", level: 2 },
  { id: "worked-examples", label: "Worked examples", level: 2 },
  { id: "use-cases", label: "Use cases", level: 2 },
  { id: "isa-question", label: "Could we build a chip on it?", level: 2 },
  { id: "potential", label: "Potential & open problems", level: 2 },
];

const PAPER_URL = "https://arxiv.org/html/2603.21852v2";

export default function HomePage() {
  return (
    <div className="container grid gap-10 py-10 md:py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
      {/* Sticky TOC sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-6">
          <div>
            <div className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              // paper
            </div>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-border bg-card p-3 font-mono text-xs leading-5 transition-colors hover:border-primary/50"
            >
              <div className="text-muted-foreground/70">arXiv:2603.21852v2</div>
              <div className="mt-1 text-foreground">
                All Elementary Functions from a Single Operator
              </div>
              <div className="mt-1 text-muted-foreground">
                A. Odrzywołek, 2026
              </div>
              <div className="mt-2 flex items-center gap-1 text-primary group-hover:underline">
                read paper
                <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          </div>
          <Toc entries={toc} />
          <div className="border border-border bg-card p-3 font-mono text-xs">
            <div className="text-muted-foreground/70">// try it</div>
            <Link
              href="/playground"
              className="mt-2 flex items-center justify-between text-primary hover:underline"
            >
              open playground
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Article */}
      <article className="prose-nerd max-w-3xl">
        {/* Masthead */}
        <header className="not-prose mb-10 space-y-4 border-b border-border pb-8">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
            // emlinteractive // 2026 // v0.2
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-primary">&gt;</span> one operator. every
            elementary function.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            A single binary primitive —{" "}
            <code className="rounded-sm bg-muted px-1.5 py-0.5 text-foreground">
              eml(x, y) = exp(x) − ln(y)
            </code>{" "}
            — paired with the constant{" "}
            <code className="rounded-sm bg-muted px-1.5 py-0.5 text-foreground">
              1
            </code>{" "}
            is enough to rebuild the entire toolbox of a scientific calculator.
            Notes, decompositions, and implications, written for people who
            find this kind of thing fun.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-muted-foreground">
            <span>~3500 words</span>
            <span>·</span>
            <span>~12 min read</span>
            <span>·</span>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-dotted underline-offset-4"
            >
              arXiv:2603.21852v2 ↗
            </a>
          </div>
        </header>

        {/* 1. Overview */}
        <h2 id="overview">Overview</h2>
        <p>
          Boolean logic has a single-primitive result: every possible truth
          function can be synthesized from{" "}
          <a href="https://en.wikipedia.org/wiki/Sheffer_stroke">NAND</a>{" "}
          alone. NAND is the <em>Sheffer stroke</em> for classical logic. What
          continuous mathematics had been missing was an analogous primitive —
          a single operator from which{" "}
          <em>all of the usual elementary functions</em> could be composed.
        </p>
        <p>
          Odrzywołek's 2026 paper nominates one. The operator
        </p>
        <pre>
          <code>{`eml : R × R₊ → R
eml(x, y) = exp(x) − ln(y)`}</code>
        </pre>
        <p>
          together with the single literal <code>1</code>, is proven to
          generate every elementary function. That's it. No +, no ×, no
          trigonometric identities in the axioms — only <code>eml</code> and{" "}
          <code>1</code>, nested into binary trees.
        </p>
        <p>
          A scientific calculator ships with around thirty-six labeled
          operations (exp, ln, sin, cos, +, −, ×, ÷, π, e, √, x², x^y, …).
          The paper reduces that alphabet, one item at a time, to{" "}
          <strong>two</strong> primitives. Five stages, each smaller than the
          last:
        </p>
        <pre>
          <code>{`Calc 3 → 6 primitives
Calc 2 → 4 primitives
Calc 1 → 3 primitives
Calc 0 → 3 primitives
EML    → 2 primitives   ← eml, 1`}</code>
        </pre>
        <p>
          The rest of this page unpacks what that actually <em>means</em>, why
          it is not merely a curiosity, and what doors it opens.
        </p>

        {/* 2. Intuition */}
        <h2 id="intuition">Plain-English intuition</h2>
        <p>
          Think of <code>eml</code> as a small machine with two inlets and one
          outlet. Pour a number into the left inlet, another into the right,
          and the machine spits out{" "}
          <code>exp(left) − ln(right)</code>. The two inlets are not
          interchangeable — <code>exp</code> is applied to the first,{" "}
          <code>ln</code> to the second. The machine is{" "}
          <strong>non-commutative</strong>, which matters: every tree you can
          build has a definite shape.
        </p>
        <p>
          Now restrict yourself further: the only raw ingredient you're
          allowed to drop into the inlets is the number <code>1</code>, or
          the output of <em>another</em> <code>eml</code> machine. You may
          plumb machines into each other without limit. That is the entire
          grammar:
        </p>
        <pre>
          <code>{`S → 1 | eml(S, S)`}</code>
        </pre>
        <p>
          Surprisingly, this skeletal grammar is expressive enough to
          reconstruct every function on your calculator. <em>Euler's number{" "}
          </em> <code>e</code> is not a separate primitive — it is the
          one-node expression{" "}
          <code>eml(1, 1) = exp(1) − ln(1) = e</code>. The function{" "}
          <code>exp(x)</code> becomes <code>eml(x, 1)</code>, because{" "}
          <code>ln(1) = 0</code> cancels the second term. From there you
          stack trees to recover everything else.
        </p>
        <blockquote>
          The operator is tiny. The expressive power sits in how trees
          <em> compose</em>, not in the number of symbols in the alphabet.
        </blockquote>

        {/* 3. NAND analogy */}
        <h2 id="nand-analogy">The NAND analogy</h2>
        <p>
          Every CS student meets NAND at some point. It's the two-input
          Boolean gate with the following truth table:
        </p>
        <pre>
          <code>{`A  B | NAND(A, B)
0  0 |     1
0  1 |     1
1  0 |     1
1  1 |     0`}</code>
        </pre>
        <p>
          NAND is functionally complete: given enough NAND gates wired
          correctly, you can realize AND, OR, NOT, XOR, a half-adder, a CPU.
          The reason this matters is less about elegance and more about{" "}
          <em>engineering leverage</em>. You only have to design, fabricate,
          and reason about one gate. Testing is simpler. Lithography masks
          are simpler. Formal verification is simpler.
        </p>
        <p>
          EML is the continuous-mathematics counterpart. Where NAND reduces
          all Boolean circuits to a single two-input gate,{" "}
          <code>eml</code> reduces all elementary functions to a single
          two-input operator. The analogy is precise enough to carry real
          intuition:
        </p>
        <ul>
          <li>
            NAND's truth table ↔ <code>eml</code>'s defining formula{" "}
            <code>exp(x) − ln(y)</code>.
          </li>
          <li>
            Boolean circuit = tree of NAND gates ↔ elementary function = tree
            of <code>eml</code> nodes.
          </li>
          <li>
            Gate count / circuit depth ↔ tree size / tree depth (complexity
            metrics).
          </li>
          <li>
            NAND's fabrication leverage ↔ EML's hardware potential on{" "}
            <code>exp</code>/<code>ln</code>-native substrates.
          </li>
        </ul>
        <p>
          The analogy is imperfect in one important way. NAND lives over a
          finite domain (two bits), so completeness is a{" "}
          <em>constructive</em> fact you can verify by enumeration. EML lives
          over the reals, and "every elementary function" is a much larger
          claim than "every Boolean function." The paper discharges it
          symbolically.
        </p>

        {/* 4. Worked examples */}
        <h2 id="worked-examples">Worked examples</h2>
        <p>
          The fastest way to get the feel of EML is to read a handful of
          trees. Here are five verified decompositions, from trivial to not.
          Each <code>eml(a, b)</code> below is literally{" "}
          <code>exp(a) − ln(b)</code>.
        </p>

        <h3 id="ex-e">e — depth 1</h3>
        <pre>
          <code>{`e  =  eml(1, 1)
    =  exp(1) − ln(1)
    =  e − 0
    =  e`}</code>
        </pre>
        <p>
          Euler's number costs <em>one</em> <code>eml</code> node. It is
          never an axiom here; it falls out of the operator for free.
        </p>

        <h3 id="ex-exp">exp(x) — depth 1</h3>
        <pre>
          <code>{`exp(x)  =  eml(x, 1)
        =  exp(x) − ln(1)
        =  exp(x) − 0`}</code>
        </pre>
        <p>
          The exponential function is one node deep. <code>ln(1) = 0</code>{" "}
          silences the right branch.
        </p>

        <h3 id="ex-zero">0 — depth 3</h3>
        <pre>
          <code>{`0  =  eml(1, eml(eml(1, 1), 1))
   =  exp(1) − ln(exp(e) − 0)
   =  e − e
   =  0`}</code>
        </pre>
        <p>
          The constant zero is not free. It takes three levels of nesting,
          because we have to <em>build</em> the cancellation using only{" "}
          <code>1</code> as a literal.
        </p>

        <h3 id="ex-ln">ln(x) — depth 3</h3>
        <pre>
          <code>{`ln(x)  =  eml(1, eml(eml(1, x), 1))`}</code>
        </pre>
        <p>
          The natural log — the operator's own inverse component — lives
          three levels deep. This is the depth-3 form from the paper's main
          table.
        </p>

        <h3 id="ex-identity">identity: f(x) = x — depth 4</h3>
        <pre>
          <code>{`x  =  eml(1, eml(eml(1, eml(x, 1)), 1))
   =  ln(exp(x))`}</code>
        </pre>
        <p>
          Even the identity function costs four nested{" "}
          <code>eml</code> calls — a reminder that the EML tree depth of a
          function has very little to do with how "simple" it looks in
          school-book notation.
        </p>

        <p>
          From the paper's Table 4, here are depths for a few of the usual
          suspects:
        </p>
        <pre>
          <code>{`exp       : depth 1
e         : depth 1
negate    : depth 2
reciprocal: depth 2
ln        : depth 3
subtract  : depth 4
add       : depth 5
divide    : depth 7
multiply  : depth 8`}</code>
        </pre>
        <p>
          Multiplication being deeper than division is the kind of fact that
          rewires your sense of what "elementary" means. In EML, operator
          depth is the honest measure — not familiarity.
        </p>
        <p>
          You can play with any of these (and build your own) in the{" "}
          <Link href="/playground">playground</Link>.
        </p>

        {/* 5. Use cases */}
        <h2 id="use-cases">Use cases</h2>
        <p>
          "Reducing math to one operator" reads like a parlor trick until you
          consider what a single primitive actually does for downstream
          engineering. A short tour of where this matters:
        </p>

        <h3 id="uc-symbolic-regression">Symbolic regression</h3>
        <p>
          Symbolic regression systems search over expression trees to fit
          data. The search space is usually indexed by the grammar of
          allowed operators — typically +, −, ×, ÷, <code>exp</code>,{" "}
          <code>ln</code>, <code>sin</code>, and so on. A space with{" "}
          <em>one</em> operator is dramatically smaller, more uniform, and
          easier to enumerate. Depth becomes a single honest complexity
          penalty.
        </p>

        <h3 id="uc-hardware">Analog / log-domain hardware</h3>
        <p>
          Analog computing substrates that implement{" "}
          <code>exp</code> and <code>log</code> natively (log-domain
          filters, translinear circuits, some photonic systems) already
          like the ingredients of EML. If your physics gives you{" "}
          <code>exp</code> and <code>ln</code> cheaply, then every
          elementary function is a wiring problem, not a new piece of
          silicon.
        </p>

        <h3 id="uc-compiler">Compilers and IR</h3>
        <p>
          Intermediate representations over a minimal operator set are
          easier to reason about: every pass, pattern-match, and rewrite
          rule only has to cover one operator. EML suggests a canonical
          normal form for elementary expressions — useful for equivalence
          checking, superoptimization, and as a teaching target.
        </p>

        <h3 id="uc-teaching">Teaching</h3>
        <p>
          The cleanest pedagogical benefit: EML lets students{" "}
          <em>see</em> that exp and ln are not two functions but a single
          dual, and that the entire calculator is a binary tree of that
          dual. It's the kind of thing that collapses scattered memorized
          rules into one idea.
        </p>

        <h3 id="uc-ml">ML interpretability</h3>
        <p>
          Neural networks learn implicit compositions of{" "}
          <code>exp</code> and <code>ln</code> whenever they use softmax,
          log-sum-exp, or attention. Framing those learned compositions as
          EML trees gives a handle on <em>what</em> the network is
          computing at a level of abstraction that is strictly finer than
          "matmul + nonlinearity."
        </p>

        {/* 6. Potential */}
        <h2 id="potential">Potential &amp; open problems</h2>
        <p>
          The paper proves existence. It does not, for most functions, prove
          that the decompositions it exhibits are <em>minimal</em>. That
          gap is where most of the interesting research lives.
        </p>
        <ul>
          <li>
            <strong>Optimal depth.</strong> Is there a known elementary
            function whose minimal EML depth is larger than the paper's
            table suggests? Proving lower bounds on tree depth is a hard
            problem by analogy with circuit complexity.
          </li>
          <li>
            <strong>Canonical forms.</strong> Two different EML trees can
            represent the same function (because{" "}
            <code>ln(exp(x)) = x</code>, etc.). What is the right canonical
            form? Is there a confluent rewrite system?
          </li>
          <li>
            <strong>Numerical stability.</strong> <code>exp</code> blows up
            fast; <code>ln</code> hates non-positive inputs. Evaluating a
            deep EML tree naively is a recipe for overflow. Are there
            reformulations — log-domain, interval-arithmetic, mixed
            precision — that keep the algebra but stabilize the arithmetic?
          </li>
          <li>
            <strong>Sheffer-stroke cousins.</strong> Are there other
            two-argument operators over ℝ with the same completeness
            property? If so, which one is "best"?
          </li>
          <li>
            <strong>Beyond elementary.</strong> Can the idea be extended
            past elementary functions — to special functions, distributions,
            operators on Hilbert spaces? The natural Sheffer-stroke question
            doesn't stop at calculus.
          </li>
        </ul>
        <p>
          None of this is settled. The{" "}
          <Link href="/playground">playground</Link> is the easiest way to
          build intuition; the{" "}
          <a href={PAPER_URL} target="_blank" rel="noopener noreferrer">
            paper itself
          </a>{" "}
          is the right next step once you want the proofs.
        </p>

        <div className="not-prose mt-16 border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
          <div className="text-muted-foreground/70">
            // end of article
          </div>
          <p className="mt-2 text-foreground">
            <span className="text-primary">&gt;</span> questions, corrections,
            better decompositions? this is a learning playground — fork it,
            break it, send patches.
          </p>
        </div>
      </article>
    </div>
  );
}
