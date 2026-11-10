import FallingText from './components/FallingText';

export default function App() {
  return (
    <main className="profile-page">
      <div className="profile-top-balance" aria-hidden="true" />

      <div className="profile-hero-arena">
        <section className="profile-stack" aria-label="R Vijayrajkumar">
          <h1 className="profile-name-sr">R Vijayrajkumar</h1>

          <div className="profile-name profile-name-flow" aria-hidden="true">
            R Vijayrajkumar
          </div>
          <p className="profile-role">Entrepreneur</p>
          <p className="profile-location">Chennai</p>

          <div className="profile-brands">
            <a
              href="https://www.daas.media"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="daas.media"
              className="brand-link"
            >
              <img
                src="/images/daas-media-logo.png"
                alt="daas.media"
                className="brand-img-daas"
                width={166}
                height={72}
              />
            </a>

            <a
              href="https://www.chennairents.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ChennaiRENTS"
              className="brand-link"
            >
              <img
                src="/images/chennai-rents-logo.jpg"
                alt="ChennaiRENTS"
                className="brand-img-crents"
                width={1024}
                height={1024}
              />
            </a>
          </div>
        </section>

        <div className="profile-name-arena">
          <FallingText
            text="R Vijayrajkumar"
            trigger="hover"
            split="letters"
            gravity={1}
            bounciness={0.2}
            scatter={0.6}
            stagger={0.03}
            order="random"
            draggable
            cursorPush={0.5}
            restoreDelay={2}
            fontSize="clamp(38px, 7.6vw, 74px)"
            theme="dark"
            backgroundColor="transparent"
            className="profile-falling-name"
          />
        </div>
      </div>
    </main>
  );
}
