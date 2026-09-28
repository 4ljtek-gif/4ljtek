// ==========================================
// 4LJTEK WEBSITE JAVASCRIPT
// PRICES + CART + WHATSAPP + SEARCH + MENU
// ==========================================

const WHATSAPP_NUMBER = "254101984723";
const CART_KEY = "4ljtekCart";


// ==========================================
// PRODUCT PRICES
// ==========================================

const PRODUCT_PRICES = {

    // =========================
    // APPLE IPHONE
    // =========================

    "iPhone 17": {
        "256GB": 116000,
        "512GB": 140000
    },

    "iPhone 17 Air": {
        "256GB": 120000,
        "512GB": 145000,
        "1TB": 180000
    },

    "iPhone 17 Pro": {
        "256GB": 160000,
        "512GB": 180000,
        "1TB": 210000
    },

    "iPhone 17 Pro Max": {
        "256GB": 170000,
        "512GB": 190000,
        "1TB": 230000,
        "2TB": null
    },

    "iPhone 18 Pro": {
        "256GB": 207000,
        "512GB": 240000,
        "1TB": null,
        "2TB": null
    },

    "iPhone 18 Pro Max": {
        "256GB": 250000,
        "512GB": 270000,
        "1TB": 333000,
        "2TB": 385000
    },


    // =========================
    // SAMSUNG
    // =========================

    "Samsung Galaxy S25": {
        "128GB": 80000,
        "256GB": 88000,
        "512GB": 105000
    },

    "Samsung Galaxy S25+": {
        "256GB": 98000,
        "512GB": 118000
    },

    "Samsung Galaxy S25 Ultra": {
        "256GB": 115000,
        "512GB": 130000,
        "1TB": 168000
    },

    "Samsung Galaxy S26": {
        "256GB": 99000,
        "512GB": 120000
    },

    "Samsung Galaxy S26+": {
        "256GB": 115000,
        "512GB": 135000
    },

    "Samsung Galaxy S26 Ultra": {
        "256GB": 125000,
        "512GB": 155000,
        "1TB": 185000
    },


    // =========================
    // GOOGLE PIXEL
    // =========================

    "Google Pixel 10": {
        "128GB": 82000,
        "256GB": 88000
    },

    "Google Pixel 10 Pro": {
        "128GB": 125000,
        "256GB": 133000,
        "512GB": 146000,
        "1TB": 175000
    },

    "Google Pixel 10 Pro XL": {
        "256GB": 145000,
        "512GB": 152000,
        "1TB": 175000
    },

    "Google Pixel 10 Pro Fold": {
        "256GB": 165000,
        "512GB": 180000,
        "1TB": 200000
    },

    "Google Pixel 11": {
        "256GB": 100000,
        "512GB": 115000
    },

    "Google Pixel 11 Pro": {
        "256GB": 140000,
        "512GB": 160000,
        "1TB": 185000
    },

    "Google Pixel 11 Pro XL": {
        "256GB": 170000,
        "512GB": 185000,
        "1TB": 210000
    },

    "Google Pixel 11 Pro Fold": {
        "256GB": 210000,
        "512GB": null,
        "1TB": null
    },


    // =========================
    // PLAYSTATION
    // =========================

    "PlayStation 5": 85000,

    "PlayStation 5 Digital Edition": 90000,

    "PS5 Slim": 95000,

    "PlayStation 5 Pro": 145000,

    "DualSense Wireless Controller": 10500
};


// ==========================================
// CART
// ==========================================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch (error) {

        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        price === ""
    ) {

        return "Contact for Price";
    }

    return "KSh " +
        Number(price).toLocaleString("en-KE");
}


// ==========================================
// PRODUCT NAME HELPERS
// ==========================================

function normalizeStorage(storage) {

    if (!storage) return "";

    return storage
        .replace(/\s+/g, "")
        .toUpperCase();
}


function getBaseProductName(name) {

    if (!name) return "";

    return name
        .split(" — ")[0]
        .trim();
}


function getStorageFromName(name) {

    if (!name) return "";

    const match = name.match(
        /(128GB|256GB|512GB|1TB|2TB)/i
    );

    return match
        ? normalizeStorage(match[1])
        : "";
}


// ==========================================
// GET PRODUCT PRICE
// ==========================================

function getProductPrice(productName, storage) {

    const product = PRODUCT_PRICES[productName];

    if (!product) {

        return null;
    }

    // Product without storage
    if (
        typeof product === "number"
    ) {

        return product;
    }

    const selectedStorage =
        normalizeStorage(storage);

    if (
        Object.prototype.hasOwnProperty.call(
            product,
            selectedStorage
        )
    ) {

        return product[selectedStorage];
    }

    return null;
}


// ==========================================
// SELECTED STORAGE
// ==========================================

function getSelectedStorage(card) {

    const select =
        card.querySelector(".storage-select");

    if (!select) {

        return "";
    }

    return normalizeStorage(select.value);
}


// ==========================================
// PRODUCT PRICE DISPLAY
// ==========================================

function injectPriceStyles() {

    if (
        document.getElementById(
            "fourljtek-price-styles"
        )
    ) {

        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "fourljtek-price-styles";

    style.textContent = `

        .product-price {
            margin: 8px 0 12px;
            font-size: 17px;
            font-weight: 800;
            letter-spacing: -0.2px;
        }

        .product-price-label {
            font-size: 11px;
            font-weight: 600;
            opacity: 0.65;
            display: block;
            margin-bottom: 2px;
        }

        .product-price-value {
            font-size: 19px;
            font-weight: 800;
        }

        .cart-item-price {
            margin-top: 6px;
            font-weight: 700;
        }

        .cart-item-total {
            margin-top: 8px;
            font-weight: 800;
        }

    `;

    document.head.appendChild(style);
}


function renderProductPrice(card) {

    if (!card) return;

    const nameElement =
        card.querySelector("h3");

    if (!nameElement) return;

    const productName =
        nameElement.textContent.trim();

    const storage =
        getSelectedStorage(card);

    const price =
        getProductPrice(
            productName,
            storage
        );

    let priceElement =
        card.querySelector(".product-price");

    if (!priceElement) {

        priceElement =
            document.createElement("div");

        priceElement.className =
            "product-price";

        nameElement.insertAdjacentElement(
            "afterend",
            priceElement
        );
    }

    priceElement.innerHTML = `

        <span class="product-price-label">
            Price
        </span>

        <span class="product-price-value">
            ${formatPrice(price)}
        </span>

    `;
}


function setupProductPrices() {

    injectPriceStyles();

    document
        .querySelectorAll(".product-card")
        .forEach(function(card) {

            renderProductPrice(card);

            const select =
                card.querySelector(
                    ".storage-select"
                );

            if (!select) return;

            select.addEventListener(
                "change",
                function() {

                    renderProductPrice(card);
                }
            );
        });
}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();

    const total =
        cart.reduce(
            function(sum, item) {

                return sum +
                    Number(item.quantity || 0);

            },
            0
        );

    document
        .querySelectorAll(
            'a[href="cart.html"]'
        )
        .forEach(function(link) {

            link.textContent =
                total > 0
                    ? "Cart (" + total + ")"
                    : "Cart";
        });
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(
    productName,
    storage
) {

    const cart = getCart();

    const price =
        getProductPrice(
            productName,
            storage
        );

    const fullName =
        storage
            ? productName +
              " — " +
              storage
            : productName;

    const existing =
        cart.find(function(item) {

            return item.name === fullName;
        });

    if (existing) {

        existing.quantity++;

        if (
            existing.price === undefined
        ) {

            existing.price = price;
        }

    } else {

        cart.push({

            name: fullName,

            productName:
                productName,

            storage:
                storage || "",

            price:
                price,

            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    alert(
        fullName +
        " has been added to your cart."
    );
}


// ==========================================
// ADD TO CART BUTTONS
// ==========================================

function setupAddToCartButtons() {

    const products =
        document.querySelectorAll(
            ".product-card"
        );

    products.forEach(function(card) {

        const actions =
            card.querySelector(
                ".product-actions"
            );

        const name =
            card.querySelector("h3");

        if (!actions || !name) {

            return;
        }

        if (
            actions.querySelector(
                ".add-cart-btn"
            )
        ) {

            return;
        }

        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.className =
            "add-cart-btn";

        button.textContent =
            "Add to Cart";

        button.addEventListener(
            "click",
            function() {

                const productName =
                    name.textContent.trim();

                const storage =
                    getSelectedStorage(card);

                addToCart(
                    productName,
                    storage
                );
            }
        );

        actions.insertBefore(
            button,
            actions.firstChild
        );
    });
}


// ==========================================
// PRODUCT SEARCH
// ==========================================

function setupProductSearch() {

    const search =
        document.getElementById(
            "search"
        );

    if (!search) return;

    search.addEventListener(
        "input",
        function() {

            const term =
                search.value
                    .toLowerCase()
                    .trim();

            document
                .querySelectorAll(
                    ".product-card"
                )
                .forEach(function(card) {

                    const text =
                        card.textContent
                            .toLowerCase();

                    if (
                        text.includes(term)
                    ) {

                        card.classList.remove(
                            "hidden-product"
                        );

                    } else {

                        card.classList.add(
                            "hidden-product"
                        );
                    }
                });
        }
    );
}


// ==========================================
// WHATSAPP PRODUCT BUTTONS
// ==========================================

function setupWhatsAppButtons() {

    document
        .querySelectorAll(
            ".product-card .whatsapp-btn"
        )
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    const card =
                        button.closest(
                            ".product-card"
                        );

                    if (!card) return;

                    const name =
                        card.querySelector(
                            "h3"
                        );

                    if (!name) return;

                    const productName =
                        name.textContent.trim();

                    const storage =
                        getSelectedStorage(
                            card
                        );

                    const price =
                        getProductPrice(
                            productName,
                            storage
                        );

                    let message =
                        "Hi 4LJTek, I'm interested in the " +
                        productName;

                    if (storage) {

                        message +=
                            " — " +
                            storage;
                    }

                    if (price !== null) {

                        message +=
                            " — " +
                            formatPrice(price);
                    }

                    message +=
                        ". Please confirm availability.";

                    const url =
                        "https://api.whatsapp.com/send?phone=" +
                        WHATSAPP_NUMBER +
                        "&text=" +
                        encodeURIComponent(
                            message
                        );

                    window.location.href =
                        url;
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

    if (!button) return;

    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const message =
                "Hi 4LJTek, I'd like to order from your store.";

            const url =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                encodeURIComponent(
                    message
                );

            window.location.href =
                url;
        }
    );
}


// ==========================================
// CART ITEM PRICE
// ==========================================

function getCartItemPrice(item) {

    if (
        item.price !== undefined &&
        item.price !== null
    ) {

        return item.price;
    }

    const productName =
        item.productName ||
        getBaseProductName(
            item.name
        );

    const storage =
        item.storage ||
        getStorageFromName(
            item.name
        );

    return getProductPrice(
        productName,
        storage
    );
}


// ==========================================
// CART DISPLAY
// ==========================================

function displayCart() {

    const container =
        document.getElementById(
            "cart-items"
        );

    if (!container) return;

    const summary =
        document.getElementById(
            "cart-summary"
        );

    const empty =
        document.getElementById(
            "empty-cart"
        );

    const cart =
        getCart();

    if (cart.length === 0) {

        if (empty) {

            empty.style.display =
                "block";
        }

        if (summary) {

            summary.style.display =
                "none";
        }

        container.innerHTML = "";

        return;
    }

    if (empty) {

        empty.style.display =
            "none";
    }

    if (summary) {

        summary.style.display =
            "block";
    }

    container.innerHTML = "";

    let cartTotal = 0;

    cart.forEach(function(item, index) {

        const div =
            document.createElement(
                "div"
            );

        const price =
            getCartItemPrice(item);

        const quantity =
            Number(
                item.quantity || 1
            );

        const lineTotal =
            price !== null
                ? price * quantity
                : null;

        if (
            lineTotal !== null
        ) {

            cartTotal +=
                lineTotal;
        }

        div.innerHTML = `

            <h3>
                ${item.name}
            </h3>

            <div class="cart-item-price">
                ${
                    price !== null
                        ? formatPrice(price) +
                          " each"
                        : "Contact for Price"
                }
            </div>

            <div style="
                display:flex;
                align-items:center;
                gap:12px;
                margin:15px 0;
            ">

                <button
                    type="button"
                    class="quantity-btn"
                    data-index="${index}"
                    data-action="minus"
                    style="
                        width:45px;
                        height:45px;
                        border:1px solid #ccc;
                        border-radius:10px;
                        background:#fff;
                        font-size:24px;
                        cursor:pointer;
                    "
                >
                    −
                </button>

                <strong style="
                    min-width:30px;
                    text-align:center;
                    font-size:20px;
                ">
                    ${quantity}
                </strong>

                <button
                    type="button"
                    class="quantity-btn"
                    data-index="${index}"
                    data-action="plus"
                    style="
                        width:45px;
                        height:45px;
                        border:1px solid #ccc;
                        border-radius:10px;
                        background:#fff;
                        font-size:24px;
                        cursor:pointer;
                    "
                >
                    +
                </button>

            </div>

            ${
                lineTotal !== null
                    ? `
                    <div class="cart-item-total">
                        Total:
                        ${formatPrice(lineTotal)}
                    </div>
                    `
                    : ""
            }

            <button
                type="button"
                class="remove-cart-btn"
                data-index="${index}"
                style="
                    padding:11px 18px;
                    border:0;
                    border-radius:10px;
                    background:#111;
                    color:#fff;
                    cursor:pointer;
                    font-family:inherit;
                    font-weight:600;
                    margin-top:12px;
                "
            >
                Remove
            </button>

        `;

        container.appendChild(div);
    });


    // ======================================
    // QUANTITY BUTTONS
    // ======================================

    document
        .querySelectorAll(
            ".quantity-btn"
        )
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const action =
                        button.dataset.action;

                    const cart =
                        getCart();

                    if (!cart[index]) return;

                    if (
                        action === "plus"
                    ) {

                        cart[index].quantity++;
                    }

                    if (
                        action === "minus"
                    ) {

                        cart[index].quantity--;

                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );
                        }
                    }

                    saveCart(cart);

                    displayCart();

                    updateCartCount();
                }
            );
        });


    // ======================================
    // REMOVE BUTTONS
    // ======================================

    document
        .querySelectorAll(
            ".remove-cart-btn"
        )
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const cart =
                        getCart();

                    cart.splice(
                        index,
                        1
                    );

                    saveCart(cart);

                    displayCart();

                    updateCartCount();
                }
            );
        });


    // ======================================
    // CART COUNT
    // ======================================

    const count =
        document.getElementById(
            "cart-count"
        );

    if (count) {

        const total =
            cart.reduce(
                function(sum, item) {

                    return sum +
                        Number(
                            item.quantity || 0
                        );

                },
                0
            );

        count.textContent =
            total;
    }


    // ======================================
    // CART TOTAL
    // ======================================

    const totalPrice =
        document.getElementById(
            "cart-total-price"
        );

    if (totalPrice) {

        totalPrice.textContent =
            cartTotal > 0
                ? formatPrice(cartTotal)
                : "Contact for Price";
    }
}


// ==========================================
// CLEAR CART
// ==========================================

function setupClearCart() {

    const button =
        document.getElementById(
            "clear-cart"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                CART_KEY
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
        document.getElementById(
            "cart-whatsapp"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        function() {

            const cart =
                getCart();

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }

            let message =
                "Hi 4LJTek, I'd like to order:%0A%0A";

            cart.forEach(function(item) {

                const price =
                    getCartItemPrice(
                        item
                    );

                message +=
                    "• " +
                    item.name +
                    " x" +
                    item.quantity;

                if (
                    price !== null
                ) {

                    message +=
                        " — " +
                        formatPrice(
                            price
                        );
                }

                message +=
                    "%0A";
            });

            message +=
                "%0APlease confirm availability and delivery details.";

            window.location.href =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                message;
        }
    );
}


// ==========================================
// CART CALL
// ==========================================

function setupCartCall() {

    const button =
        document.getElementById(
            "cart-call"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        function() {

            window.location.href =
                "tel:+254101984723";
        }
    );
}


// ==========================================
// MOBILE MENU
// ==========================================

function setupMobileMenu() {

    if (
        document.querySelector(
            ".mobile-menu-btn"
        )
    ) {

        return;
    }

    const header =
        document.querySelector(
            "header, .site-header"
        );

    if (!header) return;

    const nav =
        header.querySelector(
            "nav"
        );

    if (!nav) return;

    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.className =
        "mobile-menu-btn";

    button.setAttribute(
        "aria-label",
        "Open menu"
    );

    button.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    header.appendChild(
        button
    );

    button.addEventListener(
        "click",
        function() {

            nav.classList.toggle(
                "mobile-nav-open"
            );

            button.classList.toggle(
                "menu-open"
            );
        }
    );

    nav.querySelectorAll(
        "a"
    ).forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                nav.classList.remove(
                    "mobile-nav-open"
                );

                button.classList.remove(
                    "menu-open"
                );
            }
        );
    });
}


// ==========================================
// START 4LJTEK
// ==========================================

function start4LJTek() {

    setupMobileMenu();

    setupProductPrices();

    setupProductSearch();

    setupAddToCartButtons();

    setupWhatsAppButtons();

    setupHomeWhatsApp();

    displayCart();

    updateCartCount();

    setupClearCart();

    setupCartWhatsApp();

    setupCartCall();
}


// ==========================================
// DOM READY
// ==========================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        start4LJTek
    );

} else {

    start4LJTek();
}
