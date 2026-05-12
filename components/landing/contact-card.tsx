"use client";

import { useState } from "react";

type Row = {
  key: string;
  label: string;
  value: string;
  href: string;
};

const rows: Row[] = [
  {
    key: "github",
    label: "GITHUB ",
    value: "github.com/prashantbsr",
    href: "https://github.com/prashantbsr",
  },
  {
    key: "website",
    label: "WEBSITE",
    value: "prashant.pensievelabs.org",
    href: "https://prashant.pensievelabs.org",
  },
];

export function ContactCard() {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* clipboard unavailable */
    }
  }

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
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              handleCopy(row.key, row.value);
            }}
            aria-label={`Copy ${row.value} (cmd-click to open)`}
          >
            <span className={`cc-value cc-v-${row.key}`}>
              <span className="cc-mark1" aria-hidden />
              <span className="cc-mark2" aria-hidden />
              <span className="cc-txt">{row.value}</span>
            </span>
          </a>
          <span className="cc-copytag" aria-live="polite">
            {copied === row.key ? "copied ✓" : "↵ copy"}
          </span>
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
