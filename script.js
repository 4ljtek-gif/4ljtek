/* =========================
   4LJTek - Main JavaScript
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("4LJTek website loaded successfully.");

    // Update footer year automatically
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Simple mobile menu toggle
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Product search (if search box exists)
    const searchInput = document.getElementById("search");
    const products = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const value = searchInput.value.toLowerCase();

            products.forEach(product => {
                const text = product.textContent.toLowerCase();

                if (text.includes(value)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your message has been sent to 4LJTek.");
            contactForm.reset();
        });
    }

    // Newsletter form
    const newsletter = document.getElementById("newsletter-form");

    if (newsletter) {
        newsletter.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for subscribing to 4LJTek!");
            newsletter.reset();
        });
    }
});
