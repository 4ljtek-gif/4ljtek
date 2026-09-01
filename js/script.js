// ===============================
// 4LJTek - script.js
// ===============================


// ===============================
// UPDATE COPYRIGHT YEAR
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});


// ===============================
// PRODUCT SEARCH
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("search");
    const products = document.querySelectorAll(".product-card");

    if (!searchInput || !products.length) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const query = this.value.toLowerCase().trim();

        products.forEach(function (product) {

            const productNameElement =
                product.querySelector("h3");

            const productName =
                productNameElement
                    ? productNameElement.textContent.toLowerCase()
                    : "";

            const productText =
                product.textContent.toLowerCase();

            if (
                query === "" ||
                productName.includes(query) ||
                productText.includes(query)
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

});


// ===============================
// HOMEPAGE WHATSAPP
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const whatsappButton =
        document.getElementById("home-whatsapp");

    if (!whatsappButton) {
        return;
    }

    whatsappButton.addEventListener("click", function (event) {

        event.preventDefault();

        const phone = "254101984723";

        const message =
            "Hi 4LJTek, I'd like to order from your store.";

        const whatsappLink =
            "https://api.whatsapp.com/send?phone=" +
            phone +
            "&text=" +
            encodeURIComponent(message);

        window.location.href = whatsappLink;

    });

});


// ===============================
// PRODUCT WHATSAPP BUTTONS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const productButtons =
        document.querySelectorAll(
            ".product-card .whatsapp-btn"
        );

    productButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const productCard =
                button.closest(".product-card");

            if (!productCard) {
                return;
            }

            const productNameElement =
                productCard.querySelector("h3");

            if (!productNameElement) {
                return;
            }

            const productName =
                productNameElement.textContent.trim();

            const phone = "254101984723";

            const message =
                "Hi 4LJTek, I'm interested in the " +
                productName +
                ". Please share the price and availability.";

            const whatsappLink =
                "https://api.whatsapp.com/send?phone=" +
                phone +
                "&text=" +
                encodeURIComponent(message);

            window.location.href = whatsappLink;

        });

    });

});


// ===============================
// SMOOTH CATEGORY SCROLLING
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                this.getAttribute("href");

            // Ignore empty links
            if (!href || href === "#") {
                return;
            }

            const target =
                document.querySelector(href);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});


// ===============================
// WELCOME MESSAGE
// ===============================

console.log(
    "Welcome to 4LJTek - Quality Over Quantity!"
);
