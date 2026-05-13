import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Toc, TocMobileBar, type TocEntry } from "@/components/landing/toc";
import { ContactCard } from "@/components/landing/contact-card";
import { MathInline, MathBlock } from "@/components/eml/math";

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
    <>
    <div className="container grid gap-10 py-10 pb-28 md:py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:pb-14">
      {/* Sticky TOC sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <Toc entries={toc} />
        </div>
      </aside>

      {/* Article */}
      <article className="prose-nerd max-w-3xl">
        {/* Masthead */}
        <header className="not-prose mb-10 space-y-4 border-b border-border pb-8">
          <h1 className="font-mono text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            one operator. every elementary function.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            A single binary primitive,{" "}
            <MathInline>{String.raw`\operatorname{eml}(x, y) = \exp(x) - \ln(y)`}</MathInline>
            , paired with the constant{" "}
            <MathInline>{String.raw`1`}</MathInline>, is enough to rebuild the
            entire toolbox of a scientific calculator. Notes, decompositions,
            and implications, written for people who find this kind of thing fun.
          </p>
        </header>

        <p>
          i was just curious when i came across this paper, after all, its
          something like NAND for the mathematics.
        </p>
        <p>
          out of curiosity i researched more about it and ended few shotting
          a basic webapp describing a few ideas explored by LLM itself and
          a playground.
        </p>
        <p>
          i had this intuition that maybe a new ISA and chip design can be
          developed using this. but it also has problems of its own. also
          got to know about potential of this paper in tracing during LLM
          development for some things, but its also like walking through
          the quicksand. maybe in near future some missing piece will be
          added to this paper, and a whole new possibilities and innovation
          will arise. but its all a big maybe. because here we are not
          talking about some patch in a software. we are talking about the
          very foundations of most complex tech pieces ever built. even if
          we get to build something efficient, it will be long long time
          till it gets accepted somewhere.
        </p>

        {/* Paper + playground buttons */}
        <div className="not-prose my-10 flex flex-wrap gap-3">
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground bg-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground shadow-[2px_2px_0_var(--shadow)] transition-transform hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_var(--shadow)] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_var(--shadow)]"
          >
            read paper
            <ExternalLink className="h-3 w-3" />
          </a>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 border border-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] shadow-[2px_2px_0_var(--shadow)] transition-transform hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_var(--shadow)] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_var(--shadow)]"
            style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
          >
            try it
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <ContactCard />

        {/* 1. Overview */}
        <h2 id="overview">Overview</h2>
        <p>
          Boolean logic has a single-primitive result: every possible truth
          function can be synthesized from{" "}
          <a href="https://en.wikipedia.org/wiki/Sheffer_stroke">NAND</a>{" "}
          alone. NAND is the <em>Sheffer stroke</em> for classical logic. What
          continuous mathematics had been missing was an analogous primitive:
          a single operator from which{" "}
          <em>all of the usual elementary functions</em> could be composed.
        </p>
        <p>
          Odrzywołek's 2026 paper nominates one. The operator
        </p>
        <MathBlock>
          {String.raw`\operatorname{eml} : \mathbb{R} \times \mathbb{R}_{+} \to \mathbb{R}, \qquad \operatorname{eml}(x, y) = \exp(x) - \ln(y)`}
        </MathBlock>
        <p>
          together with the single literal{" "}
          <MathInline>{String.raw`1`}</MathInline>, is proven to generate every
          elementary function. That's it. No{" "}
          <MathInline>{String.raw`+`}</MathInline>, no{" "}
          <MathInline>{String.raw`\times`}</MathInline>, no trigonometric
          identities in the axioms, only{" "}
          <MathInline>{String.raw`\operatorname{eml}`}</MathInline> and{" "}
          <MathInline>{String.raw`1`}</MathInline>, nested into binary trees.
        </p>
        <p>
          A scientific calculator ships with around thirty-six labeled
          operations (<MathInline>{String.raw`\exp,\ \ln,\ \sin,\ \cos,\ +,\ -,\ \times,\ \div,\ \pi,\ e,\ \sqrt{\;},\ x^{2},\ x^{y},\ \dots`}</MathInline>).
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
          Think of <MathInline>{String.raw`\operatorname{eml}`}</MathInline> as
          a small machine with two inlets and one outlet. Pour a number into
          the left inlet, another into the right, and the machine spits out{" "}
          <MathInline>{String.raw`\exp(\text{left}) - \ln(\text{right})`}</MathInline>
          . The two inlets are not interchangeable,{" "}
          <MathInline>{String.raw`\exp`}</MathInline> is applied to the first,{" "}
          <MathInline>{String.raw`\ln`}</MathInline> to the second. The machine
          is <strong>non-commutative</strong>, which matters: every tree you
          can build has a definite shape.
        </p>
        <p>
          Now restrict yourself further: the only raw ingredient you're
          allowed to drop into the inlets is the number{" "}
          <MathInline>{String.raw`1`}</MathInline>, or the output of{" "}
          <em>another</em>{" "}
          <MathInline>{String.raw`\operatorname{eml}`}</MathInline> machine.
          You may plumb machines into each other without limit. That is the
          entire grammar:
        </p>
        <MathBlock>
          {String.raw`S \;\to\; 1 \;\mid\; \operatorname{eml}(S, S)`}
        </MathBlock>
        <p>
          Surprisingly, this skeletal grammar is expressive enough to
          reconstruct every function on your calculator. <em>Euler's number{" "}
          </em> <MathInline>{String.raw`e`}</MathInline> is not a separate
          primitive, it is the one-node expression{" "}
          <MathInline>
            {String.raw`\operatorname{eml}(1, 1) = \exp(1) - \ln(1) = e`}
          </MathInline>
          . The function <MathInline>{String.raw`\exp(x)`}</MathInline>{" "}
          becomes{" "}
          <MathInline>{String.raw`\operatorname{eml}(x, 1)`}</MathInline>,
          because <MathInline>{String.raw`\ln(1) = 0`}</MathInline> cancels
          the second term. From there you stack trees to recover everything
          else.
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
          <MathInline>{String.raw`\operatorname{eml}`}</MathInline> reduces all
          elementary functions to a single two-input operator. The analogy is
          precise enough to carry real intuition:
        </p>
        <ul>
          <li>
            NAND's truth table ↔{" "}
            <MathInline>{String.raw`\operatorname{eml}`}</MathInline>'s
            defining formula{" "}
            <MathInline>{String.raw`\exp(x) - \ln(y)`}</MathInline>.
          </li>
          <li>
            Boolean circuit = tree of NAND gates ↔ elementary function = tree
            of <MathInline>{String.raw`\operatorname{eml}`}</MathInline> nodes.
          </li>
          <li>
            Gate count / circuit depth ↔ tree size / tree depth (complexity
            metrics).
          </li>
          <li>
            NAND's fabrication leverage ↔ EML's hardware potential on{" "}
            <MathInline>{String.raw`\exp`}</MathInline>/
            <MathInline>{String.raw`\ln`}</MathInline>-native substrates.
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
          Each <MathInline>{String.raw`\operatorname{eml}(a, b)`}</MathInline>{" "}
          below is literally{" "}
          <MathInline>{String.raw`\exp(a) - \ln(b)`}</MathInline>.
        </p>

        <h3 id="ex-e">e, depth 1</h3>
        <MathBlock>
          {String.raw`\begin{aligned}
e \;&=\; \operatorname{eml}(1, 1) \\
  \;&=\; \exp(1) - \ln(1) \\
  \;&=\; e - 0 \\
  \;&=\; e
\end{aligned}`}
        </MathBlock>
        <p>
          Euler's number costs <em>one</em>{" "}
          <MathInline>{String.raw`\operatorname{eml}`}</MathInline> node. It is
          never an axiom here; it falls out of the operator for free.
        </p>

        <h3 id="ex-exp">exp(x), depth 1</h3>
        <MathBlock>
          {String.raw`\begin{aligned}
\exp(x) \;&=\; \operatorname{eml}(x, 1) \\
        \;&=\; \exp(x) - \ln(1) \\
        \;&=\; \exp(x) - 0
\end{aligned}`}
        </MathBlock>
        <p>
          The exponential function is one node deep.{" "}
          <MathInline>{String.raw`\ln(1) = 0`}</MathInline> silences the right
          branch.
        </p>

        <h3 id="ex-zero">0, depth 3</h3>
        <MathBlock>
          {String.raw`\begin{aligned}
0 \;&=\; \operatorname{eml}\bigl(1,\; \operatorname{eml}(\operatorname{eml}(1, 1),\; 1)\bigr) \\
  \;&=\; \exp(1) - \ln\bigl(\exp(e) - 0\bigr) \\
  \;&=\; e - e \\
  \;&=\; 0
\end{aligned}`}
        </MathBlock>
        <p>
          The constant zero is not free. It takes three levels of nesting,
          because we have to <em>build</em> the cancellation using only{" "}
          <MathInline>{String.raw`1`}</MathInline> as a literal.
        </p>

        <h3 id="ex-ln">ln(x), depth 3</h3>
        <MathBlock>
          {String.raw`\ln(x) \;=\; \operatorname{eml}\bigl(1,\; \operatorname{eml}(\operatorname{eml}(1, x),\; 1)\bigr)`}
        </MathBlock>
        <p>
          The natural log, the operator's own inverse component, lives
          three levels deep. This is the depth-3 form from the paper's main
          table.
        </p>

        <h3 id="ex-identity">identity: f(x) = x, depth 4</h3>
        <MathBlock>
          {String.raw`\begin{aligned}
x \;&=\; \operatorname{eml}\bigl(1,\; \operatorname{eml}(\operatorname{eml}(1,\; \operatorname{eml}(x, 1)),\; 1)\bigr) \\
  \;&=\; \ln(\exp(x))
\end{aligned}`}
        </MathBlock>
        <p>
          Even the identity function costs four nested{" "}
          <MathInline>{String.raw`\operatorname{eml}`}</MathInline> calls, a
          reminder that the EML tree depth of a function has very little to do
          with how "simple" it looks in school-book notation.
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
          depth is the honest measure, not familiarity.
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
          allowed operators, typically{" "}
          <MathInline>{String.raw`+,\ -,\ \times,\ \div,\ \exp,\ \ln,\ \sin`}</MathInline>
          , and so on. A space with <em>one</em> operator is dramatically
          smaller, more uniform, and easier to enumerate. Depth becomes a
          single honest complexity penalty.
        </p>

        <h3 id="uc-hardware">Analog / log-domain hardware</h3>
        <p>
          Analog computing substrates that implement{" "}
          <MathInline>{String.raw`\exp`}</MathInline> and{" "}
          <MathInline>{String.raw`\log`}</MathInline> natively (log-domain
          filters, translinear circuits, some photonic systems) already
          like the ingredients of EML. If your physics gives you{" "}
          <MathInline>{String.raw`\exp`}</MathInline> and{" "}
          <MathInline>{String.raw`\ln`}</MathInline> cheaply, then every
          elementary function is a wiring problem, not a new piece of
          silicon.
        </p>

        <h3 id="uc-compiler">Compilers and IR</h3>
        <p>
          Intermediate representations over a minimal operator set are
          easier to reason about: every pass, pattern-match, and rewrite
          rule only has to cover one operator. EML suggests a canonical
          normal form for elementary expressions, useful for equivalence
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
          <MathInline>{String.raw`\exp`}</MathInline> and{" "}
          <MathInline>{String.raw`\ln`}</MathInline> whenever they use softmax,
          log-sum-exp, or attention. Framing those learned compositions as
          EML trees gives a handle on <em>what</em> the network is
          computing at a level of abstraction that is strictly finer than
          "matmul + nonlinearity."
        </p>

        {/* 6. ISA question */}
        <h2 id="isa-question">Could we build a chip on it?</h2>
        <p>
          Once you accept that the EML operator is functionally complete, the
          obvious next thought is hardware. If NAND-only logic gave us the
          modern CPU, would EML-only silicon give us a leaner scientific
          calculator, or a leaner anything? This question turns out to be
          genuinely subtle, and worth working through, because the answer
          tells you something about why ISAs are shaped the way they are.
        </p>

        <h3 id="isa-q1">
          1. Is an EML-only calculator more efficient than a conventional one?
        </h3>
        <p>
          Short answer: <strong>almost certainly no.</strong> The NAND
          analogy hides a load-bearing detail. NAND wins because it has{" "}
          <em>two</em> properties, functional completeness <em>and</em> a
          cheap primitive (≈4 transistors in CMOS) plus bounded expansion
          (every Boolean function maps to a NAND circuit of comparable
          size). EML has only the first.
        </p>
        <p>
          Per-gate cost in silicon is brutal here. ADD is roughly one cycle
          and a tiny area; MUL is 3–5 cycles.{" "}
          <MathInline>{String.raw`\exp`}</MathInline> and{" "}
          <MathInline>{String.raw`\ln`}</MathInline> each take ~15–30 cycles
          and large area (LUT + polynomial, or CORDIC). One EML node is
          therefore exp + ln + sub, on the order of 30–60 cycles. Now overlay
          the depths from Table 4: a multiply is depth 8, so an EML-multiply
          is roughly{" "}
          <MathInline>{String.raw`8 \times 60 \approx 480 \text{ cycles}`}</MathInline>{" "}
          with 16 transcendentals chained, versus 4 cycles for a conventional
          MUL. That's a ~100× slowdown and orders of magnitude more area for
          a single op.
        </p>
        <p>
          Numerical stability is the second knife. Every EML node stacks an{" "}
          <MathInline>{String.raw`\exp`}</MathInline> over a{" "}
          <MathInline>{String.raw`\ln`}</MathInline>; a depth-8 multiply
          composes 16 transcendentals, each injecting roughly one ULP of
          error. IEEE-754 add/mul guarantees 0.5 ULP. EML-composed multiply
          has no such bound. So an EML calculator wouldn't just be slower;
          it would be <em>less accurate</em> than the $2 microcontroller it
          was trying to replace.
        </p>

        <h3 id="isa-q2">
          2. Does that change if we redesign the chip <em>and</em> the ISA?
        </h3>
        <p>
          Still no, and there's a 50-year research tradition that tells us
          why. What you'd be building is a flavor of{" "}
          <strong>One Instruction Set Computer</strong> (OISC), a CPU with
          a single primitive instruction. Real examples exist:{" "}
          <a href="https://en.wikipedia.org/wiki/One-instruction_set_computer">
            SUBLEQ
          </a>{" "}
          ("subtract and branch if less-equal"), Transport-Triggered
          Architectures, Logarithmic Number System chips. All Turing
          complete. All <strong>10×–1000× slower</strong> than conventional
          CPUs on real workloads. EML-on-silicon would inherit the same
          fate.
        </p>
        <p>
          The argument "but if we co-design the whole stack" assumes the
          bottleneck is impedance mismatch between ISA and hardware. It
          isn't. The bottleneck is the <em>physics of the primitive</em>:
        </p>
        <ul>
          <li>
            <MathInline>{String.raw`\mathrm{add}`}</MathInline> needs a
            carry-propagate network.{" "}
            <MathInline>{String.raw`\sim \log(n)`}</MathInline> gate delays.
            No known faster way.
          </li>
          <li>
            <MathInline>{String.raw`\exp`}</MathInline> /{" "}
            <MathInline>{String.raw`\ln`}</MathInline> need range reduction +
            polynomial / LUT evaluation. <em>Mathematically irreducible</em>:
            {" "}no chip redesign changes the fact that a 53-bit{" "}
            <MathInline>{String.raw`\exp`}</MathInline> requires more work
            than a 53-bit add.
          </li>
        </ul>
        <p>
          No silicon arrangement gets you below{" "}
          <MathInline>
            {String.raw`\mathrm{exp\_cost} + \mathrm{ln\_cost} + \mathrm{sub\_cost} \;>\; \mathrm{add\_cost}`}
          </MathInline>
          . That's a fundamental lower bound, not an engineering limitation.
          The gains from co-design, simpler decoder, no structural hazards,
          smaller compiler backend, are real but maybe ~10–20% of total
          chip cost. You can't co-design your way out of a two-orders-of-
          magnitude hole with 20% gains.
        </p>

        <h3 id="isa-q3">3. The clean-slate chip lesson</h3>
        <p>
          Every clean-slate architecture in the last 30 years, Itanium,
          Transmeta, the Mill, RISC-V, Apple Silicon, Tenstorrent, still
          uses ADD/SUB/MUL/FMA as primitives. Not because of legacy, but
          because physics makes those cheapest. The clean-slate{" "}
          <em>winners</em> (TPU, GPU) won by adding <em>more specialization</em>
          {" "}(matmul units, tensor cores, RT cores, NPUs, AMX, media
          codecs), not by unifying around a single primitive.
        </p>
        <p>
          The direction of efficiency in modern hardware is therefore the
          opposite of EML. <em>More primitives for more workloads</em>, not
          fewer. EML is a deeply elegant theoretical result and a terrible
          general-purpose chip.
        </p>

        <h3 id="isa-q4">4. Where EML-native silicon could actually win</h3>
        <p>
          Two narrow but real niches:
        </p>
        <ul>
          <li>
            <strong>Analog / log-domain circuits.</strong> The transistor
            I-V curve is literally exponential, so{" "}
            <MathInline>{String.raw`\exp`}</MathInline> and{" "}
            <MathInline>{String.raw`\ln`}</MathInline> are essentially free
            at the device boundary. Translinear circuits, Gilbert cells,
            log-domain filters, EML primitives fit naturally. Tradeoff:
            ~8-bit effective precision, unsuitable for IEEE 754, potentially
            attractive for low-precision ML inference.
          </li>
          <li>
            <strong>Workloads that are already mostly transcendentals.</strong>
            {" "}Bayesian inference, certain physics simulations, attention
            variants. If you're paying for{" "}
            <MathInline>{String.raw`\exp`}</MathInline>/
            <MathInline>{String.raw`\ln`}</MathInline> anyway, the EML pair
            isn't extra cost. But you'd just expose{" "}
            <MathInline>{String.raw`\exp`}</MathInline> and{" "}
            <MathInline>{String.raw`\ln`}</MathInline> directly, no reason to
            funnel everything through the EML composition.
          </li>
        </ul>
        <p>
          The honest summary: <em>completeness</em> is about what's
          expressible; <em>efficiency</em> is about expansion factor times
          primitive cost. EML wins the first decisively and loses the
          second decisively. Beautiful theory; not a chip.
        </p>

        {/* 7. Potential */}
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
            <MathInline>{String.raw`\ln(\exp(x)) = x`}</MathInline>, etc.).
            What is the right canonical form? Is there a confluent rewrite
            system?
          </li>
          <li>
            <strong>Numerical stability.</strong>{" "}
            <MathInline>{String.raw`\exp`}</MathInline> blows up fast;{" "}
            <MathInline>{String.raw`\ln`}</MathInline> hates non-positive
            inputs. Evaluating a deep EML tree naively is a recipe for
            overflow. Are there reformulations, log-domain,
            interval-arithmetic, mixed precision, that keep the algebra but
            stabilize the arithmetic?
          </li>
          <li>
            <strong>Sheffer-stroke cousins.</strong> Are there other
            two-argument operators over{" "}
            <MathInline>{String.raw`\mathbb{R}`}</MathInline> with the same
            completeness property? If so, which one is "best"?
          </li>
          <li>
            <strong>Beyond elementary.</strong> Can the idea be extended
            past elementary functions, to special functions, distributions,
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
            end of article
          </div>
          <p className="mt-2 text-foreground">
            <span className="text-primary">&gt;</span> questions, corrections,
            better decompositions? this is a learning playground, fork it,
            break it, send patches.
          </p>
        </div>
      </article>
    </div>
    <TocMobileBar entries={toc} />
    </>
  );
}
