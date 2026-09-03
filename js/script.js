// ==========================================
// 4LJTek WEBSITE JAVASCRIPT
// ==========================================


// ==========================================
// PRODUCT SEARCH
// ==========================================

function setupProductSearch() {

    const searchInput = document.getElementById("search");

    if (!searchInput) {
        console.log("4LJTek: Search box not found.");
        return;
    }

    console.log("4LJTek: Search is ready.");

    searchInput.addEventListener("input", function () {

        const searchTerm = this.value
            .toLowerCase()
            .trim();

        const products = document.querySelectorAll(".product-card");

        products.forEach(function (product) {

            const productText = product.textContent
                .toLowerCase();

            if (productText.includes(searchTerm)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


// ==========================================
// WHATSAPP BUTTONS
// ==========================================

function setupWhatsAppButtons() {

    const buttons = document.querySelectorAll(
        ".product-card .whatsapp-btn"
    );

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const card = button.closest(".product-card");

            if (!card) {
                return;
            }

            const name = card.querySelector("h3");

            if (!name) {
                return;
            }

            const productName = name.textContent.trim();

            const phone = "254101984723";

            const message =
                "Hi 4LJTek, I'm interested in the " +
                productName +
                ". Please share the price and availability.";

            const url =
                "https://api.whatsapp.com/send?phone=" +
                phone +
                "&text=" +
                encodeURIComponent(message);

            window.location.href = url;

        });

    });

}


// ==========================================
// HOMEPAGE WHATSAPP
// ==========================================

function setupHomeWhatsApp() {

    const button =
        document.getElementById("home-whatsapp");

    if (!button) {
        return;
    }

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const phone = "254101984723";

        const message =
            "Hi 4LJTek, I'd like to order from your store.";

        const url =
            "https://api.whatsapp.com/send?phone=" +
            phone +
            "&text=" +
            encodeURIComponent(message);

        window.location.href = url;

    });

}


// ==========================================
// CATEGORY NAVIGATION
// ==========================================

function setupCategoryNavigation() {

    const links =
        document.querySelectorAll(
            '.product-category-nav a[href^="#"]'
        );

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const id =
                link.getAttribute("href");

            if (!id || id === "#") {
                return;
            }

            const target =
                document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


// ==========================================
// START EVERYTHING
// ==========================================

function start4LJTek() {

    setupProductSearch();

    setupWhatsAppButtons();

    setupHomeWhatsApp();

    setupCategoryNavigation();

    console.log(
        "4LJTek website JavaScript loaded successfully."
    );

}


// ==========================================
// RUN AFTER PAGE LOAD
// ==========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        start4LJTek
    );

} else {

    start4LJTek();

}
