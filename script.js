/* ===== SCROLL REVEAL ANIMATION ===== */

function revealSections() {
    const sections = document.querySelectorAll(".reveal");

    sections.forEach(function(section) {
        const windowHeight = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);

revealSections();

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
}

const texts = [
    "Web Developer",
    "JavaScript Developer",
    "Creative Coder"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const typing = document.getElementById("typing");

    if (!typing) return;

    const currentText = texts[textIndex];

    if (!deleting) {
        typing.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typing.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

// ===== SCROLL REVEAL ANIMATION =====

const revealElements = document.querySelectorAll(
    "section, .project-card, .skill-card, .about-box"
);

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();