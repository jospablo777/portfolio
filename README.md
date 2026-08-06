# José P. Barrantes — Portfolio

Personal portfolio site. Static HTML/CSS/JS, no build step, deployed on GitHub Pages.

## Structure

```
index.html              Single page: hero, experience, talks, projects, writing, skills, contact
css/styles.css          Design tokens + all styles (incl. print stylesheet)
js/main.js              Filters, scroll reveal, scrollspy, mobile nav, email obfuscation
og-cover.png            1200x630 social preview card
JoseP_resume_2026.pdf   Descriptive filename (recruiters save it as-is)
robots.txt / sitemap.xml
```

## Editing notes

- **Adding a project:** copy a `.project-card` block in `#projects`. Set `data-labels`
  to a comma-separated subset of `ml-eng, data-eng, stats, data-sci, mlops, api`
  so the filter picks it up, and set `--card-accent` to the matching label colour.
- **Colours:** all tokens live at the top of `css/styles.css`. Use `--accent-red-text`
  (not `--accent-red`) for small text on dark surfaces — the brand red fails WCAG AA
  below ~18px.
- **Email:** assembled at runtime in `js/main.js` to keep it out of the HTML source
  for scrapers. Update the `u` and `d` variables there.
- **Resume:** the filename is deliberately descriptive so it stays identifiable in a
  recruiter's downloads folder. When the year rolls over, rename the PDF and update
  the two `href`s that point at it (hero CTA, experience footnote) — grep for
  `resume` to find both.
- **Social card:** regenerate `og-cover.png` if the headline or role changes, then
  re-scrape at LinkedIn Post Inspector / X Card Validator to bust their caches.

## Checks worth re-running after edits

- Contrast: small text should hit 4.5:1 against `#0d0d0d` and `#1a1a1a`.
- Keyboard: first Tab should reveal the skip link; filter buttons announce counts
  via the `.filter-status` live region.
- Mobile: no horizontal overflow at 390px.

## License

MIT (see LICENSE).
