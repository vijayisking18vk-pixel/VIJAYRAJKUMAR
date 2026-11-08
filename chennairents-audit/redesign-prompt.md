# Chennai Rents — design refinement prompt

Act as a senior product designer and frontend engineer. Refine the existing Chennai Rents website at https://www.chennairents.in across every route. The goal is a visibly more polished, readable, aligned and usable version of the same brand. Work within the existing project and components.

## Preserve the identity and behavior

- Preserve the logo, Tamil/English identity, Chennai illustrations, coastline, lighthouse, auto-rickshaw, kite, coffee and local cultural details.
- Preserve the existing color theme, fonts, content, functional components, map features, forms, filters, contact flows, routes and SEO metadata. Reuse components and improve their composition and styling. Do not rebuild the product in a new framework.
- Extract the existing styles into shared tokens. Observed editorial colors include warm cream #FAF7F2, warm ink #1E1B18, brick red #B23A2E, yellow #F5B800, pale blue #EBF3FA and blue #1F6FA8. Verify exact values in the source and retain existing green status colors. Retain Poppins/Outfit editorial typography and inspect the existing map-specific fonts before changing them.
- Keep color meanings consistent. Use the existing primary button treatment for the main action, an existing outline/neutral treatment for secondary actions, and quieter links for tertiary actions.
- Do not introduce new gradients, glass effects, stock imagery, oversized decorative cards or a different visual theme. Do not invent listings, testimonials, metrics or verification evidence.

## Audit and implementation scope

Inventory the sitemap, internal links and repository routes first. Group routes by shared template, but check every route after implementing shared changes. Include home; map; listings feed; listing form and its states; locality directory; citywide BHK/budget/audience landing pages; all locality profiles; all locality rental-category variants; all eleven guides; all four stories; About; author/team; methodology; verification; corrections; contact; privacy; deletion form; and 404 pages. Include aliases and redirects. Do not stop after the homepage.

The live audit found 367 sitemap entries. Expanded discovery checked 523 URLs: 494 returned HTTP 200 after redirects and 29 returned 404. These are URL counts, not unique pages. The sitemap contains 304 detailed locality-category routes across 16 localities. Build a route checklist from the actual current source rather than hardcoding these counts.

## Shared layout rules

- Establish one shared alignment grid. Start with an approximately 1200px desktop content maximum, 24–32px desktop gutters and 16–20px phone gutters; adapt to the actual existing layout.
- Keep editorial paragraphs around 65–75 characters per line. Use a wider container for tables, card grids and the map. Align breadcrumbs, title, metadata, summary, section headings and footer columns to deliberate common edges.
- Use a consistent spacing scale such as 4, 8, 12, 16, 24, 32, 48, 64 and 80px. Target 56–72px section separation on desktop and 32–48px on mobile, with 20–24px desktop card padding and 16–20px mobile padding.
- Preserve the font families, but normalize font sizes, weights and line heights. Use fluid titles, approximately 40–52px desktop and 28–34px mobile where appropriate, 16–18px body copy, and comfortable 1.5–1.7 body line height. Avoid all-caps text for long sentences. Allow Tamil labels enough vertical room.
- Standardize border thickness, corner radii, shadow intensity, button heights, badges and icons using the existing component language.
- Align card headings and action rows. Use flexible layouts rather than fixed text heights or truncation that hides essential information. Keep key price and contact details visible.
- Keep decorative illustrations, but give them bounded areas and consistent section transitions. Reduce repeated banner height on inner utility pages. Essential content must not depend on a reveal animation finishing.

## Page-specific arrangement

1. Homepage: place a concise hero and the existing map/list-property actions first, then locality discovery, the rent/water/flood comparison, practical guides, methodology/trust, community experiences and footer. Reorganize existing blocks without dropping useful content. Keep locality and guide cards distinct through their existing labels and consistent metadata rows. Correct repeated score suffixes such as “6.5 / 10 /10.” Make the Instagram section supportive to home-finding tasks.

2. Shared navigation: make Map and Listings distinct destinations—the inspected editorial header sends both to /listings. Point Listings to the actual feed route. Use one consistent locality-directory destination and active state. Align the logo, navigation, buttons and mobile menu. Retain the Tamil tagline without crowding actions.

3. Map: retain every capability, but group search and filtering together; separate Rent/Buy transaction selection from Pin Price/List Property contributions and from FAQ/Stats utilities. Preserve maximum map visibility. Use a compact mobile toolbar and accessible drawers/bottom sheets for secondary panels. Keep legends, attribution, location and layer controls visible without overlap. Distinguish loading, empty and failed data/tile states. Do not assume the audit's partial tile load is a permanent production defect; reproduce it first.

4. Listings feed: fix the verified mobile width defect first. At a 390px viewport the page measured 467px wide, with clipped cards, header content and controls. Inspect grid/flex minimum sizes and intrinsic-width tabs; use min-width:0 where appropriate, responsive columns and contained scrolling only where intentional. Do not hide the problem using page-level overflow:hidden. Keep one card per row on phones, a consistent desktop sidebar, matching image aspect ratios, aligned prices and bottom actions. Prioritize BHK, locality, price, deposit and availability; arrange secondary attributes cleanly. Preserve all filters and show active selections and result counts clearly. Avoid letting desktop filters dominate the phone screen.

5. List Property: preserve the form and existing validation/data handling. Fix the inconsistent progress display: five labels exist—Type, Location, Details, Photos, Contact—but the UI says “Step 1 of 4.” Derive the denominator, percentage and active label from one step model. Align all fields, labels, helper text, errors, Back and Continue actions. Reduce the decorative gap between the progress panel and form. Preserve entered values when moving back. Check conditional Rent/Sale/Room fields, photo states, verification, errors and success without submitting a real test listing.

6. Locality directory and citywide landing pages: move browsing controls and decision information closer to the title. Keep cards in consistent responsive grids. Group choices by location, BHK, budget and household needs. On specific budget/BHK pages, show the matching information first and broad cross-links later. Preserve existing indexable content and links.

7. Locality profiles and all rental-category variants: arrange breadcrumb/title → concise summary and relevant browsing action → rent/deposit/water/flood/commute facts → rental table → local details → guidance → FAQ → nearby options. Label every score; a bare “7/10” is ambiguous. Keep rent and risk claims unchanged pending editorial verification. Use readable article width, optional desktop contents rail and compact mobile jump links. Consolidate the long stacked related-link panels into well-grouped navigation blocks while preserving every necessary destination. Do not make all category variants generic: lead with the selected BHK, budget or audience.

8. Guides and stories: preserve article content, reduce repeated hero height, align title/subtitle/byline/date/read-time, add a useful contents navigation when long, and use consistent tables, callouts and FAQ treatments. Fix duplicated read-time text such as “READ TIME: 7 MIN READ MIN.” Use charts only when verified underlying data exists. Do not turn estimated claims into apparently measured charts.

9. About, team and trust pages: use a restrained readable layout with consistent section spacing. Present verification as clear ordered steps; methodology as well-labeled sections; corrections as a dated log; contact details as aligned contact groups; privacy as navigable text; deletion as a compact labeled form. Preserve the local illustrations at an appropriate scale. Flag contradictory product claims for editorial resolution rather than silently inventing policy changes.

10. Footer and floating elements: align footer columns, reduce excess vertical spacing and group long link lists logically. Retain cultural illustrations and brand signature. On mobile, reserve space for any fixed Instagram bar and prevent it from covering content, form actions, consent text or map controls; suppress or relocate it where necessary while retaining the Instagram destination.

## Content and link issues to flag separately

- About describes a no-listing approach while the product exposes listings.
- The footer says no information is collected, while the privacy page describes voluntary submissions and other data handling. Verify actual behavior before revising policy language.
- Water scores differ between homepage cards, its comparison table and locality/category pages. For example, Velachery appears as 7, 6.0 and 7.2 in different contexts. Establish whether these measure different things; label the distinction or request an authoritative value.
- The audit found 29 linked 404 destinations. Four /guides/ story paths have corresponding working /stories/ paths. Repair links or redirects using verified destinations; do not create fictional locality content just to eliminate a 404.

## Acceptance criteria

Test representative templates at 360, 390, 768, 1024 and 1440px, then run automated route-level checks across the full inventory. Verify no horizontal page overflow, clipped Tamil/English text, overlapping fixed UI, obscured focus, broken internal links or inconsistent step labels. Test keyboard navigation, visible focus, labeled controls, 44px touch targets, readable contrast and reduced-motion behavior. Check filter changes, empty results, validation, loading/error states, FAQ controls and browser back behavior. Preserve table semantics and allow controlled table scrolling on narrow screens.

Implement shared tokens and primitives first, then templates, then exceptional pages. Deliver the actual improvements, before/after screenshots for each page family, the route coverage checklist, checks performed and remaining editorial/backend issues. Be explicit about anything not tested. Keep every change focused on arrangement, alignment, hierarchy, readability and usability while preserving Chennai Rents' identity.
