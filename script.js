const heroContent = document.getElementById("heroContent");
const heroStory = document.getElementById("heroStory");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        heroContent.classList.add("hide");
        heroStory.classList.add("show");
    } else {
        heroContent.classList.remove("hide");
        heroStory.classList.remove("show");
    }

});

const halfSection = document.querySelector(".half-section");

if (halfSection) {

    window.addEventListener("scroll", () => {

        const rect = halfSection.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.15) {
            halfSection.classList.add("active");
        } else {
            halfSection.classList.remove("active");
        }

    });

}
const slider = document.getElementById("comparisonSlider");
const overlay = document.getElementById("comparisonOverlay");
const handle = document.getElementById("comparisonHandle");

let isDragging = false;

function updateSlider(clientX) {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;

    overlay.style.width = percent + "%";
    handle.style.left = percent + "%";
}

slider.addEventListener("mousedown", function () {
    isDragging = true;
});

window.addEventListener("mouseup", function () {
    isDragging = false;
});

window.addEventListener("mousemove", function (e) {
    if (isDragging) {
        updateSlider(e.clientX);
    }
});
const apocSection = document.querySelector(".apocalypse-section");
const apocCastle = document.querySelector(".apoc-castle");
const apocLake = document.querySelector(".apoc-lake");
const apocFront = document.querySelector(".apoc-front");
const apocContent = document.querySelector(".apoc-content");

window.addEventListener("scroll", () => {
    if (!apocSection) return;

    const rect = apocSection.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);

    apocCastle.style.transform = `scale(${1.15 - progress * 0.15})`;
    apocLake.style.transform = `scale(${1.2 - progress * 0.2}) translateY(${80 - progress * 80}px)`;
    apocFront.style.transform = `scale(${1.25 - progress * 0.25}) translateY(${160 - progress * 160}px)`;

    apocContent.style.transform = `translate(-50%, -50%) scale(${1.08 - progress * 0.08})`;
});
const deluxeBtn = document.getElementById("deluxeBtn");
const definitiveBtn = document.getElementById("definitiveBtn");

const editionGallery = document.querySelector(".edition-gallery");
const editionLeft = document.getElementById("editionLeft");
const editionCenter = document.getElementById("editionCenter");
const editionPanel = document.getElementById("editionPanel");

function changeEdition(leftImage, centerImage, panelImage) {
    editionGallery.classList.add("fade");

    setTimeout(() => {
        editionLeft.src = leftImage;
        editionCenter.src = centerImage;
        editionPanel.src = panelImage;

        editionGallery.classList.remove("fade");
    }, 350);
}

deluxeBtn.addEventListener("click", () => {
    editionGallery.classList.add("fade");

    setTimeout(() => {

        editionLeft.src = "images/bg_dltb_deluxe_1920.avif";

        editionCenter.src = "images/kyle.avif";
        editionCenter.style.display = "block";

        editionPanel.src = "images/edition-panel.png.png";

        editionGallery.classList.remove("fade");

    }, 350);

    deluxeBtn.classList.add("active");
    definitiveBtn.classList.remove("active");
});

definitiveBtn.addEventListener("click", () => {
    editionGallery.classList.add("fade");

    setTimeout(() => {
        editionLeft.src = "images/kyle2.jpg";
        editionCenter.style.display = "none";
        editionPanel.src = "images/editionpanel2.png";

        editionGallery.classList.remove("fade");
    }, 350);

    definitiveBtn.classList.add("active");
    deluxeBtn.classList.remove("active");
});
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});
const languageSelector = document.querySelector(".language-selector");
const languageButton = document.querySelector(".language-btn");
const languageMenu = document.querySelector(".language-menu");
const languageText = languageButton.querySelector("span");
const languageOptions = languageMenu.querySelectorAll("button");

languageButton.addEventListener("click", (event) => {
    event.stopPropagation();

    languageMenu.classList.toggle("show");
    languageSelector.classList.toggle("open");
});

languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
        languageText.textContent = option.dataset.language;

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
const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");

const loginPassword = document.getElementById("loginPassword");
const passwordToggle = document.getElementById("passwordToggle");

openLogin.addEventListener("click", () => {
    loginModal.classList.add("active");
    document.body.classList.add("login-open");
});

closeLogin.addEventListener("click", () => {
    loginModal.classList.remove("active");
    document.body.classList.remove("login-open");
});

loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove("active");
        document.body.classList.remove("login-open");
    }
});

passwordToggle.addEventListener("click", () => {
    const icon = passwordToggle.querySelector("i");

    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        loginPassword.type = "password";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    }
});
const openTrailer = document.getElementById("openTrailer");
const closeTrailer = document.getElementById("closeTrailer");
const trailerModal = document.getElementById("trailerModal");
const trailerFrame = document.getElementById("trailerFrame");

const trailerUrl =
  "https://www.youtube.com/embed/qsqBCs7o5go?autoplay=1&rel=0";

function showTrailer() {
  trailerModal.classList.add("active");
  trailerFrame.src = trailerUrl;
  document.body.classList.add("modal-open");
}

function hideTrailer() {
  trailerModal.classList.remove("active");
  trailerFrame.src = "";
  document.body.classList.remove("modal-open");
}

openTrailer.addEventListener("click", showTrailer);
closeTrailer.addEventListener("click", hideTrailer);

trailerModal.addEventListener("click", (event) => {
  if (event.target === trailerModal) {
    hideTrailer();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideTrailer();
  }
});
const menuToggle = document.getElementById("menuToggle");
const navigation = document.querySelector("header nav");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navigation.classList.toggle("open");
    });
}
const outpostMenu = document.querySelector(".outpost-menu");

if (outpostMenu) {
    let outpostTimer;

    outpostMenu.addEventListener("mouseenter", () => {
        clearTimeout(outpostTimer);
        outpostMenu.classList.add("open");
    });

    outpostMenu.addEventListener("mouseleave", () => {
        outpostTimer = setTimeout(() => {
            outpostMenu.classList.remove("open");
        }, 0);
    });
}