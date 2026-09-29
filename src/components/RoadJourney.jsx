import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import Header from "./Header";
import OpeningSequence from "./OpeningSequence";
const PlayableDistrict3D = lazy(() => import("./PlayableDistrict3D"));
import DistrictMapWidget from "./DistrictMapWidget";
import {
  DISTRICT_LANDMARKS,
  journeyProgress,
  travelTo,
  LAST_STOP,
} from "../data/district";

export default function RoadJourney({ onNavigate, resumeScroll = 0 }) {
  const [worldReady, setWorldReady] = useState(resumeScroll > 0);
  useEffect(() => {
    const load = () => setWorldReady(true);
    const timer = setTimeout(load, 1600);
    window.addEventListener("scroll", load, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", load);
    };
  }, []);
  const [revealed, setRevealed] = useState(false);
  const [explore, setExplore] = useState(false);
  const [telemetry, setTelemetry] = useState({ progress: 0 });
  const selectLandmark = useCallback(
    (landmark) => onNavigate(landmark.path),
    [onNavigate],
  );
  // Navigation must follow native scrolling, independently of GPU frame rate.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = journeyProgress();
      setTelemetry((previous) =>
        Math.abs(previous.progress - progress) < 0.0001
          ? previous
          : { progress },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);
  const active = DISTRICT_LANDMARKS[Math.round(telemetry.progress)];
  useEffect(() => {
    const keys = new Set();
    let frame,
      previous = 0;
    const clear = () => keys.clear();
    const down = (event) => {
      if (event.key === "Escape") setExplore(false);
      if (
        event.target.closest(
          'input, textarea, select, [contenteditable="true"], .journey-map-panel',
        )
      )
        return;
      if (
        event.key === "Enter" &&
        !event.target.closest("button, a") &&
        revealed
      )
        onNavigate(DISTRICT_LANDMARKS[Math.round(journeyProgress())].path);
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s"].includes(
          event.key,
        )
      ) {
        event.preventDefault();
        keys.add(event.key);
      }
    };
    const up = (event) => keys.delete(event.key);
    const tick = (time) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      const forward =
        keys.has("ArrowUp") || keys.has("ArrowRight") || keys.has("w");
      const backward =
        keys.has("ArrowDown") || keys.has("ArrowLeft") || keys.has("s");
      if (forward !== backward)
        window.scrollBy({
          top: (forward ? 1 : -1) * delta * window.innerHeight * 0.65,
          behavior: "instant",
        });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [onNavigate, revealed]);
  return (
    <div
      className={`road-experience ${explore ? "is-exploring" : ""} ${revealed ? "road-revealed" : "at-opening"}`}
    >
      <div className="road-scene">
        <Suspense fallback={null}>
          {worldReady && (
            <PlayableDistrict3D
              activeLandmarkId={active.id}
              isExploreMode={explore}
              onSelectLandmark={selectLandmark}
            />
          )}
        </Suspense>
      </div>
      <OpeningSequence onReveal={setRevealed} />
      <div className="road-header">
        <Header />
      </div>

      <main id="road-journey" aria-label="Roadside portfolio journey">
        <h1 className="sr-only">Vijayrajkumar</h1>
        {DISTRICT_LANDMARKS.map((landmark) => (
          <section
            key={landmark.id}
            id={landmark.id}
            aria-label={landmark.label}
            className="road-chapter"
          >
            <h2 className="sr-only">{landmark.label}</h2>
          </section>
        ))}
      </main>
      <section
        className={`home-mission ${active.index % 2 === 1 ? "copy-right" : ""} ${active.index === LAST_STOP ? "is-terminus" : ""}`}
        aria-label={active.label}
      >
        <div className="home-mission-shade" />
        <div className="home-mission-copy" key={active.id}>
          <span className="mission-code">
            <i /> 0{active.index + 1} / {active.label.toUpperCase()}
          </span>
          <h2>{active.title}</h2>
          <p className="mission-subtitle">{active.subtitle}</p>
          <p className="mission-summary">{active.summary}</p>
          <a
            className="mission-enter"
            href={active.path}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(active.path);
            }}
          >
            EXPLORE {active.label.toUpperCase()} <span>↗</span>
          </a>
        </div>
        <div className="home-mission-footer">
          <span>{active.tag}</span>
          <span aria-hidden="true">★★★★★</span>
        </div>
      </section>
      <div className="road-mode-controls">
        <button
          aria-label={explore ? "Exit Explore mode" : "Explore mode"}
          onClick={() => setExplore(!explore)}
        >
          {explore ? "Exit explore" : "Explore mode"}
        </button>
        <span>
          {explore
            ? "↑ / ↓ to travel · swipe or scroll"
            : "Scroll to explore the district"}
        </span>
      </div>
      <div className="road-travel-controls" aria-label="Travel along the road">
        <button
          aria-label="Previous destination"
          disabled={telemetry.progress < 0.02}
          onClick={() =>
            travelTo(Math.max(0, Math.ceil(telemetry.progress - 0.05) - 1))
          }
        >
          ↑
        </button>
        <button
          aria-label="Next destination"
          disabled={telemetry.progress > LAST_STOP - 0.02}
          onClick={() =>
            travelTo(
              Math.min(LAST_STOP, Math.floor(telemetry.progress + 0.05) + 1),
            )
          }
        >
          ↓
        </button>
      </div>
      <DistrictMapWidget
        activeLandmarkId={active.id}
        playerTelemetry={telemetry}
        onSelectLandmark={(landmark) => travelTo(landmark.index)}
      />
      <div
        className="road-progress"
        role="progressbar"
        aria-label="Journey progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((telemetry.progress / LAST_STOP) * 100)}
      >
        <span
          style={{ transform: `scaleX(${telemetry.progress / LAST_STOP})` }}
        />
      </div>
    </div>
  );
}
