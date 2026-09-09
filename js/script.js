// ==========================================
// 4LJTEK WEBSITE JAVASCRIPT
// ==========================================

const WHATSAPP_NUMBER = "254101984723";
const CART_KEY = "4ljtekCart";


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
// CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();

    const total = cart.reduce(
        function(sum, item) {

            return sum + item.quantity;

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


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productName) {

    const cart = getCart();

    const existing = cart.find(
        function(item) {

            return item.name === productName;

        }
    );


    if (existing) {

        existing.quantity++;

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
// PRODUCT ADD TO CART BUTTONS
// ==========================================

function setupAddToCartButtons() {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(
        function(card) {

            const actions =
                card.querySelector(".product-actions");

            const name =
                card.querySelector("h3");


            if (!actions || !name) {

                return;

            }


            /*
             * If Add to Cart already exists,
             * make sure it still works.
             */

            let button =
                actions.querySelector(".add-cart-btn");


            if (!button) {

                button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "add-cart-btn";

                button.textContent =
                    "Add to Cart";


                actions.insertBefore(
                    button,
                    actions.firstChild
                );

            }


            /*
             * Remove old click handlers by
             * cloning the button.
             */

            const newButton =
                button.cloneNode(true);


            button.replaceWith(newButton);


            newButton.addEventListener(
                "click",
                function() {

                    const productName =
                        name.textContent.trim();

                    addToCart(productName);

                }
            );


            /*
             * Force correct appearance.
             */

            newButton.style.display =
                "flex";

            newButton.style.alignItems =
                "center";

            newButton.style.justifyContent =
                "center";

            newButton.style.width =
                "100%";

            newButton.style.minHeight =
                "46px";

            newButton.style.padding =
                "10px";

            newButton.style.borderRadius =
                "12px";

            newButton.style.border =
                "1px solid #111";

            newButton.style.background =
                "#111";

            newButton.style.color =
                "#fff";

            newButton.style.fontFamily =
                "inherit";

            newButton.style.fontWeight =
                "850";

            newButton.style.cursor =
                "pointer";

        }
    );

}


// ==========================================
// PRODUCT SEARCH
// ==========================================

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


                    if (
                        text.includes(term)
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                });

        }
    );

}


// ==========================================
// PRODUCT WHATSAPP
// ==========================================

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


                        const message =
                            "Hi 4LJTek, I'm interested in the " +
                            productName +
                            ". Please share the price and availability.";


                        const url =
                            "https://api.whatsapp.com/send?phone=" +
                            WHATSAPP_NUMBER +
                            "&text=" +
                            encodeURIComponent(message);


                        window.location.href =
                            url;

                    }
                );

            }
        );

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
        function(event) {

            event.preventDefault();


            const message =
                "Hi 4LJTek, I'd like to order from your store.";


            const url =
                "https://api.whatsapp.com/send?phone=" +
                WHATSAPP_NUMBER +
                "&text=" +
                encodeURIComponent(message);


            window.location.href =
                url;

        }
    );

}


// ==========================================
// MOBILE MENU
// ==========================================

function setupMobileMenu() {

    const header =
        document.querySelector("header");


    const nav =
        document.querySelector("header nav");


    if (!header || !nav) {

        return;

    }


    let menuButton =
        document.querySelector(
            ".mobile-menu-btn"
        );


    /*
     * Create hamburger button if missing.
     */

    if (!menuButton) {

        menuButton =
            document.createElement("button");

        menuButton.type =
            "button";

        menuButton.className =
            "mobile-menu-btn";

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.innerHTML =
            "<span></span>" +
            "<span></span>" +
            "<span></span>";


        header.appendChild(
            menuButton
        );

    }


    /*
     * Mobile menu toggle.
     */

    menuButton.onclick =
        function() {

            const open =
                nav.classList.toggle(
                    "mobile-open"
                );


            menuButton.classList.toggle(
                "active",
                open
            );


            menuButton.setAttribute(
                "aria-expanded",
                open
                    ? "true"
                    : "false"
            );


            menuButton.setAttribute(
                "aria-label",
                open
                    ? "Close menu"
                    : "Open menu"
            );

        };


    /*
     * Close menu after clicking a link.
     */

    nav.querySelectorAll("a")
        .forEach(
            function(link) {

                link.addEventListener(
                    "click",
                    function() {

                        nav.classList.remove(
                            "mobile-open"
                        );

                        menuButton.classList.remove(
                            "active"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

}


// ==========================================
// DISPLAY CART
// ==========================================

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


    if (cart.length === 0) {

        if (empty) {

            empty.style.display =
                "block";

        }


        if (summary) {

            summary.style.display =
                "none";

        }


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


    cart.forEach(
        function(item, index) {

            const div =
                document.createElement(
                    "div"
                );


            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

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
     * Quantity buttons
     */

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


    /*
     * Remove buttons
     */

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


    const count =
        document.getElementById(
            "cart-count"
        );


    if (count) {

        const total =
            cart.reduce(
                function(sum, item) {

                    return sum +
                        item.quantity;

                },
                0
            );


        count.textContent =
            total;

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


// ==========================================
// CART WHATSAPP
// ==========================================

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
                "Hi 4LJTek, I'd like to order:\n\n";


            cart.forEach(
                function(item) {

                    message +=
                        "• " +
                        item.name +
                        " x" +
                        item.quantity +
                        "\n";

                }
            );


            message +=
                "\nPlease share the total price and availability.";


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


// ==========================================
// CART CALL
// ==========================================

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


// ==========================================
// START WEBSITE
// ==========================================

function start4LJTek() {

    setupMobileMenu();

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
