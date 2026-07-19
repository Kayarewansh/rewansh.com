# WordPress + Elementor Migration Guide

Prep work for moving rewansh.com off static HTML/GitHub Pages onto self-hosted WordPress + Elementor. This branch contains everything that can be built *before* hosting exists — content, structure, and a technical plan — so the actual build is fast once WordPress is live.

**Nothing here is live.** This is planning + portable content, done on a separate branch so it never touches the current production static site on `main`.

## 1. What's in this folder

- `README.md` — this file
- `redirect-map.md` — every current URL, its new WordPress URL, and whether a redirect is needed
- `content-export.xml` — a WordPress WXR file (Tools → Import → WordPress format) containing all 25 blog posts + the 2 legal pages, ready to bulk-import as-is
- `page-briefs/` — one structured brief per page/page-group for the pages that need real Elementor design work (home, about, contact, the 8 services, the 8 location pages), since those don't reduce to a clean XML import the way article content does

## 2. Hosting & plugin checklist

Do these in order once hosting is chosen (see prior recommendation: SiteGround GrowBig or Cloudways):

1. Install WordPress
2. Install and activate **Elementor** + **Elementor Pro** (Pro is required — the free tier can't do header/footer templates or the Forms widget, both needed here)
3. Install **Rank Math** or **Yoast SEO** (replaces the hand-coded meta tags/canonical/sitemap currently in each HTML file)
4. Install **WPCode** (or equivalent) for the GA4 gtag script and the WhatsApp-click tracking snippet — see §5
5. Install a caching plugin (**WP Rocket**, or whatever the host bundles) — do this before launch, not after. WordPress is slower than static HTML by default, and the current site has real Core Web Vitals investment behind it (see the SEO work in git history) that a slow WP install would undo
6. **Set the permalink structure before importing any content** — see §3. Changing it after content exists means regenerating every URL

## 3. Permalink structure — read this before touching Settings → Permalinks

Current site URL patterns:

| Content type | Current pattern | Example |
|---|---|---|
| Pages (home, about, services, locations) | `/slug/` | `/seo-search-growth/`, `/about/` |
| Blog posts | `/blog/slug.html` | `/blog/ai-digital-marketing-trends.html` |
| Legal | `/legal/slug.html` | `/legal/privacy-policy.html` |

**Pages already match WordPress's default `/%postname%/` structure exactly** — as long as each WordPress Page's slug matches the current directory name (e.g. a Page titled "SEO & Search Growth" with slug `seo-search-growth`), those URLs need zero redirects.

**Blog posts are the real risk.** WordPress's default permalink structure doesn't produce a `.html` suffix, and if the URLs change, every indexed page and all the AEO/schema work from the last several sessions has to re-earn its position via a redirect chain instead of keeping its existing indexed URL. Two options:

- **Recommended: preserve the exact URL.** Set permalinks to `/blog/%postname%/`, then add this to the theme's `functions.php` (or a code snippet plugin) to force a literal `.html` suffix on post permalinks and register the matching rewrite rule:

```php
// Force .html suffix on blog post permalinks, matching the legacy static URLs
add_filter('post_link', function($url) {
    return rtrim($url, '/') . '.html';
});
add_filter('post_type_link', function($url, $post) {
    if ($post->post_type === 'post') {
        return rtrim($url, '/') . '.html';
    }
    return $url;
}, 10, 2);
add_action('init', function() {
    add_rewrite_rule('^blog/([^/]+)\.html$', 'index.php?name=$matches[1]', 'top');
});
```
  Flush permalinks (Settings → Permalinks → Save) after adding this. Result: `/blog/ai-digital-marketing-trends.html` continues to resolve to the exact same post, with zero redirects and zero SEO reset.

- **Fallback: accept the URL change and redirect.** If the `.html`-suffix approach turns out to conflict with a plugin, set permalinks to `/blog/%postname%/` (no suffix) and 301-redirect every old `.html` URL to its new slash URL via Rank Math's redirect manager or the **Redirection** plugin. See `redirect-map.md` for the full list either way — build it as a safety net even if the `.html` approach works, since it's needed if that approach ever breaks.

## 4. Elementor component mapping

What each current hand-coded piece becomes in Elementor:

| Current (static HTML) | Elementor equivalent |
|---|---|
| Sitewide `<nav>` with mega-menu dropdown (`#services-dropdown`, CSS `group-hover` + JS click/focus/Escape handling) | Elementor Pro **Theme Builder → Header** template, using the **Nested Menu** widget (supports multi-level dropdowns with built-in keyboard accessibility — this actually replaces custom JS with something better-tested) |
| Sitewide `<footer>` (4-column link grid) | Elementor Pro **Theme Builder → Footer** template |
| Contact form (`FormSubmit` AJAX POST) | Elementor Pro **Forms** widget, action set to Email (native WP mail) or kept on FormSubmit via a Webhook action if preferred |
| FAQ accordions (`.faq-toggle` + vanilla JS, ARIA-wired) | Elementor's built-in **Accordion** widget — already keyboard/ARIA accessible out of the box |
| Service page pillar/bento grids | Elementor **Icon Box** widgets in a grid Container |
| Formula blocks / methodology tables (CAC post, service pages) | Elementor **Table** widget, or a styled **Text Editor** block for formula callouts |
| JSON-LD schema (Service, FAQPage, BreadcrumbList, Person, ProfessionalService) per page | Rank Math's Schema Generator (per-page, matches current types) — do **not** rely on Elementor for this, it doesn't generate structured data |
| GA4 gtag + WhatsApp-click event tracking | WPCode snippet, header/footer injection — copy verbatim from any current page's `<script>` block |
| `llms.txt`, `robots.txt`, `sitemap.xml` | `llms.txt` stays a static file at the web root (WordPress doesn't touch it — just re-upload it as-is). `robots.txt` and `sitemap.xml` are generated by Rank Math once installed; disable Rank Math's sitemap only if keeping the hand-written one, otherwise let Rank Math take over and verify it matches the current URL set |

## 5. Tracking scripts to carry over verbatim

Every current page has this in `<head>` — copy exactly into WPCode (site-wide header injection), don't paraphrase it:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7PKRYMX051"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7PKRYMX051');
</script>
<script>
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (link && typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: window.location.pathname
      });
    }
  }, true);
</script>
```

Plus the per-form submit tracking (`contact_form_submit` GA4 event) — if using Elementor Forms instead of the current FormSubmit AJAX handler, re-wire this as an Elementor Forms "Actions After Submit" → custom JS action, since the current inline JS won't fire on a form Elementor renders itself.

## 6. What's already done vs. what's not

**Done in this branch:** content export for all blog posts + legal pages, structured briefs for every other page, the redirect map, this technical plan.

**Not done, and can't be until hosting exists:** actually installing WordPress/Elementor/plugins, building the pages in the Elementor editor, configuring DNS to point at the new host, final QA against the current site's Lighthouse/Core Web Vitals scores. That last one matters — don't consider this migration complete until the new WordPress site's performance is checked against the current static site, not just its visual appearance.
