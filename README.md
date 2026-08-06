# José P. Barrantes, Portfolio

Personal portfolio site. Static HTML/CSS/JS, no build step, deployed on GitHub Pages.

## Structure

```
index.html              Single page: hero, experience, talks, projects, writing, skills, contact
css/styles.css          Design tokens (dark + light) + all styles (incl. print stylesheet)
js/main.js              Theme switch, filters, scroll reveal, scrollspy, mobile nav, email obfuscation
og-cover.png            1200x630 social preview card
JoseP_resume_2026.pdf   Descriptive filename (recruiters save it as-is)
robots.txt / sitemap.xml
```

## Editing notes

- **Adding a project:** copy a `.project-card` block in `#projects`. Set `data-labels`
  to a comma-separated subset of `ml-eng, data-eng, stats, data-sci, mlops, api`
  so the filter picks it up, and set `--card-accent` to the matching label colour.
- **Themes:** dark is the default; light lives in the `:root[data-theme='light']`
  block. The inline script in `<head>` resolves the theme *before first paint*
  (`localStorage.theme`, else the OS `prefers-color-scheme`), so there is no flash
  of the wrong theme. Keep it inline and keep it first. Without JS the site stays
  dark by design. Any new colour needs a value in **both** token blocks.
- **Colours:** all tokens live at the top of `css/styles.css`, in two blocks (dark,
  light). Two variants per accent: `--label-x` for fills, rules and 3px accents;
  `--label-x-text` for anything you actually read. The plain variants fail WCAG AA
  as small text (brand red is 3.2:1 on `#1a1a1a`; `--label-stats` purple is 3.0:1).
  Note that a label's own 12-16% tint darkens the surface under it, so check text
  against the *composited* background, not the card colour. That is what pushed
  the light-theme labels down to values like `#0c6858`.
- **Email:** assembled at runtime in `js/main.js` to keep it out of the HTML source
  for scrapers. Update the `u` and `d` variables there.
- **Resume:** the filename is deliberately descriptive so it stays identifiable in a
  recruiter's downloads folder. When the year rolls over, rename the PDF and update
  **four** `href`s. Grep for `resume`: nav button (opens in a tab for reading),
  hero CTA and contact button (both `download`), experience footnote.
- **Adding a nav link:** just add the `<li>`. The mobile drop-down is capped at
  `100svh - nav-height` with `overflow-y: auto`, so it can no longer clip the last
  item the way the old fixed `max-height: 420px` did at eight links.
- **Social card:** regenerate `og-cover.png` if the headline or role changes, then
  re-scrape at LinkedIn Post Inspector / X Card Validator to bust their caches.

## Checks worth re-running after edits

- Contrast: small text should hit 4.5:1 **in both themes**, measured against the
  surface it actually sits on (page, card, or its own tint).
- Keyboard: first Tab should reveal the skip link; filter buttons announce counts
  via the `.filter-status` live region; Escape closes the mobile menu.
- Mobile: no horizontal overflow at 390px. Chrome headless clamps its viewport to
  500px, so test narrower widths in a sized iframe rather than `--window-size`.
- Print (`Cmd-P` → preview): every section must be visible. `.reveal` starts at
  `opacity: 0` and only clears on scroll, so the print block force-resets it.
  Without that, printing before scrolling to the bottom yields blank sections.
  Expect ~9 pages.

## License

MIT (see LICENSE).
