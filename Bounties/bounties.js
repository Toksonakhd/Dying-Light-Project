document.addEventListener("DOMContentLoaded", () => {

    const heroArrow = document.getElementById("heroArrow");
    const bountiesInfo = document.getElementById("bountiesInfo");
    const gameButtons = document.querySelectorAll(".game-switch-btn");

    if (heroArrow && bountiesInfo) {
        heroArrow.addEventListener("click", () => {
            const willOpen = !bountiesInfo.classList.contains("open");

            bountiesInfo.classList.toggle("open", willOpen);
            heroArrow.classList.toggle("open", willOpen);
            heroArrow.setAttribute("aria-expanded", String(willOpen));
        });
    }

    gameButtons.forEach((button) => {
        button.addEventListener("click", () => {
            gameButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");
        });
    });

    const daysElement = document.getElementById("countdownDays");
    const hoursElement = document.getElementById("countdownHours");
    const minutesElement = document.getElementById("countdownMinutes");
    const secondsElement = document.getElementById("countdownSeconds");

    if (
        daysElement &&
        hoursElement &&
        minutesElement &&
        secondsElement
    ) {
        const duration = 7 * 24 * 60 * 60 * 1000;
        const storageKey = "bountiesCountdownEnd";

        let endTime = Number(localStorage.getItem(storageKey));

        if (!endTime || endTime <= Date.now()) {
            endTime = Date.now() + duration;
            localStorage.setItem(storageKey, String(endTime));
        }

        const pad = (value) => String(value).padStart(2, "0");

        function updateCountdown() {
            let distance = endTime - Date.now();

            if (distance <= 0) {
                endTime = Date.now() + duration;
                localStorage.setItem(storageKey, String(endTime));
                distance = duration;
            }

            const days = Math.floor(distance / 86400000);
            const hours = Math.floor((distance % 86400000) / 3600000);
            const minutes = Math.floor((distance % 3600000) / 60000);
            const seconds = Math.floor((distance % 60000) / 1000);

            daysElement.textContent = pad(days);
            hoursElement.textContent = pad(hours);
            minutesElement.textContent = pad(minutes);
            secondsElement.textContent = pad(seconds);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    const weeklyActivateButtons = document.querySelectorAll(
        ".weekly-activate-btn"
    );

    const activeBountiesCount = document.getElementById(
        "activeBountiesCount"
    );

    let activeBounties = 0;

    weeklyActivateButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isActive = button.classList.contains("active");

            if (!isActive && activeBounties >= 3) {
                return;
            }

            button.classList.toggle("active");

            if (button.classList.contains("active")) {
                activeBounties++;
                button.childNodes[0].textContent = "Activated ";
            } else {
                activeBounties--;
                button.childNodes[0].textContent = "Activate ";
            }

            if (activeBountiesCount) {
                activeBountiesCount.textContent = activeBounties;
            }
        });
    });

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const dropdowns = document.querySelectorAll(".nav-dropdown");
    const dropdownToggles = document.querySelectorAll(
        ".nav-dropdown-toggle"
    );

    const closeMenu = () => {
        if (!menuToggle || !mainNav) {
            return;
        }

        menuToggle.classList.remove("active");
        mainNav.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");

        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
        });
    };

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const willOpen = !mainNav.classList.contains("open");

            menuToggle.classList.toggle("active", willOpen);
            mainNav.classList.toggle("open", willOpen);
            document.body.classList.toggle("menu-open", willOpen);
            menuToggle.setAttribute("aria-expanded", String(willOpen));
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            if (window.innerWidth > 900) {
                return;
            }

            event.preventDefault();

            const currentDropdown = toggle.closest(".nav-dropdown");
            const willOpen = !currentDropdown.classList.contains("open");

            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
            });

            currentDropdown.classList.toggle("open", willOpen);
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

    const languageSelector = document.getElementById(
        "languageSelector"
    );

    const languageBtn = document.getElementById(
        "languageBtn"
    );

    const languageMenu = document.getElementById(
        "languageMenu"
    );

    const currentLanguage = document.getElementById(
        "currentLanguage"
    );

    if (
        languageSelector &&
        languageBtn &&
        languageMenu &&
        currentLanguage
    ) {
        languageBtn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = languageMenu.classList.contains("show");

            languageMenu.classList.toggle("show", !isOpen);
            languageSelector.classList.toggle("open", !isOpen);
            languageBtn.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
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
                languageBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });

        document.addEventListener("click", (event) => {
            if (!languageSelector.contains(event.target)) {
                languageMenu.classList.remove("show");
                languageSelector.classList.remove("open");
                languageBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }

});