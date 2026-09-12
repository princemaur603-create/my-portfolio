document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        formMessage.textContent =
            "Thank you! Your message has been sent successfully.";

        contactForm.reset();
    });

});

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