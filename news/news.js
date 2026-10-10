document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const outpostMenu = document.querySelector(".outpost-menu");
    const outpostLink = document.querySelector(".outpost-link");

    const languageSelector = document.getElementById("languageSelector");
    const languageBtn = document.getElementById("languageBtn");
    const languageMenu = document.getElementById("languageMenu");
    const currentLanguage = document.getElementById("currentLanguage");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            document.body.classList.toggle("menu-open", isOpen);

            if (!isOpen && outpostMenu && outpostLink) {
                outpostMenu.classList.remove("open");
                outpostLink.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (outpostMenu && outpostLink) {
        outpostLink.addEventListener("click", (event) => {
            if (window.innerWidth > 1250) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const isOpen = outpostMenu.classList.toggle("open");

            outpostLink.setAttribute("aria-expanded", String(isOpen));
        });
    }

    if (
        languageSelector &&
        languageBtn &&
        languageMenu &&
        currentLanguage
    ) {
        languageBtn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = languageMenu.classList.toggle("show");

            languageSelector.classList.toggle("open", isOpen);
            languageBtn.setAttribute("aria-expanded", String(isOpen));
        });

        languageMenu.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const previousLanguage =
                    currentLanguage.textContent.trim();

                const selectedLanguage =
                    button.textContent.trim();

                currentLanguage.textContent = selectedLanguage;
                button.textContent = previousLanguage;

                languageMenu.classList.remove("show");
                languageSelector.classList.remove("open");
                languageBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    document.addEventListener("click", (event) => {
        if (
            languageSelector &&
            !languageSelector.contains(event.target)
        ) {
            languageMenu?.classList.remove("show");
            languageSelector.classList.remove("open");
            languageBtn?.setAttribute("aria-expanded", "false");
        }

        if (
            window.innerWidth <= 1250 &&
            outpostMenu &&
            !outpostMenu.contains(event.target)
        ) {
            outpostMenu.classList.remove("open");
            outpostLink?.setAttribute("aria-expanded", "false");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1250) {
            mainNav?.classList.remove("open");
            menuToggle?.classList.remove("active");
            menuToggle?.setAttribute("aria-expanded", "false");

            outpostMenu?.classList.remove("open");
            outpostLink?.setAttribute("aria-expanded", "false");

            document.body.classList.remove("menu-open");
        }
    });
});