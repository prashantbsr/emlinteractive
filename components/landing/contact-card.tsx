type Row = {
  key: string;
  label: string;
  value: string;
  display?: string;
  href: string;
};

const rows: Row[] = [
  {
    key: "github",
    label: "GITHUB  ",
    value: "github.com/prashantbsr",
    href: "https://github.com/prashantbsr",
  },
  {
    key: "website",
    label: "WEBSITE ",
    value: "prashant.pensievelabs.org",
    href: "https://prashant.pensievelabs.org",
  },
  {
    key: "email",
    label: "EMAIL   ",
    value: "ceo@pensievelabs.org",
    href: "mailto:ceo@pensievelabs.org",
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    value: "www.linkedin.com/in/dr-prashant-sharma-pensieve-trishulguy",
    display: "Dr. Prashant Sharma on LinkedIn",
    href: "https://www.linkedin.com/in/dr-prashant-sharma-pensieve-trishulguy",
  },
];

export function ContactCard() {
  return (
    <aside className="contact-card not-prose">
      <div className="cc-grain" aria-hidden />
      <pre className="cc-line">
        <span className="cc-prompt">you@desk:~$</span>
        <span className="cc-cmd"> whoami</span>
      </pre>
      <div className="cc-spacer" />
      <pre className="cc-name">prashant</pre>
      <pre className="cc-sub">// Pensieve Labs</pre>
      <div className="cc-spacer" />
      <pre className="cc-line">
        <span className="cc-prompt">you@desk:~$</span>
        <span className="cc-cmd"> cat ./contact.txt</span>
      </pre>
      <div className="cc-spacer" />
      {rows.map((row) => (
        <div className="cc-row" key={row.key}>
          <span className="cc-label">{`  ${row.label}    →   `}</span>
          <a
            href={row.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cc-value-wrap"
          >
            <span className={`cc-value cc-v-${row.key}`}>
              <span className="cc-mark1" aria-hidden />
              <span className="cc-mark2" aria-hidden />
              <span className="cc-txt">{row.display ?? row.value}</span>
            </span>
          </a>
        </div>
      ))}
      <div className="cc-spacer" />
      <pre className="cc-line">
        <span className="cc-prompt">you@desk:~$</span>
        <span className="cc-cmd"> </span>
        <span className="cc-cursor" aria-hidden />
      </pre>
    </aside>
  );
}
