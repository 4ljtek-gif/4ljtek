/* =========================================================
   4LJTEK - MAIN JAVASCRIPT
   ========================================================= */

const WHATSAPP_NUMBER = "254101984723";
const CART_KEY = "4ljtekCart";


/* =========================================================
   PRODUCT PRICES
   ========================================================= */

const PRODUCT_PRICES = {

    /* =========================
       APPLE
    ========================= */

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
    ========================= */

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
    ========================= */

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
    ========================= */

    "PlayStation 5": 85000,

    "PlayStation 5 Digital Edition": 90000,

    "PS5 Slim": 95000,

    "PlayStation 5 Pro": 145000,

    "DualSense Wireless Controller": 10500

};


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        isNaN(price)
    ) {

        return "Contact for Price";

    }

    return "KSh " +
        Number(price).toLocaleString("en-KE");

}


/* =========================================================
   GET CART
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


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   GET PRODUCT PRICE
   ========================================================= */

function getProductPrice(
    productName,
    storage
) {

    const product =
        PRODUCT_PRICES[productName];

    if (!product) {

        return null;

    }


    /* Products without storage */

    if (
        typeof product === "number"
    ) {

        return product;

    }


    /* Products with storage */

    if (!storage) {

        return null;

    }

    return product[storage] ?? null;

}


/* =========================================================
   UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = getCart();

    const total =
        cart.reduce(
            function(sum, item) {

                return sum + item.quantity;

            },
            0
        );


    document
        .querySelectorAll(
            'a[href="cart.html"]'
        )
        .forEach(
            function(link) {

                link.textContent =
                    total > 0
                        ? "Cart (" + total + ")"
                        : "Cart";

            }
        );

}


/* =========================================================
   GET SELECTED STORAGE
   ========================================================= */

function getSelectedStorage(card) {

    const select =
        card.querySelector(
            ".storage-select"
        );

    if (!select) {

        return "";

    }

    return select.value;

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(
    productName,
    storage
) {

    const cart = getCart();

    const fullName =
        storage
            ? productName +
              " — " +
              storage
            : productName;


    const existing =
        cart.find(
            function(item) {

                return item.name === fullName;

            }
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: fullName,

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


/* =========================================================
   PRODUCT PRICES
   Creates price elements because the current
   products.html cards do not contain them.
   ========================================================= */

function setupProductPrices() {

    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            function(card) {

                const nameElement =
                    card.querySelector("h3");

                const select =
                    card.querySelector(
                        ".storage-select"
                    );

                const actions =
                    card.querySelector(
                        ".product-actions"
                    );


                if (
                    !nameElement ||
                    !actions
                ) {

                    return;

                }


                const productName =
                    nameElement.textContent.trim();


                /*
                 * Do not add prices to TVs
                 * or products not in the
                 * price list.
                 */

                if (
                    !Object.prototype.hasOwnProperty.call(
                        PRODUCT_PRICES,
                        productName
                    )
                ) {

                    return;

                }


                /* Find existing price */

                let priceElement =
                    card.querySelector(
                        ".price"
                    );


                /*
                 * Create price element
                 * if it doesn't exist.
                 */

                if (!priceElement) {

                    priceElement =
                        document.createElement(
                            "p"
                        );

                    priceElement.className =
                        "price";


                    priceElement.style.margin =
                        "0 0 14px";

                    priceElement.style.fontWeight =
                        "800";

                    priceElement.style.fontSize =
                        "17px";

                    priceElement.style.lineHeight =
                        "1.4";

                    priceElement.style.color =
                        "#111";


                    /*
                     * Phones:
                     * Put price directly before
                     * storage selector.
                     */

                    if (select) {

                        const storageLabel =
                            card.querySelector(
                                ".storage-label"
                            );


                        if (
                            storageLabel &&
                            storageLabel.parentNode
                        ) {

                            storageLabel.parentNode.insertBefore(
                                priceElement,
                                storageLabel
                            );

                        } else {

                            select.parentNode.insertBefore(
                                priceElement,
                                select
                            );

                        }

                    } else {

                        /*
                         * PlayStation:
                         * Put price before buttons.
                         */

                        actions.parentNode.insertBefore(
                            priceElement,
                            actions
                        );

                    }

                }


                /* Update price */

                function updatePrice() {

                    const storage =
                        select
                            ? select.value
                            : "";


                    const price =
                        getProductPrice(
                            productName,
                            storage
                        );


                    priceElement.textContent =
                        formatPrice(price);

                }


                /*
                 * Change price when
                 * storage changes.
                 */

                if (select) {

                    select.addEventListener(
                        "change",
                        updatePrice
                    );

                }


                /* Initial price */

                updatePrice();

            }
        );

}


/* =========================================================
   ADD TO CART BUTTONS
   ========================================================= */

function setupAddToCartButtons() {

    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            function(card) {

                const actions =
                    card.querySelector(
                        ".product-actions"
                    );

                const name =
                    card.querySelector("h3");


                if (
                    !actions ||
                    !name
                ) {

                    return;

                }


                /*
                 * Don't create duplicate
                 * Add to Cart buttons.
                 */

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


                button.type =
                    "button";

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
                            getSelectedStorage(
                                card
                            );


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

            }
        );

}


/* =========================================================
   PRODUCT SEARCH
   ========================================================= */

function setupProductSearch() {

    const search =
        document.getElementById(
            "search"
        );


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
                .querySelectorAll(
                    ".product-card"
                )
                .forEach(
                    function(card) {

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

                    }
                );

        }
    );

}


/* =========================================================
   PRODUCT WHATSAPP BUTTONS
   ========================================================= */

function setupWhatsAppButtons() {

    document
        .querySelectorAll(
            ".product-card .whatsapp-btn"
        )
        .forEach(
            function(button) {

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
                            card.querySelector(
                                "h3"
                            );


                        if (!name) {

                            return;

                        }


                        const productName =
                            name.textContent.trim();


                        const storage =
                            getSelectedStorage(
                                card
                            );


                        let message =
                            "Hi 4LJTek, I'm interested in the " +
                            productName;


                        if (storage) {

                            message +=
                                " — " +
                                storage;

                        }


                        message +=
                            ". Please share the price and availability.";


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
        );

}


/* =========================================================
   HOMEPAGE WHATSAPP
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
                encodeURIComponent(
                    message
                );


            window.location.href =
                url;

        }
    );

}


/* =========================================================
   EXTRACT PRODUCT NAME + STORAGE
   ========================================================= */

function getCartProductDetails(
    itemName
) {

    let productName =
        itemName;

    let storage =
        "";


    if (
        itemName.includes(" — ")
    ) {

        const parts =
            itemName.split(" — ");


        productName =
            parts[0].trim();


        storage =
            parts
                .slice(1)
                .join(" — ")
                .trim();

    }


    return {
        productName,
        storage
    };

}


/* =========================================================
   CART TOTAL
   ========================================================= */

function calculateCartTotal(cart) {

    let total =
        0;


    cart.forEach(
        function(item) {

            const details =
                getCartProductDetails(
                    item.name
                );


            const price =
                getProductPrice(
                    details.productName,
                    details.storage
                );


            if (
                price !== null &&
                price !== undefined
            ) {

                total +=
                    price *
                    item.quantity;

            }

        }
    );


    return total;

}


/* =========================================================
   UPDATE CART SUMMARY
   ========================================================= */

function updateCartSummary(
    totalItems,
    totalPrice
) {

    const summary =
        document.getElementById(
            "cart-summary"
        );


    if (!summary) {

        return;

    }


    /*
     * Remove any total previously
     * generated by this script.
     */

    const oldGenerated =
        summary.querySelector(
            "#cart-total-price"
        );


    if (oldGenerated) {

        oldGenerated.remove();

    }


    /*
     * Look for an existing
     * "Contact for Price" element.
     */

    let totalElement =
        null;


    const descendants =
        summary.querySelectorAll("*");


    descendants.forEach(
        function(element) {

            if (totalElement) {

                return;

            }


            const text =
                element.textContent
                    .trim();


            if (
                text ===
                "Total: Contact for Price"
            ) {

                totalElement =
                    element;

            }

        }
    );


    /*
     * If found, replace it.
     */

    if (totalElement) {

        totalElement.textContent =
            "Total: " +
            formatPrice(totalPrice);

    }


    /*
     * Handle separate
     * "Contact for Price"
     * element.
     */

    if (!totalElement) {

        descendants.forEach(
            function(element) {

                if (totalElement) {

                    return;

                }


                if (
                    element.textContent
                        .trim() ===
                    "Contact for Price"
                ) {

                    const parent =
                        element.parentElement;


                    if (
                        parent &&
                        parent.textContent
                            .toLowerCase()
                            .includes(
                                "total"
                            )
                    ) {

                        element.textContent =
                            formatPrice(
                                totalPrice
                            );


                        totalElement =
                            element;

                    }

                }

            }
        );

    }


    /*
     * If the old static total
     * cannot be found, create
     * one clean total.
     */

    if (!totalElement) {

        const newTotal =
            document.createElement(
                "div"
            );


        newTotal.id =
            "cart-total-price";


        newTotal.style.marginTop =
            "12px";


        newTotal.style.fontWeight =
            "800";


        newTotal.style.fontSize =
            "18px";


        newTotal.textContent =
            "Total: " +
            formatPrice(totalPrice);


        summary.appendChild(
            newTotal
        );

    }


    /*
     * Update Items count
     * without destroying the
     * rest of the summary.
     */

    descendants.forEach(
        function(element) {

            const text =
                element.textContent
                    .trim();


            if (
                text === "Items: 2" ||
                /^Items:\s*\d+$/.test(
                    text
                )
            ) {

                element.textContent =
                    "Items: " +
                    totalItems;

            }

        }
    );

}


/* =========================================================
   DISPLAY CART
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


    const cart =
        getCart();


    /* =========================
       EMPTY CART
    ========================= */

    if (
        cart.length === 0
    ) {

        if (empty) {

            empty.style.display =
                "block";

        }


        if (summary) {

            summary.style.display =
                "none";

        }


        container.innerHTML =
            "";


        return;

    }


    /* =========================
       CART HAS PRODUCTS
    ========================= */

    if (empty) {

        empty.style.display =
            "none";

    }


    if (summary) {

        summary.style.display =
            "block";

    }


    container.innerHTML =
        "";


    let totalItems =
        0;


    let totalPrice =
        0;


    cart.forEach(
        function(item, index) {

            totalItems +=
                item.quantity;


            const details =
                getCartProductDetails(
                    item.name
                );


            const unitPrice =
                getProductPrice(
                    details.productName,
                    details.storage
                );


            if (
                unitPrice !== null &&
                unitPrice !== undefined
            ) {

                totalPrice +=
                    unitPrice *
                    item.quantity;

            }


            const div =
                document.createElement(
                    "div"
                );


            div.style.marginBottom =
                "25px";


            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p
                    class="cart-item-price"
                    style="
                        margin:8px 0;
                        font-weight:700;
                        color:#111;
                    "
                >
                    ${formatPrice(unitPrice)}
                </p>

                <div
                    style="
                        display:flex;
                        align-items:center;
                        gap:12px;
                        margin:15px 0;
                    "
                >

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


                    <strong
                        style="
                            min-width:30px;
                            text-align:center;
                            font-size:20px;
                        "
                    >
                        ${item.quantity}
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
                    "
                >
                    Remove
                </button>

            `;


            container.appendChild(
                div
            );

        }
    );


    /*
     * Update order summary.
     */

    updateCartSummary(
        totalItems,
        totalPrice
    );


    /* =========================
       PLUS / MINUS
    ========================= */

    document
        .querySelectorAll(
            ".quantity-btn"
        )
        .forEach(
            function(button) {

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


                        if (
                            !cart[index]
                        ) {

                            return;

                        }


                        if (
                            action ===
                            "plus"
                        ) {

                            cart[index]
                                .quantity++;

                        }


                        if (
                            action ===
                            "minus"
                        ) {

                            cart[index]
                                .quantity--;


                            if (
                                cart[index]
                                    .quantity <= 0
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

            }
        );


    /* =========================
       REMOVE
    ========================= */

    document
        .querySelectorAll(
            ".remove-cart-btn"
        )
        .forEach(
            function(button) {

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

            }
        );


    /* =========================
       CART COUNT
    ========================= */

    const count =
        document.getElementById(
            "cart-count"
        );


    if (count) {

        count.textContent =
            totalItems;

    }

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


            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            let message =
                "Hi 4LJTek, I'd like to order:%0A%0A";


            let totalPrice =
                0;


            cart.forEach(
                function(item) {

                    const details =
                        getCartProductDetails(
                            item.name
                        );


                    const price =
                        getProductPrice(
                            details.productName,
                            details.storage
                        );


                    if (
                        price !== null &&
                        price !== undefined
                    ) {

                        totalPrice +=
                            price *
                            item.quantity;

                    }


                    message +=
                        "• " +
                        item.name +
                        " x" +
                        item.quantity +
                        " — " +
                        formatPrice(price) +
                        "%0A";

                }
            );


            message +=
                "%0ATotal: " +
                formatPrice(
                    totalPrice
                );


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

    /*
     * Prevent duplicate menu.
     */

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
        header.querySelector(
            "nav"
        );


    if (!nav) {

        return;

    }


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


    nav.querySelectorAll("a")
        .forEach(
            function(link) {

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

            }
        );

}


/* =========================================================
   START 4LJTEK
   ========================================================= */

function start4LJTek() {

    setupMobileMenu();

    setupProductSearch();

    setupProductPrices();

    setupAddToCartButtons();

    setupWhatsAppButtons();

    setupHomeWhatsApp();

    displayCart();

    updateCartCount();

    setupClearCart();

    setupCartWhatsApp();

    setupCartCall();

}


/* =========================================================
   START SCRIPT
   ========================================================= */

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
