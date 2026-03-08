import { boot } from "../app.js";
import { getParam, escapeHTML } from "../store.js";
import { productCard } from "../ui.js";

const catalog = await boot();
const id = getParam("id");
const p = (catalog.products || []).find(x => x.id === id);

const root = document.getElementById("productRoot");
if (!p) {
  root.innerHTML = `<div class="pagePad">Product not found.</div>`;
  throw new Error("Product not found");
}

document.title = `${p.title} – ${catalog.brand.name}`;

const img0 = p.images?.[0] || "";
const highlights = Array.isArray(p.highlights) ? p.highlights : [];
const collectionBySlug = Object.fromEntries(
  (catalog.collections || []).map((x) => [x.slug, x.title])
);

root.innerHTML = `
  <div class="gallery">
    <div class="galleryMain" id="mainImg">
      ${img0 ? `<img src="${img0}" alt="">` : ""}
    </div>
    <div class="thumbs">
      ${(p.images || []).map(src => `
        <div class="thumb" data-src="${src}">${src ? `<img src="${src}" alt="">` : ""}</div>
      `).join("")}
    </div>
  </div>

  <div class="pinfo">
    <h1 class="ptitle">${escapeHTML(p.title)}</h1>

    ${highlights.length ? `<ul class="highlights">${highlights.map(h => `<li>${escapeHTML(h)}</li>`).join("")}</ul>` : ""}

    <div class="hr"></div>

    <a class="btn" href="/custom.html?product=${encodeURIComponent(p.id)}">Request Custom</a>

    <div class="badge">
      Request this item as shown or request custom options. We’ll confirm details by email.
    </div>

    <div class="hr"></div>

    <div style="font:500 15px/1.75 var(--sans); color:rgba(30,29,27,.86)">
      ${escapeHTML(p.description || "")}
    </div>

    <details class="drawer" open>
      <summary>Materials <span>+</span></summary>
      <div class="body">${escapeHTML(p.materials || "—")}</div>
    </details>

    <details class="drawer">
      <summary>Care <span>+</span></summary>
      <div class="body">${escapeHTML(p.care || "—")}</div>
    </details>

    <details class="drawer">
      <summary>Shipping <span>+</span></summary>
      <div class="body">${escapeHTML(p.shipping || "—")}</div>
    </details>

    <details class="drawer">
      <summary>Product Dimensions <span>+</span></summary>
      <div class="body">${escapeHTML(p.dimensions || "—")}</div>
    </details>

    <div class="hr"></div>

    <div class="h2" style="margin:0 0 12px">You May Also Like</div>
    <div class="relatedGrid" id="related"></div>
  </div>
`;

root.querySelectorAll(".thumb").forEach(t => {
  t.addEventListener("click", () => {
    const src = t.dataset.src;
    document.getElementById("mainImg").innerHTML = `<img src="${src}" alt="">`;
  });
});

const sameCollection = (catalog.products || [])
  .filter((x) => x.id !== p.id && x.collection === p.collection);

const featuredFallback = (catalog.products || [])
  .filter((x) => x.id !== p.id && x.featured && x.collection !== p.collection);

const related = [...sameCollection];
for (const item of featuredFallback) {
  if (related.length >= 3) break;
  if (!related.some((x) => x.id === item.id)) related.push(item);
}

document.getElementById("related").innerHTML = related
  .slice(0, 3)
  .map((x) =>
    productCard(x, {
      collectionTitle: collectionBySlug[x.collection] || ""
    })
  )
  .join("");
