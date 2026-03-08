import { boot } from "../app.js";
await boot();

const form = document.querySelector('form[name="contact"]');
form?.addEventListener("submit", () => {
  sessionStorage.setItem("last_request_type", "contact");
});