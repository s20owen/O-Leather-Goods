export async function loadCatalog() {
  const res = await fetch("/data/products.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load catalog");
  return await res.json();
}

export function getParam(name) {
  const u = new URL(location.href);
  return u.searchParams.get(name);
}

export function escapeHTML(s="") {
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}