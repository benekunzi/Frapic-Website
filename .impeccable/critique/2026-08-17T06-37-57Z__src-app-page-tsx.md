---
target: the landing page (src/app/page.tsx)
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
timestamp: 2026-08-17T06-37-57Z
slug: src-app-page-tsx
---

## Design Health Score

| #         | Heuristic                         | Score     | Key Issue                                                                                              |
| --------- | --------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| 1         | Visibility of System Status       | 2/4       | Hero subtitle clipped on mobile, not wrapped — confirmed by both assessments + manual re-check.        |
| 2         | Match Between System & Real World | 3/4       | Real screenshots match expectations; "Independent" left untranslated in German copy.                   |
| 3         | User Control and Freedom          | 1/4       | Mobile nav toggle button renders zero visible pixels; About/FAQ/language switch unreachable on mobile. |
| 4         | Consistency and Standards         | 1/4       | Format-count mismatch, Values headlines drop Anton font, invisible logo, invisible nav button.         |
| 5         | Error Prevention                  | 2/4       | "Coming soon" copy sits under a working download link.                                                 |
| 6         | Recognition Rather Than Recall    | 3/4       | Icon+label mostly solid; Users2 icon for "Independent" is a metaphor miss.                             |
| 7         | Flexibility and Efficiency        | n/a       | Persuade-mode landing page — no repeat-user shortcuts to evaluate.                                     |
| 8         | Aesthetic and Minimalist Design   | 3/4       | Confident hierarchy; mobile hero above-the-fold is dense.                                              |
| 9         | Error Recovery                    | 2/4       | "Coming soon" line + dead footer social links, no resolution path.                                     |
| 10        | Help and Documentation            | n/a       | Persuade-mode — FAQ is a separate destination.                                                         |
| **Total** |                                   | **17/32** | **Acceptable (53%)**                                                                                   |

## Design Specificity Verdict

**LLM assessment:** Borrowed shell, authored details. Real app screenshots (journal grid, festival story with @anna tag, map with pins) and specific feature copy are genuinely Frapic's own. The structural language (floating pill navbar, wordmark hero with images breaking across type, pill CTAs, dark block CTA) is an explicit Bumble lift per the code's own comments — a swipe-dating-app grammar wrapped around an anti-algorithm, intimate-friends product. "No algorithm/no ads/no filters" negative framing is also a genre trope shared with BeReal/Vero, not a unique voice. Footer copyright reads "Frapic App Inc.," contradicting the solo-founder/no-investor story on About/FAQ.

**Deterministic scan:** `detect.mjs --json` on the four changed files: exit 0, zero regex-mode findings (genuinely clean, no ignore file exists). URL/browser-mode scan unavailable (puppeteer not installed) — computed-style rules never ran; that portion is "unavailable," not "clean." Mobile overflow, invisible nav button, and invisible logo were caught via headless screenshots + PIL pixel sampling instead, cross-checked by two independent agents and a manual recheck.

**Visual overlays:** Not available — no interactive browser-automation tool in this session. Fallback signal only: static screenshots at 1440/430/390px plus pixel sampling.

## Overall Impression

Strong visual direction and a real improvement over the prior state, but this pass surfaced two mobile-breaking bugs a desktop-only review would miss: the hero's core sentence is clipped, and the mobile nav menu is invisible. Neither is taste — both are "a majority of visitors literally cannot do this."

## What's Working

1. Real product screenshots as hero imagery — actual app UI lends the borrowed shell credibility.
2. The "Geteilte Journals" dark block — genuine tonal shift, real video demo, explains a real differentiated feature.
3. Color-coded value/format cards — consistent icon-badge + colored-container pattern gives legible cross-section grammar.

## Priority Issues

**[P0] Hero subtitle and hero elements overflow/clip on mobile, unreadable.**
Why it matters: only sentence stating what Frapic is, broken for majority of mobile traffic.
Fix: isolate hero paragraph from the phone-mockup stacking context (translate-x offsets up to ±125%/+25% push layout width past viewport); verify at 375/390/414/430px.
Suggested command: /impeccable adapt

**[P0] Mobile nav-menu toggle button is invisible — About/FAQ/language switch unreachable on mobile.**
Why it matters: button markup exists (SSR HTML confirmed) but produces zero visible pixels at its expected position, confirmed on two independent passes plus manual pixel sample.
Fix: inspect computed styles/stacking context for the md:hidden button in Navbar.tsx; verify render at 390/414/430px on real device.
Suggested command: /impeccable adapt

**[P1] Navbar wordmark logo is invisible — white-on-white.**
public/frapic-logo-font.webp is 100% pure white opaque pixels, rendered inside the new bg-white navbar pill, on every page.
Fix: recolor wordmark to ink color, or add a dark-tinted container behind just that image.
Suggested command: /impeccable polish

**[P1] "Download links coming soon" sits directly under a live, working App Store link.**
Why it matters: casts doubt on the button visitors are about to click at the conversion moment.
Fix: remove the line, or scope explicitly to Android.
Suggested command: /impeccable clarify

**[P1] Footer social links are dead # placeholders.**
Why it matters: literal last content on the page, for a trust-first brand — reads as unfinished at the worst location.
Fix: wire real accounts or remove the row until they exist.
Suggested command: /impeccable harden

## Persona Red Flags

**Jordan (confused first-timer):** Hero explanation unreadable on mobile; can't find About/FAQ since the menu button doesn't visibly exist; "Frapic" the app name and "Frapic" the in-app format card share one word with no disambiguation.

**Riley (skeptical stress-tester):** FAQ discloses Google-personalized ads, contradicting homepage's "no data selling" framing. "Coming soon" under a working button raises doubt the app has shipped. Dead footer social link. "Frapic App Inc." contradicts solo-founder story told one click away.

**Casey (distracted mobile scanner):** The two punchiest proof pills ("Kein Algorithmus," "Kein Datenverkauf") are hidden sm:block — removed specifically on her device, shown only to desktop visitors. Combined with the clipped subtitle, her above-the-fold mobile takeaway is a headline, three photos, and a broken sentence.

## Minor Observations

- Formats section titled "All formats you need" shows only Frapic + Post; Story is promised in the hero and has unused translation data but never renders.
- Values section headlines drop the Anton display font used everywhere else, in the section meant to build trust.
- values[1].title left as English "Independent" inside fully-translated German copy.
- No prefers-reduced-motion guard on the infinite blob-morph animation or scroll-triggered fades.
- LanguageContext hardcodes initial state to "en" before useEffect corrects it — brief English flash for DE/ES visitors.
- App Store link has no target="\_blank" — fully navigates away from the marketing site on desktop.
- Users2 icon for "Independent" reads as "community," not independence.

## Questions to Consider

1. If the Bumble-style shell were removed, what would a page look like built from Frapic's actual differentiator — trust — as the layout principle?
2. FAQ discloses personalized Google ads; homepage never mentions ads and leans on "no data selling." Should the homepage set that expectation up front?
3. What's the one reassurance line that belongs at the download CTA, and why does that slot currently hold copy that undercuts the button above it?
