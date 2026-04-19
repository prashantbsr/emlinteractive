export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-2 py-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          <span className="text-muted-foreground/70">//</span> based on{" "}
          <a
            href="https://arxiv.org/html/2603.21852v2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-dotted underline-offset-4 hover:text-primary"
          >
            All Elementary Functions from a Single Operator
          </a>{" "}
          — A. Odrzywołek (2026)
        </p>
        <p className="text-muted-foreground/80">
          exp(x) − ln(y) is all you need
        </p>
      </div>
    </footer>
  );
}
