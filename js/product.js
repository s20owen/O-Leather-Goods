// /js/product.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const p = (window.PRODUCTS || []).find(x => x.id === id) || (window.PRODUCTS || [])[0];
  if (!p) return;

  // Elements
  const title = document.querySelector('#pTitle');
  const meta = document.querySelector('#pMeta');
  const desc = document.querySelector('#pDesc');
  const bullets = document.querySelector('#pBullets');
  const lead = document.querySelector('#pLead');
  const price = document.querySelector('#pPrice');

  const mainImg = document.querySelector('#mainImg');
  const mainPlaceholder = document.querySelector('#mainPlaceholder');
  const thumbs = document.querySelector('#thumbs');
  const photoNotes = document.querySelector('#photoNotes');

  const inquireBtn = document.querySelector('#inquireBtn');

  // Basic info
  document.title = `${p.name} — Leather Goods`;

  if (title) title.textContent = p.name || '';
  if (meta) meta.textContent = `${p.category || ''} • ${p.leather || ''}`.trim();
  if (desc) desc.textContent = p.description || '';
  if (lead) lead.textContent = p.leadTime || '';
  if (price) price.textContent = p.priceHint || '';

  if (bullets) {
    bullets.innerHTML = (p.bullets || []).map(x => `<li>${UI.escapeHtml(x)}</li>`).join('');
  }

  // ---------- Photo notes support ----------
  // Supports either:
  // images: ["/assets/a.jpg", "/assets/b.jpg"]
  // OR
  // images: [{ src:"/assets/a.jpg", notes:[...]} , ...]
  function normalizeImages(images) {
    return (images || []).map(img => {
      if (typeof img === 'string') return { src: img, notes: [] };
      return { src: img?.src || '', notes: img?.notes || [] };
    });
  }

  const imgs = normalizeImages(p.images);

  function renderNotes(notes) {
    if (!photoNotes) return;
    if (!notes || notes.length === 0) {
      photoNotes.innerHTML =
        `<li>Add bullet notes for this photo in <strong>products.js</strong>.</li>`;
      return;
    }
    photoNotes.innerHTML = notes.map(n => `<li>${UI.escapeHtml(n)}</li>`).join('');
  }

  function setMain(obj) {
    const src = obj?.src || '';

    if (mainImg) {
      if (src && !src.includes('placeholder')) {
        mainImg.style.display = 'block';
        mainImg.src = src;
        mainImg.alt = p.name || 'Product image';
        if (mainPlaceholder) mainPlaceholder.style.display = 'none';
      } else {
        mainImg.removeAttribute('src');
        mainImg.alt = p.name || 'Product image';
        mainImg.style.display = 'none';
        if (mainPlaceholder) mainPlaceholder.style.display = 'block';
      }
    }

    renderNotes(obj?.notes || []);

    // highlight selected thumb (if present)
    if (thumbs) {
      UI.$all('button', thumbs).forEach((btn, i) => {
        btn.style.outline = (imgs[i] === obj) ? '2px solid rgba(214,179,106,.65)' : 'none';
        btn.style.boxShadow = (imgs[i] === obj) ? '0 10px 24px rgba(214,179,106,.18)' : 'none';
      });
    }
  }

  // Initial render
  setMain(imgs[0]);

  // Thumbnails
  if (thumbs) {
    thumbs.innerHTML = imgs.map((obj, i) => {
      const src = obj.src || '';
      const safe = UI.escapeHtml(src);

      return `
        <button type="button" aria-label="View image ${i + 1}">
          ${src && !src.includes('placeholder')
            ? `<img src="${safe}" alt="${UI.escapeHtml(p.name)} thumbnail ${i + 1}" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.55);font-size:12px;background:rgba(0,0,0,.22);">Image</div>`
          }
        </button>
      `;
    }).join('');

    UI.$all('button', thumbs).forEach((btn, idx) => {
      btn.addEventListener('click', () => setMain(imgs[idx]));
    });
  }

  // Inquire button
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      const url = `/custom.html?item=${encodeURIComponent(p.name || '')}&id=${encodeURIComponent(p.id || '')}`;
      location.href = url;
    });
  }

  // ---------- Optional accordion population (only if you added it earlier) ----------
  function toListHtml(val) {
    if (!val) return '';
    if (Array.isArray(val)) {
      return `<ul class="list">${val.map(x => `<li>${UI.escapeHtml(x)}</li>`).join('')}</ul>`;
    }
    return `<p style="margin:0;">${UI.escapeHtml(val)}</p>`;
  }

  const materialsEl = document.querySelector('#acc-materials');
  const careEl = document.querySelector('#acc-care');
  const dimEl = document.querySelector('#acc-dimensions');
  const guarEl = document.querySelector('#acc-guarantee');
  const shipEl = document.querySelector('#acc-shipping');

  if (materialsEl) materialsEl.innerHTML = toListHtml(p.materials) || `<p style="margin:0;">Ask about leather options, stitching, and hardware.</p>`;
  if (careEl) careEl.innerHTML = toListHtml(p.care) || `<p style="margin:0;">Avoid soaking, air dry if wet, condition lightly as needed.</p>`;
  if (dimEl) dimEl.innerHTML = toListHtml(p.dimensions) || `<p style="margin:0;">Dimensions vary by build — included with your quote.</p>`;
  if (guarEl) guarEl.innerHTML = toListHtml(p.guarantee) || `<p style="margin:0;">Built to last — reach out if anything needs attention.</p>`;
  if (shipEl) shipEl.innerHTML = toListHtml(p.shipping) || `<p style="margin:0;">Shipping and return details provided when you request a quote.</p>`;

  // Accordion behavior (single open at a time) — only runs if accordion exists
  const accButtons = document.querySelectorAll('.acc-item .acc-btn');
  if (accButtons.length) {
    accButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc-item');
        const all = Array.from(document.querySelectorAll('.acc-item'));
        all.forEach(x => { if (x !== item) x.classList.remove('open'); });
        item.classList.toggle('open');
      });
    });
  }
});