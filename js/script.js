// ==========================================
// 4LJTek WEBSITE JAVASCRIPT
// ==========================================


// ==========================================
// SETTINGS
// ==========================================

const WHATSAPP_NUMBER = "254101984723";


// ==========================================
// PRODUCT SEARCH
// ==========================================

function setupProductSearch() {

    const searchInput = document.getElementById("search");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const searchTerm = this.value
            .toLowerCase()
            .trim();

        const products =
            document.querySelectorAll(".product-card");

        products.forEach(function (product) {

            const productText =
                product.textContent.toLowerCase();

            product.style.display =
                productText.includes(searchTerm)
                    ? ""
                    : "none";

        });

    });

}


// ==========================================
// CART
// ==========================================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("4ljtekCart")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "4ljtekCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// ADD TO CART BUTTONS
// ==========================================

function setupAddToCartButtons() {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        if (
            product.querySelector(".add-cart-btn")
        ) {
            return;
        }

        const nameElement =
            product.querySelector("h3");

        if (!nameElement) {
            return;
        }

        const productName =
            nameElement.textContent.trim();

        const actions =
            product.querySelector(".product-actions");

        if (!actions) {
            return;
        }

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "add-cart-btn";

        button.textContent = "Add to Cart";

        button.addEventListener(
            "click",
            function () {

                addToCart(productName);

            }
        );

        actions.insertBefore(
            button,
            actions.firstChild
        );

    });

}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productName) {

    const cart = getCart();

    const existingProduct =
        cart.find(
            item => item.name === productName
        );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: productName,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    alert(
        productName +
        " has been added to your cart."
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );

    cartLinks.forEach(function (link) {

        link.textContent =
            totalItems > 0
                ? "Cart (" + totalItems + ")"
                : "Cart";

    });

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    const cartSummary =
        document.getElementById("cart-summary");

    const emptyCart =
        document.getElementById("empty-cart");

    if (!cartContainer) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (cartSummary) {
            cartSummary.style.display = "none";
        }

        return;

    }

    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    if (cartSummary) {
        cartSummary.style.display = "block";
    }

    cartContainer.innerHTML = "";

    cart.forEach(function (item, index) {

        const itemDiv =
            document.createElement("div");

        itemDiv.style.padding = "20px";
        itemDiv.style.marginBottom = "15px";
        itemDiv.style.borderRadius = "15px";
        itemDiv.style.background = "#f5f5f5";

        itemDiv.innerHTML = `

            <h3>${item.name}</h3>

            <p>
                Quantity:
                <strong>${item.quantity}</strong>
            </p>

            <button
                type="button"
                class="remove-cart-btn"
                data-index="${index}"
                style="
                    padding:10px 15px;
                    border:0;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Remove
            </button>

        `;

        cartContainer.appendChild(itemDiv);

    });


    const count =
        document.getElementById("cart-count");

    if (count) {

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );

        count.textContent = totalItems;

    }


    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-btn"
        );

    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );

                removeFromCart(index);

            }
        );

    });

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ==========================================
// CLEAR CART
// ==========================================

function setupClearCart() {

    const button =
        document.getElementById("clear-cart");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "4ljtekCart"
            );

            displayCart();

            updateCartCount();

        }
    );

}


// ==========================================
// CART WHATSAPP
// ==========================================

function setupCartWhatsApp() {

    const button =
        document.getElementById("cart-whatsapp");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            const cart = getCart();

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }

            let message =
                "Hi 4LJTek, I'd like to order:%0A%0A";

            cart.forEach(function (item) {

                message +=
                    "• " +
                    item.name +
                    " x" +
                    item.quantity +
                    "%0A";

            });

            message +=
                "%0APlease share the total price and availability.";

            const url =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                message;

            window.location.href = url;

        }
    );

}


// ==========================================
// CART CALL
// ==========================================

function setupCartCall() {

    const button =
        document.getElementById("cart-call");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            window.location.href =
                "tel:+254101984723";

        }
    );

}


// ==========================================
// EXISTING WHATSAPP BUTTONS
// ==========================================

function setupWhatsAppButtons() {

    const buttons =
        document.querySelectorAll(
            ".product-card .whatsapp-btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const card =
                    button.closest(".product-card");

                if (!card) {
                    return;
                }

                const name =
                    card.querySelector("h3");

                if (!name) {
                    return;
                }

                const productName =
                    name.textContent.trim();

                const message =
                    "Hi 4LJTek, I'm interested in the " +
                    productName +
                    ". Please share the price and availability.";

                const url =
                    "https://api.whatsapp.com/send?phone=" +
                    WHATSAPP_NUMBER +
                    "&text=" +
                    encodeURIComponent(message);

                window.location.href = url;

            }
        );

    });

}


// ==========================================
// HOMEPAGE WHATSAPP
// ==========================================

function setupHomeWhatsApp() {

    const button =
        document.getElementById(
            "home-whatsapp"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const message =
                "Hi 4LJTek, I'd like to order from your store.";

            const url =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                encodeURIComponent(message);

            window.location.href = url;

        }
    );

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

        link.addEventListener(
            "click",
            function (event) {

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

            }
        );

    });

}


// ==========================================
// START WEBSITE
// ==========================================

function start4LJTek() {

    setupProductSearch();

    setupAddToCartButtons();

    setupWhatsAppButtons();

    setupHomeWhatsApp();

    setupCategoryNavigation();

    displayCart();

    updateCartCount();

    setupClearCart();

    setupCartWhatsApp();

    setupCartCall();

}


// ==========================================
// RUN
// ==========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        start4LJTek
    );

} else {

    start4LJTek();

}
