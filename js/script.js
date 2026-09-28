/* =========================================================
   4LJTEK - COMPLETE STORE JAVASCRIPT
   ========================================================= */

const WHATSAPP_NUMBER = "254101984723";
const CART_KEY = "4ljtekCart";


/* =========================================================
   PRODUCT PRICES
   ========================================================= */

const PRODUCT_PRICES = {

    /* APPLE */

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


    /* SAMSUNG */

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


    /* GOOGLE PIXEL */

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


    /* PLAYSTATION */

    "PlayStation 5": 85000,

    "PlayStation 5 Digital Edition": 90000,

    "PS5 Slim": 95000,

    "PlayStation 5 Pro": 145000,

    "DualSense Wireless Controller": 10500
};


/* =========================================================
   PRODUCT IMAGES
   ========================================================= */

const PRODUCT_IMAGES = {

    "iPhone 17": "images/iphone17.jpg",
    "iPhone 17 Air": "images/iphone17air.jpg",
    "iPhone 17 Pro": "images/iphone17pro.jpg",
    "iPhone 17 Pro Max": "images/iphone17promax.jpg",

    "iPhone 18 Pro": "images/iphone18pro.jpg",
    "iPhone 18 Pro Max": "images/iphone18promax.jpg",

    "Samsung Galaxy S25": "images/s25.jpg",
    "Samsung Galaxy S25+": "images/s25plus.jpg",
    "Samsung Galaxy S25 Ultra": "images/s25ultra.jpg",

    "Samsung Galaxy S26": "images/s26.jpg",
    "Samsung Galaxy S26+": "images/s26plus.jpg",
    "Samsung Galaxy S26 Ultra": "images/s26ultra.jpg",

    "Google Pixel 10": "images/pixel10.jpg",
    "Google Pixel 10 Pro": "images/pixel10pro.jpg",
    "Google Pixel 10 Pro XL": "images/pixel10proxl.jpg",
    "Google Pixel 10 Pro Fold": "images/pixel10profold.jpg",

    "Google Pixel 11": "images/pixel11.jpg",
    "Google Pixel 11 Pro": "images/pixel11pro.jpg",
    "Google Pixel 11 Pro XL": "images/pixel11proxl.jpg",
    "Google Pixel 11 Pro Fold": "images/pixel11profold.jpg",

    "PlayStation 5": "images/ps5.jpg",
    "PlayStation 5 Digital Edition": "images/ps5digital.jpg",
    "PS5 Slim": "images/ps5slim.jpg",
    "PlayStation 5 Pro": "images/ps5pro.jpg",
    "DualSense Wireless Controller": "images/dualsense.jpg"
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
   CART
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
   PRODUCT DETAILS
   ========================================================= */

function getCartProductDetails(name) {

    let productName = name;
    let storage = "";

    if (name.includes(" — ")) {

        const parts =
            name.split(" — ");

        productName =
            parts[0].trim();

        storage =
            parts.slice(1)
                .join(" — ")
                .trim();
    }

    return {
        productName,
        storage
    };
}


/* =========================================================
   GET PRICE
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

    if (
        typeof product === "number"
    ) {

        return product;

    }

    if (!storage) {

        return null;

    }

    return product[storage] ?? null;
}


/* =========================================================
   CART TOTAL
   ========================================================= */

function calculateCartTotal(cart) {

    let total = 0;

    cart.forEach(function(item) {

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
                price * item.quantity;

        }

    });

    return total;
}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart =
        getCart();

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
   STORAGE
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

    const cart =
        getCart();

    const fullName =
        storage
            ? productName +
              " — " +
              storage
            : productName;


    const existing =
        cart.find(
            function(item) {

                return item.name ===
                    fullName;

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
   PRODUCT PAGE PRICES
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


                if (
                    !Object.prototype.hasOwnProperty.call(
                        PRODUCT_PRICES,
                        productName
                    )
                ) {

                    return;

                }


                let priceElement =
                    card.querySelector(
                        ".price"
                    );


                /*
                 * Create price if the
                 * current products.html
                 * doesn't have one.
                 */

                if (!priceElement) {

                    priceElement =
                        document.createElement(
                            "p"
                        );

                    priceElement.className =
                        "price";


                    if (select) {

                        const label =
                            card.querySelector(
                                ".storage-label"
                            );

                        if (label) {

                            label.parentNode.insertBefore(
                                priceElement,
                                label
                            );

                        } else {

                            select.parentNode.insertBefore(
                                priceElement,
                                select
                            );

                        }

                    } else {

                        actions.parentNode.insertBefore(
                            priceElement,
                            actions
                        );

                    }

                }


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


                if (select) {

                    select.addEventListener(
                        "change",
                        updatePrice
                    );

                }


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

                        addToCart(
                            name.textContent.trim(),
                            getSelectedStorage(
                                card
                            )
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
   SEARCH
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


                        card.classList.toggle(
                            "hidden-product",
                            !text.includes(term)
                        );

                    }
                );

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


                        window.location.href =
                            "https://api.whatsapp.com/send?phone=" +
                            WHATSAPP_NUMBER +
                            "&text=" +
                            encodeURIComponent(
                                message
                            );

                    }
                );

            }
        );

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


            window.location.href =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                encodeURIComponent(
                    message
                );

        }
    );

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


    const cart =
        getCart();


    /* EMPTY */

    if (!cart.length) {

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

            const details =
                getCartProductDetails(
                    item.name
                );


            const productName =
                details.productName;

            const storage =
                details.storage;


            const unitPrice =
                getProductPrice(
                    productName,
                    storage
                );


            if (
                unitPrice !== null &&
                unitPrice !== undefined
            ) {

                totalPrice +=
                    unitPrice *
                    item.quantity;

            }


            totalItems +=
                item.quantity;


            const image =
                PRODUCT_IMAGES[
                    productName
                ] ||
                "images/logo.png";


            /*
             * Build the cart card.
             */

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "cart-product-item";


            card.style.cssText = `
                padding: 30px;
                margin-bottom: 25px;
                border: 1px solid #e1e1e1;
                border-radius: 28px;
                background: #fff;
                box-sizing: border-box;
            `;


            card.innerHTML = `

                <img
                    src="${image}"
                    alt="${productName}"
                    style="
                        width:100%;
                        height:260px;
                        object-fit:contain;
                        display:block;
                        background:#fafafa;
                        border-radius:22px;
                        margin-bottom:25px;
                    "
                >

                <h3
                    style="
                        margin:0 0 12px;
                        font-size:28px;
                        line-height:1.25;
                    "
                >
                    ${item.name}
                </h3>


                <div
                    style="
                        font-size:20px;
                        font-weight:800;
                        margin-bottom:20px;
                    "
                >
                    ${formatPrice(unitPrice)}
                </div>


                <div
                    style="
                        display:flex;
                        align-items:center;
                        gap:16px;
                        margin-bottom:20px;
                    "
                >

                    <button
                        type="button"
                        class="quantity-btn"
                        data-index="${index}"
                        data-action="minus"
                        style="
                            width:82px;
                            height:82px;
                            border:1px solid #d2d2d2;
                            border-radius:20px;
                            background:#fff;
                            font-size:34px;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        −
                    </button>


                    <strong
                        style="
                            min-width:40px;
                            text-align:center;
                            font-size:28px;
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
                            width:82px;
                            height:82px;
                            border:1px solid #d2d2d2;
                            border-radius:20px;
                            background:#fff;
                            font-size:34px;
                            font-weight:700;
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
                        padding:17px 30px;
                        border:0;
                        border-radius:16px;
                        background:#111;
                        color:#fff;
                        font-size:17px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    Remove
                </button>

            `;


            container.appendChild(
                card
            );

        }
    );


    /* =====================================================
       UPDATE CART SUMMARY
       ===================================================== */

    if (summary) {

        const allElements =
            summary.querySelectorAll("*");


        let totalUpdated =
            false;


        allElements.forEach(
            function(element) {

                if (totalUpdated) {

                    return;

                }


                const text =
                    element.textContent
                        .trim();


                if (
                    text ===
                    "Total: Contact for Price"
                ) {

                    element.textContent =
                        "Total: " +
                        formatPrice(
                            totalPrice
                        );

                    totalUpdated =
                        true;

                }

            }
        );


        /*
         * Separate Contact for Price
         * element.
         */

        if (!totalUpdated) {

            allElements.forEach(
                function(element) {

                    if (totalUpdated) {

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
                                .includes("total")
                        ) {

                            element.textContent =
                                formatPrice(
                                    totalPrice
                                );

                            totalUpdated =
                                true;

                        }

                    }

                }
            );

        }


        /*
         * If there is no existing
         * total, create one.
         */

        if (!totalUpdated) {

            let totalBox =
                document.getElementById(
                    "cart-total-price"
                );


            if (!totalBox) {

                totalBox =
                    document.createElement(
                        "div"
                    );

                totalBox.id =
                    "cart-total-price";

                totalBox.style.cssText = `
                    margin-top:20px;
                    font-size:20px;
                    font-weight:800;
                `;

                summary.appendChild(
                    totalBox
                );

            }


            totalBox.textContent =
                "Total: " +
                formatPrice(
                    totalPrice
                );

        }

    }


    /* =====================================================
       QUANTITY BUTTONS
       ===================================================== */

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


                        const currentCart =
                            getCart();


                        if (
                            !currentCart[index]
                        ) {

                            return;

                        }


                        if (
                            action ===
                            "plus"
                        ) {

                            currentCart[index]
                                .quantity++;

                        }


                        if (
                            action ===
                            "minus"
                        ) {

                            currentCart[index]
                                .quantity--;


                            if (
                                currentCart[index]
                                    .quantity <= 0
                            ) {

                                currentCart.splice(
                                    index,
                                    1
                                );

                            }

                        }


                        saveCart(
                            currentCart
                        );

                        displayCart();

                        updateCartCount();

                    }
                );

            }
        );


    /* =====================================================
       REMOVE
       ===================================================== */

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


                        const currentCart =
                            getCart();


                        currentCart.splice(
                            index,
                            1
                        );


                        saveCart(
                            currentCart
                        );

                        displayCart();

                        updateCartCount();

                    }
                );

            }
        );

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


            if (!cart.length) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            let message =
                "Hi 4LJTek, I'd like to order:%0A%0A";


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


            const total =
                calculateCartTotal(
                    cart
                );


            message +=
                "%0ATotal: " +
                formatPrice(total);


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
   CHECKOUT PRICING
   ========================================================= */

function setupCheckoutPricing() {

    const cart =
        getCart();


    if (!cart.length) {

        return;

    }


    const total =
        calculateCartTotal(
            cart
        );


    /*
     * Find visible "Contact for Price"
     * elements and replace them with
     * the actual checkout total when
     * they are part of an order/total area.
     */

    document
        .querySelectorAll("*")
        .forEach(
            function(element) {

                if (
                    element.children.length > 0
                ) {

                    return;

                }


                const text =
                    element.textContent
                        .trim();


                if (
                    text !==
                    "Contact for Price"
                ) {

                    return;

                }


                const parent =
                    element.parentElement;


                if (!parent) {

                    return;

                }


                const parentText =
                    parent.textContent
                        .toLowerCase();


                if (
                    parentText.includes("total") ||
                    parentText.includes("your order") ||
                    parentText.includes("order")
                ) {

                    element.textContent =
                        formatPrice(
                            total
                        );

                }

            }
        );


    /*
     * Common checkout total IDs/classes.
     */

    const selectors = [

        "#checkout-total",

        "#total-price",

        "#order-total",

        ".checkout-total",

        ".order-total",

        ".total-price",

        "[data-checkout-total]"

    ];


    selectors.forEach(
        function(selector) {

            document
                .querySelectorAll(selector)
                .forEach(
                    function(element) {

                        element.textContent =
                            formatPrice(
                                total
                            );

                    }
                );

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
   START
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

    setupCheckoutPricing();

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
