import React, { useState } from "react";
import { DISTRICT_LANDMARKS, LAST_STOP } from "../data/district";
function Atlas({ progress, current }) {
  return (
    <svg
      viewBox="0 0 300 290"
      className="district-atlas"
      role="img"
      aria-label="Five destinations along the central boulevard"
    >
      <defs>
        <pattern
          id="blocks"
          width="56"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect width="56" height="48" fill="#26342c" />
          <path
            d="M0 0H56V48H0Z"
            fill="none"
            stroke="#9da58b"
            strokeWidth="6"
          />
          <rect x="9" y="10" width="17" height="27" fill="#647260" />
          <rect x="31" y="10" width="16" height="11" fill="#76816b" />
          <rect x="31" y="26" width="16" height="11" fill="#4f6053" />
        </pattern>
      </defs>
      <rect width="300" height="290" fill="url(#blocks)" />
      <path
        d="M250 0Q224 50 261 95T245 190T252 290H300V0Z"
        fill="#617f80"
        stroke="#b2b894"
        strokeWidth="6"
      />
      <path
        d="M14 70H106V128H14Z M180 202H229V267H180Z"
        fill="#3d5940"
        stroke="#859773"
        strokeWidth="3"
      />
      {[30, 50, 70, 90].map((x) => (
        <g key={x} fill="#728c58">
          <circle cx={x} cy="87" r="5" />
          <circle cx={x} cy="112" r="5" />
        </g>
      ))}
      <path
        d="M145 300V28 M0 160H244 M0 220H242 M0 48H249"
        fill="none"
        stroke="#171e19"
        strokeWidth="21"
      />
      <path
        d="M145 300V28 M0 160H244 M0 220H242 M0 48H249"
        fill="none"
        stroke="#c6c2a1"
        strokeWidth="13"
      />
      <path d="M145 276V31" stroke="#e6bf65" strokeWidth="4" />
      {DISTRICT_LANDMARKS.map((lm) => {
        const y = 260 - lm.index * 55,
          x = lm.index === LAST_STOP ? 145 : lm.pos[0] > 0 ? 179 : 111;
        return (
          <g key={lm.id}>
            <path d={`M145 ${y}H${x}`} stroke="#e6bf65" strokeWidth="2" />
            <circle
              cx={x}
              cy={y}
              r="12"
              fill={lm.id === current ? "#efce78" : "#18241c"}
              stroke={lm.color}
              strokeWidth="2"
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill={lm.id === current ? "#18241c" : "#eee8d2"}
              fontSize="11"
              fontWeight="bold"
            >
              {lm.index + 1}
            </text>
          </g>
        );
      })}
      <path
        d={`M145 ${260 - progress * 55 - 9}l-7 17 7-4 7 4Z`}
        fill="#fff9e7"
        stroke="#111"
        strokeWidth="2"
      />
      <text x="22" y="145" fill="#d2d6bb" fontSize="8" letterSpacing="2">
        GROVE PARK
      </text>
      <text
        x="276"
        y="180"
        fill="#d7e4d1"
        fontSize="8"
        textAnchor="middle"
        transform="rotate(-90 276 180)"
      >
        COASTLINE
      </text>
      <g transform="translate(25 250)">
        <path d="M0 -10L-5 6H5Z" fill="#eee4c4" />
        <text y="20" textAnchor="middle" fill="#eee4c4" fontSize="10">
          N
        </text>
      </g>
    </svg>
  );
}
export default function DistrictMapWidget({
  activeLandmarkId,
  playerTelemetry,
  onSelectLandmark,
}) {
  const [open, setOpen] = useState(false);
  const current =
    activeLandmarkId ||
    DISTRICT_LANDMARKS.find((lm) =>
      window.location.pathname.startsWith(lm.path),
    )?.id ||
    "safehouse";
  const progress = Math.max(
    0,
    Math.min(
      LAST_STOP,
      playerTelemetry?.progress ??
        DISTRICT_LANDMARKS.findIndex((lm) => lm.id === current),
    ),
  );
  const select = (lm) => {
    if (onSelectLandmark) onSelectLandmark(lm);
    else {
      window.history.pushState(null, "", lm.path);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0);
    }
    setOpen(false);
  };
  return (
    <aside className="journey-map" aria-label="District route map">
      {open && (
        <div
          className="journey-map-panel"
          id="district-route-map"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              event.stopPropagation();
            }
          }}
        >
          <div className="journey-map-heading">
            <span>THE DISTRICT</span>
            <button aria-label="Close map" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <p>Five destinations · one boulevard</p>
          <Atlas progress={progress} current={current} />
          <div className="atlas-destinations">
            {DISTRICT_LANDMARKS.map((lm) => (
              <button
                key={lm.id}
                aria-current={current === lm.id ? "location" : undefined}
                onClick={() => select(lm)}
              >
                <b style={{ color: lm.color }}>0{lm.index + 1}</b>
                <span>{lm.label}</span>
                <small>{lm.index === LAST_STOP ? "END OF ROAD" : "↗"}</small>
              </button>
            ))}
          </div>
          <div className="journey-map-legend">
            ▲ Your position <span>Illustrated portfolio world</span>
          </div>
        </div>
      )}
      <button
        className="journey-map-toggle"
        aria-expanded={open}
        aria-controls={open ? "district-route-map" : undefined}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">◈</span>
        {open ? "Close map" : "District map"}
      </button>
    </aside>
  );
}
