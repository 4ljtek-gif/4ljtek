document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // PRODUCT SEARCH
    // =========================

    const searchInput = document.getElementById("search");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchTerm = this.value
                .toLowerCase()
                .trim();

            const products =
                document.querySelectorAll(".product-card");

            products.forEach(function (product) {

                const productText =
                    product.textContent.toLowerCase();

                if (
                    searchTerm === "" ||
                    productText.includes(searchTerm)
                ) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }

            });

        });

    }


    // =========================
    // WHATSAPP PRODUCT BUTTONS
    // =========================

    const whatsappButtons =
        document.querySelectorAll(".product-card .whatsapp-btn");

    whatsappButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const productCard =
                button.closest(".product-card");

            const productName =
                productCard.querySelector("h3").textContent.trim();

            const phone = "254101984723";

            const message =
                "Hi 4LJTek, I'm interested in the " +
                productName +
                ". Please share the price and availability.";

            const whatsappURL =
                "https://api.whatsapp.com/send?phone=" +
                phone +
                "&text=" +
                encodeURIComponent(message);

            window.location.href = whatsappURL;

        });

    });


    // =========================
    // CATEGORY NAVIGATION
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID =
                this.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const target =
                document.querySelector(targetID);

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
