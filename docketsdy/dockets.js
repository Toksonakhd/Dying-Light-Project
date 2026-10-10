const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

const hiddenFaqItems = document.querySelectorAll(
    ".faq-item:nth-child(n + 3)"
);

const faqObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                faqObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1
    }
);

hiddenFaqItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.12}s`;
    faqObserver.observe(item);
});
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const loginModal = document.getElementById("loginModal");
const loginPassword = document.getElementById("loginPassword");
const passwordToggle = document.getElementById("passwordToggle");
const loginForm = document.getElementById("loginForm");

function openLoginModal() {
    loginModal.classList.add("active");
    document.body.classList.add("login-open");
}

function closeLoginModal() {
    loginModal.classList.remove("active");
    document.body.classList.remove("login-open");
}

openLogin.addEventListener("click", openLoginModal);

closeLogin.addEventListener("click", closeLoginModal);

loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        closeLoginModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLoginModal();
    }
});

passwordToggle.addEventListener("click", () => {
    const isPassword = loginPassword.type === "password";

    loginPassword.type = isPassword ? "text" : "password";

    passwordToggle.innerHTML = isPassword
        ? '<i class="fa-regular fa-eye"></i>'
        : '<i class="fa-regular fa-eye-slash"></i>';
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const outpostMenu = document.querySelector(".outpost-menu");
const outpostLink = document.querySelector(".outpost-link");

function closeMobileMenu() {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");

    if (outpostMenu) {
        outpostMenu.classList.remove("mobile-open");
    }
}

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
});

if (outpostLink && outpostMenu) {
    outpostLink.addEventListener("click", (event) => {
        if (window.innerWidth <= 1000) {
            event.preventDefault();
            outpostMenu.classList.toggle("mobile-open");
        }
    });
}

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (
            window.innerWidth <= 1000 &&
            !link.classList.contains("outpost-link")
        ) {
            closeMobileMenu();
        }
    });
});

document.addEventListener("click", (event) => {
    if (
        window.innerWidth <= 1000 &&
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
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        closeMobileMenu();
    }
});