import { boot } from "../app.js";
import { productCard } from "../ui.js";

const catalog = await boot();
const collectionBySlug = Object.fromEntries(
  (catalog.collections || []).map((x) => [x.slug, x.title])
);

const tiles = document.getElementById("collectionTiles");
tiles.innerHTML = (catalog.collections || []).slice(0,3).map(c => `
  <a class="card" href="/collection.html?c=${encodeURIComponent(c.slug)}">
    <div class="cardMedia"><img src="/assets/collections/${c.slug}.png" alt=""></div>
    <div class="cardBody">
      <div class="cardTitle">${c.title}</div>
      <div class="muted" style="font:600 13px/1 var(--sans)">Shop ${c.title}</div>
    </div>
  </a>
`).join("");

const featured = (catalog.products || []).filter(p => p.featured);
document.getElementById("bestGrid").innerHTML =
  featured
    .slice(0,8)
    .map((p) =>
      productCard(p, {
        collectionTitle: collectionBySlug[p.collection] || ""
      })
    )
    .join("");
