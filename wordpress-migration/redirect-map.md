# URL Redirect Map

Every current URL, its WordPress target, and whether a redirect is actually needed. Goal: **zero redirects for anything already indexed**, since a redirect chain resets ranking momentum that took multiple sessions of AEO/schema/content work to build.

Legend: ✅ = matches exactly, no redirect needed · ⚠️ = needs the `.html`-suffix rewrite from `README.md` §3 to avoid a redirect · — = not a real indexable page

## Pages (directory-style URLs — match by default if slugs are set correctly)

| Current URL | WordPress target | Status |
|---|---|---|
| `/` | `/` (Front Page) | ✅ |
| `/about/` | `/about/` (Page, slug `about`) | ✅ |
| `/contact/` | `/contact/` (Page, slug `contact`) | ✅ |
| `/seo-search-growth/` | `/seo-search-growth/` | ✅ |
| `/paid-media-ppc/` | `/paid-media-ppc/` | ✅ |
| `/it-infrastructure-growth/` | `/it-infrastructure-growth/` | ✅ |
| `/content-marketing/` | `/content-marketing/` | ✅ |
| `/social-media-marketing/` | `/social-media-marketing/` | ✅ |
| `/marketing-automation/` | `/marketing-automation/` | ✅ |
| `/conversion-rate-optimization/` | `/conversion-rate-optimization/` | ✅ |
| `/wikipedia-page-creation/` | `/wikipedia-page-creation/` | ✅ |
| `/us/` | `/us/` | ✅ |
| `/uk/` | `/uk/` | ✅ |
| `/uae/` | `/uae/` | ✅ |
| `/germany/` | `/germany/` | ✅ |
| `/mumbai/` | `/mumbai/` | ✅ |
| `/bangalore/` | `/bangalore/` | ✅ |
| `/delhi/` | `/delhi/` | ✅ |
| `/pune/` | `/pune/` | ✅ |
| `/blog/` | `/blog/` (Posts page) | ✅ |

**Action required:** when creating each WordPress Page, set the slug field explicitly to match — don't let WordPress auto-generate it from a differently-worded title, since a title like "About Rewansh Kayare | Digital Marketing Consultant..." would auto-slug to something wrong.

## Blog posts (25) — the real risk

| Current URL | WordPress target (with `.html` rewrite) | WordPress target (without it) |
|---|---|---|
| `/blog/how-to-increase-organic-traffic.html` | `/blog/how-to-increase-organic-traffic.html` ✅ | `/blog/how-to-increase-organic-traffic/` ⚠️ needs 301 |
| `/blog/how-to-lower-customer-acquisition-cost.html` | same pattern ✅ | same pattern ⚠️ |
| `/blog/marketing-audit-checklist.html` | ✅ | ⚠️ |
| `/blog/how-to-scale-a-d2c-brand.html` | ✅ | ⚠️ |
| `/blog/ai-digital-marketing-trends.html` | ✅ | ⚠️ |
| `/blog/digital-marketing-consultant-vs-agency-vs-freelancer.html` | ✅ | ⚠️ |
| `/blog/paid-media-budget-framework.html` | ✅ | ⚠️ |
| `/blog/social-media-marketing-strategy-d2c-saas.html` | ✅ | ⚠️ |
| `/blog/which-countries-remote-marketing-consultant.html` | ✅ | ⚠️ |
| `/blog/answer-engine-optimization-guide.html` | ✅ | ⚠️ |
| `/blog/digital-marketing-consultant-cost-us.html` | ✅ | ⚠️ |
| `/blog/gdpr-compliant-marketing-automation-germany.html` | ✅ | ⚠️ |
| `/blog/google-ads-benchmarks-uae.html` | ✅ | ⚠️ |
| `/blog/seo-agency-vs-consultant-uk.html` | ✅ | ⚠️ |
| `/blog/marketing-automation-tools-canada.html` | ✅ | ⚠️ |
| `/blog/seo-for-australian-d2c-brands.html` | ✅ | ⚠️ |
| `/blog/paid-media-benchmarks-singapore-b2b-saas.html` | ✅ | ⚠️ |
| `/blog/conversion-rate-benchmarks-by-industry.html` | ✅ | ⚠️ |
| `/blog/digital-marketing-trends-indian-startups-2026.html` | ✅ | ⚠️ |
| `/blog/technical-seo-priorities-b2b-saas-founders.html` | ✅ | ⚠️ |
| `/blog/when-to-hire-growth-marketing-consultant-saas.html` | ✅ | ⚠️ |
| `/blog/lower-b2b-saas-cac-without-cutting-lead-volume.html` | ✅ | ⚠️ |
| `/blog/seo-vs-paid-ads-b2b-saas-which-first.html` | ✅ | ⚠️ |
| `/blog/b2b-saas-content-marketing-pipeline-not-traffic.html` | ✅ | ⚠️ |

**Rule:** the WordPress post slug must exactly match the current filename minus `.html` (e.g. file `ai-digital-marketing-trends.html` → post slug `ai-digital-marketing-trends`). `content-export.xml` already sets every slug this way — don't let WordPress regenerate any of them on import.

**If the `.html` rewrite (README.md §3) isn't implemented:** every row above needs an individual 301 redirect from the `.html` URL to the trailing-slash URL. Set these up in Rank Math's redirect manager or the Redirection plugin *before* removing the old static site from public access, so there's no window where these URLs 404.

## Legal pages

| Current URL | WordPress target | Status |
|---|---|---|
| `/legal/privacy-policy.html` | `/legal/privacy-policy.html` (with `.html` rewrite applied to Pages too) or `/legal/privacy-policy/` | ⚠️ needs same rewrite treatment, or accept a redirect — these carry minimal backlink/ranking value so a redirect here is lower-stakes than on blog posts |
| `/legal/terms-of-service.html` | same pattern | ⚠️ |

## Not real URLs — no redirect needed

- `404.html` — WordPress's own 404 template handles this natively; port over the current 404 page's copy/design as the theme's `404.php` or Elementor's 404 template, but there's no URL to redirect
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` — these are files at the domain root, not WordPress content; re-upload as static files after DNS cutover (sitemap.xml gets replaced by Rank Math's generated one instead — see README.md §4)
