import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useRef,
} from "react";
import { flushSync } from "react-dom";
import Header from "./components/Header";
import RoadJourney from "./components/RoadJourney";
import DistrictMapWidget from "./components/DistrictMapWidget";

// Code-split multi-page subpages (lazy loaded on demand)
const AboutPage = lazy(() => import("./pages/AboutPage"));
const VenturesPage = lazy(() => import("./pages/VenturesPage"));
const ZiggersPage = lazy(() => import("./pages/ZiggersPage"));
const LoopMemoryPage = lazy(() => import("./pages/LoopMemoryPage"));
const WritingPage = lazy(() => import("./pages/WritingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const PageFallback = () => (
  <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin" />
  </div>
);

const preloadDestination = (path) => {
  if (path.startsWith("/about") || path.startsWith("/vijayrajkumar"))
    return import("./pages/AboutPage");
  if (path.startsWith("/ventures/ziggers"))
    return import("./pages/ZiggersPage");
  if (path.startsWith("/ventures/loopmemory"))
    return import("./pages/LoopMemoryPage");
  if (path.startsWith("/ventures")) return import("./pages/VenturesPage");
  if (path.startsWith("/events")) return import("./pages/EventsPage");
  if (path.startsWith("/contact")) return import("./pages/ContactPage");
  if (
    path.startsWith("/writing") ||
    path.includes("startup-builder") ||
    path.includes("catering-workers")
  )
    return import("./pages/WritingPage");
  return Promise.resolve();
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  const homeScroll = useRef(0);
  const renderedPath = useRef(currentPath);
  const navigation = useRef(0);
  const transitionTo = useCallback(async (path, push = false) => {
    if (renderedPath.current === path) return;
    const sequence = ++navigation.current;
    document.documentElement.dataset.navigating = "true";
    try {
      await preloadDestination(path);
      if (sequence !== navigation.current) return;
      if (renderedPath.current === "/") homeScroll.current = window.scrollY;
      const update = async () => {
        if (push) window.history.pushState(null, "", path);
        renderedPath.current = path;
        flushSync(() => setCurrentPath(path));
        // Let already-prefetched lazy pages commit before taking the new snapshot.
        // View transitions suspend animation frames during this callback.
        await new Promise((resolve) => setTimeout(resolve, 0));
        window.scrollTo({
          top: path === "/" ? homeScroll.current : 0,
          behavior: "instant",
        });
        const main = document.querySelector("main");
        if (main) {
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
        }
      };
      if (
        document.startViewTransition &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const transition = document.startViewTransition(update);
        transition.ready.catch(() => {});
        await transition.finished.catch(() => {});
      } else await update();
    } catch {
      if (push) window.location.assign(path);
    } finally {
      if (sequence === navigation.current)
        delete document.documentElement.dataset.navigating;
    }
  }, []);
  const handleNavigate = useCallback(
    (path) => transitionTo(path, true),
    [transitionTo],
  );
  useEffect(() => {
    const pop = () => transitionTo(window.location.pathname);
    const anchor = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return null;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.hash || url.search) return null;
      return url.pathname;
    };
    const click = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const path = anchor(event);
      if (path && path !== location.pathname) {
        event.preventDefault();
        handleNavigate(path);
      }
    };
    const prefetch = (event) => {
      const path = anchor(event);
      if (path) preloadDestination(path).catch(() => {});
    };
    window.addEventListener("popstate", pop);
    document.addEventListener("click", click);
    document.addEventListener("pointerover", prefetch);
    document.addEventListener("focusin", prefetch);
    return () => {
      window.removeEventListener("popstate", pop);
      document.removeEventListener("click", click);
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
    };
  }, [handleNavigate, transitionTo]);

  // Route matching
  const normalizedPath = currentPath.toLowerCase().replace(/\/+$/, "");

  let subpageContent = null;

  if (normalizedPath === "/vijayrajkumar" || normalizedPath === "/about") {
    if (normalizedPath === "/vijayrajkumar" && typeof window !== "undefined") {
      window.history.replaceState(null, "", "/about/");
    }
    subpageContent = <AboutPage />;
  } else if (normalizedPath === "/ventures") {
    subpageContent = <VenturesPage />;
  } else if (normalizedPath === "/ventures/ziggers") {
    subpageContent = <ZiggersPage />;
  } else if (normalizedPath === "/ventures/loopmemory") {
    subpageContent = <LoopMemoryPage />;
  } else if (normalizedPath === "/events") {
    subpageContent = <EventsPage />;
  } else if (
    normalizedPath === "/writing" ||
    normalizedPath.startsWith("/writing/")
  ) {
    subpageContent = <WritingPage />;
  } else if (normalizedPath === "/startup-builder-venture-builder-india") {
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        "/writing/startup-builder-venture-builder-india/",
      );
    }
    subpageContent = (
      <WritingPage initialArticleId="startup-builder-venture-builder-india" />
    );
  } else if (normalizedPath === "/catering-workers-in-chennai") {
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        "/writing/catering-workers-in-chennai/",
      );
    }
    subpageContent = (
      <WritingPage initialArticleId="catering-workers-in-chennai" />
    );
  } else if (normalizedPath === "/contact") {
    subpageContent = <ContactPage />;
  } else if (normalizedPath !== "" && normalizedPath !== "/") {
    subpageContent = <NotFoundPage />;
  }

  // If viewing a standalone subpage, render with persistent GTA Radar HUD
  if (subpageContent) {
    return (
      <div className="district-page">
        <Header />

        <div id="mission-content" className="mission-content">
          <Suspense fallback={<PageFallback />}>{subpageContent}</Suspense>
        </div>
        <DistrictMapWidget />
      </div>
    );
  }

  return (
    <RoadJourney
      onNavigate={handleNavigate}
      resumeScroll={homeScroll.current}
    />
  );
}
