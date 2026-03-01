function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  $all('[data-nav]').forEach(a=>{
    const target = a.getAttribute('href');
    if(target === path) a.classList.add('active');
  });
}

function setupMobileNav(){
  const btn = $('#mobileToggle');
  const drawer = $('#drawer');
  if(!btn || !drawer) return;

  btn.addEventListener('click', ()=>{
    drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', drawer.classList.contains('open') ? 'true' : 'false');
  });

  // close drawer on navigation
  $all('#drawer a').forEach(a=>{
    a.addEventListener('click', ()=> drawer.classList.remove('open'));
  });
}

function fmtCategory(cat){
  return cat || "Other";
}

function productCard(p){
  const tag = (p.tags && p.tags[0]) ? `<div class="tag">${escapeHtml(p.tags[0])}</div>` : "";

  // support images: ["..."] OR images: [{src:"...", notes:[...]}]
  const firstImg = (() => {
    const first = (p.images && p.images.length) ? p.images[0] : null;
    if(!first) return "";
    if(typeof first === "string") return first;
    return first.src || "";
  })();

  const hasRealImg = firstImg && typeof firstImg === "string" && !firstImg.includes("placeholder");

  const img = hasRealImg
    ? `<img src="${firstImg}" alt="${escapeHtml(p.name)}" loading="lazy">`
    : "";

  return `
    <article class="card product" role="link" tabindex="0" data-product="${p.id}">
      <div class="thumb">
        ${tag}
        ${img || `<div class="placeholder" style="width:92%;border-radius:20px;border:1px dashed rgba(255,255,255,.18);background:rgba(0,0,0,.22);color:rgba(255,255,255,.55);font-size:12px;padding:16px;">
          Add an image in <strong>/assets</strong> and update <strong>products.js</strong>
        </div>`}
      </div>
      <div class="info">
        <h3 class="title">${escapeHtml(p.name)}</h3>
        <div class="meta">
          <span>${escapeHtml(fmtCategory(p.category))}</span>
          <span>${escapeHtml(p.priceHint || "")}</span>
        </div>
      </div>
    </article>
  `;
}

function wireProductCards(){
  $all('[data-product]').forEach(card=>{
    const id = card.getAttribute('data-product');
    const go = ()=> location.href = `/product.html?id=${encodeURIComponent(id)}`;
    card.addEventListener('click', go);
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

window.UI = { $, $all, setActiveNav, setupMobileNav, productCard, wireProductCards, escapeHtml };