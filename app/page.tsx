"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  "Por tu sonrisa, Karina, que vuelve bonito hasta un día cualquiera.",
  "Por la paz que siento cuando estoy contigo.",
  "Por cada detalle tuyo que hace mi mundo más especial.",
  "Porque contigo aprendí que el amor también se siente como hogar.",
  "Porque hasta los momentos sencillos se vuelven inolvidables a tu lado.",
  "Porque eres tú, y no cambiaría ni un pedacito de nuestra historia.",
];

const promises = [
  ["01", "Cuidar tu corazón", "Tratar lo nuestro con la ternura que merece."],
  ["02", "Celebrar tus sueños", "Estar a tu lado mientras conquistas cada uno."],
  ["03", "Elegirte siempre", "En los días fáciles y también en los complicados."],
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [reason, setReason] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [finalOpened, setFinalOpened] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function playPhrase(context: AudioContext, start: number) {
    const melody = [
      [261.63, 0], [329.63, .6], [392, 1.2], [493.88, 1.8],
      [440, 2.6], [392, 3.2], [329.63, 3.8], [293.66, 4.6],
      [349.23, 5.2], [440, 5.8], [392, 6.6], [329.63, 7.3],
    ];
    melody.forEach(([frequency, offset]) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start + offset);
      gain.gain.linearRampToValueAtTime(.055, start + offset + .08);
      gain.gain.exponentialRampToValueAtTime(.001, start + offset + .72);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start + offset);
      oscillator.stop(start + offset + .8);
    });
  }

  function scheduleMusic(context: AudioContext) {
    playPhrase(context, context.currentTime + .05);
    loopTimer.current = setTimeout(() => scheduleMusic(context), 8200);
  }

  async function toggleMusic() {
    if (musicPlaying) {
      if (loopTimer.current) clearTimeout(loopTimer.current);
      await audioContext.current?.suspend();
      setMusicPlaying(false);
      return;
    }
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      scheduleMusic(audioContext.current);
    } else {
      await audioContext.current.resume();
      scheduleMusic(audioContext.current);
    }
    setMusicPlaying(true);
  }

  useEffect(() => {
    return () => {
      if (loopTimer.current) clearTimeout(loopTimer.current);
      void audioContext.current?.close();
    };
  }, []);

  return (
    <main>
      <button
        className={`music-button ${musicPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pausar música romántica" : "Reproducir música romántica"}
      >
        <span className="music-icon" aria-hidden="true">{musicPlaying ? "♫" : "♪"}</span>
        <span>{musicPlaying ? "Nuestra melodía" : "Ponle música"}</span>
        <i aria-hidden="true" />
      </button>

      <section className="hero">
        <div className="stars" aria-hidden="true">
          {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
        </div>
        <div className="hero-copy">
          <p className="eyebrow">01 · AGOSTO</p>
          <p className="for-you">Una página hecha solo para ti</p>
          <h1>
            Feliz día,
            <span>Karina</span>
          </h1>
          <p className="intro">
            Hay personas que llegan a tu vida y, sin hacer ruido, la convierten
            en tu lugar favorito. Tú eres esa persona para mí.
          </p>
          <a className="primary-button" href="#carta">
            Descubre tu sorpresa <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="moon" aria-hidden="true" />
        <div className="scroll-hint" aria-hidden="true">DESLIZA</div>
      </section>

      <section className="name-section">
        <p className="eyebrow gold">LA DUEÑA DE ESTA HISTORIA</p>
        <div className="name-display" aria-label="Karina">
          {"KARINA".split("").map((letter, index) => (
            <span key={letter + index} style={{ animationDelay: `${index * .12}s` }}>{letter}</span>
          ))}
        </div>
        <p>Seis letras. Un nombre. Mi persona favorita.</p>
      </section>

      <section className="letter-section" id="carta">
        <div className="section-heading">
          <p className="eyebrow dark">PARA LA PERSONA MÁS BONITA</p>
          <h2>Una carta para Karina</h2>
          <div className="flourish">♡</div>
        </div>

        <button
          className={`envelope ${opened ? "opened" : ""}`}
          onClick={() => setOpened(true)}
          aria-expanded={opened}
        >
          <span className="envelope-back" />
          <span className="letter">
            <span className="letter-kicker">Mi querida Karina,</span>
            <span>
              No sabía que a la vida le faltaba algo hasta que llegaste tú.
              Hoy celebro tu sonrisa, tu manera de querer y la suerte infinita
              de coincidir contigo.
            </span>
            <strong>Te elegiría en esta vida y en todas las que existan.</strong>
            <em>Con todo mi amor ♡</em>
          </span>
          <span className="envelope-front" />
          <span className="seal">K</span>
          {!opened && <span className="tap-label">Toca para abrir</span>}
        </button>
      </section>

      <section className="reasons-section">
        <div className="reason-card">
          <p className="eyebrow gold">UNA DE TANTAS RAZONES</p>
          <div className="quote-mark">“</div>
          <p className="reason-text" key={reason}>{reasons[reason]}</p>
          <button className="text-button" onClick={() => setReason((reason + 1) % reasons.length)}>
            Otra razón <span aria-hidden="true">♡</span>
          </button>
          <div className="reason-dots" aria-hidden="true">
            {reasons.map((_, index) => <i className={index === reason ? "active" : ""} key={index} />)}
          </div>
        </div>
      </section>

      <section className="promises-section">
        <div className="section-heading">
          <p className="eyebrow dark">LO QUE QUIERO REGALARTE</p>
          <h2>Tres promesas para nosotros</h2>
        </div>
        <div className="promise-grid">
          {promises.map(([number, title, copy]) => (
            <article className="promise" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
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
          <div className="signature">Siempre tú, Karina <span>♡</span></div>
        </div>
      </section>

      <section className="final-surprise">
        <div className={`final-card ${finalOpened ? "revealed" : ""}`}>
          {!finalOpened ? (
            <>
              <span className="gift-heart">♡</span>
              <p className="eyebrow gold">UNA ÚLTIMA SORPRESA</p>
              <h2>Karina, tengo una pregunta para ti…</h2>
              <button className="final-button" onClick={() => setFinalOpened(true)}>
                Descubrirla
              </button>
            </>
          ) : (
            <div className="answer">
              <span className="big-heart">♡</span>
              <h2>¿Quieres seguir creando recuerdos hermosos conmigo?</h2>
              <p>Porque mi lugar favorito siempre será donde estés tú.</p>
              <strong>Te quiero, Karina</strong>
            </div>
          )}
        </div>
      </section>

      <footer>
        <span>Hecho especialmente para Karina</span>
        <b>♡</b>
        <span>1 de agosto</span>
      </footer>
    </main>
  );
}
