import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Неактивна Фирма в България — Задължения и Разходи 2026 | TaxBG.eu",
  description:
    "Разходи за поддържане на неактивна фирма в България: от 25€/месец. Какви задължения има и кога е изгодно да запазите фирмата вместо да я закриете.",
  robots: { index: false, follow: false },
}

export default function BgCostInactivePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Неактивна фирма</p>
        <h1>Неактивна Фирма в България</h1>
        <p className="seo-page-lead">
          Имате българска фирма, която не използвате в момента? Това не означава нулеви
          задължения. Данъчната администрация (НАП) изисква годишна декларация дори при
          нулева дейност. Ето какво струва и какво се случва, ако не подадете декларация.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Какво означава "неактивна" по закон</h2>
          <p>
            Фирмата е неактивна, когато не издава фактури и не извършва търговска
            дейност. Но <strong>не означава, че не подава декларации</strong>: НАП
            изисква годишна декларация за нулева дейност, а при наличие на VIES
            регистрация — и месечни справки-декларации по ДДС.
          </p>
        </section>

        <section className="seo-section">
          <h2>Разходи на месец</h2>
          <div className="seo-price-compare">
            <div className="seo-price-compare-item">
              <span className="seo-price">40€</span>
              <span className="seo-price-label">/ месец</span>
              <p>Неактивна с VIES</p>
              <p className="seo-price-note">
                Фирмата остава регистрирана в VIES — можете да подновите дейността
                по всяко време без нова регистрация.
              </p>
            </div>
            <div className="seo-price-compare-item">
              <span className="seo-price">25€</span>
              <span className="seo-price-label">/ месец</span>
              <p>Неактивна без VIES</p>
              <p className="seo-price-note">
                При нова VIES регистрация в бъдеще ще са необходими допълнително
                време и разходи.
              </p>
            </div>
          </div>
        </section>

        <section className="seo-section">
          <h2>Рискове при неподаване на декларации</h2>
          <p>
            Много собственици смятат, че ако фирмата не работи, не трябва нищо да
            се прави. Това е грешка — НАП начислява лихви и глоби при неподадени
            декларации, дори при нулева дейност. Годишната декларация е задължителна.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Имате неактивна фирма?</h3>
          <p>Кажете ни ситуацията — веднага ще ви уведомим какво е необходимо и колко струва.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Свържете се →
            </Link>
            <Link href="/bg/закриване-фирма-българия" className="btn-ghost-dark">
              Алтернатива: закрийте фирмата
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
