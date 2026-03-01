document.addEventListener('DOMContentLoaded', ()=>{
  UI.setActiveNav();
  UI.setupMobileNav();

  // Optional: set year in footer
  const y = document.querySelector('[data-year]');
  if(y) y.textContent = new Date().getFullYear();
});