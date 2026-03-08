import { boot } from "../app.js";
import { getParam } from "../store.js";

const catalog = await boot();

const form = document.querySelector('form[name="custom-order"]');
const select = document.getElementById("productSelect");
const orderRefEl = document.getElementById("orderRef");

orderRefEl.value = makeRef();

/*
(select && (select.innerHTML = (catalog.products || [])
  .map(p => `<option value="${p.id}">${p.title}</option>`)
  .join("")+`<option value="other">Other</option>`));*/

  (select && (select.innerHTML = (catalog.collections || [])
  .map(c => `<option value="${c.id}">${c.title}</option>`)
  .join("")+`<option value="other">Other</option>`));

const pre = getParam("product");
if (pre && select) select.value = pre;

// store ref so thank-you page can show it
form?.addEventListener("submit", () => {
  sessionStorage.setItem("last_request_ref", orderRefEl.value);
  sessionStorage.setItem("last_request_type", "custom");
});

function makeRef() {
  const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
  const t = Date.now().toString(36).toUpperCase();
  return `RQ-${t}-${rand}`;
}