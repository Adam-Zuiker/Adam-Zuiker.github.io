/* Renders the site from content.js. You shouldn't need to edit this file
   to change your content — edit content.js instead. */

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const $ = (sel) => document.querySelector(sel);
const visibleLinks = (links = []) => links.filter((l) => l.url);
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

function renderLayout(page) {
  const nav = [
    { href: "index.html", label: "About", key: "about" },
    { href: "projects.html", label: "Projects", key: "projects" },
  ];
  $("#header").innerHTML = `
    <div class="container">
      <a class="brand" href="index.html">${esc(SITE.name)}</a>
      <nav class="nav">
        ${nav.map((n) => `<a href="${n.href}" class="${n.key === page ? "active" : ""}">${n.label}</a>`).join("")}
        ${SITE.email ? `<a href="mailto:${esc(SITE.email)}">Contact</a>` : ""}
      </nav>
    </div>`;
  $("#footer").innerHTML = `
    <div class="container">
      <span>© ${new Date().getFullYear()} ${esc(SITE.name)}</span>
      <span class="links">
        ${SITE.email ? `<a href="mailto:${esc(SITE.email)}">Email</a>` : ""}
        ${visibleLinks(SITE.links).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
      </span>
    </div>`;
}

function tagList(tags = []) {
  return `<div class="tags">${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`;
}

function projectCard(p) {
  const img = p.image
    ? `<img class="card-image" src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
    : `<div class="card-image placeholder">${esc(p.title)}</div>`;
  return `
    <a class="card" href="project.html?id=${encodeURIComponent(p.id)}">
      ${img}
      <div class="card-body">
        <span class="card-date">${esc(p.date)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        ${tagList(p.tags)}
      </div>
    </a>`;
}

function timeline(items, titleKey, orgKey) {
  return items
    .map((i) => `
      <div class="timeline-item">
        <h3>${esc(i[titleKey])}</h3>
        <div class="meta">${esc(i[orgKey])}${i.dates ? ` · ${esc(i.dates)}` : ""}</div>
        ${i.note ? `<p>${esc(i.note)}</p>` : ""}
      </div>`)
    .join("");
}

/* ---------- About (home) page ---------- */
function renderAbout() {
  document.title = `${SITE.name} — ${SITE.title}`;
  const photo = SITE.photo
    ? `<img class="headshot" src="${esc(SITE.photo)}" alt="${esc(SITE.name)}">`
    : `<div class="headshot placeholder">${esc(initials(SITE.name))}</div>`;

  $("#main").innerHTML = `
    <section class="hero">
      <div class="container">
        <div>
          <div class="eyebrow">${esc(SITE.title)}${SITE.location ? ` · ${esc(SITE.location)}` : ""}</div>
          <h1>Hi, I'm ${esc(SITE.name.split(" ")[0])}.</h1>
          <p class="tagline">${esc(SITE.tagline)}</p>
          <div class="buttons">
            <a class="btn primary" href="projects.html">View Projects</a>
            ${SITE.resume ? `<a class="btn" href="${esc(SITE.resume)}" target="_blank">Résumé</a>` : ""}
            ${visibleLinks(SITE.links).map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
          </div>
        </div>
        ${photo}
      </div>
    </section>

    <section>
      <div class="container about-grid">
        <div class="bio">
          <h2>About Me</h2>
          ${ABOUT.bio.map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
        <div>
          <h2>Skills</h2>
          ${ABOUT.skills.map((g) => `<div class="skill-group"><h3>${esc(g.group)}</h3>${tagList(g.items)}</div>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="container timeline">
        <div><h2>Experience</h2>${timeline(ABOUT.experience, "role", "org")}</div>
        <div><h2>Education</h2>${timeline(ABOUT.education, "degree", "school")}</div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-title">
          <h2>Featured Projects</h2>
          <a href="projects.html">See all →</a>
        </div>
        <div class="grid">${PROJECTS.filter((p) => p.featured).map(projectCard).join("")}</div>
      </div>
    </section>`;
}

/* ---------- Projects page ---------- */
function renderProjects() {
  document.title = `Projects — ${SITE.name}`;
  const tags = ["All", ...new Set(PROJECTS.flatMap((p) => p.tags || []))];

  $("#main").innerHTML = `
    <section>
      <div class="container">
        <h1>Projects</h1>
        <p class="tagline muted">A selection of robotics work spanning planning, control, and simulation.</p>
        <div class="filters">
          ${tags.map((t, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`).join("")}
        </div>
        <div class="grid" id="project-grid"></div>
      </div>
    </section>`;

  const grid = $("#project-grid");
  const show = (tag) => {
    const list = tag === "All" ? PROJECTS : PROJECTS.filter((p) => (p.tags || []).includes(tag));
    grid.innerHTML = list.map(projectCard).join("");
  };
  document.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      show(btn.dataset.tag);
    })
  );
  show("All");
}

/* ---------- Single project page ---------- */
function renderProject() {
  const id = new URLSearchParams(location.search).get("id");
  const p = PROJECTS.find((x) => x.id === id);

  if (!p) {
    $("#main").innerHTML = `
      <section><div class="container">
        <h1>Project not found</h1>
        <p class="muted">That project doesn't exist. <a href="projects.html">Back to all projects</a>.</p>
      </div></section>`;
    return;
  }

  document.title = `${p.title} — ${SITE.name}`;
  const links = visibleLinks(p.links);

  $("#main").innerHTML = `
    <div class="container">
      <div class="project-header">
        <a class="back" href="projects.html">← All projects</a>
        <div class="card-date">${esc(p.date)}</div>
        <h1>${esc(p.title)}</h1>
        <p class="tagline muted">${esc(p.summary)}</p>
      </div>
      ${p.image ? `<img class="project-hero-img" src="${esc(p.image)}" alt="${esc(p.title)}">` : ""}
      <div class="project-body">
        <div>
          <h2>Overview</h2>
          ${(p.description || []).map((d) => d.startsWith("## ") ? `<h3>${esc(d.slice(3))}</h3>` : `<p>${esc(d)}</p>`).join("")}
          ${p.highlights && p.highlights.length ? `
            <h2>Highlights</h2>
            <ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
          ${p.video ? `<div class="video">${
            /\.(mp4|webm|mov)$/i.test(p.video)
              ? `<video src="${esc(p.video)}" controls playsinline></video>`
              : `<iframe src="${esc(p.video)}" allowfullscreen title="${esc(p.title)} video"></iframe>`
          }</div>` : ""}
          ${p.gallery && p.gallery.length ? `
            <div class="gallery">${p.gallery.map((g) => `<img src="${esc(g)}" alt="${esc(p.title)}" loading="lazy">`).join("")}</div>` : ""}
        </div>
        <aside class="sidebar">
          ${p.date ? `<div><h3>Date</h3>${esc(p.date)}</div>` : ""}
          ${p.tags && p.tags.length ? `<div><h3>Topics</h3>${tagList(p.tags)}</div>` : ""}
          ${links.length ? `<div><h3>Links</h3><div class="buttons">
            ${links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
          </div></div>` : ""}
        </aside>
      </div>
    </div>`;
}

const page = document.body.dataset.page;
renderLayout(page);
({ about: renderAbout, projects: renderProjects, project: renderProject })[page]();
