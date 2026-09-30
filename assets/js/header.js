class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                    <h1><a class="navbar-brand" href="/">Pasindu S. Thenahandi</a></h1>

                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="navbar-collapse collapse" id="navbarCollapse" style="">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/education.html">Education</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/experience.html">Experience</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/skills.html">Skills</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/teaching.html">Teaching</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/projects.html">Projects</a>
                            </li> 
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/publications.html">Publications</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="/pages/blogposts.html">Blogs</a>
                            </li>
                            <li class="nav-item mr-2 mt-1">
                                <button id="theme-toggle" class="btn btn-blue">🌙</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        `;

        // Highlight the current page in the navigation bar
        const currentPath = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
        const navLinks = this.querySelectorAll(".nav-link");

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            const normalizedHref = (href || "/").replace(/\/+$/, "") || "/";
            if (normalizedHref === currentPath) {
                link.classList.add("active");
                link.closest(".nav-item")?.classList.add("active");
            }
        });

        const toggleButton = document.getElementById("theme-toggle");
        const body = document.body;

        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            body.classList.add(savedTheme);
            toggleButton.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
        } else {
            body.classList.add("light-mode"); // default
            toggleButton.textContent = "🌙";
        }

        toggleButton.addEventListener("click", () => {
            if (body.classList.contains("light-mode")) {
                body.classList.remove("light-mode");
                body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark-mode");
                toggleButton.textContent = "☀️"; // switch to sun
            } else {
                body.classList.remove("dark-mode");
                body.classList.add("light-mode");
                localStorage.setItem("theme", "light-mode");
                toggleButton.textContent = "🌙"; // switch to moon
            }
        });

    }
}

customElements.define("header-component", Header);
