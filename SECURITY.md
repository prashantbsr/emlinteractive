# Security Policy

EMLinteractive is a static, client-side learning playground. It has no backend, no user accounts, no database, and no server-side rendering — the build output is plain HTML/JS/CSS served from GitHub Pages. The realistic attack surface is therefore small: third-party JS dependencies, MDX content rendering, and the small amount of `dangerouslySetInnerHTML` used to inline the theme-init script in `app/layout.tsx`.

That said, if you find something worth reporting, please do.

## Supported versions

Only the latest commit on `master` is supported. There are no LTS branches.

## Reporting a vulnerability

**Please do not open a public issue for security reports.** Use one of the following private channels:

1. **GitHub private vulnerability reporting** (preferred):
   [https://github.com/prashantbsr/emlinteractive/security/advisories/new](https://github.com/prashantbsr/emlinteractive/security/advisories/new)
2. A direct message to the maintainer via GitHub.

When reporting, please include:

- A clear description of the issue and the impact you believe it has.
- A minimal reproduction (URL, input, or steps).
- The browser / Node version where you observed it, if relevant.
- Your assessment of severity and any suggested mitigation.

## What to expect

- **Acknowledgement**: within 7 days.
- **Initial assessment**: within 14 days — whether we consider the report in-scope and a rough severity.
- **Fix or decision**: as soon as practical. Because this is a small hobby project, please be patient; if the issue is in an upstream dependency, the fix may depend on that project's release cadence.
- **Disclosure**: once a fix is shipped, we will credit you in the release notes (unless you prefer to remain anonymous).

## Out of scope

- Reports generated automatically by scanners with no demonstrated impact.
- Missing security headers on the GitHub Pages host (controlled by GitHub, not this project).
- Issues that require physical access, a compromised browser, or a malicious extension installed by the user.
- Self-XSS that requires the victim to paste attacker-supplied code into devtools.

## Dependencies

Dependency vulnerabilities are tracked via GitHub Dependabot. If you find a critical issue in a pinned dependency that is not yet flagged upstream, a report through the channels above is welcome.
