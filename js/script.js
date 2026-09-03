// ===============================
// 4LJTek - script.js
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // COPYRIGHT YEAR
    // ===============================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ===============================
    // PRODUCT SEARCH
    // ===============================

    const searchInput = document.getElementById("search");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const query = searchInput.value
                .toLowerCase()
                .trim();

            const products =
                document.querySelectorAll(".product-card");

            products.forEach(function (product) {

                const productName =
                    product.querySelector("h3");

                const nameText =
                    productName
                        ? productName.textContent.toLowerCase()
                        : "";

                const fullText =
                    product.textContent.toLowerCase();

                if (
                    query === "" ||
                    nameText.includes(query) ||
                    fullText.includes(query)
                ) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }

            });

        });

    }


    // ===============================
    // HOMEPAGE WHATSAPP
    // ===============================

    const homeWhatsApp =
        document.getElementById("home-whatsapp");

    if (homeWhatsApp) {

        homeWhatsApp.addEventListener("click", function (event) {

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

    }


    // ===============================
    // PRODUCT WHATSAPP
    // ===============================

    const productWhatsAppButtons =
        document.querySelectorAll(
            ".product-card .whatsapp-btn"
        );

    productWhatsAppButtons.forEach(function (button) {

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


    // ===============================
    // CATEGORY SMOOTH SCROLL
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                this.getAttribute("href");

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


    // ===============================
    // CONSOLE MESSAGE
    // ===============================

    console.log(
        "Welcome to 4LJTek - Quality Over Quantity!"
    );

});
