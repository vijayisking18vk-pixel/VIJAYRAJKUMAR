// Five destinations on one road. Contact terminates the boulevard.
export const DISTRICT_LANDMARKS = [
  {
    id: "safehouse",
    label: "About",
    path: "/about/",
    asset: "safehouse",
    title: "The Safehouse",
    subtitle: "About Vijayrajkumar",
    summary: "Every operator has an origin story. This is mine.",
    tag: "BACKGROUND · STRATEGY · AMBITION",
    color: "#E7B85A",
  },
  {
    id: "operations-garage",
    label: "Ventures",
    path: "/ventures/",
    asset: "garage",
    title: "The Garage",
    subtitle: "Ventures & case studies",
    summary: "Ideas leave the drawing board. Real systems hit the street.",
    tag: "UNFOUNDED · ZIGGERS · LOOPMEMORY",
    color: "#BAC98B",
  },
  {
    id: "poster-wall",
    label: "Events",
    path: "/events/",
    asset: "events",
    title: "Out in the City",
    subtitle: "Events & appearances",
    summary: "The people, places, and conversations that move things forward.",
    tag: "SUMMITS · HACKATHONS · COMMUNITY",
    color: "#D99568",
  },
  {
    id: "archive",
    label: "Writing",
    path: "/writing/",
    asset: "archives",
    title: "The Archives",
    subtitle: "Writing & research",
    summary:
      "Notes from the field. Systems, strategy, and things worth questioning.",
    tag: "ESSAYS · RESEARCH · FIELD NOTES",
    color: "#B7C2A8",
  },
  {
    id: "dispatch-point",
    label: "Contact",
    path: "/contact/",
    asset: "contact",
    title: "Make the Call",
    subtitle: "Contact & collaboration",
    summary: "Got something worth building? Let’s put a plan in motion.",
    tag: "CHENNAI, INDIA · OPEN TO COLLABORATION",
    color: "#EDE4C8",
  },
].map((destination, index) => ({
  ...destination,
  index,
  pos: [index === 4 ? 0 : index % 2 === 0 ? 14 : -14, 0, -index * 28],
  textureUrl: `/images/district/simple/${destination.asset}.webp`,
  bannerLabel: destination.label.toUpperCase(),
}));
export const LAST_STOP = DISTRICT_LANDMARKS.length - 1;
// Pull back linearly near Contact; a smoothstep can cancel forward motion.
export function cameraRoadZ(progress, isMobile, aspect, fov) {
  const distance = isMobile
    ? Math.max(21, 18.5 / (2 * Math.tan((fov * Math.PI) / 360) * aspect))
    : 21;
  const pullback =
    Math.min(20, distance - 21) *
    Math.max(0, Math.min(1, progress - (LAST_STOP - 1)));
  return 21 - progress * 28 + pullback;
}
export function journeyProgress() {
  const track = document.getElementById("road-journey");
  if (!track) return 0;
  const intro = window.innerHeight * 1.2;
  return Math.max(
    0,
    Math.min(
      LAST_STOP,
      ((window.scrollY - intro) /
        Math.max(1, track.offsetHeight - window.innerHeight - intro)) *
        LAST_STOP,
    ),
  );
}
export function travelTo(index) {
  const track = document.getElementById("road-journey");
  if (!track) return;
  const intro = window.innerHeight * 1.2;
  window.scrollTo({
    top:
      intro +
      (index / LAST_STOP) * (track.offsetHeight - window.innerHeight - intro),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
