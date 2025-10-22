// Target all elements with the attribute 'section-title' and dynamically set the title length
document.addEventListener("DOMContentLoaded", () => {
    const TOTAL_LENGTH = 35;
    const PREFIX = "__ ";

    document.querySelectorAll('[section-title]').forEach(el => {
        const title = el.getAttribute('section-title');
        const base = PREFIX + title + " ";
        const remaining = Math.max(TOTAL_LENGTH - base.length, 0);
        el.textContent = base + "_".repeat(remaining);
    });
});
