# Production-Ready Scroll-Driven Video & Frame Progression

A lightweight, high-performance vanilla **HTML + CSS + JavaScript** web application where a video or high-fidelity image sequence progresses **frame-by-frame based on the user's vertical scroll position**.

---

## 🌟 Key Features

1. **Pure Vanilla Implementation**:
   - Zero React, Zero Three.js, Zero heavy runtime dependencies.
   - Works natively in modern **Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari** (macOS, iOS, Android, Windows, Linux).
2. **Dual-Engine Architecture**:
   - **Frames Engine (`mode: 'frames'`)**: Preloads and renders 136 high-resolution frames extracted from the WhatsApp video sequence via high-DPI HTML5 Canvas with nearest-frame fallback and zero flicker.
   - **Video Engine (`mode: 'video'`)**: Direct hardware-accelerated HTML5 `<video>` scrubbing at `/uploads/video.mp4` with throttled `requestAnimationFrame` seeking.
3. **Sticky Fullscreen Viewport**:
   - The viewport stays visually pinned to the screen as you scroll through the tall container (configurable via `scrollMultiplier`, e.g., 500vh).
   - Once the scroll sequence completes, normal page scrolling continues seamlessly.
4. **Interactive End-Frame Headings Overlay**:
   - Upon reaching the final phase of the scroll sequence (progress &ge; 84%), the headings from the uploaded portfolio portals appear as separate, clickable cards:
     1. **`01 // BACKGROUND & PHILOSOPHY` &rarr; About & Strategic Journey** (`/about/`)
     2. **`02 // EXPERIENCE & PLATFORMS` &rarr; Ventures & Case Studies** (`/ventures/`)
     3. **`03 // THOUGHT LEADERSHIP` &rarr; Writing & Strategic Research`** (`/writing/`)
     4. **`04 // DIRECT DISPATCH` &rarr; Contact & Collaboration** (`/contact/`)
   - Engineered with fluid typography (`clamp()`) and strict wrapping rules (`overflow-wrap: break-word; word-break: normal`) to ensure **zero text overflow** on any screen size from 320px mobile to 4K displays.
5. **Interactive Controls & Scrubber**:
   - Floating HUD with **Reset**, **Play/Pause**, **Scrubber Slider**, and **Time/Frame Readout**.
   - Bidirectional synchronization: dragging the scrubber updates the scroll position and video frame; scrolling updates the scrubber.
6. **Accessibility & Responsive Resilience**:
   - Supports `prefers-reduced-motion` with an automated informational banner.
   - Recalculates geometry on window resize and mobile orientation change without jumping.
   - Keyboard accessible (`Space` to toggle preview play, `Arrow` keys to scrub).

---

## 📁 File Structure

```
scroll-video/
├── index.html              # Clean semantic HTML5 layout
├── css/
│   └── style.css           # Production CSS with variables, grid, fluid typography
├── js/
│   └── app.js              # Vanilla JS engine (rAF throttle, geometry, dual engine)
└── README.md               # Documentation and local setup
```

---

## ⚙️ Configuration Variables

Open `js/app.js` to customize:

```javascript
const CONFIG = {
  // Mode: 'frames' (default, using extracted frames) or 'video' (using /uploads/video.mp4)
  mode: 'frames',

  // Frame Sequence Configuration
  frames: {
    totalFrames: 136,
    startIndex: 1,
    getPath: (i) => `/frames/WhatsApp_Video_2026-09-13_at_4_33_24_AM_frames/frame_${String(i).padStart(3, '0')}.png`,
  },

  // Video Configuration
  video: {
    src: '/uploads/video.mp4',
  },

  // Scroll Multiplier: 5 = 500vh scroll container height
  // Increase to 7-10 for slower scrub speed, decrease to 3-4 for faster scrub
  scrollMultiplier: 5,

  // Enable or disable the floating HUD playback controls
  enableControls: true,

  // Scroll threshold (0.0 to 1.0) to reveal the end-frame headings overlay
  endFrameThreshold: 0.84,
};
```

---

## 📹 How to Replace `/uploads/video.mp4`

1. Place your MP4 video file into the project at:
   ```
   public/uploads/video.mp4
   ```
2. In `js/app.js`, switch `mode` to `'video'`:
   ```javascript
   CONFIG.mode = 'video';
   ```
3. Refresh the browser. The engine will automatically measure the video duration, stream frames, and scrub `video.currentTime` based on scroll position.

---

## 🚀 Running Locally

### Option 1: Using the Existing Dev Server
The project is already live on Vite:
- Open your browser to: **`http://localhost:3000/scroll-video/`**

### Option 2: Using Python Simple HTTP Server
```bash
# From within the scroll-video/ directory:
python -m http.server 8080
```
Then visit `http://localhost:8080`.

### Option 3: Using Node / npx serve
```bash
npx serve scroll-video
```

---

## 🧪 Quality Checklist Verification

- [x] **Top of section**: Displays frame 1 (or 0.00s) immediately.
- [x] **Middle of section**: Accurately displays middle frame (approx. frame 68).
- [x] **Bottom of section**: Reaches final frame and reveals the clickable headings overlay.
- [x] **Scroll down**: Progresses forward smoothly.
- [x] **Scroll up**: Progresses in reverse immediately without delay.
- [x] **Stop scrolling**: Playback instantly stops; no runaway playback.
- [x] **rAF scheduling**: Only one `requestAnimationFrame` is active at any time.
- [x] **Zero word overflow**: Verified with fluid card grid and responsive text wrapping.
- [x] **Resize & orientation**: Dynamically updates scrollable distance and canvas buffer.
