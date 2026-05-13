<!--
Thanks for the contribution! A few notes before you submit:

  - For substantial changes, please open an issue or discussion first so we can
    align on direction.
  - See CONTRIBUTING.md for the development setup and pre-PR checks.
-->

## Summary

<!-- One or two sentences on what this PR does and why. -->

## Type of change

- [ ] Bug fix
- [ ] New feature / enhancement
- [ ] New or shorter EML decomposition (touches `lib/eml/library.ts`)
- [ ] Knowledge-base article (`content/knowledge-base/`)
- [ ] Refactor / internal cleanup (no behaviour change)
- [ ] Documentation only
- [ ] Build / CI / tooling

## Related issue

<!-- Link the issue this PR closes, e.g. "Closes #123". Omit if there isn't one. -->

## Checks

Before requesting review, please confirm:

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] For changes to `lib/eml/library.ts` or any verified decomposition: a test in `lib/eml/library.test.ts` verifies the tree against the JS `Math` reference within `1e-9`.

## Notes for reviewers

<!-- Screenshots, design decisions, trade-offs, follow-up work, etc. -->
