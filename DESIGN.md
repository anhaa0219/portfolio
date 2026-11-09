---
name: Ankhbayar Munkhbaatar
description: A portfolio that smolders. The work surfaces out of a molten field instead of sitting in a card grid.
colors:
  ground: "#0c0504"
  ground-2: "#150806"
  deep: "#5c0905"
  ember: "#c4150b"
  heat-mid: "#a3120a"
  lava: "#ff3a1c"
  amber: "#ff9a4a"
  bone: "#f4e6dc"
  ash: "#c9aa9c"
  soot: "#8a6a5e"
  rule: "rgb(255 90 50 / 0.18)"
  veil: "rgb(12 5 4 / 0.72)"
  heat-cold: "rgb(244 230 220 / 0.06)"
typography:
  display:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(3rem, 12.6vw, 14rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(2.4rem, 6.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(1.8rem, 3.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title-sm:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    fontFeature: "tnum"
  data-xs:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "tnum"
rounded:
  hairline: "2px"
spacing:
  cell-gap: "3px"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  section: "clamp(6rem, 14vw, 12rem)"
  row: "28px"
  container: "100rem"
components:
  button-molten:
    backgroundColor: "{colors.lava}"
    textColor: "{colors.ground}"
    typography: "{typography.body}"
    rounded: "{rounded.hairline}"
    padding: "0.95rem 1.4rem 0.95rem 1.5rem"
  button-molten-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ground}"
  button-ring:
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0.5rem 1rem"
  button-ring-pressed:
    backgroundColor: "{colors.lava}"
    textColor: "{colors.ground}"
  link-arrow:
    textColor: "{colors.bone}"
  link-arrow-hover:
    textColor: "{colors.amber}"
  archive-row:
    textColor: "{colors.bone}"
    padding: "{spacing.row} 0"
  heat-cell:
    backgroundColor: "{colors.heat-cold}"
    rounded: "{rounded.hairline}"
---

# Design System: Ankhbayar Munkhbaatar

## Overview

**Creative North Star: "The Molten Field"**

Everything sits on a live lava-lamp field: a fixed, slow WebGL metaball canvas in near-black and molten reds, under animated film grain. Content does not sit in cards. It surfaces out of the heat: type is laid straight on the field or on a translucent ember veil, and screenshots are seen through heat haze that cools to sharp as they reach the viewport centre. Heat is the single organising idea. The same ground-to-amber ramp drives the lava shader, the contribution graph and the booking-grid states, so "hotter" always means "more".

Density is low and editorial. Section breaks are large (the section rhythm runs from 6rem to 12rem), display type is extreme in scale and tightly tracked, and structure comes from hairline ember rules, not boxes. The palette is dark with one loud voice (lava) and a rare highlight (amber). Text is warm bone, never pure white.

The confirmed rejections are a card grid, a split hero with an avatar, a skills badge cloud, and soft glows.

**Key Characteristics:**
- A fixed WebGL lava field at z -10 with a film-grain overlay at z 60. Every surface is laid over it.
- A heat ramp (ground, deep, ember, lava, amber) that encodes intensity everywhere.
- Unbounded display at very large scale with negative tracking, Golos Text for reading, JetBrains Mono only for dates, times and counts.
- 2px corners, hairline ember rules and rings, and no cards.
- Heat-haze imagery: SVG displacement that grows toward the viewport edges and falls to almost nothing at the centre.

## Colors

A smoldering palette: near-black ember ground, a three-step red heat ramp, one amber highlight, and warm bone text.

### Primary
- **Lava** (lava): the single loud voice. Used for the molten primary button, pressed toggles, the "your booking" cells, the hot end of the heat ramp, and a single accented glyph in a headline (the "." in the monogram, the "&", the "?", the contribution count). Also the text-selection colour.

### Secondary
- **Amber** (amber): a rare highlight. Used only for hover and focus heat: the button hover fill, link hover text, ring-border hover, the archive title on row hover, the focus outline, the "would block" booking preview, and the hottest heat-ramp step. It is never a resting fill for large areas.

### Tertiary
- **Ember** (ember) and **Deep Ember** (deep): the lower heat steps. Ember marks link underlines and the scrollbar; deep marks booked or occupied states (sample bookings) and the first non-zero heat step. **Heat Mid** (heat-mid) exists only as the middle contribution-graph step between deep and lava.

### Neutral
- **Ember Ground** (ground): the page and canvas floor, the theme colour, and the text colour on molten fills. `ground-2` is the slightly lifted ground.
- **Bone** (bone): primary text and headings. Warm, never #fff.
- **Ash** (ash): secondary text, such as descriptions, stack lists, legends and inactive nav.
- **Soot** (soot): tertiary meta only, such as definition-list terms, stack captions, disabled slot times and footnotes. It is restricted to small meta labels and never used for running text.
- **Ember Rule** (rule): every hairline border, ring and divider.
- **Ember Veil** (veil): the translucent section backing (72% ground with `saturate(140%)`) that keeps reading text legible while the lava still shows through.
- **Cold Cell** (heat-cold): the empty-but-present cell in data grids (6% bone; the slot grid uses 5%).

### Named Rules
**The Heat Means More Rule.** Colour intensity encodes quantity or state, always in ramp order: ground, deep, ember, heat-mid, lava, amber. Never use lava for something less intense than an element rendered in deep.

**The Rare Amber Rule.** Amber appears in response to the pointer or the keyboard (hover, focus, preview). At rest it shows only as the top of the heat ramp.

## Typography

**Display Font:** Unbounded (Latin and Cyrillic; weights 400, 600, 800)
**Body Font:** Golos Text (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (400 and 500, tabular numerals)

**Character:** Unbounded is wide and heavy, so it carries the name and the section headlines like molten slabs. Golos Text is a calm, slightly warm grotesque for reading. Both cover Cyrillic, which the Mongolian name requires.

### Hierarchy
- **Display** (800, clamp(3rem, 12.6vw, 14rem), 0.86): the first name in the hero only, at viewport-wide scale. It is the one element that carries a ground-coloured legibility halo (`0 4px 40px rgb(12 5 4 / 0.45)`).
- **Headline** (800, clamp(2.4rem, 6.4vw, 6rem), 0.95): section titles. The closing call scales up to clamp(2.8rem, 9vw, 9rem) at line-height 0.9 and max 14ch.
- **Title** (800, clamp(1.8rem, 3.6vw, 3.25rem), 1): sub-section titles inside a section.
- **Title Small** (600, 1.25rem mobile to 1.5rem desktop, tracking -0.02em): archive project names and screenshot captions. At 1rem it labels engineering notes.
- **Secondary Display** (400, clamp(1.25rem, 3.2vw, 3rem), tracking -0.03em): the last name and the Cyrillic name under the display name.
- **Lede** (400, 1.2rem to 1.45rem, 1.45 to 1.55): opening statements and summaries, 22 to 52ch.
- **Body** (400, 1.0625rem, 1.6): running text, 38 to 60ch, with `text-wrap: pretty`.
- **Label** (400, 0.875rem): nav, controls, legends, figcaptions and dl terms.
- **Data** (JetBrains Mono 400, 0.875rem; 0.68 to 0.75rem in grids): dates, years, slot times, durations, stack strings and axis labels.

### Named Rules
**The Mono Is Data Rule.** JetBrains Mono appears only on dates, times, counts, durations and stack strings, always with tabular numerals. Never use it for prose or headings.

**The Tight Heat Rule.** Unbounded at headline size and above tracks between -0.035em and -0.045em, with line-height at or below 1. Headings use `text-wrap: balance`.

## Layout

A single full-width column: content is padded by the fluid gutter (`spacing.gutter`) and capped at the container width (`spacing.container`, 100rem). Inside sections, layout runs on a 12-column grid from 768px (`md`) with a 1.5rem gap. Headlines take 7 or 8 columns, and the supporting paragraph sits in the remaining 4, aligned to the headline's baseline end (`self-end`). Below 768px everything stacks into a single column with 1.5 to 2.5rem gaps.

Sections are separated only by top padding at `spacing.section`. There are no dividers or panels between them. Large blocks inside a section repeat the same rhythm. Case-study screenshots alternate sides (8 of 12 columns, caption in the other 4) with a clamp(5rem, 12vw, 10rem) gap between them.

The first viewport is min(100svh, 64rem), with a fixed translucent header (`h-18`, a ground gradient from 92% to 60% with backdrop blur). The display name sits at the bottom. The featured screenshot is placed absolutely on the right from 20% down at min(56vw, 62rem). On mobile it flows inline and the name overlaps it upward by 18vw.

Data grids (the contribution graph and the slot grid) use a 3px cell gap and bleed to the viewport edge through a negative gutter margin, so they can scroll horizontally on narrow screens. The contribution graph uses `dir="rtl"` so it opens on the newest weeks.

## Elevation & Depth

The system is flat and lit from below. Depth comes from the material stack, not from shadows: the lava field (z -10), then the ember veil backing each section, then content, with the grain overlay above everything (z 60, `mix-blend-mode: overlay`, opacity 0.13). Separation between elements uses hairline rules and rings. No surface carries a drop shadow. The only shadow in the vocabulary is the display name's ground-coloured legibility halo, which darkens rather than glows.

### Shadow Vocabulary
- **Legibility halo** (`text-shadow: 0 4px 40px rgb(12 5 4 / 0.45)`): only for display type laid directly over the live field.

### The Lava Field
A fixed, full-viewport WebGL fragment shader of nine slowly drifting metaballs, plus a pooled band of heat along the bottom edge. It is coloured through the heat ramp (ground, deep, ember, lava, with amber at 40% only at the hottest cores). The upper-left reading area is cooled toward ground by 45%, and a vignette darkens the edges. It renders at 0.45 resolution, then gets `blur(6px) saturate(115%)` and is scaled to 1.04 to hide edges. Overall intensity is 0.85 on desktop and 0.62 below 768px, where text covers more of the field. Before WebGL paints, or without it, a radial-gradient fallback in deep and ember on ground shows. The canvas fades in over 2s.

### Film Grain
A fixed SVG fractal-noise tile (baseFrequency 0.85, 3 octaves) sized at 200% of the viewport, with opacity 0.13 in overlay blend. It jitters through 6 stepped positions every 0.9s. It is pointer-transparent and sits above all content.

### Named Rules
**The No Soft Glow Rule.** Nothing radiates light. There are no coloured box-shadows, blur halos or neon edges. Heat is shown by fill colour and by the field itself.

**The Field Shows Through Rule.** No section paints an opaque background. Use the 72% ember veil or less, so the lava stays alive behind every screen. The body has no background, so the fixed field at z -10 shows through.

## Shapes

Corners are nearly square: 2px (`rounded.hairline`) on buttons, toggles, focus outlines, legend swatches and heat cells. Imagery has square corners and is clipped by `overflow: hidden`. Borders are always 1px ember rules: a `border-t` above lists and data, a `border-b` between rows, and a 1px ring (`ring-1`) around framed screenshots, the portrait and the archive preview. Edges dissolve rather than crop. The hero screenshot is masked on two axes (fading out from 34% to 78% down, and over its last 10% on the right) so it melts into the field instead of ending at a hard fold.

## Components

### Buttons
Molten and confident. One filled button per view, with everything else as rings or arrow links.
- **Shape:** nearly square (2px).
- **Primary (Molten):** a lava fill with ground text, weight 600, padding 0.95rem 1.4rem 0.95rem 1.5rem, and a 0.75rem gap before a trailing 16 to 18px stroke icon. It is used for the hero case-study call and the email call.
- **Hover / Focus:** fills amber and lifts 2px over 0.3 to 0.4s on `ease-out`, returning to 0 on press. Focus is a 2px amber outline offset by 4px with a 2px radius (global).
- **Ring (Secondary):** a transparent fill, a 1px ember-rule border, label size, and 0.5rem 1rem padding. On hover the border turns amber. It is used for the nav Contact action and the scheduler toggles.

### Chips / Toggles
- **Style:** the ring button with `aria-pressed`. When pressed it fills lava with ground text and a lava border. Number toggles are 40px squares in mono. Inline durations appear in mono at 70% opacity.

### Links
- **Arrow link:** inline-flex with a 0.5em gap and a trailing 14px arrow, with no underline. On hover the text turns amber over 0.3s and the arrow shifts 3px up and right over 0.4s on `ease-out`. The primary instance is bone and the secondary sibling is ash.
- **Body links:** inherit their colour, with a 1px ember underline offset by 0.25em.

### Icons
Inline SVG on a 24px grid, `currentColor`, 1.8px round-capped stroke (arrow up-right, arrow down, mail). The GitHub mark is the only filled icon. Icons always sit beside a text label.

### Navigation
A fixed translucent ground bar with backdrop blur. The monogram "A.M" sits left (Unbounded 800, tracking -0.04em, lava dot). Four ash label links sit in the centre and turn bone on hover; they are hidden below 768px. The ring Contact action sits right. A skip link appears on focus as a bone pill with 2px corners.

### Archive Row (Signature)
A ruled list instead of cards. A 1px rule sits above the list and below every row, with 24px row padding (28px on desktop). On desktop the four columns are a mono date (7rem), the project name in title-small, the description in ash with the stack in mono soot below it, and right-aligned Live and Code arrow links (8.5rem). On mobile the date, description and links span the full width and the name takes the first column. On hover the row warms to lava at 5% over 0.5s and the name turns amber. With a fine pointer, a 22rem hazed preview with a 1px rule ring follows the cursor with a 0.14 lerp lag and a tilt of up to 6 degrees. It fades in from 0.92 scale and 8px blur over 0.5s on `ease-out`.

### Heat-Haze Image (Signature)
Screenshots are seen through an SVG `feTurbulence` plus `feDisplacementMap` filter. The displacement scale is 1 + heat × distance^1.6, where distance is the frame's offset from the viewport centre. That gives up to heat 22 to 26 at the edges and about 1 at the centre, halved below 768px. The turbulence frequency wavers slowly (about 0.006 by 0.032), so the shimmer is mostly vertical, like rising air. The frame also glides against the scroll (30 to 80px). The image is overscanned to 1.06 inside an `overflow: hidden` frame, so displaced edges never tear. Animation runs only while the frame is near the viewport (IntersectionObserver, 20% margin).

### Heat Ramp Data Viz (Signature)
The contribution calendar uses square cells with 2px corners and 3px gaps, with weeks as columns. Mono month and weekday labels are in ash at 0.68 to 0.7rem. The five levels are heat-cold, deep, heat-mid, lava and amber, with an inline legend reading "Cool ... Molten". On hover a cell scales to 1.25 over 0.2s, and a polite live region in bone reads out the day. The booking slot grid uses the same language. Free lanes are cold cells (5% bone). Sample bookings are deep, the user's bookings are lava, and the "would block" preview is amber. Start-time buttons are mono 0.68rem; on hover they warm to amber at 14%, and when unavailable they are struck through in soot.

### Definition Lists
Meta is set as `dt` in soot at label size over a `dd` in bone or ash. Grouped facts sit under a 1px top rule with 1 to 1.25rem padding above.

### Motion and Reduced Motion

All easing uses `ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`). State colour changes take 0.2 to 0.5s, and transforms take 0.4s. Ambient motion is slow and continuous: the lava drift, the grain jitter, the haze shimmer and the scroll glide. Interactive motion is small: a 2px lift, a 3px arrow shift, a 1.25 cell scale. With `prefers-reduced-motion: reduce`, the lava field draws one static frame (and also pauses when the tab is hidden), the grain stops, haze displacement is set to 0 with no glide, the archive preview tracks the cursor exactly with no lag or tilt, and smooth scrolling is turned off.

## Do's and Don'ts

### Do:
- **Do** lay every section over the live lava field, backed by the 72% ember veil at most.
- **Do** encode intensity with the heat ramp in order (ground, deep, ember, heat-mid, lava, amber).
- **Do** use 2px corners and 1px ember-rule borders, rings and dividers for all structure.
- **Do** show screenshots through heat haze, sharp at the viewport centre, and dissolve hero imagery with a mask rather than a hard crop.
- **Do** set dates, times, counts and stack strings in JetBrains Mono with tabular numerals.
- **Do** keep one molten (lava-filled) button per view. Use ring buttons and arrow links for everything else.
- **Do** give every ambient animation a static reduced-motion state.

### Don't:
- **Don't** put content in cards, panels or a uniform project grid. Use ruled rows and the 12-column editorial grid.
- **Don't** use soft glows, coloured box-shadows or neon edges. The only shadow is the ground-coloured halo on the display name.
- **Don't** use pure white or pure black. Text is bone and the floor is ember ground.
- **Don't** use amber as a resting fill for large areas. It is the hover, focus and peak colour.
- **Don't** paint an opaque section background that hides the field.
- **Don't** round corners beyond 2px on content components.
