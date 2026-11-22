import { EnquiryForm } from "@/components/enquiry-form";

export const metadata = { title: "Visit & contact | TeddyPups U.A.E." };

export default function Contact() {
  return (
    <main id="main" className="contact-page">
      <div className="wrap">
        <header className="inner-hero contact-heading">
          <h1>
            Get in touch
            <br />
            with us
          </h1>
          <p>
            Have questions about our puppies or adoption process? Fill out the
            form, and our team will get back to you promptly. Whether ready to
            adopt or just seeking info, we&apos;d love to hear from you!
          </p>
        </header>
        <div className="contact-grid">
          <aside className="contact-details">
            <a
              className="button green"
              href="https://wa.me/919898124987"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp +971 50 000 0000
            </a>
            <p>
              <span className="hand">call us</span>
              <br />
              <a href="tel:+971500000000">+971 50 000 0000</a>
            </p>
            <p>
              <span className="hand">email</span>
              <br />
              <a href="mailto:info@instabizweb.com">info@instabizweb.com</a>
            </p>
            <section className="visit-card">
              <div>
                <h2>Visit us in Downtown Dubai</h2>
                <p>
                  Step into our Downtown Dubai showroom and experience the joy
                  of choosing your puppy face-to-face.
                </p>
                <p>
                  <strong>Downtown Dubai, United Arab Emirates</strong>
                </p>
                <a
                  className="button outline"
                  href="https://www.google.com/maps/search/?api=1&query=Downtown+Dubai"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps ↗
                </a>
              </div>
              <img
                src="/media/journey-snap-4.webp"
                alt="A puppy in the showroom"
              />
            </section>
          </aside>
          <div className="contact-letter">
            <EnquiryForm letter />
            <img
              className="contact-letter__teddy"
              src="/media/teddy-sit.svg"
              alt="Teddy, waiting for your letter"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
