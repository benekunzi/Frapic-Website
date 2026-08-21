# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Frapic's primary audience spans ages 13-35: young people and youth adults sharing everyday moments with a close friend circle, not a public audience. This marketing site's visitor is deciding whether to download the app, so its job is to make the private, friend-only alternative to mainstream social media legible and desirable fast, then get them to the App/Play Store.

## Product Purpose

Frapic is a free social media app (iOS/Android) for sharing photos, stories, and journals exclusively with close friends. It exists as a private-by-default alternative to algorithm-driven, engagement-optimized social platforms. Success is a visitor understanding "no algorithm, no strangers, no data selling" and downloading the app.

## Positioning

Frapic's mechanism a neighboring app could not truthfully copy: friend-only visibility with no public feed or virality mechanic, no algorithmic ranking or AI content filtering, no ad/investor-driven business model (user-funded), and full EU/Germany hosting under strict data protection law by default. Content is organized into shared daily "journals" bundling a day's posts (and friends' tagged posts) into one page, rather than a chronological/algorithmic feed.

## Operating Context

Core formats: dual-camera "Frapic" posts, 24-hour disappearing stories (photo/video), and permanent profile posts. Daily journals bundle a user's posts; friends' tagged posts can be appended, combining perspectives into one shared page. The website also documents an Instagram data-import flow (users migrate existing Instagram exports into Frapic) and an in-app account deletion flow — both currently have dedicated site pages that must keep working.

## Capabilities and Constraints

- Free to use; distributed via Apple App Store and Google Play.
- No feed algorithm, no AI/upload filters, no data selling — these are factual claims, not marketing color; the redesign must not visually imply features that don't exist (e.g. public discovery, likes/virality — the app explicitly has no likes, only comments/reactions per existing app screenshots).
- Small independent German team, no investors or advertisers; user-funded.
- Hosted fully within the EU (Germany).
- Existing legal/compliance pages (Privacy Policy, Terms of Use, Community Guidelines, FAQ, delete-account, Instagram import) carry real, factual copy that must be preserved in content and meaning through any redesign.
- Site is bilingual (German/English) via a translation context; both locales must remain functional and content-complete after redesign.
- iOS Universal Links / Android App Links config (`.well-known/apple-app-site-association`, `assetlinks.json`) and the public profile route (`/u/[username]`) are functional infrastructure, not visual surface, and must keep working.

## Brand Commitments

The name "Frapic" and its existing logo wordmark (`public/Frapic-Logo.webp`, `public/frapic-logo-font.webp`) are fixed and must be preserved as-is. No other visual element (color, type, layout, component style) is a binding brand commitment — the current site's look (dark theme, Anton display font, blue accent) is evidence of what the product is, not a constraint on the redesign, and is open to full replacement.

## Evidence on Hand

- Real founder bio and photo on the About page (`public/ProfilePic.webp`, Benedict Kunzmann).
- Real App Store link (already added per repo history) and Google Play presence (app is live).
- Real product screenshots exist in the reference design material provided by the user (App Store screenshot set) showing actual in-app UI: dark UI, coral/pink accent buttons, journal/story/comment views — useful as ground truth for what the app actually looks like, separate from the marketing site's own visual system.
- No pricing, testimonials, customer logos, or usage benchmarks exist on the site; none should be fabricated.

## Product Principles

1. Privacy and friend-only visibility are the product's core differentiator — every surface should make that legible, not just state it.
2. Claims made (no algorithm, no ads, EU-hosted, no data selling) are factual commitments; the redesign may dramatize them but never exaggerate beyond what's true.
3. The site's job is conversion to app download (Persuade mode) — expression should sharpen the message and the download action, never bury it.
4. Bilingual parity (DE/EN) and existing legal/compliance page content are non-negotiable through any visual overhaul.
5. The current visual system (dark, Anton font, blue accent) is not a legacy identity worth preserving — it's undifferentiated and can be fully replaced with a bolder, more distinctive world.

## Accessibility & Inclusion

No project-specific accessibility requirement has been established beyond standard web accessibility practice (contrast, keyboard navigation, readable type at all breakpoints) — apply that as the baseline given the 13+ audience includes younger users.
