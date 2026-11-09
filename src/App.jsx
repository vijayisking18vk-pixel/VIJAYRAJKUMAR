import HalftoneReveal from './components/HalftoneReveal';

export default function App() {
  return (
    <main>
      <section className="hero-section" aria-label="Hero">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <HalftoneReveal
            src="/images/hero-portrait.png"
            mode="mono"
            shape="dot"
            cellSize={6}
            angle={45}
            inkColor="#f4f1ea"
            paperColor="#120f17"
            revealRadius={160}
            dotScale={1}
            contrast={1.1}
            brightness={0}
            invert={false}
            roughness={0}
            misregistration={0}
            fit="contain"
            accentColor="#ff4f2a"
            softness={0.6}
            linger={1.2}
            reverse={false}
            wander={false}
            clickBurst
            intro
          />
        </div>
      </section>
    </main>
  );
}
