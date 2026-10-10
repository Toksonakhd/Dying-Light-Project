const openIntro = document.getElementById("openIntro");
const closeIntro = document.getElementById("closeIntro");
const videoModal = document.getElementById("videoModal");
const videoBackdrop = document.getElementById("videoBackdrop");
const introVideo = document.getElementById("introVideo");

const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav a");

const languageSelector = document.querySelector(".language-selector");
const languageBtn = document.querySelector(".language-btn");
const languageText = document.querySelector(".language-btn span");
const languageOptions = document.querySelectorAll(".language-menu button");

const videoUrl =
    "https://www.youtube.com/embed/D_WXbTjhhnI?autoplay=1&rel=0";

function openVideoModal() {
    if (!videoModal || !introVideo) return;

    videoModal.classList.add("show");
    videoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    introVideo.src = videoUrl;
}

function closeVideoModal() {
    if (!videoModal || !introVideo) return;

    videoModal.classList.remove("show");
    videoModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    introVideo.src = "";
}

if (openIntro) {
    openIntro.addEventListener("click", openVideoModal);
}

if (closeIntro) {
    closeIntro.addEventListener("click", closeVideoModal);
}

if (videoBackdrop) {
    videoBackdrop.addEventListener("click", closeVideoModal);
}

function openMobileMenu() {
    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");

    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");

    document.body.classList.add("menu-open");
}

function closeMobileMenu() {
    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");

    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");
}

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("open");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenu.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        closeMobileMenu();
    }
});

const passwordButtons = document.querySelectorAll(".password-toggle");

passwordButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);
        const icon = button.querySelector("i");

        if (!input || !icon) return;

        const isPassword = input.type === "password";

        input.type = isPassword ? "text" : "password";

        icon.classList.toggle("fa-eye", !isPassword);
        icon.classList.toggle("fa-eye-slash", isPassword);

        button.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );
    });
});

if (languageBtn && languageSelector) {
    languageBtn.addEventListener("click", () => {
        const isOpen = languageSelector.classList.toggle("open");

        languageBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}

languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
        if (languageText) {
            languageText.textContent = option.dataset.language;
        }

        languageSelector.classList.remove("open");
        languageBtn.setAttribute("aria-expanded", "false");
    });
});

document.addEventListener("click", (event) => {
    if (
        languageSelector &&
        !languageSelector.contains(event.target)
    ) {
        languageSelector.classList.remove("open");

        if (languageBtn) {
            languageBtn.setAttribute("aria-expanded", "false");
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeVideoModal();
        closeMobileMenu();

        if (languageSelector) {
            languageSelector.classList.remove("open");
        }

        if (languageBtn) {
            languageBtn.setAttribute("aria-expanded", "false");
        }
    }
});