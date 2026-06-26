import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Закриване на Фирма в България — Процедура и Разходи 2026 | TaxBG.eu",
  description:
    "Закриване на ЕООД/ООД в България: 850€ еднократно, процедура минимум 6 месеца. Какво трябва да уредите преди да започне ликвидацията.",
  robots: { index: false, follow: false },
}

export default function BgCostClosurePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Ликвидация и заличаване</p>
        <h1>Закриване на Фирма в България</h1>
        <p className="seo-page-lead">
          Закриването на българска фирма е конкретна правна процедура с минимален срок
          от 6 месеца. Какво струва, какво се случва на всеки етап и какво трябва да
          бъде уредено преди да започне ликвидацията.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Кога е по-изгодно закриване вместо "замразяване"</h2>
          <p>
            Неактивната фирма струва 25–40€/месец за поддържане на данъчна
            съответствие. Ако не планирате да я използвате отново, закриването е
            по-изгодно в дългосрочен план — но изисква еднократен разход и минимум
            6 месеца процедура.
          </p>
        </section>

        <section className="seo-section">
          <h2>Цена на закриването</h2>
          <div className="seo-price-highlight">
            <span className="seo-price">850€</span>
            <span className="seo-price-label">еднократно</span>
          </div>
          <p>
            Включва: процедура по ликвидация, заличаване от Търговски регистър,
            VIES и НАП.
          </p>
          <p>
            <strong>Предварително условие:</strong> нулеви задължения към НАП —
            ликвидацията не може да стартира при наличие на данъчни или осигурителни
            задължения.
          </p>
        </section>

        <section className="seo-section">
          <h2>Срок на процедурата</h2>
          <p>
            Българският закон определя минимален срок на ликвидация от 6 месеца след
            публикуване на решението за прекратяване в Търговски регистър. Този период
            дава възможност на кредиторите да предявят евентуални вземания.
          </p>
        </section>

        <section className="seo-section">
          <h2>Какво трябва да наредите преди закриването</h2>
          <p className="seo-placeholder">
            [— Съдържанието ще бъде добавено от Panagiotis: нулиране на ДДС,
            последен годишен отчет, банкова сметка, НАП. —]
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Искате да закриете фирма?</h3>
          <p>Свържете се с нас — ще проверим дали има незавършени задължения преди да започнем.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Свържете се →
            </Link>
            <Link href="/bg/неактивна-фирма-българия" className="btn-ghost-dark">
              Алтернатива: оставете я неактивна
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
