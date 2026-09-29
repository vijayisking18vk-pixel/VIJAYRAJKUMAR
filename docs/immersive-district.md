# Immersive district

The five original destinations are modeled buildings with facade-mounted artwork. The Safehouse has a portico and pitched roof; the Garage has roller shutters and a canopy; Events has a marquee; Writing has an archive storefront; Contact is a centered Art Deco terminus. No extra roadside banners are added.

## Rendering budget

- Architecture, trim, glass, columns, foliage and road details use instanced meshes.
- Five compressed artwork files total approximately 238 KB on desktop or 119 KB on phones. Procedural materials and reflections need no texture downloads.
- Three.js loads after the opening hero. The scene pauses behind the hero and while its tab is hidden.
- Desktop sunlight uses a 2048 px shadow map, refreshed as the camera moves. Phones use inexpensive contact shadows.
- Resolution adapts downward during sustained slow frames. Phone pixel ratio is capped at 1.25; desktop at 1.75.
- Reduced-motion mode removes animated transitions, wind and dust, and renders on demand.

## Navigation

Internal pages are prefetched on link intent. Supported browsers use view transitions; other browsers use direct navigation. Browser back and the home logo restore the previous road position. Original page H1s and metadata remain preserved.

## Validation

Production build; desktop and 390/320 px phone viewports; all five destinations; page transitions; browser back; restored journey position; keyboard and touch controls; reduced motion; image request sizes; paused rendering; original H1 and metadata comparisons. These are browser-emulated phone checks, not a claim of measured frame rates on physical phones.


## Scroll reliability and simplified artwork

Navigation and map position now follow native scroll events, independent of the 3D render loop. Scene props and camera options are stable so map updates do not rebuild the scene each frame. The Contact approach uses a bounded linear pullback; its forward motion is verified across five phone/desktop aspect ratios. Rendering state is synchronized on mount after a page return.

Five simplified illustrations replace the detailed environments: doorway, toolbox, microphone, notebook, telephone. Final prompts and original image locations are in simple-banner-prompts.md.

Two fresh-cache verification passes covered desktop, 390px phones, and 320px reduced-motion phones: forward/reverse wheel input, map jumps, rapid scrolling, held arrow keys, touch swipes, and returning from content pages. The no-WebGL fallback was checked separately. Results are saved in scripts/scroll-verification-report.json.
