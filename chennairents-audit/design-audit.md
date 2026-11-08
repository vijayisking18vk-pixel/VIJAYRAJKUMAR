# Chennai Rents design audit

Reviewed 5 October 2026. Website: https://www.chennairents.in/

## Main finding

Keep the identity. The warm cream, brick red, yellow, pale blue, bold headings, bilingual logo and Chennai illustrations are distinctive. The largest gains will come from responsive repairs, clearer priority among actions, shorter repeated introductions, shared alignment rules and more useful placement of rental information.

## Coverage and limits

The complete sitemap contained 367 URLs. These included 304 detailed category routes across 16 locality groups, 16 locality profiles, five Chennai directory/BHK/PG hubs, eleven guides, four stories and other core routes. Four additional entry URLs were checked, then all further eligible internal page links discovered in the returned HTML were followed. This produced 523 checked URLs, with no further unvisited eligible links at the end of discovery.

494 requests returned HTTP 200 after redirects; 29 returned 404. There were 465 distinct successful final URL strings. Aliases and trailing-slash variants mean these numbers must not be described as unique content pages. Every initially checked page had one H1. A successful HTTP response does not verify dynamic functionality or visual quality.

All discovered pages received a structural/content extraction, including headings and links. Visual inspection sampled the homepage, directory, citywide rental landing template, Velachery locality profile, map, listings feed, first two listing-form stages, a guide and mobile privacy page. The homepage and feed were checked at 390px. This is a full discovered-URL structural audit with representative visual inspection, not a claim that every page was individually screenshot-reviewed. Two attempts to visually inspect the detailed Velachery category page timed out; its content was retrieved by HTTP. Hidden/unlinked routes, authenticated states and submitted form outcomes are outside verified coverage. Rental, legal and verification claims were not independently fact-checked.

The accompanying page-inventory.html lists every checked URL, final destination, status, H1, template family and applicable design recommendation. It also labels visual sampling rather than presenting inherited template recommendations as individually observed visual defects.

## Prioritized findings

| Priority | Finding | Evidence | Recommendation |
|---|---|---|---|
| High | Mobile listing page exceeds viewport | At 390px, document scroll width was 467px; listing cards and actions extended beyond the right edge | Repair intrinsic grid/flex widths, tab sizing and header wrapping before cosmetic refinements |
| High | Broken internal destinations | 29 linked URLs returned 404, including Guindy and four story links under /guides/ | Repair source links or verified redirects; make unavailable destinations clearly unavailable |
| High | Two navigation labels lead to the same view | Editorial Map and Listings links both target /listings | Send Listings to the working feed, retaining Map for the map |
| High | Inconsistent form progress | Five labels and five form sections; first visible state says Step 1 of 4 and 20% | Derive all progress information from a single stage model |
| High | Conflicting trust copy | About's no-listing philosophy; footer says no data collected; listing and privacy pages describe submissions | Editorial review against actual functionality; do not invent revised policy claims |
| Medium | Reading and searching are too far apart | Locality page places a large quick-facts table before rent table; main map CTA comes near the end | Put concise decision facts and a browsing action near the top |
| Medium | Related navigation creates excess page length | Velachery ends with separate long Popular Localities, Search by BHK, Rental Legal Guides and Editorial Review panels before the footer | Group into compact desktop columns/rail and structured mobile sections, preserving links |
| Medium | Map action hierarchy is flat | Search/filter plus ten chips mix transaction selection, contributions, browsing and help | Group by purpose and move secondary utilities into accessible panels |
| Medium | Strong repeated decoration delays inner-page content | Coastline hero repeated on guide, locality, policy and landing layouts | Preserve illustration, reduce its vertical allocation on utility pages |
| Medium | Mobile Instagram promotion dominates persistent UI | Fixed full-width yellow bar visible on home and privacy | Reserve space, reduce visual competition, relocate on task-oriented screens |
| Medium | Data presentation is inconsistent | Homepage water suffix repeats /10; scores differ between card/table/category contexts | Fix formatting and resolve semantics/source values before choosing a canonical score |
| Low | Read-time label duplicates units | Guide displays READ TIME: 7 MIN READ MIN | Render one short metadata value |

## Recommendations by page family

### Homepage

The hero repeats the locality-first promise in the heading, bold subtitle and paragraph. Keep the message, but reduce repetition in the immediate viewport. The current map/property actions are clear and should remain. The page then repeats the same journeys in two large promotional cards, followed by Instagram, many article cards, a comparison table, methodology and testimonials.

Recommended order: compact hero and actions; locality discovery; useful locality comparison; guides; methodology/trust; community experiences; footer. Keep existing promotional components but reduce duplication and balance their scale. Align badges, titles, summaries and card actions. Use the same card metadata format everywhere. Preserve the skyline/coastline as a signature transition.

### Map and listings

The map is a different application surface and does not need the full editorial header, but it should retain recognizable logo treatment, colors, button dimensions and icon discipline. Separate navigation, filter state and contribution actions. On narrow screens, keep search plus the most important toggles visible and group the rest in a usable panel. Preserve attribution and map controls.

Map tiles were partially loaded in one captured state. This is an observation from the session, not a confirmed persistent defect. Provide clear loading/retry behavior and reproduce before debugging.

The feed already has useful rent emphasis and broadly aligned card actions on desktop. Improve the dense attribute chips by grouping primary facts and secondary features. Use consistent image ratios and reserve space for badges. The urgent defect is mobile overflow. Inspect minimum content widths, flex children, tab rows and the compact header; do not conceal overflow globally. A one-column phone feed must fit its container. Filters should remain accessible without pushing all results far down the screen.

### Listing form

The form's centered column and existing rounded panels are a good starting point. Keep the bilingual labels and auto-rickshaw progress motif. Reduce decorative spacing between progress and the active panel. Normalize helper-text spacing and action placement. Fix stage counts and percentages. Only stages one and two were interactively opened; no personal data was entered or listing submitted. Later sections and success copy were seen in HTML only. Test their real behavior during implementation.

### Directory and citywide landing pages

The directory organizes localities geographically and exposes BHK/PG entry points. Bring those controls closer to the page introduction. Keep equal card padding, stable label positions and consistent summary facts. Specific BHK and budget pages repeat a broad citywide structure; prioritize the selected criterion before general cross-navigation. Retain crawlable internal links and unique route metadata.

### Locality profiles and rental-category pages

All 16 locality profiles and 304 detailed category routes were included in the sitemap audit, plus linked shorter variants. The detailed category pages use metric summaries, locality pockets, market tables, risk guidance, FAQs and rental-network links. They should share one coherent layout system while retaining route-specific details.

On the visually inspected Velachery profile, wide prose and successive full-width panels create a long scroll. Put indicative rent, deposit, water and flood context together near the top. Give scores explicit labels. Move the map/feed action earlier. Keep article prose narrower than tables. Group water/flood/commute information, followed by household guidance and FAQs. Replace the large stack of related navigation panels with compact groups that preserve all destinations.

Review conflicting data before emphasizing it visually. Velachery's water values differ between the homepage card (7), homepage table (6.0) and detailed category text (7.2). Adyar also differs between the homepage card and table. AGS Colony appears in cautionary text on the locality profile and as high ground in detailed category text. These are editorial consistency issues, not values a designer should silently change.

### Eleven guides

Every guide was structurally checked. Apply the shared article treatment to advance deposits, tenant rules, listing writing, advance-payment checklist, direct listing, negotiation, fair pricing, best areas, brokerage comparison, cost of living and low deposits. Keep the route-specific checklist/table/callout content. Use a compact title and metadata block, readable column, contents links on longer pages, consistent heading spacing and relevant next actions. Clean duplicated read-time units. Do not imply that legal statements were validated by this design review.

### Four stories

The gated-versus-standalone, heating-up localities, metro-premium and fastest-moving-2BHK stories should use the same editorial grid, with comparison tables where already present. Add charts only when actual supporting data is available. Four internal links incorrectly use /guides/ for these stories; their working destinations are under /stories/.

### About, authors and trust/support pages

| Page | Specific treatment |
|---|---|
| About | Keep its Chennai voice; shorten visual blocks and resolve obsolete no-listing positioning |
| Authors and author alias | Align team/profile information and shared contact CTA; retain current actual bios and imagery |
| Methodology | Readable numbered sections, compact metadata and clearly separated scoring definitions |
| Verification | Consistent ordered steps and one distinct advisory; ensure badges reflect actual implementation |
| Corrections | Separate submission instructions from dated revision log |
| Contact | Align editorial/trust contact groups and location/hours; make purpose clear beside each destination |
| Privacy | Readable policy column, anchor navigation if useful, smaller decorative hero and unobstructed reading |
| Data deletion | Compact form, clear labels and required-field/error/success states; preserve existing submission behavior |

### Shared footer, navigation and accessibility

Use one clear destination per navigation label. Align logo and Tamil tagline without shrinking critical mobile controls. The footer has long research links and a large decorative area; balance columns and reduce unnecessary gaps. Preserve the cultural assets. Keep fixed Instagram UI from covering content, focus or form buttons. Provide labels for icon controls, sufficient touch spacing, clear focus, logical headings, reduced-motion behavior and adequate contrast. These are implementation acceptance targets, not a claim of a completed WCAG audit.

## Proposed design constraints

Observed editorial colors: #FAF7F2 cream, #1E1B18 ink, #B23A2E brick red, #F5B800 yellow, #EBF3FA pale blue and #1F6FA8 blue. These are observed values, not an exhaustive token inventory. Preserve existing greens and other semantic colors after source inspection. Editorial font links use Poppins and Outfit; the map loads Plus Jakarta Sans and Inter. Unify spacing and hierarchy without assuming every surface must use identical typography.

Suggested starting dimensions, to validate visually: approximately 1200px content maximum; 65–75ch prose; 16–20px mobile gutters; 24–32px desktop gutters; 16–24px card padding; 32–48px phone section separation and 56–72px desktop section separation. Use flexible, content-driven heights. Keep related labels and their values closer together than unrelated groups.

## Implementation sequence

1. Repair mobile overflow, navigation destinations, broken links and form-step consistency.
2. Establish shared layout/spacing/type tokens using the existing palette and component library.
3. Refine home, directory, locality and article templates; propagate to all variants.
4. Refine map/feed/form arrangements and test state changes.
5. Resolve editorial contradictions with authoritative project information.
6. Verify all routes and representative templates at 360, 390, 768, 1024 and 1440px; record actual coverage and remaining issues.

## Deliverables

- redesign-prompt.md: complete copy-ready implementation prompt.
- page-inventory.html: searchable inventory of all 523 checked URLs with route-level results and template recommendations.
- pages.json: raw extracted page content, headings and links for traceability.

No website source was modified and nothing was published.
