"use client";

import { useEffect, useState } from "react";
import AgeBadge from "./AgeBadge";

type Language = "en" | "es";
type Localized = { en: string; es: string };
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const kittens: Array<{
  name: Localized;
  pronouns: Localized;
  image: string;
  alt: Localized;
  status: "available" | "pending";
  traits: Localized[];
  text: Localized;
}> = [
  {
    name: { en: "Mango", es: "Mango" },
    pronouns: { en: "Boy", es: "Macho" },
    image: "/kittens/mango.jpeg",
    alt: { en: "Mango, a cream-colored kitten, walking toward the camera", es: "Mango, un gatito color crema, caminando hacia la cámara" },
    status: "available",
    traits: [{ en: "Friendly", es: "Amigable" }, { en: "Affectionate", es: "Cariñoso" }, { en: "Social", es: "Sociable" }],
    text: {
      en: "Mango loves attention and comes over to greet people. He wants to be involved and would thrive with plenty of companionship and affection.",
      es: "A Mango le encanta recibir atención y se acerca para saludar. Quiere participar en todo y sería muy feliz con mucha compañía y cariño.",
    },
  },
  {
    name: { en: "Mocha", es: "Mocha" },
    pronouns: { en: "Girl", es: "Hembra" },
    image: "/kittens/mocha.jpeg",
    alt: { en: "Mocha, a tortoiseshell kitten, standing beside a cardboard box", es: "Mocha, una gatita carey, junto a una caja de cartón" },
    status: "available",
    traits: [{ en: "Easygoing", es: "Tranquila" }, { en: "Curious", es: "Curiosa" }, { en: "Road-trip ready", es: "Lista para viajar" }],
    text: {
      en: "Mocha loves car rides. She enjoys settling in for the journey and makes a sweet little travel companion.",
      es: "A Mocha le encantan los paseos en carro. Disfruta acomodarse para el viaje y es una compañera muy dulce.",
    },
  },
  {
    name: { en: "Baby", es: "Baby" },
    pronouns: { en: "Girl", es: "Hembra" },
    image: "/kittens/baby.jpeg",
    alt: { en: "Baby, a small tabby kitten, sitting in a cardboard box", es: "Baby, una pequeña gatita atigrada, sentada en una caja de cartón" },
    status: "available",
    traits: [{ en: "Shy", es: "Tímida" }, { en: "Sweet", es: "Dulce" }, { en: "Expert napper", es: "Experta en siestas" }],
    text: {
      en: "Baby is the shyest of the litter, but she is very sweet once she feels comfortable. She loves to sleep and can turn almost any cozy spot into the perfect place for a nap.",
      es: "Baby es la más tímida de la camada, pero es muy dulce cuando se siente en confianza. Le encanta dormir y puede convertir casi cualquier rincón cómodo en el lugar perfecto para una siesta.",
    },
  },
  {
    name: { en: "Toby", es: "Toby" },
    pronouns: { en: "Boy", es: "Macho" },
    image: "/kittens/toby.jpeg",
    alt: { en: "Toby, a black-and-white kitten, climbing on the side of his playpen", es: "Toby, un gatito blanco y negro, trepando por su corral" },
    status: "available",
    traits: [{ en: "Playful", es: "Juguetón" }, { en: "Outgoing", es: "Extrovertido" }, { en: "Big brother", es: "Hermano mayor" }],
    text: {
      en: "The biggest kitten—and often the first one awake. Toby is extremely social and makes it his mission to wake everyone up when it is time to play.",
      es: "Es el más grande y muchas veces el primero en despertar. Toby es muy sociable y se encarga de despertar a todos cuando llega la hora de jugar.",
    },
  },
  {
    name: { en: "The Curious One", es: "El Curioso" },
    pronouns: { en: "Boy · Name pending", es: "Macho · Nombre pendiente" },
    image: "/kittens/curious-kitten.jpeg",
    alt: { en: "The unnamed curious black kitten looking into the camera", es: "El curioso gatito negro, todavía sin nombre, mirando a la cámara" },
    status: "pending",
    traits: [{ en: "Brave", es: "Valiente" }, { en: "Sweet", es: "Dulce" }, { en: "Explorer", es: "Explorador" }],
    text: {
      en: "He was the first kitten to venture out and explore, often leading the way before his siblings felt ready. His forever name is still waiting for him.",
      es: "Fue el primero en salir a explorar y muchas veces abrió el camino antes de que sus hermanos se sintieran listos. Su nombre definitivo todavía lo está esperando.",
    },
  },
];

const familyPhotos = Array.from({ length: 8 }, (_, index) =>
  `/kittens/family/family-${String(index + 1).padStart(2, "0")}.jpeg`,
);

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [shareNotice, setShareNotice] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("kitten-language");
    if (saved === "es") setLanguage("es");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("kitten-language", language);
  }, [language]);

  const t = (en: string, es: string) => language === "en" ? en : es;
  const localized = (value: Localized) => value[language];

  const handleShare = async () => {
    const url = window.location.href.split("#")[0];
    try {
      if (navigator.share) {
        await navigator.share({
          title: t("Gris and the Five", "Gris y los Cinco"),
          text: t("Meet five kittens looking for loving homes in Hayward, California.", "Conoce a cinco gatitos que buscan hogares llenos de amor en Hayward, California."),
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNotice(true);
      window.setTimeout(() => setShareNotice(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };

  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={t("Gris and the Five home", "Inicio de Gris y los Cinco")}>
          <span className="paw" aria-hidden="true">●</span>
          <span>{t("Gris & the Five", "Gris y los Cinco")}</span>
        </a>
        <div className="header-actions">
          <nav aria-label={t("Page sections", "Secciones de la página")}>
            <a href="#kittens">{t("The kittens", "Los gatitos")}</a>
            <a href="#home">{t("A new home", "Un nuevo hogar")}</a>
          </nav>
          <a className="header-adopt" href="#home">
            {t("Adopt", "Adoptar")} <span aria-hidden="true">↓</span>
          </a>
          <button
            className="language-button"
            type="button"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label={t("Translate this page to Spanish", "Cambiar esta página a inglés")}
          >
            <span aria-hidden="true">◎</span>
            {language === "en" ? "Español" : "English"}
          </button>
        </div>
      </header>

      <div className="page-shell">
        <section className="hero">
          <div className="hero-photo">
            <img src={asset("/kittens/family/family-04.jpeg")} alt={t("All five kitten siblings climbing together in and around a cardboard box", "Los cinco gatitos trepando juntos dentro y alrededor de una caja de cartón")} />
            <span className="photo-note">{t("The whole crew", "Toda la pandilla")}</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">{t("Five siblings · One little family", "Cinco hermanos · Una pequeña familia")}</p>
            <h1>{t("Meet five kittens looking for ", "Conoce a cinco gatitos que buscan ")}<em>{t("loving homes.", "hogares llenos de amor.")}</em></h1>
            <p className="lede">{t(
              "Born outside to a stray mom named Gris, these five are now safe indoors, recovering well, socialized, and ready for their next chapter.",
              "Nacidos afuera de una mamá callejera llamada Gris, estos cinco ahora están seguros dentro de casa, recuperándose bien, socializados y listos para su próximo capítulo.",
            )}</p>
            <div className="birthday">
              <span aria-hidden="true">✦</span>
              <div><strong>{t("Born June 18, 2026", "Nacieron el 18 de junio de 2026")}</strong><AgeBadge language={language} /></div>
            </div>
            <div className="hero-location">
              <span aria-hidden="true">⌖</span>
              <div>
                <strong>{t("Hayward, California", "Hayward, California")}</strong>
                <small>{t("East Bay · 4 available · 1 adoption pending", "East Bay · 4 disponibles · 1 adopción pendiente")}</small>
              </div>
            </div>
            <div className="hero-actions">
              <a className="primary-button" href="#kittens">{t("Meet each kitten", "Conoce a cada gatito")} <span aria-hidden="true">↓</span></a>
              <a className="secondary-button" href="#home">{t("Adoption details", "Detalles de adopción")} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section className="care-strip" aria-label={t("What to know", "Lo que debes saber")}>
          <div><span>⌂</span><strong>{t("Indoor kittens", "Gatitos de interior")}</strong><small>{t("Clean, safe & socialized", "Limpios, seguros y sociables")}</small></div>
          <div><span>✓</span><strong>{t("Litter trained", "Usan el arenero")}</strong><small>{t("They know the routine", "Ya conocen la rutina")}</small></div>
          <div><span>＋</span><strong>{t("Under veterinary care", "Bajo cuidado veterinario")}</strong><small>{t("Examined, treated & improving", "Examinados, tratados y mejorando")}</small></div>
          <div><span>○</span><strong>{t("Not fixed yet", "Aún sin esterilizar")}</strong><small>{t("Spay/neuter still needed", "Todavía necesitan esterilización")}</small></div>
        </section>

        <section className="profiles" id="kittens" aria-labelledby="kittens-title">
          <div className="section-heading">
            <p className="eyebrow">{t("Choose your new best friend", "Elige a tu nuevo mejor amigo")}</p>
            <h2 id="kittens-title">{t("Five tiny personalities", "Cinco pequeñas personalidades")}</h2>
            <p>{t("They share a birthday, but each one has a way of making the room their own.", "Comparten cumpleaños, pero cada uno tiene su propia manera de llenar la habitación.")}</p>
            <p className="availability-updated"><span aria-hidden="true">●</span> {t("Availability updated August 11, 2026", "Disponibilidad actualizada el 11 de agosto de 2026")}</p>
          </div>

          <div className="profile-list">
            {kittens.map((kitten, index) => (
              <article className="profile-card" key={kitten.name.en}>
                <div className="profile-image">
                  <img src={asset(kitten.image)} alt={localized(kitten.alt)} loading={index > 1 ? "lazy" : undefined} />
                  <span className={`adoption-status ${kitten.status}`}>{kitten.status === "available" ? t("Available", "Disponible") : t("Adoption pending", "Adopción pendiente")}</span>
                  <span className="profile-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="profile-copy">
                  <p className="profile-pronouns">{localized(kitten.pronouns)}</p>
                  <h3>{localized(kitten.name)}</h3>
                  <div className="tags" aria-label={t(`${kitten.name.en}'s personality`, `Personalidad de ${kitten.name.es}`)}>
                    {kitten.traits.map((trait) => <span key={trait.en}>{localized(trait)}</span>)}
                  </div>
                  <p>{localized(kitten.text)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gris-section" aria-labelledby="gris-title">
          <div className="gris-copy">
            <p className="eyebrow">{t("Meet their mother", "Conoce a su mamá")}</p>
            <h2 id="gris-title">{t("Gris, the heart of their family.", "Gris, el corazón de su familia.")}</h2>
            <div className="gris-traits" aria-label={t("Gris's personality", "Personalidad de Gris")}>
              <span>{t("Loving", "Amorosa")}</span>
              <span>{t("Strong", "Fuerte")}</span>
              <span>{t("Devoted", "Dedicada")}</span>
            </div>
            <p>{t(
              "Gris is a loving mother who gave everything to her five kittens. She nursed them, kept them warm, stayed close, and protected them as they grew.",
              "Gris es una madre amorosa que lo dio todo por sus cinco gatitos. Los amamantó, los mantuvo calientitos, permaneció cerca y los protegió mientras crecían.",
            )}</p>
            <p>{t(
              "Her strength and care gave this little family its beginning. Every playful, trusting kitten on this page carries a little of her love with them.",
              "Su fuerza y sus cuidados le dieron a esta pequeña familia su comienzo. Cada gatito juguetón y confiado de esta página lleva consigo un poquito de su amor.",
            )}</p>
            <div className="gris-status">
              <strong>{t("Gris’s next chapter", "El próximo capítulo de Gris")}</strong>
              <p>{t(
                "Gris is not currently listed for adoption. She is being cared for outdoors, and the goal is to work with a qualified local Trap-Neuter-Return program so she can be spayed, vaccinated, and safely returned.",
                "Gris no está disponible para adopción en este momento. Sigue recibiendo cuidados afuera, y el objetivo es colaborar con un programa local calificado de Captura-Esterilización-Retorno para esterilizarla, vacunarla y devolverla de forma segura.",
              )}</p>
            </div>
          </div>
          <div className="gris-gallery" aria-label={t("Photos of Gris with her kittens", "Fotos de Gris con sus gatitos")}>
            <figure className="gris-photo-main"><img src={asset("/kittens/gris/gris-portrait.jpeg")} alt={t("Portrait of Gris, the kittens' gray mother", "Retrato de Gris, la mamá gris de los gatitos")} loading="lazy" /></figure>
            <figure><img src={asset("/kittens/gris/gris-with-kittens.jpeg")} alt={t("Gris resting beside her five young kittens", "Gris descansando junto a sus cinco gatitos pequeños")} loading="lazy" /></figure>
            <figure><img src={asset("/kittens/gris/gris-nursing.jpeg")} alt={t("Gris curled around her kittens while they nurse", "Gris acurrucada alrededor de sus gatitos mientras amamantan")} loading="lazy" /></figure>
            <figure><img src={asset("/kittens/gris/gris-family-outside.jpeg")} alt={t("Gris watching over the kittens while they eat outside", "Gris cuidando a los gatitos mientras comen afuera")} loading="lazy" /></figure>
          </div>
        </section>

        <section className="daily-life" aria-labelledby="daily-title">
          <div className="section-heading compact">
            <p className="eyebrow">{t("The essentials", "Lo esencial")}</p>
            <h2 id="daily-title">{t("Their daily life", "Su vida diaria")}</h2>
          </div>
          <div className="life-grid">
            <article className="food-card">
              <span className="life-icon" aria-hidden="true">♨</span>
              <p className="eyebrow">{t("Favorite meal", "Comida favorita")}</p>
              <h3>Fancy Feast Classic Seafood Feast</h3>
              <p>{t(
                "The canned seafood variety pack is the current favorite. Any diet change should be gradual and discussed with a veterinarian.",
                "El paquete variado de mariscos en lata es su favorito actual. Cualquier cambio de dieta debe hacerse poco a poco y consultarse con un veterinario.",
              )}</p>
            </article>
            <article className="music-card">
              <span className="life-icon" aria-hidden="true">♫</span>
              <p className="eyebrow">{t("Their peaceful place", "Su lugar tranquilo")}</p>
              <h3>{t("C418 & quiet afternoons", "C418 y tardes tranquilas")}</h3>
              <p>{t(
                "The original Minecraft music is their calm-time soundtrack—soft, familiar, and perfect for kitten naps.",
                "La música original de Minecraft es su banda sonora para relajarse: suave, familiar y perfecta para las siestas.",
              )}</p>
              <div className="music-player">
                <iframe
                  title={t("Play C418's Minecraft — Volume Alpha", "Reproducir Minecraft — Volume Alpha de C418")}
                  src="https://bandcamp.com/EmbeddedPlayer/album=1349219244/size=large/bgcol=3f5c49/linkcol=fff8ed/tracklist=false/artwork=small/transparent=true/"
                  loading="lazy"
                  allow="autoplay"
                />
              </div>
              <a href="https://c418.bandcamp.com/album/minecraft-volume-alpha" target="_blank" rel="noreferrer">{t("View the full album", "Ver el álbum completo")} <span aria-hidden="true">↗</span></a>
            </article>
            <article className="care-card">
              <p className="eyebrow">{t("Care record", "Registro de cuidados")}</p>
              <h3>{t("Their health is improving.", "Su salud está mejorando.")}</h3>
              <div className="care-record">
                <div><span aria-hidden="true">✓</span><strong>{t("Veterinary exam", "Examen veterinario")}</strong><small>{t("Physical exam completed", "Examen físico completado")}</small></div>
                <div><span aria-hidden="true">✓</span><strong>{t("Infection treatment", "Tratamiento de infecciones")}</strong><small>{t("Clavamox and Terramycin received as prescribed", "Clavamox y Terramycin administrados según indicación")}</small></div>
                <div><span aria-hidden="true">✓</span><strong>{t("Routine care", "Cuidados de rutina")}</strong><small>{t("Bathing, combing, and first deworming completed", "Baño, cepillado y primera desparasitación completados")}</small></div>
                <div><span aria-hidden="true">✓</span><strong>{t("August 8, 2026", "8 de agosto de 2026")}</strong><small>{t("Second dose of Pyrantel dewormer and FVRCP vaccination #1 completed", "Segunda dosis de desparasitante Pyrantel y vacuna FVRCP #1 completadas")}</small></div>
              </div>
            </article>
          </div>
        </section>

        <section className="short-story" aria-labelledby="story-title">
          <div className="story-photo"><img src={asset("/kittens/family/family-08.jpeg")} alt={t("The five kittens sleeping together on a soft white towel when they were very young", "Los cinco gatitos durmiendo juntos sobre una toalla blanca cuando eran muy pequeños")} loading="lazy" /></div>
          <div className="story-copy">
            <p className="eyebrow">{t("The short version", "La versión corta")}</p>
            <h2 id="story-title">{t("From outside to safe inside", "De la calle a un hogar seguro")}</h2>
            <p>{t(
              "The five were born outside to Gris, a stray cat who had begun visiting a nearby home. As they grew, several developed eye and upper-respiratory infections.",
              "Los cinco nacieron afuera de Gris, una gata callejera que comenzó a visitar una casa cercana. Mientras crecían, varios desarrollaron infecciones en los ojos y en las vías respiratorias.",
            )}</p>
            <p>{t(
              "They were brought indoors, examined by a veterinarian, treated, bathed, and given a safe room to recover together. Their eyes cleared, their energy returned, and their personalities came out.",
              "Fueron llevados al interior, examinados por un veterinario, tratados y bañados. Recibieron un cuarto seguro para recuperarse juntos. Sus ojos mejoraron, recuperaron la energía y comenzaron a mostrar sus personalidades.",
            )}</p>
            <p>{t(
              "Now they eat well, use the litter box, play together, and are looking for thoughtful homes of their own.",
              "Ahora comen bien, usan el arenero, juegan juntos y buscan hogares responsables donde puedan comenzar su próxima etapa.",
            )}</p>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-title">
          <div className="section-heading compact">
            <p className="eyebrow">{t("Family photos, lol", "Fotos familiares, jaja")}</p>
            <h2 id="gallery-title">{t("Growing up together", "Creciendo juntos")}</h2>
          </div>
          <div className="photo-grid">
            {familyPhotos.map((photo, index) => (
              <figure key={photo} className={`family-photo family-photo-${index + 1}`}>
                <img src={asset(photo)} alt={t(`The five kitten siblings together in family photo ${index + 1}`, `Los cinco gatitos juntos en la foto familiar ${index + 1}`)} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="home-section" id="home" aria-labelledby="home-title">
          <p className="eyebrow">{t("The next chapter", "El próximo capítulo")}</p>
          <h2 id="home-title">{t("Could one of them be yours?", "¿Podría uno de ellos ser parte de tu familia?")}</h2>
          <p>{t(
            "Four kittens are currently available in Hayward, California, in the East Bay. If someone shared this page with you, contact that person to ask about meeting a kitten and reviewing the available health records.",
            "Cuatro gatitos están disponibles actualmente en Hayward, California, en el East Bay. Si alguien compartió esta página contigo, comunícate con esa persona para preguntar cómo conocer a un gatito y revisar los registros de salud disponibles.",
          )}</p>
          <div className="adoption-steps" aria-label={t("How adoption works", "Cómo funciona la adopción")}>
            <div><span>1</span><strong>{t("Get in touch", "Ponte en contacto")}</strong><small>{t("Contact the person who shared this page", "Comunícate con la persona que compartió esta página")}</small></div>
            <div><span>2</span><strong>{t("Meet the kitten", "Conoce al gatito")}</strong><small>{t("Ask questions and see if it feels right", "Haz preguntas y confirma que sea una buena conexión")}</small></div>
            <div><span>3</span><strong>{t("Plan the transition", "Planea la transición")}</strong><small>{t("Review records and prepare a safe home", "Revisa los registros y prepara un hogar seguro")}</small></div>
          </div>
          <div className="home-notes">
            <span>{t("Hayward, CA · East Bay", "Hayward, CA · East Bay")}</span>
            <span>{t("4 available", "4 disponibles")}</span>
            <span>{t("1 adoption pending", "1 adopción pendiente")}</span>
          </div>
          <div className="home-actions">
            <button className="outline-button" type="button" onClick={handleShare}>{shareNotice ? t("Link copied!", "¡Enlace copiado!") : t("Share these kittens", "Compartir estos gatitos")}</button>
          </div>
          <a className="back-to-kittens" href="#kittens">{t("Look through the kittens again", "Vuelve a ver a los gatitos")} ↑</a>
        </section>

        <section className="disclaimer" id="disclaimer" aria-labelledby="disclaimer-title">
          <details>
            <summary id="disclaimer-title">{t("A quick, important note", "Una nota breve e importante")} <span aria-hidden="true">+</span></summary>
            <div>
              <p>{t(
                "This is a private individual's good-faith effort to care for and rehome stray kittens. It is not a nonprofit, animal shelter, rescue organization, veterinary provider, government agency, or fundraising campaign.",
                "Este es el esfuerzo de buena fe de una persona particular para cuidar y encontrar hogares para gatitos callejeros. No es una organización sin fines de lucro, refugio, organización de rescate, proveedor veterinario, agencia gubernamental ni campaña de recaudación de fondos.",
              )}</p>
              <p>{t(
                "The information here reflects personal observations and available records. It is not veterinary or legal advice, a guarantee of health or temperament, or a promise of placement. A prospective home should meet the kitten, review current veterinary records, and independently confirm local transfer, licensing, vaccination, and spay/neuter requirements.",
                "La información presentada refleja observaciones personales y los registros disponibles. No constituye asesoramiento veterinario o legal, garantía de salud o temperamento, ni promesa de adopción. Una familia interesada debe conocer al gatito, revisar sus registros veterinarios actuales y confirmar por su cuenta los requisitos locales de transferencia, licencia, vacunación y esterilización.",
              )}</p>
            </div>
          </details>
        </section>
      </div>

      <div className="mobile-action-bar" aria-label={t("Adoption actions", "Opciones de adopción")}>
        <a href="#home">{t("Adoption details", "Detalles de adopción")} <span aria-hidden="true">↓</span></a>
        <button type="button" onClick={handleShare}>{shareNotice ? t("Copied!", "¡Copiado!") : t("Share", "Compartir")}</button>
      </div>

      <footer>
        <div className="footer-inner">
          <span>{t("Gris & the Five", "Gris y los Cinco")}</span>
          <a href="#disclaimer">{t("Important note", "Nota importante")}</a>
          <a href="#top">{t("Back to top", "Volver arriba")} ↑</a>
        </div>
      </footer>
    </main>
  );
}
