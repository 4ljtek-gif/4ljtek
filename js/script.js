/* =========================================================
   4LJTEK - MAIN JAVASCRIPT
   Cart + Prices + WhatsApp + Search + Mobile Menu
========================================================= */

const WHATSAPP_NUMBER = "254101984723";
const CART_KEY = "4ljtekCart";


/* =========================================================
   PRODUCT PRICES
========================================================= */

const PRODUCT_PRICES = {

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

    "PlayStation 5": {
        "Standard": 85000
    },

    "PlayStation 5 Digital Edition": {
        "Standard": 90000
    },

    "PS5 Slim": {
        "Standard": 95000
    },

    "PlayStation 5 Pro": {
        "Standard": 145000
    },

    "DualSense Wireless Controller": {
        "Standard": 10500
    }
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
   PRICE HELPERS
========================================================= */

function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        Number.isNaN(Number(price))
    ) {
        return "Contact for Price";
    }

    return "KSh " + Number(price).toLocaleString("en-KE");
}


function getProductPrice(productName, storage) {

    if (!PRODUCT_PRICES[productName]) {
        return null;
    }

    const prices = PRODUCT_PRICES[productName];

    if (!Object.prototype.hasOwnProperty.call(prices, storage)) {
        return null;
    }

    return prices[storage];
}


/* =========================================================
   CART STORAGE
========================================================= */

function getCart() {

    try {

        const saved = localStorage.getItem(CART_KEY);

        if (!saved) {
            return [];
        }

        const cart = JSON.parse(saved);

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        console.error("Could not read cart:", error);

        return [];
    }
}


function saveCart(cart) {

    try {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error("Could not save cart:", error);
    }
}


/* =========================================================
   IMPORTANT CART MIGRATION
   FIXES OLD LOGO IMAGES + OLD PRICES
========================================================= */

function migrateCart() {

    const cart = getCart();

    let changed = false;

    const migrated = cart.map(function(item) {

        const newItem = { ...item };

        let productName = newItem.productName;


        /* Recover old product format */

        if (!productName && newItem.name) {

            productName = newItem.name;

            if (newItem.name.includes(" — ")) {

                const parts =
                    newItem.name.split(" — ");

                productName = parts[0];

                if (
                    !newItem.storage &&
                    parts[1]
                ) {
                    newItem.storage = parts[1];
                }
            }
        }


        newItem.productName =
            productName || "Product";


        newItem.storage =
            newItem.storage || "Standard";


        /* ==========================================
           ALWAYS CORRECT THE PRICE
        ========================================== */

        const correctPrice =
            getProductPrice(
                newItem.productName,
                newItem.storage
            );


        if (
            correctPrice !== null &&
            Number(newItem.price) !==
            Number(correctPrice)
        ) {

            newItem.price = correctPrice;

            changed = true;
        }


        /* ==========================================
           ALWAYS CORRECT THE PRODUCT IMAGE
           
           This specifically removes the old
           4LJTek logo from existing cart items.
        ========================================== */

        const correctImage =
            PRODUCT_IMAGES[newItem.productName] || "";


        if (
            !newItem.image ||
            newItem.image.includes("logo.png") ||
            newItem.image !== correctImage
        ) {

            newItem.image = correctImage;

            changed = true;
        }


        /* ==========================================
           QUANTITY
        ========================================== */

        if (
            !newItem.quantity ||
            Number(newItem.quantity) < 1
        ) {

            newItem.quantity = 1;

            changed = true;
        }


        /* ==========================================
           DISPLAY NAME
        ========================================== */

        newItem.name =
            newItem.storage !== "Standard"

                ? newItem.productName +
                  " — " +
                  newItem.storage

                : newItem.productName;


        return newItem;
    });


    if (changed) {

        saveCart(migrated);
    }


    return migrated;
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart = migrateCart();

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


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(
    productName,
    storage,
    price,
    image
) {

    const cart = migrateCart();

    const actualStorage =
        storage || "Standard";


    const actualPrice =
        price !== undefined
            ? price
            : getProductPrice(
                productName,
                actualStorage
            );


    const actualImage =
        image ||
        PRODUCT_IMAGES[productName] ||
        "";


    const existing =
        cart.find(function(item) {

            return (
                item.productName ===
                    productName &&

                item.storage ===
                    actualStorage
            );
        });


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 0) + 1;

        existing.price =
            actualPrice;

        existing.image =
            actualImage;

    } else {

        cart.push({

            productName: productName,

            name:
                actualStorage !== "Standard"

                    ? productName +
                      " — " +
                      actualStorage

                    : productName,

            storage: actualStorage,

            price: actualPrice,

            image: actualImage,

            quantity: 1
        });
    }


    saveCart(cart);

    updateCartCount();

    displayCart();

    displayCheckout();


    alert(
        productName +
        (
            actualStorage !== "Standard"
                ? " — " + actualStorage
                : ""
        ) +
        " has been added to your cart."
    );
}


/* =========================================================
   ADD TO CART BUTTONS
========================================================= */

function setupAddToCartButtons() {

    document
        .querySelectorAll(".product-card")
        .forEach(function(card) {

            const productNameElement =
                card.querySelector("h3");

            const actions =
                card.querySelector(
                    ".product-actions"
                );

            const imageElement =
                card.querySelector("img");

            const storageSelect =
                card.querySelector(
                    ".storage-select"
                );


            if (
                !productNameElement ||
                !actions
            ) {
                return;
            }


            const productName =
                productNameElement
                    .textContent
                    .trim();


            let addButton =
                actions.querySelector(
                    ".add-cart-btn"
                );


            if (!addButton) {

                addButton =
                    document.createElement(
                        "button"
                    );

                addButton.type =
                    "button";


                /* IMPORTANT:
                   This now matches style.css */

                addButton.className =
                    "add-cart-btn";


                addButton.textContent =
                    "Add to Cart";


                actions.insertBefore(
                    addButton,
                    actions.firstChild
                );
            }


            addButton.onclick =
                function(event) {

                    event.preventDefault();


                    const storage =
                        storageSelect
                            ? storageSelect.value
                            : "Standard";


                    const price =
                        getProductPrice(
                            productName,
                            storage
                        );


                    const image =
                        imageElement
                            ? imageElement
                                .getAttribute(
                                    "src"
                                )
                            : PRODUCT_IMAGES[
                                productName
                            ];


                    addToCart(
                        productName,
                        storage,
                        price,
                        image
                    );
                };
        });
}


/* =========================================================
   DISPLAY PRODUCT PRICES
========================================================= */

function displayProductPrices() {

    document
        .querySelectorAll(".product-card")
        .forEach(function(card) {

            const nameElement =
                card.querySelector("h3");

            const storageSelect =
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
                nameElement
                    .textContent
                    .trim();


            let priceElement =
                card.querySelector(
                    ".dynamic-product-price"
                );


            if (!priceElement) {

                priceElement =
                    document.createElement(
                        "div"
                    );

                priceElement.className =
                    "dynamic-product-price";


                actions.parentNode.insertBefore(
                    priceElement,
                    actions
                );
            }


            function updatePrice() {

                const storage =
                    storageSelect
                        ? storageSelect.value
                        : "Standard";


                const price =
                    getProductPrice(
                        productName,
                        storage
                    );


                priceElement.textContent =
                    formatPrice(price);
            }


            updatePrice();


            if (
                storageSelect &&
                !storageSelect.dataset.priceBound
            ) {

                storageSelect.addEventListener(
                    "change",
                    updatePrice
                );


                storageSelect.dataset.priceBound =
                    "true";
            }
        });
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

            button.onclick =
                function(event) {

                    event.preventDefault();


                    const card =
                        button.closest(
                            ".product-card"
                        );


                    if (!card) {
                        return;
                    }


                    const nameElement =
                        card.querySelector("h3");


                    const storageSelect =
                        card.querySelector(
                            ".storage-select"
                        );


                    if (!nameElement) {
                        return;
                    }


                    const productName =
                        nameElement
                            .textContent
                            .trim();


                    const storage =
                        storageSelect
                            ? storageSelect.value
                            : "Standard";


                    const price =
                        getProductPrice(
                            productName,
                            storage
                        );


                    const message =
                        "Hi 4LJTek, I'm interested in " +
                        productName +

                        (
                            storage !== "Standard"
                                ? " — " + storage
                                : ""
                        ) +

                        ". " +

                        (
                            price !== null
                                ? "Listed price: " +
                                  formatPrice(price) +
                                  ". "
                                : ""
                        ) +

                        "Please confirm availability.";


                    const url =
                        "https://api.whatsapp.com/send?phone=" +
                        WHATSAPP_NUMBER +
                        "&text=" +
                        encodeURIComponent(
                            message
                        );


                    window.open(
                        url,
                        "_blank"
                    );
                };
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


    button.onclick =
        function(event) {

            event.preventDefault();


            const message =
                "Hi 4LJTek, I'd like to place an order. Please share your latest prices and availability.";


            const url =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                url,
                "_blank"
            );
        };
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

            const query =
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


                    card.style.display =
                        text.includes(query)
                            ? ""
                            : "none";
                });
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
        document.querySelector("header") ||
        document.querySelector(
            ".site-header"
        );


    const nav =
        document.querySelector("nav");


    if (!header || !nav) {
        return;
    }


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "mobile-menu-btn";


    button.setAttribute(
        "aria-label",
        "Open menu"
    );


    button.innerHTML =
        "<span></span>" +
        "<span></span>" +
        "<span></span>";


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
}


/* =========================================================
   CART TOTAL
========================================================= */

function calculateCartTotal() {

    const cart =
        migrateCart();


    return cart.reduce(
        function(total, item) {

            const price =
                Number(item.price);


            const quantity =
                Number(
                    item.quantity || 0
                );


            if (
                Number.isFinite(price) &&
                price >= 0
            ) {

                return total +
                    price * quantity;
            }


            return total;
        },
        0
    );
}


/* =========================================================
   CART CONTAINER
========================================================= */

function getCartContainer() {

    return (
        document.getElementById(
            "cart-items"
        ) ||

        document.querySelector(
            ".cart-items"
        ) ||

        document.querySelector(
            "[data-cart-items]"
        ) ||

        document.querySelector(
            ".cart-list"
        )
    );
}


/* =========================================================
   DISPLAY CART
========================================================= */

function displayCart() {

    const container =
        getCartContainer();


    if (!container) {
        return;
    }


    const cart =
        migrateCart();


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML =
            '<p class="empty-cart-message">' +
            'Your cart is empty.' +
            '</p>';


        updateCartSummary();

        return;
    }


    cart.forEach(
        function(item, index) {

            const itemBox =
                document.createElement(
                    "div"
                );


            itemBox.className =
                "cart-item";


            const image =
                item.image ||
                PRODUCT_IMAGES[
                    item.productName
                ] ||
                "";


            const itemPrice =
                Number(item.price);


            const subtotal =
                Number.isFinite(itemPrice)

                    ? itemPrice *
                      Number(
                          item.quantity || 0
                      )

                    : null;


            itemBox.innerHTML = `

                <div class="cart-item-image">

                    ${
                        image
                            ? `
                                <img
                                    src="${image}"
                                    alt="${escapeHtml(
                                        item.productName
                                    )}"
                                >
                              `
                            : ""
                    }

                </div>


                <div class="cart-item-details">

                    <h3>
                        ${escapeHtml(
                            item.productName
                        )}
                    </h3>


                    ${
                        item.storage !==
                        "Standard"

                            ? `
                                <p class="cart-storage">
                                    ${escapeHtml(
                                        item.storage
                                    )}
                                </p>
                              `
                            : ""
                    }


                    <p class="cart-item-price">

                        ${formatPrice(
                            itemPrice
                        )}

                    </p>


                    ${
                        subtotal !== null

                            ? `
                                <p class="cart-item-subtotal">
                                    Subtotal:
                                    ${formatPrice(
                                        subtotal
                                    )}
                                </p>
                              `

                            : ""
                    }


                    <div class="cart-quantity">

                        <button
                            type="button"
                            class="quantity-btn decrease"
                            data-index="${index}"
                        >
                            −
                        </button>


                        <span>
                            ${Number(
                                item.quantity || 1
                            )}
                        </span>


                        <button
                            type="button"
                            class="quantity-btn increase"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-cart-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>
            `;


            container.appendChild(
                itemBox
            );
        }
    );


    /* INCREASE */

    container
        .querySelectorAll(".increase")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const currentCart =
                        migrateCart();


                    currentCart[index].quantity++;


                    saveCart(
                        currentCart
                    );


                    displayCart();

                    displayCheckout();

                    updateCartCount();

                    updateCartSummary();
                }
            );
        });


    /* DECREASE */

    container
        .querySelectorAll(".decrease")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const currentCart =
                        migrateCart();


                    if (
                        currentCart[index]
                            .quantity > 1
                    ) {

                        currentCart[index]
                            .quantity--;

                    } else {

                        currentCart.splice(
                            index,
                            1
                        );
                    }


                    saveCart(
                        currentCart
                    );


                    displayCart();

                    displayCheckout();

                    updateCartCount();

                    updateCartSummary();
                }
            );
        });


    /* REMOVE */

    container
        .querySelectorAll(
            ".remove-cart-item"
        )
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const currentCart =
                        migrateCart();


                    currentCart.splice(
                        index,
                        1
                    );


                    saveCart(
                        currentCart
                    );


                    displayCart();

                    displayCheckout();

                    updateCartCount();

                    updateCartSummary();
                }
            );
        });


    updateCartSummary();
}


/* =========================================================
   CART SUMMARY
========================================================= */

function updateCartSummary() {

    const cart =
        migrateCart();


    const total =
        calculateCartTotal();


    const itemCount =
        cart.reduce(
            function(sum, item) {

                return sum +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );


    document
        .querySelectorAll(
            "#cart-items-count, .cart-items-count"
        )
        .forEach(function(element) {

            element.textContent =
                itemCount;
        });


    document
        .querySelectorAll(
            "#cart-total-price, .cart-total-price, .total-price"
        )
        .forEach(function(element) {

            element.textContent =
                formatPrice(total);
        });
}


/* =========================================================
   CHECKOUT
========================================================= */

function getCheckoutContainer() {

    return (
        document.getElementById(
            "checkout-items"
        ) ||

        document.querySelector(
            ".checkout-items"
        ) ||

        document.querySelector(
            "[data-checkout-items]"
        ) ||

        document.querySelector(
            ".checkout-order-items"
        )
    );
}


function displayCheckout() {

    const container =
        getCheckoutContainer();


    if (!container) {
        return;
    }


    const cart =
        migrateCart();


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

        updateCheckoutTotal();

        return;
    }


    cart.forEach(
        function(item) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "checkout-item";


            const subtotal =
                Number(item.price) *
                Number(
                    item.quantity || 0
                );


            row.innerHTML = `

                <div>

                    <strong>
                        ${escapeHtml(
                            item.productName
                        )}
                    </strong>

                    ${
                        item.storage !==
                        "Standard"

                            ? `
                                <span>
                                    ${escapeHtml(
                                        item.storage
                                    )}
                                </span>
                              `
                            : ""
                    }

                    <small>
                        × ${Number(
                            item.quantity || 1
                        )}
                    </small>

                </div>


                <strong>
                    ${formatPrice(
                        subtotal
                    )}
                </strong>
            `;


            container.appendChild(
                row
            );
        }
    );


    updateCheckoutTotal();
}


function updateCheckoutTotal() {

    const total =
        calculateCartTotal();


    document
        .querySelectorAll(
            "#checkout-total, #checkout-total-price, .checkout-total-price"
        )
        .forEach(function(element) {

            element.textContent =
                formatPrice(total);
        });
}


/* =========================================================
   CART WHATSAPP
========================================================= */

function setupCartWhatsApp() {

    const buttons =
        document.querySelectorAll(
            "#cart-whatsapp, .cart-whatsapp, .checkout-whatsapp"
        );


    buttons.forEach(
        function(button) {

            button.onclick =
                function(event) {

                    event.preventDefault();


                    const cart =
                        migrateCart();


                    if (!cart.length) {

                        alert(
                            "Your cart is empty."
                        );

                        return;
                    }


                    let message =
                        "Hi 4LJTek, I'd like to place this order:\n\n";


                    cart.forEach(
                        function(item) {

                            message +=
                                "• " +
                                item.productName;


                            if (
                                item.storage !==
                                "Standard"
                            ) {

                                message +=
                                    " — " +
                                    item.storage;
                            }


                            message +=
                                " × " +
                                item.quantity;


                            if (
                                item.price !==
                                    null &&
                                item.price !==
                                    undefined
                            ) {

                                message +=
                                    " — " +
                                    formatPrice(
                                        item.price
                                    );
                            }


                            message += "\n";
                        }
                    );


                    message +=
                        "\nTotal: " +
                        formatPrice(
                            calculateCartTotal()
                        );


                    const url =
                        "https://api.whatsapp.com/send?phone=" +
                        WHATSAPP_NUMBER +
                        "&text=" +
                        encodeURIComponent(
                            message
                        );


                    window.open(
                        url,
                        "_blank"
                    );
                };
        }
    );
}


/* =========================================================
   CART CALL
========================================================= */

function setupCartCall() {

    document
        .querySelectorAll(
            "#cart-call, .cart-call"
        )
        .forEach(function(button) {

            button.setAttribute(
                "href",
                "tel:+254101984723"
            );
        });
}


/* =========================================================
   CLEAR CART
========================================================= */

function setupClearCart() {

    document
        .querySelectorAll(
            "#clear-cart, .clear-cart"
        )
        .forEach(function(button) {

            button.onclick =
                function(event) {

                    event.preventDefault();


                    if (
                        !confirm(
                            "Are you sure you want to clear your cart?"
                        )
                    ) {
                        return;
                    }


                    localStorage.removeItem(
                        CART_KEY
                    );


                    displayCart();

                    displayCheckout();

                    updateCartCount();

                    updateCartSummary();
                };
        });
}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   START 4LJTEK
========================================================= */

function start4LJTek() {

    /* FIRST:
       repair old cart data */

    migrateCart();


    setupMobileMenu();

    setupProductSearch();

    displayProductPrices();

    setupAddToCartButtons();

    setupWhatsAppButtons();

    setupHomeWhatsApp();

    displayCart();

    displayCheckout();

    updateCartCount();

    updateCartSummary();

    updateCheckoutTotal();

    setupClearCart();

    setupCartWhatsApp();

    setupCartCall();
}


/* =========================================================
   STARTUP
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
