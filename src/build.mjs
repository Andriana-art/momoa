import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { posix } from "node:path";
import { fileURLToPath } from "node:url";
import { artworks, languages } from "./content.mjs";
import { artworkNotes, galleryNotes } from "./reading-notes.mjs";

const siteUrl = "https://andriana-art.github.io/momoa/";
const outputDirectory = new URL("../docs/", import.meta.url);
const stylesheetPath = "css/styles.css";
const scriptPath = "js/site.js";
const stylesheetVersion = createHash("sha256")
  .update(await readFile(new URL(stylesheetPath, outputDirectory)))
  .digest("hex").slice(0, 12);
const scriptVersion = createHash("sha256")
  .update(await readFile(new URL(scriptPath, outputDirectory)))
  .digest("hex").slice(0, 12);
const imageFolder = "assets/images/";
const imageBreakpoint = "(min-width: 56rem)";
const mobileHeroMedia = "(width < 40rem)";
const mobileHeroSizes = "calc(100vw - 3rem)";
const heroWidths = [400, 680, 960, 1260];
const heroSizes = `(min-width: 90rem) 624px, ${imageBreakpoint} 43.05vw, (min-width: 42rem) 624px, ${mobileHeroSizes}`;
const splitImageSizes = "(min-width: 90rem) 624px, (min-width: 56rem) 43.05vw, calc(100vw - 3rem)";
const homeCardImageSizes = "(min-width: 90rem) 624px, (min-width: 56rem) calc((100vw - 2 * clamp(2rem, 5.56vw, 5rem) - 2rem) / 2), (min-width: 40rem) calc((100vw - 5.5rem) / 2), calc(100vw - 3rem)";
const panelImageSizes = "(min-width: 90rem) 576px, (min-width: 56rem) calc(43.05vw - 3rem), (min-width: 40rem) calc(50vw - 5.25rem), calc(100vw - 5.5rem)";
const caryatidWidths = [480, 640, 768, 1248, 2048];
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/", icon: "social-instagram.svg" },
  { name: "X", href: "https://about.x.com/", icon: "social-x.svg" },
  { name: "Facebook", href: "https://www.facebook.com/", icon: "social-facebook.svg" },
];

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function noticeRoute(lang, artwork) {
  return `${languages[lang].routes.collection}/${artwork.slug[lang]}`;
}

function noticeImage(page, size) {
  return `notice-${page.artwork.key}-${page.lang}-${size}.webp`;
}

function pageFor(lang, name, artwork) {
  const route = artwork ? noticeRoute(lang, artwork) : languages[lang].routes[name];
  const directory = route.slice(1) || ".";
  return { lang, name, artwork, route, directory };
}

function relative(page, destination) {
  return posix.relative(page.directory, destination);
}

function pageLink(page, route) {
  const [pathname, fragment] = route.split("#", 2);
  const directory = relative(page, pathname.slice(1) || ".");
  const href = directory ? `${directory}/` : "./";
  return fragment ? `${href}#${fragment}` : href;
}

function assetLink(page, file) {
  return relative(page, `${imageFolder}${file}`);
}

function imageSourceSet(page, file, width, widths) {
  const extension = posix.extname(file);
  const stem = posix.basename(file, extension);
  return widths.map((size) => {
    const source = size === width ? file : `${stem}-${size}${extension}`;
    return `${assetLink(page, source)} ${size}w`;
  }).join(", ");
}

function image(page, file, alt, width, height, options = {}) {
  const loading = options.priority ? ' fetchpriority="high"' : options.lazy ? ' loading="lazy"' : "";
  const className = options.className ? ` class="${options.className}"` : "";
  const sourceSet = options.widths
    ? ` srcset="${imageSourceSet(page, file, width, options.widths)}" sizes="${options.sizes}"`
    : "";
  const decoding = options.priority ? "" : ' decoding="async"';
  return `<img${className} src="${assetLink(page, file)}"${sourceSet} alt="${escape(alt)}" width="${width}" height="${height}"${loading}${decoding}>`;
}

function homeTexture(page) {
  return `<picture class="home-texture">
        <source media="(min-width: 40rem)" srcset="${assetLink(page, "stone-texture.webp")}" width="480" height="719">
        ${image(page, "stone-texture-320.webp", "", 320, 479, { lazy: true })}
      </picture>`;
}

function portrait(page, files, alt, sizes, className, options) {
  const [desktop, mobile] = files;
  const [wideWidth, wideHeight, narrowWidth, narrowHeight] = sizes;
  return `<picture class="${className}">
        <source media="${imageBreakpoint}" srcset="${assetLink(page, desktop)}" width="${wideWidth}" height="${wideHeight}">
        ${image(page, mobile, alt, narrowWidth, narrowHeight, options)}
      </picture>`;
}

function buttonLink(page, route, label, variant = "primary", className = "") {
  const classes = ["button", `button--${variant}`, className].filter(Boolean).join(" ");
  return `<a class="${classes}" href="${pageLink(page, route)}">${escape(label)}</a>`;
}

function externalLink(url, label) {
  return `<a class="source-link" href="${escape(url)}">${escape(label)}</a>`;
}

function brand(page) {
  const home = pageLink(page, languages[page.lang].routes.home);
  const label = page.lang === "fr" ? "MOMOA — Accueil" : "MOMOA — Home";
  return `<a class="brand" href="${home}" aria-label="${label}">${image(page, "emblem.svg", "", 26, 48)}<span>momoa</span></a>`;
}

function navigation(page, className) {
  const copy = languages[page.lang];
  const active = page.artwork ? copy.routes.collection : page.name === "faq" ? copy.routes.gallery : page.route;
  return `<ul class="${className}">
        ${copy.nav.map(({ label, href }) => {
          const current = href === page.route ? ' aria-current="page"' : "";
          const section = href === active && href !== page.route ? ' class="section-current"' : "";
          return `<li><a href="${pageLink(page, href)}"${current}${section}>${escape(label)}</a></li>`;
        }).join("\n        ")}
      </ul>`;
}

function header(page) {
  const copy = languages[page.lang];
  const controls = ["fr", "en"].map((lang) => {
    const label = lang === "fr" ? "Français" : "English";
    const abbreviation = lang.toUpperCase();
    if (lang === page.lang) {
      return `<span lang="${lang}" aria-current="true" title="${label}">${abbreviation}</span>`;
    }
    const translated = pageFor(lang, page.name, page.artwork);
    return `<a href="${pageLink(page, translated.route)}" hreflang="${lang}" lang="${lang}" aria-label="${abbreviation} ${label}">${abbreviation}</a>`;
  });
  return `<header class="site-header">
    <div class="header-inner">
      ${brand(page)}
      <nav class="desktop-nav" aria-label="${escape(copy.mainNav)}">
        ${navigation(page, "nav-links")}
      </nav>
      <div class="header-controls">
        <div class="languages" role="group" aria-label="${escape(copy.languageLabel)}">
          ${controls[0]}
          <span class="language-divider" aria-hidden="true">/</span>
          ${controls[1]}
        </div>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${escape(copy.menuOpen)}" data-open-label="${escape(copy.menuOpen)}" data-close-label="${escape(copy.menuClose)}">
          <img class="menu-icon-open" src="${assetLink(page, "menu-open.svg")}" alt="" decoding="async">
          <img class="menu-icon-close" src="${assetLink(page, "menu-close.svg")}" alt="" decoding="async">
        </button>
      </div>
    </div>
    <nav id="mobile-menu" class="mobile-menu" aria-label="${escape(copy.menuLabel)}" hidden>
      <div class="container">
        <h2 class="menu-heading">${escape(copy.menuHeading)}</h2>
        ${navigation(page, "menu-links")}
        <button class="button button--primary menu-close" type="button">${escape(copy.menuClose)}</button>
      </div>
    </nav>
  </header>`;
}

function footer(page) {
  const copy = languages[page.lang];
  return `<footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-grid">
        ${brand(page)}
        <div class="footer-navigation">
          <nav aria-label="${escape(copy.footerNav)}">
            ${navigation(page, "footer-links")}
          </nav>
          <address class="footer-contact">
            <span>1 rue de Paris 06100</span>
            <a href="mailto:dedal@gmail.com">dedal@gmail.com</a>
            <a href="tel:+33163458556">01.63.45.85.56</a>
          </address>
        </div>
        <nav id="footer-social" class="footer-social" aria-labelledby="footer-social-title">
          <p id="footer-social-title">${escape(copy.footerSocial)}</p>
          <ul>
            ${socialLinks.map(({ name, href, icon }) =>
              `<li><a href="${escape(href)}" aria-label="${escape(name)}"><img src="${assetLink(page, icon)}" alt="" decoding="async"></a></li>`
            ).join("\n            ")}
          </ul>
        </nav>
      </div>
      <p class="footer-copyright">${escape(copy.footerCopy)}</p>
    </div>
  </footer>`;
}

function artworkCard(page, artwork, { home = false } = {}) {
  const copy = languages[page.lang];
  const title = artwork.title[page.lang];
  const file = home
    ? artwork.key === "poseidon" ? "home-poseidon.webp" : `home-${artwork.key}-${page.lang}.webp`
    : `collection-${artwork.key}.webp`;
  const description = home ? copy.home.homeCards[artwork.key] : artwork.description[page.lang];
  const cta = home ? copy.home.notice : copy.collection.notice;
  const heading = home && ["victoire", "venus"].includes(artwork.key) ? "h3" : "h2";
  const imageSize = home ? [936, 780] : [811, 800];
  const firstInCollection = !home && artwork.key === artworks[0].key;
  return `<article class="artwork-card${home ? " artwork-card--home" : ""}">
      <a class="artwork-link" href="${pageLink(page, noticeRoute(page.lang, artwork))}">
        ${image(page, file, "", ...imageSize, {
          lazy: !firstInCollection, priority: firstInCollection, className: "artwork-image",
          ...(home ? { widths: [480, 680, 936], sizes: homeCardImageSizes } : {}),
        })}
        <div class="artwork-description">
          <${heading}>${escape(title)}</${heading}>
          <p>${escape(description)}</p>
        </div>
        <span class="${home ? "button button--primary" : "artwork-cta"}">${escape(cta)}</span>
      </a>
    </article>`;
}

function home(page) {
  const copy = languages[page.lang];
  const { hero, newsletter, routes } = copy;
  const { featuredTitle, featuredSubtitle, reproductionsTitle, reproductionsBody, reproductionsCta, faqTitle } = copy.home;
  const byKey = (key) => artworks.find((artwork) => artwork.key === key);
  return `<section class="hero" aria-labelledby="home-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1 id="home-title">
            ${hero.title.map((line) => `<span>${escape(line)}</span>`).join(" ")}
            <span class="hero-subtitle">${hero.mobileSubtitle.map((line) => `<span>${escape(line)}</span>`).join(" ")}</span>
          </h1>
          ${buttonLink(page, routes.collection, hero.cta, "ivory", "hero-cta")}
        </div>
        <picture class="hero-artwork">
          <source type="image/avif" media="${escape(mobileHeroMedia)}" srcset="${imageSourceSet(page, "hero-bust-plinth.avif", 1260, heroWidths)}" sizes="${mobileHeroSizes}">
          ${image(page, "hero-bust-plinth.webp", copy.bustAlt, 1260, 1262, {
            priority: true, widths: heroWidths, sizes: heroSizes,
          })}
        </picture>
      </div>
    </section>
    <section class="home-artworks home-featured" aria-labelledby="featured-title">
      <div class="container">
        <div class="featured-heading">
          <h2 id="featured-title">${escape(featuredTitle.join(" "))}</h2>
          <p>${escape(featuredSubtitle)}</p>
        </div>
        <div class="home-card-grid">
          ${artworkCard(page, byKey("victoire"), { home: true })}
          ${artworkCard(page, byKey("venus"), { home: true })}
        </div>
      </div>
    </section>
    <section class="home-reproductions" aria-labelledby="reproductions-title">
      ${homeTexture(page)}
      <div class="container split-grid">
        ${image(page, "caryatids.webp", copy.gallery.storyFrameLabel, 2048, 1365, {
          lazy: true, className: "reproductions-image", widths: caryatidWidths, sizes: splitImageSizes,
        })}
        <div class="reproductions-copy">
          <h2 id="reproductions-title">${reproductionsTitle.map((line) => `<span>${escape(line)}</span>`).join(" ")}</h2>
          <p>${escape(reproductionsBody)}</p>
          ${buttonLink(page, routes.gallery, reproductionsCta, "outline")}
        </div>
      </div>
    </section>
    <div class="home-artworks home-discovery">
      <div class="container home-card-grid">
        ${artworkCard(page, byKey("discobole"), { home: true })}
        ${artworkCard(page, byKey("poseidon"), { home: true })}
      </div>
    </div>
    <section class="stone home-faq" aria-labelledby="home-faq-title">
      ${homeTexture(page)}
      <div class="container home-faq-grid">
        <h2 id="home-faq-title">${escape(faqTitle)}</h2>
        <ul class="faq-links">
          ${copy.faq.items.map(({ id, question }) => `<li><a href="${pageLink(page, routes.faq)}#${id}"><span>${escape(question)}</span><span aria-hidden="true">+</span></a></li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="stone home-news" aria-labelledby="newsletter-title">
      ${homeTexture(page)}
      <div class="container split-grid">
        <div><h2 id="newsletter-title">${escape(newsletter.title)}</h2><p>${escape(newsletter.body)}</p></div>
        ${buttonLink(page, routes.signup, newsletter.cta)}
      </div>
    </section>`;
}

function readingNotes(sections) {
  return `<div class="container reading-notes">
      ${sections.map(({ heading, paragraphs }) => `<section>
        <h2>${escape(heading)}</h2>
        ${paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("\n        ")}
      </section>`).join("\n      ")}
    </div>`;
}

function gallery(page) {
  const { gallery: copy, routes, galleryExhibitionAlt } = languages[page.lang];
  const prometheus = artworks.find(({ key }) => key === "prometheus");
  return `<section class="container gallery-intro split-grid" aria-labelledby="gallery-title">
      <div class="gallery-intro-copy">
        <h1 id="gallery-title">${copy.introTitle.map((line) => `<span>${escape(line)}</span>`).join(" ")}</h1>
        <p>${escape(copy.introBody)}</p>
      </div>
      ${portrait(page, ["gallery-portrait.webp", "gallery-portrait-mobile.webp"], prometheus.title[page.lang], [560, 620, 342, 440], "gallery-portrait", { priority: true })}
    </section>
    <section class="gallery-history" aria-labelledby="history-title">
      <div class="container">
        <div class="history-copy">
          <h2 id="history-title">${copy.historyTitle.map((line) => `<span>${escape(line)}</span>`).join(" ")}</h2>
          <p>${escape(copy.historyBody)}</p>
          <p>${escape(copy.historyAuthor)}</p>
          <p>${escape(copy.historyNote)}</p>
        </div>
      </div>
    </section>
    <div class="container gallery-cards split-grid">
      <article class="panel">
        ${image(page, "gallery-exhibition.webp", galleryExhibitionAlt, 864, 420, {
          lazy: true, className: "panel-image", widths: [576, 864], sizes: panelImageSizes,
        })}
        <h2>${escape(copy.expositionsTitle)}</h2>
        <p>${escape(copy.expositionsBody)}</p>
      </article>
      <article class="panel">
        ${image(page, "caryatids.webp", copy.storyFrameLabel, 2048, 1365, {
          lazy: true, className: "panel-image panel-image--caryatids", widths: caryatidWidths,
          sizes: panelImageSizes,
        })}
        <h2>${escape(copy.visitsTitle)}</h2>
        <p>${escape(copy.visitsBody)}</p>
      </article>
    </div>
    <div class="container gallery-information split-grid">
      <section class="panel" aria-labelledby="contact-title">
        <h2 id="contact-title">${escape(copy.contactTitle)}</h2>
        <p>${copy.contactLines.map(escape).join("<br>")}</p>
        ${buttonLink(page, routes.faq, copy.contactCta)}
      </section>
      <section class="panel" aria-labelledby="gallery-news-title">
        <h2 id="gallery-news-title">${escape(copy.newsTitle)}</h2>
        <p>${escape(copy.newsBody)}</p>
        ${buttonLink(page, routes.signup, copy.newsCta, "outline")}
      </section>
    </div>
    ${readingNotes(galleryNotes[page.lang])}`;
}

function collection(page) {
  const { title, intro } = languages[page.lang].collection;
  return `<div class="container collection-intro">
      <h1>${escape(title)}</h1>
      <p>${escape(intro)}</p>
    </div>
    <div class="container collection-grid">
      ${artworks.map((artwork) => artworkCard(page, artwork)).join("\n      ")}
    </div>`;
}

function notice(page) {
  const { lang, artwork } = page;
  const copy = languages[lang];
  const item = artwork.notices[lang];
  const index = artworks.indexOf(artwork);
  const previous = artworks.at(index - 1);
  const next = artworks[(index + 1) % artworks.length];
  return `<article>
      <div class="container notice-grid">
        <div class="notice-heading">
          ${buttonLink(page, copy.routes.collection, copy.collection.back, "outline", "notice-back")}
          <h1>${escape(artwork.title[lang])}</h1>
        </div>
        ${portrait(page, [noticeImage(page, "desktop"), noticeImage(page, "mobile")], artwork.title[lang], [960, 1200, 513, 675], "notice-photo")}
        <div class="notice-text">
          <h2>${escape(item.heading)}</h2>
          <p class="notice-body">${escape(item.body)}</p>
          <p>${escape(item.references)}</p>
          <p class="notice-source">${item.sourceHref ? externalLink(item.sourceHref, item.sourceLabel) : escape(item.sourceLabel)}${item.alternateSource ? `<br>${externalLink(item.alternateSource.href, item.alternateSource.label)}` : ""}</p>
          <div class="notice-credit">
            <h2>${escape(copy.collection.creditTitle)}</h2>
            <p>${item.creditHref ? externalLink(item.creditHref, item.creditLine) : escape(item.creditLine)}${item.creditLicense ? `<br>${externalLink(item.creditLicense.href, item.creditLicense.label)}` : ""}</p>
          </div>
          ${buttonLink(page, copy.routes.gallery, copy.collection.noticeCta, "primary", "notice-gallery")}
        </div>
      </div>
      ${readingNotes(artworkNotes[artwork.key][lang])}
    </article>
    <nav class="notice-navigation" aria-label="${escape(copy.artworkNav)}">
      <ul class="container">
        <li><a href="${pageLink(page, noticeRoute(lang, previous))}">${escape(copy.collection.previous)}</a></li>
        <li><a href="${pageLink(page, noticeRoute(lang, next))}">${escape(copy.collection.next)}</a></li>
      </ul>
    </nav>`;
}

function faq(page) {
  const { title, intro, items } = languages[page.lang].faq;
  return `<section class="container faq-page" aria-labelledby="faq-title">
      <h1 id="faq-title">${escape(title)}</h1>
      <p class="faq-intro">${escape(intro)}</p>
      <ul class="faq-answers">
        ${items.map((item) => `<li>
          <h2 id="${item.id}" tabindex="-1">${escape(item.question)}</h2>
          <p>${escape(item.answer)}</p>
          ${item.note ? `<p class="faq-note">${escape(item.note)}</p>` : ""}
          ${item.action ? buttonLink(page, item.action.href, item.action.label) : ""}
        </li>`).join("\n        ")}
      </ul>
    </section>`;
}

function signup(page) {
  const { signup: copy, signupUnavailable, routes } = languages[page.lang];
  const imageName = `signup-victoire-${page.lang}`;
  const fields = [
    ["lastName", "text", "family-name"],
    ["firstName", "text", "given-name"],
    ["email", "email", "email"],
  ];
  return `<div class="container signup-intro">
      <h1 id="signup-title">${escape(copy.title)}</h1>
      <p>${escape(copy.body)}</p>
    </div>
    <div class="container signup-grid split-grid">
      <div id="signup-form" tabindex="-1">
        <p class="signup-unavailable">${escape(signupUnavailable)}</p>
        <form class="signup-form" aria-labelledby="signup-form-title" aria-describedby="form-instructions demo-note" novalidate inert>
          <h2 id="signup-form-title">${escape(copy.formTitle)}</h2>
          <p id="form-instructions" class="form-note">${escape(copy.formNote)}</p>
          ${fields.map(([name, type, autocomplete]) => `<div class="form-field">
            <label for="${name}">${escape(copy.fields[name])}</label>
            <input id="${name}" type="${type}" autocomplete="${autocomplete}" required>
            <p id="${name}-error" class="field-error" hidden>${escape(copy.errors[name])}</p>
          </div>`).join("\n          ")}
          <button type="submit" class="button button--primary">${escape(copy.submit)}</button>
          <p id="demo-note" class="form-note">${escape(copy.demoNote)}</p>
        </form>
        <section class="panel signup-confirmation" aria-labelledby="confirmation-title" hidden>
          <h2 id="confirmation-title" tabindex="-1">${escape(copy.confirmation.title)}</h2>
          <p>${escape(copy.confirmation.body)}</p>
          <button type="button" class="button button--outline signup-return">${escape(copy.confirmation.back)}</button>
        </section>
      </div>
      <aside class="signup-about">
        ${portrait(page, [`${imageName}-desktop.webp`, `${imageName}-mobile.webp`], artworks[0].title[page.lang], [936, 620, 513, 340], "signup-photo")}
        <h2>${escape(copy.aboutTitle)}</h2>
        <p>${escape(copy.aboutBody)}</p>
        ${buttonLink(page, routes.gallery, copy.aboutCta, "outline")}
      </aside>
    </div>`;
}

const render = { home, gallery, collection, notice, signup, faq };

function publishedPageUrl(route) {
  return new URL(route === "/" ? "" : `${route.slice(1)}/`, siteUrl).href;
}

function structuredDataFor(page) {
  const { lang, name, route, artwork } = page;
  const copy = languages[lang];
  const common = {
    "@context": "https://schema.org",
    url: publishedPageUrl(route),
    inLanguage: lang,
  };

  switch (name) {
    case "home":
      return {
        ...common,
        "@type": "WebPage",
        name: "MOMOA",
        description: copy.hero.subtitle,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          url: siteUrl,
          name: "MOMOA",
          inLanguage: Object.keys(languages),
        },
      };
    case "gallery":
      return {
        ...common,
        "@type": "AboutPage",
        name: copy.gallery.introTitle.join(" "),
        description: copy.gallery.historyNote,
      };
    case "collection":
      return {
        ...common,
        "@type": "CollectionPage",
        name: copy.collection.title,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: artworks.map((work, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: work.title[lang],
            url: publishedPageUrl(noticeRoute(lang, work)),
          })),
        },
      };
    case "notice":
      return {
        ...common,
        "@type": "WebPage",
        name: artwork.title[lang],
        mainEntity: {
          "@type": "VisualArtwork",
          name: artwork.title[lang],
          artform: "Sculpture",
          description: artwork.notices[lang].body,
          image: new URL(`${imageFolder}${noticeImage(page, "desktop")}`, siteUrl).href,
        },
      };
    case "faq":
      return {
        ...common,
        "@type": "FAQPage",
        name: copy.faq.title,
        mainEntity: copy.faq.items.map(({ question, answer, note }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: note ? `${answer} ${note}` : answer,
          },
        })),
      };
    case "signup":
      return {
        ...common,
        "@type": "WebPage",
        name: copy.signup.title,
        description: copy.signup.demoNote,
      };
    default:
      throw new Error(`Unknown page type for structured data: ${name}`);
  }
}

function heroPreloads(page) {
  return `
  <link rel="preload" as="image" type="image/avif" media="${escape(mobileHeroMedia)}" imagesrcset="${imageSourceSet(page, "hero-bust-plinth.avif", 1260, heroWidths)}" imagesizes="${mobileHeroSizes}" fetchpriority="high">
  <link rel="preload" as="image" type="image/webp" media="(min-width: 40rem)" imagesrcset="${imageSourceSet(page, "hero-bust-plinth.webp", 1260, heroWidths)}" imagesizes="${heroSizes}" fetchpriority="high">
  <link rel="preload" as="image" type="image/webp" media="${escape(mobileHeroMedia)}" href="${assetLink(page, "hero-gallery-dark-640.webp")}">`;
}

function documentFor(page) {
  const copy = languages[page.lang];
  const title = page.name === "home" ? copy.htmlTitle : `${page.artwork?.title[page.lang] ?? copy.title[page.name]} — MOMOA`;
  const description = page.artwork ? page.artwork.notices[page.lang].metaDescription : copy.descriptions[page.name];
  const descriptionLength = typeof description === "string" ? [...description].length : 0;
  if (descriptionLength < 132 || descriptionLength > 160 || description !== description.trim()) {
    throw new Error(`Invalid meta description for ${page.route}: expected 132–160 characters with no leading or trailing whitespace (found ${descriptionLength}).`);
  }
  const structuredData = JSON.stringify(structuredDataFor(page)).replace(/</g, "\\u003c");
  const alternateLinks = Object.keys(languages).map((lang) => {
    const translated = pageFor(lang, page.name, page.artwork);
    return `<link rel="alternate" hreflang="${lang}" href="${publishedPageUrl(translated.route)}">`;
  }).join("\n  ");
  const scriptUrl = `${relative(page, scriptPath)}?v=${scriptVersion}`;
  const homePreloads = page.name === "home" ? heroPreloads(page) : "";
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#101722">
  <title>${escape(title)}</title>
  <link rel="canonical" href="${publishedPageUrl(page.route)}">
  ${alternateLinks}
  <script type="application/ld+json">${structuredData}</script>
  <link rel="icon" href="${assetLink(page, "emblem.svg")}" type="image/svg+xml">
  <link rel="stylesheet" href="${relative(page, stylesheetPath)}?v=${stylesheetVersion}">
  <link rel="preload" href="${relative(page, "assets/fonts/cormorant-garamond-latin-wght-normal.woff2")}" as="font" type="font/woff2" crossorigin>${homePreloads}
  <link rel="preload" href="${relative(page, "assets/fonts/dm-sans-latin-standard-normal.woff2")}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${scriptUrl}" as="script">
</head>
<body class="page-${page.name}">
  <a class="skip-link" href="#main-content">${escape(copy.skipLink)}</a>
  ${header(page)}
  <main id="main-content" tabindex="-1"${page.name === "home" ? "" : ' class="stone"'}>
    ${render[page.name](page)}
  </main>
  ${footer(page)}
  <script src="${scriptUrl}" defer></script>
</body>
</html>
`;
}

const pages = Object.keys(languages).flatMap((lang) => [
  ...Object.keys(languages[lang].routes).map((name) => pageFor(lang, name)),
  ...artworks.map((artwork) => pageFor(lang, "notice", artwork)),
]);

const documents = pages.map((page) => ({ page, html: documentFor(page) }));
for (const { page, html } of documents) {
  const directory = fileURLToPath(new URL(`${page.directory}/`, outputDirectory));
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, html);
}
await writeFile(new URL(".nojekyll", outputDirectory), "");
console.log(`Generated ${pages.length} pages in docs/.`);
