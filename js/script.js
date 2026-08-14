/* =========================================================
   SIBEN KUMAR PORTFOLIO
   JavaScript
========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

});


/* Close mobile menu after clicking a link */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* =========================================================
   2. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        if (scrollPosition >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        const linkSection =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkSection === `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   3. THEME TOGGLE
========================================================= */

const themeToggle =
    document.querySelector(".theme-toggle");


themeToggle.addEventListener("click", () => {

    const lightTheme =
        document.body.classList.toggle("light-theme");


    themeToggle.setAttribute(
        "aria-label",
        lightTheme
            ? "Switch to dark theme"
            : "Switch to light theme"
    );

});


/*
    We will create the light-theme CSS later.

    For now this JavaScript simply adds/removes:

        light-theme

    from the <body>.
*/


/* =========================================================
   4. CONTACT FORM
========================================================= */

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitButton =
        contactForm.querySelector("button[type='submit']");

    const name =
        document.querySelector("#name").value.trim();

    const email =
        document.querySelector("#email").value.trim();

    const message =
        document.querySelector("#message").value.trim();


    /* Check fields */

    if (!name || !email || !message) {

        formMessage.textContent =
            "Please complete all fields.";

        return;
    }


    /* Sending state */

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formMessage.textContent = "";


    try {

        const formData =
            new FormData(contactForm);


        const response =
            await fetch(contactForm.action, {

                method: "POST",

                body: formData

            });


        const result =
            await response.json();


        if (result.success) {

            formMessage.textContent =
                "✓ Message sent successfully!";

            contactForm.reset();

        } else {

            formMessage.textContent =
                "✕ Something went wrong. Please try again.";

        }


    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "✕ Unable to send message. Please try again.";

    }


    /* Restore button */

    submitButton.disabled = false;

    submitButton.textContent =
        "→ Send Message";

});

/* =========================================================
   5. BACK TO TOP
========================================================= */

const backToTop =
    document.querySelector(".back-to-top");


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================================
   6. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   7. ESC KEY CLOSES MOBILE MENU
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});