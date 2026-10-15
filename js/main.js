
"use strict";

// 1. マウスに追従する光
const title = document.querySelector("h1");

title.addEventListener("pointermove", (event) => {
    const rect = title.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    title.style.setProperty("--mouse-x", `${x}%`);
    title.style.setProperty("--mouse-y", `${y}%`);
});

// 2. スクロール時のアニメーション
const items = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-enabled");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach((item) => observer.observe(item));
}

// 3. ダークモード切り替え
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");

    themeToggle.textContent = isDark
        ? "☀️ ライトモード"
        : "🌙 ダークモード";

    themeToggle.setAttribute("aria-pressed", String(isDark));
});
