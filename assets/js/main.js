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

// Add a floating bottom-to-top button
document.addEventListener("DOMContentLoaded", () => {
    const bottomToTopBtn = document.createElement("button");
    bottomToTopBtn.id = "bottom-to-top";
    bottomToTopBtn.type = "button";
    bottomToTopBtn.setAttribute("aria-label", "Bottom to top");
    bottomToTopBtn.textContent = "↑";

    document.body.appendChild(bottomToTopBtn);

    const toggleButton = () => {
        // Check how far the page has scrolled from the bottom
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight - window.scrollY < 35) {
            bottomToTopBtn.classList.add("show");
        } else {
            bottomToTopBtn.classList.remove("show");
        }
    };

    window.addEventListener("scroll", toggleButton);
    toggleButton();

    bottomToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});