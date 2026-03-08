export function icons() {
  return {
    menu: `<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    search: `<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    mail: `<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="2"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  };
}

export function headerHTML(brandName, announcementText) {
  const { mail, menu } = icons();

  return `
    <div class="announcement">${announcementText || ""}</div>

    <div class="header">
      <div class="container">
        <div class="navbar">
          <a class="brand" href="/">${brandName || "LeatherCraft"}</a>

          <button class="iconbtn menuToggle" type="button" aria-label="Open menu" aria-expanded="false">
            ${menu}
          </button>

          <nav class="navlinks" id="primaryNav">
            <a href="/collection.html">Shop</a>
            <a href="/craftsmanship.html">Craftsmanship</a>
            <a href="/about.html">About + FAQ</a>
            <a href="/custom.html">Custom Order</a>
          </nav>

          <div class="navicons">

            <form id="searchForm" class="searchForm">
              <input 
                type="text" 
                id="searchInput" 
                placeholder="Search…" 
                autocomplete="off"
              />
            </form>

            <a class="iconbtn" href="/contact.html" aria-label="Contact">${mail}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function formatFromPrice(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return "";
  return `From $${Math.round(n)}`;
}

export function productCard(p, opts = {}) {
  const img = p.images?.[0] || "";
  const href = `/product.html?id=${encodeURIComponent(p.id)}`;
  const collectionTitle = opts.collectionTitle || "";
  const fromPrice = formatFromPrice(p.fromPrice);
  return `
    <div class="card">
      <a class="cardMedia" href="${href}">
        ${fromPrice ? `<span class="cardPriceTag">${fromPrice}</span>` : ""}
        ${img ? `<img src="${img}" alt="">` : ""}
      </a>
      <div class="cardBody">
        <div class="cardTitle">${p.title}</div>
        ${collectionTitle ? `<div class="cardCollection">${collectionTitle}</div>` : ""}
        <div class="cardMeta" style="margin-top:10px">
          <a class="btn secondary" style="width:auto;padding:10px 12px" href="${href}">View</a>
          <a class="btn" style="width:auto;padding:10px 12px" href="/custom.html?product=${encodeURIComponent(p.id)}">Request Custom</a>
        </div>
      </div>
    </div>
  `;
}
