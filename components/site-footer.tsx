export function SiteFooter() {
  return (
    <footer
      className="raised mt-2 font-mono text-xs"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="flex flex-col gap-1 px-3 py-2 md:flex-row md:items-center md:justify-between"
        style={{ color: "var(--dim)" }}
      >
        <p>
          based on{" "}
          <a
            href="https://arxiv.org/html/2603.21852v2"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-2 hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] hover:no-underline"
            style={{ color: "var(--link)" }}
          >
            All Elementary Functions from a Single Operator
          </a>
          , A. Odrzywołek (2026)
        </p>
        <p>exp(x) − ln(y) is all you need</p>
      </div>
    </footer>
  );
}
