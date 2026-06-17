import { company } from "@/content/company"
import {
  formattedAddress,
  mapsDirectionsUrl,
  mapsEmbedUrl,
} from "@/lib/google-maps"
import type { Locale } from "@/content/routes"

export function ContactLocation({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"
  const embedUrl = mapsEmbedUrl(locale)
  const address = formattedAddress(locale)

  return (
    <aside className="contact-location" aria-label={isEn ? "Office location" : "Τοποθεσία γραφείου"}>
      <div className="contact-location-card">
        <p className="contact-card-eyebrow">{isEn ? "Our office" : "Τα γραφεία μας"}</p>
        <h2 className="contact-location-title">
          {isEn ? "Visit us" : "Επισκεφτείτε μας"}
        </h2>
        <address className="contact-location-address">
          <strong>{company.brand}</strong>
          <br />
          {address}
        </address>
        <ul className="contact-location-meta">
          <li>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </li>
        </ul>
        <div className="contact-location-actions">
          <a
            href={mapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            {isEn ? "Get directions" : "Οδηγίες στο Google Maps"}
          </a>
          <a
            href={company.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Google Business Profile
          </a>
        </div>
      </div>

      <div className="contact-map-wrap">
        <iframe
          title={isEn ? "TaxBG office on Google Maps" : "Γραφεία TaxBG στον χάρτη"}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="contact-map-iframe"
        />
      </div>

      <p className="contact-map-note">
        {isEn
          ? "Gotse Delchev, Bulgaria — Greek & English support."
          : "Γκότσε Ντέλτσεβ, Βουλγαρία — υποστήριξη στα Ελληνικά & Αγγλικά."}
      </p>
    </aside>
  )
}
