---
description: "Build, verify, and push to deploy the site"
user-invocable: true
---

# /deploy

Build the site, verify the output, and push to deploy via GitHub Actions.

## Steps

1. **Type check**: Run `bunx astro check` and fix any errors
2. **Build**: Run `bun run build` — must succeed with no errors
3. **Verify CNAME**: Check that `dist/CNAME` exists and contains `makerfirst.ca`
4. **Verify output**: Check that `dist/index.html` exists
5. **Stage files**: `git add` all relevant changed files
6. **Commit**: Create a descriptive commit message
7. **Push**: `git push origin main` — triggers GitHub Actions deployment

## Pre-flight Checks

- Ensure no placeholder content (grep for "Lorem", "TODO", "FIXME")
- Ensure CNAME is in `public/` (gets copied to `dist/`)
- Ensure build produces no warnings about missing assets

## Rollback

If the deploy fails:
1. Check GitHub Actions logs: `gh run list --limit 1`
2. View details: `gh run view <run-id>`
3. Fix issues and re-deploy
