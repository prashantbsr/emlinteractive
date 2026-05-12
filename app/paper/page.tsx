import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Toc, TocMobileBar, type TocEntry } from "@/components/landing/toc";
import { MathInline, MathBlock } from "@/components/eml/math";

const PAPER_URL = "https://arxiv.org/html/2603.21852v2";
const PAPER_PDF_URL = "https://arxiv.org/pdf/2603.21852v2";

const toc: TocEntry[] = [
  { id: "abstract", label: "Abstract", level: 2 },
  { id: "summary", label: "Summary paragraph", level: 2 },
  { id: "significance", label: "Significance", level: 2 },
  { id: "introduction", label: "1. Introduction", level: 2 },
  { id: "methods", label: "2. Methods", level: 2 },
  { id: "search-procedure", label: "Search procedure", level: 3 },
  { id: "results", label: "3. Results", level: 2 },
  { id: "applications", label: "4. Usage & applications", level: 2 },
  { id: "compiler", label: "4.1 EML compiler", level: 3 },
  { id: "circuits", label: "4.2 Trees & circuits", level: 3 },
  { id: "symbolic-regression", label: "4.3 Symbolic regression", level: 3 },
  { id: "conclusions", label: "5. Conclusions", level: 2 },
  { id: "ai-disclosure", label: "AI disclosure", level: 3 },
  { id: "data-availability", label: "Data availability", level: 3 },
  { id: "acknowledgments", label: "Acknowledgments", level: 3 },
  { id: "supplementary", label: "Supplementary info", level: 3 },
  { id: "references", label: "References", level: 2 },
];

const description =
  "Full-text reproduction of Odrzywołek's 2026 paper introducing the EML Sheffer operator for elementary functions, with equations rendered in KaTeX.";

export const metadata: Metadata = {
  title: "The paper",
  description,
  alternates: { canonical: "/paper" },
  openGraph: {
    type: "article",
    title: "All elementary functions from a single operator · EMLinteractive",
    description,
    url: "/paper",
  },
  twitter: {
    card: "summary",
    title: "The paper · EMLinteractive",
    description,
  },
};

export default function PaperPage() {
  return (
    <>
      <div className="container grid gap-10 py-10 pb-28 md:py-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:pb-14">
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <div>
              <div className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                source
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
                <div className="mt-1 text-muted-foreground">A. Odrzywołek, 2026</div>
                <div className="mt-2 flex items-center gap-1 text-primary group-hover:underline">
                  view on arxiv
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            </div>
            <Toc entries={toc} />
            <div className="border border-border bg-card p-3 font-mono text-xs">
              <div className="text-muted-foreground/70">try it</div>
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

        <article className="prose-nerd max-w-3xl">
          <header className="not-prose mb-10 space-y-4 border-b border-border pb-8">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
              paper · full text
            </div>
            <h1 className="font-mono text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              All elementary functions from a single operator
            </h1>
            <p className="text-sm text-muted-foreground">
              Andrzej Odrzywołek
              <br />
              Institute of Theoretical Physics, Jagiellonian University, 30-348
              Krakow, Poland
              <br />
              E-mail:{" "}
              <a
                href="mailto:andrzej.odrzywolek@uj.edu.pl"
                className="underline decoration-1 underline-offset-2"
              >
                andrzej.odrzywolek@uj.edu.pl
              </a>
              <br />
              April 7, 2026
            </p>
            <div className="flex flex-wrap gap-3 pt-1 font-mono text-xs">
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline decoration-1 underline-offset-2"
              >
                arXiv HTML
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={PAPER_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline decoration-1 underline-offset-2"
              >
                PDF
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-muted-foreground">
                DOI: 10.5281/zenodo.19183008
              </span>
              <span className="text-muted-foreground">arXiv:2603.21852v2 [cs.SC]</span>
            </div>
            <p className="rounded-sm border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              Faithful reproduction of the main text (20 pages plus references).
              Equations render via KaTeX; figures live as captions that link to
              the arXiv source. Citations are preserved as bracketed numbers;
              the full bibliography is at the bottom of the page. For the
              definitive version and Supplementary Information, consult the{" "}
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                arXiv source
              </a>
              .
            </p>
            <p className="rounded-sm border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              © 2026 Andrzej Odrzywołek. Reproduced under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer license"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                Creative Commons Attribution 4.0 International (CC BY 4.0)
              </a>
              . The reproduction below is unmodified in substance; presentation
              (KaTeX rendering, navigation) is by EMLinteractive and does not
              imply endorsement by the author.
            </p>
          </header>

          {/* ─────────────── ABSTRACT ─────────────── */}
          <h2 id="abstract">Abstract</h2>
          <p>
            A single two-input gate suffices for all of Boolean logic in digital
            hardware. No comparable primitive has been known for continuous
            mathematics: computing elementary functions such as{" "}
            <MathInline>{String.raw`\sin`}</MathInline>,{" "}
            <MathInline>{String.raw`\cos`}</MathInline>,{" "}
            <MathInline>{String.raw`\sqrt{\;}`}</MathInline>, and{" "}
            <MathInline>{String.raw`\log`}</MathInline> has always required
            multiple distinct operations. Here we show that a single binary
            operator,
          </p>
          <MathBlock>{String.raw`\operatorname{eml}(x,y) \;=\; \exp(x) - \ln(y),`}</MathBlock>
          <p>
            together with the constant <MathInline>{String.raw`1`}</MathInline>,
            generates the standard repertoire of a scientific calculator. This
            includes constants such as <MathInline>{String.raw`e`}</MathInline>,{" "}
            <MathInline>{String.raw`\pi`}</MathInline>, and{" "}
            <MathInline>{String.raw`i`}</MathInline>; arithmetic operations
            including <MathInline>{String.raw`+, -, \times, /`}</MathInline>,
            and exponentiation; as well as the usual transcendental and algebraic
            functions. For example,{" "}
            <MathInline>
              {String.raw`e^{x} = \operatorname{eml}(x,1)`}
            </MathInline>
            ,{" "}
            <MathInline>
              {String.raw`\ln x = \operatorname{eml}(1, \operatorname{eml}(\operatorname{eml}(1,x),1))`}
            </MathInline>
            , and likewise for all other operations. That such an operator
            exists was not anticipated; I found it by systematic exhaustive
            search and established constructively that it suffices for the
            concrete scientific-calculator basis.
          </p>
          <p>
            In EML (Exp-Minus-Log) form, every such expression becomes a binary
            tree of identical nodes, yielding a grammar as simple as{" "}
            <MathInline>
              {String.raw`S \to 1 \mid \operatorname{eml}(S,S)`}
            </MathInline>
            . This uniform structure also enables gradient-based symbolic
            regression: using EML trees as trainable circuits with standard
            optimisers (Adam), I demonstrate the feasibility of exact recovery
            of closed-form elementary functions from numerical data at shallow
            tree depths up to 4. The same architecture can fit arbitrary data,
            but when the generating law is elementary, it may recover the exact
            formula.
          </p>

          {/* ─────────────── SUMMARY ─────────────── */}
          <h2 id="summary">Summary paragraph</h2>
          <p>
            Elementary functions such as exponentiation, logarithms and
            trigonometric functions are the standard vocabulary of STEM
            education. Each comes with its own rules and a dedicated button on
            a scientific calculator; our derivations rely on many of them
            simultaneously, even though we know they are heavily redundant and
            can be expressed through one another, e.g.{" "}
            <MathInline>{String.raw`\sin x = \cos(x - \pi/2)`}</MathInline>,{" "}
            <MathInline>{String.raw`\sqrt{x} = x^{1/2}`}</MathInline>, etc. They
            are the workhorse of quantitative science, appearing in basic and
            empirical laws and inside the engines of numerical methods like
            differential-equation solvers, integration quadratures, and Fourier
            analysis [1].
          </p>
          <p>
            In digital electronics, a remarkable fact underlies universality: a
            single two-input gate, NAND (the Sheffer stroke), suffices to build
            any Boolean circuit [2]. Continuous mathematics has lacked such a
            primitive: calculators must expose many distinct buttons. Classical
            reductions, from logarithm tables [3, 4] and the slide rule through
            Euler&apos;s formula [5] to the exp-log representation [6] with
            algebraic adjunctions [7], reduced them to a few, but no further.
            Despite this, it remains unclear whether this apparent diversity is
            intrinsic, or whether a smaller generative basis exists.
          </p>
          <p>
            Here we show that the operator{" "}
            <MathInline>
              {String.raw`\operatorname{eml}(x,y) = \exp(x) - \ln(y)`}
            </MathInline>
            , together with the constant <MathInline>{String.raw`1`}</MathInline>
            , does exactly that: it reconstructs arithmetic, all standard
            elementary transcendental functions, and constants including
            integers, fractions, radicals,{" "}
            <MathInline>{String.raw`e`}</MathInline>,{" "}
            <MathInline>{String.raw`\pi`}</MathInline>, and{" "}
            <MathInline>{String.raw`i`}</MathInline>. In simpler terms, a
            two-button calculator <MathInline>{String.raw`(1,\operatorname{eml})`}</MathInline>{" "}
            suffices for everything a full scientific calculator can do.
          </p>
          <p>
            Existence of the EML operator reveals that elementary functions are
            members of a much simpler class than previously recognised. Every
            EML expression is a binary tree of identical nodes, yielding an
            exceptionally simple grammar:{" "}
            <MathInline>
              {String.raw`S \to 1 \mid \operatorname{eml}(S,S)`}
            </MathInline>
            , a context-free language isomorphic to well-studied combinatorial
            objects like full binary trees and Catalan structures. Elementary
            formulas become circuits [8] composed of identical elements, much
            like digital hardware built from NAND gates. This uniform
            representation provides a complete and regular search space for
            continuous symbolic regression [9, 10]: parameterised EML trees can
            be optimised by standard gradient methods, and when the generating
            law is elementary, trained weights can snap to exact closed-form
            expressions. In effect, a single trainable architecture gains the
            potential to discover [11] any elementary formula from data.
          </p>
          <p>
            The EML operator may be the tip of an iceberg. Preliminary searches
            have already returned related operators with even stronger
            properties, including a ternary variant that requires no
            distinguished constant.
          </p>

          {/* ─────────────── SIGNIFICANCE ─────────────── */}
          <h2 id="significance">Significance statement</h2>
          <p>
            Everyone learns many mathematical operations in school: fractions,
            roots, logarithms, and trigonometric functions (
            <MathInline>
              {String.raw`+, -, \times, /, \sqrt{\;}, \sin, \cos, \log, \ldots`}
            </MathInline>
            ), each with its own rules and a dedicated button on a scientific
            calculator. Higher mathematics reveals that many of these are
            redundant: for example, trigonometric ones reduce to the complex
            exponential. How far can this reduction go? We show that it goes
            all the way: a single operation,{" "}
            <MathInline>{String.raw`\operatorname{eml}(x,y)`}</MathInline>,
            replaces every one of them. A calculator with just two buttons, EML
            and the digit 1, can compute everything a full scientific calculator
            does. This is not a mere mathematical trick. Because one repeatable
            element suffices, mathematical expressions become uniform circuits,
            much like electronics built from identical transistors, opening new
            ways to encoding, evaluating, and discovering formulas across
            scientific computing.
          </p>

          {/* ─────────────── 1. INTRODUCTION ─────────────── */}
          <h2 id="introduction">1. Introduction</h2>
          <p>
            Single, reusable primitives play a disproportionately large
            aesthetic and practical role in mathematics, engineering, and even
            biology. Widely known classical examples include the NAND gate
            (and its dual, Peirce Arrow, logical NOR) for Boolean 0/1 logic
            [2, 12], the operational amplifier [13] for positive and negative
            feedback processes, and, more recently, the rectified linear unit
            (ReLU) &quot;ramp&quot; activation function [14] in deep learning
            [15]. We also mention Wolfram&apos;s single axiom [16],{" "}
            <MathInline>{String.raw`K,S`}</MathInline> combinators from
            combinatory logic [17, 18], Interaction Combinators [19], and fuzzy
            versions of the Sheffer stroke [20]. Other well-known examples are
            one-instruction set computers (OISC), e.g. SUBLEQ [21], Conway&apos;s
            FRACTRAN [22] and the Rule 110 cellular automaton [16, 23].
          </p>
          <p>
            Whether the existence of a single sufficient operator or element is
            conceptually crucial is disputed [24]. Nevertheless, its value for
            understanding, pedagogy, and public communication is substantial.
            Indeed, classical first-order logic does not need to single out
            NAND at all: it works perfectly well with a whole redundant family
            of connectives (XOR, AND, NOT, …) that we introduce for convenience
            in applications. But the realisation that all of them are definable
            from a single primitive is a striking and conceptually deep
            structural fact. A similar kind of realisation accompanies the
            recognition of DNA and RNA [25] as a nearly universal information
            carrier in evolutionary biology.
          </p>
          <p>
            Sheffer-type elements are rare, and mining them typically requires
            time, compute, effort, and a bit of luck. They also appear in
            seemingly distant areas, for example in discrete geometry. The
            recently discovered solution to the &quot;einstein
            <sup>
              <a href="#fn1" className="text-primary no-underline hover:underline">
                1
              </a>
            </sup>{" "}
            problem&quot; had a major impact on the tiling community [26]. The
            present author already has one such element in his portfolio,
            namely an igloo construction brick derived from the (2,3,5)
            spherical Möbius triangle [27].
          </p>
          <p>
            Elementary functions, for many students epitomised by the dreaded{" "}
            <em>sine</em> and <em>cosine</em>, play a central role in
            quantitative reasoning. They can be combined in countably many ways
            with integers, rational numbers, and mathematical constants such as{" "}
            <MathInline>{String.raw`\pi`}</MathInline> and{" "}
            <MathInline>{String.raw`e`}</MathInline>, using the four basic
            arithmetic operations (
            <MathInline>{String.raw`+, -, \times, /`}</MathInline>) and
            exponentiation. Elementary functions are at the core of STEM
            education and at the foundation of modern technological
            civilization. This includes not only simple formulas or empirical
            models, but also most numerical algorithms, for example the
            ordinary-differential-equation solver RKF45 [28], integration rules
            (Gaussian, Tanh-Sinh, …) [1, 29], and the Fast Fourier Transform
            [30], whose twiddle factors are elementary functions. Finite
            expressions in elementary functions are supported
            <sup>
              <a href="#fn2" className="text-primary no-underline hover:underline">
                2
              </a>
            </sup>{" "}
            in virtually all modern programming languages.
          </p>
          <p>
            While it is generally known that most standard functions and
            arithmetic operations are heavily redundant (e.g.{" "}
            <MathInline>{String.raw`\tan x = \sin x / \cos x`}</MathInline>,{" "}
            <MathInline>{String.raw`\sqrt{x} = x^{1/2}`}</MathInline>,{" "}
            <MathInline>
              {String.raw`\operatorname{arsinh} x = \ln(x + \sqrt{1 + x^{2}})`}
            </MathInline>
            ,{" "}
            <MathInline>{String.raw`x/y = x \times y^{-1}`}</MathInline>, etc.),
            especially in the complex domain (e.g.{" "}
            <MathInline>{String.raw`\cosh x = \cos(ix)`}</MathInline>,{" "}
            <MathInline>{String.raw`\sinh ix = i\sin x`}</MathInline>), they have
            never been regarded as candidates for a single primitive operator.
            Historically, two major milestones in understanding elementary
            arithmetic operations from this point of view are (i) the discovery
            of logarithms and the subsequent creation of tables [3, 4] followed
            by the slide rule, and (ii) Euler&apos;s formula{" "}
            <MathInline>{String.raw`e^{i\pi} + 1 = 0`}</MathInline> [5].
            Logarithms were introduced to reduce multiplication to addition.
            The exp-log pair allows them to be expressed in terms of one
            another:
          </p>
          <MathBlock>
            {String.raw`x \times y = e^{\ln x + \ln y}, \qquad x + y = \ln\!\left(e^{x} \times e^{y}\right). \tag{1}`}
          </MathBlock>
          <p>Euler&apos;s formula</p>
          <MathBlock>
            {String.raw`e^{i\varphi} = \cos\varphi + i\sin\varphi \tag{2}`}
          </MathBlock>
          <p>
            shows that, once the imaginary unit{" "}
            <MathInline>{String.raw`i = \sqrt{-1}`}</MathInline> is introduced,
            trigonometric functions can be viewed as another face of{" "}
            <MathInline>{String.raw`\exp`}</MathInline> and{" "}
            <MathInline>{String.raw`\ln`}</MathInline> [6]. This perspective
            leads naturally to what scientists call{" "}
            <em>exp-log functions</em>: finite expressions built from variables,
            named constants, arithmetic operations, together with{" "}
            <MathInline>{String.raw`\exp`}</MathInline> and{" "}
            <MathInline>{String.raw`\log`}</MathInline>, in the spirit of
            differential and computer algebra [31, 32]. In the classical
            differential-algebraic setting, one often works with a broader
            notion of elementary function, defined relative to a chosen field
            of constants and allowing algebraic adjunctions [7], i.e., adjoining
            roots of polynomial equations (cf. <code>Root</code> in the Wolfram
            Language [33]). That level of generality is not needed here. The
            present paper takes the ordinary scientific-calculator point of
            view: start from a concrete list of familiar constants, functions
            and operations, and ask how far they can be reduced without losing
            practical functionality. The precise starting list is given later
            in Table 1.
          </p>
          <p>
            Many reductions inside that list are, of course, classical and well
            known; what seems not to have been investigated systematically is
            the endpoint of the process, namely reduction to a single binary
            operator paired with a single distinguished constant. In particular,
            the so-called &quot;broken calculator&quot; problem [34] is a
            popular formulation of computations with a reduced set of available
            keys or operations. I used this approach to construct a sequence of
            increasingly &quot;primitive&quot; yet fully functional calculators
            with 4, 3, 2, and finally a single operator. This operator is the
            EML (Exp–Minus–Log),
          </p>
          <MathBlock>
            {String.raw`\operatorname{eml}(x,y) = \exp(x) - \ln(y). \tag{3}`}
          </MathBlock>
          <p>
            Using the EML, a surprisingly simple binary operator, we can
            express any standard real elementary function in terms of repeated
            applications of (3) to the input variables{" "}
            <MathInline>{String.raw`x, y, z, \ldots`}</MathInline> and a single
            distinguished constant, 1. This constant is needed to neutralise
            the logarithmic term in (3) via{" "}
            <MathInline>{String.raw`\ln(1) = 0`}</MathInline>. Computations must
            be done in the complex domain; generating constants like{" "}
            <MathInline>{String.raw`i`}</MathInline> and{" "}
            <MathInline>{String.raw`\pi`}</MathInline> requires evaluating{" "}
            <MathInline>{String.raw`\ln(-1)`}</MathInline>, so{" "}
            <MathInline>{String.raw`\operatorname{eml}(x,y)`}</MathInline>{" "}
            internally operates over{" "}
            <MathInline>{String.raw`\mathbb{C}`}</MathInline> using the
            principal branch.
          </p>
          <p>
            If we do not need external input variables, e.g. for use in an
            actual pocket calculator, two buttons are sufficient to retain full
            functionality: one binary operator, EML, and one terminal symbol,{" "}
            1. No further reduction of operator count is possible, because at
            least one binary operator and at least one terminal symbol are
            required. The existence of such a binary operator, which is itself
            an elementary function, is somewhat unexpected.
          </p>
          <p>
            In fact, the EML Sheffer operator (3) is as simple as it appears,
            and in principle the article could end here; its consequences would
            eventually surface on their own. Nevertheless, it seems worthwhile
            to explain the methods used in the search for it (Sect. 2), to
            present the intermediate and final search results (Sect. 3), and to
            outline potential applications (Sect. 4) that are already visible
            on the horizon. The article concludes with a short summary,
            possible follow-up directions, and open questions.
          </p>

          {/* ─────────────── 2. METHODS ─────────────── */}
          <h2 id="methods">2. Methods</h2>
          <p>
            I employed systematic &quot;ablation&quot; testing to identify
            minimal operator sets for a fixed scientific-calculator starting
            list. The list, given in Table 1, contains 36 primitives: named
            constants and input variables, standard unary functions, and binary
            operations. I iteratively removed one element from this list
            (constant, function, or binary operation) and verified whether the
            remaining set could still reconstruct original primitives. The
            Mathematica / Wolfram core language [33] instruction set (Table 2,
            2nd row) served as a reference for an already-optimised and
            thoroughly tested (for almost 40 years) minimalist system. Research
            started out of curiosity whether this system could be reduced
            further.
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            Table 1, Starting list of constants/variables, unary functions and
            binary operators used to initiate the reduction procedure.
          </p>
          <div className="not-prose my-4 overflow-x-auto">
            <table className="w-full border-collapse border border-border font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="p-2">Type</th>
                  <th className="p-2">Elements</th>
                  <th className="p-2 text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-2 align-top">Constants</td>
                  <td className="p-2">
                    <MathInline>{String.raw`\pi, e, i, -1, 1, 2, x, y`}</MathInline>
                  </td>
                  <td className="p-2 text-right">8</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 align-top">Unary functions</td>
                  <td className="p-2 space-y-1">
                    <div>
                      <MathInline>
                        {String.raw`\exp, \ln, \operatorname{inv}, \operatorname{half}, \operatorname{minus}, \sqrt{\;}, \operatorname{sqr}, \sigma`}
                      </MathInline>
                    </div>
                    <div>
                      <MathInline>
                        {String.raw`\sin, \cos, \tan, \arcsin, \arccos, \arctan`}
                      </MathInline>
                    </div>
                    <div>
                      <MathInline>
                        {String.raw`\sinh, \cosh, \tanh, \operatorname{arsinh}, \operatorname{arcosh}, \operatorname{artanh}`}
                      </MathInline>
                    </div>
                  </td>
                  <td className="p-2 text-right">20</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 align-top">Binary operations</td>
                  <td className="p-2">
                    <MathInline>{String.raw`+, -, \times, /`}</MathInline>;{" "}
                    <MathInline>{String.raw`\log, \operatorname{pow}`}</MathInline>
                    ;{" "}
                    <MathInline>
                      {String.raw`\operatorname{avg}, \operatorname{hypot}`}
                    </MathInline>
                  </td>
                  <td className="p-2 text-right">8</td>
                </tr>
                <tr className="bg-muted/20 font-semibold">
                  <td className="p-2">Total</td>
                  <td className="p-2" />
                  <td className="p-2 text-right">36</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This table also fixes the concrete scientific-calculator notion of
            &quot;elementary function&quot; used throughout the paper: finite
            expressions built from these named symbols. The{" "}
            <MathInline>{String.raw`\exp(x) = e^{x}`}</MathInline>,{" "}
            <MathInline>{String.raw`\ln x`}</MathInline> is the natural
            logarithm,{" "}
            <MathInline>{String.raw`\operatorname{inv}(x) = 1/x`}</MathInline>{" "}
            denotes the reciprocal,{" "}
            <MathInline>
              {String.raw`\operatorname{minus}(x) = -x`}
            </MathInline>{" "}
            is a sign flip. The square is denoted{" "}
            <MathInline>{String.raw`\operatorname{sqr}(x) = x^{2}`}</MathInline>{" "}
            and{" "}
            <MathInline>
              {String.raw`\sigma(x) = 1/(1 + e^{-x})`}
            </MathInline>{" "}
            is the logistic sigmoid. Trigonometric and hyperbolic functions
            with their inverses have their usual meaning. In addition to the
            four basic arithmetic binary operations we use the arbitrary-base
            logarithm <MathInline>{String.raw`\log_x y`}</MathInline>,
            exponentiation{" "}
            <MathInline>
              {String.raw`\operatorname{pow}(x,y) = x^{y}`}
            </MathInline>
            , the arithmetic mean{" "}
            <MathInline>
              {String.raw`\operatorname{avg}(x,y) = (x+y)/2`}
            </MathInline>
            , and the hypotenuse{" "}
            <MathInline>
              {String.raw`\operatorname{hypot}(x,y) = \sqrt{x^{2} + y^{2}}`}
            </MathInline>
            .
          </p>
          <p>
            An operator set was deemed <em>complete</em> if it could reconstruct
            all primitives from Table 1, on the real axis where appropriate.
            This includes trigonometric functions and their inverses (
            <MathInline>{String.raw`\sin, \cos, \tan, \arcsin, \ldots`}</MathInline>
            ), hyperbolic functions and their inverses (
            <MathInline>
              {String.raw`\sinh, \cosh, \tanh, \operatorname{arsinh}, \ldots`}
            </MathInline>
            ), algebraic operations (
            <MathInline>{String.raw`\sqrt{\;\cdot\;}`}</MathInline>, reciprocal,
            …), and fundamental constants (
            <MathInline>{String.raw`\pi, e, i, -1, 0, 1, 2, \ldots`}</MathInline>
            ).
          </p>
          <p>
            The challenge of executing such a test is illustrated by the
            following simple exercise from rational-function generation,
            attributed to [35]. Given only the three operations:{" "}
            <MathInline>
              {String.raw`\operatorname{suc}(x) = x + 1`}
            </MathInline>{" "}
            (successor),{" "}
            <MathInline>
              {String.raw`\operatorname{pre}(x) = x - 1`}
            </MathInline>{" "}
            (predecessor), and{" "}
            <MathInline>
              {String.raw`\operatorname{inv}(x) = 1/x`}
            </MathInline>{" "}
            (reciprocal/inverse), let us compute negation, i.e.,{" "}
            <MathInline>{String.raw`-x`}</MathInline>. The non-obvious solution
            is:
          </p>
          <MathBlock>
            {String.raw`\operatorname{suc}\!\left(\operatorname{inv}\!\left(\operatorname{pre}\!\left(\operatorname{inv}\!\left(\operatorname{suc}\!\left(\operatorname{inv}(x)\right)\right)\right)\right)\right) = \frac{1}{\dfrac{1}{\dfrac{1}{x} + 1} - 1} + 1 = -x.`}
          </MathBlock>
          <p>
            This exemplifies the formulas expected to be encountered in our
            search: nested expressions with depth 5–9 that defy intuitive
            construction. There is no regular method to find them automatically,
            except for (human-assisted) brute-force search, nowadays also
            enhanced using AI [36].
          </p>
          <p>
            Direct symbolic verification proved computationally intractable.
            Typical Kolmogorov-style complexity{" "}
            <MathInline>{String.raw`K`}</MathInline> [37] is usually{" "}
            <MathInline>{String.raw`K \lesssim 7`}</MathInline>. In practice it
            was searched up to <MathInline>{String.raw`K = 9`}</MathInline>.
            Here <MathInline>{String.raw`K`}</MathInline> denotes the length of
            a Reverse Polish Notation (RPN) calculator program, equivalent to a
            formula. To speed up the search I developed a hybrid numeric
            bootstrapping verification approach, working as follows. We test
            whether a target operation, e.g. the hypotenuse{" "}
            <MathInline>{String.raw`\sqrt{x^{2} + y^{2}}`}</MathInline>, can be
            expressed using a given operator set. Instead of symbolic
            manipulation on <MathInline>{String.raw`x, y`}</MathInline>, I
            substituted for <MathInline>{String.raw`x`}</MathInline> and{" "}
            <MathInline>{String.raw`y`}</MathInline> algebraically independent
            (not in exp-log class) transcendental constants, such as{" "}
            <MathInline>{String.raw`x = \gamma \approx 0.577216`}</MathInline>{" "}
            (Euler–Mascheroni) and{" "}
            <MathInline>{String.raw`y = A \approx 1.28243`}</MathInline>{" "}
            (Glaisher–Kinkelin). Then,{" "}
            <MathInline>{String.raw`\sqrt{\gamma^{2} + A^{2}}`}</MathInline>{" "}
            was evaluated numerically, and compared to all expressions generated
            from <MathInline>{String.raw`1`}</MathInline> and (3). This method
            follows from the simple observation that any generally valid
            formula must also be valid at a single point. Under the Schanuel
            conjecture [38], coincidental equality between such expressions is
            vanishingly unlikely, making this a reliable sieve for
            formula-equivalence candidates. In practice, I compute the
            double-precision numerical value of the operator sought, and then
            run constant-recognition software (&quot;inverse symbolic
            calculator&quot;) on this result, which returns a candidate formula
            in the form of RPN calculator code [39] or as an expression tree,
            depending on the variant of the method used. The search procedure
            is heuristic and serves only to exclude evidently false formulas
            and discover candidate witnesses; independent verification is
            separate and is given in Supplementary Information (Part II), which
            provides symbolic checks, numerical cross-validation, and a
            constructive completeness proof sketch for the Table 1 class.
          </p>

          <h3 id="search-procedure">Search procedure</h3>
          <p>
            In detail, the search procedure worked as follows. Rather than
            searching for all elementary operations (Table 1) directly in pure
            EML form (which remains computationally infeasible even
            numerically), I employed iterative bootstrapping:
          </p>
          <ol>
            <li>
              Start with two lists:
              <ul className="mt-2">
                <li>
                  the set of constants, functions, and operators to be verified
                  for robustness, e.g.{" "}
                  <MathInline>
                    {String.raw`S_0 = \{1, \operatorname{eml}\}`}
                  </MathInline>
                  ;
                </li>
                <li>
                  the set of constants, functions, and operators to be
                  computed, e.g.{" "}
                  <MathInline>
                    {String.raw`C_0 = \{\pi, e, i, -1, \ldots, \exp, \ln, \ldots, +, -, \times, \ldots\}`}
                  </MathInline>
                  , cf. Table 1. The list{" "}
                  <MathInline>{String.raw`C_0`}</MathInline> also defines what I
                  mean by &quot;computing <em>all</em> elementary
                  functions&quot;.
                </li>
              </ul>
            </li>
            <li>
              Search for an expression computing some element from the list{" "}
              <MathInline>{String.raw`C_i`}</MathInline> using only primitives
              from the list <MathInline>{String.raw`S_i`}</MathInline>.
            </li>
            <li>
              If one is found, move it from the list{" "}
              <MathInline>{String.raw`C_i`}</MathInline> to the list{" "}
              <MathInline>{String.raw`S_{i+1}`}</MathInline>. In the EML
              example, the first result found is the formula for{" "}
              <MathInline>
                {String.raw`e = \operatorname{eml}(1,1)`}
              </MathInline>
              . After the first step, the lists become{" "}
              <MathInline>
                {String.raw`S_1 = S_0 \cup \{e\} = \{1, \operatorname{eml}, e\}`}
              </MathInline>
              ,{" "}
              <MathInline>
                {String.raw`C_1 = C_0 \setminus \{e\}`}
              </MathInline>
              .
            </li>
            <li>
              Repeat steps 2–3 until all primitives from the initial list{" "}
              <MathInline>{String.raw`C_0`}</MathInline> are reconstructed,
              i.e., until <MathInline>{String.raw`C_i`}</MathInline> becomes
              empty:{" "}
              <MathInline>{String.raw`C_i = \emptyset`}</MathInline>.
            </li>
          </ol>
          <p>
            The verification procedure, <code>VerifyBaseSet</code>, was
            implemented using my own Mathematica SymbolicRegression package
            [39]. A version that is three orders of magnitude faster was
            recently translated by GPT Codex 5.3 into Rust [39], allowing a
            re-check of EML in seconds, rather than hours.
          </p>
          <p>
            The ablation process, i.e., running the above search with some of
            the elements from Table 1 removed, yielded progressively smaller
            calculator configurations (named Calc 3, 2, 1, 0 in Table 2), each
            requiring different primitives, constants in particular. Some
            configurations could generate required constants from arbitrary
            input on their own (via operations like{" "}
            <MathInline>{String.raw`x - x = 0`}</MathInline>,{" "}
            <MathInline>{String.raw`e^{0} = 1`}</MathInline>,{" "}
            <MathInline>{String.raw`0 - 1 = -1, \ldots`}</MathInline> in Calc 2),
            while others required specific constants (e.g., Calc 1 requires{" "}
            <MathInline>{String.raw`e`}</MathInline> or{" "}
            <MathInline>{String.raw`\pi`}</MathInline>; Wolfram requires{" "}
            <MathInline>{String.raw`i`}</MathInline>, cf. footnote in Table 2).
            Then the search stalled, and it became evident that the continuous
            Sheffer operator, if it exists, is not among the familiar named
            functions. For the final reduction, I began, guided by intuition
            gathered over many experiments, to enumerate elementary binary
            functions as candidate single operators, paired with similarly
            generated constants. Each candidate pair {"{ constant, operator }"}{" "}
            was tested using the <code>VerifyBaseSet</code> procedure. This,
            after numerous failures, and a few discarded false positives,
            revealed that <MathInline>{String.raw`\operatorname{eml}(x,y)`}</MathInline>,
            given by (3), paired with the constant 1, forms a complete basis
            for reconstructing the elementary functions. Later I realised that
            EML is not unique, discovering its close cousins: EDL (requiring
            constant <MathInline>{String.raw`e`}</MathInline>) and a third
            variant using <MathInline>{String.raw`-\infty`}</MathInline> as a
            terminal symbol. Details are the subject of the next section.
          </p>

          {/* ─────────────── 3. RESULTS ─────────────── */}
          <h2 id="results">3. Results</h2>
          <p>
            Table 2 presents the complete reduction sequence, in historical
            order. Each configuration represents a complete &quot;scientific
            calculator&quot; capable of computing every expression built from
            the primitives listed in Table 1. Calc 3 (Table 2, 3rd row) was
            first to dethrone the Wolfram Language primitives set (Table 2, 2nd
            row) by retaining negation and reciprocal alongside{" "}
            <MathInline>{String.raw`\exp`}</MathInline>,{" "}
            <MathInline>{String.raw`\ln`}</MathInline>, and addition. This
            system of 6 primitives is able to generate constants on its own{" "}
            <em>via</em>{" "}
            <MathInline>{String.raw`x + (-x) = 0`}</MathInline>, etc. Calc 2
            achieved what Calc 3 does using only{" "}
            <MathInline>{String.raw`\exp`}</MathInline>,{" "}
            <MathInline>{String.raw`\ln`}</MathInline>, and subtraction, while
            still preserving the ability to generate constants on its own. The
            non-commutative operator (subtraction) proved crucial, as it
            provides both expression-tree growth and inversion capabilities.
          </p>
          <p>
            Calc 1 represents a fundamentally different, top-down approach,
            using binary exponentiation (a rank-3 hyper-operation) and its
            inverse (binary logarithm) as base operators instead of lower-rank
            operations such as addition and subtraction. This configuration
            works with <MathInline>{String.raw`e`}</MathInline> or{" "}
            <MathInline>{String.raw`\pi`}</MathInline> as the terminal constant.
            Despite extensive searches, no other constant was found for which
            Calc 1 works.
          </p>
          <p>
            Calc 0 absorbs the constant <MathInline>{String.raw`e`}</MathInline>{" "}
            into the <MathInline>{String.raw`\exp`}</MathInline> function
            itself, reducing the system to 3 primitives. This configuration
            strongly suggested that a single binary operator might exist at
            all, motivating further search.
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            Table 2, Progressive reduction from the 36-button scientific
            calculator to the EML Sheffer operator.
          </p>
          <div className="not-prose my-4 overflow-x-auto">
            <table className="w-full border-collapse border border-border font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="p-2">Config</th>
                  <th className="p-2">Constants</th>
                  <th className="p-2">Unary</th>
                  <th className="p-2">Binary</th>
                  <th className="p-2 text-right">Count-down</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-2">Base-36</td>
                  <td className="p-2">cf. Table 1</td>
                  <td className="p-2">cf. Table 1</td>
                  <td className="p-2">cf. Table 1</td>
                  <td className="p-2 text-right">36</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2">
                    Wolfram
                    <sup>
                      <a href="#fn-wolfram" className="text-primary">
                        *
                      </a>
                    </sup>
                  </td>
                  <td className="p-2">
                    <MathInline>{String.raw`\pi, e, i`}</MathInline>
                  </td>
                  <td className="p-2">
                    <MathInline>{String.raw`\ln`}</MathInline>
                  </td>
                  <td className="p-2">
                    <MathInline>{String.raw`+, \times, \wedge`}</MathInline>
                  </td>
                  <td className="p-2 text-right">7</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2">Calc 3</td>
                  <td className="p-2">none</td>
                  <td className="p-2">
                    <MathInline>{String.raw`\exp, \ln, -x, 1/x`}</MathInline>
                  </td>
                  <td className="p-2">
                    <MathInline>{String.raw`+`}</MathInline>
                  </td>
                  <td className="p-2 text-right">6</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2">Calc 2</td>
                  <td className="p-2">none</td>
                  <td className="p-2">
                    <MathInline>{String.raw`\exp, \ln`}</MathInline>
                  </td>
                  <td className="p-2">
                    <MathInline>{String.raw`-`}</MathInline>
                  </td>
                  <td className="p-2 text-right">4</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2">Calc 1</td>
                  <td className="p-2">
                    <MathInline>{String.raw`e`}</MathInline> or{" "}
                    <MathInline>{String.raw`\pi`}</MathInline>
                  </td>
                  <td className="p-2">none</td>
                  <td className="p-2">
                    <MathInline>{String.raw`x^{y}, \log_x y`}</MathInline>
                  </td>
                  <td className="p-2 text-right">4</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2">Calc 0</td>
                  <td className="p-2">none</td>
                  <td className="p-2">
                    <MathInline>{String.raw`\exp`}</MathInline>
                  </td>
                  <td className="p-2">
                    <MathInline>{String.raw`\log_x y`}</MathInline>
                  </td>
                  <td className="p-2 text-right">3</td>
                </tr>
                <tr className="border-b border-border bg-muted/20 font-semibold">
                  <td className="p-2 text-primary">EML</td>
                  <td className="p-2">
                    <MathInline>{String.raw`1`}</MathInline>
                  </td>
                  <td className="p-2">none</td>
                  <td className="p-2">
                    <MathInline>
                      {String.raw`\operatorname{eml}(x,y)`}
                    </MathInline>
                  </td>
                  <td className="p-2 text-right">3</td>
                </tr>
                <tr className="border-b border-border text-muted-foreground">
                  <td className="p-2">?</td>
                  <td className="p-2">none</td>
                  <td className="p-2">none</td>
                  <td className="p-2">?</td>
                  <td className="p-2 text-right">2</td>
                </tr>
                <tr className="text-muted-foreground">
                  <td className="p-2">?</td>
                  <td className="p-2">none</td>
                  <td className="p-2">?</td>
                  <td className="p-2">
                    <MathInline>{String.raw`+, -, \times`}</MathInline>
                  </td>
                  <td className="p-2 text-right">5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p id="fn-wolfram" className="text-xs text-muted-foreground">
            <sup>*</sup>The imaginary unit alone is sufficient for the Wolfram
            set:{" "}
            <MathInline>{String.raw`-1 = i \times i`}</MathInline>,{" "}
            <MathInline>{String.raw`1 = -1 \times (-1)`}</MathInline>,{" "}
            <MathInline>{String.raw`0 = -1 + 1`}</MathInline>,{" "}
            <MathInline>{String.raw`\pi = -1 \times i \times \ln(-1)`}</MathInline>
            ,{" "}
            <MathInline>{String.raw`e = (-1)^{(i\pi)^{(-1)}}`}</MathInline>.
            Last two rows are placeholders for speculated undiscovered
            primitives: a binary operator hypothesised to generate constants
            from arbitrary input (unlike EML), and a unary operator that
            retains the good properties of neural-net activations while
            allowing exact evaluation of elementary functions when combined
            with standard &quot;matrix&quot; arithmetic.
          </p>
          <p>
            The final reduction to EML was achieved by recognising a pattern:
            all minimal configurations involve pairs of inverse functions
            (including self-inverses) and non-commutative operations. Testing
            combinations of inverse functions at the input with asymmetric
            operations at the output yielded the first continuous sufficient
            operator. A month later I realised that it has at least two
            additional cousins: EDL and -EML:
          </p>
          <MathBlock>
            {String.raw`\begin{aligned}
\operatorname{eml}(x,y) &= \exp(x) - \ln(y) &&\text{with constant } 1, \tag{4a}\\
\operatorname{edl}(x,y) &= \exp(x) / \ln(y) &&\text{with constant } e, \tag{4b}\\
-\operatorname{eml}(y,x) &= \ln(x) - \exp(y) &&\text{with constant } -\infty. \tag{4c}
\end{aligned}`}
          </MathBlock>
          <p>
            The first successful discovery search run (cf. Fig. 1) can be
            replicated with this 3-line Mathematica code:
          </p>
          <pre className="not-prose my-4 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 font-mono text-xs">
            <code>{`Import["SymbolicRegression.m"]
EML[x_, y_] := Exp[x] - Log[y]
VerifyBaseSet[{1}, {}, {EML}]`}</code>
          </pre>
          <p>
            where the package can also be imported directly from the repository
            [39]. Depending on computer speed, usually in less than an hour,
            the above procedure re-generates all 36 elementary operations from
            Table 1. For example, the natural logarithm becomes:
          </p>
          <MathBlock>
            {String.raw`\ln(z) \;=\; \operatorname{eml}\!\bigl(1,\; \operatorname{eml}(\operatorname{eml}(1,z),\, 1)\bigr), \tag{5}`}
          </MathBlock>
          <p>
            and so on. The resulting EML expressions range from depth 1
            (exponential,{" "}
            <MathInline>
              {String.raw`e^{x} = \operatorname{eml}(x,1)`}
            </MathInline>
            ) to depth 8 (multiplication), with most basic math functions
            requiring larger depths (Table 4). A much faster and more thorough
            test (multiple real transcendentals, both positive and negative,
            arbitrary-precision check) is provided by a Rust re-implementation
            of <code>VerifyBaseSet</code> [39],{" "}
            <code>rust_verify</code>.
          </p>
          <p>
            The exhaustive search served only to discover candidate identities.
            Their verification is deferred to Supplementary Information, Part
            II, which contains symbolic simplification of the full discovery
            chain (Fig. 1) in Wolfram Mathematica [33], independent numerical
            cross-checks across four implementations (C, NumPy, PyTorch, and
            mpmath), and a constructive completeness proof sketch.
          </p>
          <figure className="not-prose my-6 rounded-md border border-border bg-card p-4">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              figure 1
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Bootstrapping &quot;phylogenetic&quot; tree of the elementary
              functions found from EML, (3), as LUCA (Last Universal Common
              Ancestor) and 1. A spiral unwinds according to subsequent
              discovered primitives, and arrows show from which elements each
              was composed. Those using EML and 1 directly are marked with
              thick arrows. For the full adjacency matrix and the entire
              discovery chain, see Supplementary Information, Fig. S1 and
              Table S2. (See{" "}
              <a
                href={`${PAPER_URL}#S3.F1`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                Fig. 1 on arXiv
              </a>
              .)
            </p>
          </figure>

          {/* ─────────────── 4. APPLICATIONS ─────────────── */}
          <h2 id="applications">4. Usage and applications</h2>
          <p>
            The uniform tree structure of EML expressions suggests several
            directions for implementation and application.
          </p>

          <h3 id="compiler">4.1 EML compiler</h3>
          <p>
            The output of the <code>VerifyBaseSet</code> procedure provides the
            data (see Fig. 1) required to reconstruct any primitive or
            composite elementary expression in terms of EML Sheffer, (4a). I
            provide a prototype EML compiler, coded in Python, that converts
            formulas into pure EML form. An EML expression can be evaluated
            symbolically in Mathematica, or numerically in any IEEE-754–compliant
            language. Pure EML form could also be executed on hardware (or an
            emulated machine) that has only a single instruction: the EML
            itself. In particular, the EML code can be executed on a
            single-instruction stack machine, closely resembling a single-button
            RPN calculator. Pure-EML form could possibly be implemented
            efficiently in FPGA or analog circuits.
          </p>
          <p>
            The simplest input-output example is provided by the{" "}
            <MathInline>{String.raw`\ln x`}</MathInline> function. After
            compilation to EML form, we expect to obtain (5), although the
            simplest possible form is not expected in general. The equivalent
            RPN code for <MathInline>{String.raw`\ln`}</MathInline> is a
            sequence of <MathInline>{String.raw`K = 7`}</MathInline>{" "}
            instructions
          </p>
          <MathBlock>
            {String.raw`1,\, 1,\, x,\, \operatorname{eml},\, 1,\, \operatorname{eml},\, \operatorname{eml},`}
          </MathBlock>
          <p>
            or, denoting{" "}
            <MathInline>
              {String.raw`\operatorname{eml} \to \text{E}`}
            </MathInline>
            , the RPN string <code>11xE1EE</code>. For the expression tree, see
            Fig. 2 (on top).
          </p>
          <p>
            A few comments on the implementation are required. EML-compiled
            expressions work on the real axis, both positive and negative,
            except for a few isolated points, especially at zero and domain
            endpoints. Internal computations, for trigonometric functions in
            particular, must be done in the complex domain. Because the
            simplest form of the natural logarithm, (5), obtained from EML,
            (3), is equivalent to
          </p>
          <MathBlock>
            {String.raw`\ln z \;=\; e - \log\!\left(\frac{e^{e}}{z}\right),`}
          </MathBlock>
          <p>
            using the standard choice of principal branch for the complex
            logarithm, we obtain a jump of{" "}
            <MathInline>{String.raw`2\pi i`}</MathInline> for the negative real
            axis, due to the <MathInline>{String.raw`1/z`}</MathInline> term.
            This prevents the use of, e.g., some standard formulas for{" "}
            <MathInline>{String.raw`i`}</MathInline>, relying on{" "}
            <MathInline>{String.raw`\ln(-1) = i\pi`}</MathInline>, for which we
            get the wrong sign. A solution working for all real{" "}
            <MathInline>{String.raw`x \ne 0`}</MathInline> is to redefine the
            branch for EML itself in such a way that{" "}
            <MathInline>{String.raw`\ln z`}</MathInline> (and everything derived
            from it, cf. Fig. 1) follows the standard implementation of the
            principal branch. Another option, used in the EML compiler, is to
            manually correct the <MathInline>{String.raw`i`}</MathInline> sign.
          </p>
          <p>
            EML-compiled formulas work flawlessly in symbolic Mathematica and
            in IEEE-754 floating point, e.g. <code>&lt;math.h&gt;</code> in C.
            This is because some formulas internally might rely on the
            following properties of extended reals:
          </p>
          <MathBlock>
            {String.raw`\ln 0 = -\infty, \qquad e^{-\infty} = 0.`}
          </MathBlock>
          <p>
            These are properly implemented in Mathematica using symbolic
            processing, and in floating point using <code>inf</code> and signed
            zeros. But EML expressions in general do not work &quot;out of the
            box&quot; in, e.g., pure Python/Julia or numerical Mathematica. In
            the first case, this is because special floats are trapped and
            raise errors; however, EML works in NumPy [40] and PyTorch [41]. In
            Mathematica, we have an automatically extensible range of floats
            leading to <code>Overflow[]</code>. Interestingly, the Lean 4 proof
            assistant [42] takes a different approach. Because Lean requires
            all functions to be total, it assigns the complex logarithm at
            zero a default &quot;junk value&quot; (
            <code>Complex.log 0 = 0</code>), causing the straightforward
            formalisation of the EML chain to fail. As a bottom line I stress
            that all the above difficulties (edge cases) are not much different
            from those usually encountered in every kind of floating-point or
            symbolic computation. The EML compiler is available for testing
            under <code>EML_toolkit/EmL_compiler</code> in [39]; see also
            Supplementary Information, Sect. 4, &quot;Software and
            reproducibility&quot;.
          </p>

          <h3 id="circuits">
            4.2 Elementary functions as binary trees and analog circuits
          </h3>
          <p>
            Noteworthy: in EML notation, any elementary-function expression
            tree is binary. The context-free grammar is trivial:{" "}
            <MathInline>
              {String.raw`S \to 1 \mid \operatorname{eml}(S,S)`}
            </MathInline>
            . For functions, input variables are added as additional terminal
            symbols (e.g. <MathInline>{String.raw`x`}</MathInline> in the
            univariate case). This has many practical advantages over standard
            methods.
          </p>
          <p>
            Some simple examples of tree/circuit representations are shown in
            Fig. 2. The examples shown are natural logarithm, identity,
            negation{" "}
            <MathInline>
              {String.raw`\operatorname{minus}(x) = -x`}
            </MathInline>
            , reciprocal{" "}
            <MathInline>
              {String.raw`\operatorname{inv}(x) = 1/x`}
            </MathInline>
            , and multiplication. The ability to compute the identity function
            using an EML tree of depth 4 allows some input variables to be
            moved down the tree (see next subsection). Other elementary
            functions, e.g. trigonometric ones, have trees too large to be
            shown in print, cf. Table 4.
          </p>
          <figure className="not-prose my-6 rounded-md border border-border bg-card p-4">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              figure 2
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Examples of binary EML trees equivalent to a few important
              simplest formulas:{" "}
              <MathInline>{String.raw`\ln x`}</MathInline>,{" "}
              <MathInline>{String.raw`x`}</MathInline>,{" "}
              <MathInline>{String.raw`-x`}</MathInline>,{" "}
              <MathInline>{String.raw`x^{-1}`}</MathInline>, and{" "}
              <MathInline>{String.raw`xy`}</MathInline>. Dot marks output; since
              (3) is non-commutative, arrow chirality determines operation
              order (first counter-clockwise input after dot is{" "}
              <MathInline>{String.raw`\exp x`}</MathInline>, then{" "}
              <MathInline>{String.raw`\ln y`}</MathInline>). Try the same trees
              live in the{" "}
              <Link
                href="/playground"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                playground
              </Link>
              . (See{" "}
              <a
                href={`${PAPER_URL}#S4.F2`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                Fig. 2 on arXiv
              </a>
              .)
            </p>
          </figure>
          <p>
            Circuits using the EML operator as a new element (Table 3) might be
            useful for analog computing [8]. One of the old problems in this
            field is construction of predefined multivariate elementary
            functions [43]. Using the EML compiler (Sect. 4.1), we can convert
            any expression (Fig. 2) to such a circuit, with the topology of a
            binary tree. The EML tree provides a uniform treatment of generic
            elementary functions.
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            Table 3, EML Sheffer as a new kind of basic building block,
            alongside the NAND gate, operational amplifier, and transistor.
          </p>
          <div className="not-prose my-4 overflow-x-auto">
            <table className="w-full border-collapse border border-border font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="p-2">NAND gate</th>
                  <th className="p-2">Op-Amp</th>
                  <th className="p-2">Transistor</th>
                  <th className="p-2">EML Sheffer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-muted-foreground">D-shape with bubble output</td>
                  <td className="p-2 text-muted-foreground">Triangle with +/− inputs</td>
                  <td className="p-2 text-muted-foreground">BJT symbol</td>
                  <td className="p-2 text-muted-foreground">
                    Circular node with dot output; counter-clockwise inputs{" "}
                    <MathInline>{String.raw`\exp x`}</MathInline>,{" "}
                    <MathInline>{String.raw`\ln y`}</MathInline>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            Table 4, Complexity of various functions in EML tree
            representation. &quot;EML Compiler&quot; column gives the RPN code
            length <MathInline>{String.raw`K`}</MathInline> for expressions
            generated from the EML compiler. For the identity function{" "}
            <MathInline>{String.raw`x`}</MathInline>, the compiler returns{" "}
            <MathInline>{String.raw`x`}</MathInline> directly (leaf count 1);
            the shortest non-trivial EML expression has leaf count 9.
            &quot;Direct search&quot; shows the shortest expressions found by
            exhaustive search. Numbers in parentheses show the length of
            formulas which do not use the extended reals (
            <MathInline>{String.raw`\pm\infty`}</MathInline> in floating
            point). If the search timed out, the reached lower limit for{" "}
            <MathInline>{String.raw`K`}</MathInline> is given.
          </p>
          <div className="not-prose my-4 grid gap-4 md:grid-cols-3">
            {/* Constants */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="p-2 text-left">Constant</th>
                    <th className="p-2 text-right">Compiler</th>
                    <th className="p-2 text-right">Direct</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "1", "1 (1)"],
                    ["0", "7", "7 (7)"],
                    ["-1", "17", "15 (17)"],
                    ["2", "27", "19 (19)"],
                    ["-2", "43", "27 (27)"],
                    ["1/2", "91", "29 (35)"],
                    ["-1/2", "107", "31 (37)"],
                    ["2/3", "143", "39 (39)"],
                    ["-2/3", "159", "45 (47)"],
                    ["\\sqrt{2}", "165", ">47"],
                    ["i", "131", ">55"],
                    ["e", "3", "3"],
                    ["\\pi", "193", ">53"],
                  ].map(([sym, c, d]) => (
                    <tr key={sym} className="border-b border-border last:border-b-0">
                      <td className="p-2">
                        <MathInline>{sym}</MathInline>
                      </td>
                      <td className="p-2 text-right">{c}</td>
                      <td className="p-2 text-right">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Functions */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="p-2 text-left">Function</th>
                    <th className="p-2 text-right">Compiler</th>
                    <th className="p-2 text-right">Direct</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["x", "1", "9"],
                    ["e^{x}", "3", "3"],
                    ["\\ln x", "7", "7"],
                    ["-x", "57", "15"],
                    ["\\tfrac{1}{x}", "65", "15"],
                    ["x-1", "43", "11"],
                    ["x+1", "27", "19"],
                    ["x/2", "131", "27"],
                    ["2x", "131", "19"],
                    ["\\sqrt{x}", "139", "43 ≥? >35"],
                    ["x^{2}", "75", "17"],
                  ].map(([sym, c, d]) => (
                    <tr key={sym} className="border-b border-border last:border-b-0">
                      <td className="p-2">
                        <MathInline>{sym}</MathInline>
                      </td>
                      <td className="p-2 text-right">{c}</td>
                      <td className="p-2 text-right">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Operators */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="p-2 text-left">Operator</th>
                    <th className="p-2 text-right">Compiler</th>
                    <th className="p-2 text-right">Direct</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["x-y", "83", "11 (11)"],
                    ["x+y", "27", "19 (19)"],
                    ["x\\times y", "41", "17 (17)"],
                    ["x/y", "105", "17 (17)"],
                    ["x^{y}", "49", "25"],
                    ["\\log_x y", "117", "29"],
                    ["(x+y)/2", "287", ">27"],
                    ["x^{2}+y^{2}", "175", ">27"],
                  ].map(([sym, c, d]) => (
                    <tr key={sym} className="border-b border-border last:border-b-0">
                      <td className="p-2">
                        <MathInline>{sym}</MathInline>
                      </td>
                      <td className="p-2 text-right">{c}</td>
                      <td className="p-2 text-right">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 id="symbolic-regression">
            4.3 Symbolic Regression by continuous optimisation
          </h3>
          <p>
            Modern symbolic-regression (SR) methods [9, 10, 44] aim to discover
            closed-form expressions from data, but they typically search over
            heterogeneous grammars involving many distinct operators. Knowledge
            of a single operator, (3), which is sufficient to compute any
            elementary function, allows us to create a multiparameter
            &quot;master&quot; formula. Such a master formula, easily
            constructed in EML form due to the binary expression tree, for some
            combinations of its parameters, is equivalent to elementary
            functions. By construction, such a general tree includes all
            possible formulas up to the given leaf count (tree depth). These
            trees are big by the standards of a typical mathematical-analysis
            course, but small compared to what is in use in modern AI. For
            example, a full binary tree of depth{" "}
            <MathInline>{String.raw`n`}</MathInline> has a total of{" "}
            <MathInline>{String.raw`2^{n} - 1`}</MathInline> branches and{" "}
            <MathInline>{String.raw`2^{n}`}</MathInline> leaves. For the
            largest transformers with trillions (
            <MathInline>{String.raw`10^{12}`}</MathInline>) of parameters, the
            equivalent tree would have a depth of 40. The large values in
            Table 4 reflect the unoptimised prototype EML compiler
            (Subsect. 4.1); direct exhaustive search yields substantially
            shorter expressions, as the rightmost column demonstrates.
          </p>
          <p>
            The master formula can be constructed as follows. For simplicity we
            present the univariate case; the construction extends to an
            arbitrary number of input variables. Both inputs to{" "}
            <MathInline>{String.raw`\operatorname{eml}(x,y)`}</MathInline> can
            be: either 1, the input variable{" "}
            <MathInline>{String.raw`x`}</MathInline>, or the result from the
            previous <MathInline>{String.raw`\operatorname{eml}`}</MathInline>,
            which we denote <MathInline>{String.raw`f`}</MathInline>. Let us
            represent such a general input by a linear combination
          </p>
          <MathBlock>
            {String.raw`\alpha_i + \beta_i\, x + \gamma_i\, f. \tag{6}`}
          </MathBlock>
          <p>Setting specific values, we can recover all three cases:</p>
          <ul>
            <li>
              <MathInline>{String.raw`1`}</MathInline>, for{" "}
              <MathInline>
                {String.raw`\alpha_i = 1,\; \beta_i = 0,\; \gamma_i = 0`}
              </MathInline>
              ;
            </li>
            <li>
              <MathInline>{String.raw`x`}</MathInline>, for{" "}
              <MathInline>
                {String.raw`\alpha_i = 0,\; \beta_i = 1,\; \gamma_i = 0`}
              </MathInline>
              ;
            </li>
            <li>
              <MathInline>{String.raw`f`}</MathInline>, for{" "}
              <MathInline>
                {String.raw`\alpha_i = 0,\; \beta_i = 0,\; \gamma_i = 1`}
              </MathInline>
              .
            </li>
          </ul>
          <p>
            At the lowest tree level (leaves), there are only 1 and{" "}
            <MathInline>{String.raw`x`}</MathInline>, so there are no parameters{" "}
            <MathInline>{String.raw`\gamma_i`}</MathInline>.
          </p>
          <p>As an example, the full level-2 master formula is</p>
          <MathBlock>
            {String.raw`F(x) = \operatorname{eml}\!\left[\begin{array}{l}\alpha_1 + \beta_1 x + \gamma_1 \operatorname{eml}(\alpha_3 + \beta_3 x,\; \alpha_4 + \beta_4 x),\\[2pt]\alpha_2 + \beta_2 x + \gamma_2 \operatorname{eml}(\alpha_5 + \beta_5 x,\; \alpha_6 + \beta_6 x)\end{array}\right].`}
          </MathBlock>
          <p>
            If we set{" "}
            <MathInline>
              {String.raw`\alpha_1 = 0,\; \beta_1 = 1,\; \gamma_1 = 0`}
            </MathInline>{" "}
            and{" "}
            <MathInline>
              {String.raw`\alpha_2 = 1,\; \beta_2 = \gamma_2 = 0`}
            </MathInline>
            , we recover <MathInline>{String.raw`\exp(x)`}</MathInline>. Using{" "}
            <MathInline>{String.raw`\alpha_1 = \alpha_2 = 1`}</MathInline> and
            all{" "}
            <MathInline>{String.raw`\beta_i = \gamma_i = 0`}</MathInline>, we
            get the constant <MathInline>{String.raw`e`}</MathInline>. Setting{" "}
            <MathInline>
              {String.raw`\alpha_1 = \beta_1 = 0,\; \gamma_1 = 1`}
            </MathInline>
            ,{" "}
            <MathInline>
              {String.raw`\alpha_2 = 1,\; \beta_2 = \gamma_2 = 0`}
            </MathInline>
            ,{" "}
            <MathInline>
              {String.raw`\alpha_3 = 0,\; \beta_3 = 1,\; \gamma_3 = 0`}
            </MathInline>{" "}
            and{" "}
            <MathInline>
              {String.raw`\alpha_4 = 1,\; \beta_4 = \gamma_4 = 0`}
            </MathInline>
            , we obtain the double exponential{" "}
            <MathInline>{String.raw`\exp(e^{x})`}</MathInline>. The total number
            of parameters for the level-2 master formula is 14. In general, the
            level-<MathInline>{String.raw`n`}</MathInline> master formula has{" "}
            <MathInline>{String.raw`5 \times 2^{n} - 6`}</MathInline> parameters;
            see Supplementary Information, Part III.
          </p>
          <p>
            While one could, in principle, create such a master formula using
            more usual elementary functions (
            <MathInline>
              {String.raw`+, -, /, {}^{**}, \sin, \cos, \ldots`}
            </MathInline>
            , etc.), it would be ridiculously complicated and would lack any
            regular structure. Moreover, in practical SR one typically works
            with a reduced subset of operations, running the risk that the
            chosen set is incomplete, i.e., unable to express all elementary
            functions. The EML master formula is complete by design.
          </p>
          <p>
            The number of parameters in (6) can be reduced to two using some
            switch function. Or, alternatively, in a more modern approach, one
            can treat parameters{" "}
            <MathInline>{String.raw`\alpha_i, \beta_i, \gamma_i`}</MathInline>{" "}
            as logits, and pass them through the softmax function [45] to
            convert them into probabilities normalised to{" "}
            <MathInline>
              {String.raw`\alpha_i + \beta_i + \gamma_i = 1`}
            </MathInline>
            . In two examples below, I&apos;ll use both methods.
          </p>
          <p>
            The simplest proof of concept is provided by fitting numerical data
            obtained from an example elementary function, the{" "}
            <MathInline>{String.raw`\ln x`}</MathInline>, using the complete
            level-3 binary tree with the above structure. Using simplex
            reparameterisation, the number of free parameters reduces from 34
            to 20. I managed to find all weights using plain{" "}
            <code>NMinimize</code>, a &quot;black-box&quot; optimiser from
            Mathematica [33]. The mean-squared fitting error is at the level of
            numerical precision, and the resulting formula, after rounding
            weights to the nearest vertex of the simplex (i.e., snapping each
            to 0 or 1), is <strong>exactly</strong>{" "}
            <MathInline>{String.raw`\ln x`}</MathInline>. Not only in the
            provided data range, but also beyond that.
            Generalisation/extrapolation is nearly perfect in the above
            example. See the Wolfram Mathematica notebook{" "}
            <code>Log_fit.nb</code> from the EML toolkit [39] and Supplementary
            Information (Sect. III.B) for details.
          </p>
          <p>
            In practice, such a naive one-liner approach does not scale.
            Therefore, I performed several experiments using more recent
            techniques of Machine Learning. Simple functions of two variables,
            taken from composed EML, such as{" "}
            <MathInline>
              {String.raw`\ln(e - \ln(e^{x} - \ln y))`}
            </MathInline>
            , were used as targets. Python code was created, which used{" "}
            <code>DTYPE = torch.complex128</code> data type. Main issues
            encountered during training of the EML net were related to range
            overflow due to multiply composed exponentials, as well as
            floating-point errors (NaN) caused by the specific implementation
            of complex arithmetic. They can be eliminated by clamping arguments
            and values for <MathInline>{String.raw`\exp(x)`}</MathInline>, and
            careful (i.e., without impairing torch automatic differentiation)
            inspection of both real and imaginary parts. Parameters from (6)
            were treated as logits. Optimisation was a multi-stage process:
            first, usual training using a stochastic gradient optimiser (Adam),
            then a hardening phase pushing weights in (6) towards 0 or 1.
            Finally, weights were clamped to exact symbolic values.
          </p>
          <p>
            Systematic experiments (over 1000 runs with varied seeds and
            initialisation strategies) show that blind recovery from random
            initialisation succeeds in 100% of runs at depth 2, approximately
            25% at depths 3–4, and below 1% at depth 5. At depth 6, no blind
            recovery was observed in 448 attempts. When successful, the snapped
            weights yield mean squared errors at the level of machine epsilon
            squared (<MathInline>{String.raw`\sim 10^{-32}`}</MathInline>),
            consistent with exact symbolic recovery. Noteworthy, when the
            weights of the correct EML tree are perturbed by Gaussian noise,
            the optimisation converges back to the exact values in 100% of
            runs, even for trees of depth 5 and 6. This demonstrates that the
            EML tree representation is valid and that the correct basins of
            attraction exist. Finding them from random initialisation becomes
            harder with depth. If one manages to improve convergence of EML
            trees beyond proof of concept, possibly using another binary
            operator similar to (4) but with better properties (non-exponential
            asymptotics, no domain issues), then we could achieve symbolic
            regression of data using gradient-based methods [46]. See
            Supplementary Information for systematic training experiments, code
            and details.
          </p>

          {/* ─────────────── 5. CONCLUSIONS ─────────────── */}
          <h2 id="conclusions">5. Conclusions and open questions</h2>
          <p>
            The operator EML, (3), provides a single sufficient primitive from
            which real elementary functions can be constructed and evaluated.
            Consequently, a wide class of computations built from such
            functions can also be cast in EML form. It is not unique; several
            close variants are likely to exhibit similar properties, including
            EDL, (4b), and the swapped-argument form{" "}
            <MathInline>
              {String.raw`-\operatorname{eml}(y,x)`}
            </MathInline>
            , (4c). More operators of this kind exist. Perhaps an entire
            continuous family of them awaits discovery, with properties more
            convenient than (3). For example, the requirement for one of the
            constants: <MathInline>{String.raw`-\infty, 1, e, \ldots`}</MathInline>{" "}
            to be always present among terminal symbols makes its use less
            elegant and more complicated (cf. Subsect. 4.3) in comparison with,
            e.g., standard neural nets or the NAND gate. The latter is able to
            generate
            <sup>
              <a href="#fn3" className="text-primary no-underline hover:underline">
                3
              </a>
            </sup>{" "}
            0s and 1s out of &quot;anything&quot;. The EML operator does not
            have this useful property.
          </p>
          <p>
            Whether an EML-type binary Sheffer working without pairing with a
            distinguished constant exists is an open question. Proving such
            impossibility for any given candidate is non-trivial: one might
            expect <MathInline>{String.raw`f(x,x)`}</MathInline> being constant
            to suffice, but consider{" "}
            <MathInline>{String.raw`B(x,y) = x - \tfrac{y}{2}`}</MathInline>,
            for which{" "}
            <MathInline>{String.raw`B(x,x) = \tfrac{x}{2}`}</MathInline> yet{" "}
            <MathInline>{String.raw`B(B(x,x), x) = 0`}</MathInline>. Such traps
            illustrate why systematic search is essential in this work. A{" "}
            <em>ternary</em> operator,{" "}
            <MathInline>
              {String.raw`T(x,y,z) = \dfrac{e^{x}}{\ln x} \cdot \dfrac{\ln z}{e^{y}}`}
            </MathInline>
            , for which <MathInline>{String.raw`T(x,x,x) = 1`}</MathInline>, is
            the next candidate for further analysis [47].
          </p>
          <p>
            Whether a univariate Sheffer exists, serving simultaneously as a
            neural activation function [48] and as a generator of all
            elementary functions, remains open (see SI, Sect. 5).
          </p>
          <p>
            One might complain that the EML representation of elementary
            functions requires complex arithmetic for real math, at least
            internally. Just as quantum computing uses complex amplitudes to
            compute real probabilities, EML uses complex intermediates to
            compute real elementary functions. This seems inevitable. We must
            somehow compute the imaginary unit{" "}
            <MathInline>{String.raw`i`}</MathInline>,{" "}
            <MathInline>{String.raw`\pi`}</MathInline>, and all
            trigonometric/hyperbolic functions <em>via</em> Euler&apos;s
            formula, (2). For that, we use{" "}
            <MathInline>{String.raw`\ln x`}</MathInline> for{" "}
            <MathInline>{String.raw`x < 0`}</MathInline>. A continuous Sheffer
            working purely in the real domain seems impossible. My search for
            alternatives, e.g., using pairs of trigonometric/hyperbolic
            functions and their inverses instead of{" "}
            <MathInline>{String.raw`\exp/\ln`}</MathInline>, found nothing.
            Quite surprisingly, the requirement to use complex numbers
            internally causes only minor problems in practice of using (3) in
            Computer Algebra Systems or numerical simulations.
          </p>
          <p>
            Since standard activation functions are themselves elementary, any
            conventional neural network is a special case of an EML tree
            architecture. Current networks can learn symbolic algebra [49] and
            digit-level arithmetic [50], but their internal mechanisms remain
            opaque [11], and efficient exact evaluation of elementary functions
            as continuous real-valued operations is still beyond their reach.
            EML representations go further: as demonstrated in Subsect. 4.3,
            trained weights can snap to exact binary values, recovering
            closed-form elementary sub-expressions alongside approximations.
            When this succeeds, the discovered circuits are legible as
            elementary-function expressions, a form of interpretability
            unavailable to conventional architectures.
          </p>

          <h3 id="ai-disclosure">AI use disclosure</h3>
          <p>
            The core idea, the discovery of the EML Sheffer operator, the
            verification methodology, and results are entirely the
            author&apos;s own work. Large language models (including recent
            Claude, Grok, Gemini and ChatGPT) were used mainly for language
            editing and coding assistance.
          </p>

          <h3 id="data-availability">Data availability</h3>
          <p>
            Code, scripts, and supplementary reproducibility materials used to
            generate the figures, tables, and numerical results are available
            in the SymbolicRegressionPackage repository [39]. An archival
            snapshot of the exact submission version is deposited in Zenodo,
            DOI:{" "}
            <a
              href="https://doi.org/10.5281/zenodo.19183008"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-1 underline-offset-2"
            >
              10.5281/zenodo.19183008
            </a>
            . The archival package contains the source code, scripts, and
            README files needed to rerun the reported results.
          </p>

          <h3 id="acknowledgments">Acknowledgments</h3>
          <p>
            Computational resources were partially provided by Google Cloud
            Research Credits.
          </p>

          <h3 id="supplementary">Supplementary Information</h3>
          <p>
            An extensive three-part Supporting Information is supplied as a
            separate SI Appendix PDF on arXiv.
          </p>

          {/* ─────────────── FOOTNOTES ─────────────── */}
          <div className="not-prose my-8 border-t border-border pt-6 text-xs text-muted-foreground">
            <div className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em]">
              footnotes
            </div>
            <ol className="space-y-2">
              <li id="fn1">
                <sup>1</sup> From German <em>ein Stein</em>, &quot;one
                tile,&quot; not after Albert Einstein.
              </li>
              <li id="fn2">
                <sup>2</sup> Exponentiation, unlike the four basic arithmetic
                operations that are almost always built in as primitive
                operators, has often been treated as a higher-level operation
                exposed via library functions rather than as a dedicated infix
                operator.
              </li>
              <li id="fn3">
                <sup>3</sup> E.g.,{" "}
                <MathInline>
                  {String.raw`1 \equiv \text{NAND}(x, \text{NAND}(x, x))`}
                </MathInline>
                . In practice, one will rarely use this property. Usually, we
                use directly available 0s and 1s, e.g. GND and{" "}
                <MathInline>{String.raw`V_{cc}`}</MathInline> in digital
                circuits.
              </li>
            </ol>
          </div>

          {/* ─────────────── REFERENCES ─────────────── */}
          <h2 id="references">References</h2>
          <ol className="space-y-3 text-sm">
            <li>
              W. H. Press, S. A. Teukolsky, W. T. Vetterling, B. P. Flannery.{" "}
              <em>Numerical Recipes: The Art of Scientific Computing</em>.
              Cambridge University Press, 3rd ed., 2007. ISBN 978-0-521-88068-8.
            </li>
            <li>
              H. M. Sheffer. A set of five independent postulates for Boolean
              algebras, with application to logical constants.{" "}
              <em>Trans. Amer. Math. Soc.</em>, 14(4):481–488, 1913.
            </li>
            <li>
              J. Napier. <em>Mirifici Logarithmorum Canonis Descriptio</em>.
              Andrew Hart, Edinburgh, 1614.
            </li>
            <li>
              H. Briggs. <em>Arithmetica Logarithmica</em>. London, 1624.
            </li>
            <li>
              R. Cotes.{" "}
              <em>
                Harmonia Mensurarum, sive Analysis & Synthesis per Rationum &
                Angulorum Mensuras Promotae
              </em>
              . Cambridge, 1722 (posthumous; ed. R. Smith).
            </li>
            <li>
              J. Liouville. Mémoire sur l&apos;intégration d&apos;une classe de
              fonctions transcendantes.{" "}
              <em>
                J. f. d. reine u. angew. Math. (Crelle)
              </em>
              , 13:93–118, 1835.
            </li>
            <li>
              J. F. Ritt.{" "}
              <em>
                Integration in Finite Terms: Liouville&apos;s Theory of
                Elementary Methods
              </em>
              . Columbia University Press, 1948.
            </li>
            <li>
              B. Ulmann. <em>Analog Computing</em>. De Gruyter Oldenbourg, 2022.
              ISBN 9783110787740.
            </li>
            <li>
              S.-M. Udrescu, M. Tegmark. AI Feynman: A physics-inspired method
              for symbolic regression. <em>Science Advances</em>, 6(16):eaay2631,
              2020.
            </li>
            <li>
              M. Cranmer et al. Discovering symbolic models from deep learning
              with inductive biases. <em>NeurIPS</em>, 33:17429–17442, 2020.
            </li>
            <li>
              Z. Liu et al. KAN: Kolmogorov–Arnold networks. <em>ICLR</em>, 2025.
            </li>
            <li>
              J. Łukasiewicz. <em>Elements of Mathematical Logic</em>. Pergamon,
              1963 (English translation of{" "}
              <em>Elementy logiki matematycznej</em>, 1929).
            </li>
            <li>
              H. S. Black. Stabilized feedback amplifiers.{" "}
              <em>Bell Syst. Tech. J.</em>, 13(1):1–18, 1934.
            </li>
            <li>
              V. Nair, G. E. Hinton. Rectified linear units improve restricted
              Boltzmann machines. <em>ICML</em>, pp. 807–814, 2010.
            </li>
            <li>
              I. Goodfellow, Y. Bengio, A. Courville. <em>Deep Learning</em>.
              MIT Press, 2016.
            </li>
            <li>
              S. Wolfram. <em>A New Kind of Science</em>. Wolfram Media, 2002.
            </li>
            <li>
              M. Schönfinkel. Über die Bausteine der mathematischen Logik.{" "}
              <em>Math. Annalen</em>, 92(3):305–316, 1924.
            </li>
            <li>
              H. B. Curry, R. Feys. <em>Combinatory Logic</em>. North-Holland,
              1958.
            </li>
            <li>
              Y. Lafont. Interaction combinators. <em>Inf. Comput.</em>,
              137(1):69–101, 1997.
            </li>
            <li>
              M. Baczyński, P. Berruezo, P. Helbin, S. Massanet, W. Niemyska,
              D. Ruiz-Aguilera. On the Sheffer stroke operation in fuzzy logic.{" "}
              <em>Fuzzy Sets and Systems</em>, 431:110–128, 2022.
            </li>
            <li>
              O. Mazonka, A. Kolodin. A simple multi-processor computer based
              on SUBLEQ. arXiv:1106.2593, 2011.
            </li>
            <li>
              J. H. Conway. FRACTRAN: a simple universal programming language
              for arithmetic. In{" "}
              <em>Open Problems in Communication and Computation</em>, pp. 4–26,
              Springer, 1987.
            </li>
            <li>
              M. Cook. Universality in elementary cellular automata.{" "}
              <em>Complex Systems</em>, 15(1):1–40, 2004.
            </li>
            <li>
              B. Linsky.{" "}
              <em>
                The Evolution of Principia Mathematica: Bertrand Russell&apos;s
                Manuscripts and Notes for the Second Edition
              </em>
              . Cambridge University Press, 2011.
            </li>
            <li>
              F. H. C. Crick, J. D. Watson. Genetical implications of the
              structure of deoxyribonucleic acid. <em>Nature</em>,
              171(4361):964–967, 1953.
            </li>
            <li>
              D. Smith, J. S. Myers, C. S. Kaplan, C. Goodman-Strauss. An
              aperiodic monotile. <em>Combinatorial Theory</em>, 4(1), 2024.
            </li>
            <li>
              A. Odrzywołek. How to build the perfect igloo. <em>Eureka</em>,
              63:1001110–1001111, 2014.
            </li>
            <li>
              E. Fehlberg. Klassische Runge-Kutta-Formeln vierter und niedrigerer
              Ordnung mit Schrittweiten-Kontrolle und ihre Anwendung auf
              Wärmeleitungsprobleme. <em>Computing</em>, 6(1):61–71, 1970.
            </li>
            <li>
              H. Takahasi, M. Mori. Double exponential formulas for numerical
              integration. <em>Publ. RIMS</em>, 9(3):721–741, 1974.
            </li>
            <li>
              J. W. Cooley, J. W. Tukey. An algorithm for the machine
              calculation of complex Fourier series.{" "}
              <em>Math. Comp.</em>, 19(90):297–301, 1965.
            </li>
            <li>
              J. Shackell. Growth estimates for exp–log functions.{" "}
              <em>J. Symbolic Computation</em>, 10(6):611–632, 1990.
            </li>
            <li>
              D. Richardson, B. Salvy, J. Shackell, J. van der Hoeven. Asymptotic
              expansions of exp-log functions. INRIA Tech. Rep. RR-2859, 1996.
            </li>
            <li>
              Wolfram Research Inc. <em>Mathematica</em>, Version 14.3,
              Champaign IL, 2025.
            </li>
            <li>
              D. Finkel. Broken calculator warm up.{" "}
              <a
                href="https://mathforlove.com/lesson/broken-calculator-warmup/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                mathforlove.com
              </a>
              , 2017.
            </li>
            <li>
              D. J. Newman. <em>A Problem Seminar</em>. Springer, 1982. ISBN
              0-387-90765-3.
            </li>
            <li>
              B. Naskrecki, K. Ono. Mathematical discovery in the age of
              artificial intelligence. <em>Nature Physics</em>, 21(10):
              1504–1506, 2025.
            </li>
            <li>
              A. N. Kolmogorov. Three approaches to the quantitative definition
              of information.{" "}
              <em>Problems of Information Transmission</em>, 1(1):1–7, 1965.
            </li>
            <li>
              G. Terzo. Some consequences of Schanuel&apos;s conjecture in
              exponential rings. <em>Comm. Algebra</em>, 36(3):1171–1189, 2008.
            </li>
            <li>
              A. Odrzywołek. SymbolicRegressionPackage: basic building blocks
              for symbolic regression.{" "}
              <a
                href="https://github.com/VA00/SymbolicRegressionPackage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                github.com/VA00/SymbolicRegressionPackage
              </a>
              , 2026. (Includes EML toolkit.)
            </li>
            <li>
              C. R. Harris et al. Array programming with NumPy.{" "}
              <em>Nature</em>, 585(7825):357–362, 2020.
            </li>
            <li>
              A. Paszke et al. PyTorch: an imperative style, high-performance
              deep learning library. <em>NeurIPS 32</em>, pp. 8024–8035, 2019.
            </li>
            <li>
              L. de Moura, S. Ullrich. The Lean 4 theorem prover and programming
              language. <em>CADE 28</em>, pp. 625–635, 2021.
            </li>
            <li>
              B. Ulmann. Beyond zeros and ones, analog computing in the
              twenty-first century.{" "}
              <em>
                Int. J. Parallel, Emergent and Distributed Systems
              </em>
              , 39(2):139–151, 2024.
            </li>
            <li>
              M. Cranmer. Interpretable machine learning for science with PySR
              and SymbolicRegression.jl, 2023. arXiv:2305.01582.
            </li>
            <li>
              E. Jang, S. Gu, B. Poole. Categorical reparameterization with
              Gumbel-Softmax. <em>ICLR</em>, 2017.
            </li>
            <li>
              B. K. Petersen, M. Landajuela, T. N. Mundhenk, C. P. Santiago,
              S. Kim, J. T. Kim. Deep symbolic regression: recovering
              mathematical expressions from data via risk-seeking policy
              gradients. <em>ICLR</em>, 2021.
            </li>
            <li>
              A. Odrzywołek. A ternary Sheffer operator for elementary
              functions? <em>Acta Physica Polonica B</em>, 2026 (in preparation).
            </li>
            <li>
              S. R. Dubey, S. K. Singh, B. B. Chaudhuri. Activation functions in
              deep learning: a comprehensive survey and benchmark.{" "}
              <em>Neurocomputing</em>, 503:92–108, 2022.
            </li>
            <li>
              G. Lample, F. Charton. Deep learning for symbolic mathematics.{" "}
              <em>ICLR</em>, 2020.
            </li>
            <li>
              N. Lee, K. Sreenivasan, J. D. Lee, K. Lee, D. Papailiopoulos.
              Teaching arithmetic to small transformers. <em>ICLR</em>, 2024.
            </li>
          </ol>

          <div className="not-prose mt-16 border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
            <div className="text-muted-foreground/70">end of paper</div>
            <p className="mt-2 text-foreground">
              <span className="text-primary">&gt;</span> next: try the trees in
              the{" "}
              <Link
                href="/playground"
                className="text-primary underline decoration-1 underline-offset-2"
              >
                playground
              </Link>
              .
            </p>
          </div>
        </article>
      </div>
      <TocMobileBar entries={toc} />
    </>
  );
}
