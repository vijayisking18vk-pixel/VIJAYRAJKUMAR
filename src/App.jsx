export default function App() {
  return (
    <main className="profile-page">
      <section className="profile-stack" aria-label="R Vijayrajkumar">
        <h1 className="profile-name">R Vijayrajkumar</h1>
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
    </main>
  );
}
