/* =========================================================
   4LJTEK - COMPLETE WEBSITE JAVASCRIPT
   PRICE + STORAGE + CART + WHATSAPP + MOBILE MENU
   ========================================================= */

const WHATSAPP_NUMBER = "254101984723";
const CART_KEY = "4ljtekCart";


/* =========================================================
   PRODUCT PRICES
   ========================================================= */

const PRODUCT_PRICES = {

    /* =========================
       iPHONE
    ========================== */

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


    /* =========================
       SAMSUNG
    ========================== */

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


    /* =========================
       GOOGLE PIXEL
    ========================== */

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


    /* =========================
       PLAYSTATION
    ========================== */

    "PlayStation 5": 85000,

    "PlayStation 5 Digital Edition": 90000,

    "PS5 Slim": 95000,

    "PlayStation 5 Pro": 145000,

    "DualSense Wireless Controller": 10500

};


/* =========================================================
   CART STORAGE
   ========================================================= */

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


/* =========================================================
   PRICE FUNCTIONS
   ========================================================= */

function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        isNaN(price)
    ) {

        return "Contact for Price";

    }

    return "KSh " + Number(price).toLocaleString("en-KE");

}


function getProductPrice(productName, storage) {

    const product = PRODUCT_PRICES[productName];

    if (!product) {

        return null;

    }


    /* Phone with storage */

    if (
        typeof product === "object" &&
        storage
    ) {

        return product[storage] ?? null;

    }


    /* Product with one fixed price */

    if (
        typeof product === "number"
    ) {

        return product;

    }


    return null;

}


/* =========================================================
   GET PRODUCT NAME + STORAGE
   FROM SAVED CART ITEM
   ========================================================= */

function getCartItemDetails(item) {

    let productName = item.name || "";
    let storage = item.storage || "";


    /*
       New cart format:
       name = "iPhone 17"
       storage = "256GB"
    */

    if (storage) {

        return {
            productName: productName,
            storage: storage
        };

    }


    /*
       Older cart format:
       name = "iPhone 17 — 256GB"
    */

    const match = productName.match(
        /^(.*?)\s+—\s+(128GB|256GB|512GB|1TB|2TB)$/
    );


    if (match) {

        productName = match[1];
        storage = match[2];

    }


    return {
        productName: productName,
        storage: storage
    };

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = getCart();

    const total = cart.reduce(
        function(sum, item) {

            return sum + Number(item.quantity || 0);

        },
        0
    );


    document
        .querySelectorAll('a[href="cart.html"]')
        .forEach(function(link) {

            link.textContent =
                total > 0
                    ? "Cart (" + total + ")"
                    : "Cart";

        });

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(productName, storage) {

    const cart = getCart();

    const existing = cart.find(
        function(item) {

            return (
                item.name === productName &&
                (item.storage || "") === (storage || "")
            );

        }
    );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: productName,

            storage: storage || "",

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    const label =
        storage
            ? productName + " — " + storage
            : productName;


    alert(
        label + " has been added to your cart."
    );

}


/* =========================================================
   STORAGE SELECTOR
   ========================================================= */

function getSelectedStorage(card) {

    const select =
        card.querySelector(".storage-select");


    if (!select) {

        return "";

    }


    return select.value;

}


/* =========================================================
   ADD TO CART BUTTONS
   ========================================================= */

function setupAddToCartButtons() {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(function(card) {

        const actions =
            card.querySelector(".product-actions");

        const name =
            card.querySelector("h3");


        if (!actions || !name) {

            return;

        }


        if (
            actions.querySelector(".add-cart-btn")
        ) {

            return;

        }


        const button =
            document.createElement("button");


        button.type = "button";

        button.className = "add-cart-btn";

        button.textContent = "Add to Cart";


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


/* =========================================================
   PRODUCT SEARCH
   ========================================================= */

function setupProductSearch() {

    const search =
        document.getElementById("search");


    if (!search) {

        return;

    }


    search.addEventListener(
        "input",
        function() {

            const term =
                search.value
                    .toLowerCase()
                    .trim();


            document
                .querySelectorAll(".product-card")
                .forEach(function(card) {

                    const text =
                        card.textContent
                            .toLowerCase();


                    if (text.includes(term)) {

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


/* =========================================================
   WHATSAPP PRODUCT BUTTONS
   ========================================================= */

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


                    const storage =
                        getSelectedStorage(card);


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
                            " — " + storage;

                    }


                    if (price !== null) {

                        message +=
                            ". Price: " +
                            formatPrice(price);

                    }


                    message +=
                        ". Please confirm availability.";


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


/* =========================================================
   HOME WHATSAPP
   ========================================================= */

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
        function(event) {

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


/* =========================================================
   PRODUCT PRICE DISPLAY
   ========================================================= */

function renderProductPrice(card) {

    const name =
        card.querySelector("h3");


    if (!name) {

        return;

    }


    const productName =
        name.textContent.trim();


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


        const info =
            card.querySelector(".product-info");


        const storageSelect =
            card.querySelector(".storage-select");


        if (storageSelect) {

            storageSelect.insertAdjacentElement(
                "afterend",
                priceElement
            );

        } else {

            info.insertBefore(
                priceElement,
                card.querySelector(
                    ".product-actions"
                )
            );

        }

    }


    priceElement.textContent =
        formatPrice(price);

}


function setupProductPrices() {

    document
        .querySelectorAll(".product-card")
        .forEach(function(card) {

            renderProductPrice(card);


            const select =
                card.querySelector(
                    ".storage-select"
                );


            if (select) {

                select.addEventListener(
                    "change",
                    function() {

                        renderProductPrice(card);

                    }
                );

            }

        });

}


/* =========================================================
   CART DISPLAY
   ========================================================= */

function displayCart() {

    const container =
        document.getElementById(
            "cart-items"
        );


    if (!container) {

        return;

    }


    const summary =
        document.getElementById(
            "cart-summary"
        );


    const empty =
        document.getElementById(
            "empty-cart"
        );


    let cart = getCart();


    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (cart.length === 0) {

        if (empty) {

            empty.style.display = "block";

        }


        if (summary) {

            summary.style.display = "none";

        }


        container.innerHTML = "";

        return;

    }


    if (empty) {

        empty.style.display = "none";

    }


    if (summary) {

        summary.style.display = "block";

    }


    container.innerHTML = "";


    let cartTotal = 0;

    let totalItems = 0;


    /* =====================================================
       CART ITEMS
    ===================================================== */

    cart.forEach(
        function(item, index) {

            const details =
                getCartItemDetails(item);


            const productName =
                details.productName;


            const storage =
                details.storage;


            const quantity =
                Number(item.quantity || 1);


            const unitPrice =
                getProductPrice(
                    productName,
                    storage
                );


            const itemTotal =
                unitPrice !== null
                    ? unitPrice * quantity
                    : null;


            if (itemTotal !== null) {

                cartTotal += itemTotal;

            }


            totalItems += quantity;


            /*
               Keep the cart item updated
               with current product data.
            */

            item.name = productName;

            item.storage = storage;

            item.quantity = quantity;


            const div =
                document.createElement("div");


            div.className =
                "cart-item";


            div.style.padding =
                "20px 0";

            div.style.borderBottom =
                "1px solid #eee";


            const displayName =
                storage
                    ? productName +
                      " — " +
                      storage
                    : productName;


            const priceText =
                unitPrice !== null
                    ? formatPrice(unitPrice)
                    : "Contact for Price";


            const totalText =
                itemTotal !== null
                    ? formatPrice(itemTotal)
                    : "Contact for Price";


            div.innerHTML = `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:flex-start;
                    gap:20px;
                    flex-wrap:wrap;
                ">

                    <div>

                        <h3 style="
                            margin:0 0 8px;
                            font-size:18px;
                        ">
                            ${displayName}
                        </h3>

                        <div style="
                            font-size:14px;
                            color:#666;
                            margin-bottom:6px;
                        ">
                            Unit price:
                            <strong style="color:#111;">
                                ${priceText}
                            </strong>
                        </div>

                        <div style="
                            font-size:15px;
                            color:#111;
                        ">
                            Item total:
                            <strong>
                                ${totalText}
                            </strong>
                        </div>

                    </div>


                    <div style="
                        display:flex;
                        align-items:center;
                        gap:10px;
                    ">

                        <button
                            type="button"
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="minus"
                            style="
                                width:42px;
                                height:42px;
                                border:1px solid #ccc;
                                border-radius:10px;
                                background:#fff;
                                font-size:22px;
                                cursor:pointer;
                            "
                        >
                            −
                        </button>


                        <strong style="
                            min-width:28px;
                            text-align:center;
                            font-size:18px;
                        ">
                            ${quantity}
                        </strong>


                        <button
                            type="button"
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="plus"
                            style="
                                width:42px;
                                height:42px;
                                border:1px solid #ccc;
                                border-radius:10px;
                                background:#fff;
                                font-size:22px;
                                cursor:pointer;
                            "
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    class="remove-cart-btn"
                    data-index="${index}"
                    style="
                        margin-top:14px;
                        padding:10px 16px;
                        border:0;
                        border-radius:10px;
                        background:#111;
                        color:#fff;
                        cursor:pointer;
                        font-family:inherit;
                        font-weight:600;
                    "
                >
                    Remove
                </button>

            `;


            container.appendChild(div);

        }
    );


    /*
       Save the normalized cart.
       This also upgrades older cart items.
    */

    saveCart(cart);


    /* =====================================================
       CART COUNT
    ===================================================== */

    const count =
        document.getElementById(
            "cart-count"
        );


    if (count) {

        count.textContent =
            totalItems;

    }


    /* =====================================================
       CART SUMMARY
    ===================================================== */

    let summaryTotal =
        document.getElementById(
            "cart-total-price"
        );


    if (!summaryTotal && summary) {

        summaryTotal =
            document.createElement("div");

        summaryTotal.id =
            "cart-total-price";


        summaryTotal.style.marginTop =
            "20px";

        summaryTotal.style.paddingTop =
            "20px";

        summaryTotal.style.borderTop =
            "1px solid rgba(255,255,255,.2)";

        summaryTotal.style.fontSize =
            "24px";

        summaryTotal.style.fontWeight =
            "800";


        summary.appendChild(
            summaryTotal
        );

    }


    if (summaryTotal) {

        if (cartTotal > 0) {

            summaryTotal.textContent =
                "Total: " +
                formatPrice(cartTotal);

        } else {

            summaryTotal.textContent =
                "Total: Contact for Price";

        }

    }


    /* =====================================================
       QUANTITY BUTTONS
    ===================================================== */

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


                    if (!cart[index]) {

                        return;

                    }


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


    /* =====================================================
       REMOVE BUTTONS
    ===================================================== */

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

}


/* =========================================================
   CLEAR CART
   ========================================================= */

function setupClearCart() {

    const button =
        document.getElementById(
            "clear-cart"
        );


    if (!button) {

        return;

    }


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


/* =========================================================
   CART WHATSAPP
   ========================================================= */

function setupCartWhatsApp() {

    const button =
        document.getElementById(
            "cart-whatsapp"
        );


    if (!button) {

        return;

    }


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


            let total = 0;


            cart.forEach(
                function(item) {

                    const details =
                        getCartItemDetails(
                            item
                        );


                    const productName =
                        details.productName;


                    const storage =
                        details.storage;


                    const quantity =
                        Number(
                            item.quantity || 1
                        );


                    const unitPrice =
                        getProductPrice(
                            productName,
                            storage
                        );


                    const label =
                        storage
                            ? productName +
                              " — " +
                              storage
                            : productName;


                    message +=
                        "• " +
                        label +
                        " x" +
                        quantity;


                    if (
                        unitPrice !== null
                    ) {

                        const itemTotal =
                            unitPrice *
                            quantity;


                        total += itemTotal;


                        message +=
                            " — " +
                            formatPrice(
                                itemTotal
                            );

                    }


                    message +=
                        "%0A";

                }
            );


            if (total > 0) {

                message +=
                    "%0ATotal: " +
                    encodeURIComponent(
                        formatPrice(total)
                    );

            }


            message +=
                "%0A%0APlease confirm availability.";


            window.location.href =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                message;

        }
    );

}


/* =========================================================
   CART CALL
   ========================================================= */

function setupCartCall() {

    const button =
        document.getElementById(
            "cart-call"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        function() {

            window.location.href =
                "tel:+254101984723";

        }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

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


    if (!header) {

        return;

    }


    const nav =
        header.querySelector("nav");


    if (!nav) {

        return;

    }


    const button =
        document.createElement("button");


    button.type = "button";

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


    header.appendChild(button);


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


    nav.querySelectorAll("a")
        .forEach(function(link) {

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


/* =========================================================
   START WEBSITE
   ========================================================= */

function start4LJTek() {

    setupMobileMenu();

    setupProductSearch();

    setupAddToCartButtons();

    setupProductPrices();

    setupWhatsAppButtons();

    setupHomeWhatsApp();

    displayCart();

    updateCartCount();

    setupClearCart();

    setupCartWhatsApp();

    setupCartCall();

}


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
