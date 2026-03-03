async function loadIncludes() {
  const includes = document.querySelectorAll("include[src]");

  for (const el of includes) {
    const file = el.getAttribute("src");

    try {
      const response = await fetch(file);
      const html = await response.text();

      el.insertAdjacentHTML("afterend", html);
      el.remove();
    } catch (err) {
      console.error("Ошибка загрузки:", file, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadIncludes);

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;

  const sel = btn.getAttribute("data-copy");
  const el = document.querySelector(sel);
  if (!el) return;

  const text = el.textContent.trim();

  try {
    await navigator.clipboard.writeText(text);
    // лёгкий фидбек (без попапов)
    btn.style.transform = "scale(0.95)";
    setTimeout(() => (btn.style.transform = ""), 120);
  } catch (err) {
    console.error("Clipboard error:", err);
  }
});