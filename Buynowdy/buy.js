document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("languageSelector");
    const languageBtn = document.getElementById("languageBtn");
    const languageMenu = document.getElementById("languageMenu");
    const currentLanguage = document.getElementById("currentLanguage");

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
        });

        languageMenu.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const oldLanguage = currentLanguage.textContent.trim();
                const newLanguage = button.textContent.trim();

                currentLanguage.textContent = newLanguage;
                button.textContent = oldLanguage;

                languageMenu.classList.remove("show");
                languageSelector.classList.remove("open");
            });
        });

        document.addEventListener("click", (event) => {
            if (!languageSelector.contains(event.target)) {
                languageMenu.classList.remove("show");
                languageSelector.classList.remove("open");
            }
        });
    }

    const buyPage = document.querySelector(".buy-page");
    const gameButtons = document.querySelectorAll(".game-logo-btn");
    const editionCardsContainer = document.querySelector(".edition-cards");
    const editionCards = document.querySelectorAll(".edition-card");

    const gameData = {
        beast: {
            background: "images/background4.png",
            activeEdition: 1,
            editions: [
                {
                    image: "images/edition_bg_dltbs.jpg",
                    name: "Standard"
                },
                {
                    image: "images/deluxe-edition.jpg",
                    name: "Deluxe"
                },
                {
                    image: "images/definitive-edition.jpg",
                    name: "Definitive"
                }
            ]
        },

        "dying-light": {
            background: "images/background5.png",
            activeEdition: 0,
            editions: [
                {
                    image: "images/logo8.png",
                    name: "Essentials"
                },
                {
                    image: "images/backgr6.png",
                    name: "Definitive"
                }
            ]
        },

        "dying-light-2": {
            background: "images/dl2-background.png",
            activeEdition: 0,
            editions: [
                {
                    image: "images/dl2-reloaded.png",
                    name: "Reloaded"
                },
                {
                    image: "images/dl2-digital-extras.png",
                    name: "Digital Extras"
                }
            ]
        }
    };

    const gameOrders = {
        beast: {
            "dying-light": 1,
            beast: 2,
            "dying-light-2": 3
        },

        "dying-light": {
            "dying-light-2": 1,
            "dying-light": 2,
            beast: 3
        },

        "dying-light-2": {
            beast: 1,
            "dying-light-2": 2,
            "dying-light": 3
        }
    };

    let currentGame = "beast";
    let gameChanging = false;
    let editionAnimationTimer;
    let editionCleanupTimer;

    function arrangeGameLogos(game) {
        const orderData = gameOrders[game];

        if (!orderData) {
            return;
        }

        gameButtons.forEach((button) => {
            button.style.order = orderData[button.dataset.game];
        });
    }

    function animateGameLogos(selectedGame, selectedButton) {
        const oldPositions = new Map();

        gameButtons.forEach((button) => {
            oldPositions.set(
                button,
                button.getBoundingClientRect().left
            );
        });

        gameButtons.forEach((button) => {
            button.classList.remove("active");
        });

        selectedButton.classList.add("active");

        arrangeGameLogos(selectedGame);

        const newPositions = new Map();

        gameButtons.forEach((button) => {
            newPositions.set(
                button,
                button.getBoundingClientRect().left
            );
        });

        gameButtons.forEach((button) => {
            const oldLeft = oldPositions.get(button);
            const newLeft = newPositions.get(button);
            const movement = oldLeft - newLeft;

            button.classList.add("logo-no-transition");

            button.style.setProperty(
                "--logo-move-x",
                `${movement}px`
            );
        });

        document.body.offsetHeight;

        requestAnimationFrame(() => {
            gameButtons.forEach((button) => {
                button.classList.remove("logo-no-transition");
                button.style.setProperty("--logo-move-x", "0px");
            });
        });
    }

    function setEditionCards(game) {
        const data = gameData[game];

        if (
            !data ||
            !editionCardsContainer ||
            editionCards.length === 0
        ) {
            return;
        }

        editionCardsContainer.classList.toggle(
            "two-editions",
            data.editions.length === 2
        );

        editionCards.forEach((card, index) => {
            const edition = data.editions[index];
            const image = card.querySelector(".edition-image img");
            const name = card.querySelector(".edition-name");

            card.classList.remove("active");
            card.style.display = "";
            card.style.setProperty(
                "--edition-delay",
                `${index * 100}ms`
            );

            if (!edition) {
                card.style.display = "none";
                return;
            }

            if (image) {
                image.src = edition.image;
                image.alt = edition.name;
            }

            if (name) {
                name.textContent = edition.name;
            }

            if (index === data.activeEdition) {
                card.classList.add("active");
            }
        });
    }

    function animateEditionCards(game) {
        if (!editionCardsContainer) {
            return;
        }

        clearTimeout(editionAnimationTimer);
        clearTimeout(editionCleanupTimer);

        editionCardsContainer.classList.remove("editions-entering");
        editionCardsContainer.classList.add("editions-leaving");

        editionAnimationTimer = setTimeout(() => {
            setEditionCards(game);

            editionCardsContainer.classList.remove("editions-leaving");

            void editionCardsContainer.offsetWidth;

            editionCardsContainer.classList.add("editions-entering");

            editionCleanupTimer = setTimeout(() => {
                editionCardsContainer.classList.remove(
                    "editions-entering"
                );
            }, 800);
        }, 260);
    }

    function changeGame(button) {
        const selectedGame = button.dataset.game;
        const data = gameData[selectedGame];

        if (
            !data ||
            selectedGame === currentGame ||
            gameChanging ||
            !buyPage
        ) {
            return;
        }

        gameChanging = true;

        animateGameLogos(selectedGame, button);
        animateEditionCards(selectedGame);

        buyPage.classList.add("background-changing");

        setTimeout(() => {
            buyPage.style.setProperty(
                "--page-bg",
                `url("${data.background}")`
            );

            buyPage.dataset.game = selectedGame;
            currentGame = selectedGame;

            requestAnimationFrame(() => {
                buyPage.classList.remove("background-changing");
            });
        }, 350);

        setTimeout(() => {
            gameChanging = false;
        }, 950);
    }

    gameButtons.forEach((button) => {
        button.addEventListener("click", () => {
            changeGame(button);
        });
    });

    if (editionCardsContainer) {
        editionCardsContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".edition-card");

            if (
                !selectedCard ||
                selectedCard.style.display === "none" ||
                editionCardsContainer.classList.contains(
                    "editions-leaving"
                )
            ) {
                return;
            }

            editionCards.forEach((card) => {
                card.classList.remove("active");
            });

            selectedCard.classList.add("active");
        });
    }

    if (buyPage) {
        buyPage.dataset.game = "beast";
    }

    arrangeGameLogos("beast");
    setEditionCards("beast");

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const outpostMenu = document.querySelector(".outpost-menu");
    const outpostToggle = document.getElementById("outpostToggle");

    function closeMobileMenu() {
        if (!menuToggle || !mainNav) {
            return;
        }

        menuToggle.classList.remove("active");
        mainNav.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");

        if (outpostMenu) {
            outpostMenu.classList.remove("open");
            outpostMenu.classList.remove("mobile-open");
        }

        if (outpostToggle) {
            outpostToggle.setAttribute("aria-expanded", "false");
        }
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            if (!isOpen && outpostMenu) {
                outpostMenu.classList.remove("open");
                outpostMenu.classList.remove("mobile-open");
            }

            if (!isOpen && outpostToggle) {
                outpostToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }

    if (outpostToggle && outpostMenu) {
        outpostToggle.addEventListener("click", (event) => {
            if (window.innerWidth <= 1000) {
                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    outpostMenu.classList.toggle("mobile-open");

                outpostToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        });
    }

    if (mainNav) {
        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (
                    window.innerWidth <= 1000 &&
                    link.getAttribute("href") !== "#"
                ) {
                    closeMobileMenu();
                }
            });
        });
    }

    document.addEventListener("click", (event) => {
        if (
            window.innerWidth <= 1000 &&
            mainNav &&
            menuToggle &&
            mainNav.classList.contains("open") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();

            if (
                languageMenu &&
                languageSelector
            ) {
                languageMenu.classList.remove("show");
                languageSelector.classList.remove("open");
            }
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1000) {
            closeMobileMenu();
        }
    });
});