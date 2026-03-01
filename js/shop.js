document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.querySelector('#productGrid');
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  const sort = document.querySelector('#sort');

  if(!grid) return;

  // Populate categories
  if(category){
    category.innerHTML = window.CATEGORIES.map(c => `<option value="${UI.escapeHtml(c)}">${UI.escapeHtml(c)}</option>`).join("");
  }

  function getFiltered(){
    const q = (search?.value || "").trim().toLowerCase();
    const cat = category?.value || "All";

    let list = window.PRODUCTS.slice();

    if(cat !== "All"){
      list = list.filter(p => (p.category || "") === cat);
    }

    if(q){
      list = list.filter(p => {
        const hay = `${p.name} ${p.category} ${p.leather} ${p.finish} ${p.description} ${(p.tags||[]).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    const s = sort?.value || "featured";
    if(s === "featured"){
      list.sort((a,b)=> (b.featured===true) - (a.featured===true));
    } else if(s === "name"){
      list.sort((a,b)=> (a.name||"").localeCompare(b.name||""));
    } else if(s === "category"){
      list.sort((a,b)=> (a.category||"").localeCompare(b.category||""));
    }

    return list;
  }

  function render(){
    const list = getFiltered();
    grid.innerHTML = list.map(UI.productCard).join("");
    UI.wireProductCards();

    const count = document.querySelector('#count');
    if(count) count.textContent = `${list.length} item${list.length===1?'':'s'}`;
  }

  [search, category, sort].forEach(el=>{
    if(!el) return;
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  render();
});