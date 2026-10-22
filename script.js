// Houloul.Tech , interactions
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- entrées au scroll ---------- */
  const revealTargets = [
    ...document.querySelectorAll(".tiles > .tile"),
    ...document.querySelectorAll(".services .module"),
    ...document.querySelectorAll(".method .track article"),
    ...document.querySelectorAll(".pricing .table-scroll, .pricing .note"),
    ...document.querySelectorAll(".faq-grid"),
    ...document.querySelectorAll(".strip img, .band-text, .band-photo"),
  ];

  if (reduced || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("reveal", "in"));
  } else {
    revealTargets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---------- méthode : la rangée ---------- */
  const track = document.getElementById("track");
  const bar = document.querySelector(".progress span");
  const step = () => {
    const max = track.scrollWidth - track.clientWidth;
    const pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
    if (bar) bar.style.width = `${Math.max(16, Math.min(100, pct))}%`;
  };
  if (track) {
    track.addEventListener("scroll", step, { passive: true });
    window.addEventListener("resize", step);
    step();
    document.querySelectorAll(".square").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = Number(btn.dataset.dir) || 1;
        const card = track.querySelector("article");
        const w = card ? card.getBoundingClientRect().width + 32 : 320;
        track.scrollBy({ left: dir * w, behavior: reduced ? "auto" : "smooth" });
      });
    });
  }

  /* ---------- faq ---------- */
  const answers = [
    "Un site vitrine démarre à 2 500 DH, une boutique en ligne à 6 500 DH, et une application ou une automatisation sur devis. Le prix est écrit avant de commencer et ne change pas en cours de route. Si votre budget est plus serré, dites-le : il y a presque toujours une version plus légère qui règle 80 % du problème.",
    "Cinq jours pour une vitrine, deux semaines pour une boutique, trois semaines ou plus pour du sur mesure. Ce qui prend le plus de temps n'est pas le code, c'est la préparation de vos textes, vos photos et vos produits , donc je vous donne la liste exacte des éléments à fournir dès le premier jour.",
    "C'est le cas normal. Je vous demande de remplir un formulaire de trois questions, je fais le reste, et à la livraison vous avez une vidéo de dix minutes pour modifier vos textes vous-même. Vous n'avez jamais besoin de toucher au code.",
    "Oui, entièrement. Vous recevez le dépôt GitHub, l'accès à l'hébergement et le nom de domaine à votre nom. Rien n'est détenu par moi, vous pouvez partir avec un autre prestataire demain sans rien réécrire.",
    "Je fais le design des interfaces, la structure et la mise en ligne. Pour les logos et les photos de vos produits, je travaille avec un graphiste et un photographe à Marrakech, ou je vous donne le brief , à vous de voir si vous voulez l'externaliser ou me confier le dossier.",
    "Un tiers à la commande pour démarrer, le solde à la livraison, et pour les projets au-delà de 5 000 DH je demande un acompte de 50 %. Je facture en dirhams, et je vous fais un reçu.",
  ];

  const list = document.querySelector(".faq-list");
  const pane = document.getElementById("faq-pane");
  if (list && pane) {
    const buttons = [...list.querySelectorAll("button[data-q]")];
    const show = (i) => {
      buttons.forEach((b, k) => b.classList.toggle("active", k === i));
      pane.style.opacity = "0";
      setTimeout(() => {
        pane.textContent = answers[i];
        pane.style.opacity = "1";
      }, reduced ? 0 : 140);
    };
    buttons.forEach((b, i) => {
      b.addEventListener("click", () => show(i));
      b.addEventListener("mouseenter", () => show(i));
      b.addEventListener("focus", () => show(i));
    });
    show(0);
  }

  /* ---------- surlignage de la section visible ---------- */
  const sections = ["travail", "services", "methode", "tarifs", "faq", "contact"];
  const links = [...document.querySelectorAll(".topbar nav a")];
  const byId = new Map(sections.map((id) => [id, document.getElementById(id)]).filter(([, el]) => el));
  if ("IntersectionObserver" in window && byId.size) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => {
            const on = a.getAttribute("href") === `#${e.target.id}`;
            a.style.color = on ? "var(--ink)" : "";
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    byId.forEach((el) => io2.observe(el));
  }
})();
