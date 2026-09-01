// ===============================
// 4LJTek - script.js
// ===============================

// Update the copyright year automatically
document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});

// Product search
const searchInput = document.getElementById("search");
const products = document.querySelectorAll(".product-card");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();

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

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Welcome message
console.log("Welcome to 4LJTek - Quality Over Quantity!");
/* =========================================
   4LJTEK PRODUCT SEARCH
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("search");
    const products = document.querySelectorAll(".product-card");

    if (!search || !products.length) return;

    search.addEventListener("input", function () {

        const query = this.value.toLowerCase().trim();
        let visibleProducts = 0;

        products.forEach(function (product) {

            const text = product.textContent.toLowerCase();

            if (text.includes(query)) {
                product.style.display = "";
                visibleProducts++;
            } else {
                product.style.display = "none";
            }

        });

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const whatsappButton = document.getElementById("home-whatsapp");

    if (whatsappButton) {

        whatsappButton.addEventListener("click", function (event) {

            event.preventDefault();

            const phone = "254101984723";

            const message = "Hi 4LJTek, I'd like to order from your store.";

            const whatsappLink =
                "https://api.whatsapp.com/send?phone=" +
                phone +
                "&text=" +
                encodeURIComponent(message);

            window.location.href = whatsappLink;

        });

    }

});
