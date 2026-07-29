"use client";

import { useState } from "react";

const reasons = [
  "Por tu sonrisa, que vuelve bonito hasta un día cualquiera.",
  "Por la paz que siento cuando estoy contigo.",
  "Por cada detalle tuyo que hace mi mundo más especial.",
  "Porque contigo aprendí que el amor también se siente como hogar.",
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [reason, setReason] = useState(0);

  function showAnotherReason() {
    setReason((current) => (current + 1) % reasons.length);
  }

  return (
    <main>
      <section className="hero">
        <div className="stars" aria-hidden="true">
          {Array.from({ length: 24 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <div className="hero-copy">
          <p className="eyebrow">01 · AGOSTO</p>
          <p className="for-you">Una página hecha solo para ti</p>
          <h1>
            Feliz día,
            <span>mi amor</span>
          </h1>
          <p className="intro">
            Hay personas que llegan a tu vida y, sin hacer ruido, la convierten
            en tu lugar favorito.
          </p>
          <a className="primary-button" href="#carta">
            Descubre tu sorpresa <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="moon" aria-hidden="true" />
        <div className="scroll-hint" aria-hidden="true">DESLIZA</div>
      </section>

      <section className="letter-section" id="carta">
        <div className="section-heading">
          <p className="eyebrow dark">PARA LA PERSONA MÁS BONITA</p>
          <h2>Una carta para ti</h2>
          <div className="flourish">♡</div>
        </div>

        <button
          className={`envelope ${opened ? "opened" : ""}`}
          onClick={() => setOpened(true)}
          aria-expanded={opened}
        >
          <span className="envelope-back" />
          <span className="letter">
            <span className="letter-kicker">Mi amor,</span>
            <span>
              No sabía que a la vida le faltaba algo hasta que llegaste tú.
              Hoy celebro tu sonrisa, tu manera de querer y la suerte infinita
              de coincidir contigo.
            </span>
            <strong>Te elegiría en esta vida y en todas las que existan.</strong>
            <em>Con todo mi amor ♡</em>
          </span>
          <span className="envelope-front" />
          <span className="seal">♡</span>
          {!opened && <span className="tap-label">Toca para abrir</span>}
        </button>
      </section>

      <section className="reasons-section">
        <div className="reason-card">
          <p className="eyebrow gold">UNA DE TANTAS RAZONES</p>
          <div className="quote-mark">“</div>
          <p className="reason-text" key={reason}>{reasons[reason]}</p>
          <button className="text-button" onClick={showAnotherReason}>
            Otra razón <span aria-hidden="true">♡</span>
          </button>
        </div>
      </section>

      <section className="keepsake">
        <div className="keepsake-image">
          <img
            src="/tarjeta-dia-de-la-novia.png"
            alt="Tarjeta romántica del Día de la Novia bajo la luz de la luna"
          />
        </div>
        <div className="keepsake-copy">
          <p className="eyebrow dark">NUESTRO PEQUEÑO UNIVERSO</p>
          <h2>Qué bonito coincidir contigo</h2>
          <p>
            Si pudiera volver a elegir el lugar y el momento, volvería a
            encontrarte. Porque desde que estás aquí, cada instante tiene un
            poquito más de luz.
          </p>
          <div className="signature">
            Siempre tú <span>♡</span>
          </div>
        </div>
      </section>

      <footer>
        <span>Hecho con amor</span>
        <b>♡</b>
        <span>1 de agosto</span>
      </footer>
    </main>
  );
}
