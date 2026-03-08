import { boot } from "../app.js";
import { getParam } from "../store.js";
import { productCard } from "../ui.js";

const catalog = await boot();
const grid = document.getElementById("grid");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const c = getParam("c");
const q = (getParam("q") || "").trim().toLowerCase();
const collectionBySlug = Object.fromEntries(
  (catalog.collections || []).map((x) => [x.slug, x.title])
);

let items = [...(catalog.products || [])];

if (c) {
  const col = (catalog.collections || []).find(x => x.slug === c);
  title.textContent = col?.title || "Collection";
  subtitle.textContent = col ? `Browse ${col.title}.` : "";
  items = items.filter(p => p.collection === c);
} else {
  title.textContent = "All Products";
  subtitle.textContent = q ? `Results for “${q}”` : "Browse everything in the shop.";
}

if (q) {
  items = items.filter(p =>
    (p.title || "").toLowerCase().includes(q) ||
    (p.description || "").toLowerCase().includes(q)
  );
}

const sortEl = document.getElementById("sort");

function render() {
  const v = sortEl.value;
  let sorted = [...items];

  if (v === "featured") sorted.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));
  if (v === "az") sorted.sort((a,b)=>String(a.title).localeCompare(String(b.title)));
  if (v === "za") sorted.sort((a,b)=>String(b.title).localeCompare(String(a.title)));

  grid.innerHTML = sorted
    .map((p) =>
      productCard(p, {
        collectionTitle: collectionBySlug[p.collection] || ""
      })
    )
    .join("");
}

sortEl.addEventListener("change", render);
render();
