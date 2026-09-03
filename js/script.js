// ==========================================
// 4LJTek WEBSITE JAVASCRIPT
// ==========================================

const WHATSAPP_NUMBER = "254101984723";


// ==========================================
// PRODUCT SEARCH
// ==========================================

function setupProductSearch() {

    const searchInput = document.getElementById("search");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const searchTerm = this.value.toLowerCase().trim();

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
// CART STORAGE
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
// ADD TO CART
// ==========================================

function setupAddToCartButtons() {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        if (product.querySelector(".add-cart-btn")) {
            return;
        }

        const nameElement =
            product.querySelector("h3");

        const actions =
            product.querySelector(".product-actions");

        if (!nameElement || !actions) {
            return;
        }

        const productName =
            nameElement.textContent.trim();

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "add-cart-btn";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function () {

            addToCart(productName);

        });

        actions.insertBefore(
            button,
            actions.firstChild
        );

    });

}


function addToCart(productName) {

    const cart = getCart();

    const existingProduct =
        cart.find(item => item.name === productName);

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
            (total, item) => total + item.quantity,
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

    if (!cartContainer) return;

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

        itemDiv.style.padding = "25px";
        itemDiv.style.marginBottom = "18px";
        itemDiv.style.borderRadius = "20px";
        itemDiv.style.background = "#f7f7f7";
        itemDiv.style.border = "1px solid #e5e5e5";

        itemDiv.innerHTML = `

            <h3
                style="
                    margin:0 0 15px;
                    font-size:24px;
                    font-weight:800;
                "
            >
                ${item.name}
            </h3>

            <div
                style="
                    display:flex;
                    align-items:center;
                    gap:12px;
                    margin-bottom:18px;
                "
            >

                <button
                    type="button"
                    class="quantity-btn"
                    data-action="decrease"
                    data-index="${index}"
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

                <span
                    style="
                        min-width:35px;
                        text-align:center;
                        font-size:20px;
                        font-weight:700;
                    "
                >
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    class="quantity-btn"
                    data-action="increase"
                    data-index="${index}"
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
                    font-family:inherit;
                    font-weight:600;
                    cursor:pointer;
                "
            >
                Remove
            </button>

        `;

        cartContainer.appendChild(itemDiv);

    });


    // ======================================
    // QUANTITY BUTTONS
    // ======================================

    const quantityButtons =
        document.querySelectorAll(".quantity-btn");

    quantityButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

            const action =
                button.dataset.action;

            changeQuantity(
                index,
                action
            );

        });

    });


    // ======================================
    // REMOVE BUTTONS
    // ======================================

    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-btn"
        );

    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

            removeFromCart(index);

        });

    });


    // ======================================
    // UPDATE SUMMARY
    // ======================================

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

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(index, action) {

    const cart = getCart();

    if (!cart[index]) return;

    if (action === "increase") {

        cart[index].quantity += 1;

    }

    if (action === "decrease") {

        cart[index].quantity -= 1;

        if (cart[index].quantity <= 0) {

            cart.splice(index, 1);

        }

    }

    saveCart(cart);

    displayCart();

    updateCartCount();

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

    if (!button) return;

    button.addEventListener("click", function () {

        localStorage.removeItem("4ljtekCart");

        displayCart();

        updateCartCount();

    });

}


// ==========================================
// CART WHATSAPP
// ==========================================

function setupCartWhatsApp() {

    const button =
        document.getElementById("cart-whatsapp");

    if (!button) return;

    button.addEventListener("click", function () {

        const cart = getCart();

        if (cart.length === 0) {

            alert("Your cart is empty.");

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

    });

}


// ==========================================
// CART CALL
// ==========================================

function setupCartCall() {

    const button =
        document.getElementById("cart-call");

    if (!button) return;

    button.addEventListener("click", function () {

        window.location.href =
            "tel:+254101984723";

    });

}


// ==========================================
// PRODUCT WHATSAPP
// ==========================================

function setupWhatsAppButtons() {

    const buttons =
        document.querySelectorAll(
            ".product-card .whatsapp-btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const card =
                button.closest(".product-card");

            if (!card) return;

            const name =
                card.querySelector("h3");

            if (!name) return;

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

        });

    });

}


// ==========================================
// HOMEPAGE WHATSAPP
// ==========================================

function setup
